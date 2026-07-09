# Change Log — i3 Privacy Compliance Agent (v2)

Tracks changes to the `v2/` privacy compliance agent and related work on the
`claude/v2` branch. Newest first. Dates are YYYY-MM-DD.

---

## 2026-07-08

### Changed — Prospecting leads: named accounts, no "Ready to present" buttons (`vision-sales-agent.html`)
- Replaced the five sample leads with three named accounts — **International Data
  Corporation (IDC) · Carnegie Museum of Art · Getty Images** — and removed the
  **"Ready to present →"** button column (header + cells) and the now-unused
  `leadReady()` handler. Updated the count copy (5→3 leads / accounts), dropped
  the "mark one Ready to present" line from the stage intro, and updated the
  dashboard to-do to name the three accounts. Verified headless: 3 leads render,
  zero Ready-to-present buttons, no JS errors.

### Changed — restored the Small company-size tier (`v-vision-sales-engine.html`)
- Added **Small — 10–50 locations** back as the first option; sizes are now
  Small 10–50 · Mid-market 50–150 (default) · Enterprise 150+. Verified headless.

### Changed — SOP example images → "Drag your Image here" drop-zones (`vision-sales-agent.html`)
- Replaced the four generated sample images in the example-SOP popup (3) and the
  Customer Success section (1) with the app's dashed **drop-zone placeholder**
  (🖼️ + **"Drag your Image here"**), keeping each caption reworded to "What goes
  here: …" so it says which screenshot belongs there. Removed the unused
  `sop-sample-*.png` files and updated `media/README.md`. Verified headless:
  4 drop-zones render with the right text, no images remain, no JS errors.

### Changed — size ranges, Presentation flow, POC docs, ROS wording
- **Company size** (`v-vision-sales-engine.html`) → two tiers: **Mid-market
  50–150 (default) · Enterprise 150+** locations (dropped the small tier).
- **Presentation stage** (`vision-sales-agent.html`) sub-label → **"Prep →
  Present"**; intro reframed as the two steps (prep the deck, then present +
  capture the transcript).
- **Contact PM / official POC** (`vision-sales-agent.html` `showPM`): added a
  **"Documents to include (signed before kickoff)"** section — **ROI document,
  NDA (signed), CMS Legal documents (signed)** — with a note that the official
  POC isn't created until they're attached and signed.
- **ROS wording**: "watch a deal move from a brand-new rep to closed-won" →
  **"the Sales Process from Lead to Closed"** (ros.html h1 + portal ROS card).
  Verified headless, no JS errors.

### Changed — company-size dropdown ranges (`v-vision-sales-engine.html`)
- Updated the **Company size (locations)** options to **Small 10–50 · Mid-market
  50–100 (default) · Enterprise 100+** (was 1–5 / 6–50 / 50+). Run note/boot log
  follow the new short labels. Verified headless.

### Changed — renamed the privacy agent **Magenta → V-Guard** across v2
- Renamed the agent everywhere it's user-facing or spec'd: the privacy page
  (`i3-privacy-compliance-agent.html` — title, eyebrow, h1, live-agent button),
  the portal card + flowline (`index.html`), the engine agent card
  (`v-vision-sales-engine.html`), and `process.html` / `ros.html` / `sop.html` /
  `vision-architecture.html`. Compound labels like "V-Guard (Magenta)" and
  "V-Guard · Magenta" collapse to just **V-Guard**.
- Sales Agent: the live-agent button is now "Open the live **V-Guard** agent" and
  the `LIVE_AGENTS` key `magenta` → `vguard` (call site updated).
- Specs: `MAGENTA_AGENT.md` → **`V_GUARD_AGENT.md`** (content renamed;
  reference in `MARKET_RESEARCH_AGENT.md` updated), plus `POC_AGENT.md`,
  `ARCHITECTURE.md`, `BUILD_PLAN.md`, `DEMO.md`.
- **Left untouched on purpose:** the **color** "magenta" (the Max-detection-area
  overlay in the sample SOP images) and historical `LOG.md` / `REQUEST_LOG.md`
  entries. Verified headless: no visible "Magenta" remains, no JS errors.

