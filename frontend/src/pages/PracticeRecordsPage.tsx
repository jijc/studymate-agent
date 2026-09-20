import {SidebarPageLayout} from "@/components/layout/SidebarPageLayout"
import {sidebarPageContentClassName} from "@/components/layout/pageSidebarStyles"
import {PracticeHistory} from "@/components/practice/PracticeHistory"
import {PracticeSidebar} from "@/components/practice/PracticeSidebar"
import {getAllPracticeRecords} from "@/data/practiceRecords"
import {cn} from "@/lib/utils"

function PracticeRecordsPage() {
    const records = getAllPracticeRecords()

    return (
        <SidebarPageLayout>
            <PracticeSidebar/>
            <main className={cn(sidebarPageContentClassName, "px-5 pb-12 pt-7 sm:px-8 xl:px-10")}>
                <div className="mx-auto max-w-[1340px]">
                    <div className="mb-7 border-b border-border/55 pb-5">
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">练习记录</h1>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">按时间回看你的作答和复盘，发现下一步值得加强的知识点。</p>
                    </div>
                    <PracticeHistory records={records}/>
                </div>
            </main>
        </SidebarPageLayout>
    )
}

export {PracticeRecordsPage}
