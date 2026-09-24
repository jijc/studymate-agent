# StudyMate 登录、鉴权、权限与 URL 安全设计

> 更新日期：2026-09-24  
> 本文件记录 StudyMate 正式上线级的认证与授权设计。  
> 原则：前端路由只负责体验，后端权限校验才是安全边界；不采用“先假登录、以后再补权限”的临时架构。

---

# 一、核心概念必须分开

## Authentication（认证）

回答：

> 你是谁？

例如：

- 手机号 + 密码登录
- 手机验证码登录
- 后续 OAuth / OIDC

认证成功后，服务端得到当前用户身份。

## Authorization（授权）

回答：

> 你已经登录，但你有没有权访问这条数据 / 执行这个动作？

例如：

- 用户只能读取自己的 Practice Session。
- 用户只能提交自己的 Practice Session。
- 普通用户不能访问管理员接口。
- 用户不能通过修改 URL 查看别人的练习记录。

前端“隐藏按钮”不等于授权。

---

# 二、URL 参数不是安全边界

StudyMate 可以正常使用：

~~~text
/practice/session/:sessionId
/practice/records/:recordId
/questions/:libraryId
~~~

用户可以手动修改 URL，这是 Web 的正常行为，不应该依赖前端阻止。

正确安全模型：

~~~text
用户访问
/practice/session/ps_abc123
        ↓
前端读取 sessionId
        ↓
GET /practice-sessions/ps_abc123
        ↓
FastAPI 先解析登录身份 current_user
        ↓
数据库查询：
id = ps_abc123
AND user_id = current_user.id
        ↓
属于当前用户 → 返回
不属于 / 不存在 → 404
~~~

关键原则：

> sessionId / recordId 只负责“定位资源”，不代表“有权访问资源”。

即使用户猜到或篡改别人的 ID，后端也必须拒绝。

对于用户私有资源，优先返回 404 而不是暴露“这条资源存在但你无权访问”的细节。

---

# 三、Practice Session 的用户归属

正式模型必须包含：

~~~text
PracticeSession
- id
- user_id
- source
- library_id
- status
- created_at
- updated_at
- submitted_at
~~~

开始 / 恢复练习时：

~~~text
current_user.id
+ source
+ library_id
+ status = active
~~~

查找当前用户该题库未完成的 Session。

因此：

- sessionId 不需要包含 userId / Vue / React / 题库类型。
- sessionId 使用不可读的随机 ID（UUID / ULID 等）即可。
- 业务归属由数据库字段决定。
- 同一个用户可以同时拥有多个不同题库的 active Session。
- 同一用户 + 同一题库最多一个 active Session，需要数据库约束 + 事务保证，而不是只靠前端按钮防重复点击。

---

# 四、前端登录状态设计

当前 MainLayout 通过 pathname 判断 authenticated，只能决定 Header 显示样式：

~~~ts
const authenticated = pathname.startsWith(...)
~~~

这不是真实认证，也不能作为权限保护。

正式前端需要：

~~~text
应用启动
↓
获取 /auth/me 或恢复 access token
↓
得到 currentUser
↓
AuthProvider / Auth Query
↓
受保护路由 RequireAuth
↓
进入业务页面
~~~

受保护路由的职责：

- 未登录：跳转 /login。
- 已登录：渲染业务页面。
- 身份检查中：显示加载状态。

但必须明确：

> RequireAuth 只是用户体验层。真正的权限仍由 FastAPI 每个受保护接口校验。

---

# 五、Token 与登录会话

Web SPA 推荐正式方案：

## Access Token

- 短生命周期。
- 前端内存持有。
- 请求 FastAPI 时通过 Authorization: Bearer 发送。
- 不长期写入 localStorage，降低 XSS 后 token 被长期窃取的风险。

## Refresh Token

- 使用 HttpOnly + Secure Cookie。
- JavaScript 不能直接读取。
- 仅用于刷新 access token。
- 服务端保存可撤销的登录会话 / refresh token 标识。
- 刷新时进行 rotation（轮换），旧 refresh token 失效。

## Logout

退出登录必须同时：

- 服务端撤销当前 refresh session。
- 清除 refresh cookie。
- 前端清空 access token / currentUser / 用户私有 Query Cache。

不能只做前端 navigate("/login")。

---

# 六、建议 Auth API

~~~http
POST /auth/login/password
POST /auth/refresh
POST /auth/logout
GET  /auth/me
~~~

手机号验证码登录只有在真实短信服务接入后才开放：

~~~http
POST /auth/sms/send
POST /auth/login/sms
~~~

原则：

> 不做“验证码按钮看起来能用，但实际上没有后端 / 没有真实短信”的生产功能。

当前 LoginForm 中验证码登录与密码登录都仍是 UI / 本地校验，属于未完成业务，不能视为真实登录。

---

# 七、密码安全

正式密码登录：

