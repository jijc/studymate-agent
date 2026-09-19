# Question Learning Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将知识库详情页改造成无网站侧边栏、双栏独立滚动、支持稳定编号和追问返回的学习工作台。

**Architecture:** 页面加载完整轻量目录并用稳定题号渲染，当前题目答案通过 ID 数据访问函数获取。桌面端固定剩余视口并让目录、答案分别滚动；移动端用 Base UI Dialog 显示目录。追问通过 URL 查询参数切换题目并保留来源上下文。

**Tech Stack:** React 19、TypeScript、React Router、Tailwind CSS v4、Base UI Dialog、Lucide React、Vitest、Testing Library。

**Spec:** `docs/superpowers/specs/2026-09-19-question-learning-workspace-design.md`

## Global Constraints

- 不引入虚拟列表，最多一次性渲染 500 条轻量目录。
- 完整答案按题目 ID 获取；静态阶段由本地数据访问函数模拟该边界。
- 复用现有 Header、设计 Token、Button 和 Base UI Dialog。
- `/questions` 继续复用共享侧边栏；只有详情路由移除网站侧边栏。
- 不执行 Git commit、push 或创建 PR。

---

### Task 1: 建立题号、学习层级和答案访问边界

**Files:**
- Modify: `frontend/src/App.test.tsx`
- Modify: `frontend/src/data/questionLibraryDetails.ts`

**Interfaces:**
- Produces: `QuestionDirectoryItem`、`QuestionKeyword`、`QuestionFollowUp`。
- Produces: `getQuestionDirectory(libraryId)` 与 `getQuestionAnswer(libraryId, questionId)`。

- [x] **Step 1: 写失败测试**

测试搜索前后题目按钮仍使用 `001`、`002` 等稳定编号，并验证展开后的标题顺序为关键词解释、白话理解、示例代码、标准答案、原理解析、常见追问、面试表达建议。

- [x] **Step 2: 运行 `pnpm test -- --run src/App.test.tsx`，确认因为稳定编号和新内容层级缺失而失败。**

- [x] **Step 3: 扩展题目数据并实现目录/答案访问函数。**

- [x] **Step 4: 运行聚焦测试，确认数据行为通过。**

### Task 2: 实现无网站侧边栏的独立滚动工作台

**Files:**
- Modify: `frontend/src/components/layout/MainLayout.tsx`
- Modify: `frontend/src/pages/QuestionLibraryPage.tsx`
- Modify: `frontend/src/components/questions/QuestionLibraryHeader.tsx`
- Modify: `frontend/src/components/questions/QuestionDirectory.tsx`
- Create: `frontend/src/components/questions/QuestionDirectoryDialog.tsx`
- Modify: `frontend/src/App.test.tsx`

**Interfaces:**
- `QuestionDirectory` 保持单一目录渲染责任，并通过 `onQuestionChange(id)` 通知页面。
- `QuestionDirectoryDialog` 使用 Base UI Dialog，在移动端复用目录组件。

- [x] **Step 1: 写失败测试**

验证详情页没有网站侧边导航、标题数量同行、具有“题目目录”和“题目学习内容”两个独立滚动区域，并提供移动端“打开题目目录”按钮。

- [x] **Step 2: 运行聚焦测试并确认布局契约缺失。**

- [x] **Step 3: 实现紧凑工具栏、固定视口双栏、独立滚动和移动端目录 Dialog。**

- [x] **Step 4: 运行聚焦测试并修正到通过。**

### Task 3: 实现追问学习支线和完整内容顺序

**Files:**
- Modify: `frontend/src/pages/QuestionLibraryPage.tsx`
- Modify: `frontend/src/components/questions/QuestionStudyContent.tsx`
- Modify: `frontend/src/App.test.tsx`

**Interfaces:**
- `QuestionStudyContent` 消费 `onFollowUpSelect(questionId)`、`returnToQuestion` 和 `onReturnToQuestion()`。
- URL 使用 `question` 与 `from` 查询参数保存当前题目和来源。

- [x] **Step 1: 写失败测试**

点击追问后应显示目标题目的完整解析和“返回原题”，点击返回后恢复原题；普通切题继续折叠答案。

- [x] **Step 2: 运行聚焦测试并确认追问仍是静态文字。**

- [x] **Step 3: 实现查询参数导航、追问卡片、自动展开和返回上下文。**

- [x] **Step 4: 运行聚焦测试与完整测试。**

### Task 4: 浏览器与工程验收

**Files:**
- Modify: `design-qa.md`

- [x] **Step 1: 运行 `pnpm test`、`pnpm lint`、`pnpm build`。**
- [x] **Step 2: 在桌面端验证双栏高度、独立滚动、追问跳转与返回。**
- [x] **Step 3: 在 `390 × 844` 验证目录抽屉和无横向溢出。**
- [x] **Step 4: 记录浏览器控制台与设计 QA 结果。**
