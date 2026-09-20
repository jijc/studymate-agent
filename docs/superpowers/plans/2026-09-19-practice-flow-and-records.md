# 练习入口、答题与记录拆分 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. This repository is already dirty; do not create a worktree or commit unrelated changes.

**Goal:** 把练习页接成“选题库 → 答题 → 复盘 → 独立记录”的可点击静态流程。

**Architecture:** 保留 `/practice` 作为入口；共用一个答题页处理基础、简历、JD 三种来源，使用独立示例题目。静态记录与本次演示记录通过同一模型供列表和复盘读取，演示记录存于 `sessionStorage`，不接后端。

**Tech Stack:** React 19、TypeScript、React Router、Tailwind v4、Base UI Dialog、Vitest、Testing Library。

**Spec:** `docs/superpowers/specs/2026-09-19-practice-flow-and-records-design.md`

## Global Constraints

- 只做静态示例数据和本地交互；不接题目抽取、上传、AI 评分、语音或后端接口。
- Header 保持 66px；侧边栏页面复用 `SidebarPageLayout`、`PageSidebar` 和 `pageSidebarStyles`。
- 智能强化保持 `6/10` 未解锁，不开放答题入口。
- 每组展示 10 题；不同来源的示例题目分开；所有演示得分标明不是 AI 结果。
- 本任务不修改模拟面试、Pro、报告或个人中心业务。
- 工作区已有大量用户改动：仅修改本计划列出的文件，不提交、推送或清理其他文件。

## Review Focus

1. 直接打开不存在的题库 ID，应显示返回练习页的提示，不渲染空白答题页；Task 3 测试。
2. 直接打开不存在的记录 ID，应显示返回记录页的提示；Task 2 测试。
3. 从 AI 题库卡片点击开始练习，应保留所选题库 ID，不再绕回练习首页；Task 4 测试。
4. 跳过未作答题目后提交，完成题数仅统计非空答案；Task 3 测试。
5. 演示记录刷新后仍可打开，损坏的本地存储不得使记录页崩溃；Task 1 测试。

## 文件职责

- 修改 `frontend/src/data/practiceOverview.ts`：扩充三条静态记录所需的来源和题库 ID，保留现有卡片文案。
- 新建 `frontend/src/data/practiceSession.ts`：来源类型、题库解析、每种来源 10 道独立示例题目。
- 新建 `frontend/src/data/practiceRecords.ts`：复盘模型、静态记录详情、`sessionStorage` 读写与演示评分。
- 修改 `frontend/src/components/practice/PracticeSidebar.tsx`：将锚点改为实际路由并维护激活态。
- 修改 `frontend/src/components/practice/PracticeHistory.tsx`：列表的复盘链接指向记录详情路由。
- 新建 `frontend/src/pages/PracticeRecordsPage.tsx`：独立记录列表。
- 新建 `frontend/src/pages/PracticeReviewPage.tsx`：单次复盘与无效记录状态。
- 新建 `frontend/src/pages/PracticeSessionPage.tsx`：10 题作答、导航、提交与无效题库状态。
- 新建 `frontend/src/components/practice/PracticeSourceDialog.tsx`：基础／简历／JD 的题库选择弹窗。
- 修改 `frontend/src/components/practice/PracticeModeCard.tsx` 与 `PracticeModeGrid.tsx`：将可用卡片操作交给选择弹窗，保留智能强化禁用。
- 修改 `frontend/src/components/questions/GeneratedLibraryCard.tsx`：直接带题库 ID 进入答题页。
- 修改 `frontend/src/pages/PracticePage.tsx`：移除内嵌记录并管理选择弹窗。
- 修改 `frontend/src/App.tsx` 与 `frontend/src/components/layout/MainLayout.tsx`：接入路由与练习子路由的已登录 Header。
- 修改 `frontend/src/App.test.tsx`，新建 `frontend/src/data/practiceFlow.test.ts`：覆盖入口、记录、作答与错误状态。