- 数据库绝不存明文密码。
- 保存 password_hash。
- 使用成熟密码哈希算法，例如 Argon2id。
- 登录失败不要区分“手机号不存在”与“密码错误”的过细信息，避免账号枚举。
- 登录接口需要速率限制。
- 敏感日志不能记录密码、验证码、token。

---

# 八、FastAPI 权限依赖

正式接口通过统一依赖获取用户身份：

~~~python
current_user = Depends(get_current_user)
~~~

业务 Service 接收可信的：

~~~text
current_user.id
~~~

而不是相信前端传：

~~~json
{
  "user_id": "user_001"
}
~~~

用户不能通过修改 body / query / URL 把自己伪装成另一个 userId。

Practice Session 示例：

~~~text
POST /practice-sessions
body: source + library_id
身份：从 token 得到 current_user.id
~~~

~~~text
GET /practice-sessions/{session_id}
查询条件：
session.id = session_id
AND session.user_id = current_user.id
~~~

submit / abandon 同理。

---

# 九、权限模型

第一阶段至少有：

~~~text
user
admin
~~~

但 StudyMate 的核心权限不仅是 RBAC，还包括 Resource Ownership（资源归属）。

例如普通 user 虽然有“练习”权限，也只能操作：

- 自己的 Practice Session
- 自己的 Practice Record
- 自己的 Resume / JD AI Library
- 自己的 Profile
- 自己的 Evaluation / Report

公共 Question Library 可以允许已登录用户读取，但修改 / 发布题库需要 admin 权限。

---

# 十、前端 URL 与 ID 规则

允许 URL 中出现：

- sessionId
- recordId
- libraryId

不建议出现：

- 手机号
- 邮箱
- access token
- refresh token
- 密码
- 验证码
- 任何敏感身份信息

ID 使用 opaque ID（不透明 ID），不从 ID 字符串解析用户身份或权限。

前端对参数可以做格式校验，但格式校验只是为了更好的错误页面：

> 后端仍必须做存在性、状态、用户归属和权限校验。

---

# 十一、错误与边界行为

## 修改不存在的 sessionId

~~~text
GET /practice-sessions/ps_fake
→ 404
~~~

## 修改成其他用户的 sessionId

~~~text
GET /practice-sessions/ps_other_user
→ 404
~~~

不能返回其他用户数据。

## submitted Session 再次 submit

~~~text
→ 409 Conflict
~~~

或统一的业务错误码。

## abandoned / expired Session 继续答题

~~~text
→ 拒绝修改
~~~

## Access Token 过期

~~~text
→ 尝试 refresh
→ 成功：重试原请求
→ refresh 也失效：清登录状态并进入 /login
~~~

---

# 十二、CORS / Cookie / CSRF

前后端分离部署时：

- CORS 使用明确允许的前端 Origin。
- 不能在携带凭证时使用任意 origin。
- Cookie 设置 Secure / HttpOnly / 合理 SameSite。
- refresh 等 Cookie 接口需要考虑 CSRF 防护与 Origin 校验。
- 生产环境只使用 HTTPS。

---

# 十三、当前仓库需要逐步正式化的点

1. MainLayout 当前按 pathname 判断 authenticated，只是视觉状态，不是登录态。
2. LoginForm 目前只有前端校验，没有真实登录 API。
3. VerificationCodeButton 不能长期保留假验证码业务。
4. Practice Session 目前没有真实 current_user。
5. Practice Session 本地 Store 没有多用户隔离。
6. Practice Record / Report / AI Library 等私有资源未来都必须绑定 user_id。
7. 所有私有 API 都必须经过 get_current_user + Resource Ownership 校验。

这些应随真实后端开发逐步替换，不留到“项目最后一次性补安全”。

---

# 十四、实现顺序

与当前 Practice Session 主线结合，不单独造一套演示认证系统：

~~~text
users / auth_sessions 数据模型
↓
密码登录 + /auth/me + refresh + logout
↓
前端 Auth 状态 + RequireAuth
↓
PracticeSession 加 user_id
↓
start/resume 按 current_user + library 查询
↓
get / submit / abandon 做 ownership 校验
↓
Practice Record / AI Library / Report 按同样规则扩展
~~~

验证码登录等依赖外部短信服务的能力，在真实供应商接入时实现，不用假实现占位。

---

# 十五、验收标准

只有以下都满足，才算“登录 / 权限闭环”：

- 刷新页面仍能恢复登录态。
- 未登录不能进入受保护业务页。
- 修改前端 URL 不能访问其他用户数据。
- 修改请求 body 中任何伪造 userId 都不能越权。
- access token 过期可以安全刷新。
- logout 后 refresh session 失效。
- 用户 A 无法读取 / 提交 / 放弃用户 B 的 Practice Session。
- admin 与普通 user 的接口权限可验证。
- 前端隐藏按钮之外，后端也有真实授权判断。
- 自动化测试覆盖未登录、越权、资源不存在、状态冲突。
