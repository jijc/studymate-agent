import {BarChart3, LayoutDashboard, NotebookPen, TrendingUp} from "lucide-react"

import {PageSidebar} from "@/components/layout/PageSidebar"
import {pageSidebarItemClassName} from "@/components/layout/pageSidebarStyles"

const reportNavigation = [
    {label: "概览", href: "#overview", icon: LayoutDashboard, active: true},
    {label: "能力分析", href: "#ability-analysis", icon: BarChart3},
    {label: "薄弱点分析", href: "#weakness-analysis", icon: NotebookPen},
    {label: "成长趋势", href: "#progress-trend", icon: TrendingUp},
]

function ReportSidebar() {
    return (
        <PageSidebar ariaLabel="报告侧边导航">
            {reportNavigation.map((item) => {
                const Icon = item.icon

                return (
                    <a
                        key={item.label}
                        href={item.href}
                        className={pageSidebarItemClassName(Boolean(item.active))}
                    >
                        <Icon aria-hidden="true" className="size-5"/>
                        {item.label}
                    </a>
                )
            })}
        </PageSidebar>
    )
}

export {ReportSidebar}
