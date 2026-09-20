import type {ReactNode} from "react"

import {cn} from "@/lib/utils"

type SidebarPageLayoutProps = {
    children: ReactNode
    className?: string
    background?: "question-bank" | "plain"
}

function SidebarPageLayout({children, className, background = "question-bank"}: SidebarPageLayoutProps) {
    return (
        <div
            data-slot="sidebar-page-shell"
            className={cn(
                "h-[calc(100dvh-66px)] overflow-hidden",
                background === "question-bank" && "question-bank-background",
            )}
        >
            <div
                data-slot="sidebar-page-layout"
                className={cn(
                    "mx-auto flex h-full w-full max-w-[1480px] flex-col overflow-hidden xl:flex-row",
                    className,
                )}
            >
                {children}
            </div>
        </div>
    )
}

export {SidebarPageLayout}
