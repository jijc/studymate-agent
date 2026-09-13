# StudyMate UI / Tailwind / shadcn 全局开发规范

> 适用范围：`frontend/` 下所有页面、组件、样式与 Codex 生成代码。  
> 目标：让 StudyMate 的 UI 保持统一、可读、可维护，避免为了贴设计稿而出现大量难以理解和后期难以调整的 Tailwind 任意值。  
> 当前技术栈：React + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui（Base UI）+ Lucide Icons。  
> 本文同时作为人工开发与 Codex 开发的共同约束。

---

# 1. 总原则

StudyMate 的 UI 开发遵循以下优先级：

```text
Design Token
↓
shadcn/ui 基础组件
↓
Tailwind 标准工具类
↓
业务组件
↓
少量必要的 arbitrary value（任意值）
```

核心原则：

1. **先使用现有 Design Token，不在业务组件中随意写死颜色。**
2. **先使用 Tailwind 标准尺寸，不为了像素级贴图大量使用 `[xxpx]`。**
3. **已有 shadcn/ui 组件能解决的问题，不重复手写一套基础组件。**
4. **业务组件可以自定义，但要建立在统一 Token 和基础组件之上。**
5. **页面视觉优先保持暖橙色 + 奶油白 + 极简 + 小圆角 + 轻微厚重点击感。**
6. **UI 代码首先要让开发者能读懂，其次才是追求像素级微调。**
7. **真正特殊的 Hero 图片构图、复杂定位等场景，可以使用少量任意值。**

---

# 2. Design Token：颜色必须优先使用语义类名

StudyMate 已在 `frontend/src/index.css` 中定义全局 Design Token。

业务组件优先使用：

```text
bg-background
text-foreground
bg-card
text-card-foreground
bg-primary
text-primary
text-primary-foreground
bg-secondary
text-secondary-foreground
bg-muted
text-muted-foreground
bg-accent
text-accent-foreground
border-border
ring-ring
```

## 推荐

```tsx
<section className="bg-background text-foreground">
  <div className="border border-border bg-card">
    <h2 className="text-foreground">标题</h2>
    <p className="text-muted-foreground">说明文字</p>
  </div>
</section>
```

## 不推荐

```tsx
<section className="bg-[#fff8ee] text-[#2b211b]">
  <div className="border-[#eadbcf] bg-[#fffdf9]">
    ...
  </div>
</section>
```

原因：

```text
业务组件应该知道：这是 primary / background / border
而不应该知道：它具体是 #f47a3a / #fff8ee
```

如果以后需要调整品牌色，应优先修改 `index.css` 中的 Token，而不是逐页搜索十六进制颜色。

---

# 3. Tailwind 类名使用顺序

推荐思考顺序：

```text
① 布局
② 尺寸与间距
③ 字体
④ 颜色
⑤ 圆角 / 边框 / 阴影
⑥ 交互状态
⑦ 响应式
```

例如：

```tsx
<div className="flex items-center gap-5 rounded-lg border border-border bg-card p-5 text-foreground shadow-soft transition-transform duration-300 hover:-translate-y-1">
```

不强制每一个 `className` 必须换行，但当类名过长时，应按逻辑分组，保证人能快速看懂。

---

# 4. 优先使用 Tailwind 标准尺寸

## 推荐

```text
p-4
p-5
px-6
gap-4
gap-6
size-10
size-20
h-12
min-h-36
text-sm
text-base
text-lg
text-xl
text-2xl
leading-relaxed
tracking-tight
```

## 尽量避免

```text
p-[19px]
gap-[21px]
size-[82px]
h-[47px]
text-[16px]
text-[20px]
leading-[1.55]
tracking-[-0.02em]
```

例如：

```text
text-[16px]  → text-base
text-[20px]  → text-xl
size-[82px]  → 优先 size-20（80px）
min-h-[142px] → 优先 min-h-36（144px）
```

只要视觉没有明显变化，应优先采用标准档位。

---

