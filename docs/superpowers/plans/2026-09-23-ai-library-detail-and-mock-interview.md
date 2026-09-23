# AI 题库详情与模拟面试静态页面 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让用户从 AI 题库或练习页进入独立题目预览，完成一次文字模拟面试，并在结果页回看本次回答与明确标注的演示反馈。

**Architecture:** 保持 AI 题库详情数据、模拟面试脚本和会话记录分离。三个新路由复用现有 Header、Button、Dialog 和设计 Token；详情与会话页不新建侧边导航。前端静态数据负责演示内容，`sessionStorage` 仅保存模拟面试结果，不写入练习记录或报告。

**Tech Stack:** React 19、TypeScript、React Router 8、Tailwind CSS v4、Base UI、Lucide、Vitest、Testing Library。

**Spec:** `docs/superpowers/specs/2026-09-23-ai-library-detail-and-mock-interview-design.md`

## Global Constraints

- 只做前端静态页面与本地交互；不接文件上传、题库生成、语音录制、AI 提问、AI 评分或后端接口。
- 演示反馈必须显式标注，不得暗示根据用户答案实时评分。
- Header 固定 66px；遵守现有暖橙色 Token、最大宽度、响应式规则。
- 已有练习接口问题不属于本计划；新页面不可宣称全站练习已打通。
- 保留工作区内已有未提交改动，尤其是 `App.tsx`、`App.test.tsx` 与 `PracticeSessionPage.tsx`；不覆盖或清理这些改动。

## Review Focus

1. `resume`、`jd` 以外的来源或不存在的题库 ID：详情与会话页显示返回入口，不崩溃（Task 1、2、4 测试）。
2. 专属 AI 题库仍锁定：直接访问其详情不出现虚构题目或可点击的模拟面试入口（Task 2 测试）。
3. 模拟面试全部跳过：结果页仍可回看每轮“未回答”，且不生成假评分（Task 3、4 测试）。
4. 结果页刷新或 sessionStorage 损坏：有效会话可恢复；无效内容进入友好空状态（Task 1、4 测试）。
5. 从练习页选择 JD 题库：会话与结果保持同一个 `source` 和 `libraryId`，不会误用简历题目（Task 3、4 测试）。

---

### Task 1: AI 题库预览和模拟面试的数据边界

**Files:**
- Create: `frontend/src/data/aiLibraryDetails.ts`
- Create: `frontend/src/data/aiLibraryDetails.test.ts`
- Create: `frontend/src/data/mockInterview.ts`
- Create: `frontend/src/data/mockInterview.test.ts`

**Interfaces:**
- Consumes: `GeneratedLibrary`、`resumeLibraries`、`jdLibraries` from `frontend/src/data/aiLibraries.ts`。
- Produces: `getAiLibraryDetail(source: string, libraryId: string): AiLibraryDetail | null`；`getInterviewQuestions(source: string, libraryId: string): InterviewQuestion[]`；`saveInterviewResult(result: InterviewResult): void`；`getInterviewResult(id: string): InterviewResult | null`。
- `InterviewResult` 至少包含 `id`、`source`、`libraryId`、`title`、`durationSeconds`、`answers: {questionId, prompt, answer, skipped}[]`。

- [ ] **Step 1: 先写数据测试。** `aiLibraryDetails.test.ts` 断言简历和 JD 各有不同的预览题、预览数量小于题库总量、未知来源返回 `null`；`mockInterview.test.ts` 断言脚本来源隔离、存储后可回读、损坏 JSON 返回 `null`。例如：

```ts
expect(getAiLibraryDetail("resume", "frontend-resume")?.previewQuestions.length).toBeGreaterThan(0)
expect(getAiLibraryDetail("jd", "byte-frontend-jd")?.previewQuestions[0].prompt)
  .not.toBe(getAiLibraryDetail("resume", "frontend-resume")?.previewQuestions[0].prompt)
expect(getAiLibraryDetail("resume", "missing")).toBeNull()
sessionStorage.setItem("studymate-interview-results", "bad json")
expect(getInterviewResult("missing")).toBeNull()
```

- [ ] **Step 2: 运行 `pnpm test -- src/data/aiLibraryDetails.test.ts src/data/mockInterview.test.ts`，确认因缺失功能失败。** 工作目录 `frontend/`。
- [ ] **Step 3: 实现最小静态数据和解析函数。** 用库 ID 显式映射预览题与脚本，不从站内题库或 `PracticeSessionPage` 借题；存储只写 `studymate-interview-results`，读取时校验必要字段。示例签名：

```ts
export function getAiLibraryDetail(source: string, libraryId: string): AiLibraryDetail | null
export function getInterviewQuestions(source: string, libraryId: string): InterviewQuestion[]
export function saveInterviewResult(result: InterviewResult): void
export function getInterviewResult(id: string): InterviewResult | null
```

- [ ] **Step 4: 重跑定向测试，确认通过；再跑 `pnpm test`，记录已有失败，不把原有练习测试失败归为新功能通过。**

### Task 2: AI 题库详情与列表入口

**Files:**
- Create: `frontend/src/pages/AiLibraryDetailPage.tsx`
- Create: `frontend/src/components/questions/AiLibraryDetailHeader.tsx`
- Create: `frontend/src/components/questions/AiQuestionPreview.tsx`
- Modify: `frontend/src/components/questions/GeneratedLibraryCard.tsx`
- Modify: `frontend/src/App.tsx`
- Modify: `frontend/src/components/layout/MainLayout.tsx`
- Test: `frontend/src/App.test.tsx`

