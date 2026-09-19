import {InterviewStep} from "@/components/home/InterviewStep"

const steps = [
    {title: "上传资料", description: "简历或目标岗位 JD"},
    {title: "生成题库", description: "获得匹配你的题目"},
    {title: "答题评分", description: "看懂回答与薄弱点"},
    {title: "薄弱点强化", description: "针对弱项持续练习"},
]

function StepsSection() {
    return (
        <section aria-labelledby="steps-title" className="pb-8 pt-16 xl:pb-10 xl:pt-14">
            <h2 id="steps-title" className="text-xl font-bold tracking-tight text-foreground">
                四步形成专属训练闭环
            </h2>

            <ol aria-labelledby="steps-title" className="mt-8 grid lg:grid-cols-4">
                {steps.map((step, index) => (
                    <InterviewStep
                        key={step.title}
                        {...step}
                        number={index + 1}
                        showConnector={index < steps.length - 1}
                    />
                ))}
            </ol>
        </section>
    )
}

export {StepsSection}
