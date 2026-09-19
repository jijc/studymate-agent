import {Outlet, useLocation} from "react-router"

import {Header} from "@/components/layout/Header"
import {cn} from "@/lib/utils"

function MainLayout() {
    const {pathname} = useLocation()
    const authenticated = pathname === "/practice" || pathname.startsWith("/questions") || pathname === "/reports" || pathname.startsWith("/profile")
    const usesHomeBackground = pathname === "/" || pathname === "/reports" || pathname.startsWith("/profile")

    return (
        <div className={cn("min-h-screen", usesHomeBackground ? "home-background" : "bg-background")}>
            <Header variant={authenticated ? "authenticated" : "guest"}/>

            <Outlet/>
        </div>
    )
}

export {MainLayout}
