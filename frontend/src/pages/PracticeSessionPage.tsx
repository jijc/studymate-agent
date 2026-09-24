/**
 * 文件作用：按 sessionId 恢复固定题组、草稿及答题交互。
 */

import {useEffect, useState} from "react"
import {ArrowLeft, ArrowRight} from "lucide-react"
import {Navigate, useNavigate, useParams} from "react-router"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"

import {PracticeAnswerInput} from "@/components/practice/PracticeAnswerInput"
import {PracticeQuestionHint} from "@/components/practice/PracticeQuestionHint"
import {PracticeSessionEmptyState} from "@/components/practice/PracticeSessionEmptyState"
import {PracticeSessionAside, type QuestionStatus} from "@/components/practice/PracticeSessionAside"
import {Button} from "@/components/ui/button"
import {DialogClose, DialogContent, DialogDescription, DialogRoot, DialogTitle} from "@/components/ui/dialog"

import {abandonPracticeSession, getPracticeSession, submitPracticeSession} from "@/api/practice"
import {getPracticeDraft, savePracticeDraft} from "@/data/practiceDrafts"

function PracticeSessionPage() {
    const {sessionId = ""} = useParams()
    return <PracticeSessionContent key={sessionId} sessionId={sessionId}/>
}

function PracticeSessionContent({sessionId}: {sessionId: string}) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    // 1. 只按 sessionId 读取本轮固定题组；以后由 API 层替换为 FastAPI。
    const {
        data: session,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: ["practiceSession", sessionId],
        queryFn: () => getPracticeSession(sessionId),
    })

    // 2. Session 的题目快照不再从题库重新获取。
    const questions = session?.questions.map((item) => ({
        id: item.questionId,
        prompt: item.promptSnapshot,
        topic: item.topicSnapshot,
    })) ?? []

    // 3. 页面自己的状态。
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>(() => getPracticeDraft(sessionId))
    const [elapsedSeconds, setElapsedSeconds] = useState<Record<string, number>>({})
    const [exitOpen, setExitOpen] = useState(false)

    // 4. 根据当前题目 id 找到对应的客户端答题状态。
    const currentQuestionId = questions[currentIndex]?.id ?? ""

    // 5. 草稿按 sessionId 保存；当前题目每秒累加一次用时。
    useEffect(() => {
        if (session?.status === "active") savePracticeDraft(sessionId, answers)
    }, [answers, session?.status, sessionId])

    useEffect(() => {
        if (!currentQuestionId) return

        const timer = window.setInterval(() => {
            setElapsedSeconds((previous) => ({
                ...previous,
                [currentQuestionId]: (previous[currentQuestionId] ?? 0) + 1,
            }))
        }, 1000)

        return () => window.clearInterval(timer)
    }, [currentQuestionId])

    const submitMutation = useMutation({
        mutationFn: () => submitPracticeSession(sessionId, answers),
        onSuccess: (submitted) => {
            queryClient.setQueryData(["practiceSession", sessionId], submitted)
            navigate(`/practice/records/${submitted.recordId}`)
        },
    })
    const abandonMutation = useMutation({
        mutationFn: () => abandonPracticeSession(sessionId),
        onSuccess: (abandoned) => {
            queryClient.setQueryData(["practiceSession", sessionId], abandoned)
            navigate("/practice")
        },
    })

    // 6. 特殊页面状态：加载、失败、无会话或已结束。
    if (isPending) {
        return (
            <main className="flex min-h-[calc(100vh-66px)] items-center justify-center">
                正在加载本轮练习...
            </main>
        )
    }

    if (isError) {
        return (
            <main className="flex min-h-[calc(100vh-66px)] items-center justify-center">
                加载练习失败：{error instanceof Error ? error.message : "未知错误"}
            </main>
        )
    }

    if (!session) return <PracticeSessionEmptyState reason="missing" />
    if (session.status === "submitted" && session.recordId) {
        return <Navigate to={`/practice/records/${session.recordId}`} replace/>
    }
    if (session.status !== "active") return <PracticeSessionEmptyState reason="ended" />

    if (questions.length === 0) {
        return <PracticeSessionEmptyState reason="empty" />
    }

    // 7. 到这里固定题组已经准备好，可以读取当前题目和客户端状态。
    const question = questions[currentIndex]
    const answer = answers[question.id] ?? ""

    const statuses: QuestionStatus[] = questions.map((item) => {
        return answers[item.id]?.trim() ? "已作答" : "未作答"
    })

    const answeredCount = statuses.filter((status) => status === "已作答").length
    const modeLabel = session.source === "basic" ? "基础练习" : session.source === "resume" ? "简历专项" : "JD 专项"

    // 8. 页面操作函数。
    function updateAnswer(value: string) {
        setAnswers((previous) => ({...previous, [question.id]: value}))
    }

    function completePractice() {
        if (answeredCount !== questions.length) return

        submitMutation.mutate()
    }

    // 9. 渲染原有答题 UI。
    return (
        <main
            className="min-h-[calc(100vh-66px)] bg-[linear-gradient(145deg,rgba(255,246,238,0.8),rgba(255,255,255,0.95)_34%)] px-4 py-6 sm:px-6 lg:h-[calc(100dvh-66px)] lg:min-h-0 lg:overflow-hidden lg:py-5">
            <div className="mx-auto max-w-[1340px] lg:flex lg:h-full lg:min-h-0 lg:flex-col">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <Button type="button" variant="ghost" className="-ml-3 text-muted-foreground hover:text-foreground"
                            onClick={() => setExitOpen(true)}>
                        <ArrowLeft aria-hidden="true" className="size-4"/>返回练习页
                    </Button>
                </div>

                <div className="grid items-start gap-5 lg:min-h-0 lg:flex-1 lg:items-stretch lg:grid-cols-[300px_minmax(0,1fr)]">
                    <PracticeSessionAside
                        currentIndex={currentIndex}
                        questions={questions}
                        statuses={statuses}
                        elapsedSeconds={elapsedSeconds[question.id] ?? 0}
                        onSelect={setCurrentIndex}
                    />
                    <section aria-label="当前题目"
                             className="min-w-0 rounded-2xl border border-border/70 bg-card/95 p-5 sm:p-6 lg:min-h-0 lg:overflow-y-auto">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <h1 className="text-lg font-semibold">{session.libraryTitle}</h1>
                            <span
                                className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">{modeLabel}</span>
                        </div>
                        <div className="mt-5 border-t border-border/60 pt-5">
                            <p className="text-sm font-medium text-primary">当前题目 · 第 {currentIndex + 1} 题</p>
                            <h2 className="mt-2 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">{question.prompt}</h2>
                        </div>

                        <PracticeQuestionHint topic={question.topic} />

                        <PracticeAnswerInput value={answer} onChange={updateAnswer}/>

                        <section aria-label="本轮评估" className="mt-5 rounded-xl border border-primary/15 bg-secondary/30 px-4 py-3">
                            <h3 className="text-sm font-semibold text-primary">本轮评估</h3>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">每轮 {questions.length} 道题，全部作答后统一提交。AI 会结合整轮回答分析薄弱点，评分与逐题建议在复盘页查看。</p>
                        </section>

                        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-border/60 pt-4 sm:grid-cols-3 sm:gap-3">
                            <Button type="button" variant="outline" className="order-1 h-11 px-2 sm:px-4"
                                    disabled={currentIndex === 0} onClick={() => setCurrentIndex(currentIndex - 1)}>
                                <ArrowLeft aria-hidden="true" className="size-4"/><span>上一题</span>
                            </Button>
                            <Button type="button" className="order-3 col-span-2 h-11 px-2 sm:order-2 sm:col-span-1 sm:px-4"
                                    disabled={answeredCount !== questions.length || submitMutation.isPending} onClick={completePractice}>
                                提交本轮并查看评估
                            </Button>
                            <Button type="button" variant="outline" className="order-2 h-11 px-2 sm:order-3 sm:px-4"
                                    disabled={currentIndex === questions.length - 1}
                                    onClick={() => setCurrentIndex(currentIndex + 1)}>
                                <span>下一题</span>
                                <ArrowRight aria-hidden="true" className="size-4"/>
                            </Button>
                        </div>
                        {submitMutation.error && <p role="alert" className="mt-3 text-sm text-destructive">{submitMutation.error.message}</p>}
                    </section>
                </div>
            </div>

            <DialogRoot open={exitOpen} onOpenChange={setExitOpen}>
                <DialogContent className="max-w-md">
                    <DialogTitle className="text-xl font-semibold">暂时离开练习？</DialogTitle>
                    <DialogDescription
                        className="mt-2 text-sm leading-6 text-muted-foreground">当前已作答 {answeredCount} / {questions.length} 题。暂时离开不会结束本轮，草稿保存在当前浏览器，下次选择同一题库可以继续；只有明确放弃才会清除草稿。</DialogDescription>
                    <div className="mt-6 flex flex-wrap justify-end gap-2">
                        <DialogClose render={<Button type="button" variant="outline"/>}>继续练习</DialogClose>
                        <Button type="button" variant="outline" disabled={abandonMutation.isPending} onClick={() => abandonMutation.mutate()}>放弃本轮</Button>
                        <Button type="button" onClick={() => navigate("/practice")}>暂时离开</Button>
                    </div>
                    {abandonMutation.error && <p role="alert" className="mt-3 text-sm text-destructive">{abandonMutation.error.message}</p>}
                </DialogContent>
            </DialogRoot>
        </main>
    )
}

export {PracticeSessionPage}
