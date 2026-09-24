# StudyMate 生产工程基线

> 更新日期：2026-09-24
> 目标：用“足够正式、不过度设计”的方式，把 StudyMate 做成可稳定运行、可排错、可维护的真实项目。

---

# 一、总原则

StudyMate 的工程化采用“生产级最小基线”：

> 该有的基础能力要从合适阶段进入，不把安全、日志、异常、配置、迁移等问题拖到最后；但不为了显得复杂而提前引入微服务、Kafka、Kubernetes、完整 ELK 等当前项目并不需要的系统。

判断标准：

1. 这个能力是否能明显降低真实故障风险？
2. 这个能力是否会直接影响后续架构是否需要返工？
3. 当前规模是否真的需要它？
4. 有没有更简单、稳定、成熟的方案？

---

# 二、后端日志：必须有，但先保持简单

第一版 FastAPI 正式后端就需要：

- Python 标准 `logging` 统一配置。
- Uvicorn access log（访问日志）。
- Application log（业务日志）。
- Error log（异常日志）。
- 日志输出到 stdout / stderr，便于 Docker / 部署环境统一收集。
- 统一日志格式。
- 关键请求带 request_id / trace_id，方便一次请求从入口追到 Service。
- 记录关键业务事件，例如登录失败、Session 创建、提交、权限拒绝、LLM 调用失败。
- 不记录密码、验证码、Token、完整敏感个人信息。

第一版不要求：

- ELK 全家桶
- Kafka 日志管道
- 分布式 tracing 集群
- 多套日志平台

当部署环境和调用链复杂起来，再考虑 Loki / Grafana、OpenTelemetry 等。

---

# 三、异常处理：必须有

FastAPI 不允许每个接口随便 `try/except` 后返回不同格式。

需要：

- 统一业务异常类型。
- 全局 Exception Handler。
- 统一 API 错误结构。
- 区分 400 / 401 / 403 / 404 / 409 / 422 / 500。
- 500 记录完整服务端异常，但前端只收到安全、稳定的错误信息。
- 数据库事务失败必须回滚。

---

# 四、配置管理：必须有

不能把正式配置散落在代码里。

至少包含：

- development / test / production 环境区分
- DATABASE_URL
- JWT / session secret
- LLM API key
- CORS origins
- log level
- frontend origin
- 第三方服务配置

使用环境变量 + Pydantic Settings 一类成熟方案。

密钥不提交 Git。

---

# 五、数据库工程：必须有

从 PostgreSQL 开始就加入：

- SQLAlchemy
- Alembic migration
- transaction
- foreign key
- unique constraint
- index（只加真实查询需要的）
- created_at / updated_at
- 关键历史数据不靠前端本地存储

数据库 schema 变化必须用 migration，不手工改生产库。

---

# 六、健康检查与启动检查：应该早做

至少提供：

~~~text
GET /health
~~~

可以分层：

- liveness：进程是否活着
- readiness：数据库等关键依赖是否可用

第一版可以先做简单 health，部署阶段再细化。

---

# 七、测试：围绕真实风险，而不是追求覆盖率数字

必须优先覆盖：

- 登录成功 / 失败
- 未登录访问
- 用户 A 访问用户 B 资源
- Practice Session start / resume
- 同题库不能产生多个 active Session
- submit 后状态不可再次提交
- abandoned / expired 不能继续提交
- 数据库事务
- LLM Structured Output 校验失败
- API contract

不为了“100% coverage”写大量低价值测试。

---

# 八、可观测性分阶段

## 第一层：现在就需要

- structured logging（结构化日志）
- request_id
- access / error / business log
- 基础 health check

## 第二层：部署后需要

- 基础 metrics
- 请求耗时
- 错误率
- LLM 调用耗时 / token / cost
- 慢查询观察

## 第三层：Agent 复杂后再加入

- OpenTelemetry trace
- Agent run / tool call trace
- LangGraph node latency
- 跨服务 tracing

不要在单体 FastAPI 刚开始时提前建设完整分布式观测平台。

---

# 九、性能与稳定性

按真实需求逐步加入：

先有：

- API timeout
- DB connection pool
- 外部 LLM timeout
- retry 只用于适合重试的调用
- 幂等性 / 状态校验
- 分页
- 请求体大小限制
- 基础限流（登录、验证码、昂贵 AI 请求）

后面确有需要再加：

- Redis cache
- background queue
- task worker
- CDN
- 大规模缓存策略

不提前为了“可能以后会用”引入 Redis / Celery / Kafka。

---

# 十、安全基线

除 Auth 文档外，生产基线还包括：

- HTTPS
- CORS allowlist
- Cookie 安全属性
- CSRF 风险处理
- 密码哈希
- Token 生命周期
- Rate Limit
- 输入校验
- ORM 参数化查询
- 文件上传限制
- 日志脱敏
- 权限校验
- Secret 管理

前端校验只负责体验，服务端必须重新校验。

---

# 十一、部署基线

第一版适合 StudyMate 的部署方式：

~~~text
Frontend
+
FastAPI
+
PostgreSQL
+
Nginx / reverse proxy
+
Docker Compose
~~~

配合：

- GitHub Actions
- migration
- health check
- rollback 思路
- 环境变量
- 日志输出

当前不需要：

- Kubernetes
- Service Mesh
- 微服务拆分
- Kafka
- 多数据库
- 多区域高可用

除非以后流量 / 团队 / 业务规模真的要求。

---

# 十二、进入每个模块前的检查习惯

后续开发任何真实功能时，都顺手问：

- 谁能调用？
- 数据属于谁？
- URL / body 能否被篡改？
- 失败如何返回？
- 是否需要事务？
- 是否要记录日志？
- 是否含敏感数据？
- 是否会无限增长？
- 是否需要索引？
- 是否需要幂等？
- 是否需要超时？
- 是否需要测试？

这不是为了把每个功能做复杂，而是避免真实项目最常见的“功能能跑，但上线不稳”。

---

# 十三、当前 StudyMate 的合理架构目标

当前坚持单体优先：

~~~text
React / Next.js
        ↓
FastAPI
        ↓
PostgreSQL
        ↓
LLM / Agent
~~~

需要时再增加 Redis、后台任务、Tracing 等。

核心原则：

> 先把单体做清楚、稳定、可观测、可测试，再根据真实瓶颈演进。
