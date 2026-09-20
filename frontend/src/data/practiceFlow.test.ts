import {afterEach, describe, expect, it} from "vitest"

import {buildSubmittedRecord, getAllPracticeRecords, getPracticeRecord, savePracticeRecord} from "./practiceRecords"
import {getPracticeQuestions, resolvePracticeLibrary} from "./practiceSession"

afterEach(() => {
    sessionStorage.clear()
})

describe("practice data flow", () => {
    it("resolves each source to the selected library and rejects unknown IDs", () => {
        expect(resolvePracticeLibrary("basic", "react")?.title).toBe("React")
        expect(resolvePracticeLibrary("resume", "frontend-resume")?.title).toBe("高级前端工程师")
        expect(resolvePracticeLibrary("jd", "byte-frontend-jd")?.title).toBe("字节跳动 · 前端工程师")
        expect(resolvePracticeLibrary("jd", "missing")).toBeNull()
        expect(resolvePracticeLibrary("unknown", "react")).toBeNull()
    })

    it("uses ten independent sample questions per practice source", () => {
        const basic = getPracticeQuestions("basic", "react")
        const resume = getPracticeQuestions("resume", "frontend-resume")
        const jd = getPracticeQuestions("jd", "byte-frontend-jd")

        expect(basic).toHaveLength(10)
        expect(resume).toHaveLength(10)
        expect(jd).toHaveLength(10)
        expect(basic[0].prompt).not.toBe(resume[0].prompt)
        expect(resume[0].prompt).not.toBe(jd[0].prompt)
        expect(getPracticeQuestions("jd", "missing")).toEqual([])
    })

    it("counts only nonempty answers in a submitted local record", () => {
        const record = buildSubmittedRecord({
            source: "basic",
            libraryId: "react",
            answers: [" 先确认依赖变化 ", " ", ...Array(8).fill("")],
        })

        expect(record.completed).toBe(1)
        expect(record.score).toBe(8)
        expect(record.answers[0].answer).toBe("先确认依赖变化")
        expect(record.answers[1].answer).toBe("")
    })

    it("keeps demo records readable after saving and a storage reread", () => {
        const record = buildSubmittedRecord({
            source: "resume",
            libraryId: "frontend-resume",
            answers: ["项目用了 React", ...Array(9).fill("")],
        })

        savePracticeRecord(record)

        expect(getPracticeRecord(record.id)?.libraryId).toBe("frontend-resume")
        expect(getAllPracticeRecords()[0].id).toBe(record.id)
        expect(getAllPracticeRecords()).toHaveLength(4)
    })

    it("falls back to static records when local storage is corrupt", () => {
        sessionStorage.setItem("studymate-practice-records", "not-json")

        expect(getAllPracticeRecords()).toHaveLength(3)
        expect(getPracticeRecord("practice-react-basic")?.title).toBe("React 基础练习")
        expect(getPracticeRecord("missing")).toBeNull()
    })
})
