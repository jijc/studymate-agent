# AI Agent 转型项目：上下文、决策与长期约定

> 文件用途：用于在新聊天窗口、新设备或较长时间后，快速恢复整个项目背景。  
> 日期：2026-09-11  
> 当前版本：v1.1  
> 每次重大方向变化后更新本文件。

---

# 一、转型目标

当前目标是从传统前端开发，转向：

1. **AI 前端工程师**
2. **Agent 前端工程师**

附带补齐：

3. **AI 全栈（前端侧重）**

不把自己定位成“从零转 Python 的新人”，而是：

> **已有多年 Web 前端经验 + 新增 React / AI / Agent / 基础后端能力的工程师。**

现实约束：

- 时间和经济压力较大，目标是尽快进入真实面试，而不是长期闭关。
- 每天约可投入 6 小时。
- 期望约 2 个月达到 AI 前端 / Agent 前端正式求职状态。
- 前端实际编码经验有，但底层原理和面试表达需要同步补强。
- 非计算机科班，英语较弱，技术英文以“高频术语 + 项目实际使用”为主，不单独死背。
- 不希望让 Codex / ChatGPT 直接替代核心学习代码。

---

# 二、固定教学方式

以后新知识尽量按以下顺序讲：

```text
一句大白话
↓
最小代码
↓
为什么这样写 / 基础原理
↓
与 Vue / JavaScript 已知知识类比
↓
放进 StudyMate 项目
↓
面试怎么回答
↓
面试官可能继续追问什么
```

学习规则：

- 核心知识第一遍尽量亲手写。
- 卡住时先给提示，不直接整块代写。
- 每天学到的知识尽量当天进入真实项目。
- 前端基础、React、AI 基础和面试题不分成互相孤立的课程，而是在项目中穿插复习。
- 每天结束更新 `02-progress.md`，同步沉淀学习笔记、面试题和踩坑。

---

# 三、求职主攻方向

## 第一主攻：AI 前端工程师

重点能力：

- React + TypeScript
- AI Streaming
- SSE / WebSocket
- Agent 状态展示
- Tool Call 过程展示
- RAG 引用展示
- Loading / Error / Retry / Cancel
- Human-in-the-loop
- 前端工程化、性能与可维护性

## 第一主攻：Agent 前端工程师

除前端外，必须真正理解：

- LLM
- Prompt / Context
- Structured Output
- Tool Calling
- Agent / Workflow / State
- Memory / Checkpoint
- RAG
- LangGraph
- MCP
- Evaluation / Bad Case
- Retry / Timeout / Fallback

## 附带方向：AI 全栈（前端侧重）

补齐：

- Python
- FastAPI
- Pydantic
- async / await
- PostgreSQL / SQL
- SQLAlchemy
- Redis
- Docker

目标不是两个月成为高级后端，而是能独立写基础 AI 后端、理解数据流和系统设计，并能应对面试追问。

---

# 四、第一阶段不主攻

暂不主攻：

- PyTorch / TensorFlow
- CUDA
- 模型训练
- SFT / LoRA / RLHF
- K8s 深入
- 分布式系统
- 高级 Python 后端架构
- 大模型推理优化

这些根据真实招聘反馈再补。

---

# 五、项目核心原则

StudyMate 不能只是：

```text
用户输入问题 → 调 GPT → 返回一段文字
```

真正有价值的 Agent 应该包含：

```text
模型推理
+
业务数据
+
工具
+
状态
+
工作流程
+
长期记录
+
根据结果动态决定下一步
```

因此项目重点是“个性化学习闭环”，不是普通聊天机器人。

---

# 六、最终项目定位

项目名称暂定：

# StudyMate / 学伴 Agent

定位：

> **一个多学科、长期记录掌握度、根据薄弱点自动安排下一轮练习的个性化学习 Agent。**

系统核心抽象：

```text
Profile
 ↓
Subject
 ↓
Topic / Knowledge Point
 ↓
Question / Exercise
 ↓
Attempt
 ↓
Evaluation
 ↓
Mastery
 ↓
Study Plan
```

