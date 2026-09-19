# AI Library and Practice Loop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the static AI library and practice pages that express the complete personalized-practice loop while keeping the existing site-wide layout consistent.

**Architecture:** Keep `/questions` as the shared platform library and add `/questions/ai` for user-specific generated libraries. Replace the temporary practice API rendering with a composed static practice dashboard, while preserving shared layout primitives and keeping report analytics separate from practice history.

**Tech Stack:** React 19, TypeScript, React Router 8, Tailwind CSS 4, Base UI, Lucide React, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-19-ai-library-practice-loop-design.md`

**Status:** Implemented and verified on 2026-09-19. `pnpm test` passed 33/33 tests; `pnpm lint` and `pnpm build` completed successfully; browser QA covered `/questions/ai`, `/practice`, and `/reports` at 934px and 1440px viewport widths.

## Global Constraints

- This phase is frontend-only and must not add backend uploads, generation, scoring, persistence, or deletion APIs.
- All sidebar pages must reuse `SidebarPageLayout` and `PageSidebar`.
- Header height remains exactly 66px and must not animate size or internal positions.
- AI library and platform library data remain conceptually separate.
- No Git commit is created during this pass because the current worktree contains uncommitted user work.

---

### Task 1: Lock navigation and route behavior with tests

**Files:**
- Modify: `frontend/src/App.test.tsx`
- Modify: `frontend/src/App.tsx`
- Modify: `frontend/src/components/questions/QuestionSidebar.tsx`
- Modify: `frontend/src/components/reports/ReportSidebar.tsx`
- Modify: `frontend/src/pages/ReportsPage.tsx`

**Interfaces:**
- Produces route `/questions/ai` for `AiLibrariesPage`.
- Produces a reusable `QuestionSidebar` whose active route is derived from React Router.
- Preserves `/questions` and `/questions/:libraryId` behavior.

- [ ] **Step 1: Add failing navigation tests**

Assert that the question sidebar labels are exactly `AI 题库` and `站内题库`, that `/questions/ai` renders the AI page heading, and that report navigation excludes practice history.

- [ ] **Step 2: Run the focused tests and confirm failure**

Run: `pnpm test -- --run frontend/src/App.test.tsx`

Expected: failures for missing `/questions/ai` content and old navigation labels.

- [ ] **Step 3: Add the route and update navigation contracts**

Add `AiLibrariesPage` to `App.tsx`, convert question sidebar items to `NavLink` destinations, remove practice history from report navigation, rename `错题本` to `薄弱点分析`, and remove `RecentPracticeList` from report composition.

- [ ] **Step 4: Run focused tests**

Run: `pnpm test -- --run frontend/src/App.test.tsx`

Expected: route and navigation assertions pass once page scaffolding exists.

### Task 2: Build AI library data and page components

**Files:**
- Create: `frontend/src/data/aiLibraries.ts`
- Create: `frontend/src/components/questions/AiLibraryHero.tsx`
- Create: `frontend/src/components/questions/ExclusiveAiLibraryCard.tsx`
- Create: `frontend/src/components/questions/GeneratedLibraryCard.tsx`
- Create: `frontend/src/components/questions/GeneratedLibrarySection.tsx`
- Create: `frontend/src/components/questions/CreateLibraryDialog.tsx`
- Create: `frontend/src/components/ui/dialog.tsx`
- Create: `frontend/src/pages/AiLibrariesPage.tsx`
- Modify: `frontend/src/App.test.tsx`

**Interfaces:**
- `GeneratedLibrary` contains `id`, `kind`, `title`, `subtitle`, `skills`, `questionCount`, `completedCount`, and `updatedAt`.
- `GeneratedLibrarySection` consumes `title`, `count`, `limit`, and `libraries`.
- `CreateLibraryDialog` exposes local open state through its own trigger and uses Base UI Dialog primitives for accessibility.

- [ ] **Step 1: Add failing AI library content and dialog tests**

Assert the page exposes the locked `6/10` exclusive library, `2/3` resume quota, `2/6` JD quota, and a dialog that switches between resume and JD forms.

- [ ] **Step 2: Run the focused tests and confirm failure**

Run: `pnpm test -- --run frontend/src/App.test.tsx`

Expected: missing headings, cards, quotas, and dialog controls.

- [ ] **Step 3: Add typed static data**

Define two resume libraries and two JD libraries outside page components. Keep copy short enough for cards and include representative skills and progress.

- [ ] **Step 4: Build the page composition**

Compose `AiLibrariesPage` with the shared sidebar layout, a compact hero, one exclusive AI card, and two generated-library sections. Keep actions static except for navigation and dialog interactions.

- [ ] **Step 5: Build the Base UI dialog interaction**

Use Base UI `Dialog` primitives for portal, backdrop, popup, title, description, and close behavior. Keep resume/JD selection local and render accessible labels for every field.

- [ ] **Step 6: Run focused tests**

Run: `pnpm test -- --run frontend/src/App.test.tsx`

Expected: AI library content and dialog tests pass.

### Task 3: Build the integrated practice dashboard

**Files:**
- Create: `frontend/src/data/practiceOverview.ts`
- Create: `frontend/src/components/practice/PracticeSidebar.tsx`
- Create: `frontend/src/components/practice/PracticeHero.tsx`
- Create: `frontend/src/components/practice/PracticeModeCard.tsx`
- Create: `frontend/src/components/practice/PracticeModeGrid.tsx`
- Create: `frontend/src/components/practice/PracticeHistory.tsx`
- Modify: `frontend/src/pages/PracticePage.tsx`
- Modify: `frontend/src/components/layout/MainLayout.tsx`
- Modify: `frontend/src/App.test.tsx`

**Interfaces:**
- `PracticeMode` contains `id`, `title`, `description`, `status`, `meta`, `actionLabel`, `href`, `icon`, and visual `tone`.
- `PracticeRecord` contains `id`, `title`, `type`, `completed`, `score`, `duration`, and `practicedAt`.
- `PracticeModeGrid` consumes the four static modes.
- `PracticeHistory` consumes recent records and owns the `#practice-history` section anchor.

