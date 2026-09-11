import {BarChart3, FileText, Sparkles} from "lucide-react"

import {InterviewStep} from "@/components/home/InterviewStep"

const steps = [
    {
        title: "上传资料",
        description: "上传简历、项目资料或职位 JD",
        icon: FileText,
    },
    {
        title: "生成专属题目",
        description: "AI 理解你的背景，生成个性化面试题",
        icon: Sparkles,
    },
    {
        title: "开始练习",
        description: "与 AI 进行模拟面试，获取即时反馈",
        icon: BarChart3,
    },
]

function StepsSection() {
    return (
        <section aria-labelledby="steps-title" className="pb-1 pt-8 xl:pt-11">
            <div className="mb-6 flex items-center justify-center gap-7">
                <span className="h-px w-8 bg-primary/70"/>
                <h2 id="steps-title" className="text-center text-[24px] font-bold tracking-[-0.025em] text-foreground sm:text-[26px]">
                    只需 3 步，开启高效面试练习
                </h2>
                <span className="h-px w-8 bg-primary/70"/>
            </div>

            <div className="mx-auto grid w-full max-w-[560px] gap-5 xl:max-w-none xl:grid-cols-3 xl:gap-0">
                {steps.map((step, index) => (
                    <InterviewStep
                        key={step.title}
                        {...step}
                        number={index + 1}
                        showConnector={index < steps.length - 1}
                    />
                ))}
            </div>
        </section>
    )
}

export {StepsSection}
