import {AbilityRadarChart} from "@/components/reports/AbilityRadarChart"
import {ProgressTrendChart} from "@/components/reports/ProgressTrendChart"
import {ReportHero} from "@/components/reports/ReportHero"
import {ReportSummaryCards} from "@/components/reports/ReportSummaryCards"
import {WeaknessPanel} from "@/components/reports/WeaknessPanel"

function ReportsPage() {
    return (
        <main className="mx-auto min-h-[calc(100dvh-66px)] w-full max-w-[1480px] px-5 pb-8 pt-7 sm:px-8">
            <ReportHero/>
            <ReportSummaryCards/>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1.2fr_0.94fr_1.08fr]">
                <ProgressTrendChart/>
                <AbilityRadarChart/>
                <WeaknessPanel/>
            </div>
        </main>
    )
}

export {ReportsPage}
