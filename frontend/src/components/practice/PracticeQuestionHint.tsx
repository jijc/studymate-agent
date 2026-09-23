import {Lightbulb} from "lucide-react"

function PracticeQuestionHint({topic}: {topic: string}) {
    return (
        <details className="mt-5 rounded-xl border border-primary/15 bg-secondary/30 px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-primary [&::-webkit-details-marker]:hidden">
                <Lightbulb aria-hidden="true" className="size-4"/>
                AI 提示
                <span className="ml-auto text-xs font-normal text-muted-foreground">按需展开</span>
            </summary>
            <p className="mt-3 border-t border-primary/10 pt-3 text-sm leading-6 text-muted-foreground">
                先用一句话说明「{topic}」的关键点，再结合真实项目或场景，讲清自己的选择和结果。
            </p>
        </details>
    )
}

export {PracticeQuestionHint}
