import {ArrowRight, ChevronRight, Clock3, FileText} from "lucide-react"

import {recentPractice} from "@/data/reportOverview"

const badgeStyles = {
    orange: "bg-[#fff0e8] text-primary",
    blue: "bg-[#edf2ff] text-[#5e78db]",
}

function RecentPracticeList() {
    return (
        <section
            id="recent-practice"
            aria-label="最近练习"
            className="mt-4 rounded-2xl border border-border/45 bg-card/85 px-5 py-2 shadow-[0_10px_30px_rgb(111_68_40/5%)]"
        >
            <div className="flex items-center justify-between gap-4 border-b border-border/45 pb-2">
                <div className="flex min-w-0 items-center gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                        <Clock3 aria-hidden="true" className="size-4"/>
                    </span>
                    <h2 className="text-base font-semibold">最近练习</h2>
                    <p className="hidden truncate text-xs text-muted-foreground sm:block">回顾你的练习记录，保持学习节奏</p>
                </div>
                <button type="button" className="flex h-8 shrink-0 items-center gap-1 rounded-full border border-primary/55 px-3 text-xs font-medium text-primary">
                    查看全部
                    <ArrowRight aria-hidden="true" className="size-3.5"/>
                </button>
            </div>

            <div className="divide-y divide-border/40">
                {recentPractice.map((item) => (
                    <article
                        key={item.title}
                        className="grid min-h-10 grid-cols-[2rem_minmax(10rem,1.5fr)_minmax(6rem,0.85fr)_minmax(5rem,0.8fr)_4rem_minmax(5rem,0.65fr)_1rem] items-center gap-3 text-xs max-lg:grid-cols-[2rem_1fr_auto]"
                    >
                        <span className="grid size-7 place-items-center rounded-full bg-[#fff2e9] text-primary">
                            <FileText aria-hidden="true" className="size-4"/>
                        </span>
                        <h3 className="truncate text-sm font-medium">{item.title}</h3>
                        <span className={`w-fit rounded-lg px-2.5 py-1 text-[11px] font-medium ${badgeStyles[item.tone]}`}>
                            {item.type}
                        </span>
                        <span className="text-muted-foreground max-lg:hidden">{item.date}</span>
                        <span className="font-semibold text-[#19a552] max-lg:hidden">{item.score} 分</span>
                        <span className="flex items-center gap-1.5 text-muted-foreground max-lg:hidden">
                            <Clock3 aria-hidden="true" className="size-3.5"/>
                            {item.duration}
                        </span>
                        <ChevronRight aria-hidden="true" className="size-4 text-muted-foreground max-lg:hidden"/>
                    </article>
                ))}
            </div>
        </section>
    )
}

export {RecentPracticeList}
