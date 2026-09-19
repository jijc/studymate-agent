# Public Question Library Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将题库改造成可搜索、可收藏置顶、可进入题目详情学习的公共 IT 面试知识库静态闭环。

**Architecture:** `/questions` 由页面组件持有搜索词和收藏集合，数据层保留固定顺序，渲染收藏区和剩余知识库区；`/questions/:libraryId` 复用相同侧边栏，通过静态数据驱动题目目录和学习内容。所有交互保持前端本地状态，不引入接口或持久化。

**Tech Stack:** React 19、TypeScript、React Router、Tailwind CSS v4、Lucide React、React Icons、Vitest、Testing Library。

**Spec:** `docs/superpowers/specs/2026-09-19-public-question-library-design.md`

## Global Constraints

- 仅实现静态数据和本地交互，不请求接口，不持久化收藏状态。
- 复用 `SidebarPageLayout`、`PageSidebar`、统一 Header、背景和现有设计 Token。
- 搜索是首页唯一筛选方式；删除分类标签、下拉筛选和布局切换。
- 知识库卡片只显示一个题目数量，不显示难度、评分、进度或“开始练习”。
- 收藏自动置顶；取消收藏后恢复数据原始顺序；不新增收藏夹页面。
- 所有知识库卡片都能进入 `/questions/:libraryId`，详情页提供目录、答案、解析、代码、面试技巧和追问。
- 不执行 Git commit、push 或创建 PR，等待用户后续明确授权。

---

### Task 1: 公共知识库数据模型与首页行为

**Files:**
- Create: `frontend/src/data/questionLibraries.ts`
- Modify: `frontend/src/App.test.tsx`
- Modify: `frontend/src/pages/QuestionsPage.tsx`
- Modify: `frontend/src/components/questions/QuestionHero.tsx`
- Replace responsibility: `frontend/src/components/questions/QuestionCard.tsx`
- Create: `frontend/src/components/questions/QuestionLibrarySection.tsx`
- Remove from page usage: `frontend/src/components/questions/QuestionToolbar.tsx`

**Interfaces:**
- Produces: `QuestionLibrary`、`questionLibraries`、`defaultFavoriteLibraryIds`。
- Produces: `QuestionCard({library, favorite, onFavoriteChange})`。
- Produces: `QuestionLibrarySection({title, description, libraries, favorites, onFavoriteChange})`。
- `QuestionsPage` 消费上述接口并维护 `query: string` 与 `favoriteIds: Set<string>`。

- [ ] **Step 1: 写首页行为失败测试**

在 `App.test.tsx` 中替换旧题库分类/筛选测试，覆盖错误产品模型最容易复发的行为：

```tsx
it("renders public IT knowledge libraries without practice filters", () => {
    renderApp(["/questions"])

    expect(screen.getByRole("heading", {name: "IT 面试知识库"})).toBeInTheDocument()
    expect(screen.getByRole("searchbox", {name: "搜索知识库"})).toHaveClass("h-12")
    expect(screen.queryByRole("region", {name: "题库分类和筛选"})).not.toBeInTheDocument()
    expect(screen.queryByText("开始练习")).not.toBeInTheDocument()
    expect(screen.queryByText(/简单|中等|较难/)).not.toBeInTheDocument()

    const reactCard = screen.getByRole("article", {name: "React 知识库"})
    expect(within(reactCard).getAllByText("256 道面试题")).toHaveLength(1)
})

it("filters knowledge libraries through the single search field", () => {
    renderApp(["/questions"])
    fireEvent.change(screen.getByRole("searchbox", {name: "搜索知识库"}), {
        target: {value: "Java"},
    })

    expect(screen.getByRole("article", {name: "Java 知识库"})).toBeInTheDocument()
    expect(screen.queryByRole("article", {name: "React 知识库"})).not.toBeInTheDocument()
})

it("pins favorites and restores original order after unfavoriting", () => {
    renderApp(["/questions"])
    const allLibraries = screen.getByRole("region", {name: "全部知识库"})

    fireEvent.click(within(allLibraries).getByRole("button", {name: "收藏 Vue 知识库"}))
    expect(within(screen.getByRole("region", {name: "我的收藏"})).getByRole("article", {name: "Vue 知识库"})).toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", {name: "取消收藏 Vue 知识库"}))
    const restoredTitles = within(allLibraries).getAllByRole("heading", {level: 3}).map((heading) => heading.textContent)
    expect(restoredTitles.slice(0, 3)).toEqual(["Vue", "TypeScript", "Go"])
})
```

- [ ] **Step 2: 运行测试并确认因新页面尚未实现而失败**

Run: `pnpm test -- --run src/App.test.tsx`

