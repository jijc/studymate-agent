type InterviewStepProps = {
    number: number
    title: string
    description: string
    showConnector: boolean
}

function InterviewStep({number, title, description, showConnector}: InterviewStepProps) {
    return (
        <li className="relative flex min-w-0 items-start gap-4 pb-7 last:pb-0 lg:flex-col lg:items-center lg:gap-3 lg:pb-0 lg:text-center">
            <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-primary text-base font-bold text-primary-foreground shadow-sm">
                {number}
            </span>
            <div className="pt-0.5 lg:pt-0">
                <h3 className="text-base font-bold text-foreground">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
            {showConnector && (
                <span aria-hidden="true" className="absolute bottom-0 left-[21px] top-11 w-px bg-primary/30 lg:bottom-auto lg:left-[calc(50%+22px)] lg:top-[22px] lg:h-px lg:w-[calc(100%-44px)]"/>
            )}
        </li>
    )
}

export {InterviewStep}
