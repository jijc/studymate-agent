import {ArrowUp, ClipboardList, Flame, Star} from "lucide-react"

const summaryCards = [
    {
        title: "本周练习",
        value: "12",
        unit: "次",
        icon: ClipboardList,
        iconClassName: "bg-[#ffe4d2] text-primary",
        filled: false,
        badge: "+33%",
        helper: "较上周",
    },
    {
        title: "平均得分",
        value: "78",
        unit: "分",
        icon: Star,
        iconClassName: "bg-[#fff1cf] text-[#f6a313]",
        filled: true,
        badge: "+12%",
        helper: "较上周",
    },
    {
        title: "连续天数",
        value: "7",
        unit: "天",
        icon: Flame,
        iconClassName: "bg-[#ffe5d8] text-[#fb5b22]",
        filled: true,
        badge: "连续中",
        helper: "再接再厉！",
    },
]

function ReportSummaryCards() {
    return (
        <section aria-label="学习概览" className="grid gap-3 md:grid-cols-3">
            {summaryCards.map((item) => {
                const Icon = item.icon

                return (
                    <article
                        key={item.title}
                        className="flex min-h-[120px] items-center rounded-2xl border border-border/45 bg-card/80 px-5 py-4 shadow-[0_10px_30px_rgb(111_68_40/5%)]"
                    >
                        <span className={`grid size-16 shrink-0 place-items-center rounded-2xl ${item.iconClassName}`}>
                            <Icon aria-hidden="true" className="size-8" fill={item.filled ? "currentColor" : "none"}/>
                        </span>

                        <div className="ml-4 min-w-0">
                            <p className="text-sm font-medium text-foreground/80">{item.title}</p>
                            <p className="mt-0.5 text-3xl font-semibold tracking-tight">
                                {item.value} <span className="text-base font-medium">{item.unit}</span>
                            </p>
                        </div>

                        <div className="ml-auto text-right">
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#fff1e8] px-3 py-1.5 text-xs font-semibold text-[#f15f28]">
                                {item.title !== "连续天数" && <ArrowUp aria-hidden="true" className="size-3.5"/>}
                                {item.badge}
                            </span>
                            <p className="mt-2 text-xs text-muted-foreground">{item.helper}</p>
                        </div>
                    </article>
                )
            })}
        </section>
    )
}

export {ReportSummaryCards}
