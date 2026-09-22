/**
 * 文件作用：早期“今日题目” API 封装；当前主线正逐步迁移到 practice.ts 的真实练习接口。
 */

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

