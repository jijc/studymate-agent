/**
 * 文件作用：练习题 API 层；AI 题库暂用本地演示数据，基础题库通过 Axios 请求 FastAPI 的 /practice/questions 接口。
 */

import { http } from "@/lib/http"
import type { ApiResponse } from "@/types/api"
import {getPracticeQuestions} from "@/data/practiceSession"

export type PracticeSource = "basic" | "resume" | "jd"

export type PracticeQuestion = {
    id: string
    prompt: string
    topic: string
}

export type GetPracticeQuestionsParams = {
    source: PracticeSource
    libraryId: string
    limit?: number
}

export const fetchPracticeQuestions = ({
    source,
    libraryId,
    limit = 10,
}: GetPracticeQuestionsParams) => {
    if (source === "resume" || source === "jd") {
        return Promise.resolve<ApiResponse<PracticeQuestion[]>>({
            code: 200,
            msg: "demo",
            data: getPracticeQuestions(source, libraryId).slice(0, limit),
        })
    }

    return http
        .get<ApiResponse<PracticeQuestion[]>>("/practice/questions", {
            params: {
                source,
                library_id: libraryId,
                limit,
            },
        })
        .then((res) => res.data)
}
