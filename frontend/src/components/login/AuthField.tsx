import type {ComponentType, InputHTMLAttributes} from "react"

import {cn} from "@/lib/utils"

type AuthFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
    label: string
    icon: ComponentType<{className?: string, "aria-hidden"?: boolean}>
    error?: string
}

function AuthField({id, label, icon: Icon, error, ...inputProps}: AuthFieldProps) {
    return (
        <div>
            <label htmlFor={id} className="sr-only">{label}</label>

            <div className="relative">
                <Icon
                    aria-hidden={true}
                    className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                />
                <input
                    id={id}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className={cn(
                        "h-12 w-full rounded-lg border border-input bg-card px-4 pl-12 text-base text-foreground outline-none transition-[border-color,box-shadow] duration-400 placeholder:text-muted-foreground/70 focus:border-ring focus:ring-3 focus:ring-ring/20",
                        error && "border-destructive focus:border-destructive focus:ring-destructive/20",
                    )}
                    {...inputProps}
                />
            </div>

            {error && (
                <p id={`${id}-error`} className="mt-1.5 text-sm text-destructive">{error}</p>
            )}
        </div>
    )
}

export {AuthField}
