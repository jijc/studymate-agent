# 题库与练习职责划分静态页实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让用户在题库查题、在练习作答、在复盘看反馈；隐藏第一期不开放的模拟面试入口，并让现有静态演示路径可检查。

**Architecture:** 保留现有 React Router 路由、`SidebarPageLayout`、`PageSidebar` 和练习组件。题库卡片只负责进入目录，题库详情提供唯一练习操作；练习会话从路由状态记住来处，完成后保存独立快照。现有后端只返回 `basic/react`，其余已知演示题库通过明确标注的本地示例数据展示页面，不能把它当成真实 AI 评分或正式抽题能力。

**Tech Stack:** React 19、TypeScript、React Router 8、TanStack Query、Tailwind CSS 4、Base UI、Vitest、Testing Library。

**Spec:** `docs/superpowers/specs/2026-09-23-library-practice-boundaries-design.md`

## Global Constraints

- 本轮只改静态页面和本地演示交互，不接入生成、真实评分、随机抽题、语音后端、持久化或 Pro 付费；保留练习页已有的“语音待接入”展示。
- 不写死普通用户 10 题、Pro 用户 60 题为已上线权益；题量仅显示当前演示题库数据。
- 保留 `/interview/...` 代码和深链接，隐藏公开入口及第一期营销文案。
- 侧边栏继续复用 `SidebarPageLayout` 与 `PageSidebar`，保留 66px Header 与现有暖橙色样式。
- `frontend/src/pages/PracticeSessionPage.tsx`、`frontend/src/pages/InterviewSessionPage.tsx`、`frontend/src/api/practice.ts` 当前已有未提交改动；实施时在现有内容上做局部补丁，不批量格式化、不覆盖用户改动、不提交或推送。
- 当前基线 `pnpm --dir frontend test` 为 72/82 通过，10 项练习 UI 测试因异步接口加载而失败。先把这一问题归入任务 3，再以新结果验收，不能把基线失败称为本轮回归。

## Review Focus

1. 无效题库来源或 ID：会话显示可返回的空状态，绝不使用其他题库的示例题；任务 3 的无效 ID 测试覆盖。
2. 直接打开会话链接：退出默认返回 `/practice`，不依赖浏览器历史；任务 3 的直达测试覆盖。
3. 未提交草稿、已提交但未完成整组：退出前确认，离开后不生成“整组完成”记录或薄弱点进度；任务 3 的退出测试覆盖。
4. 题库被删除或更新：旧复盘仍显示保存时的题目与回答，“再练一组”在题库不存在时禁用；任务 4 的快照测试覆盖。
5. 预览题数少于题库标称题数：明确显示“示例预览 x 题 / 题库共 y 题”，不伪装完整目录或泄露答案；任务 2 的预览测试覆盖。

---

### Task 1: 清理重复练习与模拟面试公开入口

**Files:**
- Modify: `frontend/src/components/questions/GeneratedLibraryCard.tsx`
- Modify: `frontend/src/components/questions/AiLibraryDetailHeader.tsx`
- Modify: `frontend/src/components/practice/PracticeLibraryPicker.tsx`
- Modify: `frontend/src/components/home/CapabilitiesSection.tsx`
- Modify: `frontend/src/components/home/HeroSection.tsx`
- Modify: `frontend/src/components/login/LoginIntro.tsx`
- Modify: `frontend/src/pages/ProfilePage.tsx`
- Modify: `frontend/src/data/reportOverview.ts`
- Test: `frontend/src/App.test.tsx`

**Interfaces:**
- Consumes: 现有 `GeneratedLibrary`、`AiLibraryDetail`、`Link` 和 `/interview/...` 路由。
- Produces: AI 题库卡片只有“查看题目”，AI 详情只有“练习这套题库”，练习首页不渲染 `InterviewLibraryPicker`；面试路由代码保持不变。

- [ ] **Step 1: 先更新会失败的入口测试。** 在 `App.test.tsx` 中把旧的“卡片直接开始练习”“预览保留模拟面试入口”“从练习页进入模拟面试”断言改为以下边界；直接打开 `/interview/session/jd/byte-frontend-jd` 的既有测试保留，以证明代码未删。

