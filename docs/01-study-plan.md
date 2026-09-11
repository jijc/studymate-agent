# 前端工程师转 AI Agent 前端：8 周学习与项目计划

> 版本：v1.1  
> 日期：2026-09-11  
> 目标：8 周内，主攻 **AI 前端工程师 / Agent 前端工程师**，附带补齐 AI 全栈基础能力。  
> 学习节奏：每天约 6 小时，边学边做项目，不等“全部学完”再开始开发。  
> 核心项目：**StudyMate / 学伴 Agent**。  
> 第一个月：先做 **前端 / Agent 面试自适应学习 Agent**；第二个月再扩英语和数学。

---

# 一、8 周最终目标

8 周后希望达到：

1. 能用 React + TypeScript 独立完成 AI / Agent 前端页面。
2. 能理解并实现 Streaming、SSE、Tool Calling 状态、Agent Workflow 展示、Retry / Cancel 等交互。
3. 能用 Python + FastAPI 写基础 AI 后端接口。
4. 掌握 PostgreSQL CRUD、JOIN、基础索引和简单表设计。
5. 会使用 Redis 的基础场景。
6. 真正理解并在项目中使用 LLM、Structured Output、Tool Calling、Agent State、LangGraph、Memory、RAG、Evaluation。
7. 能讲清项目架构、关键选择、Bad Case、性能和工程设计，而不是只会跑 Demo。
8. 第 4 周开始试投，第 5～8 周边学习边参加真实面试。
9. 项目最终可以扩成英语 / 数学，证明底层学习引擎不是写死的。

---

# 二、固定学习方法

每天约 6 小时：

| 时间 | 内容 |
|---|---|
| 1 小时 | 新知识：大白话 + 原理 |
| 2 小时 | 自己亲手写练习代码 |
| 1.5 小时 | 把知识放进 StudyMate |
| 45 分钟 | React / JS / 浏览器基础复习 |
| 30 分钟 | AI 基础 / 高频英文术语 |
| 15 分钟 | 面试口述与当天复盘 |

规则：

- 核心功能第一遍尽量自己写。
- ChatGPT / Codex 主要负责讲解、提示、Code Review、排错。
- 当天知识尽量当天进入项目。
- 当天知识当天进入 `04-interview-notes.md`。
- 闭环没做通时，不继续盲目增加新功能。

---

# 三、Month 1 产品：Agent / 前端面试自适应学习

核心闭环：

```text
读取历史掌握度
  ↓
选择今天最该练的知识点
  ↓
给出 5 道题
  ↓
用户输入开放式答案
  ↓
LLM 按 Rubric 评分
  ↓
返回已覆盖点 / 遗漏点 / weak topics
  ↓
记录 PostgreSQL
  ↓
更新 Mastery
  ↓
必要时追问
  ↓
生成今日总结
  ↓
下一次继续针对薄弱点
```

第一月题目范围：

- JavaScript
- TypeScript
- React
- 浏览器 / HTTP
- SSE / WebSocket
- Python / FastAPI
- LLM 基础
- Structured Output
- Tool Calling
- Agent / Workflow / State
- RAG
- LangGraph
- MCP 基础

第一月暂时不做：

- 英语完整模块
- 数学完整模块
- OCR
- 语音识别
- App / Electron / 小程序
- 社区 / 排行榜 / 会员
- 复杂权限系统
- 大规模题库

---

# 四、Week 1：React + Python + FastAPI + 最小题库

## 本周目标

Day 7 必须做到：

> **StudyMate 可以真正完成“每天 5 道面试题”的最小 Web 闭环。**

不要求 AI 智能评分，先把产品跑通。

---

## Day 1：环境 + Python 第一课 + React 起步

学习：

- PyCharm 基本使用
- Python 解释器 / venv / pip
- Python 文件如何运行
- 变量
- `str / int / float / bool`
- `list / dict`
- `if`
- React 项目结构基础

项目：

- Clone `studymate-agent`
- 创建 React + TypeScript + Vite 项目
- 创建 Python 虚拟环境
- 完成第一个 Python 文件
- 完成最小 FastAPI Hello World
- React 首页显示 StudyMate 标题和“今日 5 题”入口

前端复习：

- 浏览器、前端、后端分别做什么
- HTTP 请求最基本流程

面试：

- Python 与 JavaScript 最直观的区别
- 动态类型语言是什么

---

## Day 2：函数 + API + JSON

