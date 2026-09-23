import {describe, expect, it} from "vitest"

import {getAiLibraryDetail} from "./aiLibraryDetails"

describe("AI 题库预览数据", () => {
    it("分别展示简历和 JD 的个性化预览，不冒充完整题库", () => {
        const resume = getAiLibraryDetail("resume", "frontend-resume")
        const jd = getAiLibraryDetail("jd", "byte-frontend-jd")

        expect(resume?.title).toBe("高级前端工程师")
        expect(jd?.title).toBe("字节跳动 · 前端工程师")
        expect(resume?.previewQuestions.length).toBeGreaterThan(0)
        expect(jd?.previewQuestions.length).toBeGreaterThan(0)
        expect(resume!.previewQuestions.length).toBeLessThan(42)
        expect(jd!.previewQuestions.length).toBeLessThan(38)
        expect(resume?.previewQuestions[0].prompt).not.toBe(jd?.previewQuestions[0].prompt)
    })

    it("拒绝未知来源和题库 ID", () => {
        expect(getAiLibraryDetail("basic", "react")).toBeNull()
        expect(getAiLibraryDetail("resume", "missing")).toBeNull()
        expect(getAiLibraryDetail("jd", "frontend-resume")).toBeNull()
    })
})
