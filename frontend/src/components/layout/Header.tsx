import {useState} from "react"
import {Menu, X} from "lucide-react"
import {Link, NavLink, useNavigate} from "react-router"
import logo from "@/assets/image/logo-trimmed.png"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"

const navItems = [
    {label: "首页", to: "/"},
    {label: "练习", to: "/practice"},
    {label: "题库", to: "/questions"},
    {label: "报告", to: "/reports"},
]

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigation = useNavigate()

    return (
        <header id="top" className="relative z-30 h-16 border-b border-border/30 bg-card/95 backdrop-blur-sm">
            <div className="mx-auto flex h-full w-full max-w-[1480px] items-center px-5 sm:px-8 xl:px-8">
                <Link
                    to="/"
                    className="flex shrink-0 items-center"
                    aria-label="StudyMate 首页"
                >
                    <img
                        src={logo}
                        alt="StudyMate"
                        className="h-9 w-auto select-none xl:h-10"
                    />
                </Link>

                <nav aria-label="主导航" className="ml-14 hidden h-full items-center gap-11 xl:flex">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.to}
                            className={({isActive}) =>
                                cn(
                                    "relative flex h-full items-center px-1 text-base font-medium transition-colors duration-300",
                                    isActive
                                        ? "text-primary"
                                        : "text-foreground/75 hover:text-primary",
                                )
                            }
                        >
                            {({isActive}) => (
                                <>
                                    {item.label}

                                    {isActive && (
                                        <span
                                            className="absolute bottom-3.5 left-1/2 h-0.5 w-8 -translate-x-1/2 bg-primary"/>
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="ml-auto hidden items-center xl:flex">
                    <Button
                        render={<Link to="/login"/>}
                        nativeButton={false}
                        size="lg"
                        className="min-w-24 font-semibold"
                    >
                        登录
                    </Button>
                </div>

                <div className="ml-auto flex items-center gap-2 xl:hidden">
                    <Button render={<Link to="/login"/>} nativeButton={false} className="font-semibold">
                        登录
                    </Button>
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
                    className="absolute inset-x-0 top-full border-y border-border/60 bg-card px-5 py-3 shadow-soft xl:hidden"
                >
                    <div className="mx-auto grid max-w-[1480px] gap-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.label}
                                to={item.to}
                                onClick={() => setMenuOpen(false)}
                                className={({isActive}) =>
                                    cn(
                                        "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                                        isActive ? "bg-secondary text-primary" : "text-foreground/80 hover:bg-muted hover:text-primary",
                                    )
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    )
}

export {Header}
