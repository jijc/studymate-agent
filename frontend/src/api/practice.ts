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