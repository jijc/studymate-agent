import {BarChart3, Clock3, Lightbulb} from "lucide-react"

import {cn} from "@/lib/utils"

type QuestionStatus = "未作答" | "草稿" | "已提交"

function formatElapsed(seconds: number) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0")
    const remainder = (seconds % 60).toString().padStart(2, "0")
    return `${minutes}:${remainder}`
}

function PracticeSessionAside({currentIndex, statuses, elapsedSeconds, topic, feedback, onSelect}: {
    currentIndex: number
    statuses: QuestionStatus[]
    elapsedSeconds: number
    topic: string
    feedback: string | null
    onSelect: (index: number) => void
}) {
    const submittedCount = statuses.filter((status) => status === "已提交").length

    return (
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <section aria-label="答题进度与时间" className="rounded-2xl border border-border/70 bg-card/90 p-5">
                <div className="flex items-center gap-2">
                    <Clock3 aria-hidden="true" className="size-5 text-primary"/>
                    <h2 className="font-semibold">答题进度与时间</h2>
                </div>
                <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-xs text-muted-foreground">当前题目</p>
                        <p className="mt-1 text-2xl font-bold text-primary">{currentIndex + 1} / {statuses.length}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">本题用时</p>
                        <p className="mt-1 text-xl font-semibold tabular-nums">{formatElapsed(elapsedSeconds)}</p>
                    </div>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary transition-[width]" style={{width: `${((currentIndex + 1) / statuses.length) * 100}%`}}/>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">已提交 {submittedCount} / {statuses.length} 题 · 建议每题约 60 秒，不会自动交卷</p>
                <div className="mt-4 grid grid-cols-5 gap-2 border-t border-border/60 pt-4" aria-label="题目导航">
                    {statuses.map((status, index) => (
                        <button
                            key={index}
                            type="button"
                            aria-label={`第 ${index + 1} 题，${status}`}
                            aria-current={currentIndex === index ? "step" : undefined}
                            title={`第 ${index + 1} 题 · ${status}`}
                            onClick={() => onSelect(index)}
                            className={cn(
                                "grid size-10 place-items-center rounded-lg border text-sm font-medium transition focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/25",
                                currentIndex === index
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : status === "已提交"
                                        ? "border-primary/30 bg-primary/8 text-primary"
                                        : status === "草稿"
                                            ? "border-amber-300 bg-amber-50 text-amber-700"
                                            : "border-border/80 bg-card text-muted-foreground hover:border-primary/40 hover:text-primary",
                            )}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">题号可直接切换；草稿不会自动提交。</p>
            </section>

            <section aria-label="AI 提示" className="rounded-2xl border border-border/70 bg-card/90 p-5">
                <div className="flex items-center gap-2">
                    <Lightbulb aria-hidden="true" className="size-5 text-primary"/>
                    <h2 className="font-semibold">AI 提示</h2>
                    <span className="ml-auto text-xs text-muted-foreground">演示提示</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">先用一句话说明「{topic}」的关键点，再结合真实项目或场景，讲清自己的选择和结果。</p>
            </section>

            <section aria-label="实时反馈" className="rounded-2xl border border-border/70 bg-card/90 p-5">
                <div className="flex items-center gap-2">
                    <BarChart3 aria-hidden="true" className="size-5 text-primary"/>
                    <h2 className="font-semibold">实时反馈</h2>
                </div>
                {feedback ? (
                    <div className="mt-3 rounded-xl bg-secondary/55 p-4">
                        <p className="text-xs font-semibold text-primary">演示反馈 · 非真实 AI 评分</p>
                        <p className="mt-2 text-sm leading-6">{feedback}</p>
                    </div>
                ) : (
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">提交本题后，这里会显示针对本次回答的反馈。</p>
                )}
            </section>
        </aside>
    )
}

export {PracticeSessionAside}
export type {QuestionStatus}
