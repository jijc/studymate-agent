import {
    ArrowLeft,
    ArrowRight,
    ArrowUpLeft,
    BadgeCheck,
    BookOpenText,
    ChevronDown,
    Code2,
    KeyRound,
    Lightbulb,
    MessageCircleQuestion,
    MessagesSquare,
} from "lucide-react"

import {Button} from "@/components/ui/button"
import type {LibraryQuestion} from "@/data/questionLibraryDetails"

type ReturnQuestion = {
    id: string
    title: string
}

type QuestionStudyContentProps = {
    question: LibraryQuestion
    questionNumber: number
    totalQuestions: number
    answerExpanded: boolean
    hasPrevious: boolean
    hasNext: boolean
    returnToQuestion?: ReturnQuestion
    onAnswerToggle: () => void
    onPrevious: () => void
    onNext: () => void
    onFollowUpSelect: (questionId: string) => void
    onReturnToQuestion: () => void
}

function QuestionStudyContent({
    question,
    questionNumber,
    totalQuestions,
    answerExpanded,
    hasPrevious,
    hasNext,
    returnToQuestion,
    onAnswerToggle,
    onPrevious,
    onNext,
    onFollowUpSelect,
    onReturnToQuestion,
}: QuestionStudyContentProps) {
    const displayNumber = String(question.sequence).padStart(3, "0")

    return (
        <article className="min-w-0 rounded-2xl border border-border/50 bg-card/95 p-5 shadow-[0_12px_32px_rgb(105_64_38/5%)] sm:p-7">
            {returnToQuestion && (
                <button
                    type="button"
                    aria-label={`返回原题：${returnToQuestion.title}`}
                    onClick={onReturnToQuestion}
                    className="mb-5 inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-primary transition hover:bg-[#ffe9d8]"
                >
                    <ArrowUpLeft aria-hidden="true" className="size-4"/>
                    返回原题：{returnToQuestion.title}
                </button>
            )}

            <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                <span className="rounded-full bg-secondary px-3 py-1 font-mono tabular-nums text-primary">第 {displayNumber} 题</span>
                <span className="text-muted-foreground">{question.chapter}</span>
                <span className="ml-auto text-muted-foreground">{questionNumber} / {totalQuestions}</span>
            </div>

            <h2 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.02em] text-[#111827]">{question.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">{question.summary}</p>

            {!answerExpanded ? (
                <div className="mt-8 rounded-2xl border border-dashed border-primary/25 bg-secondary/45 px-5 py-8 text-center">
                    <Lightbulb aria-hidden="true" className="mx-auto size-8 text-primary/75"/>
                    <p className="mt-3 text-sm text-muted-foreground">先在心里组织回答，再按理解顺序查看本站整理的完整内容。</p>
                    <Button type="button" className="mt-5" onClick={onAnswerToggle}>
                        查看完整解析
                        <ChevronDown aria-hidden="true"/>
                    </Button>
                </div>
            ) : (
                <section aria-label="参考答案与解析" className="mt-8 space-y-7">
                    <div>
                        <h3 className="flex items-center gap-2 text-lg font-semibold"><KeyRound aria-hidden="true" className="size-5 text-primary"/>关键词解释</h3>
                        <dl role="list" aria-label="关键词解释列表" className="mt-3 divide-y divide-border/55 border-y border-border/55">
                            {question.keywords.map((keyword) => (
                                <div
                                    key={keyword.term}
                                    role="listitem"
                                    className="grid gap-1 py-3.5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-5"
                                >
                                    <dt className="font-semibold leading-6 text-foreground">{keyword.term}</dt>
                                    <dd className="text-sm leading-6 text-foreground/70">{keyword.explanation}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="border-t border-border/50 pt-6">
                        <h3 className="flex items-center gap-2 text-lg font-semibold"><MessagesSquare aria-hidden="true" className="size-5 text-[#3b82c4]"/>白话理解</h3>
                        <p className="mt-3 max-w-3xl rounded-xl bg-[#f5f9ff] p-4 text-sm leading-7 text-foreground/80 sm:text-base">{question.plainAnswer}</p>
                    </div>

                    {question.code && (
                        <div className="border-t border-border/50 pt-6">
                            <h3 className="flex items-center gap-2 text-lg font-semibold"><Code2 aria-hidden="true" className="size-5 text-[#4f6bd8]"/>示例代码</h3>
                            <div className="mt-3 overflow-hidden rounded-xl border border-[#2f3542] bg-[#171b24]">
                                <div className="border-b border-white/10 px-4 py-2 text-xs text-white/55">{question.code.language}</div>
                                <pre className="overflow-x-auto p-4 text-sm leading-6 text-[#e7edf6]"><code>{question.code.content}</code></pre>
                            </div>
                        </div>
                    )}

                    <div className="border-t border-border/50 pt-6">
                        <h3 className="flex items-center gap-2 text-lg font-semibold"><BadgeCheck aria-hidden="true" className="size-5 text-primary"/>标准答案</h3>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/80 sm:text-base">{question.answer}</p>
                    </div>

                    <div className="border-t border-border/50 pt-6">
                        <h3 className="flex items-center gap-2 text-lg font-semibold"><BookOpenText aria-hidden="true" className="size-5 text-[#f4a51c]"/>原理解析</h3>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/80 sm:text-base">{question.explanation}</p>
                    </div>

                    {question.followUps.length > 0 && (
                        <div className="border-t border-border/50 pt-6">
                            <h3 className="flex items-center gap-2 text-lg font-semibold"><MessageCircleQuestion aria-hidden="true" className="size-5 text-[#5e6ad2]"/>常见追问</h3>
                            <div className="mt-3 grid gap-3">
                                {question.followUps.map((followUp) => (
                                    <div key={followUp.questionId} className="flex flex-col gap-3 rounded-xl border border-[#dfe4ff] bg-[#f7f8ff] p-4 sm:flex-row sm:items-center">
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-foreground">{followUp.title}</p>
                                            <p className="mt-1 text-sm leading-6 text-muted-foreground">{followUp.summary}</p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            aria-label={`查看完整解析：${followUp.title}`}
                                            onClick={() => onFollowUpSelect(followUp.questionId)}
                                            className="shrink-0"
                                        >
                                            查看完整解析
                                            <ArrowRight aria-hidden="true"/>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="border-t border-border/50 pt-6">
                        <h3 className="flex items-center gap-2 text-lg font-semibold"><Lightbulb aria-hidden="true" className="size-5 text-[#f4a51c]"/>面试表达建议</h3>
                        <ul className="mt-3 space-y-2 rounded-xl bg-[#fff8ed] p-4 text-sm leading-6 text-foreground/75">
                            {question.tips.map((tip) => <li key={tip}>• {tip}</li>)}
                        </ul>
                    </div>
                </section>
            )}

            <footer className="mt-8 flex items-center justify-between border-t border-border/50 pt-5">
                <Button type="button" variant="outline" disabled={!hasPrevious} onClick={onPrevious}>
                    <ArrowLeft aria-hidden="true"/>
                    上一题
                </Button>
                <Button type="button" variant="outline" disabled={!hasNext} onClick={onNext}>
                    下一题
                    <ArrowRight aria-hidden="true"/>
                </Button>
            </footer>
        </article>
    )
}

export {QuestionStudyContent}
