import {ArrowRight, Clock3} from "lucide-react"
import {Link} from "react-router"

import type {PracticeRecord} from "@/data/practiceOverview"

function PracticeHistory({records}: {records: PracticeRecord[]}) {
    return (
        <section aria-label="练习记录列表">
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/82">
                {records.map((record) => (
                    <article key={record.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-5 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-border/60">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="truncate font-medium">{record.title}</h3>
                                <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">{record.type}</span>
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                <span>{record.practicedAt}</span>
                                <span className="flex items-center gap-1"><Clock3 aria-hidden="true" className="size-3.5"/>{record.duration}</span>
                                <span>完成 {record.completed} 题</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-5 sm:justify-end">
                            <div className="text-right">
                                <p className="text-xs text-muted-foreground">平均得分</p>
                                <p className="mt-0.5 text-xl font-semibold text-primary">{record.score}</p>
                            </div>
                            <Link to={`/practice/records/${record.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                                查看复盘
                                <ArrowRight aria-hidden="true" className="size-4"/>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export {PracticeHistory}
