import {BriefcaseBusiness, FileText} from "lucide-react"
import {Link} from "react-router"

import type {GeneratedLibrary} from "@/data/aiLibraries"

function GeneratedLibraryCard({library}: {library: GeneratedLibrary}) {
    const Icon = library.kind === "resume" ? FileText : BriefcaseBusiness
    const progress = Math.round((library.completedCount / library.questionCount) * 100)

    return (
        <article aria-label={library.title} className="group flex min-h-56 flex-col rounded-2xl border border-border/70 bg-card/82 p-5 transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-soft">
            <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary/70 text-primary">
                    <Icon aria-hidden="true" className="size-5"/>
                </span>
                <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold">{library.title}</h3>
                    <p className="mt-1 truncate text-xs text-muted-foreground">{library.subtitle}</p>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
                {library.skills.map((skill) => (
                    <span key={skill} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">{skill}</span>
                ))}
            </div>

            <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>已练 {library.completedCount}/{library.questionCount} 题</span>
                    <span>{progress}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary/80" style={{width: `${progress}%`}}/>
                </div>
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                <span className="text-xs text-muted-foreground">更新于 {library.updatedAt}</span>
                <Link to={`/questions/ai/${library.kind}/${library.id}`} className="rounded-md px-2 py-1 text-xs font-medium text-primary transition hover:bg-secondary">
                    查看题目
                </Link>
            </div>
        </article>
    )
}

export {GeneratedLibraryCard}
