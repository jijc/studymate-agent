import {Keyboard, MessageCircleMore, Mic, Send, SkipForward} from "lucide-react"
import {useState} from "react"

import {Button} from "@/components/ui/button"
import type {InterviewAnswer, InterviewQuestion} from "@/data/mockInterview"
import {cn} from "@/lib/utils"

function InterviewSession({question, currentIndex, total, answers, draft, onDraftChange, onAnswer, onSkip}: {
    question: InterviewQuestion
    currentIndex: number
    total: number
    answers: InterviewAnswer[]
    draft: string
    onDraftChange: (value: string) => void
    onAnswer: () => void
    onSkip: () => void
}) {
    const [mode, setMode] = useState<"text" | "voice">("text")

    return (
        <section aria-label="模拟面试问答" className="min-w-0 rounded-2xl border border-border/70 bg-card/95 p-5 sm:p-6">
            {answers.length > 0 && (
                <details key={currentIndex} className="mb-6 rounded-xl border border-border/70 bg-muted/30">
                    <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
                        已完成 {answers.length} 轮 · 展开回顾
                    </summary>
                    <div className="space-y-3 border-t border-border/60 p-3">
                        {answers.map((item, index) => (
                            <div key={item.questionId} className="rounded-lg bg-card px-4 py-3 text-sm">
                                <p className="font-medium">{index + 1}. {item.prompt}</p>
                                <p className="mt-2 leading-6 text-foreground/70">{item.skipped ? "已跳过 · 未回答" : item.answer}</p>
                            </div>
                        ))}
                    </div>
                </details>
            )}

            <div className="flex items-center gap-2 text-sm font-medium text-primary"><MessageCircleMore aria-hidden="true" className="size-5"/>面试官 · 第 {currentIndex + 1} 轮</div>
            <h2 className="mt-4 max-w-3xl text-xl font-semibold leading-snug tracking-tight sm:text-2xl">{question.prompt}</h2>
            <p className="mt-3 text-sm text-muted-foreground">考察方向：{question.topic}</p>

            <div className="mt-8 border-t border-border/60 pt-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm font-semibold">我的回答</span>
                    <div role="group" aria-label="回答方式" className="inline-flex rounded-lg border border-border/75 bg-muted/50 p-1">
                        <button type="button" aria-pressed={mode === "text"} onClick={() => setMode("text")} className={cn("inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition sm:text-sm", mode === "text" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}><Keyboard aria-hidden="true" className="size-4"/>文字输入</button>
                        <button type="button" aria-pressed={mode === "voice"} onClick={() => setMode("voice")} className={cn("inline-flex h-9 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition sm:text-sm", mode === "voice" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}><Mic aria-hidden="true" className="size-4"/>语音回答</button>
                    </div>
                </div>
                {mode === "text" ? (
                    <>
                        <label htmlFor="interview-answer" className="sr-only">我的回答</label>
                        <textarea id="interview-answer" value={draft} onChange={(event) => onDraftChange(event.target.value)} placeholder="像真实面试一样，用自己的话回答这道题…" className="mt-3 min-h-40 w-full resize-y rounded-xl border border-input bg-card px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-3 focus:ring-primary/10"/>
                    </>
                ) : (
                    <div className="mt-3 flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-primary/25 bg-secondary/35 px-5 py-6 text-center">
                        <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary"><Mic aria-hidden="true" className="size-5"/></span>
                        <p className="mt-3 text-sm font-semibold">语音录入待接入</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">当前不会录音或转写。{draft.trim() ? "已输入的文字草稿仍保留，切回文字可继续编辑。" : "请切回文字输入完成本轮。"}</p>
                        <Button type="button" disabled className="mt-4 h-9"><Mic aria-hidden="true"/>开始录音</Button>
                    </div>
                )}
                <p className="mt-2 text-xs leading-5 text-muted-foreground">静态演示：问题预设，不会根据回答实时追问；结束后仅展示示例建议。</p>
            </div>

            <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-border/60 pt-5">
                <Button type="button" variant="outline" onClick={onSkip}><SkipForward aria-hidden="true"/>跳过本轮</Button>
                <Button type="button" disabled={!draft.trim()} onClick={onAnswer}>
                    {currentIndex === total - 1 ? "结束面试并查看结果" : "回答并继续"}<Send aria-hidden="true"/>
                </Button>
            </div>
        </section>
    )
}

export {InterviewSession}
