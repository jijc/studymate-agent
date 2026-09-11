# StudyMate Agent 当前进度

> 这是项目最重要的动态文档。每天学习结束后必须更新。

## 当前状态

- 日期：2026-09-11
- 当前阶段：Day 0
- 状态：项目仓库初始化完成，尚未开始业务开发
- 第一阶段产品：**前端 / Agent 面试自适应学习 Agent**
- 第二阶段扩展：初一英语背单词 + 初一数学每日 5 题
- 主要求职方向：AI 前端工程师 / Agent 前端工程师
- 附带方向：AI 全栈（前端侧重）

## 已完成

- 确定两个月转型目标
- 确定每天约 6 小时学习
- 确定 React 作为主项目前端技术栈
- 确定 Python + FastAPI 作为后端学习主线
- 确定 PostgreSQL / SQL 为必学数据库基础
- 确定核心项目 StudyMate / 学伴 Agent
- 重新确定第一月优先服务求职目标：先做“前端 / Agent 面试自适应学习”
- 确定开放式面试题采用 Rubric + LLM + Structured Output 评估
- 确定底层按 Subject / Topic / Question / Attempt / Mastery / Study Plan 抽象
- 确定第二个月再扩英语和数学，验证同一套学习引擎可支持多学科
- 建立 GitHub 仓库与文档体系
- 建立 frontend / backend / docs 基础目录
- 建立 backend/app 下 api、models、schemas、services、agents、tools 目录
- 建立 tests 目录和 .gitignore
- 尚未提前生成 React / FastAPI 业务代码，保留给 Day 1 亲手学习实现

## 当前未开始

- 尚未创建 React 项目
- 尚未创建 FastAPI 项目
- 尚未安装 / 确认 Python 学习环境
- 尚未创建 PostgreSQL 数据库
- 尚未编写业务代码
- 尚未编写真正题库

## 接下来的 Day 0 环境准备

1. Clone 仓库到本地
2. 检查 Mac 当前 Python / Node / Git 环境
3. 安装 / 确认 PyCharm
4. 配置 Python 虚拟环境 venv
5. 确认 VS Code 前端环境
6. 不提前让 Codex 生成业务代码

## Day 1 正式学习

Python：

- Python 如何运行
- 变量
- `str / int / float / bool`
- `list / dict`
- `if`

开发环境：

- PyCharm 解释器
- venv
- pip

FastAPI：

- 后端 API 是什么
- 完成最小 Hello World

React：

- 创建 React + TypeScript + Vite 项目
- StudyMate 首页骨架
- “今日 5 题”入口

前端复习：

- 浏览器、前端、后端的关系
- HTTP 请求最基础流程

面试：

- Python 与 JavaScript 的基础差异
- 动态类型语言概念

## Day 7 强制验收目标

StudyMate 能完整完成一轮 5 道固定前端 / Agent 面试题：

```text
显示题目 → 输入答案 → 提交 → 反馈 → 下一题 → 完成页
```

## Day 14 强制验收目标

系统完成：

- PostgreSQL 持久化
- 题库 / Topic / Attempt
- Rubric
- LLM Structured Output 评分
- 历史答题记录

## Day 21 强制验收目标

系统能根据真实历史数据生成 Weak Topics，并自动调整下一轮 5 题。

## Day 30 强制验收目标

StudyMate v1 可以在线演示，并正式作为 AI 前端 / Agent 前端求职项目：

- 每日 5 题
- 开放式回答
- AI 结构化评分
- Mastery / Weak Topics
- 自适应出题
- Agent 追问 / Workflow 基础
- React + FastAPI + PostgreSQL
- 学习报告
- README / 架构图

---

## 每日更新模板

```markdown
# Day X

日期：

## 今天学了什么

- 

## 今天亲手写了什么

- 

## 项目新增能力

- 

## 今天遇到的问题

- 

## 今天能回答的面试题

- 

## 尚未解决

- 

## 下一步

- 

## Git

- commit：
```
