import {Outlet, useLocation} from "react-router"

import {Header} from "@/components/layout/Header"
import {cn} from "@/lib/utils"

function MainLayout() {
    const {pathname} = useLocation()

    return (
        <div className={cn("min-h-screen", pathname === "/" ? "home-background" : "bg-background")}>
            <Header/>

            <Outlet/>
        </div>
    )
}

export {MainLayout}
