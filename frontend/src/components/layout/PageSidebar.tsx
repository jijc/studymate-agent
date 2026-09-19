import type {ReactNode} from "react"

type PageSidebarProps = {
    ariaLabel: string
    children: ReactNode
    footer?: ReactNode
}

function PageSidebar({ariaLabel, children, footer}: PageSidebarProps) {
    return (
        <aside
            data-slot="page-sidebar"
            className="flex w-full shrink-0 flex-col border-b border-border/45 bg-card/35 px-5 py-4 xl:h-full xl:w-60 xl:border-b-0 xl:border-r xl:py-7"
        >
            <nav aria-label={ariaLabel} className="flex gap-2 overflow-x-auto xl:grid xl:gap-1.5">
                {children}
            </nav>

            {footer && <div className="mt-auto hidden pt-6 xl:block">{footer}</div>}
        </aside>
    )
}

export {PageSidebar}