**Interfaces:**
- Consumes: Task 1 的 `getAiLibraryDetail` 与现有 `Button`、`Link`、Header。
- Produces: `/questions/ai/:source/:libraryId` 路由；卡片“查看题目”入口；详情页“开始练习”“模拟面试”入口。

- [ ] **Step 1: 在现有 `App.test.tsx` 增加失败测试。** 渲染 `/questions/ai/resume/frontend-resume`，断言题库名称、`示例预览`、独立题目目录、`开始练习` 与 `模拟面试` 链接；渲染未知 ID 断言返回 AI 题库；渲染 `/questions/ai/exclusive/weakness` 断言锁定说明且无假题目。
- [ ] **Step 2: 运行 `pnpm test -- src/App.test.tsx`，确认新测试因路由／页面缺失失败。**
- [ ] **Step 3: 实现路由、列表链接和双栏详情。** 路由须位于通用 `/questions/:libraryId` 旁；用 `getAiLibraryDetail` 区分可用／无效／锁定状态。关键链接形态：

```tsx
<Link to={`/questions/ai/${library.kind}/${library.id}`}>查看题目</Link>
<Link to={`/interview/session/${detail.source}/${detail.id}`}>模拟面试</Link>
<Link to={`/practice/session/${detail.source}/${detail.id}`}>开始练习</Link>
```

- [ ] **Step 4: 重跑 `App.test.tsx`；窄屏下目录与预览纵向堆叠，桌面端各自可滚动。** 不复制站内题库的答案结构，也不新增侧边导航。

### Task 3: 练习页入口与模拟面试会话

**Files:**
- Create: `frontend/src/components/interview/InterviewLibraryPicker.tsx`
- Create: `frontend/src/components/interview/InterviewSession.tsx`
- Create: `frontend/src/pages/InterviewSessionPage.tsx`
- Modify: `frontend/src/pages/PracticePage.tsx`
- Modify: `frontend/src/App.tsx`
- Modify: `frontend/src/components/layout/MainLayout.tsx`
- Test: `frontend/src/App.test.tsx`

**Interfaces:**
- Consumes: Task 1 的 `getInterviewQuestions`、`saveInterviewResult`，Task 2 的详情路由与现有 `Dialog`、`Button`。
- Produces: `/interview/session/:source/:libraryId`；练习页题库选择入口；面试结束后导航到 `/interview/result/:sessionId`。

- [ ] **Step 1: 增加失败测试。** 从 `/practice` 打开“AI 模拟面试”选择器，选中 JD 题库，断言链接含 `jd/byte-frontend-jd`；进入会话后填写第一轮回答、推进，断言回答保留在对话中；跳过剩余轮次后进入结果 URL；未知题库显示返回入口。
- [ ] **Step 2: 运行 `pnpm test -- src/App.test.tsx`，确认因会话与选择器缺失失败。**
- [ ] **Step 3: 实现紧凑入口、选择弹窗和连续问答。** 以 `InterviewQuestion[]` 驱动当前轮次，回答时写入 `answers[index]`；跳过写空答案和 `skipped: true`；完成时调用 `saveInterviewResult` 并 `navigate`。示例状态：

```ts
type InterviewAnswer = {questionId: string; prompt: string; answer: string; skipped: boolean}
const [currentIndex, setCurrentIndex] = useState(0)
const [draft, setDraft] = useState("")
const [answers, setAnswers] = useState<InterviewAnswer[]>([])
```

- [ ] **Step 4: 退出确认与语音占位。** 继续面试保留草稿；退出回到 AI 题库详情且不保存结果；语音切换只显示“待接入”，不得展示录音中或转写成功。重跑 `App.test.tsx`。

### Task 4: 模拟面试结果与全流程验证

**Files:**
- Create: `frontend/src/pages/InterviewResultPage.tsx`
- Create: `frontend/src/components/interview/InterviewResultSummary.tsx`
- Modify: `frontend/src/App.tsx`
- Modify: `frontend/src/components/layout/MainLayout.tsx`
- Test: `frontend/src/App.test.tsx`

**Interfaces:**
- Consumes: Task 1 的 `getInterviewResult` 与 `InterviewResult`，Task 3 保存的结果。
- Produces: `/interview/result/:sessionId`，包含本次问题／答案／跳过标记及返回路径。

- [ ] **Step 1: 增加失败测试。** 手工写入 `InterviewResult` 后渲染结果 URL，断言能看到原回答、跳过标记、演示反馈说明、再次模拟与题库详情链接；未知结果 ID 显示“返回练习页”。
- [ ] **Step 2: 运行 `pnpm test -- src/App.test.tsx`，确认结果页缺失导致失败。**
- [ ] **Step 3: 实现结果页。** 定性反馈不以输入内容伪造 AI 评分；若显示分数必须明确是非真实演示。结果只读 `studymate-interview-results`，不写 `studymate-practice-records` 或报告数据。
- [ ] **Step 4: 运行完整验证。** 在 `frontend/` 依次执行 `pnpm lint`、`pnpm test`、`pnpm build`；区分新测试与工作区原有失败。用浏览器核对 AI 卡片→详情→会话→结果、练习页→选择器→会话、未知路由、桌面和窄屏布局；有失败则说明并修复本次范围内问题。
