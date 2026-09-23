import {createContext, useContext} from "react"

export type QuestionLibraryFavoritesContextValue = {
    favoriteIds: Set<string>
    toggleFavorite: (libraryId: string) => void
}

export const QuestionLibraryFavoritesContext = createContext<QuestionLibraryFavoritesContextValue | null>(null)

export function useQuestionLibraryFavorites() {
    const context = useContext(QuestionLibraryFavoritesContext)
    if (!context) throw new Error("题库收藏组件需要放在 QuestionLibraryFavoritesProvider 内")
    return context
}
