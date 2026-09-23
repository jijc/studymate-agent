export type NotificationItemData = {
    id: string
    kind: "library" | "review"
    title: string
    description: string
    time: string
    action: string
    href: string
    read: boolean
}

export const exampleNotifications: NotificationItemData[] = [
    {
        id: "resume-library-ready",
        kind: "library",
        title: "简历题库已生成",
        description: "「高级前端工程师」题库已准备好，可以从你的项目经历开始专项练习。",
        time: "今天 10:24",
        action: "查看题库",
        href: "/questions/ai",
        read: false,
    },
    {
        id: "react-practice-review",
        kind: "review",
        title: "练习反馈已就绪",
        description: "React 基础练习的逐题反馈已准备好，看看接下来值得加强的知识点。",
        time: "昨天 19:08",
        action: "查看复盘",
        href: "/practice/records/practice-react-basic",
        read: false,
    },
    {
        id: "jd-library-ready",
        kind: "library",
        title: "JD 题库已生成",
        description: "「字节跳动 · 前端工程师」定向题库已准备好。",
        time: "9 月 21 日",
        action: "查看题库",
        href: "/questions/ai",
        read: true,
    },
]
