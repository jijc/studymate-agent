import {Sparkles, Target} from "lucide-react"

import {ProfileSectionCard} from "@/components/profile/ProfileSectionCard"
import {Button} from "@/components/ui/button"
import {AppSelect} from "@/components/ui/select"

const skills = ["React", "TypeScript", "JavaScript", "Python", "LLM", "Agent"]

function CareerProfileSection() {
    return (
        <ProfileSectionCard
            id="career-profile"
            title="求职画像"
            description="作为 AI 个性化出题的基础画像，并与简历、JD 和历史薄弱点共同使用。"
            icon={Target}
        >
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-primary/15 bg-secondary/55 p-4 text-sm leading-6 text-secondary-foreground">
                <Sparkles aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary"/>
                <p>完善求职画像后，新生成的练习会更贴近你的目标岗位；已经完成的练习和报告不会被修改。</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <div className="grid gap-2 text-sm font-medium">
                    <span>主目标岗位</span>
                    <AppSelect
                        ariaLabel="主目标岗位"
                        defaultValue="ai-frontend"
                        options={[
                            {label: "AI 前端工程师", value: "ai-frontend"},
                            {label: "前端工程师", value: "frontend"},
                            {label: "Agent 工程师", value: "agent"},
                            {label: "全栈工程师", value: "fullstack"},
                        ]}
                    />
                </div>
                <div className="grid gap-2 text-sm font-medium">
                    <span>当前职级</span>
                    <AppSelect
                        ariaLabel="当前职级"
                        defaultValue="middle"
                        options={[
                            {label: "初级", value: "junior"},
                            {label: "中级", value: "middle"},
                            {label: "高级", value: "senior"},
                        ]}
                    />
                </div>
                <div className="grid gap-2 text-sm font-medium">
                    <span>工作经验</span>
                    <AppSelect
                        ariaLabel="工作经验"
                        defaultValue="3-5"
                        options={[
                            {label: "1 年以内", value: "0-1"},
                            {label: "1-3 年", value: "1-3"},
                            {label: "3-5 年", value: "3-5"},
                            {label: "5 年以上", value: "5+"},
                        ]}
                    />
                </div>
                <div className="grid gap-2 text-sm font-medium">
                    <span>回答语言</span>
                    <AppSelect
                        ariaLabel="回答语言"
                        defaultValue="zh"
                        options={[
                            {label: "中文", value: "zh"},
                            {label: "英文", value: "en"},
                        ]}
                    />
                </div>
            </div>

            <fieldset className="mt-6">
                <legend className="text-sm font-medium">核心技术方向</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <button
                            key={skill}
                            type="button"
                            aria-pressed={index < 4}
                            className="rounded-full border border-border bg-card px-4 py-2 text-sm transition hover:border-primary/45 hover:text-primary aria-pressed:border-primary/35 aria-pressed:bg-secondary aria-pressed:text-primary"
                        >
                            {skill}
                        </button>
                    ))}
                </div>
            </fieldset>

            <fieldset className="mt-6">
                <legend className="text-sm font-medium">练习难度</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {["基础", "进阶", "挑战"].map((difficulty) => (
                        <label key={difficulty} className="flex h-12 cursor-pointer items-center gap-3 rounded-xl border border-border/70 bg-card px-4 text-sm">
                            <input type="radio" name="difficulty" defaultChecked={difficulty === "进阶"} className="accent-primary"/>
                            {difficulty}
                        </label>
                    ))}
                </div>
            </fieldset>

            <div className="mt-7 flex justify-end">
                <Button type="button" className="min-w-28">保存画像</Button>
            </div>
        </ProfileSectionCard>
    )
}

export {CareerProfileSection}
