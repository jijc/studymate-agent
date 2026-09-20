import {practiceRecords, type PracticeRecord} from "./practiceOverview"
import {getPracticeQuestions, resolvePracticeLibrary, type PracticeQuestion, type PracticeSource} from "./practiceSession"

const storageKey = "studymate-practice-records"

export type PracticeAnswerReview = PracticeQuestion & {answer: string}
export type PracticeRecordDetail = PracticeRecord & {
    answers: PracticeAnswerReview[]
}

const staticRecords: PracticeRecordDetail[] = practiceRecords.map((record) => ({
    ...record,
    answers: getPracticeQuestions(record.source, record.libraryId).map((question, index) => ({
        ...question,
        answer: index < record.completed ? `示例回答：先说明 ${question.topic} 的概念，再结合项目经历解释。` : "",
    })),
}))

function getSavedRecords(): PracticeRecordDetail[] {
    try {
        const parsed: unknown = JSON.parse(sessionStorage.getItem(storageKey) ?? "[]")
        if (!Array.isArray(parsed)) return []
        return parsed.filter((record): record is PracticeRecordDetail =>
            typeof record === "object" && record !== null &&
            typeof record.id === "string" && Array.isArray(record.answers),
        )
    } catch {
        return []
    }
}

export function getAllPracticeRecords(): PracticeRecordDetail[] {
    return [...getSavedRecords(), ...staticRecords]
}

export function getPracticeRecord(id: string): PracticeRecordDetail | null {
    return getAllPracticeRecords().find((record) => record.id === id) ?? null
}

export function savePracticeRecord(record: PracticeRecordDetail): void {
    sessionStorage.setItem(storageKey, JSON.stringify([record, ...getSavedRecords()]))
}

export function buildSubmittedRecord(input: {
    source: PracticeSource
    libraryId: string
    answers: string[]
}): PracticeRecordDetail {
    const library = resolvePracticeLibrary(input.source, input.libraryId)
    if (!library) throw new Error("练习题库不存在")

    const questions = getPracticeQuestions(input.source, input.libraryId)
    const answers = questions.map((question, index) => ({
        ...question,
        answer: input.answers[index]?.trim() ?? "",
    }))
    const completed = answers.filter((item) => item.answer).length
    const type = input.source === "basic" ? "基础练习" : input.source === "resume" ? "简历专项" : "JD 专项"

    return {
        id: `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        source: input.source,
        libraryId: input.libraryId,
        title: input.source === "basic" ? `${library.title} 基础练习` : library.title,
        type,
        completed,
        score: Math.round((completed / 10) * 78),
        duration: "演示练习",
        practicedAt: new Date().toLocaleString("zh-CN", {month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit"}),
        answers,
    }
}
