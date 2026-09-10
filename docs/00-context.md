# AI Agent 转型项目：上下文、决策与长期约定

> 文件用途：用于在新聊天窗口、新设备或较长时间后，快速恢复整个项目背景。  
> 日期：2026-09-11  
> 建议：本文件放在 `studymate-agent/docs/00-context.md`，每次重大决策后更新。

---

# 一、为什么开始这个计划

当前目标是从传统前端开发，转向：

1. **AI 前端工程师**
2. **Agent 前端工程师**

并附带学习：

3. **AI 全栈（前端侧重）**

核心原因：

- 传统前端岗位竞争越来越激烈。
- 希望尽快增加 AI Agent 相关能力。
- 不打算从零转成纯 Python 后端或算法工程师。
- 希望利用已有前端经验，逐步迁移到 AI / Agent 产品开发。
- 时间和经济压力较大，因此目标是尽快达到可面试状态，而不是长期闭关学习。

---

# 二、个人学习约束

## 时间

每天约可投入：

**6 小时**

目标：

**约 2 个月达到 AI 前端 / Agent 前端正式求职状态。**

---

## 学习特点

已明确：

- 前端有多年实际编码经验。
- 但用户认为自己底层原理掌握一般。
- 会写代码，但很多技术原理在面试时讲不清楚。
- 非计算机科班。
- 英语较弱，技术英文单词储备较少。
- 容易担心知识记不住。
- 不希望让 Codex / AI 把所有代码直接写完，否则学不会。

因此教学必须采用：

```text
一句大白话
↓
代码怎么写
↓
为什么这样写
↓
与 Vue / JS 已知知识类比
↓
项目中实际使用
↓
面试怎么回答
↓
可能继续追问什么
```

---

# 三、学习方法的长期约定

以后任何新的技术问题，都尽量采用：

## 1. 大白话解释

先说明“这个东西到底是干嘛的”。

## 2. 已知知识类比

优先与过去熟悉的知识连接：

- Vue
- JavaScript
- TypeScript
- Promise
- async / await
- SSE
- WebSocket
- Pinia
- 前端接口
- 工程化

## 3. 自己写代码

AI 不直接一次性生成整个核心功能。

学习时：

- 先讲解
- 用户自己写
- 卡住给一级提示
- 再卡给二级提示
- 最后才给完整参考实现

## 4. 项目落地

每天学到的知识必须尽量当天进入真实项目。

## 5. 面试同步积累

不是两个月以后才开始背题。

每个知识点当天生成对应面试题。

---

# 四、求职方向的最终决策

根据北京多个招聘 JD 的观察，当前优先级为：

## 第一主攻方向

### AI 前端工程师

需要重点强化：

- React
- TypeScript
- Agent UI
- Streaming
- SSE
- Tool Call 状态
- RAG 引用展示
- Agent Workflow 可视化
- Error / Retry
- Human-in-the-loop

---

### Agent 前端工程师

除前端能力外，还要真正理解：

- LLM
- Tool Calling
- Agent
- Workflow
- State
- Memory
- RAG
- MCP
- Evaluation
- Bad Case

不能只会“做聊天框”。

---

## 第二主攻方向

### AI 全栈（前端侧重）

需要附带补：

- Python
- FastAPI
- PostgreSQL
- SQL
- Redis
- ORM
- Docker

目标不是两个月成为高级后端，而是：

> 能独立写基础 AI 后端；能看懂系统；面试继续追问后端时不至于完全回答不了。

---

# 五、暂不主攻的方向

第一阶段不主攻：

- AI 算法
- PyTorch
- TensorFlow
- CUDA
- 模型训练
- SFT
- LoRA
- RLHF
- K8s 深入
- 分布式系统
- 大模型推理优化
- 高级 Python 后端架构

这些以后根据招聘需求再补。

---

# 六、为什么最终项目不是普通问答机器人

曾讨论过：

- AI 研发助手
- Bug 分析 Agent
- Web 自动验收 Agent
- 比价 Agent
- 火车票监控
- 演唱会票监控
- 家庭采购 Agent
- 孩子学习 Agent

