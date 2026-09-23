import {getAiLibraryDetail} from "./aiLibraryDetails"

type InterviewQuestion = {id: string; prompt: string; topic: string}
type InterviewAnswer = {questionId: string; prompt: string; answer: string; skipped: boolean}
type InterviewResult = {
    id: string
    source: "resume" | "jd"
    libraryId: string
    title: string
    durationSeconds: number
    answers: InterviewAnswer[]
}

const storageKey = "studymate-interview-results"

const scripts: Record<string, InterviewQuestion[]> = {
    "frontend-resume": [
        {id: "fr-i-1", prompt: "请用一分钟介绍自己，并重点讲讲你最有代表性的前端项目。", topic: "自我介绍"},
        {id: "fr-i-2", prompt: "这个项目中最棘手的 React 状态问题是什么？你如何定位和解决？", topic: "项目深挖"},
        {id: "fr-i-3", prompt: "如果重新设计当时的组件结构，你会调整哪些地方？", topic: "方案反思"},
        {id: "fr-i-4", prompt: "你如何与设计和后端同事协作，保证交付质量？", topic: "团队协作"},
        {id: "fr-i-5", prompt: "最后，请用一个可量化的结果说明你在这个项目中的贡献。", topic: "结果表达"},
    ],
    "fullstack-resume": [
        {id: "fs-i-1", prompt: "请介绍你最能体现全栈能力的项目。", topic: "自我介绍"},
        {id: "fs-i-2", prompt: "这个项目里 Node.js 服务与前端如何协作？", topic: "项目深挖"},
        {id: "fs-i-3", prompt: "遇到数据库性能瓶颈时，你做过哪些验证？", topic: "问题排查"},
        {id: "fs-i-4", prompt: "如果用户量扩大十倍，你会优先改造哪里？", topic: "系统设计"},
        {id: "fs-i-5", prompt: "你如何证明这些改动带来了实际价值？", topic: "结果表达"},
    ],
    "byte-frontend-jd": [
        {id: "bj-i-1", prompt: "请介绍自己，并说明你为什么关注这个前端岗位。", topic: "岗位匹配"},
        {id: "bj-i-2", prompt: "讲一个你主导的复杂 React 页面，难点是什么？", topic: "项目深挖"},
        {id: "bj-i-3", prompt: "如果该页面首屏明显变慢，你会怎样分析与优化？", topic: "场景追问"},
        {id: "bj-i-4", prompt: "面对紧急需求和技术债，你如何安排优先级？", topic: "协作取舍"},
        {id: "bj-i-5", prompt: "请总结两点你能给这个岗位带来的价值。", topic: "岗位总结"},
    ],
    "meituan-platform-jd": [
        {id: "mj-i-1", prompt: "请介绍自己，并说明你对前端平台工程的理解。", topic: "岗位匹配"},
        {id: "mj-i-2", prompt: "请讲一个你做过的组件库或工具平台项目。", topic: "项目深挖"},
        {id: "mj-i-3", prompt: "如果业务方提出低代码需求，你会先澄清什么？", topic: "场景追问"},
        {id: "mj-i-4", prompt: "多个团队对组件 API 有冲突诉求时，你怎么推进方案？", topic: "协作取舍"},
        {id: "mj-i-5", prompt: "你会用什么指标评估平台工具的效果？", topic: "价值表达"},
    ],
}

export function getInterviewQuestions(source: string, libraryId: string): InterviewQuestion[] {
    if (!getAiLibraryDetail(source, libraryId)) return []
    return scripts[libraryId] ?? []
}

function isResult(value: unknown): value is InterviewResult {
    if (!value || typeof value !== "object") return false
    const item = value as Partial<InterviewResult>
    return typeof item.id === "string"
        && (item.source === "resume" || item.source === "jd")
        && typeof item.libraryId === "string"
        && typeof item.title === "string"
        && typeof item.durationSeconds === "number"
        && Number.isFinite(item.durationSeconds)
        && item.durationSeconds >= 0
        && Array.isArray(item.answers)
        && item.answers.every((answer) => answer
            && typeof answer.questionId === "string"
            && typeof answer.prompt === "string"
            && typeof answer.answer === "string"
            && typeof answer.skipped === "boolean")
}

function readResults(): InterviewResult[] {
    try {
        const value: unknown = JSON.parse(sessionStorage.getItem(storageKey) ?? "[]")
        return Array.isArray(value) ? value.filter(isResult) : []
    } catch {
        return []
    }
}

export function saveInterviewResult(result: InterviewResult): void {
    sessionStorage.setItem(storageKey, JSON.stringify([result, ...readResults()]))
}

export function getInterviewResult(id: string): InterviewResult | null {
    return readResults().find((result) => result.id === id) ?? null
}

export type {InterviewAnswer, InterviewQuestion, InterviewResult}
