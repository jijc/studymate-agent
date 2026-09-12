import {BarChart3, FileText, Target} from "lucide-react"

import {CapabilityCard} from "@/components/home/CapabilityCard"

const capabilities = [
    {
        title: "个性化面试题目",
        description: "基于你的简历、项目经历或 JD，生成专属面试题。",
        icon: FileText,
    },
    {
        title: "贴合岗位要求",
        description: "深度理解职位 JD，聚焦核心考点，练出真实水平。",
        icon: Target,
    },
    {
        title: "弱项分析与建议",
        description: "AI 评估你的表现，定位薄弱环节，给出改进建议。",
        icon: BarChart3,
    },
]

function CapabilitiesSection() {
    return (
        <section
            aria-label="核心能力"
            className="mx-auto mt-10 grid w-full max-w-xl gap-4 xl:mt-1 xl:max-w-none xl:grid-cols-3 xl:gap-5"
        >
            {capabilities.map((capability) => (
                <CapabilityCard key={capability.title} {...capability}/>
            ))}
        </section>
    )
}

export {CapabilitiesSection}
