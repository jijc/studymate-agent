# StudyMate 每日学习进度与当前指针

> 这是整个仓库最重要的动态学习文档。  
> LAST UPDATED：2026-09-22  
> 更新规则：每个实际学习日结束前必须更新。  
> 新聊天优先读本文件顶部，不要从旧 Day 重新开始。

---

# 🚩 CURRENT LEARNING POINTER

## 当前阶段

**阶段 1：React 数据流 + Axios + TanStack Query + FastAPI 真实闭环**

## 当前正在学习

🟡 TanStack Query 服务端状态管理。

已经讲到：

- ✅ QueryClient / QueryClientProvider
- ✅ useQuery（查询服务端数据）
- ✅ queryKey（查询键 / 缓存数据的身份证）
- ✅ queryFn（查询函数）
- ✅ useQuery 会随组件 render（重新渲染）运行，但 queryFn 不等于每次 render 都请求
- ✅ TanStack Query 根据 queryKey / cache（缓存）/ stale（陈旧）状态决定是否请求
- ✅ data 请求前为什么是 undefined
- ✅ React state / query state 变化为什么会触发 re-render（重新渲染）
- ✅ isPending（尚未拿到成功数据）
- ✅ isLoading（首次加载状态）
- ✅ isFetching（正在请求）
- ✅ refetch（重新获取）
- ✅ staleTime（数据保持“新鲜”的时间）
- ✅ queryKey 带参数：所有会影响 queryFn 返回结果的参数通常都应进入 queryKey
- ✅ useMutation（服务端修改操作）
- ✅ mutate（真正触发修改操作）
- ✅ mutationFn（修改操作函数）
- ✅ onSuccess（成功回调）
- ✅ onError（失败回调）
- ✅ onSettled（无论成功失败都会执行的收尾回调）
- ✅ AI 长耗时请求与 Axios timeout（超时）的关系
- ✅ invalidateQueries（使查询缓存失效 / 宣告缓存不再可靠）

## 下一步唯一入口

⏭ **停止继续堆 TanStack Query 理论，进入 StudyMate 真实项目实践。**

严格按：

~~~text
先梳理 PracticeSession 当前静态题目模型
↓
对照 FastAPI 当前 /questions/today 返回结构
↓
确定第一版真实题目 API 契约
↓
先接真实 GET + useQuery
↓
页面跑通 Loading / Error / Data
↓
再接 POST /attempts + useMutation
↓
接 AI 评分 Pending / Success / Error
↓
最后用 invalidateQueries 更新受影响缓存
↓
完成第一条真实前后端闭环
~~~

在这条闭环完成前，不因为 Next / Agent 新知识而跳走。

## Next.js 状态

🧪 已完成技术路线决策，还没有正式学习。

决策：

> StudyMate 未来使用 Next.js + App Router。

开始条件：

> 第一条 React + FastAPI 真实查询 / 提交闭环跑通后进入。

## Agent 状态

🧪 已重新整理完整技能地图，还没有进入 LangGraph / RAG / MCP 主学习阶段。

---

# 一、当前项目代码状态

截至 2026-09-22，本轮学习前已重新同步 main，最新基准：

~~~text
bec542e121acce49e19557605124adf6bac76ae9
Merge branch 'main' of https://github.com/jijc/studymate-agent
~~~

其前一业务提交：

~~~text
889d5e9e2d89b7db767a3b22ae494e7ffa8e4b74
feat: 修改
~~~

Codex 已帮助完成大量静态产品与本地交互。

当前已存在主要路由：

