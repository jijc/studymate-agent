import {FileText, Library, MessageCircle} from "lucide-react"

import {CapabilityCard} from "@/components/home/CapabilityCard"

const capabilities = [
    {
        title: "AI 专属题库",
        description: "结合简历与目标岗位 JD，生成更贴近你的面试题。",
        icon: FileText,
    },
    {
        title: "站内知识库",
        description: "学习本站整理的各类 IT 高频面试题与答案。",
        icon: Library,
    },
    {
        title: "练习与反馈",
        description: "文字或语音模拟面试，AI 评分定位薄弱点，持续生成强化练习。",
        icon: MessageCircle,
    },
]

function CapabilitiesSection() {
    return (
        <section
            aria-label="核心能力"
            className="mx-auto mt-10 grid w-full max-w-xl gap-4 lg:max-w-none lg:grid-cols-3 xl:mt-2 xl:gap-5"
        >
            {capabilities.map((capability) => (
                <CapabilityCard key={capability.title} {...capability}/>
            ))}
        </section>
    )
}

export {CapabilitiesSection}
