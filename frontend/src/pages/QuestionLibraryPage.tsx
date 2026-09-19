import {useLayoutEffect, useRef, useState} from "react"
import {Link, useParams, useSearchParams} from "react-router"

import {QuestionDirectory} from "@/components/questions/QuestionDirectory"
import {QuestionDirectoryDialog} from "@/components/questions/QuestionDirectoryDialog"
import {QuestionLibraryHeader} from "@/components/questions/QuestionLibraryHeader"
import {QuestionStudyContent} from "@/components/questions/QuestionStudyContent"
import {
    getQuestionAnswer,
    getQuestionDirectory,
    getQuestionLibraryDetail,
} from "@/data/questionLibraryDetails"

function QuestionLibraryPage() {
    const {libraryId = ""} = useParams()
    const library = getQuestionLibraryDetail(libraryId)
    const [searchParams, setSearchParams] = useSearchParams()
    const [directoryQuery, setDirectoryQuery] = useState("")
    const [answerExpanded, setAnswerExpanded] = useState(() => searchParams.has("from"))
    const answerScrollRef = useRef<HTMLElement>(null)
    const storedScrollPositions = useRef(new Map<string, number>())
    const pendingScrollTop = useRef(0)

    const questions = library?.questions ?? []
    const requestedQuestionId = searchParams.get("question") ?? questions[0]?.id ?? ""
    const activeQuestion = getQuestionAnswer(libraryId, requestedQuestionId) ?? questions[0]
    const activeQuestionIndex = activeQuestion
        ? questions.findIndex((question) => question.id === activeQuestion.id)
        : -1
    const sourceQuestionId = searchParams.get("from")
    const returnToQuestion = sourceQuestionId
        ? getQuestionAnswer(libraryId, sourceQuestionId)
        : undefined

    useLayoutEffect(() => {
        if (!activeQuestion || !answerScrollRef.current) return
        answerScrollRef.current.scrollTop = pendingScrollTop.current
        pendingScrollTop.current = 0
    }, [activeQuestion])

    if (!library || !activeQuestion) {
        return (
            <div className="question-bank-background min-h-[calc(100dvh-66px)]">
                <main className="mx-auto grid min-h-[60dvh] w-full max-w-[1480px] place-items-center px-5 py-10 text-center">
                    <div>
                        <h1 className="text-2xl font-semibold">未找到该知识库</h1>
                        <Link to="/questions" className="mt-4 inline-flex text-sm font-medium text-primary">返回公共题库</Link>
                    </div>
                </main>
            </div>
        )
    }

    const directory = getQuestionDirectory(libraryId)

    function rememberCurrentScroll() {
        storedScrollPositions.current.set(activeQuestion.id, answerScrollRef.current?.scrollTop ?? 0)
    }

    function handleQuestionChange(questionId: string) {
        rememberCurrentScroll()
        pendingScrollTop.current = 0
        setAnswerExpanded(false)
        setSearchParams({question: questionId})
    }

    function selectQuestionAt(index: number) {
        const question = questions[index]
        if (question) handleQuestionChange(question.id)
    }

    function handleFollowUpSelect(questionId: string) {
        rememberCurrentScroll()
        pendingScrollTop.current = 0
        setAnswerExpanded(true)
        setSearchParams({question: questionId, from: activeQuestion.id})
    }

    function handleReturnToQuestion() {
        if (!returnToQuestion) return
        pendingScrollTop.current = storedScrollPositions.current.get(returnToQuestion.id) ?? 0
        setAnswerExpanded(true)
        setSearchParams({question: returnToQuestion.id})
    }

    return (
        <div className="question-bank-background min-h-[calc(100dvh-66px)] xl:h-[calc(100dvh-66px)] xl:overflow-hidden">
            <main className="mx-auto flex h-full w-full max-w-[1480px] min-w-0 flex-col px-5 py-4 sm:px-8 xl:px-8">
                <QuestionLibraryHeader library={library}/>

                <div className="mt-3 flex justify-end xl:hidden">
                    <QuestionDirectoryDialog
                        libraryTitle={library.title}
                        questions={directory}
                        activeQuestionId={activeQuestion.id}
                        query={directoryQuery}
                        onQueryChange={setDirectoryQuery}
                        onQuestionChange={handleQuestionChange}
                    />
                </div>

                <section aria-label="题库学习工作台" className="mt-3 min-h-0 flex-1 xl:grid xl:grid-cols-[22rem_minmax(0,1fr)] xl:gap-4">
                    <div className="hidden min-h-0 xl:block">
                        <QuestionDirectory
                            libraryTitle={library.title}
                            questions={directory}
                            activeQuestionId={activeQuestion.id}
                            query={directoryQuery}
                            onQueryChange={setDirectoryQuery}
                            onQuestionChange={handleQuestionChange}
                        />
                    </div>

                    <section
                        ref={answerScrollRef}
                        aria-label="题目学习内容"
                        className="min-h-0 overflow-y-auto pt-3 xl:pt-0 xl:pr-1"
                    >
                        <QuestionStudyContent
                            question={activeQuestion}
                            questionNumber={activeQuestionIndex + 1}
                            totalQuestions={questions.length}
                            answerExpanded={answerExpanded}
                            hasPrevious={activeQuestionIndex > 0}
                            hasNext={activeQuestionIndex < questions.length - 1}
                            returnToQuestion={returnToQuestion && {id: returnToQuestion.id, title: returnToQuestion.title}}
                            onAnswerToggle={() => setAnswerExpanded((expanded) => !expanded)}
                            onPrevious={() => selectQuestionAt(activeQuestionIndex - 1)}
                            onNext={() => selectQuestionAt(activeQuestionIndex + 1)}
                            onFollowUpSelect={handleFollowUpSelect}
                            onReturnToQuestion={handleReturnToQuestion}
                        />
                    </section>
                </section>
            </main>
        </div>
    )
}

export {QuestionLibraryPage}
