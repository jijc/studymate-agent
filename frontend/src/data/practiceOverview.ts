import type {PracticeSource} from "@/data/practiceSession"

type PracticeRecord = {
    id: string
    source: PracticeSource
    libraryId: string
    title: string
    type: string
    completed: number
    score: number
    duration: string
    practicedAt: string
}

const practiceRecords: PracticeRecord[] = [
    {
        id: "practice-react-basic",
        source: "basic",
        libraryId: "react",
        title: "React 基础练习",
        type: "基础练习",
        completed: 10,
        score: 82,
        duration: "18 分钟",
        practicedAt: "今天 09:18",
    },
    {
        id: "practice-byte-jd",
        source: "jd",
        libraryId: "byte-frontend-jd",
        title: "字节跳动 · 前端工程师",
        type: "JD 专项",
        completed: 8,
        score: 76,
        duration: "22 分钟",
        practicedAt: "昨天 20:42",
    },
    {
        id: "practice-resume",
        source: "resume",
        libraryId: "frontend-resume",
        title: "高级前端工程师",
        type: "简历专项",
        completed: 10,
        score: 71,
        duration: "25 分钟",
        practicedAt: "9月17日 19:30",
    },
]

export {practiceRecords}
export type {PracticeRecord}
