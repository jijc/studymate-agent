import {InterviewLibraryPicker} from "@/components/interview/InterviewLibraryPicker"
import {PracticeLibrarySection} from "@/components/practice/PracticeLibrarySection"
import {SmartPracticeCard} from "@/components/practice/SmartPracticeCard"

function PracticeLibraryPicker() {
    return (
        <section id="practice-modes" aria-label="开始一组练习" className="scroll-mt-24 space-y-8">
            <section aria-label="AI 练习">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">AI 练习</h2>
                    <p className="mt-1 text-sm text-muted-foreground">从你的薄弱点、简历或目标岗位出发，选择适合自己的练习。</p>
                </div>
                <div className="space-y-4">
                    <SmartPracticeCard state={{status: "locked"}}/>
                    <PracticeLibrarySection source="resume"/>
                    <PracticeLibrarySection source="jd"/>
                </div>
            </section>

            <InterviewLibraryPicker/>

            <section aria-label="基础题库练习">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">基础题库练习</h2>
                    <p className="mt-1 text-sm text-muted-foreground">站内整理的公共题库，按技术方向选择即可开始。</p>
                </div>
                <PracticeLibrarySection source="basic"/>
            </section>
        </section>
    )
}

export {PracticeLibraryPicker}
