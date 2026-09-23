import {useState} from "react"
import {ChevronDown, Clock3} from "lucide-react"

import {cn} from "@/lib/utils"

type QuestionStatus = "未作答" | "已作答"

function formatElapsed(seconds: number) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0")
    const remainder = (seconds % 60).toString().padStart(2, "0")
    return `${minutes}:${remainder}`
}

function PracticeSessionAside({currentIndex, questions, statuses, elapsedSeconds, onSelect}: {
    currentIndex: number
    questions: Array<{id: string; prompt: string}>
    statuses: QuestionStatus[]
    elapsedSeconds: number
    onSelect: (index: number) => void
}) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const answeredCount = statuses.filter((status) => status === "已作答").length

    function selectQuestion(index: number) {
        onSelect(index)
        setMobileOpen(false)
    }

    return (
        <aside className="min-w-0 lg:min-h-0">
            <section aria-label="本轮题目与进度" className="rounded-2xl border border-border/70 bg-card/90 p-4 sm:p-5 lg:flex lg:h-full lg:min-h-0 lg:flex-col">
                <div className="flex items-center gap-2">
                    <Clock3 aria-hidden="true" className="size-5 text-primary"/>
                    <h2 className="font-semibold">本轮题目</h2>
                    <span className="ml-auto text-xs text-muted-foreground">{questions.length} 题</span>
                </div>

                <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                        <p className="text-xs text-muted-foreground">当前题目</p>
                        <p className="mt-1 text-2xl font-bold text-primary">{currentIndex + 1} / {questions.length}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">本题用时</p>
                        <p className="mt-1 text-xl font-semibold tabular-nums">{formatElapsed(elapsedSeconds)}</p>
                    </div>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary transition-[width]" style={{width: `${(answeredCount / questions.length) * 100}%`}}/>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">已作答 {answeredCount} / {questions.length} 题</p>

                <button
                    type="button"
                    aria-label={mobileOpen ? "收起题目目录" : "展开题目目录"}
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen((previous) => !previous)}
                    className="mt-4 flex w-full items-center justify-between rounded-lg border border-border/70 px-3 py-2 text-sm font-medium lg:hidden"
                >
                    查看 {questions.length} 道题目
                    <ChevronDown aria-hidden="true" className={cn("size-4 transition-transform", mobileOpen && "rotate-180")}/>
                </button>

                <nav aria-label="本轮题目目录" className={cn("mt-4 border-t border-border/60 pt-4 lg:flex lg:min-h-0 lg:flex-1 lg:flex-col", mobileOpen ? "block" : "hidden")}>
                    <div className="space-y-1.5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1">
                        {questions.map((question, index) => (
                            <button
                                key={question.id}
                                type="button"
                                aria-label={`第 ${index + 1} 题，${statuses[index]}，${question.prompt}`}
                                aria-current={currentIndex === index ? "step" : undefined}
                                onClick={() => selectQuestion(index)}
                                className={cn(
                                    "flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/25",
                                    currentIndex === index
                                        ? "bg-primary/10 text-primary"
                                        : "text-foreground hover:bg-secondary/50",
                                )}
                            >
                                <span className={cn(
                                    "grid size-7 shrink-0 place-items-center rounded-lg text-xs font-semibold",
                                    currentIndex === index ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                                )}>{index + 1}</span>
                                <span className="min-w-0 flex-1">
                                    <span className="line-clamp-2 text-sm font-medium leading-5">{question.prompt}</span>
                                    <span className={cn("mt-1 block text-xs", statuses[index] === "已作答" ? "text-primary" : "text-muted-foreground")}>{statuses[index]}</span>
                                </span>
                            </button>
                        ))}
                    </div>
                </nav>
                <p className="mt-3 hidden text-xs text-muted-foreground lg:block">点击题目切换，草稿保存在当前标签页。</p>
            </section>
        </aside>
    )
}

export {PracticeSessionAside}
export type {QuestionStatus}
