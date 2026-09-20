# StudyMate AI 前端 / Agent 工程师学习计划

> 版本：v2.0  
> 更新日期：2026-09-20  
> 原则：项目驱动、Python 单路线、React / Next + Agent 并重。  
> 本文是路线图，不代表实际完成度。实际进度只以 docs/02-progress.md 为准。

---

# 一、最终目标

目标不是“看完课程”，而是在约 8 周的强化周期内形成：

~~~text
多年 Vue / Web 前端经验
        +
React + TypeScript
        +
Next.js + App Router
        +
Python + FastAPI
        +
PostgreSQL / Redis
        +
LLM / Agent / LangGraph
        +
RAG / MCP / Web Agent
        +
Evaluation / Deployment
~~~

最终求职方向：

1. AI 前端工程师
2. Agent 前端工程师
3. AI 产品前端
4. AI 全栈（前端侧重）
5. Agent 应用开发

---

# 二、学习原则

## 2.1 项目与学习并行

StudyMate 是主项目。

任何核心知识尽量当天进入项目，而不是先学完几个月再做项目。

## 2.2 Codex 和本人分工

Codex 可以快速完成：

- 静态 UI
- Tailwind / shadcn
- 重复页面
- 响应式
- 测试骨架
- 机械性代码

本人必须理解并尽量亲手完成第一遍：

- React 核心
- 网络请求
- 状态管理
- TanStack Query
- Next 核心
- Python / FastAPI
- 数据库
- LLM
- Agent
- LangGraph
- RAG
- MCP

## 2.3 Python 单后端路线

不学习 Java / Spring 作为当前主线。

OAuth2、RBAC、缓存、事务、消息、日志、测试等工程知识，用 Python 生态学习。

## 2.4 不追求“课程全覆盖”

外部课程只作为技能地图。

与求职 / StudyMate 强相关的吸收；过深、过早、偏 Java、偏模型训练的暂不学。

---

# 三、阶段 1：React 数据流与真实前后端闭环

## 当前优先级：最高

目标：

> 把目前 Codex 完成的静态 StudyMate 页面，接成真实 React → FastAPI 数据链路。

### React 已学 / 必学

- JSX
- Component
- props
- children
- map
- 条件渲染
- useState
- state 与 re-render
- 事件
- 表单受控输入
- useEffect
- Router
- Link / NavLink
- useNavigate
- useParams
- Layout / Outlet

### React 后续补齐

- useRef
- Context
- useMemo
- useCallback
- custom hooks
- Error Boundary
- 性能优化
- React render / reconciliation / Fiber 基础

### API 工程

- Axios instance
- baseURL / env
- request interceptor
- response interceptor
- ApiResponse<T>
- API 文件分层
- HTTP 错误处理
- Token
- CORS
- Timeout / Abort

### TanStack Query

- QueryClient / Provider
- useQuery
- queryKey
- queryFn
- data / cache
- isPending
- isLoading
- isFetching
- refetch
- staleTime
- queryKey 带参数
- enabled
- retry
- useMutation
- onSuccess / onError
- invalidateQueries
- optimistic update 基础
- query cache 与 server state 思维

### 阶段验收

真实完成：

~~~text
Practice 页面
↓
GET FastAPI 题目
↓
显示题目
↓
用户输入答案
↓
POST FastAPI
↓
显示后端返回反馈
~~~

---

# 四、阶段 2：Next.js + App Router

开始条件：

> 第一条 React + FastAPI 真实查询 / 提交闭环跑通。

不等 React 所有知识学完，但也不在当前 API 基础没打稳前强行重构。

## Next.js 核心

- Next 项目结构
- App Router
- app/
- page.tsx
- layout.tsx
- nested layout
- dynamic route
- Link
- useRouter
- usePathname
- params / searchParams
- not-found
- loading
- error

## Server / Client

- Server Component
- Client Component
- use client
- 为什么 useState / useEffect 必须在 Client Component
- Server Component 能做什么
- 浏览器 API 边界
- sessionStorage / localStorage 边界

## 数据与渲染

- Server fetch
- Client fetch
- TanStack Query 在 Next 中的位置
- SSR
- SSG
- Dynamic Rendering
- Suspense
- Streaming
- Cache
- Revalidate

## 其他

- Metadata
- SEO
- Image
- Font
- Route Handler 基础
- Server Actions 基础

## StudyMate 迁移练习

优先迁移现有真实页面，而不是新建 Todo Demo：

