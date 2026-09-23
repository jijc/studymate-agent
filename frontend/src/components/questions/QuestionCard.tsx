import {ArrowRight} from "lucide-react"
import {Link} from "react-router"

import {QuestionLibraryIcon} from "@/components/questions/QuestionLibraryIcon"
import {QuestionLibraryFavoriteButton} from "@/components/questions/QuestionLibraryFavoriteButton"
import type {QuestionLibrary} from "@/data/questionLibraries"
import {cn} from "@/lib/utils"

type QuestionCardProps = {
    library: QuestionLibrary
    favorite: boolean
    featured?: boolean
    onFavoriteChange: (libraryId: string) => void
}

function QuestionCard({library, favorite, featured = false, onFavoriteChange}: QuestionCardProps) {
    return (
        <article
            aria-label={`${library.title} 知识库`}
            className={cn(
                "group relative flex min-h-48 flex-col rounded-2xl border bg-card/95 p-4 shadow-[0_10px_28px_rgb(105_64_38/4%)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgb(171_82_31/8%)]",
                favorite ? "border-primary/30 bg-[#fffaf6]" : "border-border/45 hover:border-primary/25",
                featured && "sm:min-h-48",
            )}
        >
            <QuestionLibraryFavoriteButton
                title={library.title}
                favorite={favorite}
                onClick={() => onFavoriteChange(library.id)}
                className="right-3 top-3"
            />

            <div className="flex min-w-0 items-start gap-3 pr-9">
                <span className={cn("grid size-14 shrink-0 place-items-center rounded-xl", library.iconClassName)}>
                    <QuestionLibraryIcon icon={library.icon}/>
                </span>
                <div className="min-w-0 pt-1">
                    <h3 className="text-lg font-semibold text-[#111827]">{library.title}</h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-5.5 text-muted-foreground">{library.description}</p>
                </div>
            </div>

            <p className="mt-4 truncate text-xs text-muted-foreground/80">{library.topics.join(" · ")}</p>

            <div className="mt-auto flex items-center gap-3 pt-4">
                <span className="text-sm text-foreground/65">{library.questionCount} 道面试题</span>
                <Link
                    to={`/questions/${library.id}`}
                    className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-lg border border-primary/35 px-3.5 text-sm font-medium text-primary transition hover:bg-secondary"
                >
                    进入题库
                    <ArrowRight aria-hidden="true" className="size-4"/>
                </Link>
            </div>
        </article>
    )
}

export {QuestionCard}
