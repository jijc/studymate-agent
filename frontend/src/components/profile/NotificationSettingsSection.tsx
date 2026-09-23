import {Switch} from "@base-ui/react/switch"
import {BellRing} from "lucide-react"

import {ProfileSectionCard} from "@/components/profile/ProfileSectionCard"

const notificationItems = [
    {label: "每日练习提醒", description: "提醒你保持稳定的面试练习节奏", checked: true},
    {label: "薄弱点专项提醒", description: "当 AI 发现需要强化的知识点时提醒你", checked: true},
    {label: "周度学习报告", description: "每周汇总练习表现和能力变化", checked: false},
    {label: "系统通知", description: "账号安全和重要服务通知", checked: true, disabled: true},
]

function NotificationSettingsSection() {
    return (
        <ProfileSectionCard
            id="notification-settings"
            title="通知设置"
            description="以下为通知偏好展示，发送与保存功能尚未接入。"
            icon={BellRing}
        >
            <div className="divide-y divide-border/60">
                {notificationItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-5 py-5 first:pt-0 last:pb-0">
                        <div className="min-w-0 flex-1">
                            <h3 className="font-medium">{item.label}</h3>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch.Root
                            aria-label={item.label}
                            defaultChecked={item.checked}
                            disabled={item.disabled}
                            nativeButton
                            render={<button type="button"/>}
                            className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full bg-muted outline-none transition-colors data-checked:bg-primary focus-visible:ring-3 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-55"
                        >
                            <Switch.Thumb className="block size-5 translate-x-1 rounded-full bg-card shadow-sm transition-transform data-checked:translate-x-6"/>
                        </Switch.Root>
                    </div>
                ))}
            </div>

            <p className="mt-7 rounded-xl bg-muted/55 px-4 py-3 text-sm text-muted-foreground">
                每日提醒、周度报告及邮件通知尚未开放；绑定邮箱不会自动开启邮件提醒。
            </p>
        </ProfileSectionCard>
    )
}

export {NotificationSettingsSection}
