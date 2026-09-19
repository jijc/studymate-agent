import {PracticeModeCard} from "@/components/practice/PracticeModeCard"
import type {PracticeMode} from "@/data/practiceOverview"

function PracticeModeGrid({modes}: {modes: PracticeMode[]}) {
    return (
        <section id="practice-modes" aria-label="练习方式" className="scroll-mt-24">
            <div className="mb-4 flex items-end justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold">选择练习方式</h2>
                    <p className="mt-1 text-sm text-muted-foreground">不同来源独立出题，所有有效结果共同完善你的能力画像。</p>
                </div>
                <span className="hidden text-xs text-muted-foreground sm:block">默认每组 10 题</span>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
                {modes.map((mode) => <PracticeModeCard key={mode.id} mode={mode}/>) }
            </div>
        </section>
    )
}

export {PracticeModeGrid}
