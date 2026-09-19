import {ArrowRight, Atom, Database, Lightbulb, MessageSquareMore} from "lucide-react"
import {Link} from "react-router"

import {weaknessItems} from "@/data/reportOverview"

const weaknessIcons = [MessageSquareMore, Atom, Database]
const toneStyles = {
    orange: "bg-[#fff0e4] text-primary",
    blue: "bg-[#eef8fb] text-[#23acd8]",
    amber: "bg-[#fff4e5] text-[#ef7d27]",
}

function WeaknessPanel() {
    return (
        <section
            id="weakness-analysis"
            aria-label="薄弱点分析"
            className="min-w-0 rounded-2xl border border-border/45 bg-card/85 p-5 shadow-[0_10px_30px_rgb(111_68_40/5%)]"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <span className="grid size-7 place-items-center rounded-full bg-[#fff0c8] text-[#efaa14]">
                            <Lightbulb aria-hidden="true" className="size-4"/>
                        </span>
                        薄弱点分析
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">针对薄弱点，推荐专项练习</p>
                </div>
                <Link to="/practice" className="flex h-8 items-center gap-1 rounded-full border border-primary/55 px-3 text-xs font-medium text-primary transition hover:bg-secondary">
                    去强化练习
                    <ArrowRight aria-hidden="true" className="size-3.5"/>
                </Link>
            </div>

            <ol className="mt-3 divide-y divide-border/45">
                {weaknessItems.map((item, index) => {
                    const Icon = weaknessIcons[index]

                    return (
                        <li key={item.title} className="grid grid-cols-[1.6rem_2.8rem_1fr_auto] items-center gap-3 py-3">
                            <span className="grid size-6 place-items-center rounded-full bg-[#fff1d9] text-xs font-semibold text-[#e99020]">
                                {index + 1}
                            </span>
                            <span className={`grid size-11 place-items-center rounded-xl ${toneStyles[item.tone]}`}>
                                <Icon aria-hidden="true" className="size-5"/>
                            </span>
                            <div className="min-w-0">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="truncate text-sm font-semibold">{item.title}</p>
                                    <span className="shrink-0 text-sm font-semibold">{item.score} 分</span>
                                </div>
                                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{item.description}</p>
                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#f5e8dc]">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-[#f45d22] to-[#fb9569]"
                                        style={{width: `${item.score}%`}}
                                    />
                                </div>
                            </div>
                            <ArrowRight aria-hidden="true" className="size-4 text-muted-foreground"/>
                        </li>
                    )
                })}
            </ol>
        </section>
    )
}

export {WeaknessPanel}
