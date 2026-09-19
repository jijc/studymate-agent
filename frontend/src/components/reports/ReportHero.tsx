import {Sparkles} from "lucide-react"

function ReportHero() {
    return (
        <section id="overview" className="relative pb-6" aria-labelledby="report-title">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="grid size-7 place-items-center rounded-full bg-[#fff0d7] text-[#f1a321]">
                    <Sparkles aria-hidden="true" className="size-4"/>
                </span>
                你好，加油学习！
            </div>

            <h1 id="report-title" className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl xl:text-[40px]">
                持续练习，让<span className="text-primary">更好的你</span>发生
            </h1>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                用数据记录成长，发现薄弱点，针对性提升，离理想 Offer 更进一步！
            </p>

            <p className="absolute right-5 top-7 hidden rotate-[-7deg] text-center font-serif text-sm italic leading-7 text-[#b98270] 2xl:block">
                小小的坚持，
                <br/>
                会带来大大的改变。
            </p>
        </section>
    )
}

export {ReportHero}
