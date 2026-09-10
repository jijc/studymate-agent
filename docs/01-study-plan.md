# 前端工程师转 AI Agent 前端：8 周学习与项目计划

> 版本：v1.0  
> 日期：2026-09-11  
> 目标：8 周内，主攻 **AI 前端工程师 / Agent 前端工程师**，附带补齐 AI 全栈基础能力。  
> 学习节奏：每天约 6 小时，边学边做项目，不等“全部学完”再开始开发。  
> 核心项目：**StudyMate / 学伴 Agent —— 初一英语个性化背单词学习 Agent**。

---

## 0. 总目标

8 周后达到以下状态：

1. 能用 React + TypeScript 独立完成 AI/Agent 前端页面。
2. 能理解并实现 LLM Streaming、SSE、Tool Calling、Agent State、Human-in-the-loop 等 Agent 前端核心交互。
3. 能用 Python + FastAPI 写基础后端接口。
4. 掌握 PostgreSQL 基础 CRUD、JOIN、索引、简单表设计。
5. 会使用 Redis 的基础场景。
6. 理解并实际使用 LLM、Structured Output、Tool Calling、RAG、LangGraph、Memory、Checkpoint。
7. 能讲清楚项目架构、关键技术选择、失败案例、性能优化和工程设计。
8. 第 4 周开始试投；第 5～8 周边学习边面试。
9. 最终拥有一个可以在线演示的真实 AI Agent 产品，而不是教程 Demo。

---

# 一、学习原则

## 1. 不追求一次学完

不采用：

- Python 学完再做项目
- 数据库学完再做项目
- Agent 学完再做项目

而采用：

**学一个知识点 → 当天写代码 → 当天进入 StudyMate 项目 → 当天形成面试知识点。**

---

## 2. AI 不替代亲手编码

Codex / ChatGPT 可用于：

- 解释概念
- 给一级提示
- 分析 Bug
- Code Review
- 测试建议
- 架构讨论
- 面试模拟

学习核心功能时，尽量不让 AI 一次性生成完整模块。

尤其以下内容第一遍必须亲手写：

- Python 基础
- FastAPI 路由
- async / await
- React Hooks
- SSE
- PostgreSQL CRUD
- Tool Calling
- LangGraph State / Node / Edge
- Agent 核心流程

---

## 3. 每天 6 小时建议分配

| 时间 | 内容 |
|---|---|
| 1 小时 | 新知识讲解 |
| 2 小时 | 自己写练习代码 |
| 1.5 小时 | 把知识加入 StudyMate |
| 45 分钟 | React / 前端基础复习 |
| 30 分钟 | AI 基础概念 / 英文术语 |
| 15 分钟 | 面试口述复盘 |

---

# 二、项目目标：StudyMate 学伴 Agent

第一阶段只做：

## 初一英语单词个性化学习

核心闭环：

```text
孩子登录
  ↓
系统读取历史学习数据
  ↓
生成今日学习计划
  ↓
学习单词
  ↓
英译中 / 中译英 / 拼写
  ↓
记录每一道题
  ↓
统计薄弱单词与薄弱题型
  ↓
Agent 调整后续学习计划
  ↓
家长查看学习报告
```

第一月暂时不做：

- 数学完整模块
- 拍照识题
- OCR
- 语音识别
- 语音对话
- App
- Electron 桌面版
- 小程序
- 排行榜
- 社区
- 老师端
- 会员
- 复杂支付
- 大规模题库

---

# 三、技术栈

## 前端

- React
- TypeScript
- Vite
- React Router
- Zustand（后期按需）
- Fetch / Axios
- SSE
- Markdown 渲染（按需）
- Chart 图表库（后期）

## 后端

- Python
- FastAPI
- Pydantic
- async / await
- SQLAlchemy（先学 SQL，再使用 ORM）
- PostgreSQL
- Redis

## AI / Agent

- LLM API
- Prompt
- Token / Context
- Structured Output
- Tool Calling
- Agent State
- LangGraph
- Memory
- Checkpoint
- RAG（第二个月）
- Evaluation / Bad Case
- Retry / Timeout / Fallback

## 工程化

- Git / GitHub
- Docker
- Logging
- 基础测试
- README
- 架构图
- 部署

---

# 四、第 1 周：React + Python + FastAPI 跑通第一个产品

## 本周目标

7 天后：

**孩子能够真正完成一轮英语单词学习。**

---

## Day 1：环境 + Python 第一课

学习：

- PyCharm 基本使用
- Python 解释器
- venv
- pip
- Python 文件
- 变量
- str / int / bool
- list / dict
- if

项目：

- 创建仓库 `studymate-agent`
- 创建：
  - `frontend/`
  - `backend/`
  - `docs/`
- FastAPI Hello World
- React 首页骨架

前端复习：

- HTTP 请求是什么
- 浏览器 → 前端 → 后端

面试：

- Python 与 JavaScript 的主要区别
- 动态语言是什么

---

## Day 2：函数 + FastAPI 路由

学习：

- def
- 参数
- return
- 类型注解
- FastAPI GET / POST
- JSON

