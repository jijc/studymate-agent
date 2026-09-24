/**
 * 文件作用：本地练习记录数据逻辑；负责构造、保存和读取模拟练习记录，后续会逐步替换为真实后端持久化。
 */

import {practiceRecords, type PracticeRecord} from "./practiceOverview"
import {getPracticeQuestions, resolvePracticeLibrary, type PracticeQuestion, type PracticeSource} from "./practiceSession"

const storageKey = "studymate-practice-records"

export type PracticeAnswerReview = PracticeQuestion & {answer: string}
export type PracticeRecordDetail = PracticeRecord & {
    sessionId?: string
    answers: PracticeAnswerReview[]
}

const staticRecords: PracticeRecordDetail[] = practiceRecords.map((record) => ({
    ...record,
    answers: getPracticeQuestions(record.source, record.libraryId).map((question, index) => ({
        ...question,
        answer: index < record.completed ? `先说明 ${question.topic} 的概念，再结合项目经历解释。` : "",
    })),
}))

function getSavedRecords(): PracticeRecordDetail[] {
    try {
        const parsed: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]")
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
    localStorage.setItem(storageKey, JSON.stringify([record, ...getSavedRecords()]))
}

export function buildSubmittedRecord(input: {
    source: PracticeSource
    libraryId: string
    libraryTitle?: string
    sessionId?: string
    answers: string[]
    questions?: Array<Pick<PracticeQuestion, "id" | "prompt" | "topic">>
}): PracticeRecordDetail {
    const library = resolvePracticeLibrary(input.source, input.libraryId)
    const libraryTitle = input.libraryTitle ?? library?.title
    if (!libraryTitle) throw new Error("练习题库不存在")

    const questions = input.questions ?? getPracticeQuestions(input.source, input.libraryId)
    const answers = questions.map((question, index) => ({
        ...question,
        feedback: "feedback" in question && typeof question.feedback === "string"
            ? question.feedback
            : "先给出结论，再结合具体场景说明取舍和验证方式。",
        answer: input.answers[index]?.trim() ?? "",
    }))
    const completed = answers.filter((item) => item.answer).length
    const type = input.source === "basic" ? "基础练习" : input.source === "resume" ? "简历专项" : "JD 专项"

    return {
        id: `demo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        sessionId: input.sessionId,
        source: input.source,
        libraryId: input.libraryId,
        title: input.source === "basic" ? `${libraryTitle} 基础练习` : libraryTitle,
        type,
        completed,
        score: Math.round((completed / questions.length) * 78),
        duration: "本轮练习",
        practicedAt: new Date().toLocaleString("zh-CN", {month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit"}),
        answers,
    }
}