### Task 1: 练习数据与本地记录模型

**Files:**
- Create: `frontend/src/data/practiceSession.ts`
- Create: `frontend/src/data/practiceRecords.ts`
- Create: `frontend/src/data/practiceFlow.test.ts`
- Modify: `frontend/src/data/practiceOverview.ts`

**Interfaces:**
- Produces: `PracticeSource = "basic" | "resume" | "jd"`、`resolvePracticeLibrary(source, libraryId)`、`getPracticeQuestions(source, libraryId)`；题库解析无效输入返回 `null`，题目函数对无效输入返回空数组。
- Produces: `PracticeRecordDetail`、`getAllPracticeRecords()`、`getPracticeRecord(id)`、`savePracticeRecord(record)`、`buildSubmittedRecord(input)`；列表与详情读取同一份数据。

- [ ] **Step 1: 先写失败测试。** 在 `practiceFlow.test.ts` 测试三种来源可解析、每种返回 10 题、未知 ID 返回 `null`；本地记录保存后能再次读取、损坏 JSON 返回静态记录、跳过题不计数。示例：

```ts
expect(resolvePracticeLibrary("resume", "frontend-resume")?.title).toBe("高级前端工程师")
expect(getPracticeQuestions("basic", "react")).toHaveLength(10)
expect(resolvePracticeLibrary("jd", "missing")).toBeNull()
expect(getPracticeQuestions("jd", "missing")).toEqual([])
const record = buildSubmittedRecord({source: "basic", libraryId: "react", answers: ["知道", "", ...Array(8).fill("")]})
expect(record.completed).toBe(1)
savePracticeRecord(record)
expect(getPracticeRecord(record.id)?.completed).toBe(1)
```

- [ ] **Step 2: 运行 `pnpm test -- src/data/practiceFlow.test.ts`，确认因缺少实际接口而失败。**
- [ ] **Step 3: 建立最小数据实现。** 基础题库从 `questionLibraries` 取元信息，简历和 JD 从 `resumeLibraries`／`jdLibraries` 取；每种来源放 10 条独立的面试题提示。沿用现有三条记录的时间、分数和标题，并补来源、题库 ID。`sessionStorage` 只保存本次演示记录，JSON 解析失败时回退静态记录：

```ts
export type PracticeSource = "basic" | "resume" | "jd"
export type PracticeQuestion = {id: string; prompt: string; topic: string; feedback: string}
export type PracticeLibraryChoice = {id: string; source: PracticeSource; title: string}
export function resolvePracticeLibrary(source: string, libraryId: string): PracticeLibraryChoice | null
export function getPracticeQuestions(source: string, libraryId: string): PracticeQuestion[]

export type PracticeAnswerReview = PracticeQuestion & {answer: string}
export type PracticeRecordDetail = PracticeRecord & {
  source: PracticeSource
  libraryId: string
  answers: PracticeAnswerReview[]
}
export function getAllPracticeRecords(): PracticeRecordDetail[]
export function getPracticeRecord(id: string): PracticeRecordDetail | null
export function savePracticeRecord(record: PracticeRecordDetail): void
export function buildSubmittedRecord(input: {
  source: PracticeSource
  libraryId: string
  answers: string[]
}): PracticeRecordDetail
```

  `buildSubmittedRecord` 的 `completed` 使用 `answers.filter((answer) => answer.trim()).length`；演示得分使用 `Math.round((completed / 10) * 78)`，只表示演示完成度，不称作真实 AI 评分。
- [ ] **Step 4: 重跑该测试，确认通过；再跑完整 `pnpm test`，记录任何旧测试失败。**

### Task 2: 独立练习记录与复盘页

