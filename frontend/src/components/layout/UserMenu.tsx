import {Avatar} from "@base-ui/react/avatar"
import {Menu} from "@base-ui/react/menu"
import {ChevronDown, LogOut, ShieldCheck, UserRound} from "lucide-react"
import {Link} from "react-router"

import avatarImage from "@/assets/image/user-avatar.png"
import {cn} from "@/lib/utils"

type UserMenuProps = {
    compact?: boolean
}

const menuItemClass = "flex cursor-default items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground outline-none transition-colors data-highlighted:bg-secondary data-highlighted:text-primary"

function UserAvatar({size = "default"}: {size?: "default" | "compact"}) {
    return (
        <Avatar.Root
            className={cn(
                "relative flex shrink-0 overflow-hidden rounded-full border-2 border-[#ffd9bd] bg-secondary",
                size === "compact" ? "size-9" : "size-10",
            )}
        >
            <Avatar.Image src={avatarImage} alt="学习者头像" className="size-full object-cover"/>
            <Avatar.Fallback className="grid size-full place-items-center text-sm font-semibold text-primary">
                学
            </Avatar.Fallback>
        </Avatar.Root>
    )
}

function UserMenu({compact = false}: UserMenuProps) {
    return (
        <Menu.Root>
            <Menu.Trigger
                aria-label={compact ? "打开移动端用户菜单" : "打开用户菜单"}
                className={cn(
                    "flex items-center rounded-xl outline-none transition hover:bg-muted focus-visible:ring-3 focus-visible:ring-primary/20 data-popup-open:bg-muted",
                    compact ? "p-0.5" : "gap-3 p-1.5",
                )}
            >
                <UserAvatar size={compact ? "compact" : "default"}/>
                {!compact && (
                    <>
                        <span className="font-medium">你好，学习者</span>
                        <ChevronDown aria-hidden="true" className="size-4 transition-transform group-data-popup-open:rotate-180"/>
                    </>
                )}
            </Menu.Trigger>

            <Menu.Portal>
                <Menu.Positioner sideOffset={10} align="end" className="z-50 outline-none">
                    <Menu.Popup
                        aria-label="用户菜单"
                        className="w-72 origin-[var(--transform-origin)] rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-[0_18px_48px_rgb(92_58_38/16%)] outline-none transition-[transform,opacity] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0"
                    >
                        <div className="flex items-center gap-3 px-3 py-3">
                            <UserAvatar/>
                            <div className="min-w-0">
                                <p className="truncate font-semibold">学习者</p>
                                <p className="mt-0.5 text-sm text-muted-foreground">138****8000</p>
                            </div>
                        </div>

                        <Menu.Separator className="my-1 h-px bg-border/70"/>

                        <Menu.LinkItem render={<Link to="/profile"/>} closeOnClick className={menuItemClass}>
                            <UserRound aria-hidden="true" className="size-4.5"/>
                            个人中心
                        </Menu.LinkItem>
                        <Menu.LinkItem render={<Link to="/profile/security"/>} closeOnClick className={menuItemClass}>
                            <ShieldCheck aria-hidden="true" className="size-4.5"/>
                            账号与安全
                        </Menu.LinkItem>

                        <Menu.Separator className="my-1 h-px bg-border/70"/>

                        <Menu.LinkItem
                            render={<Link to="/login"/>}
                            closeOnClick
                            className={`${menuItemClass} text-destructive data-highlighted:bg-destructive/10 data-highlighted:text-destructive`}
                        >
                            <LogOut aria-hidden="true" className="size-4.5"/>
                            退出登录
                        </Menu.LinkItem>
                    </Menu.Popup>
                </Menu.Positioner>
            </Menu.Portal>
        </Menu.Root>
    )
}

export {UserMenu}