# 5. arbitrary value（`[...]`）什么时候允许使用

`[...]` 不是错误，也不是禁止使用。

它适合**设计中确实没有对应 Tailwind 标准值**的特殊情况。

## 可以使用

### Hero 特殊布局比例

```tsx
className="xl:grid-cols-[44%_56%]"
```

### 特殊图片构图定位

```tsx
className="left-[45%] top-[45%] w-[85%]"
```

### 需要计算的高度

```tsx
className="min-h-[calc(100vh-70px)]"
```

### 某个设计确实必须精确的特殊尺寸

必须能够解释为什么不能使用现有标准档位。

## 不应该大量使用

```tsx
text-[16px]
text-[20px]
gap-[18px]
p-[21px]
rounded-[17px]
leading-[1.55]
```

判断标准：

> 如果 Tailwind 标准类已经有一个非常接近的值，就使用标准类。

---

# 6. `%`、`rem` 和 `/80` 的规则

## `rem`

Tailwind 内部大量使用 `rem`，这是正常的。

例如：

```text
p-4
text-xl
gap-6
```

最终 CSS 很可能就是 `rem`。

开发时通常不需要主动换算。

## `%`

百分比适合布局比例或图片尺寸：

```tsx
w-1/2
w-full
xl:grid-cols-[44%_56%]
```

## `/80`、`/90`

例如：

```tsx
bg-card/90
text-foreground/75
border-border/60
```

这里表示的是**颜色透明度**，不是宽度百分比。

这种写法允许使用，但不要为了制造“高级感”到处叠透明度。

---

# 7. 圆角规范

StudyMate 不采用大面积“软萌 / 胶囊 / 超大圆角”风格。

全局基础圆角由 `index.css` 中的 `--radius` 控制。

默认使用：

```text
rounded-md  → 小组件
rounded-lg  → Button / Card / Input 等普通组件
rounded-xl  → 少量强调组件，可谨慎使用
rounded-full → 真正的圆形图标、Avatar、Badge、胶囊标签
```

## 尽量避免

```text
rounded-2xl
rounded-3xl
rounded-4xl
```

除非设计稿明确需要，并且使用者能够解释原因。

特别禁止：

> 为了“看起来现代”而默认给所有 Card / Button / Icon container 使用 `rounded-3xl`。

---

# 8. Button 规范

基础按钮统一使用：

```tsx
import { Button } from "@/components/ui/button"
```

业务页面不要重新手写：

```tsx
<button className="...大量基础按钮样式...">
```

除非该交互明确不是通用 Button。

## 推荐

```tsx
<Button>开始练习</Button>
<Button>上传简历</Button>
<Button size="lg">登录</Button>
```

## 不推荐

页面里每次重新覆盖：

```tsx
<Button
  className="h-16 rounded-3xl px-8 text-[20px] font-semibold shadow-[...] ..."
>
```

如果多个页面都需要同一种“大按钮”，应该在：

```text
src/components/ui/button.tsx
```

增加统一 `size` / `variant`，例如：

```tsx
<Button size="xl">开始练习</Button>
```

而不是每个页面复制十几个 class。

## StudyMate 主按钮交互

主按钮可以保留轻微实体感：

```text
默认：轻量柔和阴影
Hover：颜色缓慢变深
Active：轻微降低透明度
过渡：统一 400ms
```

效果要克制，不做明显游戏按钮效果。

---

# 9. shadcn/ui 使用边界

shadcn/ui 是**基础 UI 组件层**，不是要求所有 HTML 都必须换成 shadcn。

以下原生语义元素应该正常使用：

```tsx
<header>
<nav>
<main>
<section>
<article>
<h1>
<p>
```

业务组件也可以使用原生结构，例如：

```text
CapabilityCard
InterviewStep
HeroSection
```

这些不必为了“使用 shadcn”强行套 `Card`。

但以下通用 UI 出现时，应优先检查 shadcn 是否已经提供：

