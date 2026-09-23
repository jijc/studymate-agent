import {ArrowLeft, ArrowRight, BriefcaseBusiness, FileText, MessageCircleMore} from "lucide-react"
import {Link} from "react-router"

import type {AiLibraryDetail} from "@/data/aiLibraryDetails"

function AiLibraryDetailHeader({library}: {library: AiLibraryDetail}) {
    const Icon = library.source === "resume" ? FileText : BriefcaseBusiness
    const sourceLabel = library.source === "resume" ? "简历题库" : "JD 题库"

    return (
        <header className="rounded-2xl border border-border/70 bg-card/90 p-5 sm:p-6">
            <Link to="/questions/ai" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-primary">
                <ArrowLeft aria-hidden="true" className="size-4"/>返回 AI 题库
            </Link>
            <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                    <div className="flex items-start gap-3">
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                            <Icon aria-hidden="true" className="size-5"/>
                        </span>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold tracking-wide text-primary">{sourceLabel} · 个性化题目</p>
                            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{library.title}</h1>
                        </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{library.subtitle}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        <span>题库共 <strong className="text-foreground">{library.questionCount}</strong> 题</span>
                        <span>已练 <strong className="text-foreground">{library.completedCount}</strong> 题</span>
                        <span>更新于 {library.updatedAt}</span>
                    </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                    <Link to={`/interview/session/${library.source}/${library.id}`} className="inline-flex h-10 items-center gap-2 rounded-lg border border-primary/40 bg-card px-4 text-sm font-medium text-primary transition hover:border-primary hover:bg-secondary">
                        <MessageCircleMore aria-hidden="true" className="size-4"/>模拟面试
                    </Link>
                    <Link to={`/practice/session/${library.source}/${library.id}`} className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary-hover">
                        开始练习<ArrowRight aria-hidden="true" className="size-4"/>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export {AiLibraryDetailHeader}