```tsx
const card = screen.getByRole("article", {name: "高级前端工程师"})
expect(within(card).getByRole("link", {name: "查看题目"}))
    .toHaveAttribute("href", "/questions/ai/resume/frontend-resume")
expect(within(card).queryByRole("link", {name: /开始练习/})).not.toBeInTheDocument()
expect(screen.queryByRole("region", {name: "AI 模拟面试"})).not.toBeInTheDocument()
expect(screen.queryByRole("link", {name: "模拟面试"})).not.toBeInTheDocument()
```

- [ ] **Step 2: 运行定向测试，确认旧入口断言失败。**

```bash
pnpm --dir frontend test -- src/App.test.tsx
```

预期：新断言因仍存在入口而失败；练习会话相关原有 10 项失败属于已记录基线。

- [ ] **Step 3: 移除公开入口和过度承诺文案。** `GeneratedLibraryCard` 去掉卡片里的练习按钮，仅保留“查看题目”；`AiLibraryDetailHeader` 去掉面试按钮，并将主操作写成“练习这套题库”；`PracticeLibraryPicker` 不再渲染 `InterviewLibraryPicker`。首页能力卡、登录页、个人中心和报告示例数据不再描述“模拟面试”已开放。已核对 `hero-interview.png` 是视频面试画面，`HeroSection` 改用现有 `question-bank-hero.png` 并将 alt 改为“AI 题库学习插画”，调整图片宽度以维持当前双栏平衡，不继续用面试图宣传一期功能。

文案按以下替换，不新增首页模块：`CapabilitiesSection` 第三卡写“选择题库独立作答，复盘反馈，逐步定位薄弱点。”；`LoginIntro` 的“真实模拟体验”改“专项题库练习”，描述改“按题作答并回看练习反馈”；`ProfilePage` 描述改“管理基本资料和求职目标，让个人题库与专项练习更贴近你的目标岗位。”；`reportOverview.ts` 的第一条最近练习改为“React 基础练习 / 基础练习”。

```tsx
// AI 详情唯一主操作；路由状态在 Task 3 使用。
<Link
    to={`/practice/session/${library.source}/${library.id}`}
    state={{returnTo: `/questions/ai/${library.source}/${library.id}`}}
    className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground"
>
    练习这套题库<ArrowRight aria-hidden="true" className="size-4"/>
</Link>
```

- [ ] **Step 4: 复测入口与深链接。** 保留直接路由的面试会话/结果测试；公开页面（首页、登录、练习、AI 详情）没有可点击的面试入口，报告示例也不显示模拟面试已完成记录。

### Task 2: AI 题库目录只供查题，标明静态预览范围

**Files:**
- Modify: `frontend/src/components/questions/AiQuestionPreview.tsx`
- Test: `frontend/src/App.test.tsx`
- Test: `frontend/src/data/aiLibraryDetails.test.ts`

**Interfaces:**
- Consumes: `getAiLibraryDetail(source, libraryId)` 与 `AiPreviewQuestion[]`。
- Produces: 标题、序号、考察方向和示例范围；没有未作答参考答案/AI 评分；未解锁和未知题库有清晰返回路径。

- [ ] **Step 1: 写/改失败测试，固定目录边界。**

```tsx
renderApp(["/questions/ai/resume/frontend-resume"])
expect(screen.getByText(/示例预览 5 题.*题库共 42 题/)).toBeInTheDocument()
expect(screen.getByRole("navigation", {name: "AI 预览题目目录"})).toBeInTheDocument()
expect(screen.queryByText("参考答案")).not.toBeInTheDocument()
expect(screen.queryByText("AI 评分")).not.toBeInTheDocument()
expect(screen.queryByText(/结合简历中的前端项目，考察组件边界/)).not.toBeInTheDocument()
expect(screen.getByRole("link", {name: "练习这套题库"}))
    .toHaveAttribute("href", "/practice/session/resume/frontend-resume")
```

- [ ] **Step 2: 运行定向测试并检查旧文案。**

```bash
pnpm --dir frontend test -- src/data/aiLibraryDetails.test.ts src/App.test.tsx
```