Python：

- `def`
- 参数
- `return`
- 类型注解基础

FastAPI：

- GET
- POST
- JSON
- request / response 基础

项目：

实现：

```text
GET /api/questions/today
POST /api/answers
```

先返回固定题目和固定反馈。

前端复习 / 面试：

- GET 与 POST
- HTTP 状态码
- REST API
- JSON 为什么适合前后端通信

---

## Day 3：React 基础

学习：

- JSX
- Component
- props
- useState
- 事件
- 条件渲染
- 列表渲染

项目：

完成题目卡：

```text
第 1 / 5 题

什么是 Agent？

[输入你的回答……]

[提交答案]
```

前端基础：

- React state 改变为什么会触发重新渲染
- Vue `ref` 与 React `useState` 的直观区别

---

## Day 4：Pydantic + TypeScript 类型

学习：

- Python class 基础
- Pydantic Model
- TypeScript interface / type
- 前后端数据结构约束

项目：

定义 Question / Answer 请求响应结构。

面试：

- interface vs type
- 为什么 API 需要参数校验
- Python 类型注解是不是“编译时强类型”

---

## Day 5：异常处理 + UI 状态

学习：

- `try / except`
- FastAPI `HTTPException`
- loading / error / empty state

项目处理：

- API 失败
- 空题目
- 提交空答案
- 重试按钮

面试：

- 4xx / 5xx
- 前端接口异常应该怎么设计体验

---

## Day 6：async / await

学习：

- 同步 vs 异步
- Python `async / await`
- 与 JS Promise / async-await 对照
- I/O 的概念

项目：

把适合的 FastAPI 接口改为 async。

面试：

- 为什么 LLM / Agent 服务大量使用异步
- Event Loop 基础

---

## Day 7：第一周验收

必须实现：

- React 页面
- FastAPI
- 5 道固定面试题
- 输入开放式答案
- 提交
- 显示固定或规则反馈
- 上一题 / 下一题 / 当前进度
- 5 题完成页

本日不学新技术：

- 修 Bug
- 整理代码
- 第一次真实使用 StudyMate 复习
- 更新文档
- 自己口述本周面试题

---

# 五、Week 2：PostgreSQL + LLM Rubric 评分

## 本周目标

Day 14 必须做到：

> **开放式回答能够被 LLM 按明确评分标准结构化评价，并长期保存答题历史。**

---

## Day 8：数据库入门

学习：

- 数据库是什么
- 表 / 行 / 列
- 主键
- PostgreSQL
- `SELECT`

项目：

先设计：

```text
subjects
topics
questions
```

---

## Day 9：基础 SQL

学习：

- INSERT
- UPDATE
- DELETE
- WHERE
- ORDER BY

项目：

真正用数据库保存题目。

---

## Day 10：Attempt 数据

设计：

```text
attempts
```

建议字段：

```text
profile_id
question_id
answer
score
feedback
created_at
```

学习：

- 外键
- 表关系
- 为什么不能把所有数据塞进一张表

---

## Day 11：JOIN / GROUP BY

学习：

- JOIN
- COUNT
- AVG
- GROUP BY

项目：

查询：

- 每个 topic 做过多少题
- 平均分
- 最近成绩

---

## Day 12：ORM

学习：

- SQLAlchemy 基础
- ORM 是什么
- ORM 和 SQL 的关系

原则：

先理解 SQL，再用 ORM。

---

## Day 13：LLM + Structured Output

学习：

- LLM 是什么
- Prompt
- Token
- Context Window
- Structured Output
- JSON Schema / Pydantic

项目：

第一次让 LLM 按固定结构返回评分。

示例：

```json
{
  "score": 72,
  "covered_points": ["tool_calling"],
  "missing_points": ["state", "retry"],
  "weak_topics": ["agent_state"]
}
```

---

## Day 14：Rubric 评分验收

每一道题至少有：

```text
question
topic
difficulty
rubric
reference_answer
```

必须完成：

- LLM 结构化评分
- covered points
- missing points
- weak topics
- 数据库存储 Attempt
- 历史答题页面基础版

---

# 六、Week 3：Mastery + 个性化学习

## 本周目标

Day 21 必须做到：

> **系统不再随机给题，而是会根据真实历史数据调整下一轮 5 道题。**

---

## Day 15

学习：

- mastery 是什么
- 为什么“做过题”不等于“掌握”

设计：

