/**
 * 文件作用：前端应用入口；创建 React 根节点，并挂载 Router（路由）和 TanStack Query（服务端状态管理）等全局 Provider。
 */

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router"
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query"

import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
)
