import {ArrowRight, Library, Sparkles} from "lucide-react"
import {Link, useLocation} from "react-router"

import {PageSidebar} from "@/components/layout/PageSidebar"
import {pageSidebarItemClassName} from "@/components/layout/pageSidebarStyles"

const sidebarItems = [
    {label: "AI 题库", href: "/questions/ai", icon: Sparkles},
    {label: "站内题库", href: "/questions", icon: Library},
]

function QuestionSidebar() {
    const {pathname} = useLocation()

    return (
        <PageSidebar
            ariaLabel="题库侧边导航"
            footer={(
                <Link
                    to="/practice"
                    className="block rounded-2xl border border-border/55 bg-card/80 p-4 shadow-[0_12px_34px_rgb(111_68_40/7%)] transition hover:-translate-y-0.5 hover:border-primary/25"
                >
                    <span className="mb-2 grid size-8 place-items-center rounded-full bg-[#fff0d8] text-[#f7a61f]">
                        <Sparkles aria-hidden="true" className="size-4"/>
                    </span>
                    <span className="flex items-center justify-between font-medium">
                        去练习
                        <ArrowRight aria-hidden="true" className="size-5"/>
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">练习结果会完善专属题库</span>
                </Link>
            )}
        >
            {sidebarItems.map((item) => {
                const Icon = item.icon

                const active = item.href === "/questions/ai"
                    ? pathname === "/questions/ai"
                    : pathname !== "/questions/ai"

                return (
                    <Link
                        key={item.label}
                        to={item.href}
                        className={pageSidebarItemClassName(active)}
                    >
                        <Icon aria-hidden="true" className="size-5"/>
                        {item.label}
                    </Link>
                )
            })}
        </PageSidebar>
    )
}

export {QuestionSidebar}
