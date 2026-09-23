import {useCallback, useEffect, useRef, useState} from "react"
import {ArrowLeft, Clock3, Lightbulb, MessageCircleMore} from "lucide-react"
import {Link, useBeforeUnload, useBlocker, useLocation, useNavigate, useParams} from "react-router"

import {InterviewSession} from "@/components/interview/InterviewSession"
import {Button} from "@/components/ui/button"
import {DialogClose, DialogContent, DialogDescription, DialogRoot, DialogTitle} from "@/components/ui/dialog"
import {getAiLibraryDetail} from "@/data/aiLibraryDetails"
import {getInterviewQuestions, saveInterviewResult, type InterviewAnswer} from "@/data/mockInterview"

function formatTime(seconds: number) {
    return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`
}

function InterviewSessionPage() {
    const {source = "", libraryId = ""} = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const library = getAiLibraryDetail(source, libraryId)
    const questions = getInterviewQuestions(source, libraryId)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [draft, setDraft] = useState("")
    const [answers, setAnswers] = useState<InterviewAnswer[]>([])
    const [elapsedSeconds, setElapsedSeconds] = useState(0)
    const [exitOpen, setExitOpen] = useState(false)
    const startedAtRef = useRef(0)
    const allowExitRef = useRef(false)
    const available = Boolean(library && questions.length > 0)
    const blocker = useBlocker(({currentLocation, nextLocation}) => available
        && !allowExitRef.current
        && currentLocation.pathname !== nextLocation.pathname)
    const from = typeof location.state?.from === "string" && location.state.from.startsWith("/")
        ? location.state.from
        : `/questions/ai/${source}/${libraryId}`

    useEffect(() => {
        if (questions.length === 0) return
        startedAtRef.current = Date.now()
        const timer = window.setInterval(() => setElapsedSeconds(Math.floor((Date.now() - startedAtRef.current) / 1000)), 1000)
        return () => window.clearInterval(timer)
    }, [source, libraryId, questions.length])

    useBeforeUnload(useCallback((event) => {
        if (!available || allowExitRef.current) return
        event.preventDefault()
        event.returnValue = ""
    }, [available]))

    function cancelExit() {
        if (blocker.state === "blocked") blocker.reset()
        setExitOpen(false)
    }

    function confirmExit() {
        allowExitRef.current = true
        if (blocker.state === "blocked") blocker.proceed()
        else navigate(from)
    }

    if (!library || questions.length === 0) {
        return (
            <main className="question-bank-background grid min-h-[calc(100dvh-66px)] place-items-center px-5 text-center">
                <div>
                    <h1 className="text-2xl font-semibold">无法开始这场模拟面试</h1>
                    <p className="mt-3 text-sm text-muted-foreground">题库不存在或尚未开放模拟面试。</p>
                    <Link to="/practice" className="mt-6 inline-flex text-sm font-medium text-primary">返回练习页</Link>
                </div>
            </main>
        )
    }

    function advance(skipped: boolean) {
        const question = questions[currentIndex]
        const nextAnswers: InterviewAnswer[] = [...answers, {
            questionId: question.id,
            prompt: question.prompt,
            answer: skipped ? "" : draft.trim(),
            skipped,
        }]
        if (currentIndex === questions.length - 1 && library) {
            const id = `interview-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
            saveInterviewResult({id, source: library.source, libraryId: library.id, title: library.title, durationSeconds: Math.floor((Date.now() - startedAtRef.current) / 1000), answers: nextAnswers})
            allowExitRef.current = true
            navigate(`/interview/result/${id}`)
            return
        }
        setAnswers(nextAnswers)
        setDraft("")
        setCurrentIndex((index) => index + 1)
    }

    const question = questions[currentIndex]
    const progress = ((currentIndex + 1) / questions.length) * 100

    return (
        <main className="question-bank-background min-h-[calc(100dvh-66px)] px-4 py-5 sm:px-6">
            <div className="mx-auto max-w-[1480px]">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <Button type="button" variant="ghost" className="-ml-3 text-muted-foreground" onClick={() => setExitOpen(true)}><ArrowLeft aria-hidden="true"/>退出面试</Button>
                    <span className="text-xs text-muted-foreground">演示会话 · 文字输入可体验</span>
                </div>
                <div className="mb-4 rounded-2xl border border-border/70 bg-card/90 p-5 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary"><MessageCircleMore aria-hidden="true" className="size-4"/>连续问答</span>
                            <h1 className="mt-1 text-2xl font-bold tracking-tight">AI 模拟面试</h1>
                            <p className="mt-1 text-sm text-muted-foreground">{library.title} · {library.source === "resume" ? "简历题库" : "JD 题库"}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="font-medium text-primary">第 {currentIndex + 1} / {questions.length} 轮</span>
                            <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock3 aria-hidden="true" className="size-4"/>{formatTime(elapsedSeconds)}</span>
                        </div>
                    </div>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-[width]" style={{width: `${progress}%`}}/></div>
                </div>

                <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
                    <InterviewSession question={question} currentIndex={currentIndex} total={questions.length} answers={answers} draft={draft} onDraftChange={setDraft} onAnswer={() => advance(false)} onSkip={() => advance(true)}/>
                    <aside className="space-y-4 lg:sticky lg:top-20">
                        <section className="rounded-2xl border border-border/70 bg-card/90 p-5">
                            <h2 className="font-semibold">面试进度</h2>
                            <p className="mt-3 text-sm text-muted-foreground">已完成 {answers.length} / {questions.length} 轮</p>
                            <p className="mt-2 text-xs leading-5 text-muted-foreground">每轮回答后继续；跳过的题目会在结果中标记为未回答。</p>
                        </section>
                        <section className="rounded-2xl border border-border/70 bg-card/90 p-5">
                            <h2 className="flex items-center gap-2 font-semibold"><Lightbulb aria-hidden="true" className="size-4 text-primary"/>回答建议</h2>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">先说结论，再用真实项目说明做法、取舍和结果。当前考察方向：{question.topic}。</p>
                        </section>
                    </aside>
                </div>
            </div>

            <DialogRoot open={exitOpen || blocker.state === "blocked"} onOpenChange={(open) => open ? setExitOpen(true) : cancelExit()}>
                <DialogContent className="max-w-md">
                    <DialogTitle className="text-xl font-semibold">确定退出模拟面试？</DialogTitle>
                    <DialogDescription className="mt-2 text-sm leading-6 text-muted-foreground">退出后本场回答不会生成结果；留在当前页面可以继续作答。</DialogDescription>
                    <div className="mt-6 flex justify-end gap-2">
                        <DialogClose render={<Button type="button" variant="outline"/>}>继续面试</DialogClose>
                        <Button type="button" onClick={confirmExit}>确认退出</Button>
                    </div>
                </DialogContent>
            </DialogRoot>
        </main>
    )
}

export {InterviewSessionPage}
