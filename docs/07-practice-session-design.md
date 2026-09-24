# StudyMate Practice Session 最终设计

> 更新日期：2026-09-24  
> 本文件记录练习会话的长期架构约束。后续前端、FastAPI、数据库、AI 评分实现都应以本设计为准，不采用“先临时按题库 ID 代表一次练习、以后再推翻”的方案。

---

# 一、核心概念必须分开

## Question Library（题库）

题库表示“题目来源”，例如：

- 基础技能：React、Vue、TypeScript
- AI 简历专项题库
- AI JD 专项题库
- 后续 AI 薄弱点专项题库

题库本身不是一次练习。

## Practice Session（练习会话）

Practice Session 表示：

> 用户针对某一个具体题库开始的一次独立练习。

一次 Practice Session 创建后，本轮题组必须被冻结。刷新页面、重新进入、切换页面后返回，都不能重新随机另一组题。

---

# 二、核心业务规则

## 2.1 每个用户 + 每个具体题库，最多保留一个 active Session

例如同一用户可以同时拥有：

- React 题库：一个 active Session
- Vue 题库：一个 active Session
- TypeScript 题库：一个 active Session
- 简历专项题库 A：一个 active Session
- JD 专项题库 B：一个 active Session

不同题库之间互不影响。

同一用户在同一题库下如果已经存在 active Session，再次点击“开始 / 继续练习”时，不创建新的 Session，而是恢复已有 Session。

## 2.2 Session 创建时确定并冻结本轮题组

用户第一次进入某题库练习：

1. 后端创建 Practice Session。
2. 根据题库规则随机或智能选出本轮题目。
3. 将题目顺序与题目快照绑定到 Session。
4. Session 状态设为 active。
5. 返回 sessionId 与固定题组。

只要该 Session 仍为 active：

- 刷新页面仍返回同一组题。
- 重新进入仍返回同一组题。
- 不重新随机。
- 不因为题库后来更新而改变本轮题目。

## 2.3 Session 生命周期

建议状态：

- active：进行中，可继续作答
- submitted：已正式提交，不再允许修改
- abandoned：用户明确放弃本轮
- expired：长期未活动后由系统结束

“返回页面 / 关闭浏览器”不等于 abandoned。

只有用户明确选择“放弃本轮”时，才结束 active Session。

## 2.4 提交与新一轮

整组提交成功：

- Session 从 active 变为 submitted。
- 保存整轮答案。
- 进入 AI 评分 / 复盘流程。
- 下次再练同一题库时，可以创建新的 Practice Session，并重新生成新题组。

明确放弃：

- Session 从 active 变为 abandoned。
- 本轮草稿不再恢复。
- 下次进入该题库时创建新 Session。

---

# 三、草稿设计

草稿必须绑定 sessionId，而不是只绑定 source + libraryId。

正确语义：

~~~text
Practice Session ps_abc123
    ↓
固定题组
    ↓
该 Session 的 answers / draft
~~~

不能使用：

~~~text
source + libraryId
~~~

直接代表一轮练习，否则新一轮随机题可能错误恢复上一轮答案。

浏览器本地草稿可以作为输入防丢机制，但它的 key 也必须包含 sessionId，例如：

~~~text
studymate-practice-draft:ps_abc123
~~~

后续如果实现服务端草稿自动保存，也仍然以 sessionId 为归属。

---

# 四、题目快照

Practice Session 不能只依赖“以后重新查询题库”。

每轮至少要保存：

- questionId
- order
- promptSnapshot
- topicSnapshot

原因：

> 题库里的题目以后可能被修改或删除，但历史练习和复盘必须仍然展示用户当时真正做过的题。

这与 Practice Record 的历史快照原则一致。

---

# 五、推荐后端模型

概念模型：

~~~text
PracticeSession
- id
- userId
- source
- libraryId
- status
- createdAt
- updatedAt
- submittedAt
~~~

~~~text
PracticeSessionQuestion
- sessionId
- questionId
- order
- promptSnapshot
- topicSnapshot
~~~

答案可作为独立 Attempt / Answer 数据，也可以先随 Session 保存，但最终必须通过 sessionId + questionId 关联。

数据库实现时，应保证：

> 同一 userId + source + libraryId 同时最多存在一个 active Practice Session。

需要通过事务 / 数据库约束避免连续点击“开始练习”生成多个 active Session。

---

# 六、推荐 API 语义

## 开始或继续某题库练习

~~~http
POST /practice-sessions
~~~

请求：

~~~json
{
  "source": "basic",
  "library_id": "react"
}
~~~

后端：

- 有 active Session：返回已有 Session。
- 没有 active Session：创建 Session、确定题组并返回。

响应核心结构：

~~~json
{
  "session_id": "ps_abc123",
  "status": "active",
  "source": "basic",
  "library_id": "react",
  "questions": []
}
~~~

## 获取指定 Session

~~~http
GET /practice-sessions/{session_id}
~~~

用于：

- 页面刷新
- 通过 URL 重新进入
- 恢复固定题组

## 提交整轮

~~~http
POST /practice-sessions/{session_id}/submit
~~~

提交成功后状态变为 submitted。

## 放弃本轮

~~~http
POST /practice-sessions/{session_id}/abandon
~~~

状态变为 abandoned。

---

# 七、前端路由原则

题库入口负责：

> 选择“练哪个题库”。

真正进入练习页后，URL 应以 sessionId 标识“正在做哪一次练习”。

推荐：

~~~text
/practice/session/:sessionId
~~~

而不是长期使用：

~~~text
/practice/session/:source/:libraryId
~~~

流程：

~~~text
选择题库
↓
POST /practice-sessions
↓
得到 sessionId
↓
navigate("/practice/session/" + sessionId)
↓
GET /practice-sessions/:sessionId
↓
显示被冻结的题组
~~~

---

# 八、基础技能题库与 AI 题库统一规则

无论来源是：

- basic
- resume
- jd
- 后续 weakness / exclusive 等 AI 题库

Practice Session 的生命周期规则完全一致。

区别只在“题组如何产生”：

- 基础题库：从站内技能题库选题。
- 简历 / JD / AI 题库：从对应 AI 题库中选题或生成题目。

Session 层不应该因为题库类型不同而采用两套生命周期。

---

# 九、前端状态边界

TanStack Query 管理 Server State：

- Practice Session
- Session 固定题组
- Session status
- 后续服务端草稿 / 提交结果

React useState 管理短期 Client State：

- 当前题目索引
- 弹窗开关
- 输入中的本地状态（若尚未立即同步服务端）
- 本题计时等纯 UI 状态

不要再让 source + libraryId 同时承担“题库身份”和“练习会话身份”。

---

# 十、长期不可回退的设计约束

1. 题库和练习会话是两个不同实体。
2. 每个用户、每个具体题库最多一个 active Session。
3. active Session 的题组必须固定。
4. 刷新和重新进入不得重新随机题组。
5. 草稿必须归属于 sessionId。
6. 正式提交后 Session 结束，新一轮创建新 Session。
7. 用户明确放弃后 Session 结束，新一轮创建新 Session。
8. 返回页面或关闭浏览器不等于放弃。
9. 历史记录必须保存题目快照。
10. 基础题库和 AI 题库共用同一套 Practice Session 生命周期。
