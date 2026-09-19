import {ArrowRight, LockKeyhole, Sparkles} from "lucide-react"
import {Link} from "react-router"

import {Button} from "@/components/ui/button"

function ExclusiveAiLibraryCard() {
    return (
        <section aria-label="专属 AI 题库" className="relative overflow-hidden rounded-2xl border border-primary/20 bg-[linear-gradient(120deg,rgba(255,253,249,0.96),rgba(255,237,222,0.82))] p-5 sm:p-6">
            <div aria-hidden="true" className="absolute -right-16 -top-20 size-56 rounded-full bg-primary/8 blur-2xl"/>
            <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-center">
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                            <Sparkles aria-hidden="true" className="size-5"/>
                        </span>
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h2 className="text-lg font-semibold">专属 AI 题库</h2>
                                <span className="rounded-full bg-card/80 px-2 py-0.5 text-xs font-medium text-primary">待解锁</span>
                            </div>
                            <p className="mt-0.5 text-sm text-muted-foreground">
                                根据你的练习薄弱点<strong className="ml-1 font-semibold text-primary">自动生成</strong>
                            </p>
                        </div>
                    </div>

                    <p className="mt-4 max-w-2xl text-sm leading-6 text-foreground/75">
                        完成 <strong className="font-semibold text-foreground">基础、简历或 JD 专项练习</strong>并获得
                        <strong className="mx-1 font-semibold text-primary">AI 评分</strong>后，系统会逐步认识你的薄弱点。
                    </p>
                </div>

                <div className="rounded-xl border border-white/70 bg-card/80 p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex items-center gap-2 font-medium"><LockKeyhole aria-hidden="true" className="size-4 text-primary"/>解锁进度</span>
                        <strong className="text-base text-primary">6/10</strong>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full w-3/5 rounded-full bg-primary"/>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="text-xs text-muted-foreground">再完成 4 道有效练习</span>
                        <Button render={<Link to="/practice"/>} nativeButton={false} size="sm">
                            去练习
                            <ArrowRight aria-hidden="true"/>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export {ExclusiveAiLibraryCard}
