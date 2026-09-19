import {http} from '@/lib/http';
import type {ApiResponse} from "@/types/api.ts"

export type Question = {
    id: number
    question: string
    topic: string
}

export const getTodayQuestions = (limit = 5) => {
    return http
        .get<ApiResponse<Question[]>>("/questions/today", {
            params: {limit},
        })
        .then((res) => res.data)
}

