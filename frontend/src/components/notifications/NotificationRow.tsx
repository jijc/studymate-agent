import {ArrowUpRight, BookOpenCheck, ClipboardCheck} from "lucide-react"
import {Link} from "react-router"

import {type NotificationItemData} from "@/data/notifications"
import {cn} from "@/lib/utils"

type NotificationRowProps = {
    item: NotificationItemData
    onOpen: (id: string) => void
}

function NotificationRow({item, onOpen}: NotificationRowProps) {
    const Icon = item.kind === "library" ? BookOpenCheck : ClipboardCheck

    return (
        <Link
            to={item.href}
            aria-label={item.action}
            onClick={() => onOpen(item.id)}
            className="block outline-none transition-colors hover:bg-secondary/20 focus-visible:bg-secondary/20 focus-visible:ring-3 focus-visible:ring-inset focus-visible:ring-primary/20"
        >
            <article className={cn("flex gap-4 px-5 py-5 sm:px-6", item.read ? "bg-card/40" : "bg-transparent")}>
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                    <Icon aria-hidden="true" className="size-5"/>
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h2 className={cn("text-sm sm:text-base", item.read ? "font-medium" : "font-semibold")}>{item.title}</h2>
                        {!item.read && <span className="size-1.5 rounded-full bg-primary" aria-label="未读"/>}
                        <time className="text-xs text-muted-foreground sm:ml-auto">{item.time}</time>
                    </div>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        {item.action}
                        <ArrowUpRight aria-hidden="true" className="size-4"/>
                    </span>
                </div>
            </article>
        </Link>
    )
}

export {NotificationRow}
