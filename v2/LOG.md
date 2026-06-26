# Change Log — i3 Privacy Compliance Agent (v2)

Tracks changes to the `v2/` privacy compliance agent and related work on the
`claude/v2` branch. Newest first. Dates are YYYY-MM-DD.

---

## 2026-06-26

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
- Active branch: **`claude/v2`**.
- `claude/v2` and `claude/bill-25-compliance-agent-uvidrh` share the same agent
  files; `claude/v2` additionally contains the merge with `main`.

## How to update this log
Add a dated entry at the top under the current date, grouped as
**Added / Changed / Fixed / Removed**. Keep entries short and tied to the
file or behaviour that changed.
