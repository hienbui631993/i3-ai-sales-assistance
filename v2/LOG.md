# Change Log — i3 Privacy Compliance Agent (v2)

Tracks changes to the `v2/` privacy compliance agent and related work on the
`claude/v2` branch. Newest first. Dates are YYYY-MM-DD.

---

## 2026-07-06

### Added — `v2/chat.html` (Chat with Me) + site-wide Claude chat widget
- New **Chat with Me** page: a branded landing for **Vision**, the sales AI
  assistant — hero with an online status, an "Open the chat" CTA, tap-to-copy
  suggested prompts (privacy-by-address, a stage, a deliverable, prospecting,
  manager view, outreach), and "what I can help with" cards. Light/dark aware;
  logo → portal. Added a **Chat with Me** card to the portal.
- Integrated the **Claude chat widget** (i3 hub) on **every page** — the loader
  `<script src="https://hub.i3international.com/loader.js" data-app-key="cw_…"
  data-position="bottom-right">` is injected immediately before `</body>` on all
  10 pages (loader self-guards against duplicate loads). Renders as a floating
  launcher in an isolated iframe; no host styling touched.
- No Content-Security-Policy is set on these pages, so no CSP changes were
  needed. **Allowed-origins note:** the widget is configured for
  `https://i3-ai-sales-assistance.vercel.app/` — it will only render when the
  page is served from an allow-listed origin. Add the actual serving origin
  (e.g. the GitHub Pages / htmlpreview host used for previews) in the widget
  admin panel if the launcher doesn't appear there.

### Added — `v2/journey.html` artifacts (a deliverable per stage)
- Every one of the 8 journey stages now carries the concrete **artifact /
  deliverable** the rep produces at that step, shown **inline as a section**
  under the three lanes: a "Deliverable · artifact" header plus the embedded
  document (meta chips + two-column sectioned content). Always visible, no
  popup — it updates with the active stage.
- The artifacts: 30-Day Business Plan + SWOT (V-Start) · Buying-Group Map +
  Intent Brief (V-Target) · Outreach Sequence + Qualification (V-Reach/V-Guide)
  · Presentation Deck + Transcript (V-Present) · POC Document, Gardewine
  template (V-Prove) · Signage + PIA + Cyber Intake (V-Guard/Magenta) ·
  Proposal + Contract via DocuSign (V-Close) · Customer Story + Reference
  (Success). Content is grounded in the real i3 process (site address → exact
  legal doc, PM names, Salesforce/i3Host data ownership).
- Modal closes on backdrop click or Esc; opening pauses autoplay. Theme-aware
  (light/dark). Verified in both themes: per-stage artifact renders, preview
  opens with the right content, no JS errors.

### Added — Light / dark mode on every page (i3 Brand Kit)
- Every page in the project now supports **both light and dark mode** with a
  sun/moon **toggle in the topbar**. The choice persists in a shared
  `localStorage` key (`i3_theme`) so it **follows the user across all pages**,
  and defaults from the OS `prefers-color-scheme` on first visit. A pre-paint
  boot script sets the theme before first render (no flash).
