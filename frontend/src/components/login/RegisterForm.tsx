import {useState} from "react"
import {KeyRound, ShieldCheck, Smartphone} from "lucide-react"

import {AuthField} from "@/components/login/AuthField"
import {VerificationCodeButton} from "@/components/login/VerificationCodeButton"
import {Button} from "@/components/ui/button"

type RegisterFormProps = {
    onShowLogin: () => void
}

type RegisterErrors = Partial<Record<"phone" | "code" | "password" | "confirmPassword" | "agreement", string>>

function RegisterForm({onShowLogin}: RegisterFormProps) {
    // 每个输入框分别保存状态，便于之后接入真实注册接口时直接复用。
    const [phone, setPhone] = useState("")
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [agreed, setAgreed] = useState(false)
    const [errors, setErrors] = useState<RegisterErrors>({})

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        // 当前只完成页面交互，因此提交时不发送网络请求。
        event.preventDefault()

        // 前端先完成最基础的格式检查，后续接接口时仍需由服务端再次校验。
        const nextErrors: RegisterErrors = {}

        if (!/^1[3-9]\d{9}$/.test(phone)) nextErrors.phone = "请输入正确的手机号"
        if (!/^\d{6}$/.test(code)) nextErrors.code = "请输入 6 位验证码"
        if (password.length < 8) nextErrors.password = "密码至少需要 8 位"
        if (!confirmPassword) {
            nextErrors.confirmPassword = "请再次输入密码"
        } else if (password !== confirmPassword) {
            nextErrors.confirmPassword = "两次输入的密码不一致"
        }
        if (!agreed) nextErrors.agreement = "请先同意用户协议和隐私政策"

        setErrors(nextErrors)
    }

    return (
        <form className="mt-8" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-4">
                <AuthField
                    id="register-phone"
                    label="注册手机号"
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

                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                    <AuthField
                        id="register-code"
                        label="注册验证码"
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

                <AuthField
                    id="register-password"
                    label="设置密码"
                    icon={KeyRound}
                    type="password"
                    autoComplete="new-password"
                    placeholder="请设置 8 位以上密码"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value)
                        setErrors((current) => ({...current, password: undefined}))
                    }}
                    error={errors.password}
                />
                <AuthField
                    id="register-confirm-password"
                    label="确认密码"
                    icon={KeyRound}
                    type="password"
                    autoComplete="new-password"
                    placeholder="请再次输入密码"
                    value={confirmPassword}
                    onChange={(event) => {
                        setConfirmPassword(event.target.value)
                        setErrors((current) => ({...current, confirmPassword: undefined}))
                    }}
                    error={errors.confirmPassword}
                />
            </div>

            <label className="mt-5 flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                <input
                    type="checkbox"
                    checked={agreed}
                    aria-invalid={Boolean(errors.agreement)}
                    aria-describedby={errors.agreement ? "register-agreement-error" : undefined}
                    onChange={(event) => {
                        setAgreed(event.target.checked)
                        setErrors((current) => ({...current, agreement: undefined}))
                    }}
                    className="mt-1 size-4 rounded-md border-input accent-primary"
                />
                <span>我已阅读并同意《用户协议》和《隐私政策》</span>
            </label>

            {errors.agreement && (
                <p id="register-agreement-error" className="mt-1.5 text-sm text-destructive">
                    {errors.agreement}
                </p>
            )}

            <Button type="submit" size="xl" className="mt-6 w-full font-semibold">
                注册并开始学习
            </Button>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                已有账号？
                <Button
                    type="button"
                    variant="link"
                    onClick={onShowLogin}
                    className="h-auto px-1 font-semibold"
                >
                    返回登录
                </Button>
            </p>
        </form>
    )
}

export {RegisterForm}