### Changed — topbar brand is clickable back to the portal on every page
- Made the **"Vision · <page>"** topbar brand clickable (pointer cursor →
  `goPortal()`) on all six sub-pages: process, ros, sop, v-vision-sales-engine,
  vision-architecture, vision-sales-agent. The portal's own brand already links
  home via `goPortalHome()`; the Magenta page's logo already links to the portal.
  Verified headless on all six — no JS errors.

### Changed — portal topbar brand is clickable back to the portal (`index.html`)
- Made the **i3 logo** and the **"Vision Portal · Sales & Partner"** brand in the
  portal topbar clickable (pointer cursor) — both call a new htmlpreview-aware
  `goPortalHome()` that returns to `index.html`. Verified headless, no JS errors.

### Added — live ChatGPT agent launch buttons (V-Prove · V-Research · Magenta)
- Wired the three live ChatGPT agents into the UI at each agent's home, as a
  green "▶ Open the live … agent ↗" button that opens the agent in a new tab:
  - **V-Prove** → Sales Agent **Proof of Concept** stage.
  - **V-Research** → Sales Agent **Presentation** stage (the market/account
    research that powers the deck), with a one-line note.
  - **Magenta** → Sales Agent **Privacy & Cybersecurity** stage **and** the
    dedicated **Magenta page** (`i3-privacy-compliance-agent.html`) hero.
- Added a `LIVE_AGENTS` map + `liveAgentBtn()` helper in `vision-sales-agent.html`
  and a shared `.btn.live` / `.liveagent` style (ChatGPT green #10a37f).
  Verified headless: every button resolves to the correct agent URL, opens in a
  new tab, is visible and styled — no JS errors.

### Changed — de-identified the example SOP popup: sample company, contacts + generated images (`vision-sales-agent.html`)
- Removed the "real document — NTE_Ai_Configuration_SOP…pdf · Northern Tool +
  Equipment · June 19, 2024" subtitle from the popup header, and reframed the
  popup from "the real, in-use SOP" to a **sample of the standardized format**.
- Replaced the real company/partner and contacts with **samples**: Northern Tool
  and Equipment / NTE → **Northwind Retail**; Global Axiom → **Summit Integration
  Partners**; Site 658 Burleson → **Site 042 · Riverside**; all contact names,
  emails (`@…​.example`) and phones (`1-555-01xx`) are now fictional. Dropped the
  "Open the original PDF" buttons from the popup and the Customer Success section.
- Replaced the three PDF-extracted screenshots (which contained real footage and
  device serials) with **generated look-alike samples** in `v2/media/`
  (`sop-sample-detection-area.png` — camera view with the Max detection area
  larger than the Area alarm; `sop-sample-alarm-settings.png`;
  `sop-sample-object-detection.png`) and removed the old `sop-nte-*` images.
  Updated `media/README.md`. Verified headless: all sample images load, no real
  names remain, no JS errors.
- Note: the POC stage's "Open the AI Configuration SOP (PDF)" button and the
  real PDF at `v2/SOP/NTE_Ai_Configuration_SOP_240619v2.pdf` are unchanged
  (out of scope for this section) and still reference the real document.

### Added — "3 · Company size (locations)" dropdown in the Meet Vision engine (`v-vision-sales-engine.html`)
- Added a **Company size** `<select>` under **2 · Target segment**, measured by
  **number of locations**: Small (1–5) · Mid-market (6–50, default) ·
  Enterprise (50+). The choice flows into `sel.size`, the run note
  ("… · Size: 6–50 sites") and the boot log (`size=…`); it's locked while the
  engine is running. Styled to the engine's light/dark tokens. Verified headless.

### Removed — the "Admin?" banner from the rep dashboard (`vision-sales-agent.html`)
- Dropped the **"👤 Admin? Onboard a new salesperson or open the Manager
  Dashboard…"** promo bar (`.adminbar`) from the rep dashboard, plus its now-dead
  CSS. Admin is still reachable from the **Admin** role button in the topbar.

### Changed — Admin menu opens on the **Manager Dashboard** by default (`vision-sales-agent.html`)
- The Admin menu now defaults to **▦ Manager Dashboard** (was Onboard) — it's
  listed first in the tab row and is the tab shown when an admin opens the menu
  with no sub-tab specified. Onboard a salesperson is still one click away.

### Changed — portal card renamed **"Meet Vision"**; Manager Dashboard moved to the Sales Agent's **Admin menu**
- **Portal (`index.html`):** the "Vision Sales Engine" card is now **"Meet
  Vision"** (pink-V styling kept); its copy/tag no longer mention the Manager
  dashboard. The **Vision · Sales Agent** card now notes that Admins onboard
  reps and see the **Manager Dashboard** from the Admin menu (new tag).
- **Meet Vision (`v-vision-sales-engine.html`):** removed the Manager Dashboard
  entirely — the ▦ Manager toggle, the manager view, the rep-detail modal, and
  all related CSS/JS (REPS roster, renderManager, switchView, openRep,
  runRepInEngine). Legacy `#manager` links / `v_view` flags now **redirect** to
  the Sales Agent's Admin → Manager Dashboard so old bookmarks keep working.
- **Sales Agent (`vision-sales-agent.html`):** the Admin view is now an **Admin
  menu** with two tabs — **👤 Onboard a salesperson** (existing flow) and
  **▦ Manager Dashboard** (moved from the engine): 4 KPIs (reps onboarding,
  avg readiness, reflections on-track, active POCs), the clickable 6-rep
  roster (stage, readiness bar, reflections · mentor, flag), the
  stage-distribution funnel, and an **inline rep detail** (plan, acclimation
  deliverables checklist, next milestone) — restyled to the agent's light/dark
  tokens. Deep-link via `#manager` or the `i3_agent_view` localStorage flag;
  the rep dashboard's admin bar gained a **▦ Manager Dashboard** button.
- **Sales Process (`process.html`):** the ▦ Manager button now opens the
  Sales Agent's Admin → Manager Dashboard (was the engine's manager view).
