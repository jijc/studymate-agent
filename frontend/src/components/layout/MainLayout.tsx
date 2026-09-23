import {useLayoutEffect} from "react"
import {Outlet, useLocation} from "react-router"

import {Header} from "@/components/layout/Header"
import {NotificationsProvider} from "@/components/notifications/NotificationsProvider"
import {QuestionLibraryFavoritesProvider} from "@/components/questions/QuestionLibraryFavoritesProvider"
import {cn} from "@/lib/utils"

function MainLayout() {
    const {pathname} = useLocation()
    const authenticated = pathname.startsWith("/practice") || pathname.startsWith("/interview") || pathname.startsWith("/questions") || pathname === "/reports" || pathname.startsWith("/profile") || pathname === "/notifications"
    const usesHomeBackground = pathname === "/" || pathname === "/reports" || pathname.startsWith("/profile") || pathname === "/notifications"
    const hasSidebar = ["/practice", "/practice/records", "/questions", "/questions/ai", "/profile"].includes(pathname)
        || pathname.startsWith("/profile/")

    useLayoutEffect(() => {
        if (hasSidebar || pathname.startsWith("/interview")) window.scrollTo(0, 0)
    }, [hasSidebar, pathname])

    return (
        <NotificationsProvider>
            <QuestionLibraryFavoritesProvider>
                <div className={cn("min-h-screen", usesHomeBackground ? "home-background" : "bg-background")}>
                    <Header variant={authenticated ? "authenticated" : "guest"}/>

                    <Outlet/>
                </div>
            </QuestionLibraryFavoritesProvider>
        </NotificationsProvider>
    )
}

export {MainLayout}
