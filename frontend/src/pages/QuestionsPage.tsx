import {useState} from "react"
import {SearchX} from "lucide-react"

import {SidebarPageLayout} from "@/components/layout/SidebarPageLayout"
import {sidebarPageContentClassName} from "@/components/layout/pageSidebarStyles"
import {QuestionHero} from "@/components/questions/QuestionHero"
import {QuestionLibrarySection} from "@/components/questions/QuestionLibrarySection"
import {QuestionSidebar} from "@/components/questions/QuestionSidebar"
import {Button} from "@/components/ui/button"
import {defaultFavoriteLibraryIds, questionLibraries} from "@/data/questionLibraries"
import {cn} from "@/lib/utils"

function QuestionsPage() {
    const [query, setQuery] = useState("")
    const [favoriteIds, setFavoriteIds] = useState(() => new Set(defaultFavoriteLibraryIds))
    const normalizedQuery = query.trim().toLocaleLowerCase()
    const visibleLibraries = questionLibraries.filter((library) => (
        [library.title, library.description, ...library.topics]
            .join(" ")
            .toLocaleLowerCase()
            .includes(normalizedQuery)
    ))
    const favoriteLibraries = visibleLibraries.filter((library) => favoriteIds.has(library.id))
    const remainingLibraries = visibleLibraries.filter((library) => !favoriteIds.has(library.id))

    function handleFavoriteChange(libraryId: string) {
        setFavoriteIds((current) => {
            const next = new Set(current)
            if (next.has(libraryId)) {
                next.delete(libraryId)
            } else {
                next.add(libraryId)
            }
            return next
        })
    }

    return (
        <SidebarPageLayout>
            <QuestionSidebar/>

            <main className={cn(sidebarPageContentClassName, "px-5 pb-12 pt-6 sm:px-8 xl:px-10")}>
                <div className="mx-auto max-w-[1340px]">
                    <QuestionHero query={query} onQueryChange={setQuery}/>

                    <div className="space-y-8">
                        {favoriteLibraries.length > 0 && (
                            <QuestionLibrarySection
                                title="我的收藏"
                                description="快速进入你关心的知识库，收藏内容会自动置顶"
                                libraries={favoriteLibraries}
                                favoriteIds={favoriteIds}
                                onFavoriteChange={handleFavoriteChange}
                            />
                        )}

                        {remainingLibraries.length > 0 && (
                            <QuestionLibrarySection
                                title="全部知识库"
                                description="按固定顺序浏览本站整理的 IT 面试知识"
                                libraries={remainingLibraries}
                                favoriteIds={favoriteIds}
                                onFavoriteChange={handleFavoriteChange}
                            />
                        )}

                        {visibleLibraries.length === 0 && (
                            <section aria-label="没有搜索结果" className="grid min-h-64 place-items-center rounded-2xl border border-dashed border-border bg-card/65 px-6 text-center">
                                <div>
                                    <SearchX aria-hidden="true" className="mx-auto size-9 text-primary/70"/>
                                    <h2 className="mt-4 text-lg font-semibold">没有找到相关知识库</h2>
                                    <p className="mt-1 text-sm text-muted-foreground">换一个技术名称或知识点试试。</p>
                                    <Button type="button" variant="outline" className="mt-5" onClick={() => setQuery("")}>清空搜索</Button>
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </main>
        </SidebarPageLayout>
    )
}

export {QuestionsPage}
