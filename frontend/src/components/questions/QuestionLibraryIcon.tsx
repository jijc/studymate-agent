import type {ComponentType, SVGProps} from "react"
import {Cpu, Database, Layers3, Network} from "lucide-react"
import {FaJava} from "react-icons/fa"
import {SiGo, SiNodedotjs, SiPython, SiReact, SiTypescript, SiVuedotjs} from "react-icons/si"

import type {QuestionLibraryIcon as QuestionLibraryIconName} from "@/data/questionLibraries"
import {cn} from "@/lib/utils"

const libraryIcons: Record<QuestionLibraryIconName, ComponentType<SVGProps<SVGSVGElement>>> = {
    react: SiReact,
    vue: SiVuedotjs,
    typescript: SiTypescript,
    java: FaJava,
    python: SiPython,
    go: SiGo,
    node: SiNodedotjs,
    database: Database,
    network: Network,
    system: Cpu,
    architecture: Layers3,
}

type QuestionLibraryIconProps = {
    icon: QuestionLibraryIconName
    className?: string
    label?: string
}

function QuestionLibraryIcon({icon, className, label}: QuestionLibraryIconProps) {
    const Icon = libraryIcons[icon]

    return label ? (
        <Icon role="img" aria-label={label} className={cn("size-8", className)}/>
    ) : (
        <Icon aria-hidden="true" className={cn("size-8", className)}/>
    )
}

export {QuestionLibraryIcon}
