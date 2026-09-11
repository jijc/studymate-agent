import {useState} from "react"
import {Menu, X} from "lucide-react"

import logo from "@/assets/image/logo.png"
import {Button} from "@/components/ui/button"

const navItems = [
    {label: "首页", href: "#top", active: true},
    {label: "练习", href: "#practice", active: false},
    {label: "题库", href: "#questions", active: false},
    {label: "报告", href: "#reports", active: false},
]

function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header id="top"
                className="relative z-30 h-16 border-b border-border/30 bg-card/95 backdrop-blur-sm xl:h-[70px]">
            <div className="mx-auto flex h-full w-full max-w-[1480px] items-center px-5 sm:px-8 xl:px-8">
                <a
                    href="#top"
                    className="relative h-11 w-[164px] shrink-0 overflow-hidden xl:h-[52px] xl:w-[192px]"
                    aria-label="StudyMate 首页"
                >
                    <img
                        src={logo}
                        alt="StudyMate"
                        className="absolute left-[-57px] top-[-24px] w-[278px] max-w-none select-none xl:left-[-67px] xl:top-[-28px] xl:w-[326px]"
                    />
                </a>

                <nav aria-label="主导航" className="ml-14 hidden h-full items-center gap-11 xl:flex">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            aria-current={item.active ? "page" : undefined}
                            className={[
                                "relative flex h-full items-center px-1 text-[16px] font-medium transition-colors duration-300",
                                item.active ? "text-primary" : "text-foreground/75 hover:text-primary",
                            ].join(" ")}
                        >
                            {item.label}
                            {item.active && (
                                <span
                                    className="absolute bottom-[14px] left-1/2 h-[3px] w-9 -translate-x-1/2 rounded-full bg-primary"/>
                            )}
                        </a>
                    ))}
                </nav>

                <div className="ml-auto hidden items-center xl:flex">
                    <Button
                        className="h-11 min-w-[106px] rounded-2xl px-6 text-[16px] font-semibold shadow-press hover:shadow-press-hover">
                        登录
                    </Button>
                </div>

                <div className="ml-auto flex items-center gap-2 xl:hidden">
                    <Button className="h-8 rounded-lg px-3 text-xs font-semibold">登录</Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="size-9 rounded-lg text-foreground"
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
                        {[...navItems, {label: "登录", href: "#login", active: false}].map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                aria-current={item.active ? "page" : undefined}
                                onClick={() => setMenuOpen(false)}
                                className={[
                                    "rounded-xl px-4 py-3 text-[15px] font-medium transition-colors",
                                    item.active ? "bg-secondary text-primary" : "text-foreground/80 hover:bg-muted hover:text-primary",
                                ].join(" ")}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    )
}

export {Header}
