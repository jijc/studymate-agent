import {useState} from "react"
import {BriefcaseBusiness, FileText, Upload, X} from "lucide-react"

import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"

type LibrarySource = "resume" | "jd"

const fieldClassName = "h-10 w-full rounded-lg border border-input bg-card px-3 text-sm outline-none transition placeholder:text-muted-foreground/65 focus:border-primary focus:ring-3 focus:ring-primary/10"

function CreateLibraryDialog() {
    const [source, setSource] = useState<LibrarySource>("resume")

    return (
        <DialogRoot>
            <DialogTrigger aria-label="新建题库" render={<Button type="button"/>}>
                <span className="text-lg leading-none">＋</span>
                新建题库
            </DialogTrigger>

            <DialogContent>
                <DialogClose
                    aria-label="关闭弹窗"
                    className="absolute right-4 top-4 grid size-9 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-primary/20"
                >
                    <X aria-hidden="true" className="size-5"/>
                </DialogClose>

                <DialogTitle className="pr-12 text-xl font-semibold">新建 AI 题库</DialogTitle>
                <DialogDescription className="mt-1 text-sm text-muted-foreground">
                    选择资料类型，AI 会围绕你的真实求职目标生成专属题目。
                </DialogDescription>

                <div role="tablist" aria-label="题库生成方式" className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-muted/75 p-1.5">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={source === "resume"}
                        onClick={() => setSource("resume")}
                        className={cn(
                            "flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-medium transition",
                            source === "resume" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground",
                        )}
                    >
                        <FileText aria-hidden="true" className="size-4"/>
                        简历生成
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={source === "jd"}
                        onClick={() => setSource("jd")}
                        className={cn(
                            "flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-medium transition",
                            source === "jd" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground",
                        )}
                    >
                        <BriefcaseBusiness aria-hidden="true" className="size-4"/>
                        招聘信息生成
                    </button>
                </div>

                {source === "resume" ? <ResumeFields/> : <JdFields/>}

                <div className="mt-6 flex flex-col-reverse gap-2 border-t border-border/65 pt-5 sm:flex-row sm:justify-end">
                    <DialogClose render={<Button type="button" variant="ghost"/>}>取消</DialogClose>
                    <Button type="button">开始生成</Button>
                </div>
            </DialogContent>
        </DialogRoot>
    )
}

function UploadField({id, label}: {id: string; label: string}) {
    return (
        <label htmlFor={id} className="block cursor-pointer rounded-xl border border-dashed border-primary/35 bg-secondary/20 px-4 py-5 text-center transition hover:border-primary/60 hover:bg-secondary/35">
            <input id={id} type="file" aria-label={label} accept=".pdf,.doc,.docx" className="sr-only"/>
            <Upload aria-hidden="true" className="mx-auto size-6 text-primary"/>
            <span className="mt-2 block text-sm font-medium">点击上传文件</span>
            <span className="mt-1 block text-xs text-muted-foreground">支持 PDF、DOC、DOCX</span>
        </label>
    )
}

function ResumeFields() {
    return (
        <div role="tabpanel" className="mt-5 space-y-4">
            <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                    <label htmlFor="resume-file" className="text-sm font-medium">上传简历</label>
                    <span className="text-xs text-muted-foreground">还可创建 1 个</span>
                </div>
                <UploadField id="resume-file" label="上传简历"/>
            </div>
            <label className="block text-sm font-medium">
                目标职位
                <input className={`${fieldClassName} mt-2`} placeholder="例如：高级前端工程师"/>
            </label>
        </div>
    )
}

function JdFields() {
    return (
        <div role="tabpanel" className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
                公司名称
                <input className={`${fieldClassName} mt-2`} placeholder="例如：字节跳动"/>
            </label>
            <label className="block text-sm font-medium">
                招聘职位
                <input className={`${fieldClassName} mt-2`} placeholder="例如：前端工程师"/>
            </label>
            <label className="block text-sm font-medium sm:col-span-2">
                招聘信息
                <textarea className="mt-2 min-h-28 w-full resize-y rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground/65 focus:border-primary focus:ring-3 focus:ring-primary/10" placeholder="粘贴岗位职责与任职要求"/>
            </label>
            <div className="sm:col-span-2">
                <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium">或上传招聘信息</span>
                    <span className="text-xs text-muted-foreground">还可创建 4 个</span>
                </div>
                <UploadField id="jd-file" label="上传招聘信息"/>
            </div>
        </div>
    )
}

export {CreateLibraryDialog}
