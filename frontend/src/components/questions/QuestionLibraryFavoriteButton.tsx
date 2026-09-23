import {Bookmark} from "lucide-react"

import {cn} from "@/lib/utils"

type QuestionLibraryFavoriteButtonProps = {
    title: string
    favorite: boolean
    onClick: () => void
    className?: string
}

function QuestionLibraryFavoriteButton({title, favorite, onClick, className}: QuestionLibraryFavoriteButtonProps) {
    return (
        <button
            type="button"
            aria-label={`${favorite ? "取消收藏" : "收藏"} ${title} 知识库`}
            aria-pressed={favorite}
            onClick={onClick}
            className={cn(
                "absolute grid size-8 place-items-center rounded-lg transition focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/20",
                favorite ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-secondary hover:text-primary",
                className,
            )}
        >
            <Bookmark aria-hidden="true" className={cn("size-5", favorite && "fill-current")}/>
        </button>
    )
}

export {QuestionLibraryFavoriteButton}