项目：

实现：

```text
GET /api/words
POST /api/answer
```

返回固定单词数据。

前端：

React 调用 FastAPI。

面试：

- GET 与 POST 区别
- REST API
- JSON
- HTTP 状态码

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

完成单词卡片：

```text
beautiful

/ˈbjuːtɪfəl/

美丽的

[认识] [不认识]
```

前端基础：

- React 为什么触发重新渲染
- Vue ref 与 React useState 的区别

---

## Day 4：英语练习题

实现：

- 英译中
- 中译英
- 单项选择
- 答题反馈
- 下一题

学习：

- Python class 基础
- Pydantic Model
- TypeScript interface

面试：

- interface 与 type
- 前后端类型为什么重要

---

## Day 5：异常处理

学习：

- try / except
- HTTPException
- 前端错误处理
- loading / error state

项目：

处理：

- API 失败
- 空单词
- 非法答案
- Loading 状态

面试：

- 前端接口失败如何处理
- HTTP 4xx / 5xx

---

## Day 6：async / await

学习：

- 同步与异步
- Python async / await
- 与 JS Promise / async-await 对照
- I/O

项目：

将部分 FastAPI 接口改为 async。

面试重点：

- 为什么 Agent / LLM 服务大量使用异步
- Event Loop 基础

---

## Day 7：第一周验收

必须完成：

- React 页面
- FastAPI 接口
- 一轮完整学习流程
- 20 个左右真实单词
- 3 种练习方式
- 正误反馈
- 今日进度

验收标准：

**孩子可以实际使用 10～20 分钟。**

本日不学新技术。

只：

- 修 Bug
- 整理代码
- 写 Week 1 总结
- 口述本周面试知识

---

# 五、第 2 周：PostgreSQL + 学习数据

## 本周目标

14 天后：

**系统能长期记录学习历史，并识别薄弱单词。**

---

## Day 8

学习：

- 什么是数据库
- 表 / 行 / 列
- 主键
- PostgreSQL 安装 / 连接
- SQL SELECT

项目：

创建：

- students
- words

---

## Day 9

学习：

- INSERT
- UPDATE
- DELETE
- WHERE
- ORDER BY

项目：

保存单词数据。

---

## Day 10

设计：

- learning_sessions
- attempts

每次答题记录：

- student_id
- word_id
- question_type
- answer
- correct
- time_used
- created_at

面试：

- 主键
- 外键
- 数据建模

---

## Day 11

学习：

- JOIN
- GROUP BY
- COUNT
- AVG

项目：

查询：

- 单词答题次数
- 正确次数
- 各题型正确率

---

## Day 12

学习：

- SQLAlchemy 基础
- ORM 是什么
- SQL 与 ORM 的关系

项目：

FastAPI 通过 ORM 读写学习记录。

---

## Day 13

实现掌握度：

示例维度：

- 英译中
- 中译英
- 拼写

项目展示：

```text
beautiful

英译中 100%
中译英 75%
拼写 33%
```

---

## Day 14：第二周验收

必须完成：

- PostgreSQL 真正持久化
- 答题记录
- 历史学习记录
- 单词掌握度
- 薄弱单词列表
- 简单统计页面

孩子完成一轮真实学习。

---

# 六、第 3 周：LLM + Structured Output + 个性化分析

## 本周目标

系统从“学习软件”升级为“AI 学习软件”。

---

## Day 15

学习：

- LLM 是什么
- Token
- Context Window
- Prompt
- Temperature
- System Prompt

项目：

FastAPI 调用 LLM API。

---

## Day 16

学习：

- Structured Output
- JSON Schema
- Pydantic

项目：

让 AI 输出结构化学习建议。

---

## Day 17

实现：

AI 读取最近学习记录，分析：

- 薄弱词
- 薄弱题型
- 容易混淆的单词
- 建议复习方式

---

## Day 18

学习：

- Prompt Engineering
- Few-shot
- 输出约束
- Prompt Bad Case

项目：

优化分析结果稳定性。

---

## Day 19

加入：

- 单词记忆提示
- 简单例句
- 错误原因解释

原则：

确定性业务逻辑不用 LLM。

---

## Day 20

学习：

- LLM 幻觉
- 成本
- Token 统计
- latency

项目：

记录每次 AI 请求：

- token
- latency
- status

---

## Day 21：第三周验收

必须实现：

**AI 根据真实学习记录给出个性化学习建议。**

---

# 七、第 4 周：Tool Calling + 初级 Agent + 第一版产品完成

## 本周目标

30 天左右：

**形成可在线展示的 StudyMate v1。**

---

## Day 22

学习：

- 普通 LLM 与 Agent 的区别
- Tool Calling
- Tool Schema

实现 Tool：

- get_student_progress
- get_wrong_words
- get_learning_history

---

## Day 23

实现：

- generate_daily_plan
- update_word_mastery

理解：

LLM 不直接访问数据库，而通过 Tool 获取业务数据。

---

## Day 24

学习：

- Agent State
- Workflow
- 多步骤任务

设计：