Expected: FAIL，缺少 `IT 面试知识库`、`搜索知识库`、收藏区和新卡片语义。

- [ ] **Step 3: 建立知识库数据模型**

在 `questionLibraries.ts` 定义稳定数据顺序和单一题目数量：

```ts
export type QuestionLibraryIcon = "react" | "vue" | "typescript" | "java" | "python" | "go" | "node" | "database" | "network" | "system" | "architecture"

export type QuestionLibrary = {
    id: string
    title: string
    description: string
    topics: string[]
    questionCount: number
    icon: QuestionLibraryIcon
    iconClassName: string
}

export const defaultFavoriteLibraryIds = ["react", "java", "python"]

export const questionLibraries: QuestionLibrary[] = [
    {id: "react", title: "React", description: "前端框架、组件化、状态管理与 Hooks", topics: ["组件", "Hooks", "状态管理"], questionCount: 256, icon: "react", iconClassName: "bg-[#eaf6ff] text-[#149eca]"},
    {id: "java", title: "Java", description: "Java 基础、并发编程、JVM 与 Spring 生态", topics: ["JVM", "并发", "Spring"], questionCount: 320, icon: "java", iconClassName: "bg-[#fff3e9] text-[#e76f22]"},
    {id: "python", title: "Python", description: "基础语法、数据结构、Web 开发与常用库", topics: ["语法", "数据结构", "Web"], questionCount: 317, icon: "python", iconClassName: "bg-[#ebf8f1] text-[#3776ab]"},
    {id: "vue", title: "Vue", description: "Vue 3、响应式原理、组件化与生态工具链", topics: ["Vue 3", "响应式", "组件化"], questionCount: 208, icon: "vue", iconClassName: "bg-[#eaf8f1] text-[#42b883]"},
    {id: "typescript", title: "TypeScript", description: "类型系统、工程化实践与前端框架结合", topics: ["类型系统", "泛型", "工程化"], questionCount: 189, icon: "typescript", iconClassName: "bg-[#e8f2ff] text-[#3178c6]"},
    {id: "go", title: "Go", description: "语言基础、并发模型、标准库与工程实践", topics: ["Goroutine", "Channel", "标准库"], questionCount: 184, icon: "go", iconClassName: "bg-[#e8f8fb] text-[#00add8]"},
    {id: "node", title: "Node.js", description: "事件循环、异步编程、核心模块与 Web 开发", topics: ["事件循环", "异步", "模块"], questionCount: 226, icon: "node", iconClassName: "bg-[#eef9e9] text-[#339933]"},
    {id: "database", title: "数据库", description: "MySQL、Redis、SQL 优化与数据库设计", topics: ["MySQL", "Redis", "SQL"], questionCount: 276, icon: "database", iconClassName: "bg-[#edf4ff] text-[#3b6ea8]"},
    {id: "network", title: "计算机网络", description: "TCP/IP、HTTP、网络模型与常见协议", topics: ["TCP/IP", "HTTP", "网络模型"], questionCount: 312, icon: "network", iconClassName: "bg-[#edf7ff] text-[#2488d8]"},
    {id: "system", title: "操作系统", description: "进程线程、内存管理、文件系统与调度", topics: ["进程", "内存", "文件系统"], questionCount: 205, icon: "system", iconClassName: "bg-[#fff3e8] text-[#ff641f]"},
    {id: "architecture", title: "系统设计", description: "高并发、分布式系统、缓存与消息队列", topics: ["高并发", "分布式", "缓存"], questionCount: 412, icon: "architecture", iconClassName: "bg-[#f1edff] text-[#6550d8]"},
]
```

- [ ] **Step 4: 实现紧凑搜索、收藏排序和知识库卡片**

`QuestionsPage` 使用数据原始顺序计算结果，不能直接对源数组原地排序：

```tsx
const [query, setQuery] = useState("")
const [favoriteIds, setFavoriteIds] = useState(() => new Set(defaultFavoriteLibraryIds))
const normalizedQuery = query.trim().toLocaleLowerCase()
const visibleLibraries = questionLibraries.filter((library) =>
    [library.title, library.description, ...library.topics]
        .join(" ")
        .toLocaleLowerCase()
        .includes(normalizedQuery),
)
const favorites = visibleLibraries.filter((library) => favoriteIds.has(library.id))
const remaining = visibleLibraries.filter((library) => !favoriteIds.has(library.id))
```

收藏更新必须创建新 `Set`，确保 React 能重新渲染：

```tsx
function handleFavoriteChange(id: string) {
    setFavoriteIds((current) => {
        const next = new Set(current)
        next.has(id) ? next.delete(id) : next.add(id)
        return next
    })
}
```

卡片入口使用真实路由链接：

