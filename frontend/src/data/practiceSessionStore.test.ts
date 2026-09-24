import {afterEach, describe, expect, it} from "vitest"

import {
    abandonPracticeSession,
    getPracticeSession,
    startOrResumePracticeSession,
    submitPracticeSession,
} from "@/api/practice"
import {getPracticeDraft, savePracticeDraft} from "@/data/practiceDrafts"
import {getPracticeRecord} from "@/data/practiceRecords"

afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
})

describe("Practice Session 本地适配层", () => {
    it("同一题库只复用一个 active Session，按 sessionId 恢复固定题组", async () => {
        const first = await startOrResumePracticeSession({source: "basic", libraryId: "react"})
        const resumed = await startOrResumePracticeSession({source: "basic", libraryId: "react"})
        const fromUrl = await getPracticeSession(first.sessionId)

        expect(first.sessionId).toMatch(/^ps_/)
        expect(first.status).toBe("active")
        expect(first.questions).toHaveLength(10)
        expect(first.questions[0]).toMatchObject({
            questionId: expect.any(String),
            order: 1,
            promptSnapshot: expect.any(String),
            topicSnapshot: expect.any(String),
        })
        expect(resumed).toEqual(first)
        expect(fromUrl?.questions).toEqual(first.questions)
        expect(localStorage.getItem("studymate-practice-sessions")).toContain(first.sessionId)
    })

    it("不同题库各自拥有 active Session，草稿以 sessionId 隔离", async () => {
        const basic = await startOrResumePracticeSession({source: "basic", libraryId: "react"})
        const resume = await startOrResumePracticeSession({source: "resume", libraryId: "frontend-resume"})
        savePracticeDraft(basic.sessionId, {[basic.questions[0].questionId]: "React 回答"})

        expect(resume.sessionId).not.toBe(basic.sessionId)
        expect(getPracticeDraft(resume.sessionId)).toEqual({})
        expect(getPracticeDraft(basic.sessionId)[basic.questions[0].questionId]).toBe("React 回答")
    })

    it("暂时离开不结束；明确放弃清除草稿，下一次创建新轮", async () => {
        const first = await startOrResumePracticeSession({source: "jd", libraryId: "byte-frontend-jd"})
        savePracticeDraft(first.sessionId, {[first.questions[0].questionId]: "旧草稿"})
        expect((await startOrResumePracticeSession({source: "jd", libraryId: "byte-frontend-jd"})).sessionId)
            .toBe(first.sessionId)

        expect((await abandonPracticeSession(first.sessionId)).status).toBe("abandoned")
        expect(getPracticeDraft(first.sessionId)).toEqual({})
        const next = await startOrResumePracticeSession({source: "jd", libraryId: "byte-frontend-jd"})
        expect(next.sessionId).not.toBe(first.sessionId)
        expect((await getPracticeSession(first.sessionId))?.status).toBe("abandoned")
    })

    it("整轮提交后保留题目快照和复盘，清除草稿并创建新轮", async () => {
        const first = await startOrResumePracticeSession({source: "resume", libraryId: "frontend-resume"})
        const answers = Object.fromEntries(first.questions.map((question) => [question.questionId, `回答 ${question.questionId}`]))
        savePracticeDraft(first.sessionId, answers)

        const submitted = await submitPracticeSession(first.sessionId, answers)
        expect(submitted.status).toBe("submitted")
        expect(getPracticeDraft(first.sessionId)).toEqual({})
        expect(getPracticeRecord(submitted.recordId!)?.answers.map((item) => item.id))
            .toEqual(first.questions.map((item) => item.questionId))
        expect(getPracticeRecord(submitted.recordId!)?.sessionId).toBe(first.sessionId)
        expect((await getPracticeSession(first.sessionId))?.questions).toEqual(first.questions)
        expect((await startOrResumePracticeSession({source: "resume", libraryId: "frontend-resume"})).sessionId)
            .not.toBe(first.sessionId)
    })
})
