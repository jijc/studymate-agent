import {CapabilitiesSection} from "@/components/home/CapabilitiesSection"
import {HeroSection} from "@/components/home/HeroSection"
import {StepsSection} from "@/components/home/StepsSection"

function HomePage() {
    return (
        <main className="min-h-[calc(100dvh-66px)]">
            <div className="mx-auto w-full max-w-[1480px] px-5 pb-10 pt-7 sm:px-8 lg:px-12 xl:px-8">
                <HeroSection/>
                <CapabilitiesSection/>
                <StepsSection/>
            </div>
        </main>
    )
}

export {HomePage}
