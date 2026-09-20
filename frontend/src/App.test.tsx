import "@testing-library/jest-dom/vitest"

import {cleanup, fireEvent, render, screen, within} from "@testing-library/react"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {MemoryRouter} from "react-router"
import {afterEach, beforeEach, describe, expect, it, vi} from "vitest"

import App from "./App"
import {SmartPracticeCard} from "./components/practice/SmartPracticeCard"
import {questionLibraries} from "./data/questionLibraries"

beforeEach(() => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {})
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

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </MemoryRouter>,
    )
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
        expect(within(capabilities).getByText(/文字或语音模拟面试，AI 评分定位薄弱点/)).toBeInTheDocument()

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
        renderApp(["/practice"])

        const basicPractice = screen.getByRole("region", {name: "基础题库练习"})
        fireEvent.click(within(basicPractice).getByRole("radio", {name: "选择 React 题库"}))
        expect(within(basicPractice).getByRole("radio", {name: "选择 React 题库"})).toBeChecked()
        expect(within(basicPractice).getByRole("button", {name: "开始练习"})).toBeEnabled()
        fireEvent.click(within(basicPractice).getByRole("button", {name: "开始练习"}))

        expect(screen.getByRole("heading", {name: "React 基础练习"})).toBeInTheDocument()
    })

    it("keeps resume and basic selections independent", () => {
        renderApp(["/practice"])

        const basicPractice = screen.getByRole("region", {name: "基础题库练习"})
        const resumePractice = screen.getByRole("region", {name: "简历专练"})
        fireEvent.click(within(basicPractice).getByRole("radio", {name: "选择 React 题库"}))
        expect(within(resumePractice).getByRole("button", {name: "开始练习"})).toBeDisabled()
        fireEvent.click(within(resumePractice).getByRole("radio", {name: "选择 高级前端工程师 题库"}))
        expect(within(basicPractice).getByRole("radio", {name: "选择 React 题库"})).toBeChecked()
        fireEvent.click(within(resumePractice).getByRole("button", {name: "开始练习"}))
        expect(screen.getByRole("heading", {name: "高级前端工程师 简历专项"})).toBeInTheDocument()
    })

    it("starts a JD practice session from its own visible section", () => {
        renderApp(["/practice"])

        const jdPractice = screen.getByRole("region", {name: "JD 专练"})
        fireEvent.click(within(jdPractice).getByRole("radio", {name: "选择 字节跳动 · 前端工程师 题库"}))
        fireEvent.click(within(jdPractice).getByRole("button", {name: "开始练习"}))
        expect(screen.getByRole("heading", {name: "字节跳动 · 前端工程师 JD 专项"})).toBeInTheDocument()
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

    it("links an AI library card directly to its own practice session", () => {
        renderApp(["/questions/ai"])

        expect(within(screen.getByRole("article", {name: "高级前端工程师"}))
            .getByRole("button", {name: "开始练习"}))
            .toHaveAttribute("href", "/practice/session/resume/frontend-resume")
        expect(within(screen.getByRole("article", {name: "字节跳动 · 前端工程师"}))
            .getByRole("button", {name: "开始练习"}))
            .toHaveAttribute("href", "/practice/session/jd/byte-frontend-jd")
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
        expect(screen.getByText(/示例评分/)).toBeInTheDocument()
        expect(screen.getByRole("link", {name: "返回练习记录"}))
            .toHaveAttribute("href", "/practice/records")
    })

    it("shows a usable fallback for an unknown review record", () => {
        renderApp(["/practice/records/missing"])

        expect(screen.getByText("没有找到这次练习记录")).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "返回练习记录"}))
            .toHaveAttribute("href", "/practice/records")
    })

    it("keeps a draft when moving between questions without counting it as submitted", () => {
        renderApp(["/practice/session/basic/react"])

        expect(screen.getByRole("heading", {name: /React 基础练习/})).toBeInTheDocument()
        expect(screen.getByText("1 / 10")).toBeInTheDocument()
        expect(screen.getByRole("region", {name: "答题进度与时间"})).toBeInTheDocument()
        expect(screen.getByRole("region", {name: "AI 提示"})).toBeInTheDocument()
        const feedback = screen.getByRole("region", {name: "实时反馈"})
        expect(feedback).toHaveTextContent("提交本题后")
        expect(screen.getByRole("button", {name: "提交本题"})).toBeDisabled()

        fireEvent.change(screen.getByRole("textbox", {name: "我的回答"}), {
            target: {value: "先确认依赖是否变化"},
        })
        fireEvent.click(screen.getByRole("button", {name: "下一题"}))
        expect(screen.getByText("2 / 10")).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "第 1 题，草稿"})).toBeInTheDocument()
        expect(feedback).toHaveTextContent("提交本题后")
        fireEvent.click(screen.getByRole("button", {name: "第 1 题，草稿"}))
        expect(screen.getByRole("textbox", {name: "我的回答"})).toHaveValue("先确认依赖是否变化")
        expect(screen.getByRole("button", {name: "提交本题"})).toBeEnabled()
    })

    it("reveals feedback only after submitting a question and excludes unsubmitted drafts from review", () => {
        renderApp(["/practice/session/basic/react"])

        fireEvent.change(screen.getByRole("textbox", {name: "我的回答"}), {
            target: {value: "先确认依赖是否变化"},
        })
        fireEvent.click(screen.getByRole("button", {name: "提交本题"}))
        expect(screen.getByRole("region", {name: "实时反馈"})).toHaveTextContent("演示反馈")
        expect(screen.getByRole("button", {name: "第 1 题，已提交"})).toBeInTheDocument()
        expect(screen.getByRole("textbox", {name: "我的回答"})).toHaveAttribute("readonly")
        expect(screen.getByRole("button", {name: "已提交"})).toBeDisabled()

        fireEvent.click(screen.getByRole("button", {name: "下一题"}))
        fireEvent.change(screen.getByRole("textbox", {name: "我的回答"}), {
            target: {value: "这题只写草稿"},
        })
        fireEvent.click(screen.getByRole("button", {name: "第 10 题，未作答"}))
        fireEvent.click(screen.getByRole("button", {name: "完成本组"}))
        expect(screen.getByRole("dialog", {name: "还有未提交的草稿"})).toBeInTheDocument()
        fireEvent.click(screen.getByRole("button", {name: "忽略草稿并完成"}))

        expect(screen.getByText(/完成 1 题/)).toBeInTheDocument()
        expect(screen.getByRole("heading", {name: /React 基础练习.*练习复盘/})).toBeInTheDocument()
        expect(screen.queryByText("这题只写草稿")).not.toBeInTheDocument()
    })

    it("switches between text and a clearly unavailable voice answer without losing typed work", () => {
        renderApp(["/practice/session/basic/react"])

        fireEvent.change(screen.getByRole("textbox", {name: "我的回答"}), {
            target: {value: "先说明关键概念"},
        })
        fireEvent.click(screen.getByRole("button", {name: "语音回答"}))

        expect(screen.queryByRole("textbox", {name: "我的回答"})).not.toBeInTheDocument()
        expect(screen.getByRole("button", {name: "开始录音"})).toBeDisabled()
        expect(screen.getByText(/语音录入待接入/)).toBeInTheDocument()
        expect(screen.getByText(/已有文字答案仍可提交/)).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "提交本题"})).toBeEnabled()
        expect(screen.queryByRole("button", {name: /收藏/})).not.toBeInTheDocument()

        fireEvent.click(screen.getByRole("button", {name: "文字输入"}))
        expect(screen.getByRole("textbox", {name: "我的回答"})).toHaveValue("先说明关键概念")
    })

    it("does not treat the voice placeholder as a submitted answer", () => {
        renderApp(["/practice/session/basic/react"])

        fireEvent.click(screen.getByRole("button", {name: "语音回答"}))
        expect(screen.getByRole("button", {name: "提交本题"})).toBeDisabled()
        expect(screen.getByText(/尚未接收语音作答/)).toBeInTheDocument()
    })

    it("offers a way back when a practice library does not exist", () => {
        renderApp(["/practice/session/basic/missing"])

        expect(screen.getByText("没有找到这个练习题库")).toBeInTheDocument()
        expect(screen.getByRole("link", {name: "返回练习页"})).toHaveAttribute("href", "/practice")
    })

    it("warns that unfinished answers are lost before leaving practice", () => {
        renderApp(["/practice/session/basic/react"])

        fireEvent.click(screen.getByRole("button", {name: "返回练习页"}))
        expect(screen.getByRole("dialog", {name: "确定退出练习？"}))
            .toHaveTextContent("尚未提交的答案不会生成练习记录")
        fireEvent.click(screen.getByRole("button", {name: "继续练习"}))
        expect(screen.queryByRole("dialog", {name: "确定退出练习？"})).not.toBeInTheDocument()
    })

    it("saves already submitted questions when leaving a group early", () => {
        renderApp(["/practice/session/basic/react"])

        fireEvent.change(screen.getByRole("textbox", {name: "我的回答"}), {
            target: {value: "解释 React 状态更新"},
        })
        fireEvent.click(screen.getByRole("button", {name: "提交本题"}))
        fireEvent.click(screen.getByRole("button", {name: "返回练习页"}))
        fireEvent.click(screen.getByRole("button", {name: "保存并返回练习页"}))

        expect(screen.getByRole("heading", {name: "今天想练什么？"})).toBeInTheDocument()
        expect(sessionStorage.getItem("studymate-practice-records")).toContain("解释 React 状态更新")
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
