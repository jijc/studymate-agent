import {ArrowRight, Check, Sparkles, Upload} from "lucide-react"

import heroInterview from "@/assets/image/hero-interview.png"
import {Button} from "@/components/ui/button"

const benefits = ["更真实的模拟体验", "个性化的面试题目", "可量化的能力提升"]

function HeroSection() {
    return (
        <section className="grid items-center gap-8 xl:min-h-[470px] xl:grid-cols-[44%_56%] xl:gap-0">
            <div
                className="relative z-10 mx-auto flex w-full max-w-[640px] flex-col items-center text-center xl:mx-0 xl:max-w-none xl:items-start xl:text-left xl:-mt-2">
                <div
                    className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary/65 px-4 py-2 text-sm font-medium text-primary sm:text-[15px]">
                    <Sparkles aria-hidden="true" className="size-4 fill-primary/15"/>
                    AI 面试陪练 · 更从容的职场起点
                </div>

                <h1 className="font-heading text-[44px] font-black leading-[1.07] tracking-[-0.045em] text-foreground sm:text-[56px] xl:text-[64px]">
                    <span className="block">让 AI 成为你的</span>
                    <span className="mt-1 block text-primary">面试陪练</span>
                </h1>

                <p className="mt-5 max-w-[520px] text-[17px] leading-[1.7] text-foreground/75 sm:text-[20px]">
                    上传简历、项目资料或职位 JD，
                    <br className="hidden sm:block"/>
                    为你生成个性化的面试练习，真实模拟，助你自信上场。
                </p>

                <div className="mt-6 grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:gap-4">
                    <Button
                        size="lg"
                        className="h-12 min-w-0 rounded-2xl px-3 text-[15px] font-semibold shadow-press hover:shadow-press-hover sm:min-w-[190px] sm:px-6 sm:text-[17px] xl:h-16 xl:min-w-[218px] xl:rounded-3xl xl:px-8 xl:text-[20px]"
                    >
                        开始练习
                        <ArrowRight aria-hidden="true" className="ml-2 size-5"/>
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="h-12 min-w-0 rounded-2xl border-primary/40 bg-card/65 px-3 text-[15px] font-semibold text-primary shadow-none hover:border-primary hover:bg-secondary/70 sm:min-w-[190px] sm:px-6 sm:text-[17px] xl:h-16 xl:min-w-[218px] xl:rounded-3xl xl:px-8 xl:text-[20px]"
                    >
                        <Upload aria-hidden="true" className="mr-2 size-5"/>
                        上传简历
                    </Button>
                </div>

                <div
                    className="mt-7 grid w-full gap-3 text-[15px] text-foreground/75 sm:w-auto sm:grid-cols-3 sm:gap-7">
                    {benefits.map((benefit) => (
                        <div key={benefit}
                             className="flex items-center justify-center gap-2 whitespace-nowrap xl:justify-start">
                            <span
                                className="grid size-6 place-items-center rounded-full bg-primary text-primary-foreground shadow-[0_2px_0_var(--button-shadow)]">
                                <Check aria-hidden="true" className="size-3.5 stroke-[3]"/>
                            </span>
                            {benefit}
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative -my-5 hidden h-[400px] overflow-visible xl:block">
                <img
                    src={heroInterview}
                    alt="StudyMate AI 模拟面试界面"
                    className="absolute left-[45%] top-[45%] w-[85%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none"
                />
            </div>
        </section>
    )
}

export {HeroSection}
