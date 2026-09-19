# StudyMate Unified Login Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将登录页收敛为手机号验证码自动注册登录与手机号密码登录，不保留独立注册和邮箱登录。

**Architecture:** `AuthCard` 只负责登录卡片外壳，`LoginForm` 负责两种手机号登录方式及本地校验；现有输入框和验证码按钮组件保持复用。删除无引用的 `RegisterForm`，不增加接口层和后端逻辑。

**Tech Stack:** React 19、TypeScript、Tailwind CSS v4、Vitest、Testing Library

**Spec:** `docs/superpowers/specs/2026-09-18-unified-login-design.md`

## Global Constraints

- 只实现静态页面与本地交互。
- 不接认证接口，不修改后端，不开发个人中心。
- 不新增组件库或依赖，复用现有 Button、AuthField、VerificationCodeButton。
- 不提交 Git 记录，等待用户验收。

---

### Task 1: 锁定统一登录行为

**Files:**
- Modify: `frontend/src/App.test.tsx`

**Interfaces:**
- Consumes: `/login` 路由渲染的真实登录组件。
- Produces: 验证码/密码切换、注册与邮箱入口移除、字段校验和验证码倒计时的回归测试。

- [x] **Step 1: 修改登录页测试**

  用 Testing Library 验证默认“验证码登录”，切换“密码登录”后的真实字段变化，以及账号自动创建提示。

- [x] **Step 2: 运行登录页测试并确认失败**

  Run (from `frontend/`): `pnpm test -- src/App.test.tsx`

  Expected: 当前实现仍显示手机号/邮箱登录和独立注册，因此新断言失败。

### Task 2: 实现统一登录卡片

**Files:**
- Modify: `frontend/src/components/login/AuthCard.tsx`
- Modify: `frontend/src/components/login/LoginForm.tsx`
- Delete: `frontend/src/components/login/RegisterForm.tsx`

**Interfaces:**
- Consumes: `AuthField`、`VerificationCodeButton`、`Button`。
- Produces: 无 props 的 `LoginForm()`，支持 `LoginMethod = "verification" | "password"`。

- [x] **Step 1: 简化 AuthCard**

  移除登录/注册切换状态，只渲染标题和 `LoginForm`。

- [x] **Step 2: 重构 LoginForm**

  两种方式共用手机号；验证码方式渲染验证码和自动创建提示，密码方式渲染密码及忘记密码入口；提交时只校验当前方式需要的字段。

- [x] **Step 3: 删除 RegisterForm**

  删除不再被引用的注册组件，避免保留第二套账号入口。

- [x] **Step 4: 运行测试并确认通过**

  Run (from `frontend/`): `pnpm test -- src/App.test.tsx`

  Expected: 登录页相关测试全部通过。

### Task 3: 完整验证

**Files:**
- Verify: `frontend/src/App.test.tsx`
- Verify: `frontend/src/components/login/AuthCard.tsx`
- Verify: `frontend/src/components/login/LoginForm.tsx`

**Interfaces:**
- Consumes: 完成后的前端源码。
- Produces: 测试、静态检查和生产构建证据。

- [ ] **Step 1: 运行完整测试**

  Run (from `frontend/`): `pnpm test`

  Expected: 0 failed。

- [ ] **Step 2: 运行 Lint**

  Run (from `frontend/`): `pnpm lint`

  Expected: exit code 0。

- [ ] **Step 3: 运行生产构建**

  Run (from `frontend/`): `pnpm build`

  Expected: exit code 0。

- [ ] **Step 4: 检查变更范围**

  Run: `git diff -- frontend/src/App.test.tsx frontend/src/components/login/AuthCard.tsx frontend/src/components/login/LoginForm.tsx frontend/src/components/login/RegisterForm.tsx docs/superpowers`

  Expected: 只包含本方案定义的登录页、测试和设计文档变更。