~~~text
React Router → App Router
MainLayout / Outlet → layout.tsx + children
Practice route → app/practice
PracticeSession → dynamic route
useNavigate → useRouter
~~~

---

# 五、阶段 3：Python 核心 + FastAPI 工程化

## Python A 级：必须熟练

- 基础语法
- list / dict / tuple / set
- 函数
- 作用域
- lambda
- class / object
- exception
- type annotation
- module / package
- decorator
- iterator
- generator
- context manager
- async / await
- event loop
- coroutine
- Future 基础
- debugging

## Python B 级：理解并用到再加深

- magic methods
- callable
- ABC
- threading / multiprocessing
- package build
- project dependency management
- monorepo 基础

## Python C 级：当前低优先级

- metaclass
- descriptor 深入
- Python 解释器内部实现

## FastAPI

- FastAPI app
- Router
- Query / Path / Body
- Pydantic
- Generic / TypeVar
- response_model
- Dependency Injection
- Middleware
- Exception Handler
- CORS
- Authentication
- File Upload
- Streaming Response
- Background Task
- Logging
- pytest
- API tests
- OpenAPI

## 分层

~~~text
api/
schemas/
services/
models/
agents/
tools/
~~~

理解 API / Service / ORM / Agent 的边界。

---

# 六、阶段 4：PostgreSQL + 数据持久化 + 用户系统

## SQL

- DDL
- DML
- SELECT
- INSERT
- UPDATE
- DELETE
- WHERE
- ORDER BY
- GROUP BY
- JOIN
- transaction
- index
- foreign key
- relation
- query plan 基础

## Python Database

- SQLAlchemy
- ORM
- Session
- relationship
- Alembic migration
- transaction boundary

## StudyMate 数据

优先围绕：

~~~text
users
profiles
topics
questions
rubrics
practice_sessions
attempts
evaluations
mastery
study_plans
agent_runs
tool_calls
~~~

## 用户系统

- password hash
- JWT
- access token
- refresh token 基础
- OAuth2 概念
- OIDC 概念
- RBAC
- route protection

OAuth2 / RBAC 不使用 Java 实现，统一 FastAPI / Python。

---

# 七、阶段 5：LLM 应用与 AI 评分

## LLM 基础

需要理解但不做模型训练：

- Token
- Context Window
- Embedding
- Attention / Transformer 基础认知
- inference
- System / User / Assistant message
- temperature
- latency
- cost

## Prompt / Context

- Prompt Engineering
- Context Engineering
- system prompt
- few-shot
- output constraints
- context assembly

## Structured Output

StudyMate 核心：

~~~json
{
  "score": 72,
  "covered_points": ["tool_calling"],
  "missing_points": ["state", "retry"],
  "weak_topics": ["agent_state"]
}
~~~

学习：

- JSON Schema
- Pydantic
- output validation
- parsing error
- retry
- fallback
- provider abstraction

## Rubric Evaluation

- rubric
- reference answer
- scoring dimension
- deterministic rule + LLM
- score explanation
- evaluation consistency

---

# 八、阶段 6：Agent 原理 + LangGraph

先理解 Agent，再学框架。

## Agent 原理

- Tool Calling
- Tool Schema
- ReAct
- Agent Loop
- Observation / Action
- Stop Condition
- Planning
- Retry
- Timeout
- Fallback
- Skill
- SubAgent
- Context Engineering
- Harness Engineering
- Loop Engineering
- Graph Engineering

## LangGraph

- State
- Node
- Edge
- Conditional Edge
- Message
- Reducer
- Tool Node
- Runtime
- Config
- Thread
- Checkpoint
- Store
- Subgraph
- Command
- Interrupt
- Human-in-the-loop
- Retry / Fault Tolerance
- Cancel
- Event Stream
- Fan-out
- Long-term Memory
- A2A 基础

## StudyMate Agent

~~~text
读取历史 Mastery
↓
选择 Weak Topics
↓
调用题库 Tool
↓
生成本轮练习
↓
用户作答
↓
评分
↓
判断是否追问
↓
更新 Mastery
↓
生成下一轮计划
~~~

---

# 九、阶段 7：RAG

目标不是“接一个向量库就算会 RAG”，而是理解质量链路。

- Tokenization
- Embedding
- Chunking
- Data Cleaning
- Metadata
- Vector DB
- pgvector / Qdrant 选一
- Retrieval
- Keyword Search
- Hybrid Search
- Query Rewrite
- Rerank
- Citation
- Context Assembly
- Cache
- Multi-source
- Multimodal RAG 基础
- Semantic Routing
- RAG Evaluation
- Bad Case

