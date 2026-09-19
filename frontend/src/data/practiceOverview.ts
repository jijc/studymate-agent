type PracticeModeId = "smart" | "resume" | "jd" | "basic"

type PracticeMode = {
    id: PracticeModeId
    title: string
    eyebrow: string
    description: string
    meta: string
    actionLabel: string
    href: string
    locked?: boolean
    tags: string[]
}

type PracticeRecord = {
    id: string
    title: string
    type: string
    completed: number
    score: number
    duration: string
    practicedAt: string
}

const practiceModes: PracticeMode[] = [
    {
        id: "smart",
        title: "智能强化",
        eyebrow: "专属 AI 题库",
        description: "先完成简历专项、JD 专项或基础练习，累计 10 道有效题目后，系统会自动生成专属题库。",
        meta: "当前已完成 6/10 道有效练习",
        actionLabel: "尚未解锁",
        href: "/practice",
        locked: true,
        tags: ["薄弱点", "动态更新"],
    },
    {
        id: "resume",
        title: "简历专项",
        eyebrow: "2 个可用题库",
        description: "围绕项目经历和目标岗位，练习最可能被追问的问题。",
        meta: "最近练习：高级前端工程师",
        actionLabel: "选择简历题库",
        href: "/questions/ai",
        tags: ["项目经历", "岗位匹配"],
    },
    {
        id: "jd",
        title: "JD 专项",
        eyebrow: "2 个可用题库",
        description: "针对具体公司的招聘要求，集中准备核心技能和业务场景。",
        meta: "最近练习：字节跳动 · 前端工程师",
        actionLabel: "选择 JD 题库",
        href: "/questions/ai",
        tags: ["公司定向", "技能要求"],
    },
    {
        id: "basic",
        title: "基础练习",
        eyebrow: "来自站内题库",
        description: "从平台整理的 IT 知识库中选择方向，完成一组 10 道基础题。",
        meta: "React、Vue、Java、Python 等",
        actionLabel: "选择技术方向",
        href: "/questions",
        tags: ["10 道一组", "通用基础"],
    },
]

const practiceRecords: PracticeRecord[] = [
    {
        id: "practice-react-basic",
        title: "React 基础练习",
        type: "基础练习",
        completed: 10,
        score: 82,
        duration: "18 分钟",
        practicedAt: "今天 09:18",
    },
    {
        id: "practice-byte-jd",
        title: "字节跳动 · 前端工程师",
        type: "JD 专项",
        completed: 8,
        score: 76,
        duration: "22 分钟",
        practicedAt: "昨天 20:42",
    },
    {
        id: "practice-resume",
        title: "高级前端工程师",
        type: "简历专项",
        completed: 10,
        score: 71,
        duration: "25 分钟",
        practicedAt: "9月17日 19:30",
    },
]

export {practiceModes, practiceRecords}
export type {PracticeMode, PracticeModeId, PracticeRecord}
