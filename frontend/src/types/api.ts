/**
 * 文件作用：定义前端统一 API 响应类型 ApiResponse<T>，对应后端 code / msg / data 结构。
 */

export type ApiResponse<T> = {
    code: number
    msg: string
    data: T
}