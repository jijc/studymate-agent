import type {ComponentProps} from "react"

import {cn} from "@/lib/utils"

function StickyHeader({children, className, ...props}: ComponentProps<"header">) {
    return (
        <header
            className={cn(
                "sticky top-0 z-30 h-[66px] bg-card/75 backdrop-blur-sm",
                className,
            )}
            {...props}
        >
            {children}
        </header>
    )
}

export {StickyHeader}
