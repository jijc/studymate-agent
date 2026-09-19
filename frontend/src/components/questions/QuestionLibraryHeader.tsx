import {ArrowLeft} from "lucide-react"
import {Link} from "react-router"

import {QuestionLibraryIcon} from "@/components/questions/QuestionLibraryIcon"
import type {QuestionLibraryDetail} from "@/data/questionLibraryDetails"
import {cn} from "@/lib/utils"

type QuestionLibraryHeaderProps = {
    library: QuestionLibraryDetail
}

function QuestionLibraryHeader({library}: QuestionLibraryHeaderProps) {
    return (
        <section className="flex shrink-0 flex-col gap-3 rounded-2xl border border-primary/15 bg-card/85 px-4 py-4 shadow-[0_10px_30px_rgb(105_64_38/4%)] sm:flex-row sm:items-center sm:px-5">
            <Link to="/questions" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-primary">
                <ArrowLeft aria-hidden="true" className="size-4"/>
                返回题库
            </Link>
            <span aria-hidden="true" className="hidden h-8 w-px bg-border/65 sm:block"/>
            <div className="flex min-w-0 items-center gap-3">
                <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl", library.iconClassName)}>
                    <QuestionLibraryIcon icon={library.icon} label={`${library.title} 技术图标`} className="size-6"/>
                </span>
                <div className="min-w-0">
                    <h1 className="flex flex-wrap items-baseline gap-x-2 text-xl font-bold tracking-[-0.025em] text-[#111827] sm:text-2xl">
                        {library.title} 知识库
                        <span className="text-xs font-medium tracking-normal text-primary sm:text-sm">{library.questionCount} 题</span>
                    </h1>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">{library.description}</p>
                </div>
            </div>
        </section>
    )
}

export {QuestionLibraryHeader}