**Files:**
- Create: `frontend/src/pages/PracticeRecordsPage.tsx`
- Create: `frontend/src/pages/PracticeReviewPage.tsx`
- Modify: `frontend/src/components/practice/PracticeHistory.tsx`
- Modify: `frontend/src/components/practice/PracticeSidebar.tsx`
- Modify: `frontend/src/pages/PracticePage.tsx`
- Modify: `frontend/src/App.tsx`
- Modify: `frontend/src/components/layout/MainLayout.tsx`
- Test: `frontend/src/App.test.tsx`

**Interfaces:**
- Consumes: Task 1 的 `getAllPracticeRecords()`、`getPracticeRecord(id)` 与 `PracticeRecordDetail`。
- Produces: `/practice/records`、`/practice/records/:recordId`；列表链接为 `/practice/records/${record.id}`。

- [ ] **Step 1: 在 `App.test.tsx` 写失败测试。** `/practice` 不再显示记录区；侧边栏“练习记录”是 `/practice/records`；记录页有三条静态记录；点击“查看复盘”出现对应题库标题和“示例评分”提示；未知记录 ID 显示“返回练习记录”。

```ts
renderApp(["/practice/records"])
expect(screen.getByRole("heading", {name: "练习记录"})).toBeInTheDocument()
expect(screen.getAllByRole("link", {name: "查看复盘"})).toHaveLength(3)
expect(screen.getByRole("link", {name: "查看复盘"})[0]).toHaveAttribute("href", "/practice/records/practice-react-basic")
```

- [ ] **Step 2: 运行 `pnpm test -- src/App.test.tsx`，确认新增测试因路由和页面缺失而失败。**
- [ ] **Step 3: 实现页面与路由。** `PracticeRecordsPage` 复用 `<SidebarPageLayout><PracticeSidebar/><main ...><PracticeHistory records={getAllPracticeRecords()}/></main></SidebarPageLayout>`；`PracticeReviewPage` 无侧边栏，读取 `recordId`，逐题展示原问题、用户回答、示例反馈，提供“返回练习记录”“再练一组”“查看报告”链接。`PracticeSidebar` 使用 `NavLink`，`/practice` 使用 `end`，`/practice/records` 在详情页仍激活；`MainLayout` 通过 `pathname.startsWith("/practice")` 使用已登录 Header。
- [ ] **Step 4: 将 `PracticeHistory` 的锚点链接改为路由链接，并从 `PracticePage` 移除历史区。重跑目标测试及完整 `pnpm test`。**

### Task 3: 共用答题页与提交闭环

**Files:**
- Create: `frontend/src/pages/PracticeSessionPage.tsx`
- Modify: `frontend/src/App.tsx`
- Test: `frontend/src/App.test.tsx`

**Interfaces:**
- Consumes: Task 1 的题库解析、10 题数据、`buildSubmittedRecord`、`savePracticeRecord`。
- Produces: `/practice/session/:source/:libraryId`；提交后导航到 `/practice/records/:recordId`。

- [ ] **Step 1: 写失败测试。** 直接打开 `/practice/session/basic/react` 可见 React 题库和 `1 / 10`；未答题时提交按钮禁用；输入一题答案、到下一题后仍保留第一题答案；提交后进入复盘且完成题数为 1；`/practice/session/basic/missing` 有明确返回入口。测试前清理 `sessionStorage`。

```ts
renderApp(["/practice/session/basic/react"])
expect(screen.getByRole("heading", {name: /React 基础练习/})).toBeInTheDocument()
expect(screen.getByText("1 / 10")).toBeInTheDocument()
expect(screen.getByRole("button", {name: "提交练习"})).toBeDisabled()
fireEvent.change(screen.getByRole("textbox", {name: "我的回答"}), {target: {value: "先确认依赖是否变化"}})
fireEvent.click(screen.getByRole("button", {name: "下一题"}))
expect(screen.getByText("2 / 10")).toBeInTheDocument()
fireEvent.click(screen.getByRole("button", {name: "提交练习"}))
expect(screen.getByText(/完成 1 题/)).toBeInTheDocument()
```