- **`DEMO.md`:** walkthrough §4 updated (manager view now Sales Agent · Admin
  menu); the stale "Manager Dashboard card disappears" partner line now points
  at the Architecture card; "V · Vision Sales Engine card" → "Meet Vision card".
- Verified headless across all three pages: portal shows Meet Vision, engine
  has no manager button/view, `#manager` deep-link opens the dashboard (roster,
  KPIs, rep detail, onboard tab all render) — no JS errors.

### Changed — real-SOP popup: full detail + the **images extracted from the PDF**
- Extracted the three content images from `v2/SOP/NTE_Ai_Configuration_SOP_240619v2.pdf`
  into **`v2/media/`** (`sop-nte-max-detection-area.jpg` — the exterior camera
  view with the magenta Max detection area drawn larger than the red Area
  alarm; `sop-nte-alarm-settings.png` — Object count ≥ 1 / Duration ≥ 1 /
  "Person, Head — 2 selected"; `sop-nte-object-detection.png` — the Head +
  Person picker) and documented them in `media/README.md`. Letterhead-logo
  duplicates were discarded.
- The popup now carries the images as captioned figures in Procedure 1, and the
  **Customer Success section itself shows the camera-view figure** (click →
  opens the full SOP popup). Images resolve via a new `mediaURL()` helper —
  relative when self-hosted, rewritten to raw-GitHub under htmlpreview.
- Deepened the popup to the full document: responsibilities split by role with
  the real **due dates** (June 20 / June 28, 2024), the **joint commitments**
  (Site 658 Burleson physical audit — detection accuracy, CMS connectivity,
  Global monitoring-station alerts; 4–5 more sites by EOD June 19, 2024), the
  software sources (i3international.com/download, packages pre-staged on D: of
  the 121 GPU-enabled NTE servers), the full 7-rule camera-configuration list,
  the complete **contacts table** (i3 + Global Axiom account leads and
  executive sponsors with phone/email) and the joint **approval block**.
  Verified headless: all 4 images load, popup renders the added detail, no JS
  errors.

### Added — the **real SOP** from `v2/SOP/` as a section + popup in Customer Success Phase 2 (`vision-sales-agent.html`)
- The Customer Success **Phase 2** output now carries a **"The real SOP — example
  from the SOP folder"** section pointing at the actual document
  (`v2/SOP/NTE_Ai_Configuration_SOP_240619v2.pdf`), with two buttons:
  **"View the real SOP (popup)"** and **"Open the original PDF"** (existing
  htmlpreview-aware `openSOP()`).