- Implemented as a token contract: **brand colors stay constant** in both
  themes (Brand Blue #00588F, Dark Blue #002447, Pink #DF1E71, Green #00A661,
  Yellow #FFC107); only **surface** tokens flip via `:root[data-theme=...]`
  overrides. Topbars stay dark-blue in both themes so the white i3 logo and the
  toggle always read.
- Light-first pages (process, sop, privacy & cybersecurity agent, Magenta
  simulation, architecture, Vision sales agent) gained a **dark** override;
  dark-first flagships (portal, journey, sales engine) keep their rich dark
  design as the base with a **light** override. On the sales engine the glowing
  **orbit infographic and reasoning console stay on an always-dark canvas** in
  both themes (a deliberate embedded "screen"), while the surrounding chrome and
  the Manager dashboard fully theme to light.
- Verified each page in both themes (headless): boot honours OS preference, the
  toggle flips and persists, brand colors intact, no invisible text, no JS errors.

### Added — `v2/journey.html` (The Deal Journey — animated follow-along)
- New **animated visualization** so people can *watch* a deal move through the
  process. A glowing puck glides along a roadmap rail of the 8 stages; a
  gradient progress fill trails behind it and the stage nodes light up as it
  passes. As the puck lands on each stage, the stage panel swaps in with its
  three lanes rising in sequence — 🧑 Salesperson / ✨ Vision (AI) / 👔 Manager —
  with animated "thinking" dots on the Vision lane and handoff arrows between
  lanes. **Auto-plays** (Play/Pause, Prev/Next, Restart, per-stage timer bar)
  and every node is clickable to jump. Puck + fill are measured to the actual
  node centres so they stay aligned on any width; realigns on resize. Dark i3
  Brand Kit theme; logo → portal. Added a **Deal Journey** card to the portal.

---

## 2026-07-03

### Added — `v2/process.html` (Sales Process — Rep · AI · Manager)
- New **Sales Process** page answering "how a salesperson does this from
  beginning to end, how AI helps, and how the manager takes part." One card per
  stage with **three lanes** — 🧑 Salesperson / ✨ Vision (AI) / 👔 Manager —
  across the full 8-stage motion: Onboarding & Ramp (V-Start), Prospecting &
  Lead Intelligence (V-Target), Outreach & Qualification (V-Reach / V-Guide),
  Presentation (V-Present), Proof of Concept (V-Prove), Privacy &
  Cybersecurity (V-Guard / Magenta), Proposal & Close (V-Close), and Customer
  Success & Reference. Each stage names its trigger and Vision agent; closes
  with a "The loop" summary (Vision guides, rep executes, manager coaches; all
  activity proprietary to i3 via Salesforce; only verified activity advances).
  i3 Brand Kit styling; logo → portal. Added a **Sales Process** card to the portal.

---

## 2026-06-26

### Added — `v2/sop.html` (SOP page — Revenue Operating System)
- New **SOP** page following the **i3 Revenue Generation SOP v1 (Draft)** and the
  **i3 Sales Process (2021)**: ROS vision + guiding principles, the enterprise
  revenue architecture, the standard SOP template, the full **SOP catalog
  (100–1300)** (expandable, each mapped to a Vision agent), the worked example
  **SOP 200**, the AI-agent specification pattern, and the **7-stage i3 sales
  cycle**. i3 Brand Kit styling; logo → portal. Added an SOP card to the portal.

### Changed — defer Channel Partners + Partner self-host (not decided yet)
- Per feedback these are too far out to commit to now. In `ARCHITECTURE.md` and
  `vision-architecture.html` the access model is scoped to **v1: i3 Sales Reps +
  Integrators**; **Channel Partners** (scoped agent subsets) and **Partner
  self-host** are moved to a clearly-marked **"Future — not decided yet"** note
  (dimmed "Future · TBD" tiles in the diagram). Removed the partner asterisks on
  the Presentation/Legal agents and the "1–2 partners" pilot line. The working
  demo still shows a Partner role as an illustrative preview (can be removed on request).

### Changed — iHost → i3Host; training platform → i3Live
- Renamed **iHost → i3Host** everywhere in the UI and docs (portal, all agents,
  Magenta trace, BUILD_PLAN, DEMO, ARCHITECTURE).
- Standardized the training platform name to **i3Live** (was "i3i" / "i3 Live") —
  V-Coach description + tools, and the BUILD_PLAN agent-to-tool table.

### Changed — "V · Vision" → "Vision" with a standout V (i3 brand)
- Renamed the product from "V · Vision" / "V Vision" to **Vision** across the UI
  (portal hero + cards, V engine topbar/hero/lede, Vision agent + Architecture
  topbars). The leading **V** is styled in i3 **pink (#DF1E71)** to stand out.
  The engine's central orbit mark keeps the bold **V** as the brand symbol; the
  agents keep their V- names.

### Changed — i3 logo links back to the portal
- Clicking the i3 logo now returns to `portal.html` on every page (Vision agent,
  V engine, Architecture, Magenta, Privacy agent). Uses an htmlpreview-aware
  handler so it works both self-hosted and through the preview proxy.

### Fixed — Manager dashboard roster column alignment
- Roster columns now top-align (`align-items:start`) and labels share a fixed
  height, so STAGE / READINESS / REFLECTIONS·MENTOR labels, their values, and the
  progress bars line up across every row. Status badge stays vertically centered.

### Changed — Manager dashboard roster names
- Manager dashboard (`v-vision-sales-engine.html`) roster now uses the real names:
  George Karaolis, Paul Kerling, Tony Thomas, Rajiv Patel, Andrew Ioannou,
  Christian Combes (6 reps across stages/segments).

### Changed — address→legal in Privacy agent + PM-by-territory in Vision
- **`i3-privacy-compliance-agent.html`**: the location question is now a **site
  address**; Vision derives the **jurisdiction + exact legal doc** from it (same
  logic as the Vision agent — Quebec → Law 25 + bilingual signage, Illinois → BIPA,
  California → CCPA, EU → GDPR DPIA, …) and shows it in the brief and the report.
- **`vision-sales-agent.html`**: the PM handoff now **assigns by territory** —
  Quebec → Nissan, Ontario → Louel, West/Other → Des (was auto-rotating).

### Removed — voice / speech features from the Vision sales agent
- Removed all text-to-speech: the "🔊 Talk to me" toggle, "🔊 Hear my plan",
  "🔊 Hear Vision", the per-action speech, and the `speak()`/`toggleVoice()` code
  and the talking-avatar animation. Updated the DEMO.md script to drop the voice
  step. No functional change otherwise; verified end-to-end, no errors.

### Changed — privacy agent + Magenta: directive, fewer questions, +cybersecurity
- Applied the same treatment to the other privacy pages:
  - **`i3-privacy-compliance-agent.html`** → renamed **Privacy & Cybersecurity
    Agent**; trimmed the interview from 11 questions to **4** (account, location,
    apps, purpose) with the rest defaulted; report is now directive — **"Do this —
    privacy"** + new **"Do this — cybersecurity"** (cyber intake forms, residency,
    MFA, encryption, SOC 2, retention).
  - **`magenta-portal-simulation.html`** → reduced to **one** question (defaults the
    rest); output is directive with **"Do this — privacy"** and **"Do this —
    cybersecurity"** lists.

### Changed — `v2/vision-sales-agent.html` · names + POC address→exact legal doc
- **PM team names**: PM handoff now assigns a real PM — **Louel / Nissan / Des**.
- **Salesperson names**: default rep is **David Chen**; admin onboarding defaults to
  **Tony Russo**.
- **POC site address**: added an address field; Vision derives the **exact legal
  requirement** from it (Quebec → Law 25 PIA + bilingual signage, Ontario → PIPEDA,
  Illinois → BIPA, California → CCPA, EU → GDPR DPIA, …) and the Privacy &
  Cybersecurity review picks up that jurisdiction + exact doc.

### Changed — `v2/vision-sales-agent.html` · directive wording + cybersecurity
- **Privacy stage → "Privacy & Cybersecurity"**: now also tells the rep the
  cybersecurity actions (cyber intake forms, Canada-for-Canada residency, access
  control + MFA, encryption, SOC 2 / vendor review, retention).
- **Directive, fewer questions**: the agent applies defaults (jurisdiction from
  territory, sensitive solutions assumed) and **tells the rep what to do** with
  "Do this — privacy / cybersecurity" action lists — no required choices to ignore.
- Removed the jurisdiction/tools and segment pickers (now defaulted); single
  "Run" button per stage. Updated `ARCHITECTURE.md` accordingly.

### Changed — `v2/DEMO.md` · added Vision Sales Agent 5-min scripted demo
- Added a short, scripted, voice-on demo path for `vision-sales-agent.html` at the
  top (admin onboarding → dashboard → LinkedIn + buying group → transcript→POC →
  PM handoff), with exact clicks and presenter lines. Kept the full portal
  walkthrough below it.

### Changed — `v2/vision-sales-agent.html` · admin, dashboard, deeper agents, voice
- **Admin onboarding** flow: set segment/territory/responsibility/annual goal →
  Vision builds the workflow and auto-starts the rep (saved to Salesforce,
  proprietary to i3).
- **Rep dashboard** as home: daily tasks, monthly goal, commitment, pipeline,
  orders; clickable widgets drill in and **nudge** into the right stage.
- **Prospecting**: LinkedIn presence assessment + marketing meeting + associations;
  surfaces the **buying group** (multiple decision-makers) with 6sense/ZoomInfo
  intent and next-day actions (no longer one contact).
- **Presentation → POC**: upload/sample the transcript → captures attendees →
  **generates the POC**; POC prompts for **every stakeholder** (title/position,
  supporter flag), recommends **solution + equipment**, hands off to a **PM agent**
  (timeline, cybersecurity forms, data).
- **Vision talks** — "Talk to me" voice toggle (browser speech) for demo "aha".
- Persistent **proprietary-to-i3 / saved-to-Salesforce** note. Updated
  `ARCHITECTURE.md` §10.

### Added — Vision sales agent (working model) + architecture
- `v2/vision-sales-agent.html` — **stage-first working model** named Vision. First
  question: "What stage of sales are you in?" 6 stages (Onboarding, Prospecting,
  Presentation, POC, Legal & Privacy, Closing), each a guided mini-agent with
  load/paste/select inputs, a thinking pass, and grounded output. Role switch
  (i3 Rep / Integrator / Partner) with partner scoping (Presentation + Legal) and a
  self-host note. i3 Brand Kit colours + Helvetica Neue; runs "inside iHost".
- `v2/vision-architecture.html` — **visual architecture diagram** for engineers:
  access tiers → iHost → orchestrator + LLM → agents → tools → knowledge base,
  plus cross-cutting (residency, verification-first, human checkpoints).
- `v2/ARCHITECTURE.md` — engineering write-up (access model + partner self-host,
  layers, tool contracts, build order, guardrails).
- Added Vision Sales Agent and Architecture cards to `portal.html`.

### Fixed — Portal card navigation under htmlpreview
- Portal cards used relative links, which the htmlpreview proxy doesn't rewrite
  for navigation (clicking just appended the hash to `portal.html`). Cards now
  carry `data-target`/`data-hash`, and a boot script rewrites them to full
  htmlpreview proxy URLs when running on `htmlpreview.github.io`, while keeping
  plain relative links when self-hosted (e.g. iHost). The Manager card now lands
  on the working `…/v-vision-sales-engine.html#manager` proxy URL.

### Fixed — Manager Dashboard deep-link from the portal
- The portal's **Manager Dashboard** card opened the engine on the default view
  because preview proxies (htmlpreview) drop the `#manager` URL fragment. The
  portal now also sets a `localStorage` flag the engine reads on boot (cleared
  after use), so the dashboard opens reliably regardless of fragment handling.
  Also added a live `hashchange` handler. The in-engine ▦ Manager toggle was
  unaffected and continues to work.

### Added — `v2/DEMO.md` and `v2/BUILD_PLAN.md`
- **DEMO.md** — click-by-click walkthrough script (~8–10 min) to present the
  portal/engine/Magenta/manager flow internally, with an honest "is this real?"
  note and reset tips.
- **BUILD_PLAN.md** — production plan: real-vs-simulated layers, architecture
  (one orchestrator, LLM agents, tool/function layer, retrieval KB), the 9
  agents → real tools mapping, platform choice (OpenAI / Claude / Agentforce),
  build order (verification before UI), North-America-first pilot, and guardrails.

### Changed — `v2/v-vision-sales-engine.html` · wired agents together
- **V-Guard** pipeline card now links to the **Magenta portal**
  (`magenta-portal-simulation.html`).
- Rep detail modal gained **▶ View this rep in V engine** — switches to the engine
  pre-set to that rep's stage (entry point) and segment.

### Changed — `v2/v-vision-sales-engine.html` · deeper V-Reach / V-Guide
- **V-Reach** grounded in the onboarding doc's marketing model — hand-off to
  marketing, segment value narrative, social campaign (new lead source), nurture,
  and VAR/partner-network activation.
- **V-Guide** grounded in the agentic-sales verification layer — proves email,
  phone, mobile and meeting activity, runs anti-gaming checks, and counts only
  verified activity toward progression.
- All 9 V agents now grounded in the loaded documents.

### Added — `v2/portal.html` (unified Vision Portal landing page)
- New hub tying everything together: cards linking to **V · Vision Sales Engine**,
  **Magenta Privacy Co-Pilot**, **Privacy Compliance Agent**, and the **Manager
  Dashboard** (deep-links to `v-vision-sales-engine.html#manager`). Sales-rep /
  channel-partner role toggle (partners don't see the Manager card). Includes a
  "how it fits your sales process" flow line. i3 Brand Kit styling, logo inlined.

### Added — `v2/v-vision-sales-engine.html` · clickable rep detail
- Roster rows are now clickable → a rep detail modal (stage, acclimation week,
  readiness, reflections + mentor progress, current focus, next milestone, and an
  acclimation-deliverables checklist). Added `#manager` URL hash to open the
  Manager view directly (used by the portal deep-link).

### Changed — `v2/v-vision-sales-engine.html` · deeper V-Target / V-Prove / V-Close
- **V-Prove** grounded in the Gardewine POC template (site walkthrough, 45-day
  data collection, success metrics, Go/No-Go, signature block).
- **V-Close** grounded in the competitor **Cost Matrix** ("how to pitch against"
  battlecard, price benchmark, i3 value position) → Salesforce/Automatica sync.
- **V-Target** enriched with VAR / integrator coverage + LinkedIn.

### Added — `v2/v-vision-sales-engine.html` · Manager dashboard view
- New **Manager view** (top-bar toggle ▶ Engine / ▦ Manager): team read-out of
  every rep V is guiding — KPI cards (reps onboarding, avg readiness, reflections
  on-track, active POCs), a rep roster (stage, readiness bar, weekly-reflection +
  mentor-meeting progress, On-track / Needs-attention flag), and a "where reps sit
  in V" stage distribution. Sample roster of 5 reps across segments/stages.

### Changed — `v2/v-vision-sales-engine.html` (onboarding intake + deeper agents)
- Added an **Onboarding intake** area: load an onboarding document and V-Start
  parses it into a rep profile, mentor team, acclimation plan and the weekly
  reflection cadence; the loaded doc drives the segment + entry point.
- Deepened **V-Start** (NSM training, 30-day business plan + SWOT, Friday
  reflection forms, mentors) and **V-Coach** (Sales Mastery, Sales Ops on
  Salesforce/Quoting/Forecasting/DocuSign, i3 Technology Center, production)
  reasoning — grounded in the onboarding welcome docs and 30-90 schedule.

### Added — `v2/v-vision-sales-engine.html` (V · Vision agentic engine)
- New artifact: animated agentic **sales engine** named **V (Vision)**, grounded
  in the i3 Agentic Sales Assistance doc, Gardewine POC template, competitor
  cost matrix, and the privacy guides.
- "Cool infographic that thinks": a glowing central **V** core orbited by 9 area
  agents, with the active agent pulsing + a hot connection line and a live
  typewriter **reasoning stream**.
- 9 agents: V-Start (onboarding), V-Target (6sense/ZoomInfo lead intel),
  V-Reach (marketing), V-Coach (i3i training), V-Guide (outreach + verification),
  V-Present (presentation + manager), V-Prove (POC), V-Guard (legal/privacy =
  Magenta), V-Close (commercial vs cost matrix → Salesforce/Automatica).
- Multiple entry points (New Hire / Veteran / Jump to POC) and segment selector
  (Retail / Commercial / School / Integrator). Verified end-to-end headless.

### Changed — `v2/magenta-portal-simulation.html`
- Gave catalog product cards more room: title on its own line with spacing,
  price + risk tag on a clean second line, larger tag padding, and the Add
  button aligned top so it no longer crowds the text.

### Fixed — `v2/magenta-portal-simulation.html`
- Login sign-in form was pushed off the card because the inline logo SVG
  rendered at its native 800px width; constrained `.ilogo svg` to `width:auto`
  so both panels (intro + sign-in) show correctly.
- Removed the "Powered by OpenAI" badge from the top bar (per request).

### Added — `v2/magenta-portal-simulation.html` (OpenAI portal demo)
- Clickable, self-contained simulation of the **internal Sales & Partner portal**
  with the **Magenta** privacy agent embedded in the iHost quoting flow —
  framed as an **OpenAI** (GPT-4o / function-calling) build, per request.
- Flow: **login** (i3 Sales Rep *or* Channel Partner) → **iHost quote builder**
  (opportunity synced from Salesforce; i3 solution catalog with privacy tags) →
  adding a flagged solution **triggers Magenta** → agent shows a simulated
  **OpenAI function-call trace** (Salesforce.getOpportunity, iHost.getQuote,
  Automatica.getResidency, GoToMeeting.getTranscript, KB.lookupLaw) → asks 4
  questions → decision + next steps → **writes back to Salesforce** and the
  quote advances.
- Sales-cycle framing: privacy step shown dropping from **~3–5 days (manual)
  to ~8 min**. Scope badge: **North America · v1**. Systems strip: Salesforce
  (CRM), Automatica (ERP), iHost (quoting), GoToMeeting (transcripts).
- i3 Brand Kit styling; official logo inlined. Verified end-to-end headless.

### Added — `v2/LOG.md`
- Created this change log to track work on the `v2/` agent.

### Changed — merged `main` into `claude/v2`
- Pulled `origin/main` into `claude/v2` (clean merge, no conflicts).
- Brought in the full `i3 Media Kit/`, project docs (`README.md`,
  `BUILD_SPEC.md`, `PROCESS.md`, `GUIDE.md`, `USER_GUIDE.md`, `TECHNICAL.md`),
  and a parallel set of agents from main (`vguard-legal-agent.html`,
  `vision-agentic-engine.html`).
- Note: two privacy-agent implementations now coexist — this `v2/` agent
  (mine) and `vguard-legal-agent.html` (from main). Not yet consolidated.

### Changed — restyled `v2/i3-privacy-compliance-agent.html` to the i3 Brand Kit
- Applied the official **i3 Brand Kit (Rev. 20260214)**, pulled from `main`:
  - **Brand Blue `#00588F`** + **Dark Blue `#002447`** as the structural /
    hero palette (Dark Blue on hero + footer per its "premium anchor" usage).
  - **Pink `#DF1E71`** for section / accent labels (matching the kit's own use).
  - **Green `#00A661`** / **Yellow `#FFC107`** for low / medium risk semantics
    (sanctioned "icons / infographics" usage); functional red for high risk.
  - **Helvetica Neue** as the primary typeface.
  - Official **i3 logo inlined as SVG** (white on the dark hero and footer),
    respecting clear-space and light-on-dark rules.
  - Added a branded footer with the i3 copyright line.
- Logic and knowledge base unchanged. Verified end-to-end headless, no errors.

### Added — `v2/i3-privacy-compliance-agent.html` (initial v2 build)
- Fresh, independent build (own work; knowledge derived solely from the
  **Q25 / Quebec Law 25** presentation deck).
- **Conversational agent** design: interviews the rep one question at a time
  and builds a live compliance brief + full report on the right.
- Knowledge base from the deck:
  - i3 application standing (slide 14) + restricted uses (slide 12)
  - Four-Part Necessity & Proportionality Test (slides 18–19)
  - OPC signage guidance (slides 15–16) → purpose-specific signage generator
  - POS + video integration escalation (slide 17)
  - jurisdiction → standards mapping (slide 7): Law 25, PIPEDA, PIPA, CCPA, GDPR
- Outputs: Go / Checkpoint / Escalate decision, four-part scorecard, sales
  positioning, required next steps, customer-ready signage, and PIA starter.
- Self-contained single HTML file (no install / no build step).

---

## Earlier (root, before v2 folder)

### Added — `vguard-privacy-compliance-agent.html` + build guide
- First version of the privacy/legal agent for Bill 25 / Q25 POC due diligence
  (6-step wizard with a live risk engine).
- Companion: `documents/V-Guard Privacy Compliance Agent - Build Guide.md`
  (how it maps to the deck and the sales process, plus how to build the true
  LLM-backed agent on Claude / Copilot Studio / OpenAI / Salesforce Agentforce).

---

## Branch notes
- **All work lives on `claude/v2`** — this is the single source of truth for the
  whole project. Every preview/demo link and document references `claude/v2`.
- `claude/v2` contains the full `v2/` suite plus the merge with `main`.

## How to update this log
Add a dated entry at the top under the current date, grouped as
**Added / Changed / Fixed / Removed**. Keep entries short and tied to the
file or behaviour that changed.
