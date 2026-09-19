import {questionLibraries, type QuestionLibrary} from "@/data/questionLibraries"

export type QuestionKeyword = {
    term: string
    explanation: string
}

export type QuestionFollowUp = {
    questionId: string
    title: string
    summary: string
}

export type LibraryQuestion = {
    id: string
    sequence: number
    chapter: string
    title: string
    summary: string
    keywords: QuestionKeyword[]
    plainAnswer: string
    answer: string
    explanation: string
    code?: {language: string; content: string}
    tips: string[]
    followUps: QuestionFollowUp[]
}

export type QuestionDirectoryItem = Pick<LibraryQuestion, "id" | "sequence" | "chapter" | "title">

export type QuestionLibraryDetail = QuestionLibrary & {
    questions: LibraryQuestion[]
}

const questionsByLibrary: Record<string, LibraryQuestion[]> = {
    react: [
        {
            id: "react-render",
            sequence: 1,
            chapter: "核心原理",
            title: "React 组件为什么会重新渲染？",
            summary: "考察状态更新、父组件渲染、Context 变化与渲染优化边界。",
            keywords: [
                {term: "重新渲染", explanation: "React 再次执行组件函数，计算这一次界面应该长什么样。"},
                {term: "Context", explanation: "跨层级共享数据的机制，值变化时会通知正在使用它的组件。"},
                {term: "DOM 更新", explanation: "浏览器页面节点真正发生变化；重新渲染并不代表 DOM 一定会改变。"},
            ],
            plainAnswer: "简单说，只要组件自己的状态变了、父组件重新执行了，或者它使用的 Context 变了，React 就可能重新计算这个组件。不过 React 会先比较新旧结果，只把真正变化的部分更新到页面。",
            answer: "React 组件会在自身状态更新、父组件重新渲染或所消费的 Context 值变化时重新执行渲染。重新渲染不等于一定修改 DOM，React 会比较新旧结果，只提交必要的 DOM 更新。",
            explanation: "函数组件的渲染本质是再次调用组件函数。性能优化的重点不是阻止所有渲染，而是避免昂贵且无意义的计算与子树更新。React.memo、useMemo 和 useCallback 只有在依赖稳定且确有性能成本时才有价值。",
            code: {
                language: "tsx",
                content: [
                    "const UserCard = memo(function UserCard({user}: Props) {",
                    "    return <strong>{user.name}</strong>",
                    "})",
                    "",
                    "function Profile({user}: Props) {",
                    "    const label = useMemo(() => formatUser(user), [user])",
                    "    return <UserCard user={user} aria-label={label}/>",
                    "}",
                ].join("\n"),
            },
            tips: ["先列出触发渲染的来源，再说明渲染与 DOM 更新的区别。", "最后补充优化前应先测量，避免把 memo 当成默认写法。"],
            followUps: [
                {questionId: "react-memo-callback", title: "useMemo 和 useCallback 有什么区别？", summary: "继续理解引用稳定和渲染优化之间的关系。"},
                {questionId: "react-context", title: "如何避免 Context 导致的大范围更新？", summary: "从 Context 更新传播进一步理解组件重新渲染。"},
            ],
        },
        {
            id: "react-memo-callback",
            sequence: 2,
            chapter: "Hooks",
            title: "useMemo 和 useCallback 有什么区别？",
            summary: "考察缓存值、缓存函数引用以及依赖项的理解。",
            keywords: [
                {term: "useMemo", explanation: "把一次计算得到的结果暂时保存，在依赖不变时重复使用。"},
                {term: "useCallback", explanation: "把函数本身的引用暂时保存，避免每次渲染都得到一个新函数。"},
                {term: "依赖项", explanation: "决定缓存什么时候失效并重新计算的一组值。"},
            ],
            plainAnswer: "useMemo 记住的是一个计算结果，useCallback 记住的是一个函数。只有当计算确实比较贵，或者子组件依赖稳定引用时，才值得使用它们。",
            answer: "useMemo 缓存计算结果，useCallback 缓存函数引用。useCallback(fn, deps) 可以理解为 useMemo(() => fn, deps)，两者都只应在有明确性能收益或引用稳定需求时使用。",
            explanation: "缓存也有创建依赖数组、比较依赖和保留对象的成本。常见使用场景是昂贵计算，或将稳定引用传给经过 memo 优化的子组件，而不是给每个变量和函数都加缓存。",
            code: {
                language: "tsx",
                content: [
                    "const visibleItems = useMemo(",
                    "    () => filterItems(items, query),",
                    "    [items, query],",
                    ")",
                    "const handleSelect = useCallback((id: string) => onSelect(id), [onSelect])",
                ].join("\n"),
            },
            tips: ["一句话说清缓存对象不同，再给各自典型场景。", "主动说明不要滥用，能体现工程判断力。"],
            followUps: [
                {questionId: "react-render", title: "React 组件为什么会重新渲染？", summary: "回到缓存优化所针对的渲染来源。"},
                {questionId: "react-context", title: "如何避免 Context 导致的大范围更新？", summary: "结合引用稳定理解 Provider value 的优化。"},
            ],
        },
        {
            id: "react-controlled",
            sequence: 3,
            chapter: "组件设计",
            title: "什么是受控组件和非受控组件？",
            summary: "考察表单状态归属、可预测性与组件封装取舍。",
            keywords: [
                {term: "受控组件", explanation: "组件的当前值由 React 状态负责保存和更新。"},
                {term: "非受控组件", explanation: "值主要保存在 DOM 中，需要时通过 ref 读取。"},
            ],
            plainAnswer: "受控组件把数据交给 React 管，非受控组件把数据留在浏览器的 DOM 里。需要实时校验和联动时用受控方式，只在提交时读取的简单表单可以用非受控方式。",
            answer: "受控组件由 React 状态作为唯一数据源，通过 value 和 onChange 驱动；非受控组件由 DOM 保存当前值，通常通过 ref 读取。受控方式更容易校验和联动，非受控方式在简单表单或接入原生控件时更轻量。",
            explanation: "选择关键在于状态应由谁负责。需要实时校验、跨字段联动或外部重置时优先受控；只在提交时读取值且交互简单时，可使用非受控方式。",
            tips: ["围绕数据源归属回答，不要只背 value 和 ref。", "补充各自适用场景，体现权衡。"],
            followUps: [],
        },
        {
            id: "react-context",
            sequence: 4,
            chapter: "性能优化",
            title: "如何避免 Context 导致的大范围更新？",
            summary: "考察 Context 更新传播、状态拆分与引用稳定。",
            keywords: [
                {term: "Provider", explanation: "Context 的数据提供者，负责把 value 传给后代消费者。"},
                {term: "引用稳定", explanation: "对象或函数在内容不变时继续使用同一个引用，避免产生无意义更新。"},
            ],
            plainAnswer: "不要把所有全局数据都塞进一个 Context。可以按职责拆开，并让 Provider 的 value 在内容不变时保持同一个引用，这样无关组件就不会跟着频繁更新。",
            answer: "可以按变化频率和职责拆分 Context，稳定 Provider 的 value 引用，并让组件只订阅真正需要的数据。高频且细粒度的全局状态可考虑专门的状态库或选择器模式。",
            explanation: "Context 的 value 引用变化会通知所有消费者。把完全无关的数据放进同一个对象，会扩大更新范围；但拆分过细也会增加维护成本，需要根据真实渲染瓶颈决定。",
            tips: ["先解释问题来源，再按拆分、稳定引用、细粒度订阅回答。", "强调使用 Profiler 验证，而不是凭感觉优化。"],
            followUps: [
                {questionId: "react-render", title: "React 组件为什么会重新渲染？", summary: "理解 Context value 变化为什么会触发消费者更新。"},
                {questionId: "react-memo-callback", title: "useMemo 和 useCallback 有什么区别？", summary: "进一步理解稳定 Provider value 时常见的缓存工具。"},
            ],
        },
    ],
    java: [{
        id: "java-jvm", sequence: 1, chapter: "JVM", title: "JVM 运行时数据区包含哪些部分？", summary: "考察堆、栈、方法区和线程隔离概念。",
        keywords: [{term: "运行时数据区", explanation: "JVM 执行 Java 程序时划分出来的不同内存区域。"}, {term: "线程私有", explanation: "每个线程单独拥有，其他线程不能直接使用的内存。"}],
        plainAnswer: "可以先把 JVM 内存分成大家共用的区域和每个线程自己使用的区域。堆、方法区通常共享，虚拟机栈、本地方法栈和程序计数器通常由线程独享。",
        answer: "常见划分包括堆、方法区、虚拟机栈、本地方法栈和程序计数器。堆和方法区通常线程共享，栈与程序计数器线程私有。", explanation: "回答时要区分规范概念和具体 JVM 实现，并结合对象、栈帧与类元数据说明用途。", tips: ["先按共享范围分类，再说明每个区域存放什么。"], followUps: [],
    }],
    python: [{
        id: "python-list-tuple", sequence: 1, chapter: "语言基础", title: "Python 列表和元组有什么区别？", summary: "考察可变性、哈希能力和使用场景。",
        keywords: [{term: "可变", explanation: "对象创建后仍可以原地修改内容。"}, {term: "可哈希", explanation: "对象可以生成稳定哈希值，从而用于字典键或集合元素。"}],
        plainAnswer: "列表适合需要增删改的数据，元组适合表达创建后不再改变的一组值。是否能当字典键，还要看元组里面的每个元素是否都可哈希。",
        answer: "列表可变，元组不可变。元组在元素都可哈希时可作为字典键，适合表达固定结构；列表适合频繁增删改的数据集合。", explanation: "不可变不代表元组内部引用的对象一定不可变，判断能否哈希还要看所有元素。", tips: ["从可变性、API、哈希和语义四个方面回答。"], followUps: [],
    }],
    vue: [{
        id: "vue-reactivity", sequence: 1, chapter: "响应式原理", title: "Vue 3 的响应式系统是如何工作的？", summary: "考察 Proxy、依赖收集和触发更新。",
        keywords: [{term: "Proxy", explanation: "JavaScript 提供的对象代理机制，可以拦截属性读取和修改。"}, {term: "依赖收集", explanation: "记录当前代码使用了哪些响应式数据。"}],
        plainAnswer: "Vue 会在读取数据时记住谁用过它，在修改数据时通知这些使用者重新执行，Proxy 负责拦截读取和修改动作。",
        answer: "Vue 3 使用 Proxy 拦截对象访问与修改，在读取时收集当前副作用依赖，在写入时触发相关副作用重新执行。", explanation: "核心可概括为 track 与 trigger。Proxy 能覆盖属性新增、删除和数组索引等场景，解决 Vue 2 Object.defineProperty 的部分限制。", tips: ["按拦截、收集、触发的顺序回答。"], followUps: [],
    }],
    typescript: [{
        id: "ts-unknown-any", sequence: 1, chapter: "类型系统", title: "unknown 和 any 有什么区别？", summary: "考察类型安全边界和类型收窄。",
        keywords: [{term: "类型收窄", explanation: "通过判断把一个宽泛类型逐步确定成更具体的类型。"}, {term: "类型安全", explanation: "在运行代码前尽量发现类型不匹配问题。"}],
        plainAnswer: "any 相当于告诉 TypeScript 不用检查，unknown 则要求你先判断它到底是什么类型再使用，所以 unknown 更安全。",
        answer: "any 会跳过类型检查，unknown 可以接收任意值，但使用前必须通过类型收窄确认具体类型，因此更适合作为不可信输入的边界类型。", explanation: "unknown 保留了静态检查能力，能迫使调用方验证数据；any 会把不安全性继续向下传播。", tips: ["结合接口返回值或异常捕获给出实际例子。"], followUps: [],
    }],
    go: [{
        id: "go-goroutine", sequence: 1, chapter: "并发", title: "Goroutine 和系统线程有什么区别？", summary: "考察 Go 调度模型和轻量并发。",
        keywords: [{term: "Goroutine", explanation: "由 Go 运行时负责调度的轻量执行单元。"}, {term: "调度", explanation: "决定哪个任务在什么时候使用 CPU 执行。"}],
        plainAnswer: "Goroutine 不是直接等同于系统线程，它更轻量，由 Go 运行时把大量 Goroutine 安排到较少的线程上执行。",
        answer: "Goroutine 由 Go 运行时调度，初始栈较小且可动态增长，多个 Goroutine 会复用较少的系统线程执行。", explanation: "Go 使用 G、M、P 模型完成调度，创建和切换成本通常低于直接管理系统线程，但阻塞与共享数据问题仍需正确处理。", tips: ["不要只回答‘更轻量’，要说明由谁调度以及如何复用线程。"], followUps: [],
    }],
    node: [{
        id: "node-event-loop", sequence: 1, chapter: "运行时", title: "Node.js 事件循环分为哪些阶段？", summary: "考察异步 I/O、宏任务阶段和微任务执行时机。",
        keywords: [{term: "事件循环", explanation: "Node.js 按阶段不断取出异步任务并执行回调的运行机制。"}, {term: "微任务", explanation: "会在当前阶段或任务结束后的特定时机优先清空的任务队列。"}],
        plainAnswer: "Node.js 会按固定阶段处理定时器、I/O 和 setImmediate 等回调，每个阶段之间还会穿插执行微任务。",
        answer: "事件循环主要经历 timers、pending callbacks、poll、check、close callbacks 等阶段，阶段之间还会处理微任务队列。", explanation: "Node.js 的执行顺序还受 process.nextTick 和 Promise 微任务影响，回答时应避免把浏览器事件循环直接套用到 Node.js。", tips: ["给出 setTimeout、setImmediate 和 Promise 的简短对比例子。"], followUps: [],
    }],
    database: [{
        id: "db-index", sequence: 1, chapter: "索引", title: "数据库索引为什么通常使用 B+ 树？", summary: "考察磁盘访问、范围查询和树高。",
        keywords: [{term: "B+ 树", explanation: "一种多叉平衡树，数据集中保存在叶子节点。"}, {term: "磁盘 I/O", explanation: "内存和磁盘之间读取或写入数据的操作，通常比内存计算慢。"}],
        plainAnswer: "B+ 树每层能放很多索引，所以树不会太高，查找时读取磁盘的次数更少；叶子节点还是有序连接的，也方便做范围查询。",
        answer: "B+ 树分支多、树高低，非叶子节点只保存索引，叶子节点有序相连，既减少磁盘 I/O，又适合范围查询。", explanation: "相比二叉树，B+ 树更适合页式存储；相比哈希索引，它同时支持排序和范围扫描。", tips: ["围绕磁盘页、树高和范围查询回答。"], followUps: [],
    }],
    network: [{
        id: "network-handshake", sequence: 1, chapter: "TCP", title: "TCP 为什么需要三次握手？", summary: "考察双向通信能力确认和历史连接处理。",
        keywords: [{term: "握手", explanation: "正式传输数据前，通信双方交换确认信息的过程。"}, {term: "序列号", explanation: "用来标记数据顺序并帮助确认数据是否完整到达的编号。"}],
        plainAnswer: "三次握手是为了让客户端和服务端都确认自己能发、能收，并同步后续传输需要使用的序列号。",
        answer: "三次握手让双方确认彼此的发送与接收能力，并同步初始序列号，同时避免失效的历史连接请求直接建立连接。", explanation: "两次握手不足以让服务端确认客户端已收到自己的序列号，四次则可以合并为三次完成，没有必要。", tips: ["不要只说‘保证可靠’，要说清每一次确认了什么。"], followUps: [],
    }],
    system: [{
        id: "os-process-thread", sequence: 1, chapter: "进程与线程", title: "进程和线程有什么区别？", summary: "考察资源分配、执行调度和隔离性。",
        keywords: [{term: "进程", explanation: "拥有独立资源和地址空间的程序运行实例。"}, {term: "线程", explanation: "进程内部真正参与 CPU 调度的执行单元。"}],
        plainAnswer: "进程负责隔离资源，线程负责在进程里执行任务。同一个进程中的线程共享大部分资源，所以协作方便，但一个线程出严重问题也更容易影响整个进程。",
        answer: "进程是资源分配和隔离的基本单位，线程是 CPU 调度的基本单位。同一进程内线程共享地址空间和资源，但各自拥有栈与寄存器上下文。", explanation: "线程通信成本较低但错误可能影响整个进程；进程隔离更强，但创建、切换和通信成本通常更高。", tips: ["从资源、调度、通信、隔离四个角度回答。"], followUps: [],
    }],
    architecture: [{
        id: "architecture-cache", sequence: 1, chapter: "缓存", title: "如何处理缓存与数据库的一致性？", summary: "考察 Cache Aside、失效策略和业务取舍。",
        keywords: [{term: "Cache Aside", explanation: "业务代码同时负责读取数据库、回填缓存以及在写入后让缓存失效的模式。"}, {term: "一致性窗口", explanation: "缓存和数据库内容暂时不同的时间范围。"}],
        plainAnswer: "常见做法是读数据时先看缓存，没找到再查数据库并放回缓存；写数据时先改数据库，再删除旧缓存，让下一次读取重新生成。",
        answer: "常见方案是 Cache Aside：读时先查缓存，未命中再查数据库并回填；写时先更新数据库，再删除缓存，并结合重试、延迟双删或消息机制降低不一致窗口。", explanation: "强一致通常成本很高，大多数业务需要先明确可接受的不一致时间，再选择失效策略、重试和监控措施。", tips: ["先给主方案，再说明失败场景与补偿机制。"], followUps: [],
    }],
}

export const questionLibraryDetails: QuestionLibraryDetail[] = questionLibraries.map((library) => ({
    ...library,
    questions: questionsByLibrary[library.id],
}))

export function getQuestionLibraryDetail(libraryId: string) {
    return questionLibraryDetails.find((library) => library.id === libraryId)
}

export function getQuestionDirectory(libraryId: string): QuestionDirectoryItem[] {
    return getQuestionLibraryDetail(libraryId)?.questions.map(({id, sequence, chapter, title}) => ({
        id,
        sequence,
        chapter,
        title,
    })) ?? []
}

export function getQuestionAnswer(libraryId: string, questionId: string) {
    return getQuestionLibraryDetail(libraryId)?.questions.find((question) => question.id === questionId)
}
