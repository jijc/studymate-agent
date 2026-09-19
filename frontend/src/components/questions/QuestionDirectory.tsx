import {Search} from "lucide-react"

import type {QuestionDirectoryItem} from "@/data/questionLibraryDetails"
import {cn} from "@/lib/utils"

type QuestionDirectoryProps = {
    libraryTitle: string
    questions: QuestionDirectoryItem[]
    activeQuestionId: string
    query: string
    onQueryChange: (query: string) => void
    onQuestionChange: (questionId: string) => void
}

function QuestionDirectory({libraryTitle, questions, activeQuestionId, query, onQueryChange, onQuestionChange}: QuestionDirectoryProps) {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    const visibleQuestions = questions.filter((question) => (
        `${question.chapter} ${question.title}`.toLocaleLowerCase().includes(normalizedQuery)
    ))

    return (
        <aside className="flex h-full min-h-0 flex-col rounded-2xl border border-border/50 bg-card/90 p-3 shadow-[0_10px_28px_rgb(105_64_38/4%)]">
            <div className="relative">
                <Search aria-hidden="true" className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"/>
                <input
                    type="search"
                    aria-label={`搜索 ${libraryTitle} 题目`}
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    placeholder="搜索当前题库"
                    className="h-10 w-full rounded-xl border border-border/55 bg-background/70 pl-9 pr-3 text-sm outline-none transition focus:border-primary/40 focus:ring-3 focus:ring-primary/10"
                />
            </div>

            <nav aria-label={`${libraryTitle} 题目目录`} className="mt-3 grid min-h-0 flex-1 content-start gap-1 overflow-y-auto pr-1">
                {visibleQuestions.map((question) => {
                    const active = question.id === activeQuestionId
                    const questionNumber = String(question.sequence).padStart(3, "0")
                    return (
                        <button
                            key={question.id}
                            type="button"
                            aria-label={`第 ${questionNumber} 题 ${question.title}`}
                            aria-pressed={active}
                            onClick={() => onQuestionChange(question.id)}
                            className={cn(
                                "rounded-xl px-3 py-3 text-left transition",
                                active ? "bg-secondary text-primary" : "text-foreground/75 hover:bg-muted/70 hover:text-foreground",
                            )}
                        >
                            <span className="flex items-center gap-2 text-xs font-medium opacity-70">
                                <span className="font-mono tabular-nums">{questionNumber}</span>
                                <span>{question.chapter}</span>
                            </span>
                            <span className="mt-1.5 block text-sm font-medium leading-5">{question.title}</span>
                        </button>
                    )
                })}
                {visibleQuestions.length === 0 && <p className="px-3 py-8 text-center text-sm text-muted-foreground">没有匹配的题目</p>}
            </nav>
        </aside>
    )
}

export {QuestionDirectory}
