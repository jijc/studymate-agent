import {Check} from "lucide-react"

import {QuestionLibraryFavoriteButton} from "@/components/questions/QuestionLibraryFavoriteButton"
import {QuestionLibraryIcon} from "@/components/questions/QuestionLibraryIcon"
import type {QuestionLibrary} from "@/data/questionLibraries"
import {cn} from "@/lib/utils"

type BasicPracticeLibraryOptionProps = {
    library: QuestionLibrary
    selected: boolean
    favorite: boolean
    onSelect: () => void
    onFavoriteChange: () => void
}

function BasicPracticeLibraryOption({library, selected, favorite, onSelect, onFavoriteChange}: BasicPracticeLibraryOptionProps) {
    return (
        <div className={cn(
            "relative min-w-0 rounded-xl border transition focus-within:ring-3 focus-within:ring-primary/20",
            selected ? "border-primary bg-primary/5" : favorite ? "border-primary/25 bg-[#fffaf6]" : "border-border/70 bg-card hover:border-primary/35 hover:bg-secondary/20",
        )}>
            <label className="relative flex min-h-20 min-w-0 cursor-pointer items-center gap-3 py-3 pl-3 pr-9 text-left">
                <input
                    type="radio"
                    name="practice-library-basic"
                    value={library.id}
                    checked={selected}
                    onChange={onSelect}
                    aria-label={`选择 ${library.title} 题库`}
                    className="sr-only"
                />
                <span className={cn("grid size-10 shrink-0 place-items-center rounded-lg", library.iconClassName)}>
                    <QuestionLibraryIcon icon={library.icon} label={`${library.title} 技术图标`} className="size-6"/>
                </span>
                <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{library.title}</span>
                    <span className="mt-1 block line-clamp-2 text-xs leading-5 text-muted-foreground">{library.description}</span>
                </span>
                <span className={cn(
                    "absolute bottom-3 right-[18px] grid size-4 place-items-center rounded-full border",
                    selected ? "border-primary bg-primary text-primary-foreground" : "border-border",
                )}>
                    {selected && <Check aria-hidden="true" className="size-3"/>}
                </span>
            </label>
            <QuestionLibraryFavoriteButton
                title={library.title}
                favorite={favorite}
                onClick={onFavoriteChange}
                className="right-2.5 top-2.5 z-10"
            />
        </div>
    )
}

export {BasicPracticeLibraryOption}
