import type {LucideIcon} from "lucide-react"

type CapabilityCardProps = {
    title: string
    description: string
    icon: LucideIcon
}

function CapabilityCard({title, description, icon: Icon}: CapabilityCardProps) {
    return (
        <article className="flex min-h-[142px] w-full items-center gap-4 rounded-3xl border border-card/85 bg-card/90 px-5 py-5 shadow-soft backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 sm:gap-6 sm:px-7">
            <div className="grid size-[82px] shrink-0 place-items-center rounded-3xl bg-secondary/80 text-primary">
                <Icon aria-hidden="true" className="size-10 stroke-[2.5]"/>
            </div>
            <div>
                <h2 className="text-[20px] font-bold tracking-[-0.02em] text-foreground">{title}</h2>
                <p className="mt-1 text-[16px] leading-[1.55] text-muted-foreground">{description}</p>
            </div>
        </article>
    )
}

export {CapabilityCard}
