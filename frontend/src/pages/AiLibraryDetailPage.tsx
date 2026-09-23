import {useState} from "react"
import {ArrowLeft, LockKeyhole} from "lucide-react"
import {Link, useParams} from "react-router"

import {AiLibraryDetailHeader} from "@/components/questions/AiLibraryDetailHeader"
import {AiQuestionPreview} from "@/components/questions/AiQuestionPreview"
import {AiQuestionPreviewDirectory} from "@/components/questions/AiQuestionPreviewDirectory"
import {getAiLibraryDetail} from "@/data/aiLibraryDetails"

function AiLibraryDetailPage() {
    const {source = "", libraryId = ""} = useParams()
    const library = getAiLibraryDetail(source, libraryId)
    const [activeId, setActiveId] = useState("")

    if (source === "exclusive" && libraryId === "weakness") {
        return (
            <main className="question-bank-background min-h-[calc(100dvh-66px)] px-5 py-10">
                <div className="mx-auto flex min-h-[60dvh] max-w-xl flex-col items-center justify-center rounded-2xl border border-border/70 bg-card/90 p-8 text-center">
                    <span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary"><LockKeyhole aria-hidden="true" className="size-6"/></span>
                    <h1 className="mt-5 text-2xl font-semibold">专属 AI 题库尚未解锁</h1>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">完成基础、简历或 JD 专项练习并获得有效评分后，才能生成你的薄弱点专属题库。当前示例进度为 6/10。</p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Link to="/questions/ai" className="inline-flex h-10 items-center rounded-lg border border-primary/40 px-4 text-sm font-medium text-primary">返回 AI 题库</Link>
                        <Link to="/practice" className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground">去练习</Link>
                    </div>
                </div>
            </main>
        )
    }

    if (!library) {
        return (
            <main className="question-bank-background grid min-h-[calc(100dvh-66px)] place-items-center px-5 text-center">
                <div>
                    <h1 className="text-2xl font-semibold">未找到该 AI 题库</h1>
                    <p className="mt-3 text-sm text-muted-foreground">题库可能已删除，或访问链接不正确。</p>
                    <Link to="/questions/ai" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"><ArrowLeft aria-hidden="true" className="size-4"/>返回 AI 题库</Link>
                </div>
            </main>
        )
    }

    const questions = library.previewQuestions
    const activeIndex = Math.max(0, questions.findIndex((question) => question.id === activeId))
    const activeQuestion = questions[activeIndex]

    return (
        <div className="question-bank-background min-h-[calc(100dvh-66px)] xl:h-[calc(100dvh-66px)] xl:overflow-hidden">
            <main className="mx-auto flex h-full w-full max-w-[1480px] min-w-0 flex-col px-5 py-5 sm:px-8">
                <AiLibraryDetailHeader library={library}/>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span>示例预览 {questions.length} 题 · 题库共 {library.questionCount} 题</span>
                    <span>AI 题库内容仅供你个人使用</span>
                </div>
                <div className="mt-4 min-h-0 flex-1 gap-4 xl:grid xl:grid-cols-[20rem_minmax(0,1fr)]">
                    <div className="min-h-0 xl:overflow-y-auto xl:pb-5">
                        <AiQuestionPreviewDirectory questions={questions} activeId={activeQuestion.id} onSelect={setActiveId}/>
                    </div>
                    <div className="min-h-0 pt-4 xl:overflow-y-auto xl:pb-5 xl:pt-0">
                        <AiQuestionPreview
                            question={activeQuestion}
                            index={activeIndex}
                            total={questions.length}
                            onPrevious={() => setActiveId(questions[activeIndex - 1].id)}
                            onNext={() => setActiveId(questions[activeIndex + 1].id)}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export {AiLibraryDetailPage}
