import type {LucideIcon} from "lucide-react"
import type {ReactNode} from "react"

type ProfileSectionCardProps = {
    children: ReactNode
    description: string
    icon: LucideIcon
    id: string
    title: string
}

function ProfileSectionCard({children, description, icon: Icon, id, title}: ProfileSectionCardProps) {
    return (
        <section
            aria-labelledby={`${id}-title`}
            className="rounded-2xl border border-border/50 bg-card/88 p-5 shadow-[0_12px_34px_rgb(111_68_40/7%)] sm:p-7"
        >
            <div className="flex items-start gap-4 border-b border-border/55 pb-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                    <Icon aria-hidden="true" className="size-5"/>
                </span>
                <div>
                    <h2 id={`${id}-title`} className="text-xl font-semibold text-foreground">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
            </div>

            <div className="pt-6">{children}</div>
        </section>
    )
}

export {ProfileSectionCard}