用户明确提出：

> 如果只是“输入问题 → 调 GPT → 返回答案”，那么为什么不用 ChatGPT / DeepSeek 本身？

因此达成重要共识：

## 真正有价值的 Agent 不应该只负责回答问题。

Agent 的价值在于：

```text
模型负责思考
+
业务数据
+
工具
+
状态
+
工作流程
+
执行动作
```

即：

> Agent 应该能够根据数据和状态动态决定下一步，而不是简单包一层 LLM API。

---

# 七、最终项目确定

项目方向：

# StudyMate / 学伴 Agent

第一阶段：

# 初一英语个性化背单词学习 Agent

真实使用者：

初一学生。

核心真实问题：

> 英语单词背诵困难，需要长期记录、薄弱点分析和个性化复习。

---

# 八、StudyMate 第一阶段产品目标

第一版只做英语单词闭环。

流程：

```text
学生进入系统
 ↓
读取历史学习数据
 ↓
生成今日任务
 ↓
学习单词
 ↓
进行练习
 ↓
记录每次答题
 ↓
分析薄弱单词
 ↓
分析薄弱题型
 ↓
调整下一轮学习内容
 ↓
家长查看统计
```

---

# 九、练习形式

第一版至少支持：

1. 英译中
2. 中译英
3. 拼写

以后可增加：

- 听音选择
- 听音拼写
- 例句填空
- 混淆词辨析

第一月不强制。

---

# 十、Agent 在系统里的真正作用

系统不是所有事情都交给 LLM。

## 确定性逻辑

由程序完成：

- 正误判断
- 正确率
- 学习次数
- 单词掌握度
- 复习间隔
- 学习时间
- 数据统计

## AI / Agent 负责

- 分析错误模式
- 分析薄弱能力
- 选择下一阶段训练重点
- 生成学习建议
- 生成适龄记忆方法
- 生成例句
- 根据历史数据制定学习计划

这样做的原因：

- 确定性规则稳定
- 降低 Token 成本
- 避免 LLM 结果随机
- 便于测试
- 面试时能说明为什么不用 AI 做所有事情

---

# 十一、数据库设计方向

未来逐步建立：

```text
users
students
subjects
words
word_books
learning_sessions
attempts
word_mastery
study_plans
agent_runs
tool_calls
```

例如每次答题：

```text
student_id
word_id
question_type
answer
correct
time_used
created_at
```

从真实数据学习：

- SELECT
- INSERT
- UPDATE
- DELETE
- JOIN
- GROUP BY
- INDEX
- FOREIGN KEY
- ORM

---

# 十二、为什么后续能扩展数学

底层不把产品写死成英语单词系统。

核心抽象：

```text
Student
 ↓
Subject
 ↓
Knowledge Point
 ↓
Exercise
 ↓
Attempt
 ↓
Mastery
 ↓
Study Plan
```

英语：

```text
Knowledge Point = 单词
```

数学：

```text
Knowledge Point = 有理数 / 数轴 / 绝对值 / 方程
```

因此英语完成以后，可以继续增加：

# 初一数学每日 5 题

流程：

```text
读取知识点掌握度
 ↓
找薄弱点
 ↓
每天选择 5 道题
 ↓
记录答案
 ↓
更新掌握度
 ↓
第二天调整题目
```

这将证明系统是一套可扩展的个性化学习 Agent，而不是写死的背单词应用。

---

# 十三、技术路线

前端：

```text
React
TypeScript
Vite
SSE
```

后端：

```text
Python
FastAPI
Pydantic
async / await
```

数据：

```text
PostgreSQL
SQLAlchemy
Redis
```

AI：

```text
LLM
Structured Output
Tool Calling
LangGraph
State
Memory
Checkpoint
RAG
Evaluation
```

工程：

```text
Git
GitHub
Docker
Logging
Tests
Deployment
```

---

# 十四、为什么使用 React

用户原主要经验为 Vue。

为了提高 AI 前端招聘覆盖度，这次核心项目使用 React。

教学方法：

