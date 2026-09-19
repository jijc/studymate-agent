import {Select} from "@base-ui/react/select"
import {Check, ChevronDown} from "lucide-react"

import {cn} from "@/lib/utils"

type SelectOption = {
    label: string
    value: string
}

type AppSelectProps = {
    ariaLabel: string
    defaultValue: string
    options: SelectOption[]
    prefix?: string
    size?: "default" | "compact"
}

function AppSelect({ariaLabel, defaultValue, options, prefix, size = "default"}: AppSelectProps) {
    return (
        <Select.Root defaultValue={defaultValue} items={options}>
            <Select.Trigger
                aria-label={ariaLabel}
                className={cn(
                    "flex items-center justify-between border border-border/55 bg-card text-sm font-medium text-foreground shadow-[0_8px_24px_rgb(119_75_44/4%)] outline-none transition hover:border-primary/35 focus-visible:ring-3 focus-visible:ring-primary/20",
                    size === "compact"
                        ? "h-10 min-w-36 gap-3 rounded-lg px-4"
                        : "h-12 min-w-48 gap-4 rounded-xl px-5",
                )}
            >
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                    {prefix && <span>{prefix}：</span>}
                    <Select.Value/>
                </span>
                <Select.Icon>
                    <ChevronDown aria-hidden="true" className="size-4 text-foreground/70"/>
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Positioner sideOffset={6} alignItemWithTrigger={false} className="z-50 outline-none">
                    <Select.Popup className="min-w-[var(--anchor-width)] origin-[var(--transform-origin)] rounded-xl border border-border bg-card p-1.5 shadow-xl transition-[transform,opacity] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
                        <Select.List>
                            {options.map((option) => (
                                <Select.Item
                                    key={option.value}
                                    value={option.value}
                                    className="relative flex cursor-default items-center whitespace-nowrap rounded-lg py-2 pl-9 pr-3 text-sm outline-none data-highlighted:bg-secondary data-highlighted:text-secondary-foreground"
                                >
                                    <Select.ItemIndicator className="absolute left-3 grid size-4 place-items-center">
                                        <Check aria-hidden="true" className="size-3.5 text-primary"/>
                                    </Select.ItemIndicator>
                                    <Select.ItemText>{option.label}</Select.ItemText>
                                </Select.Item>
                            ))}
                        </Select.List>
                    </Select.Popup>
                </Select.Positioner>
            </Select.Portal>
        </Select.Root>
    )
}

export {AppSelect}
