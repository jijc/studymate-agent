import {Route, Routes} from "react-router"

import {Header} from "@/components/layout/Header"
import {HomePage} from "@/pages/HomePage"
import {LoginPage} from "@/pages/LoginPage"
import {PracticePage} from "@/pages/PracticePage"
import {QuestionsPage} from "@/pages/QuestionsPage"
import {ReportsPage} from "@/pages/ReportsPage"

function App() {
    return (
        <div className="home-background min-h-screen overflow-x-hidden bg-background">
            <Header/>

            <Routes>
                <Route path="/" element={<HomePage/>}/>

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

                <Route
                    path="/login"
                    element={<LoginPage/>}
                />
            </Routes>
        </div>
    )
}

export default App
