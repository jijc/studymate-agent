import {Bell} from "lucide-react"
import {Link} from "react-router"

import {useNotifications} from "@/components/notifications/NotificationsContext"

function NotificationBell() {
    const {unreadCount} = useNotifications()

    return (
        <Link
            to="/notifications"
            aria-label="查看通知"
            className="relative grid size-10 shrink-0 place-items-center rounded-full text-foreground/75 transition hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/20"
        >
            <Bell aria-hidden="true" className="size-5"/>
            {unreadCount > 0 && (
                <span
                    data-slot="notification-unread-dot"
                    className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-card"
                />
            )}
        </Link>
    )
}

export {NotificationBell}
