# StudyMate：长期上下文、重大决策与学习约定

> 版本：v2.0  
> 更新日期：2026-09-20  
> 本文件只记录长期不应丢失的方向和规则。  
> 当前精确学习位置必须读取 docs/02-progress.md。

---

# 一、用户转型目标

用户已有多年传统 Web 前端经验，主技术背景以 Vue 为主，当前目标不是“从零转行”，而是升级为：

1. AI 前端工程师
2. Agent 前端工程师
3. AI 全栈工程师（前端侧重）

核心定位：

> 多年前端工程经验 + React / Next.js + Python / FastAPI + AI / Agent 应用工程能力。

学习与求职必须同时推进，不能长期闭关后再开始面试。

---

# 二、StudyMate 产品方向已经正式变更

早期方案曾考虑儿童英语 / 数学学习。

从 2026-09-20 起，不再把儿童学习作为当前主线，也不再把“第二个月扩英语数学”作为强制目标。

StudyMate 正式定位为：

> 面向 IT 从业者、技术学习者和求职者的 AI 学习、练习与面试提升平台。

当前产品围绕 IT / 软件开发 / AI Agent 知识展开，第一阶段尤其服务前端、AI 前端、Agent 前端和 Agent 应用开发求职。

未来可以扩展其他技术岗位，但当前不扩大范围。

---

# 三、产品核心模块

当前 / 规划中的主要能力：

- 技术知识库
- AI 生成题库
- 基础专项练习
- 简历专项练习
- JD 专项练习
- 开放式答题
- AI Structured Output 评分
- 逐题反馈与复盘
- Weak Topics
- Mastery / 掌握度
- 个性化训练计划
- 历史练习记录
- 学习 / 面试报告
- 个人求职画像
- 后续 Pro 能力

当前页面已经由 Codex 辅助完善了大量静态 UI 和本地交互。静态页面完成不等于核心业务完成，下一阶段重点是将本地示例数据逐步替换为真实 API、数据库和 AI 能力。

---

# 四、产品闭环

StudyMate 不能只是：

~~~text
用户输入 → 调 LLM → 返回一段文本
~~~

核心闭环应为：

~~~text
Profile / Resume / JD
        ↓
Topic / Question Library
        ↓
Practice Session
        ↓
Attempt
        ↓
LLM Evaluation
        ↓
Covered / Missing Points
        ↓
Weak Topics / Mastery
        ↓
Next Study Plan
        ↓
下一轮更有针对性的练习
~~~

这是项目的核心价值，也是后续 Agent 化的基础。

---

# 五、技术架构决策

## 5.1 前端当前状态

当前仓库仍使用：

- React 19
- TypeScript
- Vite
- React Router
- Axios
- TanStack Query
- Tailwind CSS v4
- shadcn/ui / Base UI
- Lucide
- Vitest / Testing Library

当前先完成真实业务闭环，不为了“追新技术”立即重写。

## 5.2 Next.js 决策

Next.js 正式加入学习主线。

未来 StudyMate 前端迁移目标：

> Next.js + App Router

不是“Next.js 和 App Router 二选一”。

Next.js 是框架，App Router 是我们选择的 Next 路由 / 应用架构。

重点学习：

- app 目录
- page.tsx
- layout.tsx
- nested layout
- Server Component
- Client Component
- use client
- loading.tsx
- error.tsx
- Suspense
- Streaming
- Server / Client 数据边界
- Metadata / SEO
- Cache / Revalidate
- Server Actions 基础

迁移时不删除 FastAPI。

目标架构：

~~~text
Next.js
  ↓
FastAPI
  ↓
PostgreSQL / Redis
  ↓
LLM / Agent / RAG / MCP
~~~

Next 负责 Web / React / 路由 / 渲染体验；FastAPI 负责核心业务 API、AI、Agent、数据库和工作流。

## 5.3 Python 单一路线

后端与 Agent 开发统一选择 Python。

不学习 Java / Spring / Spring Cloud 作为当前路线。

Java 课程中出现的语言无关工程思想可以吸收，但全部使用 Python 生态实现，例如：

- OAuth2 / OIDC
- JWT
- RBAC
- 事务
- 缓存
- 消息 / 后台任务
- 限流
- 重试
- 日志
- 测试
- 可观测性

Python 技术栈：

- Python
- FastAPI
- Pydantic
- SQLAlchemy
- Alembic
- PostgreSQL
- Redis
- pytest

---

# 六、从 Web Agent / Agent 课程体系吸收的能力

2026-09-20 对外部 Web Agent 学习体系进行了筛选。

值得加入主线的内容：

## Python 工程基础

- 类型标注
- Generic / TypeVar
- 装饰器
- 迭代器 / 生成器
- 上下文管理器
- 模块化
- 事件循环
- Future
- Coroutine
- async / await
- 基础并发
- 调试
- 项目 / 依赖管理

元类、描述符等高级 Python 知识保留为低优先级，不为了完整课程而提前深挖。

## Python Web 工程

- 分层目录
- ORM
- 数据迁移
- Service 层
- Dependency Injection
- 统一异常
- Middleware
- 测试
- 用户系统
- 日志
- Streaming Response
- Docker / CI/CD

## Agent 基础