这个抽象必须支持不同科目使用不同的评估方式。

---

# 七、重大路线调整：第一个月先做“Agent 面试学习 Agent”

原计划第一个月先做初一英语背单词。

2026-09-11 调整为：

## Month 1：Agent / 前端面试自适应学习

原因：

1. 直接服务当前最紧迫目标——尽快找到 AI 前端 / Agent 前端工作。
2. 项目本身每天可以反过来训练正在学习的 React、Python、Agent、RAG 等知识。
3. 开放式面试题天然适合学习 Structured Output、LLM Evaluation、Rubric、Weak Topic、Agent 追问等 AI 能力。
4. 第一个月不需要先处理音标、发音、儿童 UI、教材版本等领域细节，技术主线更集中。
5. 完成后再扩英语和数学，可以验证底层学习架构确实是多学科可扩展的，而不是写死的题库。

---

# 八、Month 1 产品闭环

用户进入 StudyMate 后选择：

```text
前端 / Agent 面试学习
```

系统每天：

```text
读取历史掌握度
 ↓
选择今日重点知识点
 ↓
生成 / 选择 5 道题
 ↓
用户输入开放式答案
 ↓
LLM 按 Rubric 结构化评分
 ↓
指出已覆盖点 / 遗漏点
 ↓
记录 Weak Topics
 ↓
决定是否追问
 ↓
更新 Mastery
 ↓
生成今日总结
 ↓
第二天继续针对弱项出题
```

第一月重点科目：

- JavaScript
- TypeScript
- React
- 浏览器 / HTTP
- SSE / WebSocket
- Python / FastAPI
- LLM 基础
- Tool Calling
- Agent / Workflow / State
- RAG
- LangGraph
- MCP 基础

---

# 九、开放式面试题如何评估

面试题没有唯一字符串答案，因此不能用简单 `answer == expected`。

采用：

## Rubric + LLM + Structured Output

每道题保存：

```text
question
topic
difficulty
rubric
reference_answer
```

例如问题：

> Agent 和普通 LLM 调用有什么区别？

Rubric 可包含：

- 一次输入输出 vs 多步骤任务
- Tool Calling
- State / Workflow
- 动态决定下一步
- Error / Retry
- Memory（按题目难度决定是否必需）

LLM 返回固定结构：

```json
{
  "score": 72,
  "covered_points": ["tool_calling", "multi_step"],
  "missing_points": ["state", "retry"],
  "weak_topics": ["agent_state"]
}
```

React 根据结构化数据展示掌握度，而不是解析一段不可预测的自然语言。

---

# 十、Month 2 扩展：英语 + 数学

## 英语单词

使用同一套学习引擎，但评估策略主要是确定性逻辑：

- 英译中
- 中译英
- 拼写
- 混淆词（后续）

示例：

```text
Subject = English
Topic = beautiful
Evaluator = Rule / Exact Match / Normalization
```

## 初一数学每日 5 题

根据历史知识点掌握度，每天挑选 5 道题：

```text
Subject = Math
Topic = 绝对值 / 数轴 / 有理数...
Evaluator = 标准答案 / 程序规则
```

若答错，可让 LLM 负责错误原因解释，但确定性答案优先由程序判断。

这样能证明：

> 同一个 Adaptive Learning Engine 可以支持开放式面试题、英语和数学，只需要替换 Question Generator / Evaluator / Content Strategy。

---

# 十一、数据库设计方向

底层优先采用通用表，而不是写死成英语表：

```text
users
profiles
subjects
topics
questions
rubrics
attempts
mastery
study_sessions
study_plans
agent_runs
tool_calls
```

后续英语需要时再增加领域扩展表，例如：

```text
words
word_details
```

核心 SQL 学习仍然来自真实业务：

- SELECT
- INSERT
- UPDATE
- DELETE
- WHERE
- ORDER BY
- JOIN
- GROUP BY
- INDEX
- FOREIGN KEY
- ORM

---

# 十二、技术路线

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