```text
Vue → React 对照学习
```

例如：

```text
Vue ref        → React useState
computed       → useMemo
watch          → useEffect
props          → props
emit           → callback props
slot           → children
Pinia          → Zustand
```

但会说明其中原理上的差异，而不是简单认为两者完全等价。

---

# 十五、开发工具决定

## Python / Agent

建议：

**PyCharm**

主要用于：

- Python
- FastAPI
- Agent 后端

原因：

- Python 环境管理更集中
- debugger
- interpreter
- venv
- 类型提示
- 强化“Python 学习环境”的感觉

## 前端

继续：

**VS Code**

用于：

- React
- TypeScript
- CSS

Codex 可辅助：

- UI 样式
- Code Review
- 找 Bug
- 解释代码

但不替代学习核心代码。

---

# 十六、第一月产品目标

30 天左右完成 StudyMate v1：

必须包含：

- 学生身份
- 初一英语单词
- 每日学习
- 至少 3 种练习
- 学习历史
- PostgreSQL
- 掌握度
- 薄弱词
- 薄弱题型
- AI 个性化分析
- Agent Tool Calling 基础
- 家长报告
- 在线部署
- README
- 架构图

---

# 十七、三个强制项目验收点

## Day 7

孩子可以真正完成一轮背单词。

---

## Day 14

系统能保存历史数据，并展示薄弱词。

---

## Day 21

AI / Agent 能根据历史数据改变学习策略。

---

## Day 30

第一版产品可在线演示。

同时开始/继续投递：

- AI 前端
- Agent 前端
- AI 产品前端

---

# 十八、求职节奏

不等第 60 天才投。

建议：

```text
Day 1
学习 + 项目

Day 14
可运行产品

Day 21
准备 AI 方向简历

Day 25～30
开始试投

Day 30～45
学习 + 投递 + 真实面试

Day 45～60
根据面试反馈定向补知识
```

---

# 十九、新聊天恢复方式

推荐使用以下任一方式。

## 方法 A：项目仓库（最推荐）

把本文件放入：

```text
studymate-agent/docs/00-context.md
```

学习计划：

```text
studymate-agent/docs/01-study-plan.md
```

项目进度：

```text
studymate-agent/docs/02-progress.md
```

以后开启新聊天时：

> 请先读取项目 docs/00-context.md 和 docs/02-progress.md，再继续学习。

如果 GitHub 仓库已连接，可以直接从仓库读取。

---

## 方法 B：新聊天上传文档

新聊天时上传：

- `00-context.md`
- `02-progress.md`

然后说：

> 这是我之前的 AI Agent 学习项目，请先读完再继续。

不必把整个聊天记录复制回来。

---

## 方法 C：ChatGPT 文件库

也可以把这些 Markdown 保存到 ChatGPT 文件库。

以后可让 ChatGPT 查找这些文件。

---

# 二十、文档维护规则

每次完成一天学习后：

更新：

```text
02-progress.md
```

每次产生重要架构 / 学习方向决策：

更新：

```text
00-context.md
```

每个知识点：

更新：

```text
03-learning-notes.md
```

每个面试点：

更新：

```text
04-interview-notes.md
```

每次真实 Bug：

更新：

```text
05-mistakes.md
```

---

# 二十一、对未来 ChatGPT 的指令

如果这是一个新的聊天窗口，请先遵守：

1. 不要重新从零设计整个学习计划。
2. 先阅读 `00-context.md`。
3. 再阅读 `02-progress.md`。
4. 根据当前 Day / Task 继续。
5. 用户正在边学边做，不要一次生成过多完整核心代码。
6. 新知识优先采用：
   - 大白话
   - Vue/JS 类比
   - 手写代码
   - 项目落地
   - 面试回答
7. 学习目标优先：
   - AI 前端
   - Agent 前端
   - AI 全栈（前端侧重）
8. 不要无节制扩大项目范围。
9. 如果项目进度落后，优先完成闭环，不增加新技术。
10. 真实招聘面试反馈优先级高于原计划，必要时根据 JD 调整学习内容。
