import "@testing-library/jest-dom/vitest"

import {act, cleanup, fireEvent, render, screen, within} from "@testing-library/react"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {createMemoryRouter, MemoryRouter, RouterProvider} from "react-router"
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest"

import App from "./App"
import {SmartPracticeCard} from "./components/practice/SmartPracticeCard"
import {recentPractice} from "./data/reportOverview"
import {questionLibraries} from "./data/questionLibraries"
import {getInterviewResult, saveInterviewResult} from "./data/mockInterview"

beforeEach(() => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {})
})

describe("AI 题库详情静态流程", () => {
    it("从 AI 题库卡片进入对应的题目预览", () => {
        renderApp(["/questions/ai"])

        expect(within(screen.getByRole("article", {name: "高级前端工程师"}))
            .getByRole("link", {name: "查看题目"}))
            .toHaveAttribute("href", "/questions/ai/resume/frontend-resume")
        expect(within(screen.getByRole("article", {name: "字节跳动 · 前端工程师"}))
            .getByRole("link", {name: "查看题目"}))
            .toHaveAttribute("href", "/questions/ai/jd/byte-frontend-jd")
    })

    it("预览 AI 独立题目并能从目录切换，只保留详情练习入口", () => {
        renderApp(["/questions/ai/resume/frontend-resume"])

        expect(screen.getByRole("heading", {level: 1, name: "高级前端工程师"})).toBeInTheDocument()
        expect(screen.getByText(/示例预览 5 题.*题库共 42 题/)).toBeInTheDocument()
        const directory = screen.getByRole("navigation", {name: "AI 预览题目目录"})
        expect(within(directory).getAllByRole("button")).toHaveLength(5)
        expect(screen.getByRole("region", {name: "AI 题目预览"})).toHaveTextContent("你在项目中如何拆分 React 组件")
        fireEvent.click(within(directory).getByRole("button", {name: /讲一次你用 TypeScript/}))
        expect(screen.getByRole("region", {name: "AI 题目预览"})).toHaveTextContent("讲一次你用 TypeScript")
        expect(screen.getByRole("link", {name: "练习这套题库"})).toHaveAttribute("href", "/practice/session/resume/frontend-resume")
        expect(screen.queryByRole("link", {name: "模拟面试"})).not.toBeInTheDocument()
    })

    it("未知题库和未解锁专属题库都有清晰的返回路径", () => {
        const {unmount} = renderApp(["/questions/ai/jd/missing"])
        expect(screen.getByRole("heading", {name: "未找到该 AI 题库"})).toBeInTheDocument()
        expect(screen.getByRole("link", {name: "返回 AI 题库"})).toHaveAttribute("href", "/questions/ai")
        unmount()

        renderApp(["/questions/ai/exclusive/weakness"])
        expect(screen.getByRole("heading", {name: "专属 AI 题库尚未解锁"})).toBeInTheDocument()
        expect(screen.getByRole("link", {name: "去练习"})).toHaveAttribute("href", "/practice")
        expect(screen.queryByRole("region", {name: "AI 题目预览"})).not.toBeInTheDocument()
    })
})

describe("AI 模拟面试静态会话", () => {
    it("练习页隐藏模拟面试入口，保留独立练习分区", () => {
        renderApp(["/practice"])

        expect(screen.queryByRole("region", {name: "AI 模拟面试"})).not.toBeInTheDocument()
        const aiPractice = screen.getByRole("region", {name: "AI 练习"})
        const basicPractice = screen.getByRole("region", {name: "基础题库练习"})
        expect(aiPractice.compareDocumentPosition(basicPractice) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    })

    it("逐轮保留真实输入和跳过状态，结果仍关联 JD 题库", () => {
        renderApp(["/interview/session/jd/byte-frontend-jd"])

        expect(screen.getByRole("heading", {level: 1, name: "AI 模拟面试"})).toBeInTheDocument()
        expect(screen.getByText(/你为什么关注这个前端岗位/)).toBeInTheDocument()
        fireEvent.change(screen.getByRole("textbox", {name: "我的回答"}), {target: {value: "我做过大型 React 项目"}})
        fireEvent.click(screen.getByRole("button", {name: "回答并继续"}))
        const completedReview = screen.getByText("已完成 1 轮 · 展开回顾")
        expect(completedReview.closest("details")).not.toHaveAttribute("open")
        fireEvent.click(completedReview)
        expect(screen.getByText("我做过大型 React 项目")).toBeInTheDocument()
        expect(screen.getByText("第 2 / 5 轮")).toBeInTheDocument()

        for (let index = 0; index < 4; index++) {
            fireEvent.click(screen.getByRole("button", {name: "跳过本轮"}))
        }

        const saved = JSON.parse(sessionStorage.getItem("studymate-interview-results") ?? "[]") as Array<{id: string}>
        const result = getInterviewResult(saved[0].id)
        expect(result?.source).toBe("jd")
        expect(result?.libraryId).toBe("byte-frontend-jd")
        expect(result?.answers).toHaveLength(5)
        expect(result?.answers[0].answer).toBe("我做过大型 React 项目")
        expect(result?.answers[4].skipped).toBe(true)
    })

    it("语音占位不丢失草稿，退出前确认，未知题库可返回", () => {
        const {unmount} = renderApp(["/interview/session/resume/frontend-resume"])
        fireEvent.change(screen.getByRole("textbox", {name: "我的回答"}), {target: {value: "我主导了前端项目"}})
        fireEvent.click(screen.getByRole("button", {name: "语音回答"}))
        expect(screen.getByText("语音录入待接入")).toBeInTheDocument()
        fireEvent.click(screen.getByRole("button", {name: "文字输入"}))
        expect(screen.getByRole("textbox", {name: "我的回答"})).toHaveValue("我主导了前端项目")
        fireEvent.click(screen.getByRole("button", {name: "退出面试"}))
        expect(screen.getByRole("dialog", {name: "确定退出模拟面试？"})).toBeInTheDocument()
        expect(sessionStorage.getItem("studymate-interview-results")).toBeNull()
        unmount()

        renderApp(["/interview/session/basic/react"])
        expect(screen.getByRole("heading", {name: "无法开始这场模拟面试"})).toBeInTheDocument()
        expect(screen.getByRole("link", {name: "返回练习页"})).toHaveAttribute("href", "/practice")
    })

    it("持续输入时计时仍按实际经过时间前进", () => {
        vi.useFakeTimers({toFake: ["Date", "setInterval", "clearInterval"]})
        renderApp(["/interview/session/resume/frontend-resume"])

        for (let index = 0; index < 3; index++) {
            act(() => vi.advanceTimersByTime(900))
            fireEvent.change(screen.getByRole("textbox", {name: "我的回答"}), {target: {value: `回答片段 ${index}`}})
        }

        expect(screen.getByText("00:02")).toBeInTheDocument()
    })

    it("通过顶部导航离开前确认，取消后保留回答草稿", () => {
        renderApp(["/interview/session/resume/frontend-resume"])
        fireEvent.change(screen.getByRole("textbox", {name: "我的回答"}), {target: {value: "我还没答完"}})
        fireEvent.click(screen.getByRole("link", {name: "首页"}))

        expect(screen.getByRole("dialog", {name: "确定退出模拟面试？"})).toBeInTheDocument()
        fireEvent.click(screen.getByRole("button", {name: "继续面试"}))
        expect(screen.getByRole("textbox", {name: "我的回答"})).toHaveValue("我还没答完")
        expect(screen.getByRole("heading", {level: 1, name: "AI 模拟面试"})).toBeInTheDocument()
    })
})

describe("AI 模拟面试结果", () => {
    it("回看本次文字回答与跳过题目，且明确标注反馈为演示内容", () => {
        saveInterviewResult({
            id: "interview-review-1",
            source: "resume",
            libraryId: "frontend-resume",
            title: "高级前端工程师",
            durationSeconds: 125,
            answers: [
                {questionId: "q1", prompt: "请介绍项目", answer: "我主导了组件库升级", skipped: false},
                {questionId: "q2", prompt: "你如何协作", answer: "", skipped: true},
            ],
        })
        renderApp(["/interview/result/interview-review-1"])

        expect(screen.getByRole("heading", {level: 1, name: "模拟面试结果"})).toBeInTheDocument()
        expect(screen.getByText("我主导了组件库升级")).toBeInTheDocument()
        expect(screen.getByText("未回答")).toBeInTheDocument()
        expect(screen.getByText(/演示反馈.*不依据本次回答评分/)).toBeInTheDocument()
        expect(screen.getByRole("link", {name: "再模拟一次"})).toHaveAttribute("href", "/interview/session/resume/frontend-resume")
        expect(screen.getByRole("link", {name: "返回 AI 题库详情"})).toHaveAttribute("href", "/questions/ai/resume/frontend-resume")
        expect(sessionStorage.getItem("studymate-practice-records")).toBeNull()
    })

    it("全跳过也能进入结果页，未知结果 ID 则提供返回入口", () => {
        const {unmount} = renderApp(["/interview/session/jd/byte-frontend-jd"])
        vi.mocked(window.scrollTo).mockClear()
        for (let index = 0; index < 5; index++) {
            fireEvent.click(screen.getByRole("button", {name: "跳过本轮"}))
        }
        expect(screen.getByRole("heading", {level: 1, name: "模拟面试结果"})).toBeInTheDocument()
        expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
        expect(screen.getByText("5 题未回答")).toBeInTheDocument()
        expect(screen.queryByText(/AI 评分：/)).not.toBeInTheDocument()
        unmount()

        renderApp(["/interview/result/missing"])
        expect(screen.getByRole("heading", {name: "未找到这次模拟面试"})).toBeInTheDocument()
        expect(screen.getByRole("link", {name: "返回练习页"})).toHaveAttribute("href", "/practice")
    })
})

afterEach(() => {
    cleanup()
    vi.useRealTimers()
    vi.restoreAllMocks()
    sessionStorage.clear()
    Object.defineProperty(window, "scrollY", {configurable: true, value: 0})
})

function renderApp(initialEntries = ["/"]) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {retry: false},
        },
    })

    const router = createMemoryRouter([{path: "*", element: <App/>}], {initialEntries})
    return {
        ...render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>,
        ),
        router,
    }
}

