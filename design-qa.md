# StudyMate Design QA

- source: `/var/folders/nv/2k3w_l692kd94bspqs6mrc0h0000gn/T/codex-clipboard-573f1dd4-081e-4b8b-9d66-678d628ab178.png`
- implementation: `/Users/ab/self/studymate-agent/output/design-qa/desktop-header-and-home.png`
- comparison: `/Users/ab/self/studymate-agent/output/design-qa/header-comparison.png`
- viewport: desktop `1280 × 720`; mobile `390 × 844`
- pixel dimensions and density normalization: source `1664 × 102` normalized to `1280 × 80`; implementation Header cropped to `1280 × 80`
- state: 首页默认态；移动端默认态与导航展开态

## Full-view comparison

- Desktop Header preserves the reference hierarchy: logo, four navigation items, active underline, primary login button, divider, and two-line tagline.
- Search is intentionally omitted per product requirement.
- Existing StudyMate logo is intentionally retained; only its stable intrinsic display size is used.
- Hero text buttons share the same primary Button treatment and remain aligned with the existing page composition.

## Focused region evidence

- Header comparison: `output/design-qa/header-comparison.png`
- Desktop page: `output/design-qa/desktop-header-and-home.png`
- Mobile page: `output/design-qa/mobile-home.png`
- Mobile navigation: `output/design-qa/mobile-menu.png`

## Findings

- No P0, P1, or P2 visual mismatch remains within the approved scope.
- The reference squirrel logo differs from the implementation by explicit instruction; this is not a defect.
- Header height uses the standard `h-20` token and the existing translucent `bg-card/70` treatment.
- Mobile keeps one visible login entry and switches navigation to the existing menu pattern.
- Browser console reported no warnings or errors.

## Comparison history

1. Compared the source Header against the first implementation at matched `1280 × 80` dimensions.
2. Checked desktop Header and Hero buttons at `1280 × 720`.
3. Checked mobile layout and navigation at `390 × 844`.

final result: passed

---

## Question learning workspace

- approved product direction: `docs/superpowers/specs/2026-09-19-question-learning-workspace-design.md`
- implementation: `http://127.0.0.1:4173/questions/react`
- implementation evidence: Codex in-app Browser captures attached to this task; the browser surface did not expose a writable screenshot path
- viewport: desktop `1440 × 1024`; mobile `390 × 844`
- state: first React question, collapsed and expanded answers, follow-up branch and return, mobile directory drawer

### Layout evidence

- The knowledge-library detail route no longer renders the website sidebar. The global authenticated Header remains shared with the rest of StudyMate.
- Desktop document height matched the `1024px` viewport and `window.scrollY` remained `0`; the directory and answer areas both reported `overflow-y: auto`.
- After expanding the answer, the right learning region measured `812px` high with `1814px` of content. Scrolling it to `1002px` left both the document and directory at scroll position `0`.
- The compact toolbar keeps `React 面试知识库` and `256 题` on the same line.

### Content and navigation evidence

- Directory numbers are stable three-digit values: `001` through `004` in the current static React sample.
- The answer order is `关键词解释 → 白话理解 → 示例代码 → 标准答案 → 原理解析 → 常见追问 → 面试表达建议`.
- Entering the `useMemo 和 useCallback` follow-up opened its complete expanded answer with a `返回原题` action.
- Returning restored the React render question and its previous right-panel scroll position (`964px`).

### Responsive evidence

- At `390 × 844`, the page had no horizontal overflow.
- The mobile `题目目录` action opened an accessible Base UI Dialog drawer with the same stable-number directory.
- Selecting question `002` closed the drawer and updated the right learning content.
- Browser console error count: `0`.

final result: passed

---

## Public IT knowledge library redesign

- source visual direction: `/Users/ab/.codex/generated_images/01a0b3d5-6b20-7e71-98ba-fa76fb96aea1/exec-e95c18ce-4431-4461-85a0-0e78c82a7af7.png`
- implementation: `http://127.0.0.1:4173/questions`
- implementation evidence: Codex in-app Browser captures attached to this task; the browser surface did not expose a writable screenshot path
- viewport: desktop `1440 × 1024`; mobile `390 × 844`
- state: React, Java, and Python favorited by default; answer hidden by default on the React detail page

### Full-view comparison

- The implementation follows the selected compact direction: one search field, a three-card favorite area, a four-column desktop library grid, restrained warm borders, and the shared StudyMate Header and sidebar.
- The search height is `48px`, intentionally reduced from the first proposal so it does not dominate the page.
- Every card shows its question count once. Difficulty, practice-mode filters, category tags, and the layout switcher are absent because this page represents public knowledge libraries rather than practice packs.
- The React detail page adds the complete learning loop beyond the overview mock: searchable question directory, hidden reference answer, explanation, code, interview tips, follow-ups, and previous/next navigation.