AI / Agent：

```text
LLM
Prompt / Context
Structured Output
Tool Calling
Agent State
LangGraph
Memory
Checkpoint
RAG
Evaluation
Bad Case
```

工程化：

```text
Git / GitHub
Docker
Logging
Tests
Deployment
```

---

# 十三、为什么使用 React

用户过去主要使用 Vue。

为了提高 AI 前端招聘覆盖度，本项目使用 React，并通过 Vue 对照学习：

```text
Vue ref        → React useState
computed       → useMemo
watch          → useEffect
props          → props
emit           → callback props
slot           → children
Pinia          → Zustand
```

注意：这些只是帮助建立联系，不代表底层原理完全相同；遇到具体知识点时必须解释差异和面试常见追问。

---

# 十四、开发工具

Python / FastAPI / Agent：

- PyCharm
- Python venv

前端：

- VS Code
- React + TypeScript

AI 辅助：

- ChatGPT：主线讲解、答疑、面试训练、文档维护
- Codex：UI/重复代码辅助、Code Review、排错，但核心学习代码第一遍不直接整块代写

---

# 十五、第一月验收点

## Day 7

能完成最小“每天 5 道面试题”的 Web 流程：

```text
React → FastAPI → 题目 → 输入答案 → 显示反馈
```

## Day 14

完成：

- PostgreSQL 持久化
- questions / topics / attempts
- LLM Rubric 评分
- Structured Output
- 历史答题记录

## Day 21

完成：

- Mastery / Weak Topics
- 根据弱项调整下一轮 5 题
- 个性化学习报告

## Day 30

StudyMate v1 至少具备：

- 前端 / Agent 面试科目
- 每日 5 题
- 开放式答案
- Rubric 结构化评分
- 薄弱知识点
- 自适应出题
- Agent 基础工作流
- 学习报告
- React + FastAPI + PostgreSQL
- 在线可演示
- README / 架构图 / 面试项目说明

同时正式进入 AI 前端 / Agent 前端求职。

---

# 十六、求职节奏

```text
Day 1～14
学习 + 产品闭环

Day 15～21
开始整理 AI 方向简历 / 项目表达

Day 20～30
少量试投，获取市场反馈

Day 30～45
大量投 AI 前端 / Agent 前端
同时继续学习和完善项目

Day 45～60
根据真实面试反馈补短板
并扩英语 / 数学证明架构可扩展
```

真实招聘反馈优先级高于原学习计划。

---

# 十七、文档体系

```text
docs/
├── 00-context.md
├── 01-study-plan.md
├── 02-progress.md
├── 03-learning-notes.md
├── 04-interview-notes.md
└── 05-mistakes.md
```

维护规则：

- 重大产品 / 学习路线决策：更新 `00-context.md`
- 每日当前状态：更新 `02-progress.md`
- 学过的知识：更新 `03-learning-notes.md`
- 面试问答：更新 `04-interview-notes.md`
- Bug / Bad Case：更新 `05-mistakes.md`

---

# 十八、新聊天恢复方式

新的聊天窗口优先读取：

1. `docs/00-context.md`
2. `docs/02-progress.md`
3. 需要查看完整学习路线时再读 `docs/01-study-plan.md`

然后从当前 Day 继续，不重新从零规划。

---

# 十九、对未来 ChatGPT 的长期指令

1. 不要重新从零设计路线，先读项目文档。
2. 用户主攻 AI 前端 / Agent 前端。
3. 第一个月项目是“Agent / 前端面试自适应学习 Agent”，不是英语背单词。
4. 第二个月再扩英语和数学。
5. 用户正在边学边做，不要一次生成过多核心代码。
6. 新知识必须尽量连接已有前端知识。
7. 讲解尽量包含：大白话、本质、代码、原理、项目用途、面试回答、追问。
8. 每天同步积累面试知识，而不是最后突击。
9. 不无节制扩大项目范围。
10. 若当前闭环未完成，暂停加新技术，先把闭环做通。
11. 真实面试反馈优先级高于原计划。