- [ ] **Step 3: 保留左右独立滚动与现有组件拆分，只收紧预览内容。** `AiLibraryDetailPage` 已有的“示例预览 x 题 · 题库共 y 题”保持原样；`AiQuestionPreview` 删除逐题“出题依据”栏，只显示题目与考察方向，避免把个性化追问依据提前当作答题提示；`AiQuestionPreviewDirectory` 已有编号保持原样。未解锁专属库的页面不构造虚假题目。

```tsx
<span>示例预览 {questions.length} 题 · 题库共 {library.questionCount} 题</span>
<div className="mt-8 border-t border-border/60 pt-6">
    <p className="text-xs font-semibold text-muted-foreground">考察方向</p>
    <p className="mt-2 text-sm font-medium">{question.topic}</p>
</div>
```

- [ ] **Step 4: 复测正常、未知和未解锁三种详情状态。** 测试不会把 5 道示例误认作完整的 42 道题，也不会显示个人 AI 题目的答案。

### Task 3: 静态练习会话可展示，并正确返回来处

**Files:**
- Modify: `frontend/src/pages/PracticeSessionPage.tsx`（保留当前用户的未提交改动）
- Modify: `frontend/src/components/practice/PracticeLibrarySection.tsx`
- Create: `frontend/src/data/practiceDemoQuestions.ts`
- Test: `frontend/src/App.test.tsx`
- Test: `frontend/src/data/practiceFlow.test.ts`

**Interfaces:**
- Consumes: `source/libraryId` 路由参数、`location.state?.returnTo`、现有 `getPracticeQuestions`、`resolvePracticeLibrary`、`fetchPracticeQuestions`。
- Produces: `getPracticeDemoQuestions(source: string, libraryId: string): PracticeQuestion[]`，只为已知演示题库返回题目；会话明确标注本地示例，真实请求成功时优先使用接口题目；退出可返回合法来处。

- [ ] **Step 1: 添加演示数据边界测试。** 对已知简历/JD 题库，静态演示题不为空；未知 ID 严格返回空数组。第一道个人题与详情预览使用同一题干，避免两处展示完全不同的“同一题库”。

```ts
expect(getPracticeDemoQuestions("resume", "frontend-resume")[0].prompt)
    .toBe(getAiLibraryDetail("resume", "frontend-resume")!.previewQuestions[0].prompt)
expect(getPracticeDemoQuestions("jd", "missing")).toEqual([])
```

- [ ] **Step 2: 运行定向测试确认新增函数尚不存在。**

```bash
pnpm --dir frontend test -- src/data/practiceFlow.test.ts
```

- [ ] **Step 3: 实现有限的静态演示适配层。** `practiceDemoQuestions.ts` 对有效题库取 `getPracticeQuestions` 的十题示例，再用 `getAiLibraryDetail(...).previewQuestions` 覆盖对应前几题的 ID、题干与考察方向；未知来源/ID 返回空数组。不要改写 `frontend/src/api/practice.ts` 的真实请求，也不要把示例结果写入真实评分字段。

```ts
export function getPracticeDemoQuestions(source: string, libraryId: string): PracticeQuestion[] {
    const base = getPracticeQuestions(source, libraryId)
    if (base.length === 0) return []
    const detail = getAiLibraryDetail(source, libraryId)
    if (!detail) return base
    return base.map((question, index) => {
        const preview = detail.previewQuestions[index]
        return preview
            ? {...question, id: preview.id, prompt: preview.prompt, topic: preview.topic}
            : question
    })
}
```

- [ ] **Step 4: 会话把 API 加载态与演示态分开。** 真实接口成功且有题目时使用接口；对已知演示题库，接口返回空数组或失败时显示明确“演示题目，非真实 AI 评分”标记并展示本地题。`resolvePracticeLibrary` 返回空时优先渲染无效题库状态，并让 `useQuery` 的 `enabled` 为 `Boolean(library)`，避免错误 ID 长期卡在加载态。修复现有测试在异步加载期直接找题目的失败：测试使用 `findByRole` / `waitFor` 等待稳定页面，而不是盲目同步断言。

```tsx
const demoQuestions = getPracticeDemoQuestions(source, libraryId)
const useDemo = !response?.data?.length && demoQuestions.length > 0 && !isPending
const questions = response?.data?.length ? response.data : useDemo ? demoQuestions : []
{useDemo && <p role="status" className="mt-2 text-xs text-muted-foreground">演示题目 · 不产生真实 AI 评分</p>}
```

