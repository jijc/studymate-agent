/** 本地 Practice Session 适配层。后端接入后由 api/practice.ts 改为 Axios 请求。 */

import type {PracticeSession, StartPracticeSessionInput} from "@/api/practice"
import {clearPracticeDraft} from "@/data/practiceDrafts"
import {buildSubmittedRecord, savePracticeRecord} from "@/data/practiceRecords"
import {getPracticeQuestions, resolvePracticeLibrary} from "@/data/practiceSession"

const storageKey = "studymate-practice-sessions"

function readSessions(): PracticeSession[] {
    try {
        const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? "[]")
        if (!Array.isArray(value)) return []
        return value.filter((item): item is PracticeSession =>
            typeof item === "object" && item !== null &&
            typeof item.sessionId === "string" &&
            typeof item.libraryId === "string" &&
            typeof item.libraryTitle === "string" &&
            ["basic", "resume", "jd"].includes(item.source) &&
            ["active", "submitted", "abandoned", "expired"].includes(item.status) &&
            Array.isArray(item.questions),
        )
    } catch {
        return []
    }
}

function saveSessions(sessions: PracticeSession[]) {
    localStorage.setItem(storageKey, JSON.stringify(sessions))
}

function replaceSession(session: PracticeSession) {
    saveSessions(readSessions().map((item) => item.sessionId === session.sessionId ? session : item))
    return session
}

function getStoredPracticeSession(sessionId: string): PracticeSession | null {
    return readSessions().find((session) => session.sessionId === sessionId) ?? null
}

function startOrResumeStoredPracticeSession({source, libraryId}: StartPracticeSessionInput): PracticeSession {
    const active = readSessions().find((session) =>
        session.source === source && session.libraryId === libraryId && session.status === "active",
    )
    if (active) return active
    const library = resolvePracticeLibrary(source, libraryId)
    if (!library) throw new Error("练习题库不存在")

    // 本地题库仅是开发数据；题目在创建时复制进 Session，之后不会重新抽取。
    const questions = getPracticeQuestions(source, libraryId).slice(0, 10)
        .map(({id, prompt, topic}, index) => ({
            questionId: id,
            order: index + 1,
            promptSnapshot: prompt,
            topicSnapshot: topic,
        }))
    if (questions.length === 0) throw new Error("这套题库还没有练习题")

    const session: PracticeSession = {
        sessionId: `ps_${crypto.randomUUID()}`,
        status: "active",
        source,
        libraryId,
        libraryTitle: library.title,
        questions,
    }
    saveSessions([...readSessions(), session])
    return session
}

function submitStoredPracticeSession(sessionId: string, answers: Record<string, string>): PracticeSession {
    const session = getStoredPracticeSession(sessionId)
    if (!session || session.status !== "active") throw new Error("本轮练习不可提交")
    if (session.questions.some((question) => !answers[question.questionId]?.trim())) throw new Error("请先完成本轮全部题目")

    const record = buildSubmittedRecord({
        source: session.source,
        libraryId: session.libraryId,
        libraryTitle: session.libraryTitle,
        sessionId,
        questions: session.questions.map((question) => ({
            id: question.questionId,
            prompt: question.promptSnapshot,
            topic: question.topicSnapshot,
        })),
        answers: session.questions.map((question) => answers[question.questionId]),
    })
    savePracticeRecord(record)
    const submitted = replaceSession({...session, status: "submitted", recordId: record.id})
    clearPracticeDraft(sessionId)
    return submitted
}

function abandonStoredPracticeSession(sessionId: string): PracticeSession {
    const session = getStoredPracticeSession(sessionId)
    if (!session || session.status !== "active") throw new Error("本轮练习不可放弃")
    const abandoned = replaceSession({...session, status: "abandoned"})
    clearPracticeDraft(sessionId)
    return abandoned
}

export {
    abandonStoredPracticeSession,
    getStoredPracticeSession,
    startOrResumeStoredPracticeSession,
    submitStoredPracticeSession,
}
