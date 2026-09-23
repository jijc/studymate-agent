import {BookOpenCheck, ArrowLeft} from "lucide-react"
import {Link} from "react-router"

import {Button} from "@/components/ui/button"

function PracticeSessionEmptyState({reason}: {reason: "missing" | "empty"}) {
    const missing = reason === "missing"

    return (
        <main className="question-bank-background flex min-h-[calc(100dvh-66px)] items-center justify-center px-5 py-10 sm:px-8">
            <section role="status" aria-label="题库不可用" className="w-full max-w-lg text-center">
                <span aria-hidden="true" className="mx-auto grid size-16 place-items-center rounded-2xl bg-secondary text-primary">
                    <BookOpenCheck className="size-8"/>
                </span>
                <h1 className="mt-5 text-xl font-semibold tracking-tight sm:text-2xl">
                    {missing ? "没有找到这个练习题库" : "这个题库还没有练习题"}
                </h1>
                <p className="mx-auto mt-2 max-w-md text-balance text-sm leading-6 text-muted-foreground">
                    {missing
                        ? "题库可能已被删除，或访问链接有误。请选择其他题库继续练习。"
                        : "这套题库暂时无法开始练习。可以先选择其他题库，稍后再回来看看。"}
                </p>
                <Button render={<Link to="/practice"/>} nativeButton={false} className="mt-6">
                    <ArrowLeft aria-hidden="true" className="size-4"/>返回练习页
                </Button>
            </section>
        </main>
    )
}

export {PracticeSessionEmptyState}
