# StudyMate Agent

一个用于 **AI 前端 / Agent 前端求职学习** 的个性化学习 Agent。

项目最终目标不是做普通聊天机器人，而是建立一套可以跨学科复用的自适应学习引擎：

```text
学习档案
  ↓
Subject
  ↓
Topic / Knowledge Point
  ↓
Question
  ↓
Attempt
  ↓
Evaluation
  ↓
Mastery
  ↓
Study Plan
```

## 当前阶段

当前处于 **Day 0：环境准备前**。

### Month 1

第一阶段先做：

# 前端 / Agent 面试自适应学习 Agent

每天自动完成：

```text
读取历史掌握度
  ↓
选择今日重点
  ↓
给出 5 道题
  ↓
用户输入开放式回答
  ↓
LLM 按 Rubric 结构化评分
  ↓
记录遗漏点 / Weak Topics
  ↓
更新 Mastery
  ↓
下一轮针对弱项出题
```

第一月主要用于训练：

- JavaScript
- TypeScript
- React
- 浏览器 / HTTP
- SSE / WebSocket
- Python / FastAPI
- LLM
- Structured Output
- Tool Calling
- Agent / Workflow / State
- RAG
- LangGraph
- MCP 基础

### Month 2

在同一个学习引擎上扩展：

- 初一英语背单词
- 初一数学每日 5 题

用于验证不同科目可以复用同一套 Subject / Topic / Attempt / Mastery / Study Plan 架构，只替换题目生成与评估策略。

## 技术路线

- Frontend: React + TypeScript + Vite
- Backend: Python + FastAPI + Pydantic
- Database: PostgreSQL + SQLAlchemy
- Cache / State: Redis（后期）
- AI: LLM API + Structured Output + Tool Calling
- Agent: LangGraph（逐步引入）
- RAG: 第二阶段逐步接入学习笔记 / 面试笔记
- Engineering: Git / Docker / Logging / Tests / Deployment

## 学习原则

这是一个“边学边做”的求职转型项目。

- 核心学习代码第一遍尽量自己写。
- ChatGPT / Codex 用于讲解、提示、Code Review 和排错，不直接替代学习。
- 每天的新知识尽量当天进入真实项目。
- 每天同步整理面试知识和踩坑记录。
- 前端基础、React、AI 基础和项目开发同步推进。
- 如果当前闭环没有完成，优先完成闭环，不盲目增加新技术。

## 第一月验收点

- Day 7：完整完成 5 道固定面试题的 Web 流程
- Day 14：PostgreSQL + Rubric + LLM Structured Output 评分跑通
- Day 21：根据 Weak Topics 自适应调整下一轮 5 题
- Day 30：StudyMate v1 在线可演示，并正式用于 AI 前端 / Agent 前端求职

## 文档

- `docs/00-context.md`：长期上下文、方向和重要决策
- `docs/01-study-plan.md`：8 周学习 / 项目 / 求职计划
- `docs/02-progress.md`：每日项目进度（最重要的动态文档）
- `docs/03-learning-notes.md`：技术学习笔记
- `docs/04-interview-notes.md`：面试题与可直接口述答案
- `docs/05-mistakes.md`：Bug、原因、排查和修复记录

## 新聊天窗口如何恢复上下文

优先让 ChatGPT / Codex 阅读：

1. `docs/00-context.md`
2. `docs/02-progress.md`
3. 需要完整路线时再读 `docs/01-study-plan.md`

然后从 `02-progress.md` 记录的当前 Day 继续，不重新从零规划。

## 下一步

正式进入 Day 0 环境准备：

1. Clone 本仓库
2. 检查 Python / Node / Git
3. 安装或确认 PyCharm
4. 配置 Python venv
5. 确认 VS Code 前端环境
6. 开始 Day 1：亲手写第一段 Python + React + FastAPI 代码

> 当前仓库只初始化目录与学习文档，尚未提前生成 React / FastAPI 业务代码。