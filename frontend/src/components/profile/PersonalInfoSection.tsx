import {Avatar} from "@base-ui/react/avatar"
import {Camera, UserRound} from "lucide-react"

import avatarImage from "@/assets/image/user-avatar.png"
import {ProfileSectionCard} from "@/components/profile/ProfileSectionCard"
import {Button} from "@/components/ui/button"

function PersonalInfoSection() {
    return (
        <ProfileSectionCard
            id="personal-info"
            title="个人资料"
            description="这些信息会展示在网站 Header 和你的学习档案中。"
            icon={UserRound}
        >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <Avatar.Root className="relative flex size-24 shrink-0 overflow-hidden rounded-full border-4 border-[#ffdfc7] bg-secondary shadow-sm">
                    <Avatar.Image src={avatarImage} alt="学习者头像" className="size-full object-cover"/>
                    <Avatar.Fallback className="grid size-full place-items-center text-2xl font-semibold text-primary">学</Avatar.Fallback>
                </Avatar.Root>

                <div>
                    <Button type="button" variant="outline">
                        <Camera aria-hidden="true" data-icon="inline-start"/>
                        更换头像
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground">支持 JPG、PNG、WebP，建议使用正方形图片</p>
                </div>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-foreground">
                    昵称
                    <input
                        type="text"
                        defaultValue="学习者"
                        className="h-12 rounded-xl border border-input bg-card px-4 text-base outline-none transition focus:border-ring focus:ring-3 focus:ring-ring/20"
                    />
                </label>
                <div className="grid gap-2 text-sm font-medium text-foreground">
                    注册手机号
                    <div className="flex h-12 items-center rounded-xl border border-border/55 bg-muted/55 px-4 text-base text-muted-foreground">
                        138****8000
                    </div>
                </div>
            </div>

            <div className="mt-7 flex justify-end">
                <Button type="button" className="min-w-28">保存修改</Button>
            </div>
        </ProfileSectionCard>
    )
}

export {PersonalInfoSection}
