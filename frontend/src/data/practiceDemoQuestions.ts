import type {PracticeQuestion} from "@/api/practice"

// 仅供静态页面展示，接入个人题库接口后删除这组演示数据。
const frontendResumeQuestions: PracticeQuestion[] = [
    {id: "fr-1", prompt: "你在项目中如何拆分 React 组件，避免页面状态相互影响？", topic: "React · 组件设计"},
    {id: "fr-2", prompt: "讲一次你用 TypeScript 发现并解决线上风险的经历。", topic: "TypeScript · 工程实践"},
    {id: "fr-3", prompt: "如果组件库要兼容多个业务团队，你会如何设计 API 和发布流程？", topic: "组件库 · 协作"},
    {id: "fr-4", prompt: "请说明一次性能优化的指标、定位过程和最终验证结果。", topic: "性能优化 · 结果"},
    {id: "fr-5", prompt: "面试官质疑你在项目中的个人贡献时，你会拿什么证据说明？", topic: "项目表达 · 贡献"},
    {id: "fr-6", prompt: "多个组件需要共享筛选条件时，你会怎样决定状态放在哪里？", topic: "React · 状态管理"},
    {id: "fr-7", prompt: "你如何让复杂表单既方便用户填写，又容易维护和测试？", topic: "表单 · 用户体验"},
    {id: "fr-8", prompt: "讲一次你为前端页面补充自动化测试，并发现实际问题的经历。", topic: "测试 · 质量保障"},
    {id: "fr-9", prompt: "当设计稿与现有组件库不一致时，你会怎样和设计、产品协作？", topic: "组件库 · 跨团队协作"},
    {id: "fr-10", prompt: "如果重新设计你简历中的核心项目，你会保留和改进哪些技术决策？", topic: "架构 · 技术取舍"},
]

export function getPracticeDemoQuestions(limit: number): PracticeQuestion[] {
    return frontendResumeQuestions.slice(0, limit)
}
