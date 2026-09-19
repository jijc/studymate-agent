import {Bookmark, Library} from "lucide-react"

import {QuestionCard} from "@/components/questions/QuestionCard"
import type {QuestionLibrary} from "@/data/questionLibraries"
import {cn} from "@/lib/utils"

type QuestionLibrarySectionProps = {
    title: "我的收藏" | "全部知识库"
    description: string
    libraries: QuestionLibrary[]
    favoriteIds: Set<string>
    onFavoriteChange: (libraryId: string) => void
}

function QuestionLibrarySection({title, description, libraries, favoriteIds, onFavoriteChange}: QuestionLibrarySectionProps) {
    const favoriteSection = title === "我的收藏"
    const SectionIcon = favoriteSection ? Bookmark : Library

    return (
        <section aria-label={title} id={favoriteSection ? "favorite-libraries" : "all-libraries"} className="grid gap-4">
            <div className="flex items-start gap-3">
                <span className={cn("mt-0.5 grid size-8 place-items-center rounded-lg", favoriteSection ? "bg-secondary text-primary" : "bg-card text-foreground/75")}>
                    <SectionIcon aria-hidden="true" className={cn("size-4.5", favoriteSection && "fill-current")}/>
                </span>
                <div>
                    <h2 className="text-xl font-semibold text-[#111827]">{title}</h2>
                    <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
                </div>
            </div>

            <div
                data-testid={favoriteSection ? undefined : "all-library-grid"}
                className={cn("grid gap-3", favoriteSection ? "lg:grid-cols-3" : "md:grid-cols-2 xl:grid-cols-4")}
            >
                {libraries.map((library) => (
                    <QuestionCard
                        key={library.id}
                        library={library}
                        favorite={favoriteIds.has(library.id)}
                        featured={favoriteSection}
                        onFavoriteChange={onFavoriteChange}
                    />
                ))}
            </div>
        </section>
    )
}

export {QuestionLibrarySection}
