import {useState} from "react"
import {Dialog} from "@base-ui/react/dialog"
import {List, X} from "lucide-react"

import {QuestionDirectory} from "@/components/questions/QuestionDirectory"
import {Button} from "@/components/ui/button"
import type {QuestionDirectoryItem} from "@/data/questionLibraryDetails"

type QuestionDirectoryDialogProps = {
    libraryTitle: string
    questions: QuestionDirectoryItem[]
    activeQuestionId: string
    query: string
    onQueryChange: (query: string) => void
    onQuestionChange: (questionId: string) => void
}

function QuestionDirectoryDialog(props: QuestionDirectoryDialogProps) {
    const [open, setOpen] = useState(false)

    function handleQuestionChange(questionId: string) {
        props.onQuestionChange(questionId)
        setOpen(false)
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
                render={<Button type="button" variant="outline"/>}
                className="xl:hidden"
                aria-label="打开题目目录"
            >
                <List aria-hidden="true"/>
                题目目录
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] xl:hidden"/>
                <Dialog.Popup className="fixed inset-y-0 left-0 z-50 flex w-[min(22rem,calc(100vw-2rem))] flex-col bg-background p-4 shadow-2xl outline-none xl:hidden">
                    <div className="mb-3 flex items-center justify-between">
                        <Dialog.Title className="text-lg font-semibold">{props.libraryTitle} 题目目录</Dialog.Title>
                        <Dialog.Close
                            render={<Button type="button" variant="ghost" size="icon"/>}
                            aria-label="关闭题目目录"
                        >
                            <X aria-hidden="true"/>
                        </Dialog.Close>
                    </div>
                    <div className="min-h-0 flex-1">
                        <QuestionDirectory {...props} onQuestionChange={handleQuestionChange}/>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export {QuestionDirectoryDialog}
