import {jdLibraries, resumeLibraries, type GeneratedLibrary} from "./aiLibraries"

type AiPreviewQuestion = {id: string; prompt: string; topic: string; rationale: string}
type AiLibraryDetail = GeneratedLibrary & {source: "resume" | "jd"; previewQuestions: AiPreviewQuestion[]}

const previews: Record<string, AiPreviewQuestion[]> = {
    "frontend-resume": [
        {id: "fr-1", prompt: "你在项目中如何拆分 React 组件，避免页面状态相互影响？", topic: "React · 组件设计", rationale: "结合简历中的前端项目，考察组件边界与维护经验。"},
        {id: "fr-2", prompt: "讲一次你用 TypeScript 发现并解决线上风险的经历。", topic: "TypeScript · 工程实践", rationale: "追问简历提到的类型体系与真实收益。"},
        {id: "fr-3", prompt: "如果组件库要兼容多个业务团队，你会如何设计 API 和发布流程？", topic: "组件库 · 协作", rationale: "从项目经历延伸到跨团队交付能力。"},
        {id: "fr-4", prompt: "请说明一次性能优化的指标、定位过程和最终验证结果。", topic: "性能优化 · 结果", rationale: "帮助你把简历中的优化成果讲得具体可信。"},
        {id: "fr-5", prompt: "面试官质疑你在项目中的个人贡献时，你会拿什么证据说明？", topic: "项目表达 · 贡献", rationale: "针对简历中的项目角色准备追问。"},
    ],
    "fullstack-resume": [
        {id: "fs-1", prompt: "你如何划分 Node.js 服务与前端页面之间的职责？", topic: "Node.js · 架构", rationale: "围绕全栈项目的接口和模块划分追问。"},
        {id: "fs-2", prompt: "一次慢查询出现时，你会怎样从日志定位到数据库执行计划？", topic: "数据库 · 排查", rationale: "验证简历中数据库优化经历的深度。"},
        {id: "fs-3", prompt: "系统流量突然增加十倍，你会先监控和扩展哪些环节？", topic: "系统设计 · 容量", rationale: "将全栈项目经验延伸到系统可靠性。"},
        {id: "fs-4", prompt: "讲一次你主导前后端联调并处理接口变更的经历。", topic: "协作 · 交付", rationale: "考察端到端推动项目落地的能力。"},
    ],
    "byte-frontend-jd": [
        {id: "bj-1", prompt: "面对复杂业务页面，你会如何控制 React 状态和渲染开销？", topic: "React · 性能", rationale: "对应目标岗位对大型前端应用的要求。"},
        {id: "bj-2", prompt: "首屏加载慢时，你会怎样确认瓶颈在网络、资源还是渲染？", topic: "性能优化 · 定位", rationale: "结合 JD 的性能优化要求设计场景题。"},
        {id: "bj-3", prompt: "如何设计一套可观测的前端错误监控与告警方案？", topic: "工程化 · 稳定性", rationale: "考察平台型业务的质量保障能力。"},
        {id: "bj-4", prompt: "产品需求频繁变化时，你如何保证交付速度与代码可维护性？", topic: "协作 · 取舍", rationale: "模拟目标岗位常见的业务推进场景。"},
        {id: "bj-5", prompt: "你为什么适合这个岗位？请用两个项目结果支撑。", topic: "岗位匹配 · 表达", rationale: "帮助把个人经历与招聘要求联系起来。"},
    ],
    "meituan-platform-jd": [
        {id: "mj-1", prompt: "如果从零设计低代码平台，你会先确定哪些边界和核心模型？", topic: "低代码 · 建模", rationale: "对应前端平台岗位的低代码能力要求。"},
        {id: "mj-2", prompt: "组件库同时服务多个团队时，你如何管理版本兼容与迁移？", topic: "组件库 · 治理", rationale: "考察平台型组件的长期维护能力。"},
        {id: "mj-3", prompt: "请设计一个可扩展的页面搭建协议，并说明取舍。", topic: "架构设计 · 扩展", rationale: "从岗位职责延伸到架构设计场景。"},
        {id: "mj-4", prompt: "你如何衡量平台工具是否真正提升了研发效率？", topic: "平台价值 · 指标", rationale: "引导用数据说明平台项目的业务价值。"},
    ],
}

export function getAiLibraryDetail(source: string, libraryId: string): AiLibraryDetail | null {
    if (source !== "resume" && source !== "jd") return null
    const libraries = source === "resume" ? resumeLibraries : jdLibraries
    const library = libraries.find((item) => item.id === libraryId)
    const previewQuestions = previews[libraryId]
    if (!library || !previewQuestions) return null
    return {...library, source, previewQuestions}
}

export type {AiLibraryDetail, AiPreviewQuestion}
