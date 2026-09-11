# StudyMate Agent 当前进度

> 这是项目最重要的动态文档。每天学习结束后必须更新。

## 当前状态

- 日期：2026-09-11
- 当前阶段：Day 1
- 状态：**后端基础链路已跑通，React 前端环境已初始化，下一步正式进入页面开发**
- 第一阶段产品：**AI 面试陪练 / 前端与 Agent 面试自适应学习平台**
- 第二阶段扩展：初一英语背单词 + 初一数学每日 5 题
- 主要求职方向：AI 前端工程师 / Agent 前端工程师
- 附带方向：AI 全栈（前端侧重）

## 产品方向最新确认

StudyMate 第一阶段不再只是“固定 5 道题练习”，而是逐步发展为可上线的 AI 面试陪练平台。

核心价值：

```text
用户简历 / 项目资料 / 招聘 JD
        ↓
AI 分析个人背景与目标岗位
        ↓
生成专属面试题
        ↓
文字 / 语音模拟回答
        ↓
AI 评分 + 追问 + 弱项分析
        ↓
持续针对性强化
```

长期可扩展能力：

- 上传简历后生成专属面试题
- 上传项目说明 / 本地项目资料后生成项目深挖题
- 输入招聘 JD 文本生成岗位匹配题
- 上传招聘信息截图后识别并生成专属题目
- AI 模拟面试
- 语音回答与语音识别
- 结构化评分与弱项分析
- 长期学习报告
- 后续加入 Pro 订阅，但当前阶段暂不开发 Pro

当前第一阶段导航确定为：

```text
首页 ｜ 练习 ｜ 题库 ｜ 报告 ｜ 登录
```

`Pro` 暂不放入导航；未来真正有订阅方案后再加入公开 Pricing 页面和登录后头像菜单入口。

## 已完成：环境与工程基础

- GitHub 仓库初始化完成
- 本地仓库与远程仓库已完成 Commit / Fetch / Pull / Push 全流程学习
- Python 项目版本固定为 3.12.12
- 创建 `backend/.venv`
- PyCharm 已配置正确解释器与 FastAPI Run Configuration
- FastAPI / Uvicorn / Pydantic 已安装
- Node.js 24.16.0 可用
- pnpm 10.28.0 可用，并确定前端统一使用 pnpm
- WebStorm 已作为 React 前端开发 IDE
- WebStorm 已配置 `pnpm dev` Run Configuration
- React + TypeScript + Vite 前端项目已初始化
- `localhost:5173` 已成功运行 Vite React 页面

## 已完成：FastAPI / Python 基础学习

已经学习并实际使用：

- FastAPI 最小应用
- `FastAPI()` 应用实例
- `@app.get()` / `@app.post()` 路由装饰器
- `async def`
- Python `dict` / `list`
- Python list 切片：`sequence[start:stop:step]`
- Query 参数
- `Query(default=5, ge=1, le=10)`
- `gt / ge / lt / le`
- Pydantic `BaseModel`
- `Field()` 数据约束
- POST Request Body
- 422 Validation Error
- HTTP 常见状态码：200 / 400 / 401 / 403 / 404 / 409 / 422 / 429 / 500 等
- Python 类型标注
- 函数返回类型：`-> EvaluationResult`
- `if / elif / else`
- `len()`
- Python `class` / 继承的基础概念
- `import` / module / package / `__init__.py`
- `as` 导入别名
- `APIRouter`
- `include_router()`
- `response_model`

## 已完成：后端目录规范化

当前后端按以下职责拆分：

```text
backend/app/
├── main.py
├── api/
│   ├── questions.py
│   └── attempts.py
├── schemas/
│   ├── attempt.py
│   └── evaluation.py
├── services/
│   ├── question_service.py
│   └── evaluation_service.py
├── models/
├── agents/
└── tools/
```

职责：

```text
main.py   = FastAPI 应用入口和组装
api/      = HTTP 路由
schemas/  = Pydantic 请求 / 响应数据结构
services/ = 业务逻辑
models/   = 后续数据库 ORM
agents/   = 后续 LLM / Agent Workflow
tools/    = 后续 Agent Tool
```

当前已能正常运行：

```text
GET  /
GET  /questions/today
POST /attempts
```

## 已完成：模拟评分链路

已经建立 `EvaluationResult`：

```python
class EvaluationResult(BaseModel):
    score: int = Field(ge=0, le=100)
    covered_points: list[str]
    missing_points: list[str]
    weak_topics: list[str]
```

当前评分仍为本地模拟规则，目标数据流：