```text
mastery
profile_id
topic_id
score
last_practiced_at
```

---

## Day 16

实现弱项统计：

```text
React Hooks      82%
SSE              90%
Tool Calling     71%
RAG              55%
Agent State      38%
```

React 页面做成可视化仪表盘。

---

## Day 17

实现选题策略 v1：

例如：

```text
5 题 =
2 道薄弱知识
1 道次薄弱知识
1 道已掌握复习
1 道新知识
```

先用确定性规则，不急着让 LLM 决定一切。

---

## Day 18

学习：

- Prompt Engineering
- Few-shot
- 幻觉
- Prompt Bad Case

项目：

提高评分一致性。

---

## Day 19

实现 Agent 追问雏形：

例如：

```text
RAG 是什么？
 ↓
用户回答基本正确但没提 Retrieval
 ↓
自动追问：
“如果 RAG 回答不准确，你会从哪些环节排查？”
```

---

## Day 20

加入 LLM 调用记录：

- latency
- token usage
- status
- error

理解 AI 产品为什么需要成本和耗时观测。

---

## Day 21：第三周验收

必须完成：

- Mastery
- Weak Topics
- 自适应选题
- 至少一种追问机制
- 今日学习总结
- 明日推荐重点

---

# 七、Week 4：Tool Calling + Agent Workflow + v1 求职版

## 本周目标

Day 30：

> **StudyMate v1 成为可在线展示、能解释 Agent 价值、能真正帮自己复习面试的产品。**

---

## Day 22：Tool Calling

学习：

- Tool Calling 是什么
- Tool Schema
- 为什么 Tool 不等于 Prompt

实现 Tool：

```text
get_mastery()
get_weak_topics()
get_recent_attempts()
get_questions_by_topic()
```

---

## Day 23：Agent 工作流

流程：

```text
读取 Mastery
 ↓
确定今日重点
 ↓
调用题库 Tool
 ↓
给出题目
 ↓
评分
 ↓
判断是否追问
 ↓
更新掌握度
 ↓
总结
```

理解：

- Workflow
- State
- 多步骤任务

---

## Day 24：LangGraph 入门

学习：

- State
- Node
- Edge
- Conditional Edge

把已有流程中的一个小闭环迁移到 LangGraph，而不是一次重写整个系统。

---

## Day 25：开始试投

开始尝试：

- AI 前端
- Agent 前端
- AI 产品前端

目标：获取真实面试反馈，不要求此时技术全部学完。

---

## Day 26：SSE / Streaming / Cancel

学习：

- SSE
- Streaming
- AbortController
- Stop / Retry

项目：

让前端能展示 AI 评分 / Agent 执行的流式过程。

---

## Day 27：学习报告

实现：

- 总练习次数
- 平均得分
- Knowledge Mastery
- Weak Topics
- 最近趋势
- Agent 推荐复习重点

---

## Day 28：产品体验

完善：

- Loading
- Empty State
- Error
- Retry
- Responsive
- 基础性能优化

同时复习 React 高频面试点。

---

## Day 29：工程化

- README
- 架构图
- 日志
- 基础测试
- Docker 初步
- 在线部署

---

## Day 30：第一月最终验收

StudyMate v1 至少具备：

1. 前端 / Agent 面试 Subject
2. Topic 分类
3. 每日 5 题
4. 开放式输入
5. Rubric
6. Structured Output 评分
7. PostgreSQL Attempt 历史
8. Mastery / Weak Topic
9. 自适应选题
10. Agent 追问
11. Tool Calling 基础
12. Agent Workflow / LangGraph 基础
13. 学习报告
14. React + FastAPI + PostgreSQL
15. 在线 Demo
16. README + 架构图

---

# 八、Week 5：Agent 深化 + Memory / Checkpoint

目标：一边正式投递，一边把 Agent 从“能跑”提升到“能讲”。

学习：

- LangGraph State / Node / Edge 深化
- Checkpoint
- Memory
- Human-in-the-loop
- Retry / Timeout / Fallback

项目：

- 保存一次学习 Session 的 Agent 状态
- 中途恢复
- Tool 错误状态展示
- Agent 执行 Timeline

前端重点：

- React Hooks
- useEffect
- useMemo
- useCallback
- 状态设计
- Streaming 性能问题

---

# 九、Week 6：RAG + 自己的学习资料

把项目中的：

```text
docs/03-learning-notes.md
docs/04-interview-notes.md
```

