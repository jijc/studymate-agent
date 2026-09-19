import type {ComponentType} from "react"
import {Menu} from "@base-ui/react/menu"
import {Bot, ChevronDown, Database, Grid2X2, List, Monitor} from "lucide-react"
import {SiPython, SiReact, SiTypescript} from "react-icons/si"

import {AppSelect} from "@/components/ui/select"
import {questionCategories} from "@/data/questionCatalog"
import {cn} from "@/lib/utils"

type QuestionToolbarProps = {
    activeCategory: string
    layout: "grid" | "list"
    onCategoryChange: (category: string) => void
    onLayoutChange: (layout: "grid" | "list") => void
}

const categoryIcons: Record<string, ComponentType<{className?: string}>> = {
    frontend: Monitor,
    react: SiReact,
    typescript: SiTypescript,
    agent: Bot,
    python: SiPython,
    system: Database,
}

const featuredCategoryIds = ["all", "frontend", "react", "typescript", "agent", "python"]
const featuredCategories = questionCategories.filter((category) => featuredCategoryIds.includes(category.id))
const moreSkillCategories = questionCategories.filter((category) => category.id !== "all")

const categoryVisibility: Record<string, string> = {
    all: "flex",
    frontend: "flex",
    react: "hidden sm:flex",
    typescript: "hidden md:flex",
    agent: "hidden lg:flex",
    python: "hidden xl:flex",
}

const categoryButtonClass = "h-10 shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-medium shadow-[0_6px_18px_rgb(112_70_42/4%)] transition"

const filterGroups = [
    {
        ariaLabel: "筛选难度",
        prefix: "难度",
        defaultValue: "all",
        options: [
            {label: "全部", value: "all"},
            {label: "简单", value: "easy"},
            {label: "中等", value: "medium"},
            {label: "较难", value: "hard"},
        ],
    },
    {
        ariaLabel: "筛选题目类型",
        prefix: "题目类型",
        defaultValue: "all",
        options: [
            {label: "全部", value: "all"},
            {label: "单选题", value: "single"},
            {label: "编程题", value: "coding"},
            {label: "问答题", value: "answer"},
        ],
    },
    {
        ariaLabel: "筛选题目数量",
        prefix: "题目数量",
        defaultValue: "all",
        options: [
            {label: "全部", value: "all"},
            {label: "少于 200 题", value: "small"},
            {label: "200 - 300 题", value: "medium"},
            {label: "300 题以上", value: "large"},
        ],
    },
    {
        ariaLabel: "题库排序",
        defaultValue: "latest",
        options: [
            {label: "最新发布", value: "latest"},
            {label: "题目最多", value: "count"},
            {label: "难度最低", value: "easy"},
        ],
    },
]

function QuestionToolbar({activeCategory, layout, onCategoryChange, onLayoutChange}: QuestionToolbarProps) {
    const moreActive = !featuredCategoryIds.includes(activeCategory)

    return (
        <section aria-label="题库分类和筛选" className="space-y-4">
            <div data-testid="question-category-row" className="flex items-center gap-2 overflow-hidden">
                {featuredCategories.map((category) => {
                    const Icon = categoryIcons[category.icon]
                    const active = activeCategory === category.id

                    return (
                        <button
                            key={category.id}
                            type="button"
                            aria-pressed={active}
                            onClick={() => onCategoryChange(category.id)}
                            className={cn(
                                categoryButtonClass,
                                categoryVisibility[category.id],
                                active
                                    ? "border-primary bg-gradient-to-br from-[#ff8b43] to-[#ff5a1f] text-white shadow-[0_8px_20px_rgb(255_91_31/18%)]"
                                    : "border-border/45 bg-card text-foreground/85 hover:border-primary/30 hover:text-primary",
                            )}
                        >
                            {Icon && <Icon aria-hidden="true" className="size-4.5"/>}
                            {category.label}
                        </button>
                    )
                })}

                <Menu.Root>
                    <Menu.Trigger
                        aria-label="更多"
                        aria-pressed={moreActive}
                        className={cn(
                            categoryButtonClass,
                            "ml-auto flex",
                            moreActive
                                ? "border-primary bg-gradient-to-br from-[#ff8b43] to-[#ff5a1f] text-white shadow-[0_8px_20px_rgb(255_91_31/18%)]"
                                : "border-border/45 bg-card text-foreground/85 hover:border-primary/30 hover:text-primary",
                        )}
                    >
                        更多
                        <ChevronDown aria-hidden="true" className="size-4 transition-transform data-popup-open:rotate-180"/>
                    </Menu.Trigger>

                    <Menu.Portal>
                        <Menu.Positioner sideOffset={8} align="end" className="z-50 outline-none">
                            <Menu.Popup
                                aria-label="更多 IT 技能"
                                className="grid w-[min(36rem,calc(100vw-2rem))] origin-[var(--transform-origin)] grid-cols-2 gap-1 rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-[0_18px_48px_rgb(92_58_38/16%)] outline-none transition-[transform,opacity] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 sm:grid-cols-3"
                            >
                                {moreSkillCategories.map((category) => (
                                    <Menu.Item
                                        key={category.id}
                                        closeOnClick
                                        onClick={() => onCategoryChange(category.id)}
                                        className={cn(
                                            "cursor-default rounded-lg px-3 py-2.5 text-sm outline-none transition-colors data-highlighted:bg-secondary data-highlighted:text-primary",
                                            activeCategory === category.id && "bg-secondary text-primary",
                                        )}
                                    >
                                        {category.label}
                                    </Menu.Item>
                                ))}
                            </Menu.Popup>
                        </Menu.Positioner>
                    </Menu.Portal>
                </Menu.Root>
            </div>

            <div className="flex items-center gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {filterGroups.map((filter) => (
                    <AppSelect key={filter.ariaLabel} {...filter} size="compact"/>
                ))}

                <div className="ml-auto flex shrink-0 rounded-xl border border-border/45 bg-card p-1 shadow-[0_8px_24px_rgb(112_70_42/4%)]">
                    <button
                        type="button"
                        aria-label="网格视图"
                        aria-pressed={layout === "grid"}
                        onClick={() => onLayoutChange("grid")}
                        className={cn(
                            "grid size-9 place-items-center rounded-lg transition",
                            layout === "grid" ? "bg-secondary text-primary" : "text-muted-foreground hover:text-primary",
                        )}
                    >
                        <Grid2X2 aria-hidden="true" className="size-5"/>
                    </button>
                    <button
                        type="button"
                        aria-label="列表视图"
                        aria-pressed={layout === "list"}
                        onClick={() => onLayoutChange("list")}
                        className={cn(
                            "grid size-9 place-items-center rounded-lg transition",
                            layout === "list" ? "bg-secondary text-primary" : "text-muted-foreground hover:text-primary",
                        )}
                    >
                        <List aria-hidden="true" className="size-5"/>
                    </button>
                </div>
            </div>
        </section>
    )
}

export {QuestionToolbar}
