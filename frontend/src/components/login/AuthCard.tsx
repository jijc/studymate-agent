import {useEffect, useState} from "react"

import logo from "@/assets/image/logo-trimmed.png"
import {LoginForm} from "@/components/login/LoginForm"
import {RegisterForm} from "@/components/login/RegisterForm"
import {cn} from "@/lib/utils"

type AuthMode = "login" | "register"

function AuthCard() {
    // mode 是当前真正渲染的表单；nextMode 有值时，表示正在等待切换。
    const [mode, setMode] = useState<AuthMode>("login")
    const [nextMode, setNextMode] = useState<AuthMode | null>(null)

    useEffect(() => {
        if (!nextMode) return

        // 先给当前内容 220ms 淡出，再替换成另一张表单，避免两个表单交叉叠加。
        const timerId = window.setTimeout(() => {
            setMode(nextMode)
            setNextMode(null)
        }, 220)

        return () => window.clearTimeout(timerId)
    }, [nextMode])

    function switchMode(targetMode: AuthMode) {
        if (targetMode === mode || nextMode) return
        setNextMode(targetMode)
    }

    return (
        <section
            className="mx-auto w-full max-w-xl overflow-hidden rounded-lg border border-border bg-card/90 p-8 shadow-soft backdrop-blur-sm lg:justify-self-end sm:p-12">
            <div
                data-testid={`${mode}-panel`}
                aria-busy={Boolean(nextMode)}
                className={cn(
                    "min-h-144 transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
                    nextMode
                        ? "pointer-events-none translate-y-2 opacity-0"
                        : "translate-y-0 opacity-100",
                )}
            >
                {mode === "login" ? (
                    <>
                        <div className="text-center">
                            <img src={logo} alt="" className="mx-auto mb-6 h-10 w-auto select-none"/>
                            <h2 className="font-heading text-3xl font-bold text-foreground">登录你的账号</h2>
                            <p className="mt-2 text-base text-muted-foreground">开启高效的面试练习</p>
                        </div>

                        <LoginForm onShowRegister={() => switchMode("register")}/>
                    </>
                ) : (
                    <>
                        <div className="text-center">
                            <img src={logo} alt="" className="mx-auto mb-6 h-10 w-auto select-none"/>
                            <h2 className="font-heading text-3xl font-bold text-foreground">创建你的账号</h2>
                            <p className="mt-2 text-base text-muted-foreground">准备好，开启你的面试成长之旅</p>
                        </div>

                        <RegisterForm onShowLogin={() => switchMode("login")}/>
                    </>
                )}
            </div>
        </section>
    )
}

export {AuthCard}
