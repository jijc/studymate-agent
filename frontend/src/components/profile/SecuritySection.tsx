import {KeyRound, Laptop, Mail, ShieldCheck, Smartphone} from "lucide-react"

import {ProfileSectionCard} from "@/components/profile/ProfileSectionCard"
import {Button} from "@/components/ui/button"

const securityItems = [
    {label: "手机号", description: "138****8000", action: "更换手机号", icon: Smartphone},
    {label: "登录密码", description: "未设置，设置后可使用手机号密码登录", action: "设置密码", icon: KeyRound},
    {label: "邮箱", description: "未绑定，可用于账号找回和学习通知", action: "绑定邮箱", icon: Mail},
    {label: "登录设备", description: "当前设备 · macOS", action: "退出其他设备", icon: Laptop},
]

function SecuritySection() {
    return (
        <ProfileSectionCard
            id="account-security"
            title="账号与安全"
            description="管理登录凭证和账号找回方式。"
            icon={ShieldCheck}
        >
            <div className="divide-y divide-border/60">
                {securityItems.map((item) => {
                    const Icon = item.icon

                    return (
                        <div key={item.label} className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center">
                            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-foreground/70">
                                <Icon aria-hidden="true" className="size-5"/>
                            </span>
                            <div className="min-w-0 flex-1">
                                <h3 className="font-medium">{item.label}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <Button type="button" variant="outline" className="self-start sm:self-auto">
                                {item.action}
                            </Button>
                        </div>
                    )
                })}
            </div>

            <div className="mt-8 rounded-xl border border-destructive/20 bg-destructive/5 p-4 sm:flex sm:items-center sm:justify-between">
                <div>
                    <h3 className="font-medium text-destructive">注销账号</h3>
                    <p className="mt-1 text-sm text-muted-foreground">注销后将无法继续访问学习记录和报告。</p>
                </div>
                <Button type="button" variant="destructive" className="mt-4 sm:mt-0">申请注销</Button>
            </div>
        </ProfileSectionCard>
    )
}

export {SecuritySection}
