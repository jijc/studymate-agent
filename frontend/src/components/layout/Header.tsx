import {useState} from "react"
import {Menu, X} from "lucide-react"
import {Link, useLocation} from "react-router"
import logo from "@/assets/image/logo-trimmed.png"
import {StickyHeader} from "@/components/layout/StickyHeader"
import {UserMenu} from "@/components/layout/UserMenu"
import {NotificationBell} from "@/components/notifications/NotificationBell"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"

const navItems = [
    {label: "首页", to: "/"},
    {label: "练习", to: "/practice"},
    {label: "题库", to: "/questions/ai"},
    {label: "报告", to: "/reports"},
]

type HeaderProps = {
    variant?: "guest" | "authenticated"
}

function Header({variant = "guest"}: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false)
    const {pathname} = useLocation()
    const authenticated = variant === "authenticated"
    const isNavigationItemActive = (to: string) => {
        if (to === "/") return pathname === "/"
        if (to === "/questions/ai") return pathname.startsWith("/questions")
        return pathname === to || pathname.startsWith(`${to}/`)
    }

    return (
        <StickyHeader id="top">
            <>
                <div
                    data-slot="header-content"
                    className="mx-auto flex h-full w-full max-w-[1480px] items-center px-5 sm:px-8 xl:px-8"
                >
                        <Link
                            to="/"
                            className="flex shrink-0 items-center"
                            aria-label="StudyMate 首页"
                        >
                            <img
                                src={logo}
                                alt="StudyMate"
                                className="h-10 w-auto select-none max-[360px]:h-9"
                            />
                        </Link>

                        <nav aria-label="主导航" className="ml-16 hidden h-full items-center gap-14 xl:flex">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.to}
                                    aria-current={isNavigationItemActive(item.to) ? "page" : undefined}
                                    className={cn(
                                        "relative flex h-full items-center px-1 text-base font-medium transition-colors duration-400",
                                        isNavigationItemActive(item.to)
                                            ? "text-primary"
                                            : "text-foreground/75 hover:text-primary",
                                    )}
                                >
                                    {item.label}

                                    {isNavigationItemActive(item.to) && (
                                        <span
                                            className="absolute bottom-3 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-primary"/>
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {authenticated ? (
                            <div className="ml-auto hidden items-center gap-6 xl:flex">
                                <NotificationBell/>
                                <span className="h-8 w-px bg-border" aria-hidden="true"/>
                                <UserMenu/>
                            </div>
                        ) : (
                            <div className="ml-auto hidden items-center xl:flex">
                                <Button
                                    render={<Link to="/login"/>}
                                    nativeButton={false}
                                    size="lg"
                                    className="min-w-32 font-semibold"
                                >
                                    登录
                                </Button>

                                <div className="mx-8 h-10 w-px bg-border" aria-hidden="true"/>

                                <p className="text-sm leading-5 text-muted-foreground">
                                    AI 陪伴学习，
                                    <br/>
                                    成长更有方向
                                </p>
                            </div>
                        )}

                        <div className="ml-auto flex items-center gap-2 xl:hidden">
                            {authenticated ? (
                                <>
                                    <NotificationBell/>
                                    <UserMenu compact/>
                                </>
                            ) : (
                                <Button render={<Link to="/login"/>} nativeButton={false} className="font-semibold">
                                    登录
                                </Button>
                            )}
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
                                aria-expanded={menuOpen}
                                aria-controls="mobile-navigation"
                                onClick={() => setMenuOpen((open) => !open)}
                                className="text-foreground"
                            >
                                {menuOpen ? <X aria-hidden="true" className="size-5"/> :
                                    <Menu aria-hidden="true" className="size-5"/>}
                            </Button>
                        </div>
                </div>

                {menuOpen && (
                    <nav
                        id="mobile-navigation"
                        aria-label="移动端导航"
                        className="absolute inset-x-0 top-full border-y border-border/60 bg-card/70 px-5 py-3 shadow-soft backdrop-blur-sm xl:hidden"
                    >
                        <div className="mx-auto grid max-w-[1480px] gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.to}
                                    onClick={() => setMenuOpen(false)}
                                    aria-current={isNavigationItemActive(item.to) ? "page" : undefined}
                                    className={cn(
                                        "rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-400",
                                        isNavigationItemActive(item.to)
                                            ? "bg-secondary text-primary"
                                            : "text-foreground/80 hover:bg-muted hover:text-primary",
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </nav>
                )}
            </>
        </StickyHeader>
    )
}

export {Header}