- The popup is a new theme-aware modal that recreates the real 4-page NTE SOP —
  *Configuring i3Ai Setup for optimal accuracy* — faithfully from the PDF:
  objective, scope, limitations, the i3 / Global Axiom responsibilities table,
  the 5-part procedure (infrastructure & camera configuration requirements,
  verification, ongoing monitoring & maintenance, documentation & reporting,
  continuous improvement), troubleshooting, and the "who owns it" contacts +
  approval block. Framed as the worked example of the standardized format
  Phase 2 runs on (verify → monitor weekly → audit monthly → improve).
  Closes on ✕, backdrop click or Esc; body scroll locks while open. Verified
  headless: stage output renders, popup opens/closes, no JS errors.

### Changed — recreated `v2/sop.html` around the **two-phase** model (Phase 2 built out)
- Restructured the entire SOP page into the two phases, split at the customer's
  signature: **Phase 1 · Sell & close (SOP 100–900)** — everything up to
  **closing**, when we sign off with the customer — and **Phase 2 · Prove the
  promise (SOP 1000–1300)** — we follow up with the customer to prove the
  solution we provided is helping them **as the contract promised**.
- New **"The two phases"** section (flow diagram + a "Customer Success spans the
  seam" note: Phase 1 = closing/sign-off, Phase 2 = follow-up proof). The SOP
  catalog is now split into a Phase 1 section and a **Phase 2 section
  (`#phase2`)** where each SOP (1000 Customer Success & Contract-Promise
  Validation, 1100 Organizational Learning, 1200 Performance Management,
  1300 AI Governance) is **fully authored to the standard template** (trigger,
  inputs, AI/human responsibilities, workflow, outputs, KPIs, exceptions,
  integrations) instead of a one-line objective.
- Added a second **worked example — SOP 1000** (trigger = the signature; extract
  contract promises → 30/60/90 check-ins → promise-vs-actual scorecard →
  proof-of-value review → references/expansion → renewal) and a **Customer
  Success Agent (Phase 2)** spec next to the Market Intelligence Agent spec.
  The 7-stage sales cycle notes stages 1–6 = Phase 1, stage 7 = Phase 2. Deep
  link into Phase 2 via `#phase2` (or an `i3_sop_goto` localStorage flag under
  htmlpreview, which drops fragments). Verified headless in both themes — all
  sections render, no JS errors.

### Changed — Customer Success stage now runs the two phases (`vision-sales-agent.html`)
- Split the Customer Success output into **Phase 1 · Closing — sign off with
  the customer** (the timed POC close; sign-off = contract signed, Phase 1
  complete) and **Phase 2 · Follow-up — prove the contract promise (runs on the
  SOP)**: extract the contract promises into measurable criteria, 30/60/90
  check-ins with the promise-vs-actual scorecard, the proof-of-value report,
  and early remediation when a promise is off-track. Added an **"Open the SOP —
  Phase 2"** button (`openSOPPhase2()`, htmlpreview-aware, sets the
  `i3_sop_goto` flag) linking to `sop.html#phase2`. Stage sub-label, intro and
  thinking lines updated to the two-phase framing; references are "earned by
  the proof, not the pitch".

### Added — AI Configuration SOP as POC **Phase 2** (`vision-sales-agent.html`)
- Added the **NTE AI Configuration SOP** PDF to a new **`v2/SOP/`** folder and
  surfaced it in the Sales Agent's **POC** stage as a **"Phase 2 · Rollout — AI
  Configuration SOP"** section: Phase 1 is the 45-day pilot; once success is
  proven and the client rolls the solution out, deployment follows the
  standardized SOP so every site is configured the same way. An **"Open the AI
  Configuration SOP (PDF)"** button links the doc (relative when self-hosted;
  rewrites to the raw-GitHub URL under htmlpreview via `openSOP()`). Verified in
  light + dark, no JS errors.

### Changed — `v2/agents/POC_AGENT.md`: placeholders + highlight what to confirm
- V-Prove now **never guesses**: any value it can't verify from the transcript or
  catalog goes in as a **`[TO CONFIRM: …]` placeholder**, highlighted inline and
  collected into a **⚠ Needs confirmation** checklist at the top of the draft so the
  PM sees exactly what to verify in the ~20-minute review. Updated the intro note,
  the POC contents (§4 item 0), system prompt (§5), `generate_poc` tool description
  (§6), outputs (§8), guardrails (§9), and the example run (§11).

---

## 2026-07-06

