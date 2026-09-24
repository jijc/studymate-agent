import {ArrowLeft, ArrowRight, CheckCircle2, Lightbulb, RotateCcw} from "lucide-react"
import {Link, useParams} from "react-router"

import {Button} from "@/components/ui/button"
import {getPracticeRecord} from "@/data/practiceRecords"
import {useStartPracticeSession} from "@/hooks/useStartPracticeSession"

function PracticeReviewPage() {
    const {startPracticeSession, isStarting, startError} = useStartPracticeSession()
    const {recordId} = useParams()
    const record = recordId ? getPracticeRecord(recordId) : null

    if (!record) {
        return (
            <main className="mx-auto grid min-h-[calc(100dvh-66px)] max-w-[1480px] place-items-center px-5 py-12 sm:px-8">
                <div className="w-full max-w-lg rounded-2xl border border-border/70 bg-card/85 p-8 text-center">
                    <h1 className="text-xl font-semibold">没有找到这次练习记录</h1>
                    <p className="mt-2 text-sm text-muted-foreground">这条记录可能已失效，可以返回记录列表继续查看。</p>
                    <Button render={<Link to="/practice/records"/>} nativeButton={false} className="mt-6">返回练习记录</Button>
                </div>
            </main>
        )
    }

    const weakTopics = [...new Set(record.answers.filter((item) => !item.answer).map((item) => item.topic))].slice(0, 3)

    return (
        <main className="question-bank-background min-h-[calc(100dvh-66px)] px-5 pb-14 pt-7 sm:px-8">
            <div className="mx-auto max-w-[1180px]">
                <Link to="/practice/records" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
                    <ArrowLeft aria-hidden="true" className="size-4"/>返回练习记录
                </Link>

                <section className="mt-5 rounded-2xl border border-border/70 bg-card/85 p-6 sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <p className="text-sm font-medium text-primary">{record.type} · {record.practicedAt}</p>
                            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{record.title} · 练习复盘</h1>
                            <p className="mt-2 text-sm text-muted-foreground">完成 {record.completed} 题 / 共 10 题 · 用本次反馈决定下一次练什么</p>
                        </div>
                        <div className="min-w-32 rounded-xl bg-secondary/65 px-5 py-4 text-center">
                            <p className="text-xs text-muted-foreground">AI 评分</p>
                            <p className="mt-1 text-3xl font-bold text-primary">{record.score}<span className="ml-1 text-sm font-medium">分</span></p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3 border-t border-border/60 pt-5">
                        <Button type="button" size="sm" disabled={isStarting}
                                onClick={() => startPracticeSession({source: record.source, libraryId: record.libraryId})}>
                            <RotateCcw aria-hidden="true"/>{isStarting ? "正在进入..." : "再练一组"}
                        </Button>
                        <Button render={<Link to="/reports"/>} nativeButton={false} variant="outline" size="sm">
                            查看报告<ArrowRight aria-hidden="true"/>
                        </Button>
                    </div>
                    {startError && <p role="alert" className="mt-3 text-sm text-destructive">{startError.message}</p>}
                </section>

                <section className="mt-6 rounded-2xl border border-border/70 bg-card/85 p-6 sm:p-7" aria-label="本次薄弱点">
                    <div className="flex items-center gap-2">
                        <Lightbulb aria-hidden="true" className="size-5 text-primary"/>
                        <h2 className="text-lg font-semibold">下一步建议</h2>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {weakTopics.length > 0
                            ? `优先补练 ${weakTopics.join("、")}；先梳理核心概念，再尝试用自己的话回答。`
                            : "本组题目已全部作答。可以结合下面的逐题反馈，继续打磨表达与案例。"}
                    </p>
                </section>

                <section className="mt-7" aria-label="逐题复盘">
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">逐题复盘</h2>
                        <p className="mt-1 text-sm text-muted-foreground">结合本轮回答，逐题查看改进方向。</p>
                    </div>
                    <div className="space-y-3">
                        {record.answers.map((item, index) => (
                            <article key={item.id} className="rounded-2xl border border-border/65 bg-card/85 p-5 sm:p-6">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="grid size-7 place-items-center rounded-full bg-secondary text-sm font-semibold text-primary">{index + 1}</span>
                                    <h3 className="min-w-0 flex-1 font-semibold">{item.prompt}</h3>
                                    <span className="text-xs text-muted-foreground">{item.topic}</span>
                                </div>
                                <div className="mt-4 grid gap-4 md:grid-cols-2">
                                    <div className="rounded-xl bg-muted/60 p-4">
                                        <p className="text-xs font-medium text-muted-foreground">我的回答</p>
                                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6">{item.answer || "未作答，本题不计入有效练习。"}</p>
                                    </div>
                                    <div className="rounded-xl bg-secondary/50 p-4">
                                        <p className="flex items-center gap-1.5 text-xs font-medium text-primary"><CheckCircle2 aria-hidden="true" className="size-3.5"/>逐题建议</p>
                                        <p className="mt-2 text-sm leading-6">{item.feedback}</p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}

export {PracticeReviewPage}
