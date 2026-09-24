# StudyMate 生产替换与模拟数据清单

> 建立日期：2026-09-24  
> 目的：防止本地模拟数据、localStorage / sessionStorage、静态演示数据在功能开发完成后被遗忘并进入生产。  
> 这是生产发布前的强制检查清单，不是普通 TODO。

---

# 一、强制规则

核心业务数据最终必须有明确的服务端数据源和生命周期。

生产发布前必须逐项检查：

- localStorage / sessionStorage 中是否仍保存会无限增长的业务历史数据。
- 页面是否仍直接读取 demo / mock / example / staticRecords 等演示数据。
- API 层是否仍调用本地 Store / Promise.resolve，而不是真实 FastAPI。
- 练习、记录、报告、AI 题库、模拟面试等核心业务是否已经进入服务端持久化。
- 浏览器存储若保留，必须是明确设计过的有限客户端状态，例如主题、少量偏好、短期草稿缓存；不能承担数据库职责。

禁止：

> 为了“先跑起来”而长期保留一个没有清理策略、没有替换清单的浏览器本地数据库。

---

# 二、当前已确认的模拟 / 本地持久化点

## 1. Practice Session

文件：

- frontend/src/data/practiceSessionStore.ts
- frontend/src/api/practice.ts

当前：

- `studymate-practice-sessions` 保存在 localStorage。
- start / resume / get / submit / abandon 目前通过本地 Store 模拟。
- `api/practice.ts` 只是最终 API 契约，底层还不是真实 FastAPI。

最终：

- PracticeSession 保存 PostgreSQL。
- 前端 `api/practice.ts` 改为 Axios 请求 FastAPI。
- 生产代码不再使用 `practiceSessionStore.ts` 作为业务数据源。
- submitted / abandoned Session 由数据库保存历史；浏览器不保存无限增长的 Session 历史。

状态：🔴 上线前必须替换。

## 2. Practice Draft

文件：

- frontend/src/data/practiceDrafts.ts

当前：

- 草稿按 `studymate-practice-draft:${sessionId}` 保存浏览器。
- submit / abandon 已清除对应草稿。

最终：

- 确认是否采用后端 Draft API；如果采用，浏览器只作为短期缓存。
- 无论最终方案如何，都必须保证 submitted / abandoned / expired Session 的浏览器草稿被清除。
- 需要有异常 / 过期草稿清理策略，不能永久积累孤儿 key。

状态：🟡 已有基本清理，仍需生产化确认。

## 3. Practice Records / Review

文件：

- frontend/src/data/practiceRecords.ts
- frontend/src/data/practiceOverview.ts
- frontend/src/pages/PracticeRecordsPage.tsx
- frontend/src/pages/PracticeReviewPage.tsx

当前：

- `studymate-practice-records` 保存到 localStorage。
- 同时混有 staticRecords / practiceRecords 演示记录。
- 复盘页目前依赖本地记录。

最终：

- 练习历史、答案快照、评分、复盘数据进入 PostgreSQL。
- Records / Review 页面读取真实 API。
- 删除本地无限增长的练习记录持久化。

状态：🔴 上线前必须替换。

## 4. Practice Question Demo / 本地题库映射

文件：

- frontend/src/data/practiceDemoQuestions.ts
- frontend/src/data/practiceSession.ts

当前：

- 部分练习题、AI 练习题与题库上下文来自本地数据。
- 本地 Store 创建 Session 时从这里复制题目快照。

最终：

- Session 创建时由 FastAPI 根据 libraryId 选择 / 生成题组。
- 前端只消费 Session 返回的题目快照。

状态：🔴 Practice Session 后端接入时替换。

## 5. AI 题库

文件：

- frontend/src/data/aiLibraries.ts
- frontend/src/data/aiLibraryDetails.ts
- frontend/src/pages/AiLibrariesPage.tsx
- frontend/src/pages/AiLibraryDetailPage.tsx

当前：

- 简历 / JD AI 题库列表与详情使用本地演示数据。

最终：

- AI 题库元数据、生成结果、题目进入真实后端与数据库。
- 页面改为真实 Query。

状态：🔴 AI 题库后端阶段必须替换。

## 6. Mock Interview

文件：

- frontend/src/data/mockInterview.ts
- frontend/src/pages/InterviewSessionPage.tsx
- frontend/src/pages/InterviewResultPage.tsx

当前：

- 面试题与结果存在本地模拟逻辑。
- Interview Result 使用 sessionStorage 保存。

最终：

- 面试 Session、回答、评分、结果由服务端持久化。
- sessionStorage 不承担正式历史记录。

状态：🔴 模拟面试后端阶段必须替换。

## 7. Reports

文件：

- frontend/src/data/reportOverview.ts
- frontend/src/pages/ReportsPage.tsx

当前：

- 趋势、能力分、薄弱项、最近练习为静态演示数据。

最终：

- 从 Practice / Evaluation / Mastery 等服务端数据聚合生成。

状态：🔴 报告闭环前必须替换。

## 8. Notifications

文件：

- frontend/src/data/notifications.ts
- frontend/src/pages/NotificationsPage.tsx

当前：

- exampleNotifications 为静态示例。

最终：

- 若通知模块保留，接真实通知 API / 状态。
- 若产品不需要，删除示例功能，而不是带着假数据上线。

状态：🟡 后续产品阶段确认。

## 9. Public Question Library / Catalog

文件：

- frontend/src/data/questionCatalog.ts
- frontend/src/data/questionLibraries.ts
- frontend/src/data/questionLibraryDetails.ts

当前：

- 公共题库目录、题库详情主要来自前端静态数据。

最终需要明确二选一：

1. 这是刻意设计的版本化静态内容，则允许保留，但必须明确不是 demo；或
2. 题库需要后台管理 / 动态扩充，则迁移数据库与 API。

状态：🟡 必须在生产前明确，不允许“不知道是不是模拟数据”。

---

# 三、每次新增 Codex 静态页面的规则

Codex 新增页面或业务功能时，只要用了：

- localStorage
- sessionStorage
- demo
- mock
- example
- static data
- Promise.resolve 模拟 API
- 前端生成业务历史记录

就必须在本文件登记：

- 文件 / 页面
- 当前模拟方式
- 最终数据源
- 替换时机
- 当前状态

不能等项目结束再靠记忆回想。

---

# 四、生产发布 Gate

准备发布生产版本时，必须重新全仓审计至少这些关键词：

~~~text
localStorage
sessionStorage
demo
mock
example
staticRecords
Promise.resolve
practiceSessionStore
~~~

并逐项判断：

- 保留：有明确产品理由、容量边界和生命周期。
- 替换：已接真实 FastAPI / PostgreSQL。
- 删除：纯演示数据 / 失效适配层。

只要核心业务仍依赖未确认的本地模拟数据：

> 不视为生产闭环完成。

---

# 五、当前最先处理的顺序

~~~text
Practice Session 本地 Store
↓
FastAPI Practice Session API
↓
PostgreSQL / SQLAlchemy
↓
Practice Records / Review
↓
Draft 服务端策略
↓
LLM Evaluation
↓
Reports / Weak Topics
↓
AI Library
↓
Mock Interview
~~~

每完成一个模块，必须回到本清单把对应状态从 🔴 / 🟡 更新为 ✅。
