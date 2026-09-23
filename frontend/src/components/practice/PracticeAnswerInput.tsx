import {useState} from "react"
import {Keyboard, Mic} from "lucide-react"

import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"

type AnswerMode = "text" | "voice"

function PracticeAnswerInput({value, onChange, readOnly = false}: {value: string; onChange: (value: string) => void; readOnly?: boolean}) {
    const [mode, setMode] = useState<AnswerMode>("text")

    return (
        <div className="mt-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-semibold">我的回答</span>
                <div role="group" aria-label="回答方式" className="inline-flex rounded-lg border border-border/75 bg-muted/50 p-1">
                    <button type="button" aria-pressed={mode === "text"} onClick={() => setMode("text")} className={cn("inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition sm:text-sm", mode === "text" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                        <Keyboard aria-hidden="true" className="size-4"/>文字输入
                    </button>
                    <button type="button" aria-pressed={mode === "voice"} onClick={() => setMode("voice")} className={cn("inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition sm:text-sm", mode === "voice" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}>
                        <Mic aria-hidden="true" className="size-4"/>语音回答
                    </button>
                </div>
            </div>

            {mode === "text" ? (
                <>
                    <label htmlFor="practice-answer" className="sr-only">我的回答</label>
                    <textarea
                        id="practice-answer"
                        value={value}
                        readOnly={readOnly}
                        onChange={(event) => onChange(event.target.value)}
                        placeholder="在这里写下你的回答或思路…"
                        className="mt-3 min-h-[200px] w-full resize-y rounded-xl border border-input bg-card px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-3 focus:ring-primary/10"
                    />
                    <p className="mt-2 text-xs text-muted-foreground">{readOnly ? "本题回答已提交。" : "草稿仅保存在当前标签页，刷新可恢复；不会自动提交。"}</p>
                </>
            ) : (
                <div className="mt-3 flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-primary/25 bg-[linear-gradient(135deg,rgba(255,250,245,0.95),rgba(255,237,222,0.45))] px-5 py-7 text-center">
                    <span className="grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
                        <Mic aria-hidden="true" className="size-6"/>
                    </span>
                    <p className="mt-3 text-sm font-semibold">语音录入待接入</p>
                    <p className="mt-1 max-w-md text-xs leading-5 text-muted-foreground">
                        未来支持录音、回放与提交；当前尚未接收语音作答。
                        {readOnly ? "可切回文字输入查看回答。" : value.trim() ? "已有文字草稿已保留，可以切回文字输入修改。" : "请切回文字输入完成练习。"}
                    </p>
                    <Button type="button" disabled className="mt-4 h-9 px-4"><Mic aria-hidden="true"/>开始录音</Button>
                </div>
            )}
        </div>
    )
}

export {PracticeAnswerInput}
