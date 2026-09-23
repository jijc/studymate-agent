import {cn} from "@/lib/utils"
import type {AiPreviewQuestion} from "@/data/aiLibraryDetails"

function AiQuestionPreviewDirectory({questions, activeId, onSelect}: {
    questions: AiPreviewQuestion[]
    activeId: string
    onSelect: (id: string) => void
}) {
    return (
        <nav aria-label="AI 预览题目目录" className="rounded-2xl border border-border/70 bg-card/90 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
                <h2 className="font-semibold">题目目录</h2>
                <span className="text-xs text-muted-foreground">示例预览</span>
            </div>
            <div className="mt-4 space-y-2">
                {questions.map((question, index) => (
                    <button
                        key={question.id}
                        type="button"
                        aria-current={activeId === question.id ? "true" : undefined}
                        onClick={() => onSelect(question.id)}
                        className={cn(
                            "flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition",
                            activeId === question.id
                                ? "border-primary/35 bg-secondary/65"
                                : "border-transparent hover:border-border hover:bg-muted/60",
                        )}
                    >
                        <span className={cn("shrink-0 font-mono text-xs tabular-nums", activeId === question.id ? "text-primary" : "text-muted-foreground")}>{String(index + 1).padStart(2, "0")}</span>
                        <span className="line-clamp-2 text-sm font-medium leading-5">{question.prompt}</span>
                    </button>
                ))}
            </div>
        </nav>
    )
}

export {AiQuestionPreviewDirectory}