逐步作为面试学习资料来源。

学习：

- Embedding
- Vector
- Chunk
- Retrieval
- RAG
- Citation
- Rerank 概念

项目：

```text
学习资料
 ↓
RAG
 ↓
找到相关知识
 ↓
用于出题 / 参考答案 / 评分依据
```

重点：理解每一环为什么会导致 RAG Bad Case。

---

# 十、Week 7：扩展英语，验证通用架构

新增英语单词学习，但复用：

```text
Subject
Topic
Question
Attempt
Mastery
Study Plan
```

英语 Evaluator 使用确定性规则优先：

- 英译中
- 中译英
- 拼写

学习重点：

- 为什么不是所有功能都应该调用 LLM
- Strategy / Evaluator 的设计思想
- 数据库如何支持多 Subject

如果求职面试很多，本周项目扩展可降低优先级，以真实面试补弱为先。

---

# 十一、Week 8：扩展数学 + 求职冲刺

增加初一数学每日 5 题的最小版：

```text
历史掌握度
 ↓
选择薄弱知识点
 ↓
5 道题
 ↓
规则 / 标准答案评分
 ↓
更新 Mastery
```

目的不是做完整数学产品，而是证明：

> StudyMate 的 Adaptive Learning Engine 可以支持不同学科和不同评估策略。

本周主要时间仍用于：

- 项目打磨
- React / JS / 浏览器高频面试
- Agent / RAG / LangGraph 口述
- 模拟面试
- 大量投递
- 根据真实面试反馈补知识

---

# 十二、两个月必须补的前端基础

## JavaScript

- 作用域
- 闭包
- this
- 原型链
- Event Loop
- Promise
- async / await
- 宏任务 / 微任务
- Map / WeakMap
- 内存泄漏

## 浏览器 / 网络

- DOM
- Rendering Pipeline
- 重排 / 重绘
- HTTP / HTTPS
- 缓存
- Cookie
- CORS
- SSE
- WebSocket

## React

- Component
- props
- state
- render
- useState
- useEffect
- useMemo
- useCallback
- useRef
- Context
- Zustand
- React 性能优化
- Fiber 基础概念

## TypeScript

- interface
- type
- union
- generic
- narrowing
- utility types

---

# 十三、两个月必须理解的 AI / Agent 基础

- LLM
- Token
- Context Window
- Prompt
- Temperature
- Structured Output
- Function / Tool Calling
- Agent
- Workflow
- State
- Memory
- Checkpoint
- Embedding
- Vector
- Chunk
- Retrieval
- RAG
- Rerank
- MCP
- Hallucination
- Context Engineering
- Evaluation
- Rubric
- Bad Case
- Latency
- Token Cost
- Retry
- Timeout
- Fallback

---

# 十四、建议项目目录

```text
studymate-agent/
├── frontend/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── agents/
│   │   └── tools/
│   └── tests/
│
├── docs/
│   ├── 00-context.md
│   ├── 01-study-plan.md
│   ├── 02-progress.md
│   ├── 03-learning-notes.md
│   ├── 04-interview-notes.md
│   └── 05-mistakes.md
│
├── docker-compose.yml
└── README.md
```

---

# 十五、每日文档维护

`02-progress.md`：今天完成什么、下一步是什么。  
`03-learning-notes.md`：知识本质、代码、前端类比、项目用途。  
`04-interview-notes.md`：问题、一句话本质、可直接口述答案、追问。  
`05-mistakes.md`：报错、原因、排查、修复、避免方式。

---

# 十六、强制验收点

## Day 7

能完整完成 5 道面试题的 Web 流程。

## Day 14

PostgreSQL + Rubric + LLM Structured Output 评分完整跑通。

## Day 21

系统能根据 Weak Topics 自动调整下一轮 5 题。

## Day 30

StudyMate v1 在线可演示，并正式进入 AI 前端 / Agent 前端求职。

如果任何节点未完成：

> **停止增加新技术，先把当前闭环做通。**

---

# 十七、最终求职定位

主投：

1. AI 前端工程师
2. Agent 前端工程师
3. AI 产品前端

第二梯队：

4. AI 全栈（前端侧重）
5. Agent 应用开发（匹配度合适时尝试）

第一阶段不主投：

- AI 算法工程师
- 纯 Python 高级后端
- 模型训练 / 微调
- Agent 基础设施高级架构岗位
