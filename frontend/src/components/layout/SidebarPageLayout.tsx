import type {ReactNode} from "react"

import {cn} from "@/lib/utils"

type SidebarPageLayoutProps = {
    children: ReactNode
    className?: string
}

function SidebarPageLayout({children, className}: SidebarPageLayoutProps) {
    return (
        <div
            data-slot="sidebar-page-layout"
            className={cn(
                "mx-auto flex w-full max-w-[1480px] flex-col xl:h-[calc(100dvh-66px)] xl:flex-row xl:overflow-hidden",
                className,
            )}
        >
            {children}
        </div>
    )
}

export {SidebarPageLayout}
