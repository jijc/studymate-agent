import {BrainCircuit, CheckCircle2} from "lucide-react"

function PracticeHero() {
    return (
        <section className="flex flex-col gap-4 border-b border-border/55 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <BrainCircuit aria-hidden="true" className="size-4"/>
                    AI 会从每次有效作答中认识你
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">今天想练什么？</h1>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                    选择一个方向开始，每次默认 10 题。<strong className="font-semibold text-foreground">提交答案并获得 AI 评分</strong>后，
                    才会计入<strong className="ml-1 font-semibold text-primary">专属 AI 题库</strong>的解锁进度。
                </p>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-xl border border-primary/15 bg-card/75 px-4 py-3">
                <CheckCircle2 aria-hidden="true" className="size-5 text-primary"/>
                <div>
                    <p className="text-xs text-muted-foreground">本周有效练习</p>
                    <p className="font-semibold">26 道 · 连续 3 天</p>
                </div>
            </div>
        </section>
    )
}

export {PracticeHero}
