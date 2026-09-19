# StudyMate Profile Center Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 开发登录后头像下拉菜单与四分区个人中心静态页面。

**Architecture:** Header 将用户菜单提取为独立 `UserMenu`，使用现有 Base UI Menu；个人中心使用一个 `ProfilePage` 和按路由切换的四个内容分区。所有数据为静态示例，交互只保留菜单、路由、表单控件和通知开关的本地行为。

**Tech Stack:** React 19、React Router 8、TypeScript、Tailwind CSS v4、Base UI、Lucide、Vitest、Testing Library

**Spec:** `docs/superpowers/specs/2026-09-18-profile-center-design.md`

## Global Constraints

- 不接后端、不实现真实鉴权、不实现文件上传和持久化。
- 不新增依赖，使用已安装的 Base UI 和现有 UI 组件。
- 不加入简历/JD 管理和 Pro 入口。
- 不提交 Git，等待用户验收。

---

### Task 1: 头像菜单

**Files:**
- Create: `frontend/src/components/layout/UserMenu.tsx`
- Modify: `frontend/src/components/layout/Header.tsx`
- Test: `frontend/src/App.test.tsx`

**Interfaces:**
- Produces: `UserMenu({ compact?: boolean })`，桌面和移动端复用。
- Consumes: Base UI `Menu`、现有头像素材、React Router `Link`。

- [x] 添加失败测试：点击“打开用户菜单”后出现用户摘要和三个菜单链接。
- [x] 从 `frontend/` 运行 `pnpm test -- src/App.test.tsx`，确认因菜单不存在而失败。
- [x] 实现 `UserMenu`，在 Header 的桌面和移动端复用。
- [x] 再次运行定向测试并确认通过。

### Task 2: 个人中心路由与布局

**Files:**
- Create: `frontend/src/pages/ProfilePage.tsx`
- Create: `frontend/src/components/profile/ProfileSidebar.tsx`
- Modify: `frontend/src/App.tsx`
- Modify: `frontend/src/components/layout/MainLayout.tsx`
- Test: `frontend/src/App.test.tsx`

**Interfaces:**
- Produces: `/profile`、`/profile/career`、`/profile/security`、`/profile/notifications`。
- Consumes: `MainLayout`、Header 登录样式、通用页面背景。

- [x] 添加失败测试：个人中心渲染登录后 Header、四项导航和个人资料默认分区。
- [x] 运行定向测试并确认因路由不存在而失败。
- [x] 实现路由、响应式侧栏和页面内容容器。
- [x] 再次运行定向测试并确认通过。

### Task 3: 四个静态内容分区

**Files:**
- Create: `frontend/src/components/profile/PersonalInfoSection.tsx`
- Create: `frontend/src/components/profile/CareerProfileSection.tsx`
- Create: `frontend/src/components/profile/SecuritySection.tsx`
- Create: `frontend/src/components/profile/NotificationSettingsSection.tsx`
- Create: `frontend/src/components/profile/ProfileSectionCard.tsx`
- Test: `frontend/src/App.test.tsx`

**Interfaces:**
- Produces: 四个具有独立职责的页面分区组件。
- Consumes: `Button`、`AppSelect`、Base UI `Avatar` 和 `Switch`。

- [x] 添加失败测试：四个路由分别展示对应标题和核心字段。
- [x] 运行定向测试并确认内容缺失。
- [x] 实现个人资料和求职画像静态表单。
- [x] 实现账号安全状态行和通知开关。
- [x] 再次运行定向测试并确认通过。

### Task 4: 完整验证

**Files:**
- Verify: `frontend/src/App.test.tsx`
- Verify: `frontend/src/components/layout/UserMenu.tsx`
- Verify: `frontend/src/pages/ProfilePage.tsx`
- Verify: `frontend/src/components/profile/`

**Interfaces:**
- Produces: 自动化检查和浏览器视觉验收依据。

- [x] 从 `frontend/` 运行 `pnpm test`。
- [x] 从 `frontend/` 运行 `pnpm lint`。
- [x] 从 `frontend/` 运行 `pnpm build`。
- [x] 在本地 `/profile` 检查桌面布局、头像菜单和四个路由。
- [ ] 检查 Git diff，确认没有覆盖题库、报告和登录页的无关改动。
