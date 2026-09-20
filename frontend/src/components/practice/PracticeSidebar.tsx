import {ArrowRight, History, PlayCircle, Sparkles} from "lucide-react"
import {Link, NavLink} from "react-router"

import {PageSidebar} from "@/components/layout/PageSidebar"
import {pageSidebarItemClassName} from "@/components/layout/pageSidebarStyles"

const practiceNavigation = [
    {label: "开始练习", href: "/practice", icon: PlayCircle, end: true},
    {label: "练习记录", href: "/practice/records", icon: History, end: false},
]

function PracticeSidebar() {
    return (
        <PageSidebar
            ariaLabel="练习侧边导航"
            footer={(
                <Link
                    to="/questions/ai"
                    className="block rounded-2xl border border-border/55 bg-card/80 p-4 shadow-[0_12px_34px_rgb(111_68_40/7%)] transition hover:-translate-y-0.5 hover:border-primary/25"
                >
                    <span className="mb-2 grid size-8 place-items-center rounded-full bg-[#fff0d8] text-[#f7a61f]">
                        <Sparkles aria-hidden="true" className="size-4"/>
                    </span>
                    <span className="flex items-center justify-between font-medium">
                        AI 题库
                        <ArrowRight aria-hidden="true" className="size-5"/>
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">管理简历和 JD 专项题库</span>
                </Link>
            )}
        >
            {practiceNavigation.map((item) => {
                const Icon = item.icon

                return (
                    <NavLink key={item.label} to={item.href} end={item.end} className={({isActive}) => pageSidebarItemClassName(isActive)}>
                        <Icon aria-hidden="true" className="size-5"/>
                        {item.label}
                    </NavLink>
                )
            })}
        </PageSidebar>
    )
}

export {PracticeSidebar}
