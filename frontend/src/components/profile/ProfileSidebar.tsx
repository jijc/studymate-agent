import {BellRing, ShieldCheck, Target, UserRound} from "lucide-react"
import {NavLink} from "react-router"

import {PageSidebar} from "@/components/layout/PageSidebar"
import {pageSidebarItemClassName} from "@/components/layout/pageSidebarStyles"

const navigationItems = [
    {label: "个人资料", to: "/profile", end: true, icon: UserRound},
    {label: "求职画像", to: "/profile/career", icon: Target},
    {label: "账号与安全", to: "/profile/security", icon: ShieldCheck},
    {label: "通知设置", to: "/profile/notifications", icon: BellRing},
]

function ProfileSidebar() {
    return (
        <PageSidebar ariaLabel="个人中心导航">
            {navigationItems.map((item) => {
                const Icon = item.icon

                return (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        className={({isActive}) => pageSidebarItemClassName(isActive)}
                    >
                        <Icon aria-hidden="true" className="size-5"/>
                        {item.label}
                    </NavLink>
                )
            })}
        </PageSidebar>
    )
}

export {ProfileSidebar}
