# StudyMate 每日学习进度与当前指针

> 这是整个仓库最重要的动态学习文档。  
> LAST UPDATED：2026-09-20  
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
- ✅ useQuery
- ✅ queryKey 的作用
- ✅ queryFn 的作用
- ✅ useQuery 会随组件 render 运行，但 queryFn 不等于每次 render 都请求
- ✅ TanStack Query 根据 queryKey / cache / stale 状态决定是否请求
- ✅ data 请求前为什么是 undefined
- ✅ React state / query state 变化为什么会触发 re-render
- ✅ isPending
- ✅ isLoading
- ✅ isFetching
- ✅ refetch
- ✅ staleTime

## 下一步唯一入口

⏭ **queryKey 带参数**

然后严格按：

~~~text
queryKey 参数
↓
useMutation
↓
onSuccess / onError
↓
invalidateQueries
↓
把真实 FastAPI GET 接入现有 Practice 业务
↓
把提交答案改为真实 POST
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

截至 2026-09-20，main 最新同步基准：

~~~text
389439caad2dda06dfadd50e1ac462c47882fee3
feat: 静态页面开发
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
- ✅ useQuery
- ✅ queryKey
- ✅ queryFn
- ✅ server state 基础
- ✅ data 生命周期
- ✅ cache 基础
- ✅ re-render 与 queryFn 的区别
- ✅ isPending
- ✅ isLoading
- ✅ isFetching
- ✅ refetch
- ✅ staleTime
- ⏭ queryKey 参数
- ⬜ enabled
- ⬜ retry 配置
- ⬜ useMutation
- ⬜ invalidateQueries
- ⬜ optimistic update

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
