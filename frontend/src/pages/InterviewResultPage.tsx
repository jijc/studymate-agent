import {ArrowLeft, ArrowRight, Lightbulb, MessageCircleMore, RotateCcw, Sparkles} from "lucide-react"
import {Link, useParams} from "react-router"

import {InterviewResultSummary} from "@/components/interview/InterviewResultSummary"
import {getInterviewResult} from "@/data/mockInterview"

function InterviewResultPage() {
    const {sessionId = ""} = useParams()
    const result = getInterviewResult(sessionId)

    if (!result) {
        return (
            <main className="question-bank-background grid min-h-[calc(100dvh-66px)] place-items-center px-5 text-center">
                <div>
                    <h1 className="text-2xl font-semibold">未找到这次模拟面试</h1>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">演示结果仅保存在当前浏览器会话中，关闭标签页后可能无法再查看。</p>
                    <Link to="/practice" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"><ArrowLeft aria-hidden="true" className="size-4"/>返回练习页</Link>
                </div>
            </main>
        )
    }

    return (
        <main className="question-bank-background min-h-[calc(100dvh-66px)] px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-[1480px]">
                <Link to="/practice" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-primary"><ArrowLeft aria-hidden="true" className="size-4"/>返回练习页</Link>
                <div className="mt-4 rounded-2xl border border-border/70 bg-card/90 p-5 sm:p-7">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary"><MessageCircleMore aria-hidden="true" className="size-4"/>本次面试回顾</span>
                    <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">模拟面试结果</h1>
                            <p className="mt-2 text-sm text-muted-foreground">{result.title} · 回顾回答、标记未回答题目，再决定下一步练什么。</p>
                        </div>
                        <Link to={`/interview/session/${result.source}/${result.libraryId}`} className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-card px-4 text-sm font-medium text-primary transition hover:bg-secondary">
                            <RotateCcw aria-hidden="true" className="size-4"/>再模拟一次
                        </Link>
                    </div>
                </div>

                <div className="mt-4"><InterviewResultSummary result={result}/></div>

                <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
                    <section aria-label="逐题回答回顾" className="rounded-2xl border border-border/70 bg-card/95 p-5 sm:p-6">
                        <h2 className="text-lg font-semibold">逐题回答回顾</h2>
                        <p className="mt-1 text-sm text-muted-foreground">仅回看本次输入，不生成真实评分或诊断。</p>
                        <div className="mt-5 divide-y divide-border/60 border-t border-border/60">
                            {result.answers.map((item, index) => (
                                <article key={`${item.questionId}-${index}`} className="py-5">
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 font-mono text-xs tabular-nums text-primary">{String(index + 1).padStart(2, "0")}</span>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-start justify-between gap-2">
                                                <h3 className="font-semibold leading-6">{item.prompt}</h3>
                                                <span className={item.skipped ? "rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground" : "rounded-full bg-secondary px-2 py-0.5 text-xs text-primary"}>{item.skipped ? "未回答" : "已回答"}</span>
                                            </div>
                                            <p className="mt-3 whitespace-pre-wrap rounded-xl bg-muted/45 px-4 py-3 text-sm leading-6 text-foreground/75">{item.skipped ? "本轮已跳过，未留下文字回答。" : item.answer}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <aside className="space-y-4 lg:sticky lg:top-20">
                        <section className="rounded-2xl border border-primary/20 bg-[linear-gradient(145deg,rgba(255,253,249,0.98),rgba(255,238,226,0.75))] p-5">
                            <h2 className="flex items-center gap-2 font-semibold"><Sparkles aria-hidden="true" className="size-4 text-primary"/>下一步怎么练</h2>
                            <p className="mt-3 text-xs font-medium text-primary">演示反馈 · 不依据本次回答评分</p>
                            <ul className="mt-3 space-y-3 text-sm leading-6 text-foreground/75">
                                <li>• 回看未回答题目，先整理出自己的回答提纲。</li>
                                <li>• 用“结论 → 场景 → 做法 → 结果”组织项目经历。</li>
                                <li>• 回到题库做专项练习，积累可量化的项目案例。</li>
                            </ul>
                        </section>
                        <section className="rounded-2xl border border-border/70 bg-card/90 p-5">
                            <h2 className="flex items-center gap-2 font-semibold"><Lightbulb aria-hidden="true" className="size-4 text-primary"/>继续学习</h2>
                            <div className="mt-4 space-y-2">
                                <Link to={`/questions/ai/${result.source}/${result.libraryId}`} className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm font-medium transition hover:border-primary/35 hover:text-primary">返回 AI 题库详情<ArrowRight aria-hidden="true" className="size-4"/></Link>
                                <Link to="/practice" className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm font-medium transition hover:border-primary/35 hover:text-primary">去练习<ArrowRight aria-hidden="true" className="size-4"/></Link>
                            </div>
                        </section>
                        <p className="px-1 text-xs leading-5 text-muted-foreground">此页为静态演示，不会更新练习记录、报告或专属 AI 题库解锁进度。</p>
                    </aside>
                </div>
            </div>
        </main>
    )
}

export {InterviewResultPage}
