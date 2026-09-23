import {CheckCircle2, Clock3, MessageCircleMore} from "lucide-react"

import type {InterviewResult} from "@/data/mockInterview"

function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60)
    const remainder = seconds % 60
    return `${minutes} 分 ${remainder.toString().padStart(2, "0")} 秒`
}

function InterviewResultSummary({result}: {result: InterviewResult}) {
    const answered = result.answers.filter((item) => !item.skipped).length
    const skipped = result.answers.length - answered

    return (
        <section aria-label="本次模拟概况" className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-card/90 p-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><CheckCircle2 aria-hidden="true" className="size-4 text-primary"/>完成情况</span>
                <p className="mt-2 text-xl font-semibold">{answered} / {result.answers.length} <span className="text-sm font-normal text-muted-foreground">题已回答</span></p>
                <p className="mt-1 text-xs text-muted-foreground">{skipped} 题未回答</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/90 p-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 aria-hidden="true" className="size-4 text-primary"/>本次用时</span>
                <p className="mt-2 text-xl font-semibold tabular-nums">{formatDuration(result.durationSeconds)}</p>
                <p className="mt-1 text-xs text-muted-foreground">不限时，不会自动结束</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/90 p-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><MessageCircleMore aria-hidden="true" className="size-4 text-primary"/>题库来源</span>
                <p className="mt-2 truncate text-base font-semibold">{result.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{result.source === "resume" ? "简历题库" : "JD 题库"}</p>
            </div>
        </section>
    )
}

export {InterviewResultSummary}
