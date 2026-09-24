import {useState} from "react"
import {ArrowRight, BookOpenCheck, BriefcaseBusiness, Check, FileText} from "lucide-react"
import {Link} from "react-router"

import {Button} from "@/components/ui/button"
import {BasicPracticeLibraryOption} from "@/components/practice/BasicPracticeLibraryOption"
import {practiceEntryIconClassName} from "@/components/practice/practiceStyles"
import {useQuestionLibraryFavorites} from "@/components/questions/QuestionLibraryFavoritesContext"
import {jdLibraries, resumeLibraries} from "@/data/aiLibraries"
import {questionLibraries} from "@/data/questionLibraries"
import type {PracticeSource} from "@/data/practiceSession"
import {useStartPracticeSession} from "@/hooks/useStartPracticeSession"
import {cn} from "@/lib/utils"

const sectionContent = {
    resume: {title: "简历专练", description: "围绕你的项目经历和技术背景练习。", icon: FileText},
    jd: {title: "JD 专练", description: "针对目标岗位的招聘要求练习。", icon: BriefcaseBusiness},
    basic: {title: "选择技能", description: "选择一个 IT 技术方向，练习站内基础题。", icon: BookOpenCheck},
} as const

function getLibraries(source: Exclude<PracticeSource, "basic">) {
    return (source === "resume" ? resumeLibraries : jdLibraries)
        .map(({id, title, subtitle}) => ({id, title, detail: subtitle}))
}

function PracticeLibrarySection({source}: {source: PracticeSource}) {
    const {startPracticeSession, isStarting, startError} = useStartPracticeSession()
    const {favoriteIds, toggleFavorite} = useQuestionLibraryFavorites()
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const basicLibraries = [
        ...questionLibraries.filter((library) => favoriteIds.has(library.id)),
        ...questionLibraries.filter((library) => !favoriteIds.has(library.id)),
    ]
    const personalLibraries = source === "basic" ? [] : getLibraries(source)
    const libraries = source === "basic" ? basicLibraries : personalLibraries
    const selected = libraries.find((library) => library.id === selectedId)
    const {title, description, icon: Icon} = sectionContent[source]

    return (
        <section aria-label={title} className="rounded-2xl border border-border/70 bg-card/90 p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                    <span className={practiceEntryIconClassName}>
                        <Icon aria-hidden="true" className="size-5"/>
                    </span>
                    <div>
                        <h3 className="text-base font-semibold sm:text-lg">{title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                    </div>
                </div>
                <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">{libraries.length} 个可选</span>
            </div>

            <div role="radiogroup" aria-label={`${title}题库`} className={cn("mt-5 grid gap-2.5", source === "basic" ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2")}>
                {source === "basic" ? basicLibraries.map((library) => (
                    <BasicPracticeLibraryOption
                        key={library.id}
                        library={library}
                        selected={selectedId === library.id}
                        favorite={favoriteIds.has(library.id)}
                        onSelect={() => setSelectedId(library.id)}
                        onFavoriteChange={() => toggleFavorite(library.id)}
                    />
                )) : personalLibraries.map((library) => (
                    <label
                        key={library.id}
                        className={cn(
                            "relative flex min-h-20 min-w-0 cursor-pointer items-start gap-3 rounded-xl border py-3 pl-4 pr-10 text-left transition focus-within:ring-3 focus-within:ring-primary/20",
                            selectedId === library.id
                                ? "border-primary bg-primary/5"
                                : "border-border/70 bg-card hover:border-primary/35 hover:bg-secondary/20",
                        )}
                    >
                        <input
                            type="radio"
                            name={`practice-library-${source}`}
                            value={library.id}
                            checked={selectedId === library.id}
                            onChange={() => setSelectedId(library.id)}
                            aria-label={`选择 ${library.title} 题库`}
                            className="sr-only"
                        />
                        <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold">{library.title}</span>
                            <span className="mt-1 block line-clamp-2 text-xs leading-5 text-muted-foreground">{library.detail}</span>
                        </span>
                        <span className={cn(
                            "absolute bottom-3 right-[18px] grid size-4 place-items-center rounded-full border",
                            selectedId === library.id ? "border-primary bg-primary text-primary-foreground" : "border-border",
                        )}>
                            {selectedId === library.id && <Check aria-hidden="true" className="size-3"/>}
                        </span>
                    </label>
                ))}
                {libraries.length === 0 && <p className="col-span-full rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">暂无可练习的题库</p>}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
                <div className="min-w-0 text-sm">
                    <p className={selected ? "font-medium text-foreground" : "text-muted-foreground"}>
                        {selected ? `已选择 ${selected.title}` : "选择上方题库后即可开始"}
                    </p>
                    {source !== "basic" && <Link to="/questions/ai" className="mt-1 inline-block text-xs font-medium text-primary hover:underline">还没有合适的题库？去新建</Link>}
                </div>
                {startError && <p role="alert" className="text-sm text-destructive">{startError.message}</p>}
                <Button type="button" disabled={!selected || isStarting} onClick={() => {if (selected) startPracticeSession({source, libraryId: selected.id})}} className="h-10 px-5">
                    {isStarting ? "正在进入..." : "开始练习"}<ArrowRight aria-hidden="true" className="size-4"/>
                </Button>
            </div>
        </section>
    )
}

export {PracticeLibrarySection}