describe("StudyMate home page", () => {
    it("renders the complete home page journey", () => {
        renderApp()

        expect(screen.getByRole("heading", {name: "根据简历和 JD，生成专属面试训练"})).toHaveClass("text-4xl", "sm:text-5xl")
        expect(screen.getByRole("button", {name: /生成专属题库/})).toHaveAttribute("href", "/questions/ai")
        expect(screen.getByRole("button", {name: /浏览 IT 题库/})).toHaveAttribute("href", "/questions")
        expect(screen.getByText("你的简历与 JD 仅用于生成个人面试训练内容")).toBeInTheDocument()

        const capabilities = screen.getByRole("region", {name: "核心能力"})
        expect(within(capabilities).getAllByRole("article")).toHaveLength(3)
        expect(within(capabilities).getByRole("heading", {name: "AI 专属题库"})).toHaveClass("text-lg")
        expect(within(capabilities).getByRole("heading", {name: "站内知识库"})).toHaveClass("text-lg")
        expect(within(capabilities).getByRole("heading", {name: "练习与反馈"})).toHaveClass("text-lg")
        expect(within(capabilities).getByText("选择题库独立作答，复盘反馈，逐步定位薄弱点。")).toBeInTheDocument()
        expect(screen.queryByRole("img", {name: /模拟面试/})).not.toBeInTheDocument()
        expect(recentPractice.map((item) => item.type)).not.toContain("模拟面试")

        expect(screen.getByRole("heading", {name: "四步形成专属训练闭环"})).toBeInTheDocument()
        expect(screen.getByText("上传资料")).toBeInTheDocument()
        expect(screen.getByText("生成题库")).toBeInTheDocument()
        expect(screen.getByText("答题评分")).toBeInTheDocument()
        expect(screen.getByText("薄弱点强化")).toBeInTheDocument()
    })

    it("explains each of the four ordered training steps", () => {
        renderApp()

        const timeline = screen.getByRole("list", {name: "四步形成专属训练闭环"})
        const steps = within(timeline).getAllByRole("listitem")

        expect(steps).toHaveLength(4)
        expect(steps.map((step) => within(step).getByRole("heading", {level: 3}).textContent)).toEqual([
            "上传资料",
            "生成题库",
            "答题评分",
            "薄弱点强化",
        ])
        expect(within(steps[0]).getByText("简历或目标岗位 JD")).toBeInTheDocument()
        expect(within(steps[1]).getByText("获得匹配你的题目")).toBeInTheDocument()
        expect(within(steps[2]).getByText("看懂回答与薄弱点")).toBeInTheDocument()
        expect(within(steps[3]).getByText("针对弱项持续练习")).toBeInTheDocument()
    })

    it("opens and closes the mobile navigation", () => {
        renderApp()

        const toggle = screen.getByRole("button", {name: "打开导航菜单"})
        expect(toggle).toHaveAttribute("aria-expanded", "false")
        expect(screen.queryByRole("navigation", {name: "移动端导航"})).not.toBeInTheDocument()

        fireEvent.click(toggle)

        const mobileNav = screen.getByRole("navigation", {name: "移动端导航"})
        expect(toggle).toHaveAttribute("aria-expanded", "true")
        expect(mobileNav).toHaveClass("bg-card/70", "backdrop-blur-sm")
        expect(within(mobileNav).getAllByRole("link")).toHaveLength(4)
        expect(within(mobileNav).queryByRole("link", {name: "登录"})).not.toBeInTheDocument()

        fireEvent.click(screen.getByRole("button", {name: "关闭导航菜单"}))
        expect(screen.queryByRole("navigation", {name: "移动端导航"})).not.toBeInTheDocument()
    })

    it("shows the home background behind the translucent header", () => {
        renderApp()

        const header = screen.getByRole("banner")
        expect(header).toHaveClass("h-[66px]", "bg-card/75")
        expect(header).not.toHaveClass("border-b", "border-border/60", "shadow-soft")
        expect(header.parentElement).toHaveClass("home-background")
        expect(header).toHaveTextContent("AI 陪伴学习，成长更有方向")
        expect(screen.queryByRole("button", {name: /搜索/})).not.toBeInTheDocument()
    })

    it("uses the shared primary treatment for text actions", () => {
        renderApp()

        const actionLabels = ["生成专属题库", "登录"]

        actionLabels.forEach((label) => {
            const action = screen.getAllByText(label)[0].closest('[data-slot="button"]')

            expect(action).toHaveClass("bg-primary", "rounded-lg", "duration-400", "shadow-sm")
            expect(action).not.toHaveClass("shadow-press", "translate-y-1")
        })
    })

    it("keeps regular pages on the standard background", () => {
        renderApp(["/practice"])

        const layout = screen.getByRole("banner").parentElement
        expect(layout).toHaveClass("bg-background")
        expect(layout).not.toHaveClass("home-background")
    })

    it("keeps guest and authenticated headers on the same content width", () => {
        const {unmount} = renderApp()

        expect(screen.getByRole("banner").firstElementChild).toHaveClass("max-w-[1480px]")
        unmount()

        renderApp(["/questions"])

        expect(screen.getByRole("banner").firstElementChild).toHaveClass("max-w-[1480px]")
        expect(screen.getByRole("banner").firstElementChild).not.toHaveClass("max-w-[1600px]")
    })

    it("opens AI libraries by default while keeping the question section active", () => {
        const {unmount} = renderApp()
        const homeLibraryLink = within(screen.getByRole("navigation", {name: "主导航"}))
            .getByRole("link", {name: "题库"})

        expect(homeLibraryLink).toHaveAttribute("href", "/questions/ai")
        unmount()

        renderApp(["/questions"])
        const platformLibraryLink = within(screen.getByRole("navigation", {name: "主导航"}))
            .getByRole("link", {name: "题库"})

        expect(platformLibraryLink).toHaveAttribute("href", "/questions/ai")
        expect(platformLibraryLink).toHaveAttribute("aria-current", "page")
        expect(platformLibraryLink).toHaveClass("text-primary")
    })

    it("keeps every page header pinned at 66 pixels while scrolling", () => {
        const {unmount} = renderApp()
        const mainHeader = screen.getByRole("banner")
        const appRoot = mainHeader.parentElement?.parentElement
        const mainHeaderContent = mainHeader.querySelector('[data-slot="header-content"]')
        const mainLogo = within(mainHeader).getByRole("img", {name: "StudyMate"})

        expect(mainHeader).not.toHaveAttribute("data-compact")
        expect(mainHeader).toHaveClass("sticky", "top-0", "h-[66px]")
        expect(mainHeader).not.toHaveClass("shadow-soft")
        expect(mainHeaderContent).not.toHaveClass("translate-y-2")
        expect(mainLogo).toHaveClass("h-10")
        expect(appRoot).toHaveClass("overflow-x-clip")
        expect(appRoot).not.toHaveClass("overflow-x-hidden")

        Object.defineProperty(window, "scrollY", {configurable: true, value: 96})
        fireEvent.scroll(window)

        expect(mainHeader).not.toHaveAttribute("data-compact")
        expect(mainHeader).toHaveClass("h-[66px]")
        expect(mainHeader).not.toHaveClass("shadow-soft")
        expect(mainHeaderContent).toHaveClass("h-full", "items-center")
        expect(mainHeaderContent).not.toHaveClass("translate-y-2")
        expect(mainLogo).toHaveClass("h-10")
        expect(mainLogo).not.toHaveClass("h-8")

        unmount()
        renderApp(["/login"])

        const loginHeader = screen.getByRole("banner")
        const loginHeaderContent = loginHeader.querySelector('[data-slot="header-content"]')
        const loginLogo = within(loginHeader).getByRole("img", {name: "StudyMate"})
        expect(loginHeader).not.toHaveAttribute("data-compact")
        expect(loginHeader).toHaveClass("sticky", "top-0", "h-[66px]")
        expect(loginHeader).not.toHaveClass("shadow-soft")
        expect(loginHeaderContent).toHaveClass("h-full", "items-center")
        expect(loginHeaderContent).not.toHaveClass("translate-y-2")
        expect(loginLogo).toHaveClass("h-10")
        expect(loginLogo).not.toHaveClass("h-8")

        Object.defineProperty(window, "scrollY", {configurable: true, value: 0})
        fireEvent.scroll(window)

        expect(loginHeader).not.toHaveAttribute("data-compact")
        expect(loginHeader).toHaveClass("h-[66px]")
        expect(loginHeaderContent).not.toHaveClass("translate-y-2")
    })

    it("renders public IT knowledge libraries without practice filters", () => {
        renderApp(["/questions"])

        expect(screen.getByRole("heading", {name: "IT 面试知识库"})).toBeInTheDocument()
        expect(screen.getByRole("navigation", {name: "题库侧边导航"})).toBeInTheDocument()
        expect(screen.getByRole("searchbox", {name: "搜索知识库"})).toHaveClass("h-12")
        expect(screen.getByRole("region", {name: "我的收藏"})).toBeInTheDocument()
        expect(screen.getByRole("region", {name: "全部知识库"})).toBeInTheDocument()
        expect(screen.queryByRole("region", {name: "题库分类和筛选"})).not.toBeInTheDocument()
        expect(screen.queryByText("开始练习")).not.toBeInTheDocument()
        expect(screen.queryByText(/简单 - 中等|中等|较难/)).not.toBeInTheDocument()

        const reactCard = screen.getByRole("article", {name: "React 知识库"})
        expect(within(reactCard).getAllByText("256 道面试题")).toHaveLength(1)
        expect(screen.getAllByRole("article")).toHaveLength(11)
        expect(screen.getByRole("banner")).toHaveTextContent("你好，学习者")
        expect(screen.queryByRole("link", {name: "登录"})).not.toBeInTheDocument()
    })

    it("uses four library columns at the desktop breakpoint", () => {
        renderApp(["/questions"])

        expect(screen.getByTestId("all-library-grid")).toHaveClass("xl:grid-cols-4")
    })

    it("keeps the question workspace inside the shared page width", () => {
        renderApp(["/questions"])

        expect(screen.getByRole("main").parentElement).toHaveClass(
            "mx-auto",
            "w-full",
            "max-w-[1480px]",
        )
    })

    it.each(["/practice", "/practice/records", "/questions", "/questions/ai", "/profile"]) (
        "keeps the sidebar page at viewport height with independently scrolling content: %s",
        (route) => {
            renderApp([route])

            const main = screen.getByRole("main")
            const layout = main.parentElement
            const shell = layout?.parentElement

            expect(shell).toHaveAttribute("data-slot", "sidebar-page-shell")
            expect(shell).toHaveClass("h-[calc(100dvh-66px)]", "overflow-hidden")
            expect(layout).toHaveClass("h-full", "overflow-hidden")
            expect(main).toHaveClass("min-h-0", "overflow-y-auto")
        },
    )

    it("resets the outer scroll when entering a sidebar page from home", () => {
        renderApp()

        fireEvent.click(within(screen.getByRole("navigation", {name: "主导航"}))
            .getByRole("link", {name: "练习"}))

        expect(screen.getByRole("heading", {name: "今天想练什么？"})).toBeInTheDocument()
        expect(window.scrollTo).toHaveBeenCalledWith(0, 0)
    })

    it("anchors hidden practice radios inside their selectable cards", () => {
        renderApp(["/practice"])

        const radios = screen.getAllByRole("radio")
        expect(radios.length).toBeGreaterThan(0)
        radios.forEach((radio) => {
            expect(radio).toHaveClass("sr-only")
            expect(radio.closest("label")).toHaveClass("relative")
        })
    })

    it("shows the streamlined question navigation in product order", () => {
        renderApp(["/questions"])

        const sidebarNavigation = screen.getByRole("navigation", {name: "题库侧边导航"})
        const labels = within(sidebarNavigation)
            .getAllByRole("link")
            .map((link) => link.textContent)

        expect(labels).toEqual(["AI 题库", "站内题库"])
        expect(within(sidebarNavigation).queryByRole("link", {name: "收藏夹"})).not.toBeInTheDocument()
    })

    it("renders the personal AI library and its creation flow", () => {
        renderApp(["/questions/ai"])

        expect(screen.getByRole("heading", {name: "AI 题库"})).toBeInTheDocument()
        const exclusiveLibrary = screen.getByRole("region", {name: "专属 AI 题库"})
        expect(exclusiveLibrary).toHaveTextContent("6/10")
        expect(within(exclusiveLibrary).getByText("自动生成")).toHaveClass("text-primary", "font-semibold")
        expect(within(exclusiveLibrary).getByText("AI 评分")).toHaveClass("text-primary")
        expect(screen.getByRole("region", {name: "简历题库"})).toHaveTextContent("2/3")
        expect(screen.getByRole("region", {name: "JD 题库"})).toHaveTextContent("2/6")

        fireEvent.click(screen.getByRole("button", {name: "新建题库"}))

        const dialog = screen.getByRole("dialog", {name: "新建 AI 题库"})
        expect(within(dialog).getByRole("tab", {name: "简历生成"})).toHaveAttribute("aria-selected", "true")
        expect(within(dialog).getByLabelText("上传简历")).toBeInTheDocument()
        expect(within(dialog).getByLabelText("目标职位")).toBeInTheDocument()

        fireEvent.click(within(dialog).getByRole("tab", {name: "招聘信息生成"}))

        expect(within(dialog).getByRole("tab", {name: "招聘信息生成"})).toHaveAttribute("aria-selected", "true")
        expect(within(dialog).getByLabelText("公司名称")).toBeInTheDocument()
        expect(within(dialog).getByLabelText("招聘职位")).toBeInTheDocument()
        expect(within(dialog).getByLabelText("招聘信息")).toBeInTheDocument()

        fireEvent.click(within(dialog).getByRole("button", {name: "关闭弹窗"}))
        expect(screen.queryByRole("dialog", {name: "新建 AI 题库"})).not.toBeInTheDocument()
    })

    it("shows all practice sources together without category tabs", () => {
        renderApp(["/practice"])

        expect(screen.getByRole("heading", {name: "今天想练什么？"})).toBeInTheDocument()
        expect(screen.queryByText("AI 会从每次有效作答中认识你")).not.toBeInTheDocument()
        const practiceNavigation = screen.getByRole("navigation", {name: "练习侧边导航"})
        expect(within(practiceNavigation).getAllByRole("link").map((link) => link.textContent))
            .toEqual(["开始练习", "练习记录"])
        expect(within(practiceNavigation).getByRole("link", {name: "练习记录"}))
            .toHaveAttribute("href", "/practice/records")

        const picker = screen.getByRole("region", {name: "开始一组练习"})
        expect(within(picker).queryByRole("tablist")).not.toBeInTheDocument()
        const aiPractice = within(picker).getByRole("region", {name: "AI 练习"})
        const resumePractice = within(aiPractice).getByRole("region", {name: "简历专练"})
        const jdPractice = within(aiPractice).getByRole("region", {name: "JD 专练"})
        const basicPractice = within(picker).getByRole("region", {name: "基础题库练习"})
        expect(within(resumePractice).getByRole("radio", {name: "选择 高级前端工程师 题库"})).not.toBeChecked()
        expect(within(jdPractice).getByRole("radio", {name: "选择 字节跳动 · 前端工程师 题库"})).not.toBeChecked()
        expect(within(basicPractice).getByRole("radio", {name: "选择 React 题库"})).not.toBeChecked()
        expect(within(resumePractice).getByRole("button", {name: "开始练习"})).toBeDisabled()
        expect(within(jdPractice).getByRole("button", {name: "开始练习"})).toBeDisabled()
        expect(within(basicPractice).getByRole("button", {name: "开始练习"})).toBeDisabled()
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

        const smartPractice = within(aiPractice).getByRole("region", {name: "专属 AI 练习"})
        expect(within(smartPractice).getByRole("heading", {name: "专属 AI 练习"})).toBeInTheDocument()
        expect(smartPractice).toHaveAttribute("aria-disabled", "true")
        expect(smartPractice).toHaveTextContent("尚未开启")
        expect(smartPractice).toHaveTextContent("简历专练、JD 专练或基础题库")
        expect(smartPractice).not.toHaveTextContent("6/10")
        expect(within(smartPractice).getByRole("button", {name: "尚未开启"})).toBeDisabled()

        expect(screen.queryByRole("region", {name: "练习记录"})).not.toBeInTheDocument()
        expect(screen.getByRole("banner")).toHaveTextContent("你好，学习者")
    })

    it("activates start only after selecting a basic library", () => {
        const {router} = renderApp(["/practice"])

        const basicPractice = screen.getByRole("region", {name: "基础题库练习"})
        fireEvent.click(within(basicPractice).getByRole("radio", {name: "选择 React 题库"}))
        expect(within(basicPractice).getByRole("radio", {name: "选择 React 题库"})).toBeChecked()
        expect(within(basicPractice).getByRole("button", {name: "开始练习"})).toBeEnabled()
        fireEvent.click(within(basicPractice).getByRole("button", {name: "开始练习"}))

        expect(router.state.location.pathname).toBe("/practice/session/basic/react")
    })

    it("keeps resume and basic selections independent", async () => {
        renderApp(["/practice"])

        const basicPractice = screen.getByRole("region", {name: "基础题库练习"})
        const resumePractice = screen.getByRole("region", {name: "简历专练"})
        fireEvent.click(within(basicPractice).getByRole("radio", {name: "选择 React 题库"}))
        expect(within(resumePractice).getByRole("button", {name: "开始练习"})).toBeDisabled()
        fireEvent.click(within(resumePractice).getByRole("radio", {name: "选择 高级前端工程师 题库"}))
        expect(within(basicPractice).getByRole("radio", {name: "选择 React 题库"})).toBeChecked()
        fireEvent.click(within(resumePractice).getByRole("button", {name: "开始练习"}))
        expect(await screen.findByRole("heading", {name: "高级前端工程师"})).toBeInTheDocument()
    })

    it("starts a JD practice session from its own visible section", async () => {
        renderApp(["/practice"])

        const jdPractice = screen.getByRole("region", {name: "JD 专练"})
        fireEvent.click(within(jdPractice).getByRole("radio", {name: "选择 字节跳动 · 前端工程师 题库"}))
        fireEvent.click(within(jdPractice).getByRole("button", {name: "开始练习"}))
        expect(await screen.findByRole("heading", {name: "字节跳动 · 前端工程师"})).toBeInTheDocument()
    })

    it("gives all four practice entries the same theme-colored icon treatment", () => {
        renderApp(["/practice"])

        for (const name of ["专属 AI 练习", "简历专练", "JD 专练", "选择技能"]) {
            const entry = screen.getByRole("region", {name})
            const iconContainer = entry.querySelector("svg")?.parentElement
            expect(iconContainer, `${name} 的图标容器`).toHaveClass("size-10", "rounded-xl", "bg-primary", "text-primary-foreground")
        }
    })

    it("shows a direct start action when a personal AI library is ready", () => {
        render(
            <MemoryRouter>
                <SmartPracticeCard state={{status: "ready", href: "/practice/session/smart/personal"}}/>
            </MemoryRouter>,
        )

        const smartPractice = screen.getByRole("region", {name: "专属 AI 练习"})
        expect(smartPractice).not.toHaveAttribute("aria-disabled", "true")
        expect(within(smartPractice).getByRole("button", {name: "开始练习"}))
            .toHaveAttribute("href", "/practice/session/smart/personal")
        expect(within(smartPractice).queryByRole("button", {name: "尚未开启"})).not.toBeInTheDocument()
    })

    it("AI 题库卡片只进入目录，不重复放开始练习", () => {
        renderApp(["/questions/ai"])

        for (const name of ["高级前端工程师", "字节跳动 · 前端工程师"]) {
            const card = within(screen.getByRole("article", {name}))
            expect(card.getByRole("link", {name: "查看题目"})).toBeInTheDocument()
            expect(card.queryByRole("button", {name: "开始练习"})).not.toBeInTheDocument()
        }
    })

    it("shows practice records on a dedicated route with real review links", () => {
        renderApp(["/practice/records"])

        expect(screen.getByRole("heading", {name: "练习记录"})).toBeInTheDocument()
        expect(screen.queryByText("每一次练习，都有迹可循")).not.toBeInTheDocument()
        expect(screen.getAllByRole("link", {name: "查看复盘"})).toHaveLength(3)
        expect(screen.getAllByRole("link", {name: "查看复盘"})[0])
            .toHaveAttribute("href", "/practice/records/practice-react-basic")
        expect(screen.getByRole("navigation", {name: "练习侧边导航"})).toBeInTheDocument()
        expect(screen.getByRole("banner")).toHaveTextContent("你好，学习者")
    })

    it("shows the selected record review and a return path", () => {
        renderApp(["/practice/records/practice-react-basic"])

        expect(screen.getByRole("heading", {name: /React 基础练习/})).toBeInTheDocument()
        expect(screen.getByText("AI 评分")).toBeInTheDocument()
        expect(screen.getAllByText("逐题建议")).toHaveLength(10)
        expect(screen.getByRole("link", {name: "返回练习记录"}))
            .toHaveAttribute("href", "/practice/records")
    })

    it("shows a usable fallback for an unknown review record", () => {
        renderApp(["/practice/records/missing"])

        expect(screen.getByText("没有找到这次练习记录")).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "返回练习记录"}))
            .toHaveAttribute("href", "/practice/records")
    })

    it("答题时不显示逐题反馈，AI 提示默认收起", async () => {
        renderApp(["/practice/session/resume/frontend-resume"])
        await screen.findByRole("navigation", {name: "本轮题目目录"})

        expect(screen.queryByRole("region", {name: "实时反馈"})).not.toBeInTheDocument()
        expect(screen.queryByRole("button", {name: "提交本题"})).not.toBeInTheDocument()
        const hint = screen.getByText("AI 提示").closest("details")
        expect(hint).not.toHaveAttribute("open")
        fireEvent.click(screen.getByText("AI 提示"))
        expect(hint).toHaveAttribute("open")
    })

    it("switches between text and a clearly unavailable voice answer without losing typed work", async () => {
        renderApp(["/practice/session/resume/frontend-resume"])
        await screen.findByRole("navigation", {name: "本轮题目目录"})

        fireEvent.change(screen.getByRole("textbox", {name: "我的回答"}), {
            target: {value: "先说明关键概念"},
        })
        fireEvent.click(screen.getByRole("button", {name: "语音回答"}))

        expect(screen.queryByRole("textbox", {name: "我的回答"})).not.toBeInTheDocument()
        expect(screen.getByRole("button", {name: "开始录音"})).toBeDisabled()
        expect(screen.getByText(/语音录入待接入/)).toBeInTheDocument()
        expect(screen.getByText(/已有文字草稿已保留/)).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "提交本轮并查看评估"})).toBeDisabled()
        expect(screen.queryByRole("button", {name: /收藏/})).not.toBeInTheDocument()

        fireEvent.click(screen.getByRole("button", {name: "文字输入"}))
        expect(screen.getByRole("textbox", {name: "我的回答"})).toHaveValue("先说明关键概念")
    })

    it("does not treat the voice placeholder as a submitted answer", async () => {
        renderApp(["/practice/session/resume/frontend-resume"])
        await screen.findByRole("navigation", {name: "本轮题目目录"})

        fireEvent.click(screen.getByRole("button", {name: "语音回答"}))
        expect(screen.getByRole("button", {name: "提交本轮并查看评估"})).toBeDisabled()
        expect(screen.getByText(/尚未接收语音作答/)).toBeInTheDocument()
    })

    it("用演示题目展示高级前端工程师简历练习", async () => {
        renderApp(["/practice/session/resume/frontend-resume"])

        expect(await screen.findByRole("heading", {name: "高级前端工程师"})).toBeInTheDocument()
        expect(screen.getByRole("heading", {name: "你在项目中如何拆分 React 组件，避免页面状态相互影响？"})).toBeInTheDocument()
        expect(screen.getByText("1 / 10")).toBeInTheDocument()
    })

    it("题库名称和专项标签放在同一个标题区域，不重复专项名称", async () => {
        renderApp(["/practice/session/resume/frontend-resume"])

        const title = await screen.findByRole("heading", {level: 1, name: "高级前端工程师"})
        expect(title.parentElement).toHaveTextContent("简历专项")
        expect(screen.queryByRole("heading", {name: "高级前端工程师 简历专项"})).not.toBeInTheDocument()
    })

    it("练习中说明整轮评估与本地草稿，不重复展示通用答题提示", async () => {
        renderApp(["/practice/session/resume/frontend-resume"])
        await screen.findByRole("heading", {level: 1, name: "高级前端工程师"})

        expect(screen.getByRole("region", {name: "本轮评估"})).toHaveTextContent("每轮 10 道题")
        expect(screen.getByRole("region", {name: "本轮评估"})).toHaveTextContent("复盘页")
        expect(screen.getByText(/草稿仅保存在当前标签页，刷新可恢复/)).toBeInTheDocument()
        expect(screen.queryByText(/先说明核心概念，再结合具体场景组织回答/)).not.toBeInTheDocument()
        expect(screen.queryByText(/复盘评分为演示数据/)).not.toBeInTheDocument()
        expect(screen.queryByText(/回答会自动保存为草稿/)).not.toBeInTheDocument()
        expect(screen.queryByText(/回答会自动保存/)).not.toBeInTheDocument()
    })

    it("纵向题目目录展示标题，并可切换题目", async () => {
        renderApp(["/practice/session/resume/frontend-resume"])

        const directory = await screen.findByRole("navigation", {name: "本轮题目目录"})
        expect(within(directory).getAllByRole("button")).toHaveLength(10)
        fireEvent.click(within(directory).getByRole("button", {name: /第 2 题.*讲一次你用 TypeScript/}))
        expect(screen.getByRole("heading", {name: "讲一次你用 TypeScript 发现并解决线上风险的经历。"})).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "展开题目目录"})).toHaveAttribute("aria-expanded", "false")
    })

    it("切题和重新进入时保留未提交的回答", async () => {
        const firstView = renderApp(["/practice/session/resume/frontend-resume"])
        await screen.findByRole("navigation", {name: "本轮题目目录"})

        fireEvent.change(screen.getByRole("textbox", {name: "我的回答"}), {target: {value: "按业务边界拆分组件"}})
        fireEvent.click(screen.getByRole("button", {name: "下一题"}))
        expect(screen.getByRole("button", {name: /第 1 题，已作答/})).toBeInTheDocument()
        firstView.unmount()

        renderApp(["/practice/session/resume/frontend-resume"])
        await screen.findByRole("navigation", {name: "本轮题目目录"})
        expect(screen.getByRole("textbox", {name: "我的回答"})).toHaveValue("按业务边界拆分组件")
        expect(screen.getByRole("button", {name: "提交本轮并查看评估"})).toBeDisabled()
    })

    it("10 题全部作答后才能提交本轮，最后一题不显示完成本组", async () => {
        renderApp(["/practice/session/resume/frontend-resume"])
        await screen.findByRole("navigation", {name: "本轮题目目录"})
        const submit = screen.getByRole("button", {name: "提交本轮并查看评估"})
        expect(submit).toBeDisabled()

        for (let index = 0; index < 10; index++) {
            fireEvent.change(screen.getByRole("textbox", {name: "我的回答"}), {
                target: {value: `第 ${index + 1} 题的回答`},
            })
            if (index < 9) fireEvent.click(screen.getByRole("button", {name: "下一题"}))
        }

        expect(screen.getByText("已作答 10 / 10 题")).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "下一题"})).toBeDisabled()
        expect(screen.queryByRole("button", {name: "完成本组"})).not.toBeInTheDocument()
        expect(submit).toBeEnabled()
        fireEvent.click(submit)

        expect(await screen.findByRole("heading", {name: /高级前端工程师.*练习复盘/})).toBeInTheDocument()
        expect(screen.getByRole("heading", {name: "如果重新设计你简历中的核心项目，你会保留和改进哪些技术决策？"})).toBeInTheDocument()
        expect(screen.getByText("第 10 题的回答")).toBeInTheDocument()
    })

    it("题库不存在时展示图文空状态和返回入口", () => {
        renderApp(["/practice/session/basic/missing"])

        expect(screen.getByRole("heading", {name: "没有找到这个练习题库"})).toBeInTheDocument()
        expect(screen.getByText("题库可能已被删除，或访问链接有误。请选择其他题库继续练习。"))
            .toBeInTheDocument()
        const emptyState = screen.getByRole("status", {name: "题库不可用"})
        expect(emptyState).toBeInTheDocument()
        expect(emptyState.className).not.toMatch(/\bborder(?:-|\s|$)/)
        expect(emptyState.className).not.toMatch(/\bbg-card(?:\/|\s|$)/)
        expect(screen.getByRole("button", {name: "返回练习页"})).toHaveAttribute("href", "/practice")
    })

    it("退出前说明草稿会保存，取消后留在当前题", async () => {
        renderApp(["/practice/session/resume/frontend-resume"])
        await screen.findByRole("navigation", {name: "本轮题目目录"})

        fireEvent.click(screen.getByRole("button", {name: "返回练习页"}))
        expect(screen.getByRole("dialog", {name: "确定退出练习？"}))
            .toHaveTextContent("草稿仅保存在当前标签页")
        fireEvent.click(screen.getByRole("button", {name: "继续练习"}))
        expect(screen.queryByRole("dialog", {name: "确定退出练习？"})).not.toBeInTheDocument()
    })

    it("未完成一轮时只保存草稿，不生成练习记录", async () => {
        renderApp(["/practice/session/resume/frontend-resume"])
        await screen.findByRole("navigation", {name: "本轮题目目录"})

        fireEvent.change(screen.getByRole("textbox", {name: "我的回答"}), {
            target: {value: "按职责拆分 React 组件"},
        })
        fireEvent.click(screen.getByRole("button", {name: "返回练习页"}))
        fireEvent.click(screen.getByRole("button", {name: "保存草稿并返回"}))

        expect(screen.getByRole("heading", {name: "今天想练什么？"})).toBeInTheDocument()
        expect(sessionStorage.getItem("studymate-practice-draft:resume:frontend-resume")).toContain("按职责拆分 React 组件")
        expect(sessionStorage.getItem("studymate-practice-records")).toBeNull()
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
        expect(
            within(screen.getByRole("region", {name: "我的收藏"}))
                .getByRole("article", {name: "Vue 知识库"}),
        ).toBeInTheDocument()

        fireEvent.click(screen.getByRole("button", {name: "取消收藏 Vue 知识库"}))
        const restoredTitles = within(allLibraries)
            .getAllByRole("heading", {level: 3})
            .map((heading) => heading.textContent)

        expect(restoredTitles.slice(0, 3)).toEqual(["Vue", "TypeScript", "Go"])
    })

    it("renders the library as a focused learning workspace", () => {
        renderApp(["/questions/react"])

        const heading = screen.getByRole("heading", {name: /React 知识库/})
        expect(heading).toHaveTextContent("256 题")
        expect(screen.queryByText("React 面试知识库")).not.toBeInTheDocument()
        const libraryIcon = screen.getByRole("img", {name: "React 技术图标"})
        expect(libraryIcon).toHaveClass("size-6")
        expect(libraryIcon.parentElement).toHaveClass("size-11")
        expect(screen.queryByRole("navigation", {name: "题库侧边导航"})).not.toBeInTheDocument()
        expect(screen.getByRole("banner")).toHaveTextContent("你好，学习者")
        expect(screen.queryByRole("link", {name: "登录"})).not.toBeInTheDocument()

        const directory = screen.getByRole("navigation", {name: "React 题目目录"})
        const studyArea = screen.getByRole("region", {name: "题目学习内容"})
        expect(directory).toHaveClass("overflow-y-auto")
        expect(studyArea).toHaveClass("overflow-y-auto")
        expect(screen.getByRole("button", {name: "打开题目目录"})).toBeInTheDocument()
    })

    it("keeps stable question numbers while filtering the directory", () => {
        renderApp(["/questions/react"])

        expect(screen.getByRole("button", {name: "第 001 题 React 组件为什么会重新渲染？"})).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "第 002 题 useMemo 和 useCallback 有什么区别？"})).toBeInTheDocument()

        fireEvent.change(screen.getByRole("searchbox", {name: "搜索 React 题目"}), {
            target: {value: "useMemo"},
        })

        expect(screen.getByRole("button", {name: "第 002 题 useMemo 和 useCallback 有什么区别？"})).toBeInTheDocument()
        expect(screen.queryByRole("button", {name: /^第 001 题/})).not.toBeInTheDocument()
    })

    it("reveals study guidance in the approved learning order", () => {
        renderApp(["/questions/react"])

        expect(screen.queryByRole("region", {name: "参考答案与解析"})).not.toBeInTheDocument()

        fireEvent.click(screen.getByRole("button", {name: "查看完整解析"}))

        const answer = screen.getByRole("region", {name: "参考答案与解析"})
        const sectionHeadings = within(answer).getAllByRole("heading", {level: 3}).map((item) => item.textContent)
        expect(sectionHeadings).toEqual([
            "关键词解释",
            "白话理解",
            "示例代码",
            "标准答案",
            "原理解析",
            "常见追问",
            "面试表达建议",
        ])

        const keywordList = screen.getByRole("list", {name: "关键词解释列表"})
        const keywordRows = within(keywordList).getAllByRole("listitem")
        expect(keywordList).toHaveClass("divide-y")
        expect(keywordRows).toHaveLength(3)
        keywordRows.forEach((row) => {
            expect(row).not.toHaveClass("rounded-xl", "bg-secondary/35")
        })
    })

    it("resets the hidden answer when selecting another question", () => {
        renderApp(["/questions/react"])

        fireEvent.click(screen.getByRole("button", {name: "查看完整解析"}))
        fireEvent.click(screen.getByRole("button", {name: "第 002 题 useMemo 和 useCallback 有什么区别？"}))

        expect(screen.queryByRole("region", {name: "参考答案与解析"})).not.toBeInTheDocument()
        expect(screen.getByRole("button", {name: "查看完整解析"})).toBeInTheDocument()
    })

    it("opens a follow-up as a complete answer and returns to the source question", () => {
        renderApp(["/questions/react"])

        fireEvent.click(screen.getByRole("button", {name: "查看完整解析"}))
        fireEvent.click(screen.getByRole("button", {name: "查看完整解析：useMemo 和 useCallback 有什么区别？"}))

        expect(screen.getByRole("heading", {name: "useMemo 和 useCallback 有什么区别？"})).toBeInTheDocument()
        expect(screen.getByRole("region", {name: "参考答案与解析"})).toBeInTheDocument()
        fireEvent.click(screen.getByRole("button", {name: "返回原题：React 组件为什么会重新渲染？"}))

        expect(screen.getByRole("heading", {name: "React 组件为什么会重新渲染？"})).toBeInTheDocument()
    })

    it("keeps every public library route usable", () => {
        questionLibraries.forEach((library) => {
            const {unmount} = renderApp([`/questions/${library.id}`])

            expect(screen.getByRole("heading", {name: new RegExp(`${library.title} 知识库`)})).toBeInTheDocument()
            expect(screen.getByRole("img", {name: `${library.title} 技术图标`})).toBeInTheDocument()
            expect(screen.getAllByRole("button", {name: /^第 \d{3} 题/}).length).toBeGreaterThan(0)
            unmount()
        })
    })

    it("renders the complete static learning report", () => {
        renderApp(["/reports"])

        expect(screen.getByRole("heading", {name: "持续练习，让更好的你发生"})).toBeInTheDocument()
        expect(screen.queryByRole("navigation", {name: "报告侧边导航"})).not.toBeInTheDocument()
        expect(screen.getByRole("region", {name: "学习概览"})).toBeInTheDocument()
        expect(screen.getByRole("region", {name: "成绩趋势"})).toBeInTheDocument()
        expect(screen.getByRole("region", {name: "能力分布"})).toBeInTheDocument()
        expect(screen.getByRole("region", {name: "薄弱点分析"})).toBeInTheDocument()
        expect(screen.getByRole("link", {name: "去强化练习"})).toHaveAttribute("href", "/practice")
        expect(screen.queryByRole("button", {name: "查看全部"})).not.toBeInTheDocument()
        expect(screen.queryByRole("region", {name: "最近练习"})).not.toBeInTheDocument()
        expect(screen.getByRole("banner")).toHaveTextContent("你好，学习者")
        expect(screen.getByRole("banner").parentElement).toHaveClass("home-background")
        expect(screen.queryByRole("link", {name: "登录"})).not.toBeInTheDocument()
    })

    it("shows the report as one full-width overview without redundant sidebar navigation", () => {
        renderApp(["/reports"])

        const report = screen.getByRole("main")

        expect(report).toHaveClass("mx-auto", "w-full", "max-w-[1480px]")
        expect(report.closest('[data-slot="sidebar-page-layout"]')).toBeNull()
        expect(screen.queryByRole("complementary")).not.toBeInTheDocument()
        expect(screen.queryByText(/Better Candidates/)).not.toBeInTheDocument()
    })

    it("keeps every sidebar page on the same layout and sidebar contract", () => {
        const pages = [
            {route: "/questions", navigation: "题库侧边导航"},
            {route: "/questions/ai", navigation: "题库侧边导航"},
            {route: "/practice", navigation: "练习侧边导航"},
            {route: "/profile", navigation: "个人中心导航"},
        ]
        const sidebarClassNames = new Set<string>()

        pages.forEach(({route, navigation}) => {
            const {unmount} = renderApp([route])
            const sidebarNavigation = screen.getByRole("navigation", {name: navigation})
            const sidebar = sidebarNavigation.closest("aside")
            const pageLayout = sidebar?.parentElement

            expect(sidebar).toHaveAttribute("data-slot", "page-sidebar")
            expect(sidebar).toHaveClass("w-full", "xl:h-full", "xl:w-60", "xl:border-r", "xl:py-7")
            expect(pageLayout).toHaveAttribute("data-slot", "sidebar-page-layout")
            expect(pageLayout).toHaveClass(
                "max-w-[1480px]",
                "flex-col",
                "h-full",
                "xl:flex-row",
                "overflow-hidden",
            )
            expect(pageLayout?.querySelector("main")).toHaveClass("min-h-0", "overflow-y-auto")

            within(sidebarNavigation).getAllByRole("link").forEach((link) => {
                expect(link).toHaveClass("h-12", "rounded-xl", "px-4", "text-sm")
            })

            sidebarClassNames.add(sidebar?.className ?? "")
            unmount()
        })

        expect(sidebarClassNames).toHaveLength(1)
    })

    it("opens the authenticated user menu with account actions", () => {
        renderApp(["/reports"])

        fireEvent.click(screen.getByRole("button", {name: "打开用户菜单"}))

        const menu = screen.getByRole("menu")
        expect(within(menu).getByText("学习者")).toBeInTheDocument()
        expect(within(menu).getByText("138****8000")).toBeInTheDocument()
        expect(within(menu).getByRole("menuitem", {name: "个人中心"})).toHaveAttribute("href", "/profile")
        expect(within(menu).getByRole("menuitem", {name: "账号与安全"})).toHaveAttribute("href", "/profile/security")
        expect(within(menu).getByRole("menuitem", {name: "退出登录"})).toHaveAttribute("href", "/login")
    })

    it("renders the personal profile inside the shared authenticated layout", () => {
        renderApp(["/profile"])

        expect(screen.getByRole("heading", {name: "个人中心"})).toBeInTheDocument()
        expect(screen.getByRole("navigation", {name: "个人中心导航"})).toBeInTheDocument()
        expect(screen.getByRole("region", {name: "个人资料"})).toBeInTheDocument()
        expect(screen.getByLabelText("昵称")).toHaveValue("学习者")
        expect(screen.getByText("138****8000")).toBeInTheDocument()
        expect(screen.getByRole("banner")).toHaveTextContent("你好，学习者")
        expect(screen.getByRole("banner").parentElement).toHaveClass("home-background")
    })

    it("switches personal center sections through dedicated routes", () => {
        renderApp(["/profile"])

        fireEvent.click(screen.getByRole("link", {name: "求职画像"}))

        expect(screen.getByRole("region", {name: "求职画像"})).toBeInTheDocument()
        expect(screen.getByLabelText("主目标岗位")).toBeInTheDocument()
        expect(screen.getByText("React")).toBeInTheDocument()
    })

    it("keeps every select option on one horizontal row", () => {
        renderApp(["/profile/career"])

        fireEvent.click(screen.getByRole("combobox", {name: "主目标岗位"}))

        const options = screen.getAllByRole("option")
        expect(options).toHaveLength(4)
        expect(screen.getByRole("listbox").parentElement?.parentElement)
            .toHaveAttribute("data-side", "bottom")
        options.forEach((option) => {
            expect(option).toHaveClass("flex", "whitespace-nowrap")
            expect(option).not.toHaveClass("grid-cols-[1rem_1fr]")
        })
    })

    it("renders account security and notification settings sections", () => {
        const {unmount} = renderApp(["/profile/security"])

        const security = screen.getByRole("region", {name: "账号与安全"})
        expect(within(security).getByText("登录密码")).toBeInTheDocument()
        expect(within(security).getByRole("button", {name: "设置密码"})).toBeInTheDocument()
        expect(within(security).getByRole("button", {name: "绑定邮箱"})).toBeInTheDocument()

        unmount()
        renderApp(["/profile/notifications"])

        const notifications = screen.getByRole("region", {name: "通知设置"})
        expect(within(notifications).getByRole("switch", {name: "每日练习提醒"})).toBeChecked()
        expect(within(notifications).getByRole("switch", {name: "系统通知"})).toBeDisabled()
    })

    it("opens the notification page from both authenticated header layouts", () => {
        renderApp(["/practice"])

        const bells = within(screen.getByRole("banner")).getAllByRole("link", {name: "查看通知"})
        expect(bells).toHaveLength(2)
        bells.forEach((bell) => expect(bell).toHaveAttribute("href", "/notifications"))

        fireEvent.click(bells[0])

        expect(screen.getByRole("heading", {name: "通知"})).toBeInTheDocument()
        expect(screen.getByRole("region", {name: "通知列表"})).toBeInTheDocument()
        expect(screen.getAllByRole("article")).toHaveLength(3)
        expect(screen.getByRole("link", {name: "通知设置"})).toHaveAttribute("href", "/profile/notifications")
        expect(screen.queryByRole("navigation", {name: /侧边导航/})).not.toBeInTheDocument()
    })

    it("filters unread notifications and clears the header indicator when all are read", () => {
        renderApp(["/notifications"])

        expect(screen.getAllByRole("article")).toHaveLength(3)
        expect(document.querySelectorAll('[data-slot="notification-unread-dot"]')).toHaveLength(2)

        fireEvent.click(screen.getByRole("button", {name: "未读"}))
        expect(screen.getAllByRole("article")).toHaveLength(2)
        fireEvent.click(screen.getByRole("button", {name: "全部标为已读"}))

        expect(screen.getByText("暂无未读通知")).toBeInTheDocument()
        expect(document.querySelectorAll('[data-slot="notification-unread-dot"]')).toHaveLength(0)
        expect(screen.getByRole("button", {name: "全部标为已读"})).toBeDisabled()

        fireEvent.click(screen.getByRole("button", {name: "全部"}))
        expect(screen.getAllByRole("article")).toHaveLength(3)
    })

    it("marks a notification read when opening its destination", () => {
        renderApp(["/notifications"])

        expect(screen.getByRole("link", {name: "查看复盘"})).toHaveAttribute("href", "/practice/records/practice-react-basic")
        fireEvent.click(screen.getByText("练习反馈已就绪"))
        expect(screen.getByRole("heading", {name: /React 基础练习.*练习复盘/})).toBeInTheDocument()

        fireEvent.click(within(screen.getByRole("banner")).getAllByRole("link", {name: "查看通知"})[0])
        fireEvent.click(screen.getByRole("button", {name: "未读"}))

        expect(screen.getAllByRole("article")).toHaveLength(1)
        expect(screen.queryByText("练习反馈已就绪")).not.toBeInTheDocument()
    })

    it("renders the dedicated login page without the main navigation or social login", () => {
        renderApp(["/login"])

        const header = screen.getByRole("banner")

        expect(within(header).getByRole("link", {name: "返回 StudyMate 首页"})).toBeInTheDocument()
        expect(screen.getByTestId("login-page")).toHaveClass("home-background", "min-h-screen")
        expect(screen.getByRole("heading", {name: "开始你的下一场面试练习"})).toBeInTheDocument()
        expect(screen.getByRole("heading", {name: "登录 StudyMate"})).toBeInTheDocument()
        expect(screen.queryByRole("navigation", {name: "主导航"})).not.toBeInTheDocument()
        expect(screen.queryByText("微信登录")).not.toBeInTheDocument()
        expect(screen.queryByText("GitHub 登录")).not.toBeInTheDocument()
    })

    it("uses verification login by default without separate registration or email login", () => {
        renderApp(["/login"])

        const verificationTab = screen.getByRole("tab", {name: "验证码登录"})

        expect(verificationTab).toHaveAttribute("aria-selected", "true")
        expect(screen.getByLabelText("手机号")).toBeInTheDocument()
        expect(screen.getByLabelText("验证码")).toBeInTheDocument()
        expect(screen.getByText("未注册手机号验证后将自动创建账号")).toBeInTheDocument()
        expect(screen.queryByRole("button", {name: "立即注册"})).not.toBeInTheDocument()
        expect(screen.queryByRole("tab", {name: "邮箱登录"})).not.toBeInTheDocument()
        expect(screen.queryByTestId("register-panel")).not.toBeInTheDocument()
    })

    it("switches to phone password login while preserving the phone number", () => {
        renderApp(["/login"])

        const phoneField = screen.getByLabelText("手机号")
        fireEvent.change(phoneField, {target: {value: "13800138000"}})
        fireEvent.click(screen.getByRole("tab", {name: "密码登录"}))

        expect(screen.getByRole("tab", {name: "密码登录"})).toHaveAttribute("aria-selected", "true")
        expect(screen.getByLabelText("手机号")).toHaveValue("13800138000")
        expect(screen.getByLabelText("登录密码")).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "忘记密码？"})).toBeInTheDocument()
        expect(screen.queryByLabelText("验证码")).not.toBeInTheDocument()
        expect(screen.queryByText("未注册手机号验证后将自动创建账号")).not.toBeInTheDocument()
    })

    it("validates the active login method before submission", () => {
        renderApp(["/login"])

        const loginPanel = screen.getByTestId("login-panel")
        fireEvent.click(within(loginPanel).getByRole("button", {name: "登录"}))

        expect(within(loginPanel).getByText("请输入正确的手机号")).toBeInTheDocument()
        expect(within(loginPanel).getByText("请输入 6 位验证码")).toBeInTheDocument()
        expect(within(loginPanel).getByText("请先同意用户协议和隐私政策")).toBeInTheDocument()

        fireEvent.click(within(loginPanel).getByRole("tab", {name: "密码登录"}))
        fireEvent.click(within(loginPanel).getByRole("button", {name: "登录"}))

        expect(within(loginPanel).getByText("请输入正确的手机号")).toBeInTheDocument()
        expect(within(loginPanel).getByText("请输入密码")).toBeInTheDocument()
        expect(within(loginPanel).queryByText("请输入 6 位验证码")).not.toBeInTheDocument()
    })

    it("starts a local verification-code countdown", () => {
        renderApp(["/login"])

        const loginPanel = screen.getByTestId("login-panel")
        const codeButton = within(loginPanel).getByRole("button", {name: "获取验证码"})

        expect(codeButton).toBeDisabled()
        fireEvent.change(within(loginPanel).getByLabelText("手机号"), {target: {value: "13800138000"}})
        expect(codeButton).toBeEnabled()
        fireEvent.click(codeButton)

        expect(within(loginPanel).getByRole("button", {name: "60 秒后重试"})).toBeDisabled()
    })
})
