import {useLocation} from "react-router"

import {SidebarPageLayout} from "@/components/layout/SidebarPageLayout"
import {sidebarPageContentClassName} from "@/components/layout/pageSidebarStyles"
import {CareerProfileSection} from "@/components/profile/CareerProfileSection"
import {NotificationSettingsSection} from "@/components/profile/NotificationSettingsSection"
import {PersonalInfoSection} from "@/components/profile/PersonalInfoSection"
import {ProfileSidebar} from "@/components/profile/ProfileSidebar"
import {SecuritySection} from "@/components/profile/SecuritySection"
import {cn} from "@/lib/utils"

function ProfilePage() {
    const {pathname} = useLocation()

    const section = pathname.endsWith("/career")
        ? <CareerProfileSection/>
        : pathname.endsWith("/security")
            ? <SecuritySection/>
            : pathname.endsWith("/notifications")
                ? <NotificationSettingsSection/>
                : <PersonalInfoSection/>

    return (
        <div className="min-h-[calc(100dvh-66px)]">
            <SidebarPageLayout>
                <ProfileSidebar/>

                <main className={cn(sidebarPageContentClassName, "px-5 pb-12 pt-7 sm:px-8 xl:px-10")}>
                    <div className="mb-6">
                        <p className="text-sm font-medium text-primary">账号与成长画像</p>
                        <h1 className="mt-1 text-3xl font-semibold tracking-[-0.03em] text-foreground">个人中心</h1>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
                            管理你的基本资料和求职目标，让后续的 AI 面试练习更贴近真实需求。
                        </p>
                    </div>

                    {section}
                </main>
            </SidebarPageLayout>
        </div>
    )
}

export {ProfilePage}
