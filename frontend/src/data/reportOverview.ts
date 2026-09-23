const progressTrend = [
    {date: "10/14", score: 33},
    {date: "10/15", score: 42},
    {date: "10/16", score: 40},
    {date: "10/17", score: 54},
    {date: "10/18", score: 61},
    {date: "10/19", score: 73},
    {date: "10/20", score: 85},
]

const abilityScores = [
    {ability: "算法与数据结构", score: 82},
    {ability: "系统设计", score: 68},
    {ability: "React / 前端", score: 70},
    {ability: "问题分析", score: 88},
    {ability: "沟通表达", score: 76},
    {ability: "项目与实践", score: 65},
]

const weaknessItems = [
    {
        title: "表达结构",
        description: "回答思路不够清晰，建议使用 STAR 法则",
        score: 52,
        tone: "orange",
    },
    {
        title: "React 细节",
        description: "对 Hooks 和生命周期理解不够深入",
        score: 60,
        tone: "blue",
    },
    {
        title: "系统设计",
        description: "缺少高并发与扩展性设计的实践经验",
        score: 58,
        tone: "amber",
    },
] as const

const recentPractice = [
    {title: "React 基础练习", type: "基础练习", date: "10月20日  19:24", score: 85, duration: "28 分钟", tone: "orange"},
    {title: "系统设计 - 电商秒杀", type: "专项练习", date: "10月19日  16:03", score: 72, duration: "25 分钟", tone: "orange"},
    {title: "项目经历梳理", type: "AI 生成题目", date: "10月18日  20:11", score: 78, duration: "18 分钟", tone: "blue"},
] as const

export {abilityScores, progressTrend, recentPractice, weaknessItems}