StudyMate 可用资料：

- 技术笔记
- 面试笔记
- 题库
- 用户上传简历
- JD
- 后续个人学习资料

---

# 十、阶段 8：MCP + Web Agent + 高级 Agent

## MCP

- MCP 解决什么问题
- Client
- Server
- Tool
- Resource
- Prompt
- stdio
- Streamable HTTP
- MCP + FastAPI
- Tool permission
- MCP testing

## Web Agent

- Playwright
- Browser automation
- DOM
- Accessibility Tree
- click
- type
- scroll
- navigate
- browser session
- cookie
- screenshot / vision
- error recovery
- task evaluation

## 高级 Agent

- sandbox 基础
- file tools
- PII
- context compression
- plan-then-act
- multi-agent
- supervisor
- delegation
- SubAgent
- async subagent
- handoff
- router
- resource isolation

这些后置，不能抢占前面真实闭环。

---

# 十一、阶段 9：Evaluation 与生产工程

## AI / Agent Evaluation

- Golden Dataset
- expected behavior
- deterministic eval
- LLM-as-Judge
- regression
- bad case
- tool success rate
- latency
- token / cost
- trace

## Web 工程

- unit test
- integration test
- E2E
- API contract
- error code
- logging

## Redis

- cache
- session
- rate limit
- temporary agent state
- cache penetration / breakdown / avalanche 概念

## 部署

- Linux
- SSH
- Nginx
- reverse proxy
- HTTPS
- Docker
- Docker Compose
- GitHub Actions
- CI/CD
- rollback

## Observability

- logs
- metrics
- trace
- Prometheus 基础
- Grafana 基础
- alert 基础

---

# 十二、当前不主攻

- Java / Spring / Spring Cloud
- Dubbo / Netty
- Java 微服务全家桶
- Kubernetes 深入
- PyTorch / TensorFlow
- CUDA
- SFT / LoRA / QLoRA
- RLHF / DPO
- 分布式训练
- 大模型底层训练工程
- 完整数据科学课程
- Dify 深入

---

# 十三、建议 8 周节奏

这是阶段建议，不是死日历。卡住的知识可以跨天。

## Week 1-2

- React 核心
- Axios
- TanStack Query
- FastAPI
- 第一条真实 Practice 闭环
- Python 基础补强

## Week 2-3

- Next.js + App Router
- PostgreSQL / SQLAlchemy / Alembic
- 用户系统
- API 工程化

## Week 3-4

- LLM
- Structured Output
- Rubric AI 评分
- Attempt / Evaluation 持久化
- Weak Topics

## Week 4-5

- Agent 原理
- Tool Calling
- ReAct
- LangGraph
- Checkpoint
- HITL
- Streaming

## Week 5-6

- RAG
- Hybrid Search
- Rerank
- Evaluation
- 简历 / JD / 技术资料接入

## Week 6-7

- MCP
- Skill
- SubAgent
- Web Agent 基础
- Agent Evaluation

## Week 7-8

- Docker / CI/CD
- Observability
- 项目部署
- 项目架构 / 面试表达
- 大量真实面试 + 反向补短板

---

# 十四、阶段验收

## 验收 A：Web 闭环

React / Next 能真实调用 FastAPI，完成查询和提交。

## 验收 B：数据闭环

练习记录进入 PostgreSQL，可查询历史。

## 验收 C：AI 闭环

开放式答案由 LLM 按 Rubric 返回 Structured Output。

## 验收 D：个性化闭环

Weak Topics / Mastery 会影响下一轮练习。

## 验收 E：Agent 闭环

Tool + State + Workflow + Checkpoint 真正在项目中工作。

## 验收 F：RAG / MCP

至少一个真实 RAG 能力和一个真实 MCP Tool 接入项目。

## 验收 G：生产化

Docker 部署、有日志、有基本测试、有项目说明和架构图。

---

# 十五、每日实际进度怎么管理

本文永远只描述“应该往哪里走”。

真正每天学到哪里，统一写入：

> docs/02-progress.md

每天学习结束必须：

1. 移动 CURRENT LEARNING POINTER
2. 记录当天实际学习内容
3. 标记 ✅ / 🟡 / ⏭
4. 将学懂知识补到 03-learning-notes
5. 将可口述面试点补到 04-interview-notes
6. 有真实 Bug 才补 05-mistakes

换新对话时，不按照 Week 计划猜进度，只按照 02-progress 继续。