### Added — `v2/agents/POC_AGENT.md` (V-Prove)
- Build spec for the **POC agent**: transcript → POC (Gardewine template),
  solution mapped to the three modules, stakeholder capture, recommended
  equipment, standard reusable drawings + site maps, upsell, privacy/cyber
  handoff to Magenta, and PM assignment by territory (Quebec→Nissan, Ontario→
  Louel, West/other→Des) with the 45-day plan. System prompt, tools, KB,
  outputs, guardrails (AI drafts / PM confirms ~20 min; privacy sign-off gate).

### Added — `v2/agents/` folder + Market Research agent spec
- Created a **`v2/agents/`** folder and moved **MAGENTA_AGENT.md** into it.
- Added **MARKET_RESEARCH_AGENT.md** — build spec for the Market Research agent
  (`V-Research`): segment / account / competitor research tied to i3's three
  modules, data sources (6sense, ZoomInfo, Sales Navigator, Google Alerts,
  HubSpot), system prompt, tools, outputs, guardrails, and build steps. Feeds
  V-Target (Prospecting) and V-Present (Presentation).

### Changed — dropped "i3Host / quoting" framing from Magenta (for now)
- Reworded the Magenta trigger away from **i3Host quoting** to a generic "the
  moment a privacy-sensitive solution is on the deal" — on the Magenta page, its
  portal card (tag "Triggered in quoting" → "Privacy + cyber"), and
  `MAGENTA_AGENT.md`. Left the broader project's i3Host mentions (Sales Agent
  card, Architecture, footers) untouched.

### Removed — the Vision chat widget
- Removed the floating chat widget from every page (deleted the `client.js` +
  `chat-widget.js` includes) and deleted `v2/chat-widget.js`. No chat launcher
  loads anywhere now.

### Changed — segment "Hospital" → "Institution"
- Renamed the Hospital segment to **Institution**. Segments: C-Store / QSR ·
  Grocery · Commercial · Education · Institution · Integrator.

### Changed — segment "C-Store" → "C-Store / QSR"; removed separate QSR
- Merged Quick Service Restaurants into the C-Store chip (now **C-Store / QSR**)
  and removed the standalone QSR segment. Segments: C-Store / QSR · Grocery ·
  Commercial · Education · Hospital · Integrator.

### Changed — Channel Partners don't see the Architecture card
- The portal **Channel Partner** role now hides the **Architecture (for
  engineers)** card (added `partner-can-hide`; `setRole` toggles all such cards).
  Visible again for the i3 Sales Rep role.

### Changed — Sales Process shares the Engine menu bar + links to ROS
- Added the same **Engine / Manager / Process** switcher to `process.html`'s
  topbar (Process shown active): Engine → the sales engine, Manager → the engine
  Manager view (`#manager` + localStorage flag), Process = current page. Made the
  **"Beginning → end"** pill navigate to the **ROS** page. All htmlpreview-aware.

### Changed — Sales Process reachable from the Sales Engine
- Removed the separate **Sales Process** portal card and added an **↗ Process**
  button to the Engine's view switcher (next to Engine / Manager) that opens
  `process.html`. Noted it on the Sales Engine card. `process.html` is unchanged.

### Changed — Manager Dashboard folded into the Sales Engine card
- Removed the separate **Manager Dashboard** portal card — the dashboard already
  lives inside the Sales Engine (Engine ⇄ Manager toggle / `#manager`). Noted it
  on the Sales Engine card (copy + a "Manager dashboard" tag) and null-guarded
  the portal role toggle that referenced the removed card.

### Changed — Presentation: enter a customer name → search info + pain points + solution
- Added a **Customer name** input to the Presentation stage. On run, the agent
  "searches" the customer and surfaces **Customer — what I found**, **Their pain
  points**, and **What we can present — mapped to i3's three modules** (pain →
  recommended solution), then builds the deck tailored to that customer. The
  entered name flows through the whole output. Verified with a custom name; POC
  handoff still works; no JS errors.

### Changed — Presentation stage per Vy (`vision-sales-agent.html`)
- Reframed around the AI-built deck: from a **ready lead** (address already
  known), Vision builds a **logo-branded, site-typed deck** (retail / commercial
  / institutional), leads with the **solution not the hardware**, and briefs the
  rep with **Google-Alert research mapped to i3's three modules** — Safety &
  Security (incident/fine → incident reduction), Operations (CEO wants customer
  engagement → video analytics), Asset Protection (POS in use → AI smart-POS
  exception). Then the transcript is captured; **"interested in all three" →
  build the POC**. Added a ~20% time-saved note. Verified all sections render,
  logo + POC handoff work, no JS errors.

