/**
 * 文件作用：练习答题主页面；负责加载练习题、草稿、已提交状态、计时、切题、完成练习等交互。
 * 说明：题目已经改为通过 FastAPI + TanStack Query 获取；练习记录暂时仍保留本地逻辑。
 */

import {useEffect, useState} from "react"
import {ArrowLeft, ArrowRight} from "lucide-react"
import {Link, useNavigate, useParams} from "react-router"
import {useQuery} from "@tanstack/react-query"

import {PracticeAnswerInput} from "@/components/practice/PracticeAnswerInput"
import {PracticeSessionAside, type QuestionStatus} from "@/components/practice/PracticeSessionAside"
import {Button} from "@/components/ui/button"
import {DialogClose, DialogContent, DialogDescription, DialogRoot, DialogTitle} from "@/components/ui/dialog"

import {fetchPracticeQuestions, type PracticeSource} from "@/api/practice"
import {buildSubmittedRecord, savePracticeRecord} from "@/data/practiceRecords"
import {resolvePracticeLibrary} from "@/data/practiceSession"

type AnswerItem = { draft: string; submitted: boolean }

function PracticeSessionPage() {
    const navigate = useNavigate()
    const {source = "", libraryId = ""} = useParams()
    const limit = 10

    const {
        data: response,
        isPending,
        isError,
        error,
    } = useQuery({
        queryKey: [
            "practiceQuestions",
            source,
            libraryId,
            limit,
        ],
        queryFn: () =>
            fetchPracticeQuestions({
                source: source as PracticeSource,
                libraryId,
                limit,
            }),
    })

    const questions = response?.data ?? []
    const library = resolvePracticeLibrary(source, libraryId)

    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState<AnswerItem[]>([])
    const [elapsedSeconds, setElapsedSeconds] = useState<number[]>([])
    const [exitOpen, setExitOpen] = useState(false)
    const [finishOpen, setFinishOpen] = useState(false)

    const currentSubmitted = answers[currentIndex]?.submitted ?? false

    useEffect(() => {
        if (questions.length === 0) return

        setCurrentIndex(0)
        setAnswers(
            questions.map(() => ({
                draft: "",
                submitted: false,
            })),
        )
        setElapsedSeconds(
            questions.map(() => 0),
        )
    }, [questions])

    useEffect(() => {
        if (
            currentSubmitted ||
            questions.length === 0 ||
            answers.length === 0
        ) return

        const timer = window.setInterval(() => {
            setElapsedSeconds((previous) =>
                previous.map((seconds, index) =>
                    index === currentIndex ? seconds + 1 : seconds,
                ),
            )
        }, 1000)

        return () => window.clearInterval(timer)
    }, [currentIndex, currentSubmitted, questions.length, answers.length])

    if (isPending) {
        return (
            <main className="flex min-h-[calc(100vh-66px)] items-center justify-center">
                正在加载练习题...
            </main>
        )
    }

    if (isError) {
        return (
            <main className="flex min-h-[calc(100vh-66px)] items-center justify-center">
                加载练习题失败：{error instanceof Error ? error.message : "未知错误"}
            </main>
        )
    }

    if (!library || questions.length === 0) {
        return (
            <main
                className="mx-auto flex min-h-[calc(100vh-66px)] max-w-3xl flex-col items-center justify-center px-5 text-center">
                <h1 className="text-2xl font-semibold">没有找到这个练习题库</h1>
                <Link to="/practice"
                      className="mt-6 inline-flex h-10 items-center rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary-hover">返回练习页</Link>
            </main>
        )
    }

    if (
        answers.length !== questions.length ||
        elapsedSeconds.length !== questions.length
    ) {
        return (
            <main className="flex min-h-[calc(100vh-66px)] items-center justify-center">
                正在初始化练习...
            </main>
        )
    }

    const answer = answers[currentIndex]
    const question = questions[currentIndex]
    const statuses: QuestionStatus[] = answers.map((item) => item.submitted ? "已提交" : item.draft.trim() ? "草稿" : "未作答")
    const submittedCount = answers.filter((item) => item.submitted).length
    const modeLabel = source === "basic" ? "基础练习" : source === "resume" ? "简历专项" : "JD 专项"

    function updateAnswer(value: string) {
        setAnswers((previous) => previous.map((item, index) => index === currentIndex && !item.submitted ? {
            ...item,
            draft: value
        } : item))
    }

    function submitCurrent() {
        if (!answer.draft.trim() || answer.submitted) return
        setAnswers((previous) => previous.map((item, index) => index === currentIndex ? {
            ...item,
            submitted: true
        } : item))
    }

    function completePractice(destination?: string) {
        const record = buildSubmittedRecord({
            source: source as PracticeSource,
            libraryId,
            answers: answers.map((item) => item.submitted ? item.draft : ""),
        })
        savePracticeRecord(record)
        navigate(destination ?? `/practice/records/${record.id}`)
    }

    function finishGroup() {
        if (answers.some((item) => !item.submitted && item.draft.trim())) {
            setFinishOpen(true)
            return
        }
        completePractice()
    }

    return (
        <main
            className="min-h-[calc(100vh-66px)] bg-[linear-gradient(145deg,rgba(255,246,238,0.8),rgba(255,255,255,0.95)_34%)] px-4 py-6 sm:px-6 lg:py-5">
            <div className="mx-auto max-w-[1340px]">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <Button type="button" variant="ghost" className="-ml-3 text-muted-foreground hover:text-foreground"
                            onClick={() => setExitOpen(true)}>
                        <ArrowLeft aria-hidden="true" className="size-4"/>返回练习页
                    </Button>
                    <span
                        className="text-xs text-muted-foreground">逐题提交 · 未提交的回答仅作为草稿保存于当前页面</span>
                </div>

                <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
                    <section aria-label="当前题目"
                             className="min-w-0 rounded-2xl border border-border/70 bg-card/95 p-5 sm:p-6">
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                            <span
                                className="rounded-lg bg-primary/10 px-3 py-1.5 font-medium text-primary">{modeLabel}</span>
                        </div>
                        <h1 className="mt-3 text-lg font-semibold">{library.title}{source === "basic" ? " 基础练习" : ` ${modeLabel}`}</h1>
                        <div className="mt-5 border-t border-border/60 pt-5">
                            <p className="text-sm font-medium text-primary">当前题目 · 第 {currentIndex + 1} 题</p>
                            <h2 className="mt-2 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">{question.prompt}</h2>
                            <p className="mt-3 text-sm leading-6 text-muted-foreground">先说明核心概念，再结合具体场景组织回答。可以切换题目，草稿会保留。</p>
                        </div>

                        <PracticeAnswerInput value={answer.draft} onChange={updateAnswer} readOnly={answer.submitted}/>

                        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/60 pt-4 sm:gap-3">
                            <Button type="button" variant="outline" className="h-11 px-2 sm:px-4"
                                    disabled={currentIndex === 0} onClick={() => setCurrentIndex(currentIndex - 1)}>
                                <ArrowLeft aria-hidden="true" className="size-4"/><span>上一题</span>
                            </Button>
                            <Button type="button" className="h-11 px-2 sm:px-4"
                                    disabled={answer.submitted || !answer.draft.trim()} onClick={submitCurrent}>
                                {answer.submitted ? "已提交" : "提交本题"}
                            </Button>
                            <Button type="button" variant="outline" className="h-11 px-2 sm:px-4"
                                    disabled={currentIndex === questions.length - 1 && submittedCount === 0}
                                    onClick={() => currentIndex === questions.length - 1 ? finishGroup() : setCurrentIndex(currentIndex + 1)}>
                                <span>{currentIndex === questions.length - 1 ? "完成本组" : "下一题"}</span>
                                {currentIndex < questions.length - 1 &&
                                    <ArrowRight aria-hidden="true" className="size-4"/>}
                            </Button>
                        </div>
                    </section>

                    <PracticeSessionAside currentIndex={currentIndex} statuses={statuses}
                                          elapsedSeconds={elapsedSeconds[currentIndex]} topic={question.topic}
                                          feedback={null}
                                          onSelect={setCurrentIndex}/>
                </div>
            </div>

            <DialogRoot open={exitOpen} onOpenChange={setExitOpen}>
                <DialogContent className="max-w-md">
                    <DialogTitle className="text-xl font-semibold">确定退出练习？</DialogTitle>
                    <DialogDescription
                        className="mt-2 text-sm leading-6 text-muted-foreground">尚未提交的答案不会生成练习记录。{submittedCount > 0 ? `已提交的 ${submittedCount} 题可以保存到练习记录。` : "当前还没有已提交的题目。"}</DialogDescription>
                    <div className="mt-6 flex flex-wrap justify-end gap-2">
                        <DialogClose render={<Button type="button" variant="outline"/>}>继续练习</DialogClose>
                        {submittedCount > 0 ? (
                            <Button type="button"
                                    onClick={() => completePractice("/practice")}>保存并返回练习页</Button>
                        ) : (
                            <Link to="/practice"
                                  className="inline-flex h-10 items-center rounded-lg bg-destructive/10 px-5 text-sm font-medium text-destructive hover:bg-destructive/20">确认退出</Link>
                        )}
                    </div>
                </DialogContent>
            </DialogRoot>

            <DialogRoot open={finishOpen} onOpenChange={setFinishOpen}>
                <DialogContent className="max-w-md">
                    <DialogTitle className="text-xl font-semibold">还有未提交的草稿</DialogTitle>
                    <DialogDescription
                        className="mt-2 text-sm leading-6 text-muted-foreground">只有已提交的题目会计入练习记录。未提交的草稿不会被评分或保存。</DialogDescription>
                    <div className="mt-6 flex flex-wrap justify-end gap-2">
                        <DialogClose render={<Button type="button" variant="outline"/>}>返回继续提交</DialogClose>
                        <Button type="button" onClick={() => completePractice()}>忽略草稿并完成</Button>
                    </div>
                </DialogContent>
            </DialogRoot>
        </main>
    )
}

export {PracticeSessionPage}