```text
AnswerSubmit
    ↓
evaluation_service
    ↓
EvaluationResult
    ↓
未来替换为真实 LLM Structured Output
```

已经理解：

- LLM = Large Language Model / 大语言模型
- Structured Output 的基本作用
- Pydantic 可同时用于 API Schema 和未来 LLM 结构化输出校验
- 后续真正接入模型时，业务层不应绑死具体模型服务商

模型平台暂定：

- 当前不急着购买 API
- 真正开始接 LLM 时，优先考虑阿里云百炼作为第一平台
- 原因：后续项目明确可能需要文本模型 + 图片理解 + ASR 语音识别
- 代码设计仍需保留 Provider 抽象，未来可切换 Qwen / DeepSeek / GLM 等模型

## 已完成：React 前端初始化

前端当前技术基础：

```text
React 19
TypeScript
Vite
pnpm
WebStorm
```

Vite 默认页面已经成功运行。

前端 UI 技术方向暂定：

```text
React
+ Tailwind CSS
+ shadcn/ui
+ Lucide Icons
+ 自定义业务组件
```

原因：

- 不使用 Ant Design / Element 这类强办公后台风格作为主视觉
- 需要做更有品牌感的暖橙色 / 奶油白极简视觉
- shadcn/ui 更适合保留组件源码并自行调整品牌风格
- 页面开发过程同时用于学习 React component / props / state / event / map / conditional rendering 等核心知识

注意：Tailwind / shadcn/ui / Lucide Icons **目前还没有正式安装**，这是下一个学习步骤。

## UI / 产品视觉方向已确认

当前视觉关键词：

```text
暖橙色
奶油白
极简
少文字
大圆角
按钮有厚重点击感
避免办公蓝
```

已完成设计方向探索：

- 首页
- 登录页
- 练习页
- 题库页
- 报告页
- Banner 方向
- 暖橙色背景方向
- StudyMate Logo 方向

首页核心文案方向：

```text
让 AI 成为你的面试陪练
```

产品定位文案方向：

```text
不是刷更多的题，而是练更可能被问到的题。
```

首页不再使用“观看 Demo”作为主要入口。

## 今天学习到的工程 / 面试知识

### npm vs pnpm

已实际体验 npm / pnpm 安装流程，并确定项目使用 pnpm。

面试核心表达：

- npm 与 pnpm 都是 Node 包管理器
- pnpm 使用全局内容寻址存储并通过链接复用依赖
- 通常更省磁盘、安装更快
- pnpm 的依赖隔离更严格，可以减少 phantom dependency（幽灵依赖）
- pnpm workspace 很适合 Monorepo

### Git

已实际走过：

```text
Commit → Fetch → Pull → Push
```

理解：

- Commit：提交到本地仓库
- Fetch：更新远程引用，不修改工作区
- Pull：拉取并整合远程提交
- Push：把本地提交上传远程
- Merge 与 Rebase 的基本区别已开始了解

## 当前 Git 状态

用户已完成并推送最新本地代码。

最新可见提交包含：

```text
feat: initialize FastAPI backend
feat: 初始化 react
```

本地 `main` 与 `origin/main` 当前已同步。

## 下一步：正式进入前端页面开发

新对话不要重新做产品规划，直接从以下顺序继续：

1. 安装并理解 Tailwind CSS
2. 决定并初始化 shadcn/ui
3. 安装 Lucide Icons
4. 清理 Vite 默认页面
5. 建立颜色 / 圆角 / 阴影等基础 Design Token
6. 开发公共 Header
7. 开发首页 Hero
8. 开发首页核心功能区
9. 再逐步实现登录页 / 练习页 / 题库页 / 报告页
10. 页面稳定后连接 FastAPI

React 教学需要继续使用“React 与 Vue 对照”的方式，例如：

```text
React component ≈ Vue component
props ≈ Vue props
state ≈ Vue ref/reactive 的一部分用途
事件处理 ≈ @click / @change
条件渲染 ≈ v-if
数组 map ≈ v-for
```

## 学习方式继续保持

每个新知识尽量按以下顺序讲：

1. 一句话大白话讲本质
2. 实际代码
3. 为什么这么写 / 底层原理
4. 与用户已经熟悉的 Vue / Promise / 前端工程知识类比
5. 面试可以怎么回答

用户希望自己亲手写代码，不希望核心 Python / React / Agent 代码被自动生成代替学习。

调试时不要一次给太多步骤：

> 遇到错误就停在当前错误，只处理下一小步。

正常学习时可以适当加快速度，但遇到新的参数、命令或 Python / React 语法时，需要顺便解释相关写法。

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

- 每日练习
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
