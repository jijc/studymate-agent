export type QuestionLibraryIcon =
    | "react"
    | "vue"
    | "typescript"
    | "java"
    | "python"
    | "go"
    | "node"
    | "database"
    | "network"
    | "system"
    | "architecture"

export type QuestionLibrary = {
    id: string
    title: string
    description: string
    topics: string[]
    questionCount: number
    icon: QuestionLibraryIcon
    iconClassName: string
}

export const defaultFavoriteLibraryIds = ["react", "java", "python"]

export const questionLibraries: QuestionLibrary[] = [
    {id: "react", title: "React", description: "前端框架、组件化、状态管理与 Hooks", topics: ["组件", "Hooks", "状态管理"], questionCount: 256, icon: "react", iconClassName: "bg-[#eaf6ff] text-[#149eca]"},
    {id: "java", title: "Java", description: "Java 基础、并发编程、JVM 与 Spring 生态", topics: ["JVM", "并发", "Spring"], questionCount: 320, icon: "java", iconClassName: "bg-[#fff3e9] text-[#e76f22]"},
    {id: "python", title: "Python", description: "基础语法、数据结构、Web 开发与常用库", topics: ["语法", "数据结构", "Web"], questionCount: 317, icon: "python", iconClassName: "bg-[#ebf8f1] text-[#3776ab]"},
    {id: "vue", title: "Vue", description: "Vue 3、响应式原理、组件化与生态工具链", topics: ["Vue 3", "响应式", "组件化"], questionCount: 208, icon: "vue", iconClassName: "bg-[#eaf8f1] text-[#42b883]"},
    {id: "typescript", title: "TypeScript", description: "类型系统、工程化实践与前端框架结合", topics: ["类型系统", "泛型", "工程化"], questionCount: 189, icon: "typescript", iconClassName: "bg-[#e8f2ff] text-[#3178c6]"},
    {id: "go", title: "Go", description: "语言基础、并发模型、标准库与工程实践", topics: ["Goroutine", "Channel", "标准库"], questionCount: 184, icon: "go", iconClassName: "bg-[#e8f8fb] text-[#00add8]"},
    {id: "node", title: "Node.js", description: "事件循环、异步编程、核心模块与 Web 开发", topics: ["事件循环", "异步", "核心模块"], questionCount: 226, icon: "node", iconClassName: "bg-[#eef9e9] text-[#339933]"},
    {id: "database", title: "数据库", description: "MySQL、Redis、SQL 优化与数据库设计", topics: ["MySQL", "Redis", "SQL"], questionCount: 276, icon: "database", iconClassName: "bg-[#edf4ff] text-[#3b6ea8]"},
    {id: "network", title: "计算机网络", description: "TCP/IP、HTTP、网络模型与常见协议", topics: ["TCP/IP", "HTTP", "网络模型"], questionCount: 312, icon: "network", iconClassName: "bg-[#edf7ff] text-[#2488d8]"},
    {id: "system", title: "操作系统", description: "进程线程、内存管理、文件系统与调度", topics: ["进程", "内存", "文件系统"], questionCount: 205, icon: "system", iconClassName: "bg-[#fff3e8] text-[#ff641f]"},
    {id: "architecture", title: "系统设计", description: "高并发、分布式系统、缓存与消息队列", topics: ["高并发", "分布式", "缓存"], questionCount: 412, icon: "architecture", iconClassName: "bg-[#f1edff] text-[#6550d8]"},
]
