/**
 * 文件作用：答题提交 API 层；负责把用户答案提交到后端 /attempts，并接收评分结果。
 */

import {http} from "@/lib/http"
import type {ApiResponse} from "@/types/api"

export type AttemptPlayload = {
    question_id: number
    answer: string
}

export type EvaluationResult = {
    score: number
    covered_points: string[]
    missing_points: string[]
    weak_topics: string[]
}

export const submitAttempt = (payload: AttemptPlayload) => {
    return http.post<ApiResponse<EvaluationResult>>(
        "/attempts",
        payload,
        {
            timeout: 60000,
        }
    ).then((res) => res.data)
}