```tsx
<Link to={`/questions/${library.id}`}>进入题库 <ArrowRight aria-hidden="true"/></Link>
```

- [ ] **Step 5: 运行题库首页测试并修正到通过**

Run: `pnpm test -- --run src/App.test.tsx`

Expected: 新首页、搜索、收藏置顶和恢复顺序测试 PASS；旧分类筛选测试已删除。

---

### Task 2: 知识库详情页与学习内容交互

**Files:**
- Create: `frontend/src/data/questionLibraryDetails.ts`
- Create: `frontend/src/pages/QuestionLibraryPage.tsx`
- Create: `frontend/src/components/questions/QuestionLibraryHeader.tsx`
- Create: `frontend/src/components/questions/QuestionDirectory.tsx`
- Create: `frontend/src/components/questions/QuestionStudyContent.tsx`
- Modify: `frontend/src/App.tsx`
- Modify: `frontend/src/App.test.tsx`

**Interfaces:**
- Produces: `LibraryQuestion`、`QuestionLibraryDetail`、`questionLibraryDetails`、`getQuestionLibraryDetail(libraryId)`。
- `QuestionDirectory` 消费 `questions`、`activeQuestionId`、`onQuestionChange` 和 `query`。
- `QuestionStudyContent` 消费 `question`、`answerExpanded`、`onAnswerToggle`、`onPrevious`、`onNext` 和边界状态。

- [ ] **Step 1: 写详情闭环失败测试**

```tsx
it("opens a public library and reveals complete study guidance", () => {
    renderApp(["/questions/react"])

    expect(screen.getByRole("heading", {name: "React 面试知识库"})).toBeInTheDocument()
    expect(screen.getByRole("navigation", {name: "React 题目目录"})).toBeInTheDocument()
    expect(screen.queryByRole("region", {name: "参考答案与解析"})).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole("button", {name: "查看参考答案"}))

    const answer = screen.getByRole("region", {name: "参考答案与解析"})
    expect(within(answer).getByRole("heading", {name: "参考回答"})).toBeInTheDocument()
    expect(within(answer).getByRole("heading", {name: "原理解析"})).toBeInTheDocument()
    expect(within(answer).getByRole("heading", {name: "示例代码"})).toBeInTheDocument()
    expect(within(answer).getByRole("heading", {name: "面试回答技巧"})).toBeInTheDocument()
    expect(within(answer).getByRole("heading", {name: "常见追问"})).toBeInTheDocument()
})

it("resets the hidden answer when selecting another question", () => {
    renderApp(["/questions/react"])
    fireEvent.click(screen.getByRole("button", {name: "查看参考答案"}))
    fireEvent.click(screen.getByRole("button", {name: /useMemo 和 useCallback/}))

    expect(screen.queryByRole("region", {name: "参考答案与解析"})).not.toBeInTheDocument()
    expect(screen.getByRole("button", {name: "查看参考答案"})).toBeInTheDocument()
})

it("keeps every public library route usable", () => {
    questionLibraries.forEach((library) => {
        const {unmount} = renderApp([`/questions/${library.id}`])
        expect(screen.getByRole("heading", {name: `${library.title} 面试知识库`})).toBeInTheDocument()
        expect(screen.getAllByRole("button", {name: /^第 \d+ 题/}).length).toBeGreaterThan(0)
        unmount()
    })
})
```

- [ ] **Step 2: 运行详情测试并确认路由缺失导致失败**

Run: `pnpm test -- --run src/App.test.tsx`

Expected: FAIL，`/questions/react` 尚无详情标题、目录和答案区域。

- [ ] **Step 3: 创建静态题目详情模型**

```ts
export type LibraryQuestion = {
    id: string
    chapter: string
    title: string
    summary: string
    answer: string
    explanation: string
    code?: {language: string; content: string}
    tips: string[]
    followUps: string[]
}

export type QuestionLibraryDetail = QuestionLibrary & {
    questions: LibraryQuestion[]
}

export function getQuestionLibraryDetail(libraryId: string) {
    return questionLibraryDetails.find((library) => library.id === libraryId)
}
```

React 静态问题至少包含：组件重新渲染、`useMemo` 与 `useCallback`、受控组件、Context 性能；其余知识库使用与各自技术方向匹配的代表问题，确保所有路由至少有可选择题目和非空答案。

- [ ] **Step 4: 注册详情路由并实现主从学习布局**

在 `App.tsx` 的固定路由 `/questions` 后新增：

```tsx
<Route path="/questions/:libraryId" element={<QuestionLibraryPage/>}/>
```

详情页选择题目时同步折叠答案：

```tsx
function handleQuestionChange(questionId: string) {
    setActiveQuestionId(questionId)
    setAnswerExpanded(false)
}
```

