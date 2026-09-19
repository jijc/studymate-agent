import {Sparkles} from "lucide-react"

import {CreateLibraryDialog} from "@/components/questions/CreateLibraryDialog"

function AiLibraryHero() {
    return (
        <section className="flex flex-col gap-4 border-b border-border/55 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
                <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
                    <Sparkles aria-hidden="true" className="size-5"/>
                </span>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">AI 题库</h1>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                        根据简历、招聘信息和真实练习结果，生成只属于你的面试题库。
                    </p>
                </div>
            </div>
            <CreateLibraryDialog/>
        </section>
    )
}

export {AiLibraryHero}
