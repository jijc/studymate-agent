import "@testing-library/jest-dom/vitest"

import {act, cleanup, fireEvent, render, screen, within} from "@testing-library/react"
import {MemoryRouter} from "react-router"
import {afterEach, describe, expect, it, vi} from "vitest"

import App from "./App"

afterEach(() => {
    cleanup()
    vi.useRealTimers()
})

function renderApp(initialEntries = ["/"]) {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <App/>
        </MemoryRouter>,
    )
}

describe("StudyMate home page", () => {
    it("renders the complete home page journey", () => {
        renderApp()

        expect(screen.getByRole("heading", {name: "让 AI 成为你的面试陪练"})).toBeInTheDocument()
        expect(screen.getByRole("region", {name: "核心能力"})).toBeInTheDocument()
        expect(screen.getByRole("heading", {name: "只需 3 步，开启高效面试练习"})).toBeInTheDocument()
        expect(screen.getAllByText("个性化面试题目").length).toBeGreaterThan(0)
        expect(screen.getByText("贴合岗位要求")).toBeInTheDocument()
        expect(screen.getByText("弱项分析与建议")).toBeInTheDocument()
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
        expect(header).toHaveClass("h-20", "bg-card/70")
        expect(header.parentElement).toHaveClass("home-background")
        expect(header).toHaveTextContent("AI 陪伴学习，成长更有方向")
        expect(screen.queryByRole("button", {name: /搜索/})).not.toBeInTheDocument()
    })

    it("uses the shared primary treatment for text actions", () => {
        renderApp()

        const actionLabels = ["开始练习", "上传简历", "登录"]

        actionLabels.forEach((label) => {
            const action = screen.getAllByText(label)[0].closest('[data-slot="button"]')

            expect(action).toHaveClass("bg-primary", "rounded-lg", "duration-400", "shadow-sm")
            expect(action).not.toHaveClass("shadow-press", "translate-y-1")
        })
    })

    it("keeps regular pages on the standard background", () => {
        renderApp(["/practice"])

        expect(screen.getByRole("heading", {name: "练习"})).toBeInTheDocument()
        const layout = screen.getByRole("banner").parentElement
        expect(layout).toHaveClass("bg-background")
        expect(layout).not.toHaveClass("home-background")
    })

    it("renders the dedicated login page without the main navigation or social login", () => {
        renderApp(["/login"])

        const header = screen.getByRole("banner")

        expect(within(header).getByRole("link", {name: "返回 StudyMate 首页"})).toBeInTheDocument()
        expect(screen.getByTestId("login-page")).toHaveClass("home-background", "min-h-screen")
        expect(screen.getByRole("heading", {name: "开始你的下一场面试练习"})).toBeInTheDocument()
        expect(screen.getByRole("heading", {name: "登录你的账号"})).toBeInTheDocument()
        expect(screen.queryByRole("navigation", {name: "主导航"})).not.toBeInTheDocument()
        expect(screen.queryByText("微信登录")).not.toBeInTheDocument()
        expect(screen.queryByText("GitHub 登录")).not.toBeInTheDocument()
    })

    it("switches between phone and email login fields", () => {
        renderApp(["/login"])

        const phoneTab = screen.getByRole("tab", {name: "手机号登录"})
        const emailTab = screen.getByRole("tab", {name: "邮箱登录"})

        expect(phoneTab).toHaveAttribute("aria-selected", "true")
        expect(screen.getByLabelText("手机号")).toBeInTheDocument()
        expect(screen.getByLabelText("验证码")).toBeInTheDocument()

        fireEvent.click(emailTab)

        expect(emailTab).toHaveAttribute("aria-selected", "true")
        expect(screen.getByLabelText("邮箱地址")).toBeInTheDocument()
        expect(screen.getByLabelText("密码")).toBeInTheDocument()
        expect(screen.queryByLabelText("手机号")).not.toBeInTheDocument()
    })

    it("switches between the login and registration cards", () => {
        vi.useFakeTimers()
        renderApp(["/login"])

        expect(screen.queryByTestId("register-panel")).not.toBeInTheDocument()
        fireEvent.click(screen.getByRole("button", {name: "立即注册"}))
        expect(screen.getByTestId("login-panel")).toHaveClass("opacity-0")
        expect(screen.queryByTestId("register-panel")).not.toBeInTheDocument()

        act(() => vi.advanceTimersByTime(220))

        const registerPanel = screen.getByTestId("register-panel")
        expect(screen.queryByTestId("login-panel")).not.toBeInTheDocument()
        expect(within(registerPanel).getByRole("heading", {name: "创建你的账号"})).toBeInTheDocument()
        expect(within(registerPanel).getByLabelText("注册手机号")).toBeInTheDocument()
        expect(within(registerPanel).getByLabelText("注册验证码")).toBeInTheDocument()
        expect(within(registerPanel).getByLabelText("设置密码")).toBeInTheDocument()
        expect(within(registerPanel).getByLabelText("确认密码")).toBeInTheDocument()

        fireEvent.click(within(registerPanel).getByRole("button", {name: "返回登录"}))
        act(() => vi.advanceTimersByTime(220))

        expect(screen.getByTestId("login-panel")).toBeInTheDocument()
        expect(screen.queryByTestId("register-panel")).not.toBeInTheDocument()
    })

    it("validates matching passwords before registration", () => {
        vi.useFakeTimers()
        renderApp(["/login"])
        fireEvent.click(screen.getByRole("button", {name: "立即注册"}))
        act(() => vi.advanceTimersByTime(220))

        const registerPanel = screen.getByTestId("register-panel")
        fireEvent.change(within(registerPanel).getByLabelText("注册手机号"), {target: {value: "13800138000"}})
        fireEvent.change(within(registerPanel).getByLabelText("注册验证码"), {target: {value: "123456"}})
        fireEvent.change(within(registerPanel).getByLabelText("设置密码"), {target: {value: "studyMate123"}})
        fireEvent.change(within(registerPanel).getByLabelText("确认密码"), {target: {value: "studyMate456"}})
        fireEvent.click(within(registerPanel).getByRole("checkbox"))
        fireEvent.click(within(registerPanel).getByRole("button", {name: "注册并开始学习"}))

        expect(within(registerPanel).getByText("两次输入的密码不一致")).toBeInTheDocument()
    })

    it("requires complete registration information and agreement", () => {
        vi.useFakeTimers()
        renderApp(["/login"])
        fireEvent.click(screen.getByRole("button", {name: "立即注册"}))
        act(() => vi.advanceTimersByTime(220))

        const registerPanel = screen.getByTestId("register-panel")
        fireEvent.click(within(registerPanel).getByRole("button", {name: "注册并开始学习"}))

        expect(within(registerPanel).getByText("请输入正确的手机号")).toBeInTheDocument()
        expect(within(registerPanel).getByText("请输入 6 位验证码")).toBeInTheDocument()
        expect(within(registerPanel).getByText("密码至少需要 8 位")).toBeInTheDocument()
        expect(within(registerPanel).getByText("请再次输入密码")).toBeInTheDocument()
        expect(within(registerPanel).getByText("请先同意用户协议和隐私政策")).toBeInTheDocument()
    })

    it("validates the active login method before submission", () => {
        renderApp(["/login"])

        const loginPanel = screen.getByTestId("login-panel")
        fireEvent.click(within(loginPanel).getByRole("button", {name: "登录"}))

        expect(within(loginPanel).getByText("请输入正确的手机号")).toBeInTheDocument()
        expect(within(loginPanel).getByText("请输入 6 位验证码")).toBeInTheDocument()
        expect(within(loginPanel).getByText("请先同意用户协议和隐私政策")).toBeInTheDocument()

        fireEvent.click(within(loginPanel).getByRole("tab", {name: "邮箱登录"}))
        fireEvent.click(within(loginPanel).getByRole("button", {name: "登录"}))

        expect(within(loginPanel).getByText("请输入正确的邮箱地址")).toBeInTheDocument()
        expect(within(loginPanel).getByText("请输入密码")).toBeInTheDocument()
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
