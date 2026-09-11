import {CapabilitiesSection} from "@/components/home/CapabilitiesSection"
import {HeroSection} from "@/components/home/HeroSection"
import {StepsSection} from "@/components/home/StepsSection"
import {Header} from "@/components/layout/Header"

function App() {
    return (
        <div className="min-h-screen overflow-x-hidden bg-background">
            <Header/>

            <main className="home-background min-h-[calc(100vh-64px)] xl:min-h-[calc(100vh-70px)]">
                <div className="mx-auto w-full max-w-[1480px] px-5 pb-10 pt-7 sm:px-8 lg:px-12 xl:px-8">
                    <HeroSection/>
                    <CapabilitiesSection/>
                    <StepsSection/>
                </div>
            </main>
        </div>
    )
}

export default App
