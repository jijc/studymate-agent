import {SidebarPageLayout} from "@/components/layout/SidebarPageLayout"
import {sidebarPageContentClassName} from "@/components/layout/pageSidebarStyles"
import {PracticeHero} from "@/components/practice/PracticeHero"
import {PracticeLibraryPicker} from "@/components/practice/PracticeLibraryPicker"
import {PracticeSidebar} from "@/components/practice/PracticeSidebar"
import {cn} from "@/lib/utils"

function PracticePage() {
    return (
        <SidebarPageLayout>
            <PracticeSidebar/>

            <main className={cn(sidebarPageContentClassName, "px-5 pb-28 pt-6 sm:px-8 md:pb-12 xl:px-10")}>
                <div className="mx-auto max-w-[1340px] space-y-6">
                    <PracticeHero/>
                    <PracticeLibraryPicker/>
                </div>
            </main>
        </SidebarPageLayout>
    )
}


export {PracticePage}
