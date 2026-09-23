import {useState, type ReactNode} from "react"

import {NotificationsContext} from "@/components/notifications/NotificationsContext"
import {exampleNotifications} from "@/data/notifications"

function NotificationsProvider({children}: {children: ReactNode}) {
    const [notifications, setNotifications] = useState(exampleNotifications)
    const unreadCount = notifications.filter((item) => !item.read).length

    const markRead = (id: string) => {
        setNotifications((items) => items.map((item) => item.id === id ? {...item, read: true} : item))
    }

    const markAllRead = () => {
        setNotifications((items) => items.map((item) => item.read ? item : {...item, read: true}))
    }

    return (
        <NotificationsContext.Provider value={{notifications, unreadCount, markRead, markAllRead}}>
            {children}
        </NotificationsContext.Provider>
    )
}

export {NotificationsProvider}
