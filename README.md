# StudyMate Agent

面向初一学生的个性化学习 Agent，也是一个用于 AI 前端 / Agent 前端求职转型的实战学习项目。

## 当前阶段

当前处于 **Day 0：项目初始化**。

第一阶段只聚焦：**初一英语单词个性化学习**。

目标不是做一个简单的“聊天机器人”，而是建立一个真正有长期学习数据和个性化策略的学习系统：

```text
学生进入系统
  ↓
读取历史学习数据
  ↓
生成今日学习任务
  ↓
英语单词练习
  ↓
记录每次答题
  ↓
分析薄弱单词 / 薄弱题型
  ↓
Agent 调整后续学习计划
  ↓
家长查看学习报告
```

## 第一阶段技术路线

- Frontend: React + TypeScript + Vite
- Backend: Python + FastAPI + Pydantic
- Database: PostgreSQL + SQLAlchemy
- Cache / State: Redis（后期）
- AI: LLM API + Structured Output + Tool Calling
- Agent: LangGraph（后期逐步引入）
- Engineering: Git / Docker / Logging / Tests / Deployment

## 学习原则

这是一个“边学边做”的项目。

- 核心学习代码第一遍尽量自己写。
- ChatGPT / Codex 用于讲解、提示、Code Review 和排错，不直接替代学习。
- 每天学习的新知识尽量当天进入真实项目。
- 每天同步整理面试知识和踩坑记录。
- 如果项目闭环没有完成，优先完成闭环，不盲目增加新技术。

## 文档

- `docs/00-context.md`：长期上下文、方向和重要决策
- `docs/01-study-plan.md`：8 周学习 / 项目 / 求职计划
- `docs/02-progress.md`：每日项目进度（最重要的动态文档）
- `docs/03-learning-notes.md`：技术学习笔记
- `docs/04-interview-notes.md`：面试题与可直接口述答案
- `docs/05-mistakes.md`：Bug、原因、排查和修复记录

## 新聊天窗口如何恢复上下文

优先让 ChatGPT / Codex 先阅读：

1. `docs/00-context.md`
2. `docs/02-progress.md`
3. 如需查看完整路线，再阅读 `docs/01-study-plan.md`

然后从 `02-progress.md` 记录的当前 Day 继续，不重新从零规划。

## 下一步

醒来后执行 Day 0 环境准备：

1. Clone 本仓库
2. 确认 / 安装 Python
3. 安装 PyCharm
4. 配置 Python venv
5. 确认 Node.js 环境
6. 在 ChatGPT 中开始 Day 1

> 目前仓库只初始化目录与学习文档，尚未提前生成 React / FastAPI 业务代码。