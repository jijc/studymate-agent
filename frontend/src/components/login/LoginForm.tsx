import {useState} from "react"
import {KeyRound, ShieldCheck, Smartphone} from "lucide-react"

import {AuthField} from "@/components/login/AuthField"
import {VerificationCodeButton} from "@/components/login/VerificationCodeButton"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"

type LoginMethod = "verification" | "password"

type LoginErrors = Partial<Record<"phone" | "code" | "password" | "agreement", string>>

function LoginForm() {
    const [method, setMethod] = useState<LoginMethod>("verification")
    const [phone, setPhone] = useState("")
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")
    const [agreed, setAgreed] = useState(false)
    const [errors, setErrors] = useState<LoginErrors>({})

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        // 第一版不连接后端，先阻止浏览器刷新页面。
        event.preventDefault()

        const nextErrors: LoginErrors = {}

        if (!/^1[3-9]\d{9}$/.test(phone)) nextErrors.phone = "请输入正确的手机号"

        if (method === "verification") {
            if (!/^\d{6}$/.test(code)) nextErrors.code = "请输入 6 位验证码"
        } else {
            if (!password) nextErrors.password = "请输入密码"
        }

        if (!agreed) nextErrors.agreement = "请先同意用户协议和隐私政策"
        setErrors(nextErrors)
    }

    return (
        <form className="mt-8" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1" role="tablist" aria-label="登录方式">
                <Button
                    type="button"
                    role="tab"
                    aria-selected={method === "verification"}
                    variant="ghost"
                    size="lg"
                    onClick={() => {
                        setMethod("verification")
                        setErrors({})
                    }}
                    className={cn("w-full", method === "verification" && "bg-card text-primary shadow-sm hover:bg-card")}
                >
                    验证码登录
                </Button>
                <Button
                    type="button"
                    role="tab"
                    aria-selected={method === "password"}
                    variant="ghost"
                    size="lg"
                    onClick={() => {
                        setMethod("password")
                        setErrors({})
                    }}
                    className={cn("w-full", method === "password" && "bg-card text-primary shadow-sm hover:bg-card")}
                >
                    密码登录
                </Button>
            </div>

            <div className="mt-6 grid gap-4">
                <AuthField
                    id="login-phone"
                    label="手机号"
                    icon={Smartphone}
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={11}
                    placeholder="请输入手机号"
                    value={phone}
                    onChange={(event) => {
                        setPhone(event.target.value)
                        setErrors((current) => ({...current, phone: undefined}))
                    }}
                    error={errors.phone}
                />

                {method === "verification" ? (
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                        <AuthField
                            id="login-code"
                            label="验证码"
                            icon={ShieldCheck}
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            maxLength={6}
                            placeholder="请输入验证码"
                            value={code}
                            onChange={(event) => {
                                setCode(event.target.value)
                                setErrors((current) => ({...current, code: undefined}))
                            }}
                            error={errors.code}
                        />
                        <VerificationCodeButton disabled={!/^1[3-9]\d{9}$/.test(phone)}/>
                    </div>
                ) : (
                    <>
                        <AuthField
                            id="login-password"
                            label="登录密码"
                            icon={KeyRound}
                            type="password"
                            autoComplete="current-password"
                            placeholder="请输入密码"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value)
                                setErrors((current) => ({...current, password: undefined}))
                            }}
                            error={errors.password}
                        />
                        <Button type="button" variant="link" className="h-auto justify-self-end px-0 text-sm">
                            忘记密码？
                        </Button>
                    </>
                )}
            </div>

            <label className="mt-5 flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                <input
                    type="checkbox"
                    checked={agreed}
                    aria-invalid={Boolean(errors.agreement)}
                    aria-describedby={errors.agreement ? "login-agreement-error" : undefined}
                    onChange={(event) => {
                        setAgreed(event.target.checked)
                        setErrors((current) => ({...current, agreement: undefined}))
                    }}
                    className="mt-1 size-4 rounded-md border-input accent-primary"
                />
                <span>我已阅读并同意《用户协议》和《隐私政策》</span>
            </label>

            {errors.agreement && (
                <p id="login-agreement-error" className="mt-1.5 text-sm text-destructive">
                    {errors.agreement}
                </p>
            )}

            <Button type="submit" size="xl" className="mt-6 w-full font-semibold">
                登录
            </Button>

            {method === "verification" && (
                <p className="mt-5 text-center text-sm text-muted-foreground">
                    未注册手机号验证后将自动创建账号
                </p>
            )}
        </form>
    )
}

export {LoginForm}