当 `getQuestionLibraryDetail` 返回 `undefined` 时显示“未找到该知识库”和返回 `/questions` 的链接，不抛异常。

- [ ] **Step 5: 运行详情测试并修正到通过**

Run: `pnpm test -- --run src/App.test.tsx`

Expected: 首页入口、全部详情路由、题目选择、答案展开和重置行为 PASS。

---

### Task 3: 响应式视觉还原与共享布局回归

**Files:**
- Modify: `frontend/src/components/questions/QuestionSidebar.tsx`
- Modify: `frontend/src/components/questions/QuestionHero.tsx`
- Modify: `frontend/src/components/questions/QuestionCard.tsx`
- Modify: `frontend/src/components/questions/QuestionLibrarySection.tsx`
- Modify: `frontend/src/components/questions/QuestionLibraryHeader.tsx`
- Modify: `frontend/src/components/questions/QuestionDirectory.tsx`
- Modify: `frontend/src/components/questions/QuestionStudyContent.tsx`
- Modify: `frontend/src/App.test.tsx`

**Interfaces:**
- 保留 `data-slot="sidebar-page-layout"` 和 `data-slot="page-sidebar"` 共享契约。
- 首页主区域继续由 `SidebarPageLayout` 提供 `max-w-[1480px]`。

- [ ] **Step 1: 写视觉契约失败测试**

```tsx
it("keeps the redesigned library inside the shared layout with compact controls", () => {
    renderApp(["/questions"])
    const search = screen.getByRole("searchbox", {name: "搜索知识库"})
    const main = screen.getByRole("main")

    expect(search).toHaveClass("h-12", "text-sm")
    expect(main.parentElement).toHaveClass("max-w-[1480px]", "xl:flex-row")
    expect(screen.getByRole("region", {name: "我的收藏"})).toHaveClass("grid")
    expect(screen.getByRole("region", {name: "全部知识库"})).toHaveClass("grid")
})
```

- [ ] **Step 2: 运行测试并确认缺少最终视觉类名而失败**

Run: `pnpm test -- --run src/App.test.tsx`

Expected: FAIL，搜索或区域尚未具备紧凑尺寸与响应式网格契约。

- [ ] **Step 3: 按修订视觉稿完成样式**

- 首页：标题区减少上下留白，搜索总高度固定 `h-12`，按钮使用 `h-10` 和约 `min-w-24`。
- 收藏区：大屏三列，轻暖色边框；全部知识库：大屏四列、中屏两列、小屏一列。
- 卡片：固定信息顺序，题目数量只出现一次，收藏按钮位于右上角。
- 详情页：`xl:grid-cols-[20rem_minmax(0,1fr)]`，正文最大阅读宽度，代码块使用 `overflow-x-auto`。
- 共享侧边栏宽度和导航样式不作页面私有覆盖。

- [ ] **Step 4: 运行完整自动化检查**

Run: `pnpm test`

Expected: 全部测试 PASS。

Run: `pnpm lint`

Expected: ESLint exit 0。

Run: `pnpm build`

Expected: TypeScript 与 Vite 构建成功；现有 chunk-size warning 可记录但不属于本次阻塞项。

---

### Task 4: 浏览器验收与设计 QA

**Files:**
- Modify: `design-qa.md`
- Create: `output/design-qa/question-library-home-final.png`
- Create: `output/design-qa/question-library-detail-final.png`

**Interfaces:**
- 以选中的修订稿 `exec-e95c18ce-4431-4461-85a0-0e78c82a7af7.png` 为首页视觉目标。
- 详情页以规格中的主从结构和整站现有视觉语言为验收目标。

- [ ] **Step 1: 在真实浏览器验证首页主流程**

打开 `/questions`，检查紧凑搜索、收藏区域、全部知识库、单一题目数量和统一侧边栏；实际输入 `Java` 验证过滤，收藏 Vue 后验证置顶，取消后验证原顺序恢复。

- [ ] **Step 2: 在真实浏览器验证详情闭环**

进入 `/questions/react`，切换题目、展开答案、查看代码和技巧、使用上一题/下一题；检查页面和代码区无全局横向滚动。

- [ ] **Step 3: 进行设计 QA 并修复阻塞问题**

将修订视觉稿与同视口首页截图对比，更新 `design-qa.md`；P0/P1/P2 问题全部修复后将结果写为 `final result: passed`，P3 仅记录为后续微调项。

- [ ] **Step 4: 最终回归**

在最后一次生产代码修改后重新执行：

```bash
pnpm test
pnpm lint
pnpm build
git diff --check -- frontend/src docs/superpowers/specs docs/superpowers/plans design-qa.md
```

Expected: 测试、Lint、构建和 diff 检查全部通过；浏览器控制台无错误。
