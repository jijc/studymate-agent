import {ArrowRight, Library, ShieldCheck} from "lucide-react"
import {Link} from "react-router"

import questionBankHero from "@/assets/image/question-bank-hero.png"
import {Button} from "@/components/ui/button"

function HeroSection() {
    return (
        <section className="grid items-center gap-8 xl:min-h-[440px] xl:grid-cols-[44%_56%] xl:gap-0">
            <div
                className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center xl:mx-0 xl:max-w-none xl:items-start xl:text-left xl:-mt-2">
                <h1
                    aria-label="根据简历和 JD，生成专属面试训练"
                    className="font-heading text-4xl font-black leading-tight tracking-tight text-foreground sm:text-5xl"
                >
                    <span className="block">根据简历和 JD</span>
                    <span className="mt-1 block text-primary">生成专属面试训练</span>
                </h1>

                <p className="mt-5 max-w-lg text-sm leading-7 text-foreground/75 sm:text-base">
                    上传简历或目标岗位 JD，AI 为你生成专属题库。练习后获得评分与薄弱点强化，
                    站内知识库也能随时学习。
                </p>

                <div className="mt-6 grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:gap-4">
                    <Button
                        render={<Link to="/questions/ai"/>}
                        nativeButton={false}
                        size="lg"
                        className="w-full font-semibold sm:w-48 xl:w-52"
                    >
                        生成专属题库
                        <ArrowRight aria-hidden="true" className="ml-2 size-4"/>
                    </Button>
                    <Button
                        render={<Link to="/questions"/>}
                        nativeButton={false}
                        variant="outline"
                        size="lg"
                        className="w-full font-semibold sm:w-48 xl:w-52"
                    >
                        <Library aria-hidden="true" className="mr-2 size-4"/>
                        浏览 IT 题库
                    </Button>
                </div>

                <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                    <ShieldCheck aria-hidden="true" className="size-4 text-primary"/>
                    你的简历与 JD 仅用于生成个人面试训练内容
                </p>
            </div>

            <div className="relative -my-5 hidden h-[400px] overflow-visible xl:block">
                <img
                    src={questionBankHero}
                    alt="AI 题库学习插画"
                    className="absolute left-[48%] top-[48%] w-[90%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none"
                />
            </div>
        </section>
    )
}

export {HeroSection}
