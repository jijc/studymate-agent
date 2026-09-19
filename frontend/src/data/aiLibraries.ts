type GeneratedLibraryKind = "resume" | "jd"

type GeneratedLibrary = {
    id: string
    kind: GeneratedLibraryKind
    title: string
    subtitle: string
    skills: string[]
    questionCount: number
    completedCount: number
    updatedAt: string
}

const resumeLibraries: GeneratedLibrary[] = [
    {
        id: "frontend-resume",
        kind: "resume",
        title: "高级前端工程师",
        subtitle: "基于《前端工程师-三年经验.pdf》生成",
        skills: ["React", "TypeScript", "工程化"],
        questionCount: 42,
        completedCount: 18,
        updatedAt: "今天 09:32",
    },
    {
        id: "fullstack-resume",
        kind: "resume",
        title: "全栈开发工程师",
        subtitle: "基于《全栈开发简历.pdf》生成",
        skills: ["Node.js", "数据库", "系统设计"],
        questionCount: 36,
        completedCount: 8,
        updatedAt: "9月17日",
    },
]

const jdLibraries: GeneratedLibrary[] = [
    {
        id: "byte-frontend-jd",
        kind: "jd",
        title: "字节跳动 · 前端工程师",
        subtitle: "根据岗位职责与任职要求生成",
        skills: ["React", "性能优化", "网络"],
        questionCount: 38,
        completedCount: 22,
        updatedAt: "昨天 18:10",
    },
    {
        id: "meituan-platform-jd",
        kind: "jd",
        title: "美团 · 前端平台工程师",
        subtitle: "根据岗位职责与任职要求生成",
        skills: ["低代码", "组件库", "架构设计"],
        questionCount: 40,
        completedCount: 10,
        updatedAt: "9月15日",
    },
]

export {jdLibraries, resumeLibraries}
export type {GeneratedLibrary, GeneratedLibraryKind}