- Token / Embedding / Attention / Transformer 基本认知
- System Prompt
- Message / Conversation
- Tool Calling
- Tool 封装
- ReAct
- Agent Loop
- Skill
- MCP
- SubAgent
- Prompt Engineering
- Context Engineering
- Harness Engineering
- Loop Engineering
- Graph Engineering

不把神经网络训练、梯度推导、模型训练实现作为当前主攻。

## LangGraph

- State
- Message
- Reducer
- Tool Node
- Thread
- Checkpoint
- Runtime / Config
- Subgraph
- Retry / Fault Tolerance
- Command
- Interrupt
- Human-in-the-loop
- Fan-out
- Cancel
- Event Stream
- Store
- Long-term Memory
- A2A 基础

## RAG

- Tokenization
- Embedding
- Vector Database
- Chunking
- Data Cleaning
- Retrieval
- Metadata Filter
- Hybrid Search
- Rerank
- Multi-source
- Multimodal RAG 基础
- Semantic Routing
- Cache
- RAG Evaluation

## Agent 工程化

- Structured Output
- Middleware
- Dynamic Prompt / Model
- PII
- Tool Interrupt
- Sandbox 基础
- File Permission
- Memory
- Context Compression
- Plan-then-act
- Multi-Agent
- SubAgent
- Handoff / Router
- Authentication / Authorization / Isolation

## 部署与生产化

- Linux 常用运维
- Nginx
- Docker
- Docker Compose
- GitHub Actions / CI/CD
- HTTPS
- Logging
- Metrics
- Tracing
- Prometheus / Grafana 基础
- 高可用概念

---

# 七、明确暂不主攻

当前不投入大量时间：

- Java / Spring / Spring Cloud
- Dubbo / Netty / MyBatis
- 大规模微服务体系
- 深入 Kubernetes
- PyTorch / TensorFlow
- CUDA
- 全量微调
- LoRA / QLoRA
- RLHF / DPO
- 分布式训练
- 大模型推理优化
- 数据科学完整课程
- Dify 深入开发

这些只有在真实岗位反馈要求时再增加。

---

# 八、开发与学习分工

## 用户必须亲手掌握

- React 核心
- React 状态 / Render
- Router 核心
- Axios
- TanStack Query
- Zustand
- Next.js / App Router 核心
- Python
- FastAPI
- PostgreSQL
- LLM / Structured Output
- Agent / LangGraph
- RAG
- MCP
- Web Agent
- 关键系统设计

## Codex 负责加速但不替代学习

适合 Codex：

- 静态页面
- Tailwind
- shadcn 组合
- 重复组件
- 响应式适配
- UI 重构
- 测试补充
- 机械重复工作

原则：

> UI 可以快速做；核心数据流和 AI / Agent 能力第一次必须理解。

---

# 九、固定教学方式

每个新知识尽量按照：

~~~text
一句大白话
↓
最小代码
↓
为什么这么写
↓
底层原理
↓
和 Vue / 已学 JS 对照
↓
放进 StudyMate
↓
面试怎么说
↓
可能追问
~~~

用户喜欢逐步推进。

遇到报错时停止扩展，只处理当前错误。

正常学习可以加速，但不能突然丢出大量陌生代码。

---

# 十、强制每日文档同步协议

从 2026-09-20 起，这是长期规则，不是可选项。

每个实际学习日结束前，必须同步文档。

## docs/02-progress.md

必须更新：

- LAST UPDATED
- CURRENT LEARNING POINTER
- 今天完成的知识
- 今天亲手写的代码
- 项目变化
- 尚未掌握
- 下一步唯一入口
- 当日日志

这是新聊天恢复学习位置的第一依据。

## docs/03-learning-notes.md

当天真正学懂的新知识，按知识点沉淀。

不能把“计划学习”写成“已学习”。

## docs/04-interview-notes.md

当天已经理解、可以开始口述的高频知识，转成面试答案。

## docs/05-mistakes.md

只有真实出现过并完成排查的 Bug / Bad Case 才记录。

## docs/00-context.md

只有方向、架构、长期规则发生变化时更新，不每天堆流水账。

## docs/01-study-plan.md

学习路线新增 / 删除 / 调整时更新，不用于记录每日完成情况。

---

# 十一、学习进度标识

统一使用：

- ✅ 已学习并基本理解
- 🟡 正在学习 / 还需练习
- ⏭ 下一步
- ⬜ 尚未开始
- 🔴 当前阻塞
- 🧪 已接触但需要项目实践

注意：

> “Codex 已经写进代码”不等于“用户已学习”。

学习进度只按用户真正讲过、问过、理解过的内容标记。

---

# 十二、新聊天恢复协议

任何新的 ChatGPT 会话，如果要继续 StudyMate 学习：

1. 读取 docs/00-context.md
2. 读取 docs/02-progress.md
3. 找到 CURRENT LEARNING POINTER
4. 查看“上一学习日”和“下一步”
5. 如需完整路线，再读 docs/01-study-plan.md
6. 如需确认是否已经学过某知识，再查 docs/03-learning-notes.md
7. 不从头复述，不重新规划，不跳过当前未完成知识

---

# 十三、当前真实位置

长期文档不复制动态进度。

截至本次调整，准确位置请看：

> docs/02-progress.md → CURRENT LEARNING POINTER