```text
Button
Card
Input
Textarea
Dialog
Sheet
Tabs
Badge
Progress
Tooltip
Avatar
Dropdown Menu
Select
```

原则：

> shadcn 解决通用 UI，业务组件解决 StudyMate 自己的业务表达。

---

# 10. 不随意修改 `components/ui`

`src/components/ui/` 是基础 UI 层。

可以根据 StudyMate 品牌统一定制，但必须满足：

1. 修改是全局有意义的，而不是为了某一个页面。
2. 不随意删除原组件的无障碍状态。
3. 不因为某个页面需要特殊样式就破坏所有页面。
4. 优先通过 `variant`、`size`、CVA 扩展。
5. 页面级特殊样式仍然留在业务组件。

例如：

```text
所有大型 CTA 都需要同一种尺寸
→ 扩展 Button size

只有首页 Hero 的图片需要特殊位置
→ 留在 HeroSection
```

---

# 11. `cn()` 使用规范

`cn()` 用于组合固定 class、条件 class 和外部 class。

推荐：

```tsx
import { cn } from "@/lib/utils"

className={cn(
  "flex items-center text-base",
  active
    ? "text-primary"
    : "text-muted-foreground hover:text-primary",
  className,
)}
```

相较于：

```tsx
className={[
  "flex items-center",
  active ? "text-primary" : "text-muted-foreground",
].join(" ")}
```

后续 StudyMate 优先使用 `cn()`。

注意：

> `cn()` 不是 React API，它只是 className 合并工具。

---

# 12. 字体规范

默认字体由全局 Token 控制，不在普通页面自行设置字体族。

字号优先使用 Tailwind 标准档位：

```text
text-xs
text-sm
text-base
text-lg
text-xl
text-2xl
text-3xl
text-4xl
text-5xl
```

首页 Hero 等品牌展示区域允许少量特殊字号，但需要克制。

正文优先：

```text
text-base
leading-relaxed
text-muted-foreground
```

标题优先：

```text
font-bold
tracking-tight
text-foreground
```

不要为了贴设计图在普通组件中大量出现：

```text
text-[17px]
leading-[1.55]
tracking-[-0.025em]
```

---

# 13. 间距规范

优先从以下常用范围选择：

```text
gap-2
gap-3
gap-4
gap-5
gap-6
gap-8

p-3
p-4
p-5
p-6
p-8

px-4
px-5
px-6
px-8

py-2
py-3
py-4
py-6
py-8
```

页面 section 之间可以使用：

```text
mt-8
mt-10
mt-12
py-10
py-12
py-16
```

不要为了完全贴某张静态图，把：

```text
19px
23px
37px
```

大量复制到页面中。

---

# 14. Layout / Container 规范

页面主要内容应建立统一 Container 思维：

```tsx
<div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
```

如果首页设计明确需要更宽，可以使用项目统一的大屏容器，例如：

```tsx
max-w-[1480px]
```

但不要每个 section 使用完全不同的：

```text
1360px
1412px
1480px
1536px
```

如果后续多个页面都使用 1480px，应考虑提炼为统一布局组件或统一 Token。

---

# 15. 响应式规范

优先使用 Tailwind 原生 breakpoint：

```text
sm:
md:
lg:
xl:
2xl:
```

基本原则：

1. 默认 class 表示移动端基础样式。
2. 再逐步使用 breakpoint 增强大屏布局。
3. 不针对大量具体设备宽度写自定义 media query。
4. 不为了每个宽度完美像设计稿而堆积复杂覆盖。

示例：

```tsx
<div className="grid gap-5 xl:grid-cols-3">
```

而不是为多个尺寸分别建立重复布局。

---

# 16. Card 规范

普通业务 Card 推荐基础结构：

```tsx
<article className="rounded-lg border border-border bg-card p-5 shadow-soft">
```

需要 hover 时：

```tsx
<article className="rounded-lg border border-border bg-card p-5 shadow-soft transition-transform duration-300 hover:-translate-y-1">
```

