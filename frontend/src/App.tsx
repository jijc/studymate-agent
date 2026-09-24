/**
 * 文件作用：前端总路由配置；集中声明页面 URL 与对应 React 页面组件。
 */

import {Route, Routes} from "react-router"

import {MainLayout} from "@/components/layout/MainLayout"
import {AiLibrariesPage} from "@/pages/AiLibrariesPage"
import {AiLibraryDetailPage} from "@/pages/AiLibraryDetailPage"
import {HomePage} from "@/pages/HomePage"
import {InterviewSessionPage} from "@/pages/InterviewSessionPage"
import {InterviewResultPage} from "@/pages/InterviewResultPage"
import {LoginPage} from "@/pages/LoginPage"
import {NotificationsPage} from "@/pages/NotificationsPage"
import {PracticePage} from "@/pages/PracticePage"
import {PracticeRecordsPage} from "@/pages/PracticeRecordsPage"
import {PracticeReviewPage} from "@/pages/PracticeReviewPage"
import {PracticeSessionPage} from "@/pages/PracticeSessionPage"
import {ProfilePage} from "@/pages/ProfilePage"
import {QuestionLibraryPage} from "@/pages/QuestionLibraryPage"
import {QuestionsPage} from "@/pages/QuestionsPage"
import {ReportsPage} from "@/pages/ReportsPage"

function App() {
    return (
        <div className="min-h-screen overflow-x-clip bg-background">
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route index element={<HomePage/>}/>

                    <Route
                        path="/practice"
                        element={<PracticePage/>}
                    />

                    <Route path="/practice/records" element={<PracticeRecordsPage/>}/>
                    <Route path="/practice/records/:recordId" element={<PracticeReviewPage/>}/>
                    <Route path="/practice/session/:sessionId" element={<PracticeSessionPage/>}/>
                    <Route path="/interview/session/:source/:libraryId" element={<InterviewSessionPage/>}/>
                    <Route path="/interview/result/:sessionId" element={<InterviewResultPage/>}/>
                    <Route path="/notifications" element={<NotificationsPage/>}/>

                    <Route
                        path="/questions"
                        element={<QuestionsPage/>}
                    />

                    <Route
                        path="/questions/ai"
                        element={<AiLibrariesPage/>}
                    />

                    <Route path="/questions/ai/:source/:libraryId" element={<AiLibraryDetailPage/>}/>

                    <Route
                        path="/questions/:libraryId"
                        element={<QuestionLibraryPage/>}
                    />

                    <Route
                        path="/reports"
                        element={<ReportsPage/>}
                    />

                    <Route
                        path="/profile/*"
                        element={<ProfilePage/>}
                    />


                </Route>
                <Route
                    path="/login"
                    element={<LoginPage/>}
                />
            </Routes>
        </div>
    )
}

export default App
