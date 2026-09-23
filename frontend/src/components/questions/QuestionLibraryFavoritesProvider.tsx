import {useState, type ReactNode} from "react"

import {QuestionLibraryFavoritesContext} from "@/components/questions/QuestionLibraryFavoritesContext"
import {defaultFavoriteLibraryIds} from "@/data/questionLibraries"

function QuestionLibraryFavoritesProvider({children}: {children: ReactNode}) {
    const [favoriteIds, setFavoriteIds] = useState(() => new Set(defaultFavoriteLibraryIds))

    function toggleFavorite(libraryId: string) {
        setFavoriteIds((current) => {
            const next = new Set(current)
            if (next.has(libraryId)) next.delete(libraryId)
            else next.add(libraryId)
            return next
        })
    }

    return (
        <QuestionLibraryFavoritesContext.Provider value={{favoriteIds, toggleFavorite}}>
            {children}
        </QuestionLibraryFavoritesContext.Provider>
    )
}

export {QuestionLibraryFavoritesProvider}
