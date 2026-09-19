import {cn} from "@/lib/utils"

function pageSidebarItemClassName(active: boolean) {
    return cn(
        "flex h-12 shrink-0 items-center gap-3 rounded-xl px-4 text-sm font-medium transition-colors",
        active
            ? "bg-gradient-to-r from-[#fff0e4] to-[#fff8f1] text-primary"
            : "text-foreground/70 hover:bg-card/80 hover:text-primary",
    )
}

const sidebarPageContentClassName = "min-w-0 flex-1 xl:min-h-0 xl:overflow-y-auto"

export {pageSidebarItemClassName, sidebarPageContentClassName}