- [ ] **Step 2: 运行目标测试，确认因答题页缺失而失败。**
- [ ] **Step 3: 实现单页作答。** 答题页使用全站宽度而非侧边栏；`useParams` 解析来源和题库 ID，`useState<string[]>(Array(10).fill(""))` 保存回答；按钮改变题号不丢答案；提交时保存记录并 `navigate(`/practice/records/${record.id}`)`；页面写明“示例评分仅用于页面演示”。无效来源或题库提供返回入口。点击“退出练习”时用项目 Dialog 确认，明确未提交答案不计入记录；不新增复杂草稿机制。
- [ ] **Step 4: 重跑目标测试和完整 `pnpm test`。**

### Task 4: 入口选择与 AI 题库直达

**Files:**
- Create: `frontend/src/components/practice/PracticeSourceDialog.tsx`
- Modify: `frontend/src/components/practice/PracticeModeCard.tsx`
- Modify: `frontend/src/components/practice/PracticeModeGrid.tsx`
- Modify: `frontend/src/pages/PracticePage.tsx`
- Modify: `frontend/src/components/questions/GeneratedLibraryCard.tsx`
- Test: `frontend/src/App.test.tsx`

**Interfaces:**
- Consumes: Task 1 的来源、题库解析和现有 `questionLibraries`、`resumeLibraries`、`jdLibraries`。
- Produces: 练习页三种可用方式的选择弹窗；AI 题库卡片直达 `/practice/session/${library.kind}/${library.id}`。

- [ ] **Step 1: 写失败测试。** 点“选择简历题库”打开弹窗，列出两个现有简历题库；所选链接指向 `/practice/session/resume/frontend-resume`；基础练习列出 React 等技术方向；JD 列表不混入简历；智能强化按钮仍禁用。AI 题库卡片上的“开始练习”链接直接指向对应 session route。

```ts
renderApp(["/practice"])
fireEvent.click(screen.getByRole("button", {name: "选择简历题库"}))
const picker = screen.getByRole("dialog", {name: "选择简历题库"})
expect(within(picker).getByRole("link", {name: /高级前端工程师/}))
  .toHaveAttribute("href", "/practice/session/resume/frontend-resume")
expect(within(picker).queryByText("字节跳动 · 前端工程师")).not.toBeInTheDocument()
```

- [ ] **Step 2: 运行目标测试，确认因弹窗／直达链接缺失而失败。**
- [ ] **Step 3: 用现有 `DialogRoot`、`DialogContent`、`DialogTitle` 编写 `PracticeSourceDialog`。** `PracticeModeCard` 的可用按钮调用 `onSelect(mode.id)`；`PracticePage` 持有被选中的 `resume | jd | basic | null` 状态；弹窗根据来源展示对应题库链接与空状态“新建 AI 题库”，不复制四套卡片；`GeneratedLibraryCard` 的链接由 `/practice` 改为带来源和 ID 的 session route。
- [ ] **Step 4: 重跑目标测试及完整 `pnpm test`。**

### Task 5: 全量验证与浏览器验收

**Files:**
- Modify only files from Tasks 1-4 if verification reveals a scoped issue.

**Interfaces:** No new public interface.

- [ ] **Step 1: 运行 `pnpm lint`、`pnpm test`、`pnpm build`，逐项记录退出码和失败数。**
- [ ] **Step 2: 浏览器按 `练习首页 → 选择基础／简历／JD → 答题 → 复盘 → 记录` 各走一遍；从 AI 题库卡片直接进入答题页再走一遍。**
- [ ] **Step 3: 检查桌面和窄屏宽度、Header 66px、统一侧边栏、页面无横向溢出，并核对无效题库／记录 ID。**
- [ ] **Step 4: 读取 `git diff`，确认没有触碰模拟面试、Pro、报告、个人中心或其他用户改动；向用户报告真实验证结果与仍为静态演示的边界。**
