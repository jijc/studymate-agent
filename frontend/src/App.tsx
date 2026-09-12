import {Route, Routes} from "react-router"

import {MainLayout} from "@/components/layout/MainLayout"
import {HomePage} from "@/pages/HomePage"
import {LoginPage} from "@/pages/LoginPage"
import {PracticePage} from "@/pages/PracticePage"
import {QuestionsPage} from "@/pages/QuestionsPage"
import {ReportsPage} from "@/pages/ReportsPage"

function App() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-background">
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route index element={<HomePage/>}/>

                    <Route
                        path="/practice"
                        element={<PracticePage/>}
                    />

                    <Route
                        path="/questions"
                        element={<QuestionsPage/>}
                    />

                    <Route
                        path="/reports"
                        element={<ReportsPage/>}
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