不要默认添加：

```text
backdrop-blur
多层透明背景
大圆角
多个 box-shadow
```

除非设计确实需要。

---

# 17. Icon 规范

统一使用 Lucide Icons：

```tsx
import { FileText } from "lucide-react"
```

常用尺寸：

```text
size-4
size-5
size-6
size-8
size-10
```

普通业务场景不要频繁写：

```text
size-[19px]
size-[37px]
stroke-[2.5]
```

装饰性 Icon：

```tsx
<FileText aria-hidden="true" />
```

真正承担操作含义的 icon-only Button 必须提供：

```tsx
aria-label="打开导航菜单"
```

---

# 18. 图片与 Logo 规范

图片资源放在：

```text
src/assets/image/
```

普通图片优先：

```tsx
<img
  src={logo}
  alt="StudyMate"
  className="h-10 w-auto"
/>
```

不要依赖大量：

```text
left-[-57px]
top-[-24px]
w-[278px]
```

来裁切一张本身留白不合理的 Logo。

如果图片文件本身有大量无用透明 / 白色区域：

> 优先修正图片资源本身，而不是长期依赖负定位补救。

Hero 装饰图因为构图需要，可以使用 absolute + arbitrary value，但应局限在对应 Hero 组件内。

---

# 19. React 业务组件拆分规范

页面组件负责组合：

```text
Page
├── Header
├── HeroSection
├── CapabilitiesSection
│   └── CapabilityCard
└── StepsSection
    └── InterviewStep
```

推荐拆分条件：

1. 一段 UI 有明确业务含义。
2. 会重复使用。
3. 有独立 props。
4. JSX 已经明显影响父组件可读性。

不推荐把每一个 `<div>` 都拆成组件。

---

# 20. 重复 UI 使用数据 + `map()`

推荐：

```tsx
const items = [
  { title: "A", description: "..." },
  { title: "B", description: "..." },
]

{items.map((item) => (
  <Card key={item.title} {...item} />
))}
```

不要复制三份高度相似的 JSX。

`key` 优先使用稳定业务 ID；没有 ID 且文字保证唯一时可以暂时使用 `title` / `label`。

---

# 21. 交互动画规范

StudyMate 的动画风格：

```text
克制
平滑
有反馈
不浮夸
```

推荐：

```text
transition-colors duration-300
transition-transform duration-300
hover:-translate-y-1
```

Button 使用 400ms 的克制过渡与轻量反馈。

避免：

```text
大幅缩放
持续抖动
快速闪色
大量 bounce
过重 3D 阴影
```

一般动画时间：

```text
200ms ～ 300ms
```

通用 Button 按本节约定统一使用 `400ms`，其余普通交互仍保持 `200ms ～ 300ms`。

---

# 22. 可访问性基本规则

必须保留：

```text
aria-label
aria-current
aria-expanded
aria-controls
alt
focus-visible
```

不要为了视觉简化删除 shadcn / Base UI 原本提供的无障碍支持。

Icon 只是装饰时：

```tsx
aria-hidden="true"
```

Icon-only Button 必须有可读名称。

---

# 23. 不要为了 shadcn 而 shadcn

错误思路：

> 既然用了 shadcn，所有东西都必须来自 shadcn。

正确思路：

```text
原生 HTML
+
Tailwind
+
Design Token
+
shadcn 通用组件
+
StudyMate 业务组件
```

共同组成最终页面。

---

# 24. Codex 开发必须遵守的规则

每次让 Codex 开发 / 修改前端页面时，需要遵守：

1. 先阅读本文件。
2. 先阅读现有 `index.css` Design Token。
3. 先检查 `components/ui/` 是否已有可复用组件。
4. 不新增其他 UI 框架。
5. 不随意写死品牌颜色。
6. 普通字号、间距、尺寸优先使用 Tailwind 标准档位。
7. 不大量使用 arbitrary value。
8. 普通组件不滥用 `rounded-2xl / rounded-3xl`。
9. 不重复覆盖 Button 的基础视觉体系。
10. 可复用基础能力优先扩展 shadcn variant / size。
11. 特殊页面构图允许少量精确值，但必须局部化。
12. 不为了像设计截图而牺牲代码可维护性。
13. 不无关重构已有代码。
14. 完成后运行 lint / test / build。

