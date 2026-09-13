import {AuthCard} from "@/components/login/AuthCard"
import {LoginHeader} from "@/components/login/LoginHeader"
import {LoginIntro} from "@/components/login/LoginIntro"

function LoginPage() {
    return (
        <div data-testid="login-page" className="home-background min-h-screen">
            <LoginHeader/>

            <main
                className="mx-auto grid w-full max-w-[1480px] items-center justify-items-center gap-20 px-5 pb-12 pt-6 sm:px-8 lg:min-h-[calc(100dvh-5rem)] lg:grid-cols-2 lg:justify-items-stretch lg:px-12 lg:py-8 xl:px-6">
                <LoginIntro/>
                <AuthCard/>
            </main>
        </div>
    )
}

export {LoginPage}
