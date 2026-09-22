# StudyMate Agent 面试笔记

> 目的：不是等两个月后再背题，而是每天学习一个知识点，就同步积累一个可直接口述的面试答案。

## 固定记录格式

```markdown
## 问题：

### 一句话本质

### 项目实例

### 面试可直接说的答案

### 面试官可能继续追问

### 关联知识
```

---

## 当前索引

尚未开始 Day 1。

后续优先覆盖：

- JavaScript / TypeScript
- React
- 浏览器 / HTTP
- SSE / WebSocket
- Python / FastAPI
- PostgreSQL / Redis
- LLM
- Tool Calling
- RAG
- LangGraph
- Agent State / Memory / Checkpoint
- Evaluation / Bad Case


---

# 2026-09-20 补录：React / TanStack Query 高频问答

## 问题：React 函数组件为什么会执行多次？

### 一句话本质

React 函数组件本质上是根据当前 props 和 state 计算 UI 的函数；相关状态变化时，React 会重新 render，也就是再次执行组件函数。

### 项目实例

PracticePage 中 TanStack Query 请求成功后，query state 从 pending 变为 success，组件会重新 render，第二次就可以拿到 data。

### 面试可直接说的答案

React 函数组件不是只执行一次。useState、props、Context 或外部状态订阅发生变化时，React 会触发重新渲染并再次执行组件函数，然后对比新旧 UI 并提交必要的 DOM 更新。普通局部变量变化本身不会通知 React，因此不会自动触发 render。

### 可能追问

- re-render 是否等于真实 DOM 全部重建？
- useState 为什么能保留上一次状态？
- 父组件 render 对子组件有什么影响？

---

## 问题：useQuery 每次 render 都执行，为什么接口不会每次都请求？

### 一句话本质

useQuery 是订阅 / 读取 query 状态的 Hook；queryFn 是否执行由 TanStack Query 根据 queryKey、缓存、stale 状态和配置决定。

### 项目实例

StudyMate 使用 queryKey ["todayQuestions"]。第一次没有缓存会执行 getTodayQuestions；请求成功后组件 re-render，再运行 useQuery 时可以直接读取已有 query state，而不是因为 render 自动重新请求。

### 面试可直接说的答案

TanStack Query 把组件 render 和网络请求分开。useQuery 可以随着 render 多次执行，但它会用 queryKey 查 Query Cache，并结合 staleTime、refetch 条件等判断是否需要执行 queryFn。所以 useQuery 多次运行不等于请求多次发送。

### 可能追问

- queryKey 为什么通常是数组？
- staleTime 是什么？
- gcTime 是什么？
- 什么场景会 refetch？

---

## 问题：isPending、isLoading、isFetching 有什么区别？

### 一句话本质

isPending 关注“当前有没有成功数据”，isFetching 关注“此刻有没有请求正在进行”。

### 面试可直接说的答案

第一次加载时通常还没有成功数据，所以会处于 pending，同时请求也在 fetching。已经有缓存数据后发生后台刷新时，可以出现 isPending 为 false、isFetching 为 true，这时页面可以保留旧数据，只显示一个轻量的刷新状态。

---

## 问题：staleTime 是缓存多久吗？

### 一句话本质

更准确地说，staleTime 是“成功数据多久以内被认为新鲜”，不是缓存删除时间。

### 面试可直接说的答案

staleTime 到期以后数据会从 fresh 变成 stale，但缓存数据本身仍然可以存在。之后在重新挂载、手动 refetch 或其他满足条件的场景下，TanStack Query 可以后台重新获取数据。缓存何时回收是另一个概念。

---

## 问题：Axios 和 TanStack Query 各负责什么？

### 一句话本质

Axios 负责“怎么发 HTTP 请求”，TanStack Query 负责“怎么管理服务器状态”。

### 面试可直接说的答案

项目里我会把 Axios 封装成统一 HTTP 实例，处理 baseURL、timeout、拦截器等；API 层定义具体业务接口和类型。TanStack Query 在页面层管理请求状态、缓存、stale、refetch、mutation 和 invalidation。两者不是替代关系，而是不同层次的职责。


---

# 2026-09-22 补录：Mutation 与缓存失效

## 问题：useQuery（查询）和 useMutation（修改）有什么区别？

### 一句话本质

useQuery 主要管理“读取服务端数据”，useMutation 主要管理“主动修改服务端数据”。

### 项目实例

StudyMate 获取题目使用 useQuery；提交回答并触发 AI 评分使用 useMutation。

### 面试可直接说的答案

TanStack Query 中，useQuery 更适合 GET 这类服务端状态读取，并围绕 queryKey、缓存和 staleTime 管理数据；useMutation 适合提交、更新、删除等主动修改操作。useMutation 不会因为组件 render 自动执行，通常需要调用 mutate 主动触发，同时提供 isPending、onSuccess、onError 等生命周期状态。

---

## 问题：invalidateQueries（使查询缓存失效）是做什么的？

### 一句话本质

mutation 修改服务器数据后，用 invalidateQueries 告诉相关 Query：“你缓存的数据可能旧了”。

### 项目实例

提交新的练习记录后，服务器中的 practice records 已经改变，因此可以使 ["practiceRecords"] 对应缓存失效，让活跃页面重新确认服务端最新数据。

### 面试可直接说的答案

TanStack Query 不会自动知道一次 mutation 影响了哪些其他服务端数据。mutation 成功以后，我会根据业务关系调用 queryClient.invalidateQueries，使相关 Query 标记为 stale，并在满足条件时重新获取。invalidate 的含义是“使失效 / 不再可靠”，不是简单删除缓存。

### 面试官可能继续追问

- invalidateQueries 和 refetchQueries 有什么区别？
- invalidate 后一定马上发送请求吗？
- staleTime 很长时 invalidate 会怎样？
- 什么情况下应该直接 setQueryData？
