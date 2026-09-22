/**
 * 文件作用：统一 Axios HTTP 实例；集中管理 baseURL（接口基础地址）、timeout（超时）和 request/response interceptor（请求/响应拦截器）。
 */

import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
})

http.interceptors.request.use(
    (config) => {
        config.headers.Authorization = "Bearer xxx"
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

http.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)
export {http};