---

# 25. Codex 完成页面后的自检清单

提交前逐项检查：

```text
[ ] 是否新增了硬编码颜色？
[ ] 是否可以改用 Design Token？
[ ] 是否出现大量 [xxpx]？
[ ] 是否有标准 Tailwind 类可以替代？
[ ] 是否滥用了 rounded-2xl / rounded-3xl？
[ ] 是否在页面重复重写 Button 基础样式？
[ ] 是否已有 shadcn 组件可以直接复用？
[ ] 是否复制了重复 JSX，而不是抽数据 + map？
[ ] 是否保留必要 aria / focus 状态？
[ ] 响应式是否使用 Tailwind breakpoint？
[ ] 特殊 arbitrary value 是否能解释原因？
[ ] 是否出现脆弱的图片负定位？
[ ] pnpm lint 是否通过？
[ ] pnpm test 是否通过？
[ ] pnpm build 是否通过？
```

---

# 26. 推荐与不推荐示例

## 推荐

```tsx
<article className="flex min-h-36 items-center gap-5 rounded-lg border border-border bg-card p-5 shadow-soft transition-transform duration-300 hover:-translate-y-1">
  <div className="grid size-20 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
    <Icon aria-hidden="true" className="size-10" />
  </div>

  <div>
    <h2 className="text-xl font-bold tracking-tight text-foreground">
      {title}
    </h2>

    <p className="mt-1 text-base leading-relaxed text-muted-foreground">
      {description}
    </p>
  </div>
</article>
```

## 不推荐

```tsx
<article className="flex min-h-[142px] items-center gap-[18px] rounded-3xl border border-card/85 bg-card/90 px-[21px] py-[19px]">
  <div className="size-[82px] rounded-[26px]">
    <Icon className="size-[39px] stroke-[2.5]" />
  </div>

  <h2 className="text-[20px] tracking-[-0.02em]">...</h2>
  <p className="text-[16px] leading-[1.55]">...</p>
</article>
```

问题不在于第二段不能运行，而在于：

> 它把设计系统重新写进了每一个组件，后期统一调整会非常痛苦。

---

# 27. 当前 StudyMate 的视觉关键词

长期保持：

```text
暖橙色
奶油白
极简
少文字
小到中等圆角
轻微实体点击感
清晰层级
柔和但不软萌
现代但不办公蓝
```

避免：

```text
大面积办公蓝
超大圆角
玻璃拟态滥用
过重阴影
过度动画
高饱和杂色
页面各自定义一套颜色
```

---

# 28. 规范与设计稿冲突时怎么办

优先顺序：

```text
产品信息结构
>
可用性 / 可访问性
>
全局设计系统一致性
>
设计稿视觉还原
>
像素级数字一致
```

如果设计稿要求一个明显特殊的视觉，可以局部突破规范，但必须：

1. 明确这是特殊场景。
2. 不把特殊样式扩散成全局默认。
3. 保证代码仍然可读。
4. 在 Code Review 时说明保留原因。

---

# 29. 本文件维护规则

以下情况需要更新本文件：

- 新增全局 Button / Card / Input 视觉规范。
- Design Token 有重大调整。
- 新增统一页面 Container / Layout 规则。
- 更换 shadcn preset / icon library。
- 实际开发中发现某类 Tailwind 写法长期重复。
- Codex 多次产生相同风格问题，需要增加明确约束。

普通单页面样式调整不需要修改本文件。

---

# 30. 一句话记忆

> **业务组件写“语义”，Design Token 管“品牌”，Tailwind 管“布局和尺度”，shadcn 管“通用组件”；特殊值只留给真正特殊的设计。**