### Changed — Prospecting & Leads per Vy (`vision-sales-agent.html`)
- Reframed as the **marketing agent** pulling leads from **6sense** + our data:
  returns a **5-lead recommended shortlist** (intent score, signal, what I
  recommend); each lead has a **"Ready to present →"** button that hands off to
  the Presentation stage. Added the **lead-source ranking** (hardest→easiest:
  SEO/cold · references · integrators/partners · trade shows; goal: systematic &
  constant, HubSpot drip + Sales Navigator) and a **6sense data/cost ops note**
  (credits per query, ~$10–20K/mo uncontrolled; start with a monthly/bi-monthly
  manual export on the existing 6-month filter; later a concierge service for
  integrators). Kept a condensed LinkedIn-presence section.

### Changed — merged Magenta into the Privacy & Cybersecurity Agent (removed login)
- Consolidated the two privacy pages into **one**. Deleted
  `magenta-portal-simulation.html` (its login/quote-builder sim is retired), and
  rebranded `i3-privacy-compliance-agent.html` as **Magenta — Privacy &
  Cybersecurity Agent**: the header now carries the "rides inside i3Host quoting,
  no separate login" framing, over the existing conversational review (laws,
  risk, signage, PIA, cyber). Replaced the two portal cards with a single
  **Magenta · Privacy & Cybersecurity Agent** card, and repointed the sales-
  engine V-Guard link and the demo doc to the merged page.

### Added — "← Portal" button on every page
- Added an explicit **← Portal** button to the top bar of every sub-page (the
  logo already linked back, but a button is clearer). Injected via a small
  self-contained script that places it in the topbar's right cluster (or, on
  the privacy page's different header, top-right by the theme toggle) and calls
  `goPortal()`. The portal (`index.html`) has no `goPortal`, so it self-skips.

### Changed — POC + Privacy/Cyber staging per Vy (`vision-sales-agent.html`)
- **POC** ("transcript produces the POC") now shows the core solution **mapped
  to the i3 three modules** (Safety & Security · Operations · Asset Protection),
  a **Built into the POC** section (privacy + cybersecurity docs, 3–4 reusable
  standard drawings — HD cameras/networking/firewall/ports, reusable site
  maps/images, and upsell suggestions), and a **PM time saved** note (~30–40%;
  confirm in ~20 min vs writing from scratch).
- **Privacy & Cybersecurity** re-staged per Vy: **Step 1 · Cybersecurity —
  every deal** (universal; standard drawings/intake) then **Step 2 · Privacy —
  only where a privacy statement applies** (variable), with the staging
  rationale and a decision note (cyber required on every deal; privacy sign-off
  where it applies). Service names used verbatim.

### Changed — make "← Back to dashboard" a visible button (`vision-sales-agent.html`)
- The back control was a plain borderless text link and easy to miss. Restyled
  it as a brand-tinted pill button (border, padding, subtle shadow, arrow) with
  a fill-on-hover state. Visible in both light and dark.

### Changed — Customer Success reflects Vy's framing (`vision-sales-agent.html`)
- Reworked the Customer Success stage per Vy: closing IS a **tight timeline on
  the POC** (the proof of concept is the close, driving a Go/No-Go within a set
  deadline), then bundles **follow-up & follow-through**, **training** (Lean;
  Grade = video-based), **professional services**, and **upsell suggestions**
  (Concierge, Smart ER Analyst, One Connect, TrueView), plus references/
  referrals. Added a POC-decision-deadline input. Service/tool names are used
  verbatim from the transcript — no invented definitions (pending i3 docs).

### Changed — "Closing" → "Customer Success" (`vision-sales-agent.html`)
- Converted the final stage from **Closing** to **Customer Success** (⭐,
  "Adoption · references · referrals"). Replaced the competitor battlecard /
  DocuSign close flow with a customer-success flow: account-health input, a
  success plan (handoff, adoption, outcome vs POC metric) and references /
  referrals fed into the learning loop — consistent with the ROS Customer
  Success stage. Verified it runs with no JS errors.

