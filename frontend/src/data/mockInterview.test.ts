import {afterEach, describe, expect, it} from "vitest"

import {getInterviewQuestions, getInterviewResult, saveInterviewResult, type InterviewResult} from "./mockInterview"

afterEach(() => sessionStorage.clear())

describe("模拟面试演示数据", () => {
    it("简历和 JD 使用不同脚本，拒绝未知题库", () => {
        const resume = getInterviewQuestions("resume", "frontend-resume")
        const jd = getInterviewQuestions("jd", "byte-frontend-jd")

        expect(resume).toHaveLength(5)
        expect(jd).toHaveLength(5)
        expect(resume[0].prompt).not.toBe(jd[0].prompt)
        expect(getInterviewQuestions("basic", "react")).toEqual([])
        expect(getInterviewQuestions("jd", "missing")).toEqual([])
    })

    it("保存后刷新式重读仍可看到本次回答与跳过状态", () => {
        const result: InterviewResult = {
            id: "interview-demo-1",
            source: "jd",
            libraryId: "byte-frontend-jd",
            title: "字节跳动 · 前端工程师",
            durationSeconds: 83,
            answers: [
                {questionId: "q-1", prompt: "介绍项目", answer: "我主导了组件库升级", skipped: false},
                {questionId: "q-2", prompt: "谈谈性能优化", answer: "", skipped: true},
            ],
        }

        saveInterviewResult(result)

        expect(getInterviewResult("interview-demo-1")).toEqual(result)
        expect(sessionStorage.getItem("studymate-practice-records")).toBeNull()
        expect(getInterviewResult("missing")).toBeNull()
    })

    it("损坏或形状错误的会话存储不会造成结果页崩溃", () => {
        sessionStorage.setItem("studymate-interview-results", "bad json")
        expect(getInterviewResult("missing")).toBeNull()

        sessionStorage.setItem("studymate-interview-results", JSON.stringify([{id: "broken"}]))
        expect(getInterviewResult("broken")).toBeNull()
    })
})