### Findings and fixes

1. First desktop pass found one P2 mismatch: the all-library area still used two columns at `1440px` because four columns started at the `2xl` breakpoint.
2. Fixed the grid to start four columns at `xl` and reduced the card minimum height from `208px` to `192px`.
3. Post-fix browser measurement reported four equal `271px` tracks at `1440px`, `scrollWidth === innerWidth`, and no console errors.
4. Mobile checks at `390 × 844` reported a single `350px` grid track and no horizontal overflow on either overview or detail pages.

### Interaction evidence

- Searching `Java` leaves only the Java library visible.
- Favoriting Vue moves it into `我的收藏`; unfavoriting restores the original `Vue、TypeScript、Go` order.
- Opening React starts with the answer hidden. Revealing it shows `参考回答、原理解析、示例代码、面试回答技巧、常见追问`.
- Switching to the second question hides the previous answer again.
- Browser console error count: `0`.

final result: passed

---

## Report overview page

- source visual truth: `/Users/ab/self/studymate-agent/ui/05.png`
- implementation: `http://127.0.0.1:4173/reports`
- implementation screenshot: Codex in-app Browser full-page capture attached to this task; the browser surface did not expose a writable screenshot path
- viewport: desktop `1672 × 941`
- pixel dimensions and density normalization: source `1672 × 941`; implementation CSS viewport `1672 × 941`; no normalization required
- state: authenticated Header, report overview, default seven-day charts

### Full-view comparison

- The implementation preserves the source hierarchy: authenticated Header, report rail, welcome title, three summary cards, trend chart, radar chart, weakness analysis, and recent-practice list.
- The shared Header and report workspace both use the approved `1480px` project width. This intentionally differs from the wider source frame so the report remains consistent with the home and question-bank pages.
- The lower-left English note illustration is intentionally omitted, and the existing StudyMate background image is reused as requested.

### Focused region evidence

- Header and workspace boundaries were measured at `96–1576px`, both exactly `1480px` wide.
- Post-fix vertical landmarks were measured against the source: summary cards `248px` vs `247px`, chart row `384px` vs `383px`, and recent-practice panel `748px` vs `751px`; the final document fits the `941px` viewport without horizontal or vertical overflow.
- Focused chart evidence was checked after Recharts animation completed: the trend area, final `85 分` marker, radar polygon, axis labels, and weakness progress bars were all visible.

### Required fidelity surfaces

- Fonts and typography: existing Geist and Chinese system fallbacks are retained; heading hierarchy, card labels, numeric emphasis, compact metadata, and truncation were checked at the matched desktop viewport.
- Spacing and layout rhythm: the first pass was vertically compressed by roughly `25–30px`; Hero padding, display-title sizing, and summary-card height were adjusted so the main horizontal bands now align within `3px` of the source.
- Colors and visual tokens: the existing cream background, orange primary token, warm borders, muted copy, green scores, and soft card shadows are reused consistently.
- Image quality and asset fidelity: the existing logo, avatar, and shared background remain sharp at their display sizes. No new decorative image was needed, and the requested lower-left illustration is absent.
- Copy and content: report title, summary metrics, trend dates and scores, six ability dimensions, three weakness items, and three recent-practice records follow the source.

### Findings

- No actionable P0, P1, or P2 mismatch remains in the approved desktop scope.
- P3: the top-right encouragement uses the project font stack with a serif italic treatment instead of the source's exact handwritten font.
- P3: the Recharts geometry and tooltip behavior are production-library equivalents rather than pixel-identical vector paths from the mockup.
- Browser console reported no warnings or errors.

### Comparison history

1. Initial desktop pass found one P2 issue: the report content bands were positioned approximately `25–30px` above the source.
2. Fixes: increased main top padding, Hero vertical rhythm and title size, and summary-card height.
3. Post-fix browser evidence placed the summary, chart, and recent-practice sections within `1–3px` of the source landmarks with no remaining P0/P1/P2 issue.

### Implementation checklist

- [x] Match the approved desktop composition at `1672 × 941`.
- [x] Reuse the shared `1480px` Header and content boundary.
- [x] Remove the lower-left decorative note.
- [x] Use the existing common background asset.
- [x] Verify report anchor navigation and chart rendering.
- [x] Check browser console warnings and errors.

final result: passed

---

## Question bank page

- source visual truth: `/Users/ab/self/studymate-agent/ui/04.png`
- implementation screenshot: `/Users/ab/self/studymate-agent/output/design-qa/questions-implementation-1672x941.png`
- full-view comparison: `/Users/ab/self/studymate-agent/output/design-qa/questions-comparison.png`
- focused header and Hero comparison: `/Users/ab/self/studymate-agent/output/design-qa/questions-comparison-header-hero.png`
- focused toolbar and cards comparison: `/Users/ab/self/studymate-agent/output/design-qa/questions-comparison-cards.png`
- viewport: desktop `1672 × 941`; mobile responsive check `390 × 844`
- pixel dimensions and density normalization: source `1672 × 941`; implementation `1672 × 941`; CSS viewport `1672 × 941`; device scale factor `1`; no normalization required
- state: authenticated Header, `全部` category, default filters, grid view

