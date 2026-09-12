import type {LucideIcon} from "lucide-react"

type CapabilityCardProps = {
    title: string
    description: string
    icon: LucideIcon
}

function CapabilityCard({title, description, icon: Icon}: CapabilityCardProps) {
    return (
        <article className="flex min-h-36 w-full items-center gap-4 rounded-lg border border-border bg-card/90 p-5 shadow-soft backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 sm:gap-6 sm:px-7">
            <div className="grid size-20 shrink-0 place-items-center rounded-lg bg-secondary/80 text-primary">
                <Icon aria-hidden="true" className="size-10 stroke-2"/>
            </div>
            <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>
                <p className="mt-1 text-base leading-relaxed text-muted-foreground">{description}</p>
            </div>
        </article>
    )
}

export {CapabilityCard}
