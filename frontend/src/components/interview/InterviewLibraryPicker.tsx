import {ArrowRight, BriefcaseBusiness, FileText, MessageCircleMore, X} from "lucide-react"
import {Link} from "react-router"

import {DialogClose, DialogContent, DialogDescription, DialogRoot, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {jdLibraries, resumeLibraries, type GeneratedLibrary} from "@/data/aiLibraries"

const libraries = [...resumeLibraries, ...jdLibraries]

function LibraryGroup({title, items}: {title: string; items: GeneratedLibrary[]}) {
    return (
        <div>
            <p className="text-sm font-semibold">{title}</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {items.map((library) => {
                    const Icon = library.kind === "resume" ? FileText : BriefcaseBusiness
                    return (
                        <Link
                            key={library.id}
                            to={`/interview/session/${library.kind}/${library.id}`}
                            state={{from: "/practice"}}
                            className="group flex min-w-0 items-start gap-3 rounded-xl border border-border/75 bg-card p-3.5 transition hover:border-primary/40 hover:bg-secondary/25"
                        >
                            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary text-primary"><Icon aria-hidden="true" className="size-4"/></span>
                            <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-medium">{library.title}</span>
                                <span className="mt-1 block text-xs text-muted-foreground">{library.questionCount} 题 · 5 轮演示</span>
                            </span>
                            <ArrowRight aria-hidden="true" className="mt-2 size-4 shrink-0 text-primary opacity-70 transition group-hover:translate-x-0.5"/>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

function InterviewLibraryPicker() {
    return (
        <section aria-label="AI 模拟面试" className="flex flex-col gap-5 rounded-2xl border border-primary/20 bg-[linear-gradient(120deg,rgba(255,253,249,0.96),rgba(255,237,222,0.82))] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground"><MessageCircleMore aria-hidden="true" className="size-5"/></span>
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-semibold">AI 模拟面试</h2>
                        <span className="rounded-full bg-card/80 px-2 py-0.5 text-xs text-primary">静态演示</span>
                    </div>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">基于你的简历或目标岗位，体验连续问答与面试回顾。当前支持文字作答，问题和建议为演示内容。</p>
                </div>
            </div>

            <DialogRoot>
                <DialogTrigger render={<Button type="button" className="shrink-0"/>} aria-label="选择题库开始模拟面试">
                    选择题库开始模拟面试<ArrowRight aria-hidden="true"/>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                    <DialogClose aria-label="关闭弹窗" className="absolute right-4 top-4 grid size-9 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"><X aria-hidden="true" className="size-5"/></DialogClose>
                    <DialogTitle className="pr-10 text-xl font-semibold">选择模拟面试题库</DialogTitle>
                    <DialogDescription className="mt-1 text-sm leading-6 text-muted-foreground">选择已有的简历或 JD 题库，开始一场 5 轮文字模拟面试。</DialogDescription>
                    {libraries.length > 0 ? (
                        <div className="mt-6 max-h-[60dvh] space-y-5 overflow-y-auto pr-1">
                            <LibraryGroup title="简历题库" items={resumeLibraries}/>
                            <LibraryGroup title="JD 题库" items={jdLibraries}/>
                        </div>
                    ) : (
                        <div className="mt-6 rounded-xl border border-dashed border-border p-6 text-center">
                            <p className="text-sm text-muted-foreground">还没有可用的 AI 题库。</p>
                            <Link to="/questions/ai" className="mt-3 inline-flex text-sm font-medium text-primary">新建 AI 题库</Link>
                        </div>
                    )}
                    <p className="mt-5 border-t border-border/60 pt-4 text-xs text-muted-foreground">专属 AI 题库尚未解锁，暂不列入模拟面试来源。语音与真实 AI 追问待接入。</p>
                </DialogContent>
            </DialogRoot>
        </section>
    )
}

export {InterviewLibraryPicker}
