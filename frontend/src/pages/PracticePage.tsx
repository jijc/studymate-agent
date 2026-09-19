import {SidebarPageLayout} from "@/components/layout/SidebarPageLayout"
import {sidebarPageContentClassName} from "@/components/layout/pageSidebarStyles"
import {PracticeHero} from "@/components/practice/PracticeHero"
import {PracticeHistory} from "@/components/practice/PracticeHistory"
import {PracticeModeGrid} from "@/components/practice/PracticeModeGrid"
import {PracticeSidebar} from "@/components/practice/PracticeSidebar"
import {practiceModes, practiceRecords} from "@/data/practiceOverview"
import {cn} from "@/lib/utils"

function PracticePage() {
    return (
        <div className="question-bank-background min-h-[calc(100dvh-66px)]">
            <SidebarPageLayout>
                <PracticeSidebar/>

                <main className={cn(sidebarPageContentClassName, "px-5 pb-12 pt-6 sm:px-8 xl:px-10")}>
                    <div className="mx-auto max-w-[1340px] space-y-7">
                        <PracticeHero/>
                        <PracticeModeGrid modes={practiceModes}/>
                        <PracticeHistory records={practiceRecords}/>
                    </div>
                </main>
            </SidebarPageLayout>
        </div>
    )
}


export {PracticePage}