- [ ] **Step 5: 先写返回路径测试，再实现入口传递与确认退出。** 练习首页选题时传 `state={{returnTo: "/practice"}}`；详情入口已在任务 1 传详情路由。直接打开会话默认 `/practice`。顶部“返回”及确认退出走同一个路径。离开未完成整组不保存“完成记录”；已有逐题提交只用于当前会话，不能触发专属 AI 题库更新。浏览器后退、顶栏导航与页面内退出都需要同一确认对话框，取消后保持草稿。

```tsx
const {router, unmount} = renderApp(["/questions/ai/resume/frontend-resume"])
fireEvent.click(screen.getByRole("link", {name: "练习这套题库"}))
await screen.findByRole("heading", {name: /高级前端工程师.*简历专项/})
fireEvent.click(screen.getByRole("button", {name: /返回/}))
expect(screen.getByRole("dialog", {name: "确定退出练习？"})).toBeInTheDocument()
fireEvent.click(screen.getByRole("button", {name: "确认退出"}))
expect(router.state.location.pathname).toBe("/questions/ai/resume/frontend-resume")
expect(sessionStorage.getItem("studymate-practice-records")).toBeNull()
unmount()

const direct = renderApp(["/practice/session/basic/react"])
await screen.findByRole("heading", {name: /React 基础练习/})
fireEvent.click(screen.getByRole("button", {name: /返回/}))
fireEvent.click(screen.getByRole("button", {name: "确认退出"}))
expect(direct.router.state.location.pathname).toBe("/practice")
```

```tsx
const location = useLocation()
const detailPath = `/questions/ai/${source}/${libraryId}`
const candidate = (location.state as {returnTo?: unknown} | null)?.returnTo
const returnTo = candidate === detailPath ? detailPath : "/practice"
// 从详情进入时回详情；其他情况，包括伪造的外部 URL，回练习首页。
```

- [ ] **Step 6: 复测五种会话路径。** 有效 React API、简历演示、JD 演示、未知题库、从详情进入后退出；保留切题草稿、逐题提交与语音占位的既有测试。若 API 真正报错且没有本地已知题库，仍展示加载失败，不把任何空数据伪造成真实题目。

### Task 4: 复盘提供明确下一步，并保持记录快照

**Files:**
- Modify: `frontend/src/pages/PracticeReviewPage.tsx`
- Modify: `frontend/src/data/practiceRecords.ts`
- Test: `frontend/src/App.test.tsx`
- Test: `frontend/src/data/practiceFlow.test.ts`

**Interfaces:**
- Consumes: `PracticeRecordDetail`、`resolvePracticeLibrary`、`getPracticeRecord`。
- Produces: “再练一组”“返回题库详情”“查看练习记录”；失效题库不再提供会失败的“再练一组”；演示反馈始终标注非真实评分。

- [ ] **Step 1: 先写复盘动作与历史快照测试。**

```tsx
const {unmount} = renderApp(["/practice/records/practice-react-basic"])
expect(screen.getByRole("link", {name: "再练一组"}))
    .toHaveAttribute("href", "/practice/session/basic/react")
expect(screen.getByRole("link", {name: "返回题库详情"}))
    .toHaveAttribute("href", "/questions/react")
expect(screen.getByRole("link", {name: "查看练习记录"}))
    .toHaveAttribute("href", "/practice/records")
unmount()

const saved = buildSubmittedRecord({
    source: "resume",
    libraryId: "frontend-resume",
    questions: [{id: "snapshot-1", prompt: "当时的题目", topic: "组件设计"}],
    answers: ["当时的回答"],
})
savePracticeRecord({...saved, libraryId: "removed-library"})
renderApp([`/practice/records/${saved.id}`])
expect(screen.getByText("当时的题目")).toBeInTheDocument()
expect(screen.getByText("当时的回答")).toBeInTheDocument()
expect(screen.queryByRole("link", {name: "再练一组"})).not.toBeInTheDocument()
```

- [ ] **Step 2: 运行定向测试确认缺少操作。**

