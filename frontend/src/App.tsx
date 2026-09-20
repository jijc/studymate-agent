import {Route, Routes} from "react-router"

import {MainLayout} from "@/components/layout/MainLayout"
import {AiLibrariesPage} from "@/pages/AiLibrariesPage"
import {HomePage} from "@/pages/HomePage"
import {LoginPage} from "@/pages/LoginPage"
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
                    <Route path="/practice/session/:source/:libraryId" element={<PracticeSessionPage/>}/>

                    <Route
                        path="/questions"
                        element={<QuestionsPage/>}
                    />

                    <Route
                        path="/questions/ai"
                        element={<AiLibrariesPage/>}
                    />

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
