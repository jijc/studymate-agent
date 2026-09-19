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