```bash
pnpm --dir frontend test -- src/App.test.tsx src/data/practiceFlow.test.ts
```

- [ ] **Step 3: 用记录自身的题目快照渲染复盘，不重新查询当前题库内容。** `PracticeReviewPage` 根据 `record.source` 生成详情路径，`resolvePracticeLibrary(record.source, record.libraryId)` 为 `null` 时禁用再练并说明“原题库已不可用”；始终保留到记录列表的入口。`buildSubmittedRecord` 的 `answers` 必须取本组实际题目，而不是重新调用 `getPracticeQuestions` 生成另一套题；扩展入参为 `questions: Pick<PracticeQuestion, "id" | "prompt" | "topic">[]` 并由会话传入当前固定题组。同步更新 `practiceFlow.test.ts` 中两处直接调用该函数的测试入参。

```tsx
const detailHref = record.source === "basic"
    ? `/questions/${record.libraryId}`
    : `/questions/ai/${record.source}/${record.libraryId}`
const libraryExists = Boolean(resolvePracticeLibrary(record.source, record.libraryId))
{libraryExists ? (
    <Button render={<Link to={`/practice/session/${record.source}/${record.libraryId}`}/>} nativeButton={false} size="sm">再练一组</Button>
) : (
    <span className="text-sm text-muted-foreground">原题库已不可用，无法再练这套题</span>
)}
{libraryExists && <Button render={<Link to={detailHref}/>} nativeButton={false} variant="outline" size="sm">返回题库详情</Button>}
<Button render={<Link to="/practice/records"/>} nativeButton={false} variant="outline" size="sm">查看练习记录</Button>
```

```ts
export function buildSubmittedRecord(input: {
    source: PracticeSource
    libraryId: string
    questions: Pick<PracticeQuestion, "id" | "prompt" | "topic">[]
    answers: string[]
}): PracticeRecordDetail {
    const library = resolvePracticeLibrary(input.source, input.libraryId)
    if (!library) throw new Error("练习题库不存在")
    const answers = input.questions.map((question, index) => ({
        ...question,
        answer: input.answers[index]?.trim() ?? "",
        feedback: "演示反馈：先给出结论，再结合具体场景说明取舍和验证方式。",
    }))
    const completed = answers.filter((item) => item.answer).length
    const type = input.source === "basic" ? "基础练习" : input.source === "resume" ? "简历专项" : "JD 专项"
    return {
        id: `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        source: input.source,
        libraryId: input.libraryId,
        title: input.source === "basic" ? `${library.title} 基础练习` : library.title,
        type,
        completed,
        score: Math.round((completed / Math.max(1, input.questions.length)) * 78),
        duration: "演示练习",
        practicedAt: new Date().toLocaleString("zh-CN", {month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit"}),
        answers,
    }
}
```

- [ ] **Step 4: 复测历史快照与失效题库。** 保存记录后即使演示题库不可用，复盘仍显示当时题目和回答；“再练一组”不指向无效会话，未知记录有返回列表入口。

### Task 5: 回归与视觉验收

**Files:**
- Verify: 上述所有改动文件。
- No new implementation file.

**Interfaces:**
- Consumes: Task 1–4 的静态页面、演示数据及测试。
- Produces: 可复核的命令结果与页面验收说明；不声称接口阶段能力已经实现。

- [ ] **Step 1: 运行完整前端检查。**

```bash
pnpm --dir frontend lint
pnpm --dir frontend test
pnpm --dir frontend build
```

预期三项退出码均为 0；若不是，记录具体失败并修复本轮影响，不能把现有用户改动重置掉。

- [ ] **Step 2: 手工检查关键路径与窄屏。** `/questions/ai` → 简历/JD 详情 → 练习会话 → 复盘 → 记录/题库；`/practice` → 基础题库 → 练习会话；专属题库未解锁；未知题库；直接打开 `/interview/...` 仍可访问但公开页面无入口。检查侧边栏宽度、66px Header 与内容滚动不回退。

- [ ] **Step 3: 向用户区分本轮静态完成项与接口阶段未完成项。** 明确说明：真实个人题库生成、正式 10/60 权益、完整练习生成专属题库、增量优化与版本快照、基础题库随机抽十题均未实现；本轮只验证静态导航与演示内容。
