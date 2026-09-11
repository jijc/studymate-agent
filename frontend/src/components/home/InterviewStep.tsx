import {ArrowRight} from "lucide-react"
import type {LucideIcon} from "lucide-react"

type InterviewStepProps = {
    number: number
    title: string
    description: string
    icon: LucideIcon
    showConnector: boolean
}

function InterviewStep({number, title, description, icon: Icon, showConnector}: InterviewStepProps) {
    return (
        <div className="relative mx-auto flex w-full max-w-[520px] items-center gap-4 px-3 sm:px-5 xl:max-w-none xl:px-9">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-lg font-bold text-secondary-foreground">
                {number}
            </span>
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-card/80 text-primary shadow-soft">
                <Icon aria-hidden="true" className="size-8 stroke-[2.5]"/>
            </span>
            <div className="min-w-0">
                <h3 className="text-[17px] font-bold text-foreground">{title}</h3>
                <p className="mt-0.5 text-[14px] leading-6 text-muted-foreground">{description}</p>
            </div>
            {showConnector && (
                <ArrowRight
                    aria-hidden="true"
                    className="absolute -right-3 top-1/2 hidden size-5 -translate-y-1/2 text-primary/80 xl:block"
                />
            )}
        </div>
    )
}

export {InterviewStep}
