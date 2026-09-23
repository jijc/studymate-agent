import {createContext, useContext} from "react"

import {type NotificationItemData} from "@/data/notifications"

export type NotificationsContextValue = {
    notifications: NotificationItemData[]
    unreadCount: number
    markRead: (id: string) => void
    markAllRead: () => void
}

export const NotificationsContext = createContext<NotificationsContextValue | null>(null)

export function useNotifications() {
    const context = useContext(NotificationsContext)
    if (!context) throw new Error("通知组件需要放在 NotificationsProvider 内")
    return context
}