### Changed — Onboarding is the first stage (`vision-sales-agent.html`)
- Moved **My Onboarding** to the front of the stage list and renumbered so it
  is step 1 (Onboarding → Prospecting → Presentation → POC → Privacy & Cyber →
  Closing).

### Fixed — keep the "i3" brand token lowercase in UPPERCASE labels
- In uppercase-transformed text (hero eyebrows, section labels, etc.) the brand
  token "i3" was rendering as "I3". Added a small self-contained script on every
  page that wraps the `i3` token (incl. `i3Host` / `i3Live`) inside uppercase
  elements in a `.i3lc` span (`text-transform:none`), so it always displays as
  **i3** while the surrounding text stays uppercase. Injects its own CSS; runs
  on load; future-proof for new content. Verified across pages — no JS errors.

### Changed — hide the SOP card from the portal
- Commented out the **SOP** card in `index.html` so it no longer appears on the
  portal. `sop.html` is untouched and still reachable directly; restore the card
  to show it again.

### Changed — Education scope note (`v-vision-sales-engine.html`)
- Added a sub-label under the **Education** segment chip: **"Kindergarten–Grade
  12 (K–12) only"**, to make the scope explicit. Segment chips now render an
  optional `note`.

### Changed — sales-engine segments (`v-vision-sales-engine.html`)
- Broke **Retail** into **C-Store**, **Grocery**, and **Quick Service
  Restaurants**; renamed **School → Education** and added **Hospital**
  (Commercial and Integrator kept). Segment list is now C-Store · Grocery · QSR ·
  Commercial · Education · Hospital · Integrator.
- Updated the default/New Hire segment to C-Store, the roster reps (Paul Kerling
  → C-Store, Tony Thomas → Education), and made the rep→segment resolver look up
  by display name so labels like "C-Store" map to the right id. Verified all 7
  chips render/select and running a rep resolves a valid segment — no JS errors.

### Removed — `v2/chat.html` (Chat with Me page)
- Deleted the standalone **Chat with Me** page and its portal card. The floating
  **Vision chat widget** (`chat-widget.js`) still loads on every remaining page,
  so live chat is unchanged — only the dedicated landing page was removed.

### Changed — `portal.html` → **`index.html`** (portal is now the site root)
- Renamed the portal to `index.html` so the site root (`/`) serves it. Repointed
  every "back to portal" reference — `goPortal()` on all pages now navigates to
  `index.html`. No `portal.html` references remain.

### Changed — renamed "The Deal Journey" → **ROS** (Revenue Operating System)
- Renamed `journey.html` → `ros.html` and rebranded the page: topbar now reads
  **Vision · ROS / Revenue Operating System**, the eyebrow is **i3 ROS ·
  Revenue Operating System**, and the title/heading use **ROS**. Content
  (8-stage animation, three lanes, per-stage artifacts) is unchanged. Updated
  the portal card to **ROS** and pointed it at `ros.html`.

### Changed — replaced the vendor widget with our own `v2/chat-widget.js`
- Built a **custom Vision chat widget** on the ClaudeChat **client SDK**
  (`client.js`) instead of the vendor's pre-built floating widget. New
  self-contained `v2/chat-widget.js`: injects a brand-styled floating launcher
  and a chat panel, **streams replies** (`chat.send` → `onText`/`onDone`/
  `onError`), with quick-start prompt chips, **Stop** (aborts the stream via the
  send handle), **New conversation** (`chat.reset()`), and optional admin
  branding (`chat.getBranding()`). Theme-aware (follows `<html data-theme>`),
  Esc-to-close, mobile full-screen. Exposes `window.i3Chat = { open, close,
  toggle, send, reset }` and fires an `i3chat:ready` event.
- Swapped the include on **every page** from the vendor `loader.js` to
  `client.js` + `chat-widget.js` (self-guards against double init). The **Chat
  with Me** page now drives the widget directly — the CTA opens it, the prompt
  chips send a question, and it **auto-opens** on that page.
- Degrades gracefully: if the SDK can't load (e.g. served from a
  non-allow-listed origin) the launcher still renders and the panel shows a
  clear "can't reach the chat service" message instead of erroring. Verified in
  both themes with a streaming mock: launcher → open → send → streamed reply,
  Stop/New chat, auto-open, and prompt-chip send — no JS errors.

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
