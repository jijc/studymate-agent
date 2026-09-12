import "@testing-library/jest-dom/vitest"

import {cleanup, fireEvent, render, screen, within} from "@testing-library/react"
import {MemoryRouter} from "react-router"
import {afterEach, describe, expect, it} from "vitest"

import App from "./App"

afterEach(cleanup)

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
        expect(header).toHaveClass("bg-card/70")
        expect(header.parentElement).toHaveClass("home-background")
    })

    it("keeps regular pages on the standard background", () => {
        renderApp(["/practice"])

        expect(screen.getByRole("heading", {name: "练习"})).toBeInTheDocument()
        const layout = screen.getByRole("banner").parentElement
        expect(layout).toHaveClass("bg-background")
        expect(layout).not.toHaveClass("home-background")
    })

    it("shows the background on login without rendering the header", () => {
        renderApp(["/login"])

        expect(screen.queryByRole("banner")).not.toBeInTheDocument()
        expect(screen.getByRole("main")).toHaveClass("home-background", "min-h-screen")
    })
})
