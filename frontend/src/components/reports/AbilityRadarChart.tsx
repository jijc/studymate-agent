import {ChartPie} from "lucide-react"
import {PolarAngleAxis, PolarGrid, Radar, RadarChart, Tooltip} from "recharts"

import {abilityScores} from "@/data/reportOverview"

function AbilityRadarChart() {
    return (
        <section
            id="ability-analysis"
            aria-label="能力分布"
            className="min-w-0 rounded-2xl border border-border/45 bg-card/85 p-5 shadow-[0_10px_30px_rgb(111_68_40/5%)]"
        >
            <h2 className="flex items-center gap-2 text-lg font-semibold">
                <ChartPie aria-hidden="true" className="size-5 text-primary"/>
                能力分布
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">多维度评估你的面试能力</p>

            <div className="mt-2 h-[250px] w-full">
                <RadarChart
                    responsive
                    accessibilityLayer
                    data={abilityScores}
                    outerRadius="66%"
                    style={{width: "100%", height: "100%"}}
                >
                    <PolarGrid stroke="#e7ddd5"/>
                    <PolarAngleAxis
                        dataKey="ability"
                        tick={{fill: "#5f5148", fontSize: 10}}
                    />
                    <Tooltip
                        contentStyle={{borderRadius: 12, borderColor: "#eadbcf", fontSize: 12}}
                        formatter={(value) => [`${value} 分`, "能力得分"]}
                    />
                    <Radar
                        dataKey="score"
                        stroke="#f45d22"
                        strokeWidth={2.5}
                        fill="#f79a62"
                        fillOpacity={0.38}
                        dot={{r: 3, fill: "#f45d22"}}
                    />
                </RadarChart>
            </div>
        </section>
    )
}

export {AbilityRadarChart}