- [ ] **Step 1: Add failing practice page tests**

Assert the four modes appear, the smart mode shows `6/10`, the sidebar labels are `开始练习` and `练习记录`, and recent records expose review actions.

- [ ] **Step 2: Run the focused tests and confirm failure**

Run: `pnpm test -- --run frontend/src/App.test.tsx`

Expected: current temporary API page lacks all dashboard content.

- [ ] **Step 3: Add typed practice data**

Create exactly four practice modes in product order and three representative practice records. Link resume/JD empty actions to `/questions/ai` and basic practice to `/questions`.

- [ ] **Step 4: Build focused practice components**

Use a compact hero, four responsive cards, an explicit locked state for smart reinforcement, and a dense history list. Avoid filters, charts, pagination, voice input, and mock-interview controls.

- [ ] **Step 5: Replace the temporary API page**

Remove the React Query request from `PracticePage`, compose the new shared sidebar layout, and mark `/practice` as an authenticated page in `MainLayout`.

- [ ] **Step 6: Run focused tests**

Run: `pnpm test -- --run frontend/src/App.test.tsx`

Expected: practice navigation, mode, progress, and history assertions pass.

### Task 4: Verify layout consistency and production output

**Files:**
- Modify: `frontend/src/App.test.tsx`
- Modify if needed: components created in Tasks 1–3

**Interfaces:**
- Every sidebar page must expose `data-slot="page-sidebar"` and `data-slot="sidebar-page-layout"` through shared primitives.

- [ ] **Step 1: Extend the shared-sidebar contract test**

Add `/questions/ai` and `/practice` to the existing page matrix and require the same width, fixed desktop height, and right-content scrolling classes.

- [ ] **Step 2: Run the full test suite**

Run: `pnpm test`

Expected: all tests pass.

- [ ] **Step 3: Run lint**

Run: `pnpm lint`

Expected: no errors.

- [ ] **Step 4: Run the production build**

Run: `pnpm build`

Expected: TypeScript and Vite build complete successfully.

- [ ] **Step 5: Perform browser QA**

Open `/questions/ai`, `/questions`, `/practice`, and `/reports` at desktop and narrow widths. Verify the shared sidebar dimensions, independent content scroll, modal focus/close behavior, no horizontal overflow, and compact information density.
