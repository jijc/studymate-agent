export type QuestionIcon =
    | "frontend"
    | "react"
    | "typescript"
    | "agent"
    | "python"
    | "system"
    | "algorithm"
    | "computer"

export type QuestionDifficulty = "简单 - 中等" | "中等" | "较难"

export type QuestionCatalogItem = {
    id: string
    title: string
    description: string
    count: number
    difficulty: QuestionDifficulty
    action: "开始练习" | "查看题目"
    icon: QuestionIcon
    iconClassName: string
}

export const questionCategories = [
    {id: "all", label: "全部", icon: "all"},
    {id: "frontend", label: "前端基础", icon: "frontend"},
    {id: "react", label: "React", icon: "react"},
    {id: "typescript", label: "TypeScript", icon: "typescript"},
    {id: "agent", label: "AI Agent", icon: "agent"},
    {id: "python", label: "Python", icon: "python"},
    {id: "system", label: "系统设计", icon: "system"},
    {id: "java", label: "Java", icon: "java"},
    {id: "go", label: "Go", icon: "go"},
    {id: "cpp", label: "C / C++", icon: "cpp"},
    {id: "node", label: "Node.js", icon: "node"},
    {id: "database", label: "数据库", icon: "database"},
    {id: "algorithm", label: "算法", icon: "algorithm"},
    {id: "testing", label: "测试", icon: "testing"},
    {id: "devops", label: "DevOps", icon: "devops"},
    {id: "bigdata", label: "大数据", icon: "bigdata"},
    {id: "android", label: "Android", icon: "android"},
    {id: "ios", label: "iOS", icon: "ios"},
    {id: "computer", label: "计算机基础", icon: "computer"},
] as const

export const questionCatalog: QuestionCatalogItem[] = [
    {
        id: "frontend",
        title: "前端基础面试题",
        description: "覆盖 HTML、CSS、JavaScript 等核心知识点",
        count: 328,
        difficulty: "简单 - 中等",
        action: "开始练习",
        icon: "frontend",
        iconClassName: "bg-[#fff0e4] text-[#ff5a1f]",
    },
    {
        id: "react",
        title: "React 面试题",
        description: "从核心概念到工程实践，全面提升 React 技能",
        count: 256,
        difficulty: "中等",
        action: "开始练习",
        icon: "react",
        iconClassName: "bg-[#eaf6ff] text-[#149eca]",
    },
    {
        id: "typescript",
        title: "TypeScript 面试题",
        description: "掌握类型系统与工程化实践",
        count: 189,
        difficulty: "中等",
        action: "开始练习",
        icon: "typescript",
        iconClassName: "bg-[#e8f2ff] text-[#3178c6]",
    },
    {
        id: "agent",
        title: "AI Agent 面试题",
        description: "涵盖 LLM、Agent 架构与应用开发场景",
        count: 142,
        difficulty: "较难",
        action: "开始练习",
        icon: "agent",
        iconClassName: "bg-[#f1edff] text-[#5546d9]",
    },
    {
        id: "python",
        title: "Python 面试题",
        description: "从基础语法到项目实战",
        count: 317,
        difficulty: "简单 - 中等",
        action: "开始练习",
        icon: "python",
        iconClassName: "bg-[#ebf8f1] text-[#3776ab]",
    },
    {
        id: "system",
        title: "系统设计面试题",
        description: "覆盖架构设计、分布式系统、高并发等核心场景",
        count: 205,
        difficulty: "较难",
        action: "查看题目",
        icon: "system",
        iconClassName: "bg-[#edf4ff] text-[#4a6d9b]",
    },
    {
        id: "algorithm",
        title: "数据结构与算法",
        description: "高频算法题，提升核心编程能力",
        count: 412,
        difficulty: "中等",
        action: "开始练习",
        icon: "algorithm",
        iconClassName: "bg-[#fff3e8] text-[#ff641f]",
    },
    {
        id: "computer",
        title: "计算机基础",
        description: "操作系统、计算机网络、数据库等",
        count: 276,
        difficulty: "中等",
        action: "查看题目",
        icon: "computer",
        iconClassName: "bg-[#fff0e6] text-[#ff7133]",
    },
]
