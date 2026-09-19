import {Dialog} from "@base-ui/react/dialog"
import type {ComponentProps} from "react"

import {cn} from "@/lib/utils"

const DialogRoot = Dialog.Root
const DialogTrigger = Dialog.Trigger
const DialogTitle = Dialog.Title
const DialogDescription = Dialog.Description

function DialogContent({className, ...props}: ComponentProps<typeof Dialog.Popup>) {
    return (
        <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 z-50 bg-[#2b211b]/28 backdrop-blur-[2px] transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0"/>
            <Dialog.Viewport className="fixed inset-0 z-50 grid place-items-center overflow-y-auto p-4 sm:p-6">
                <Dialog.Popup
                    className={cn(
                        "relative my-auto w-full max-w-2xl rounded-2xl border border-border bg-popover p-5 text-popover-foreground shadow-[0_24px_80px_rgb(79_48_29/22%)] outline-none transition duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 sm:p-7",
                        className,
                    )}
                    {...props}
                />
            </Dialog.Viewport>
        </Dialog.Portal>
    )
}

const DialogClose = Dialog.Close

export {DialogClose, DialogContent, DialogDescription, DialogRoot, DialogTitle, DialogTrigger}
