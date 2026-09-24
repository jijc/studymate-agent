import {ArrowRight, LockKeyhole, Sparkles} from "lucide-react"
import {Button} from "@/components/ui/button"
import {practiceEntryIconClassName} from "@/components/practice/practiceStyles"
import type {PracticeSource} from "@/api/practice"
import {useStartPracticeSession} from "@/hooks/useStartPracticeSession"

type SmartPracticeState =
    | {status: "locked"}
    | {status: "ready"; source: PracticeSource; libraryId: string}

function SmartPracticeCard({state}: {state: SmartPracticeState}) {
    const {startPracticeSession, isStarting, startError} = useStartPracticeSession()
    return (
        <section aria-label="专属 AI 练习" aria-disabled={state.status === "locked" || undefined} className="rounded-2xl border border-primary/20 bg-[linear-gradient(120deg,rgba(255,253,249,0.96),rgba(255,237,222,0.72))] px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                    <span className={practiceEntryIconClassName}>
                        <Sparkles aria-hidden="true" className="size-5"/>
                    </span>
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold text-primary">专属 AI 练习</h3>
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">根据薄弱点生成</span>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                            {state.status === "locked"
                                ? "尚未开启：完成简历专练、JD 专练或基础题库的有效作答后，将根据薄弱点自动生成专属题库。"
                                : "根据你的练习薄弱点生成，继续针对性巩固。"}
                        </p>
                    </div>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-4 sm:justify-end">
                    {state.status === "locked" ? (
                        <>
                            <Button type="button" disabled variant="secondary" className="h-10 px-4"><LockKeyhole aria-hidden="true" className="size-4"/>尚未开启</Button>
                        </>
                    ) : (
                        <Button type="button" disabled={isStarting} onClick={() => startPracticeSession({source: state.source, libraryId: state.libraryId})} className="h-10 px-4">
                            {isStarting ? "正在进入..." : "开始练习"}<ArrowRight aria-hidden="true"/>
                        </Button>
                    )}
                </div>
            </div>
            {startError && <p role="alert" className="mt-3 text-sm text-destructive">{startError.message}</p>}
        </section>
    )
}

export {SmartPracticeCard}
