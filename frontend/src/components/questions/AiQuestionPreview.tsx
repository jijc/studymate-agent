import {ArrowLeft, ArrowRight, Lightbulb, Sparkles} from "lucide-react"

import {Button} from "@/components/ui/button"
import type {AiPreviewQuestion} from "@/data/aiLibraryDetails"

function AiQuestionPreview({question, index, total, onPrevious, onNext}: {
    question: AiPreviewQuestion
    index: number
    total: number
    onPrevious: () => void
    onNext: () => void
}) {
    return (
        <section aria-label="AI 题目预览" className="rounded-2xl border border-border/70 bg-card/95 p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 font-semibold text-primary">
                    <Sparkles aria-hidden="true" className="size-3.5"/>AI 生成题目预览
                </span>
                <span className="font-mono tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            </div>

            <p className="mt-8 text-sm font-medium text-primary">当前题目</p>
            <h2 className="mt-2 max-w-3xl text-xl font-semibold leading-snug tracking-tight sm:text-2xl">{question.prompt}</h2>

            <div className="mt-8 grid gap-4 border-t border-border/60 pt-6 sm:grid-cols-2">
                <div>
                    <p className="text-xs font-semibold text-muted-foreground">考察方向</p>
                    <p className="mt-2 text-sm font-medium">{question.topic}</p>
                </div>
                <div>
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"><Lightbulb aria-hidden="true" className="size-3.5 text-primary"/>出题依据</p>
                    <p className="mt-2 text-sm leading-6 text-foreground/75">{question.rationale}</p>
                </div>
            </div>

            <div className="mt-8 rounded-xl border border-primary/15 bg-secondary/35 px-4 py-3 text-sm leading-6 text-muted-foreground">
                这里只展示部分示例题目。想系统作答并获得反馈，请从上方开始练习。
            </div>

            <div className="mt-6 flex justify-between gap-3 border-t border-border/60 pt-5">
                <Button type="button" variant="outline" disabled={index === 0} onClick={onPrevious}>
                    <ArrowLeft aria-hidden="true"/>上一题
                </Button>
                <Button type="button" variant="outline" disabled={index === total - 1} onClick={onNext}>
                    下一题<ArrowRight aria-hidden="true"/>
                </Button>
            </div>
        </section>
    )
}

export {AiQuestionPreview}