- /
- /login
- /practice
- /practice/records
- /practice/records/:recordId
- /practice/session/:source/:libraryId
- /questions
- /questions/ai
- /questions/:libraryId
- /reports
- /profile/*

当前 PracticeSessionPage 已包含：

- useState
- useEffect
- useParams
- useNavigate
- 逐题回答
- 草稿 / 已提交状态
- sessionStorage 本地记录链路

注意：

> “代码中已经存在”不等于“已经学会”。

Codex 写出的 React 代码会作为后续真实学习素材，不强迫用户重新手写所有静态 UI。

---

# 二、当前真实技术栈

前端：

- React 19
- TypeScript
- Vite
- React Router 8
- Axios
- TanStack Query
- Tailwind CSS v4
- shadcn / Base UI
- Lucide
- Vitest / Testing Library

后端：

- Python
- FastAPI
- Pydantic
- api / schemas / services 分层

后续：

- PostgreSQL
- SQLAlchemy
- Alembic
- Redis
- Next.js + App Router
- LLM
- LangGraph
- RAG
- MCP

---

# 三、已学习知识总览

## React

- ✅ JSX
- ✅ Component
- ✅ props
- ✅ children
- ✅ ReactNode 基础
- ✅ map 列表渲染
- ✅ key
- ✅ && 条件渲染
- ✅ 三元表达式基础
- ✅ className / cn 基础
- ✅ 事件
- ✅ useState
- ✅ 数组解构
- ✅ setter
- ✅ functional update
- ✅ controlled input
- ✅ onChange
- ✅ onSubmit
- ✅ preventDefault
- ✅ useEffect 基础
- ✅ state 改变 → re-render
- ✅ 普通变量改变不会自动触发 re-render

仍需：

- ⬜ useRef
- ⬜ useMemo
- ⬜ useCallback
- ⬜ Context 深入
- ⬜ custom hook
- ⬜ React 性能
- ⬜ Fiber 基础

## React Router

- ✅ BrowserRouter
- ✅ Routes / Route
- ✅ Link
- ✅ NavLink
- ✅ useNavigate
- ✅ replace
- ✅ Layout / Outlet
- ✅ Outlet 和 Vue router-view 对照
- 🧪 useParams 已在项目里出现，仍需系统练习

## TypeScript / API 类型

- ✅ import type
- ✅ type 基础
- ✅ Generic 的直觉
- ✅ ApiResponse<T>
- ✅ API 类型推导
- ✅ 为什么 useQuery 不需要重复手写 ApiResponse<Question[]>
- ✅ 对象解构 data: xxx 是重命名，不是类型声明

## Axios

- ✅ axios.create
- ✅ baseURL
- ✅ timeout
- ✅ request interceptor
- ✅ response interceptor
- ✅ Promise.reject
- ✅ env 基础
- ✅ API 层与 http 层职责
- ✅ 全局保留 AxiosResponse、API 函数返回业务 response.data 的设计
- ✅ getTodayQuestions 返回 ApiResponse<Question[]>

## TanStack Query

- ✅ QueryClient
- ✅ QueryClientProvider
- ✅ useQuery（查询）
- ✅ queryKey（查询键 / 缓存身份证）
- ✅ queryFn（查询函数）
- ✅ server state（服务端状态）基础
- ✅ data 生命周期
- ✅ cache（缓存）基础
- ✅ re-render（重新渲染）与 queryFn 的区别
- ✅ isPending
- ✅ isLoading
- ✅ isFetching
- ✅ refetch（重新获取）
- ✅ staleTime（新鲜时间）
- ✅ queryKey 参数
- ✅ useMutation（修改服务端数据）
- ✅ mutate（触发修改）
- ✅ mutationFn（修改函数）
- ✅ onSuccess / onError / onSettled
- ✅ invalidateQueries（使缓存失效）
- ⬜ enabled（是否启用查询）
- ⬜ retry（失败重试）配置
- ⬜ optimistic update（乐观更新）
- 🧪 当前开始把以上知识接入真实 Practice 业务

## Python / FastAPI

- ✅ FastAPI 最小应用
- ✅ GET
- ✅ POST
- ✅ Query
- ✅ JSON
- ✅ list slice
- ✅ APIRouter
- ✅ include_router
- ✅ Pydantic BaseModel
- ✅ Field
- ✅ response_model
- ✅ 422
- ✅ Schema / Service 基础分层
- ✅ Structured Output 初步概念
- ✅ typing / TypeVar / Generic 初步
- 🟡 Python 基础仍需继续系统补强

---

# 四、已经形成的关键理解

## React render

用户已经理解到：

> 组件函数不是只执行一次。state / query state 改变后，React 会再次执行组件函数，重新计算 UI。

并已区分：

~~~text
普通变量变化
≠
自动触发 render

useState / query state / props / context 等变化
→
可能触发 render
~~~

## useQuery 与 queryFn

已经理解：

~~~text
PracticePage re-render
↓
useQuery 再运行
↓
不代表 queryFn 一定重新发请求
↓
TanStack Query 根据 queryKey / cache / stale / 配置决定
~~~

## queryKey

当前推荐项目命名：

~~~text
["todayQuestions"]
~~~

后面带参数时再扩展。

字符串 "questions" 与 const questions 变量不会命名冲突。

---

# 五、产品方向变化记录

## 2026-09-20

StudyMate 正式从早期“儿童学习 Agent”方向调整为：

> IT 人员学习 / 练习 / AI 辅助训练 / AI 评分 / 面试提升平台。

当前重点：

- 前端
- AI 前端
- Agent
- Python / FastAPI
- IT 技术知识

新增规划：

- 简历专项
- JD 专项
- AI 题库
- AI 评分
- Weak Topics
- 面试报告
- 未来 Pro

儿童英语 / 数学不再列为当前两个月强制主线。

---

# 六、技术路线变化记录

## 2026-09-20：加入 Next.js

决定：

~~~text
Next.js + App Router
~~~

不使用 Pages Router 作为主学习路线。

Vite React 不立刻重写。

先利用当前项目学懂：

- React
- Axios
- TanStack Query
- FastAPI

跑通真实闭环后再迁 Next。

## 2026-09-20：吸收 Web Agent 技能体系

决定吸收：

- Python 工程
- PostgreSQL
- FastAPI 工程化
- Agent Loop
- Skill
- MCP
- Context Engineering
- LangGraph
- HITL
- Memory
- RAG
- Evaluation
- Web Agent
- Docker / CI/CD / Observability

明确不学：

- Java / Spring 主线
- 模型微调主线
- 深入 K8s
- 完整数据科学课程

---

# 七、每日学习日志

> 旧日期依据真实聊天和 Git 提交补录；从 2026-09-20 起严格按实际学习日更新。

## 2026-09-11｜项目与基础启动

状态：✅

学习 / 实践：

- FastAPI 最小应用
- GET / POST
- Query
- Pydantic
- 基础后端目录拆分
- React + TypeScript + Vite 初始化
- pnpm
- React / Vue 对照学习方式确定
- StudyMate 第一版学习路线建立

项目：

- FastAPI 后端基础
- React 项目初始化
- UI 风格方案确定

## 2026-09-12 ～ 2026-09-13｜React 页面与路由阶段

状态：✅ / 🧪

学习：

- JSX
- Component
- props
- children
- map
- conditional rendering
- BrowserRouter
- Link / NavLink
- useNavigate
- Routes / Route
- Layout / Outlet
- useState
- 受控表单

项目：

- 首页
- Header
- 路由
- 登录 / 注册静态页
- shadcn / Tailwind 逐步进入项目

说明：

大量静态 UI 后续允许 Codex 加速；学习重点转向核心 React 和数据流。

## 2026-09-16｜Axios + API 工程 + TanStack Query 起步

状态：✅ / 🟡

学习：

- Axios 与 fetch 的定位
- axios.create
- interceptor
- env
- ApiResponse<T>
- Question 类型
- http 层 / api 层职责
- Pydantic Generic / TypeVar
- QueryClientProvider
- useQuery
- queryKey
- queryFn
- data / isPending / isError / error
- data 为什么可能 undefined

关键决策：

- http.ts 保留完整 AxiosResponse
- API 函数返回 response.data
- 页面得到业务对象 res.code / res.msg / res.data

## 2026-09-18｜React Re-render + Query 状态

状态：✅

重点理解：

- return 只结束当前一次 render
- 请求回来后 query state 变化会触发新的 render
- useQuery 会随 render 再执行
- queryFn 不等于每次 render 都调用
- cache / queryKey 决定数据身份
- isPending / isLoading / isFetching
- refetch
- staleTime

这是 React 状态思维的重要节点。

## 2026-09-20｜项目方向 / Next / Agent 路线重构

状态：✅ 规划完成

完成：

- 重新同步 GitHub 最新静态页面代码
- 确认 Codex 负责 UI 加速的分工
- StudyMate 改为 IT 学习 / 面试训练平台
- Pro 作为未来能力
- Next.js 正式加入路线
- 选择 App Router
- FastAPI 保留
- Python 成为唯一后端 / Agent 主语言
- 阅读并筛选 Web Agent 技能体系
- 增加 LangGraph / RAG / MCP / Web Agent / Eval / Production 工程能力
- 建立强制每日学习文档同步制度

### 当天学习状态

今天主要是路线和项目同步，不把尚未讲解的 Next / Agent 技能误标为“已学习”。

### 下一步

⏭ 回到 TanStack Query：queryKey 带参数。

---

# 八、每天结束时必须填写的模板

~~~markdown
## YYYY-MM-DD｜主题

状态：✅ / 🟡

### 今天真正学懂

- 

### 今天亲手写 / 修改

- 

### 项目发生变化

- 

### 我问过并搞懂的问题

- 

### 仍然模糊

- 

### 面试可说

- 

### 下一步唯一入口

- 

### Git

- commit:
~~~

---

# 九、新对话恢复提示

如果只读 30 秒：

1. 看 CURRENT LEARNING POINTER
2. 看“下一步唯一入口”
3. 看最近一个每日学习日志

当前不要重新讲 React JSX，也不要直接跳到 Next / LangGraph。

下一步：

> queryKey 带参数 → useMutation → invalidateQueries → Practice 真实 FastAPI 闭环。


## 2026-09-22｜TanStack Query Mutation + 缓存失效 + 项目实践切换

状态：✅ 概念完成 / 🧪 等待真实项目落地

### 今天真正学懂

- queryKey（查询键）带参数：参数影响返回结果时，应进入 queryKey。
- useMutation（服务端修改操作）和 useQuery（查询）的职责区别。
- mutate（触发修改）才会真正执行 mutationFn（修改操作函数）。
- isPending（等待中）可以直接用于 AI 评分的“正在评分”状态。
- onSuccess（成功回调）、onError（失败回调）、onSettled（收尾回调）。
- AI 评分可能耗时 15 秒以上，异步请求本身没有问题，但要注意 Axios timeout（超时）。
- 普通接口与 AI 长耗时接口可以使用不同 timeout。
- invalidateQueries（使查询缓存失效 / 宣告缓存不再可靠）的作用。
- invalidate 不等于 delete（删除）；它更接近“这份缓存可能旧了，不应继续当成 fresh（新鲜）数据”。
- mutation 成功后，应根据“这次修改影响了哪些服务端数据”决定 invalidation（缓存失效）哪些 query。

### 今天形成的重要工程判断

第一版 AI 评分：

~~~text
useMutation
↓
POST /attempts
↓
AI 等待十几秒
↓
isPending 显示“AI 正在评分”
↓
EvaluationResult
~~~

先跑通同步长请求。

后期 Agent / RAG 链路耗时明显增加后，再升级：

~~~text
快速提交任务
↓
processing（处理中）
↓
SSE / Streaming（流式推送）
↓
实时评分 / Agent 状态
~~~

### 学习表达方式新增长期规则

用户明确反馈：

> 英文 API / 方法名后直接加中文翻译或用途解释，记忆效果明显更好。

以后例如：

- invalidateQueries（使查询缓存失效）
- mutationFn（修改操作函数）
- refetch（重新获取）
- stale（陈旧 / 不再新鲜）

必须尽量采用这种写法。

另外，“你现在应该记住的完整代码”是有效的重点提示，后续继续保留。

### 项目同步结果

已重新读取当前 PracticeSessionPage、前端 questions API、后端 questions / attempts API。

当前发现：

- PracticeSessionPage 仍使用 data/practiceSession.ts 的静态题目。
- 前端已经存在 getTodayQuestions(limit)。
- FastAPI 已存在 GET /questions/today。
- FastAPI 已存在 POST /attempts。
- 当前静态 Practice 模型与 /questions/today 的返回结构还不完全一致。
- 因此下一步不应直接硬替换，先确定真实 API 契约。

### 下一步唯一入口

⏭ **梳理 PracticeSession 静态题目结构和后端 Question 结构的差异，确定第一版真实 GET 接口。**
