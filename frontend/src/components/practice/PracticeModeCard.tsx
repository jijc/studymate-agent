import {ArrowRight, BookOpenCheck, BriefcaseBusiness, FileText, LockKeyhole, Sparkles} from "lucide-react"
import {Link} from "react-router"

import {Button} from "@/components/ui/button"
import type {PracticeMode, PracticeModeId} from "@/data/practiceOverview"
import {cn} from "@/lib/utils"

const modeIcons: Record<PracticeModeId, typeof Sparkles> = {
    smart: Sparkles,
    resume: FileText,
    jd: BriefcaseBusiness,
    basic: BookOpenCheck,
}

function PracticeModeCard({mode}: {mode: PracticeMode}) {
    const Icon = modeIcons[mode.id]

    return (
        <article
            id={mode.id === "basic" ? "basic-practice" : undefined}
            aria-label={mode.title}
            aria-disabled={mode.locked || undefined}
            className={cn(
                "relative flex min-h-64 flex-col overflow-hidden rounded-2xl border bg-card/82 p-5 transition",
                mode.id === "smart"
                    ? "border-primary/25 bg-[linear-gradient(145deg,rgba(255,253,249,0.96),rgba(255,237,222,0.78))]"
                    : "border-border/70 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-soft",
            )}
        >
            {mode.id === "smart" && <div aria-hidden="true" className="absolute -right-12 -top-16 size-44 rounded-full bg-primary/8 blur-2xl"/>}

            <div className="relative flex items-start justify-between gap-4">
                <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl", mode.id === "smart" ? "bg-primary text-primary-foreground" : "bg-secondary/70 text-primary")}>
                    <Icon aria-hidden="true" className="size-5"/>
                </span>
                <span className={cn(
                    "rounded-full bg-muted px-2.5 py-1 font-medium",
                    mode.id === "smart" ? "bg-primary/10 text-base font-semibold text-primary" : "text-xs text-muted-foreground",
                )}>{mode.eyebrow}</span>
            </div>

            <div className="relative mt-4">
                <h2 className="text-lg font-semibold">{mode.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{mode.description}</p>
            </div>

            <div className="relative mt-4 flex flex-wrap gap-1.5">
                {mode.tags.map((tag) => <span key={tag} className="rounded-md bg-muted/85 px-2 py-1 text-xs text-muted-foreground">{tag}</span>)}
            </div>

            {mode.locked && (
                <div className="relative mt-4">
                    <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-muted-foreground"><LockKeyhole aria-hidden="true" className="size-3.5"/>解锁进度</span>
                        <strong className="text-sm text-primary">6/10</strong>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full w-3/5 rounded-full bg-primary"/>
                    </div>
                </div>
            )}

            <div className="relative mt-auto flex items-end justify-between gap-3 pt-5">
                <span className="max-w-52 text-xs leading-5 text-muted-foreground">{mode.meta}</span>
                {mode.locked ? (
                    <Button disabled variant="secondary" className="h-11 px-5">
                        <LockKeyhole aria-hidden="true"/>
                        {mode.actionLabel}
                    </Button>
                ) : (
                    <Button render={<Link to={mode.href}/>} nativeButton={false} variant="outline" className="h-11 px-5">
                        {mode.actionLabel}
                        <ArrowRight aria-hidden="true"/>
                    </Button>
                )}
            </div>
        </article>
    )
}

export {PracticeModeCard}