```text
读取数据
 ↓
分析薄弱点
 ↓
制定今日计划
 ↓
选择练习方式
 ↓
返回任务
```

---

## Day 25

开始试投：

- AI 前端
- Agent 前端
- AI 产品前端

同时继续学习。

---

## Day 26

学习：

- SSE
- Streaming
- AbortController
- 停止生成

项目：

前端展示 AI 分析过程。

---

## Day 27

家长端：

- 学习时长
- 单词数量
- 正确率
- 薄弱词
- 薄弱题型
- 学习趋势

---

## Day 28

产品体验：

- Empty state
- Loading
- Error
- Retry
- Responsive
- UI 优化

---

## Day 29

工程化：

- README
- 项目截图
- 架构图
- 部署
- 基础日志
- Docker 初步

---

## Day 30：第一月最终验收

StudyMate v1 必须具备：

1. 登录 / 学生身份
2. 初一单词数据
3. 每日学习任务
4. 至少 3 种练习方式
5. PostgreSQL 学习记录
6. 单词掌握度
7. 薄弱点分析
8. AI 个性化建议
9. Agent Tool Calling 基础
10. 家长学习报告
11. React + FastAPI
12. 在线可访问版本
13. README + 架构说明
14. 面试可讲项目

---

# 八、第 5 周：LangGraph + Agent 工作流

学习：

- State
- Node
- Edge
- Conditional Edge
- Checkpoint

把已有业务迁移为 LangGraph：

```text
load_profile
 ↓
analyze_history
 ↓
select_focus
 ↓
create_plan
 ↓
return_plan
```

面试：

- 为什么需要 LangGraph
- 为什么不是一个 while 循环
- State 如何传递
- Agent 如何恢复

---

# 九、第 6 周：Memory + Redis + Agent 前端

学习：

- 短期记忆
- 长期记忆
- Checkpoint
- Redis

项目：

- 学习 Session State
- Agent Run 状态
- Retry
- SSE Agent Progress

React 页面显示：

```text
✓ 读取学习记录
✓ 分析薄弱点
● 制定今日计划
○ 生成练习
```

---

# 十、第 7 周：RAG + Evaluation + Bad Case

学习：

- Embedding
- Vector
- Chunk
- Retrieval
- RAG
- Citation
- Rerank 概念

只做一个简单的教育内容 RAG，例如：

- 教材说明
- 单词知识
- 学习资料

重点不是大规模知识库。

加入 Evaluation：

建立 20～30 个测试 Case。

记录：

- 是否选对薄弱点
- 是否生成合理计划
- Tool 是否成功
- latency
- token
- error

主动制造 Bad Case。

---

# 十一、第 8 周：求职冲刺

学习新技术比例下降。

重点：

- React 高频面试
- JavaScript 基础
- 浏览器
- HTTP
- SSE / WebSocket
- TypeScript
- Agent
- RAG
- Tool Calling
- LangGraph
- PostgreSQL
- FastAPI

项目：

- UI 打磨
- README
- 架构图
- Demo 视频
- 在线地址
- GitHub 项目整理

求职：

主投：

1. AI 前端工程师
2. Agent 前端工程师
3. AI 产品前端
4. AI 全栈（前端侧重）

次投：

5. Agent 应用开发

---

# 十二、两个月内必须复习的前端基础

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

## 浏览器

- DOM
- Rendering Pipeline
- 重排 / 重绘
- HTTP
- HTTPS
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

# 十三、两个月内必须理解的 AI 基础

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
- Bad Case
- Latency
- Token Cost
- Retry
- Timeout
- Fallback

---

# 十四、项目目录建议

```text
studymate-agent/
├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── agents/
│   │   └── tools/
│   ├── tests/
│   └── requirements.txt
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

# 十五、每日结束必须维护的文档

## 02-progress.md

记录：

- 今天完成什么
- 哪些未完成
- 当前代码状态
- 下一步

## 03-learning-notes.md

每个知识点格式：

```text
知识：
一句大白话：
前端类比：
代码：
项目中的用途：
```

## 04-interview-notes.md

格式：

```text
问题：
一句话本质：
项目实例：
面试回答：
可能追问：
```

## 05-mistakes.md

记录：

- 报错
- 原因
- 排查过程
- 最终修复
- 如何避免

---

# 十六、三个强制止损 / 验收点

## Day 7

孩子能真正完成一轮背单词。

## Day 14

学习数据能够长期保存并展示薄弱词。

## Day 21

AI 能根据真实历史数据改变学习建议。

## Day 30

产品能在线展示并开始正式用于求职。

如果任一节点未完成：

**停止增加新技术，优先把当前闭环做通。**

---

# 十七、最终求职定位

不把自己包装成：

> “40 岁转行 Python 新人”

而是：

> **多年 Web 前端工程经验 + AI Agent 应用能力**

主攻：

- AI 前端工程师
- Agent 前端工程师
- AI 产品前端

附带：

- AI 全栈（前端侧重）

第一阶段不主攻：

- AI 算法工程师
- 大模型训练
- 纯 Python 高级后端
- Agent 基础设施架构师
- 模型微调 / CUDA / 分布式训练
