import {Search} from "lucide-react"

import {Button} from "@/components/ui/button"

type QuestionHeroProps = {
    query: string
    onQueryChange: (query: string) => void
}

function QuestionHero({query, onQueryChange}: QuestionHeroProps) {
    return (
        <section className="pb-7 pt-2">
            <div>
                <h1 className="text-3xl font-bold tracking-[-0.035em] text-[#080d19] sm:text-4xl">
                    <span className="text-primary">IT 面试</span>知识库
                </h1>
                <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
                    系统整理常见 IT 面试知识，收藏后自动置顶，帮助你快速查找、理解和复习。
                </p>

                <form
                    role="search"
                    className="mt-4 flex h-12 w-full items-center rounded-xl border border-primary/25 bg-card/90 p-1 pl-4 shadow-[0_8px_24px_rgb(211_112_50/6%)]"
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Search aria-hidden="true" className="mr-3 size-4.5 shrink-0 text-foreground/60"/>
                    <input
                        type="search"
                        aria-label="搜索知识库"
                        value={query}
                        onChange={(event) => onQueryChange(event.target.value)}
                        placeholder="搜索技术栈或知识点，例如 React、Java、Redis"
                        className="h-12 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
                    />
                    <Button type="submit" className="h-10 min-w-24 rounded-lg px-5 font-semibold">
                        搜索
                    </Button>
                </form>
            </div>
        </section>
    )
}

export {QuestionHero}
