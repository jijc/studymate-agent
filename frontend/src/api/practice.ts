/**
 * 文件作用：练习题 API 层；定义练习题相关类型，并通过 Axios 请求 FastAPI 的 /practice/questions 接口。
 */

import {http} from "@/lib/http"
import type {ApiResponse} from "@/types/api"

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

export const fetchPracticeQuestions = ({source, libraryId, limit = 10,}: GetPracticeQuestionsParams) => {
    return http.get<ApiResponse<PracticeQuestion[]>>(
        "/practice/questions",
        {
            params: {
                source,
                library_id: libraryId,
                limit,
            },
        },
    ).then((res) => res.data)
}