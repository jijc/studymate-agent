import {ChartNoAxesColumnIncreasing, FileText, Sparkles, Target} from "lucide-react"

const highlights = [
    {
        title: "个性化题目",
        description: "基于你的简历，定制专属面试题",
        icon: FileText,
    },
    {
        title: "专项题库练习",
        description: "按题作答并回看练习反馈",
        icon: ChartNoAxesColumnIncreasing,
    },
    {
        title: "全面能力提升",
        description: "发现薄弱环节，针对性改进",
        icon: Target,
    },
]

function LoginIntro() {
    return (
        <section className="hidden max-w-xl lg:block">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary/65 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles aria-hidden="true" className="size-4"/>
                AI 专属题库 · 更从容的职场起点
            </div>

            <h1 className="font-heading text-5xl font-black leading-tight tracking-tighter text-foreground sm:text-6xl">
                开始你的
                <span className="block text-primary">下一场面试练习</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                上传简历、项目资料或职位 JD，
                <br className="hidden sm:block"/>
                让 AI 为你生成个性化题库，通过练习与复盘，助你自信上场。
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
                {highlights.map(({title, description, icon: Icon}) => (
                    <article key={title}>
                        <div className="grid size-16 place-items-center rounded-lg border border-border bg-card/80 text-primary shadow-sm">
                            <Icon aria-hidden="true" className="size-8"/>
                        </div>
                        <h2 className="mt-4 text-lg font-semibold text-foreground">{title}</h2>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}

export {LoginIntro}
