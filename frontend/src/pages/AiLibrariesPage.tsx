import {SidebarPageLayout} from "@/components/layout/SidebarPageLayout"
import {sidebarPageContentClassName} from "@/components/layout/pageSidebarStyles"
import {AiLibraryHero} from "@/components/questions/AiLibraryHero"
import {ExclusiveAiLibraryCard} from "@/components/questions/ExclusiveAiLibraryCard"
import {GeneratedLibrarySection} from "@/components/questions/GeneratedLibrarySection"
import {QuestionSidebar} from "@/components/questions/QuestionSidebar"
import {jdLibraries, resumeLibraries} from "@/data/aiLibraries"
import {cn} from "@/lib/utils"

function AiLibrariesPage() {
    return (
        <div className="question-bank-background min-h-[calc(100dvh-66px)]">
            <SidebarPageLayout>
                <QuestionSidebar/>

                <main className={cn(sidebarPageContentClassName, "px-5 pb-12 pt-6 sm:px-8 xl:px-10")}>
                    <div className="mx-auto max-w-[1340px] space-y-7">
                        <AiLibraryHero/>
                        <ExclusiveAiLibraryCard/>
                        <GeneratedLibrarySection
                            title="简历题库"
                            description="围绕你的项目经历、技术栈和目标岗位生成"
                            count={resumeLibraries.length}
                            limit={3}
                            libraries={resumeLibraries}
                        />
                        <GeneratedLibrarySection
                            title="JD 题库"
                            description="针对具体公司的招聘要求进行定向准备"
                            count={jdLibraries.length}
                            limit={6}
                            libraries={jdLibraries}
                        />
                    </div>
                </main>
            </SidebarPageLayout>
        </div>
    )
}

export {AiLibrariesPage}
