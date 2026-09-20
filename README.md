# StudyMate Agent

StudyMate 是一个面向 IT 从业者、求职者和技术学习者的 AI 学习与面试训练平台。

当前产品方向已经从早期“儿童英语 / 数学学习助手”正式调整为：

> 技术学习 + 面试练习 + AI 辅助评分 + 薄弱点分析 + 自适应训练 + 求职提升。

当前第一目标不是做一个普通聊天机器人，而是做出一套真实可用的 IT 学习 / 面试闭环，并把它同时作为 AI 前端 / Agent 工程师求职项目。

## 当前产品能力

当前前端已经完成较完整的静态产品骨架，包括：

- 首页
- 登录 / 注册
- 技术题库
- AI 题库
- 练习入口
- 基础练习 / 简历专项 / JD 专项
- 答题页
- 练习记录
- 单次复盘
- 报告页
- 个人中心

当前练习、复盘和部分评分仍以静态数据 / sessionStorage 演示为主，下一阶段会逐步替换成 FastAPI + PostgreSQL + LLM 的真实数据链路。

## 产品长期闭环

~~~text
用户 / 求职目标 / 简历 / JD
        ↓
技术题库 / AI 题库
        ↓
练习 Session
        ↓
开放式回答
        ↓
LLM Structured Output 评分
        ↓
covered_points / missing_points
        ↓
Weak Topics / Mastery
        ↓
个性化下一轮练习
        ↓
学习报告 / 面试提升
~~~

后续可加入 Pro 能力，例如更高额度的 AI 题库生成、简历 / JD 深度分析、更完整的学习报告和高级 Agent 能力。

## 技术路线

### 当前前端

- React 19
- TypeScript
- Vite
- React Router
- Axios
- TanStack Query
- Tailwind CSS
- shadcn/ui / Base UI
- Lucide
- Vitest / Testing Library

### 前端升级路线

当前项目先继续完成 Vite React 的真实前后端闭环。

完成第一条真实 API / 提交闭环后，开始学习并逐步迁移到：

- Next.js
- App Router
- Server Components / Client Components
- layout / page / loading / error
- Suspense / Streaming
- Server / Client 数据边界
- Metadata / SEO

Next.js 不替代 FastAPI。目标架构是：

~~~text
Next.js + React + TypeScript
        ↓
Python + FastAPI
        ↓
PostgreSQL / Redis
        ↓
LLM / Agent / RAG / MCP
~~~

### Python / Agent

- Python
- FastAPI
- Pydantic
- SQLAlchemy
- Alembic
- PostgreSQL
- Redis
- LLM / Structured Output
- Tool Calling
- ReAct / Agent Loop
- LangGraph
- Memory / Checkpoint
- Human-in-the-loop
- RAG
- MCP
- Web Agent
- Evaluation / Bad Case
- Docker / CI/CD / Observability

后端和 Agent 主语言统一使用 Python，不再增加 Java / Spring 学习路线。

## 开发与学习分工

### 用户亲手学习 / 编写

- React 核心状态与数据流
- Axios / API 层
- TanStack Query / Mutation
- FastAPI / Python
- 数据库
- LLM / Agent / RAG / MCP
- 关键工程设计

### Codex 适合加速

- 静态页面
- Tailwind / shadcn 组合
- 重复 UI
- 响应式适配
- 测试补充
- 机械性重构

原则：Codex 加快产品开发，但不能替代核心知识第一次学习。

## 学习文档

- docs/00-context.md：长期上下文、项目方向、技术决策、协作规则
- docs/01-study-plan.md：完整学习路线和阶段验收
- docs/02-progress.md：当前学习指针 + 每日学习进度，换新对话首先看它
- docs/03-learning-notes.md：已经学过的技术知识
- docs/04-interview-notes.md：可直接口述的面试答案
- docs/05-mistakes.md：真实 Bug / Bad Case / 排查记录
- docs/06-ui-style-guide.md：前端 UI 规范

## 新对话恢复顺序

新的 ChatGPT / Codex 会话必须优先阅读：

1. docs/00-context.md
2. docs/02-progress.md
3. docs/01-study-plan.md
4. 需要复习具体知识时再读 docs/03-learning-notes.md 和 docs/04-interview-notes.md

尤其以 docs/02-progress.md 顶部的 CURRENT LEARNING POINTER 为准，不要重新从 Day 1 开始，也不要根据旧计划猜测当前进度。

## 当前学习位置

截至 2026-09-20：

~~~text
React 基础 / Router
        ✅
Axios 请求层
        ✅
TanStack Query 基础
        🟡 正在学习
        ↓
queryKey 参数
        ↓
useMutation
        ↓
invalidateQueries
        ↓
Practice 真实 API 闭环
        ↓
Next.js + App Router
~~~

详细状态见 docs/02-progress.md。
