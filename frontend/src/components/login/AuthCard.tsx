import logo from "@/assets/image/logo-trimmed.png"
import {LoginForm} from "@/components/login/LoginForm"

function AuthCard() {
    return (
        <section
            className="mx-auto w-full max-w-xl overflow-hidden rounded-lg border border-border bg-card/90 p-8 shadow-soft backdrop-blur-sm lg:justify-self-end sm:p-12">
            <div
                data-testid="login-panel"
                className="min-h-144"
            >
                <div className="text-center">
                    <img src={logo} alt="" className="mx-auto mb-6 h-10 w-auto select-none"/>
                    <h2 className="font-heading text-3xl font-bold text-foreground">登录 StudyMate</h2>
                    <p className="mt-2 text-base text-muted-foreground">开启高效的面试练习</p>
                </div>

                <LoginForm/>
            </div>
        </section>
    )
}

export {AuthCard}
