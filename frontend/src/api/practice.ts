/** Practice Session 接口契约。接入 FastAPI 时只替换这些函数的实现。 */

import {
    abandonStoredPracticeSession,
    getStoredPracticeSession,
    startOrResumeStoredPracticeSession,
    submitStoredPracticeSession,
} from "@/data/practiceSessionStore"

export type PracticeSource = "basic" | "resume" | "jd"
export type PracticeSessionStatus = "active" | "submitted" | "abandoned" | "expired"

export type PracticeQuestion = {
    id: string
    prompt: string
    topic: string
}

export type PracticeSessionQuestion = {
    questionId: string
    order: number
    promptSnapshot: string
    topicSnapshot: string
}

export type PracticeSession = {
    sessionId: string
    status: PracticeSessionStatus
    source: PracticeSource
    libraryId: string
    libraryTitle: string
    /** 创建会话时冻结的题目快照和顺序。 */
    questions: PracticeSessionQuestion[]
    recordId?: string
}

export type StartPracticeSessionInput = Pick<PracticeSession, "source" | "libraryId">

export async function startOrResumePracticeSession(input: StartPracticeSessionInput): Promise<PracticeSession> {
    return startOrResumeStoredPracticeSession(input)
}

export async function getPracticeSession(sessionId: string): Promise<PracticeSession | null> {
    return getStoredPracticeSession(sessionId)
}

export async function submitPracticeSession(sessionId: string, answers: Record<string, string>): Promise<PracticeSession> {
    return submitStoredPracticeSession(sessionId, answers)
}

export async function abandonPracticeSession(sessionId: string): Promise<PracticeSession> {
    return abandonStoredPracticeSession(sessionId)
}
