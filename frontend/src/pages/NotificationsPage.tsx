import {useState} from "react"
import {Bell, CheckCheck, Settings2} from "lucide-react"
import {Link} from "react-router"

import {NotificationRow} from "@/components/notifications/NotificationRow"
import {useNotifications} from "@/components/notifications/NotificationsContext"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"

type Filter = "all" | "unread"

function NotificationsPage() {
    const [filter, setFilter] = useState<Filter>("all")
    const {notifications, unreadCount, markRead, markAllRead} = useNotifications()
    const visibleNotifications = filter === "unread" ? notifications.filter((item) => !item.read) : notifications

    return (
        <main className="min-h-[calc(100dvh-66px)] px-5 pb-12 pt-7 sm:px-8">
            <div className="mx-auto w-full max-w-[1480px]">
                <div className="mx-auto max-w-[940px]">
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/55 pb-6">
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">通知</h1>
                                {unreadCount > 0 && (
                                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-primary">
                                        {unreadCount} 条未读
                                    </span>
                                )}
                            </div>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">题库生成与练习反馈有了新进展，就来这里看看。</p>
                        </div>
                        <Link
                            to="/profile/notifications"
                            className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/20"
                        >
                            <Settings2 aria-hidden="true" className="size-4"/>
                            通知设置
                        </Link>
                    </div>

                    <section aria-label="通知列表" className="mt-6 overflow-hidden rounded-2xl border border-border/75 bg-card shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/65 px-5 py-4 sm:px-6">
                            <div role="group" aria-label="筛选通知" className="inline-flex rounded-lg bg-muted/70 p-1">
                                {(["all", "unread"] as const).map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        aria-pressed={filter === value}
                                        onClick={() => setFilter(value)}
                                        className={cn(
                                            "rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/20",
                                            filter === value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                                        )}
                                    >
                                        {value === "all" ? "全部" : "未读"}
                                    </button>
                                ))}
                            </div>
                            <Button variant="ghost" size="sm" onClick={markAllRead} disabled={unreadCount === 0}>
                                <CheckCheck aria-hidden="true" className="size-4"/>
                                全部标为已读
                            </Button>
                        </div>

                        {visibleNotifications.length > 0 ? (
                            <div className="divide-y divide-border/60">
                                {visibleNotifications.map((item) => (
                                    <NotificationRow key={item.id} item={item} onOpen={markRead}/>
                                ))}
                            </div>
                        ) : (
                            <div className="px-6 py-14 text-center">
                                <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-secondary text-primary">
                                    <Bell aria-hidden="true" className="size-5"/>
                                </span>
                                <h2 className="mt-4 font-semibold">{filter === "unread" ? "暂无未读通知" : "暂无通知"}</h2>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {filter === "unread" ? "新进展到来时会显示在这里。" : "去练习一组题目，看看下一步值得加强的知识点。"}
                                </p>
                                {filter === "all" && (
                                    <Button render={<Link to="/practice"/>} nativeButton={false} size="sm" className="mt-5">去练习</Button>
                                )}
                            </div>
                        )}
                    </section>

                    <p className="mt-4 text-xs text-muted-foreground/80">当前展示的是静态示例通知，暂未接入实时发送与跨刷新保存。</p>
                </div>
            </div>
        </main>
    )
}

export {NotificationsPage}
