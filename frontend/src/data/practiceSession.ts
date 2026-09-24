/**
 * 文件作用：本地静态练习数据与题库适配逻辑；为 PracticeSessionPage 提供模拟题目。
 * 说明：真实 API 接入后，这部分静态题目逻辑会逐步减少或移除。
 */

import {jdLibraries, resumeLibraries} from "@/data/aiLibraries"
import {getPracticeDemoQuestions} from "@/data/practiceDemoQuestions"
import {questionLibraries} from "@/data/questionLibraries"
import type {PracticeQuestion as ApiPracticeQuestion, PracticeSource as ApiPracticeSource} from "@/api/practice"

export type PracticeSource = ApiPracticeSource

export type PracticeQuestion = ApiPracticeQuestion & {
    feedback: string
}

export type PracticeLibraryChoice = {
    id: string
    source: PracticeSource
    title: string
}

function getLibraryContext(source: string, libraryId: string): {title: string; topics: string[]} | null {
    if (source === "basic") {
        const library = questionLibraries.find((item) => item.id === libraryId)
        return library ? {title: library.title, topics: library.topics} : null
    }

    if (source === "resume" || source === "jd") {
        const libraries = source === "resume" ? resumeLibraries : jdLibraries
        const library = libraries.find((item) => item.id === libraryId)
        return library ? {title: library.title, topics: library.skills} : null
    }

    return null
}

export function resolvePracticeLibrary(source: string, libraryId: string): PracticeLibraryChoice | null {
    const library = getLibraryContext(source, libraryId)
    if (!library) return null

    return {id: libraryId, source: source as PracticeSource, title: library.title}
}

export function getPracticeQuestions(source: string, libraryId: string): PracticeQuestion[] {
    const library = getLibraryContext(source, libraryId)
    if (!library) return []

    if (source === "resume" && libraryId === "frontend-resume") {
        return getPracticeDemoQuestions(10).map((question) => ({
            ...question,
            feedback: "先给出结论，再结合具体场景说明取舍和验证方式。",
        }))
    }

    const [first = library.title, second = library.title, third = library.title] = library.topics
    const prompts = source === "basic" ? [
        `请用自己的话解释 ${library.title} 中的「${first}」是什么，并给一个实际例子。`,
        `「${first}」与「${second}」有什么联系和区别？`,
        `在 ${library.title} 项目中，你会怎样定位与「${first}」相关的问题？`,
        `请说明「${second}」的核心原理，以及使用它时常见的误区。`,
        `如果要向初学者解释 ${library.title} 的关键机制，你会从哪里讲起？`,
        `请举例说明「${third}」在实际开发中的应用。`,
        `遇到 ${library.title} 的性能问题时，你会如何分析和验证？`,
        `请描述一个与「${second}」相关的典型面试场景及回答思路。`,
        `在 ${library.title} 中，如何权衡可读性、性能和维护成本？`,
        `请总结学习 ${library.title} 时最容易忽略的三个知识点。`,
    ] : source === "resume" ? [
        `结合「${library.title}」简历，介绍你最有代表性的项目和个人贡献。`,
        `你在项目中如何实际使用 ${first}？遇到了什么难点？`,
        `如果重新设计简历中与 ${second} 相关的方案，你会改进什么？`,
        `请讲一次你定位并解决线上问题的经历。`,
        `你如何判断项目中的技术选型是否适合业务目标？`,
        `围绕 ${third}，描述一次跨团队协作或方案推动的过程。`,
        `简历里哪个成果最能量化你的价值？如何证明？`,
        `面试官质疑你的项目规模或个人贡献时，你会怎样说明？`,
        `请解释一个你做过的性能或稳定性优化，并说明验证结果。`,
        `从当前简历出发，你接下来最想补强哪项能力？`,
    ] : [
        `针对「${library.title}」岗位，你如何理解它最重要的技术要求？`,
        `如果岗位重点考察 ${first}，你会如何设计并落地相关方案？`,
        `请结合实际经验说明你如何处理 ${second} 的典型问题。`,
        `当业务增长导致当前方案遇到瓶颈时，你会先验证什么？`,
        `你会如何把这份招聘要求拆成可执行的技术目标？`,
        `围绕 ${third}，请描述一个你会主动追问面试官的问题。`,
        `如果时间和资源有限，你会怎样为该岗位的项目排优先级？`,
        `请说明你如何与产品、设计或后端同事协作推动交付。`,
        `面试官给出一个模糊需求时，你会如何澄清并提出方案？`,
        `你认为自己与「${library.title}」岗位最匹配和最需要提升的点是什么？`,
    ]

    return prompts.map((prompt, index) => ({
        id: `${source}-${libraryId}-${index + 1}`,
        prompt,
        topic: library.topics[index % library.topics.length] ?? library.title,
        feedback: "先给出结论，再结合具体场景说明取舍和验证方式。",
    }))
}
