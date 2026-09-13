import {useEffect, useState} from "react"

import {Button} from "@/components/ui/button"

type VerificationCodeButtonProps = {
    disabled?: boolean
}

function VerificationCodeButton({disabled = false}: VerificationCodeButtonProps) {
    const [secondsLeft, setSecondsLeft] = useState(0)

    useEffect(() => {
        // 倒计时结束时不再创建定时器，避免无意义的后台任务。
        if (secondsLeft === 0) return

        const timerId = window.setTimeout(() => {
            setSecondsLeft((current) => Math.max(current - 1, 0))
        }, 1000)

        // 组件卸载或下一次计时前清理旧定时器，这是 React effect 的常见写法。
        return () => window.clearTimeout(timerId)
    }, [secondsLeft])

    return (
        <Button
            type="button"
            size="lg"
            disabled={disabled || secondsLeft > 0}
            onClick={() => setSecondsLeft(60)}
            className="min-w-32 font-semibold"
        >
            {secondsLeft > 0 ? `${secondsLeft} 秒后重试` : "获取验证码"}
        </Button>
    )
}

export {VerificationCodeButton}
