import {BarChart3, ChevronDown} from "lucide-react"
import {Area, AreaChart, CartesianGrid, ReferenceDot, Tooltip, XAxis, YAxis} from "recharts"

import {progressTrend} from "@/data/reportOverview"

function ProgressTrendChart() {
    return (
        <section
            id="progress-trend"
            aria-label="成绩趋势"
            className="min-w-0 rounded-2xl border border-border/45 bg-card/85 p-5 shadow-[0_10px_30px_rgb(111_68_40/5%)]"
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <BarChart3 aria-hidden="true" className="size-5 text-primary"/>
                        成绩趋势
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">每一次练习，都是进步的积累</p>
                </div>
                <button
                    type="button"
                    className="flex h-8 items-center gap-2 rounded-full border border-border/55 bg-card px-3 text-xs text-foreground/70"
                >
                    近 7 天
                    <ChevronDown aria-hidden="true" className="size-3.5"/>
                </button>
            </div>

            <div className="mt-3 h-[236px] w-full">
                <AreaChart
                    responsive
                    accessibilityLayer
                    data={progressTrend}
                    margin={{top: 20, right: 12, bottom: 0, left: -20}}
                    style={{width: "100%", height: "100%"}}
                >
                    <CartesianGrid stroke="#eadfd6" strokeDasharray="3 3" vertical/>
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: "#8b7a6d", fontSize: 11}}/>
                    <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} axisLine={false} tickLine={false} tick={{fill: "#8b7a6d", fontSize: 11}}/>
                    <Tooltip
                        cursor={{stroke: "#f47a3a", strokeDasharray: "3 3"}}
                        contentStyle={{borderRadius: 12, borderColor: "#eadbcf", fontSize: 12}}
                        formatter={(value) => [`${value} 分`, "得分"]}
                    />
                    <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#f45d22"
                        strokeWidth={3}
                        fill="#ffd9c2"
                        fillOpacity={0.55}
                        dot={{r: 3, fill: "#fffdf9", stroke: "#f45d22", strokeWidth: 2}}
                        activeDot={{r: 6, fill: "#f45d22", stroke: "#fffdf9", strokeWidth: 3}}
                    />
                    <ReferenceDot
                        x="10/20"
                        y={85}
                        r={6}
                        fill="#f45d22"
                        stroke="#fffdf9"
                        strokeWidth={3}
                        label={{value: "85 分", position: "top", fill: "#f45d22", fontSize: 12, fontWeight: 600}}
                    />
                </AreaChart>
            </div>
        </section>
    )
}

export {ProgressTrendChart}