### Full-view comparison

- The implementation preserves the source hierarchy: global Header, left question-bank navigation, Hero statement and search, category chips, four filter controls, view switcher, and an eight-card catalog.
- Desktop region boundaries, four-column density, two-row card rhythm, search width, and left-rail proportions are aligned at the source viewport.
- Mobile was checked at `390 × 844`: the left rail is removed, category and filter rows scroll horizontally, cards collapse to one column, and no persistent control is hidden by horizontal overflow.

### Focused region evidence

- Header and Hero: `output/design-qa/questions-comparison-header-hero.png` verifies logo/nav alignment, authenticated avatar, heading hierarchy, copy, search control, generated illustration, and primary CTA treatment.
- Toolbar and cards: `output/design-qa/questions-comparison-cards.png` verifies category/filter density, icon sizing, four-column tracks, card spacing, difficulty badges, and paired action controls.

### Required fidelity surfaces

- Fonts and typography: Geist with the existing Chinese fallbacks keeps the reference's compact SaaS hierarchy; heading weight, card-title weight, line heights, wrapping, and muted metadata were checked in both comparison crops.
- Spacing and layout rhythm: source and implementation use the same viewport; Hero content is inset from the card grid, controls maintain a compact horizontal rhythm, and both card rows remain fully visible.
- Colors and visual tokens: the existing StudyMate cream background, orange primary token, muted foregrounds, difficulty colors, borders, and soft elevation are preserved. The main search action uses the source-like orange gradient.
- Image quality and asset fidelity: the Hero illustration and avatar are dedicated transparent PNG assets generated from the source art direction; no CSS drawings, handcrafted SVGs, emoji, or placeholder art are used. Both assets remain sharp at their display sizes.
- Copy and content: the heading, supporting copy, filter labels, eight catalog titles, descriptions, counts, difficulty labels, and actions match the source.

### Findings

- No actionable P0, P1, or P2 mismatch remains.
- P3: the source's handwritten English slogan is not reproduced because it is decorative and was not embedded into the generated illustration; the functional hierarchy and balance remain intact.
- P3: the source has a stronger blurred plant detail in the lower-left background; the implementation retains the existing project background asset with a subtler treatment.
- Browser checks covered React category selection, list-view switching, difficulty selection, desktop/mobile layout, and console output. No console warnings or errors were reported.

### Comparison history

1. Initial desktop pass found three P2 issues: Hero content lacked the source's inner inset, the Header avatar used an unsuitable crop, and the lower-left practice card touched the viewport edge.
2. Fixes: added the Hero inset, generated a dedicated transparent avatar, reduced and offset the practice card, and strengthened the search CTA treatment.
3. Post-fix evidence: `questions-comparison.png`, `questions-comparison-header-hero.png`, and `questions-comparison-cards.png` show the corrected matched-view state with no remaining P0/P1/P2 issue.

### Implementation checklist

- [x] Match desktop composition at `1672 × 941`.
- [x] Verify responsive behavior at `390 × 844`.
- [x] Verify category, filter, and layout controls.
- [x] Check browser console warnings and errors.
- [x] Compare full view and focused regions against the source.

final result: passed

---

## Login / Register page

- source: `/Users/ab/self/studymate-agent/ui/02.png`
- implementation: `/Users/ab/self/studymate-agent/output/design-qa/login-desktop.png`
- register state: `/Users/ab/self/studymate-agent/output/design-qa/register-desktop.png`
- comparison: `/Users/ab/self/studymate-agent/output/design-qa/login-comparison.png`
- comparison normalization: source `1672 x 941` normalized to implementation `1280 x 720`

### Full-view comparison

- The implementation preserves the reference's two-column hierarchy, warm background, standalone logo header, large left-side introduction, and right-side authentication card.
- Social login is intentionally omitted for the first version, and registration is presented as a separate card state per product requirement.
- The login and registration views now use an out-in transition: the current form fades out before the next form is mounted, so their controls never overlap in the DOM or on screen.
- Below the `lg` breakpoint, the decorative introduction is hidden and the authentication card remains centered with standard page padding.

### Findings

- No P0, P1, or P2 visual mismatch remains within the approved scope.
- Desktop login and registration states were checked in the local browser at `1280 x 720`.
- Responsive behavior is covered by the layout breakpoint contract: the intro uses `hidden lg:block`, while the page keeps `justify-items-center` and the card uses `mx-auto w-full max-w-xl`.
- The existing background image and logo assets were retained.

final result: passed
