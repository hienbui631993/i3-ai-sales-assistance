# Demo Walkthrough — i3 Vision Portal (V + Magenta)

A click-by-click script to present the prototype internally (leadership, sales,
partners). ~8–10 minutes. Everything is a self-contained simulation — no login,
no install. Open the links in a browser.

> Tip: present from the **always-latest** branch links so you never show a stale build.

## Open these tabs first
1. **Portal** — `v2/portal.html`
2. **V engine** — `v2/v-vision-sales-engine.html`
3. **Magenta** — `v2/magenta-portal-simulation.html`
4. **Privacy agent** — `v2/i3-privacy-compliance-agent.html`

(Branch preview: `https://htmlpreview.github.io/?https://github.com/hienbui631993/i3-ai-sales-assistance/blob/claude/v2/v2/portal.html`)

---

## 1 · The pitch (30 sec) — Portal
Open **portal.html**.

> "This is the i3 Vision portal — one place for our reps *and* our partners. The
> agentic engine guides the deal, the privacy co-pilot keeps it compliant, and
> managers see the truth. Today it's North America, v1."

- Click the **Channel Partner** toggle → point out the **Manager Dashboard card
  disappears**. "Partners get the tools, not our internal team data."
- Toggle back to **i3 Sales Rep**.

## 2 · The engine thinks (2 min) — V
Click the **V · Vision Sales Engine** card.

> "V is nine specialized agents — one per area of our motion, from onboarding to
> close. Watch it think."

- In **Onboarding intake**, click **Load: Elie P. — BDM, MEA**.
  > "V-Start just parsed a real onboarding document into a profile, the mentor
  > team, the acclimation plan and the weekly reflection cadence. It even set the
  > segment to Commercial from the doc."
- Press **▶ Run the engine**.
  > "Each agent lights up and streams its reasoning. V-Start builds the plan,
  > V-Target pulls 6sense intent, V-Reach activates marketing and the VAR network,
  > V-Coach runs NSM training, V-Guide *verifies* the work actually happened…"
- When it reaches **V-Guard**, point to the **Open Magenta portal →** link on its
  card. "Legal/privacy isn't a side tool — it's an agent in the line. That's the
  privacy review, and it opens the Magenta portal."

## 3 · Privacy in the quote (2 min) — Magenta
Click **Open Magenta portal →** (or the Magenta tab).

- **Sign in** (rep or partner).
- In the quote builder, **Add** *i3 AI Loyalty (facial)* and *Audio Monitoring*.
  > "The moment a privacy-sensitive solution lands on the quote, Magenta triggers —
  > this is the gate in our POC due diligence."
- Click **Open Magenta review** → watch the **function-call trace** pull from
  Salesforce, iHost, Automatica and the GoToMeeting transcript.
- Answer the 4 questions → show the **decision + signage + PIA**, then **Apply to
  quote**.
  > "Privacy step just went from ~3–5 days to ~8 minutes — and it's written back to
  > Salesforce so the deal keeps moving."

## 4 · The manager sees the truth (2 min) — V Manager view
Back in the **V** tab, click **▦ Manager** (top bar).

> "Every rep V is guiding — readiness, weekly reflections, mentor progress, and
> where they sit in the pipeline. Reps in trouble are flagged."

- Point to the **3 flagged** reps (low readiness or behind on reflections).
- Click a row (e.g. **Devon Klein**) → the **rep detail** opens.
  > "Their plan, deliverables checklist, next milestone. And I can drop straight
  > into the engine for this rep."
- Click **▶ View this rep in V engine** → it returns to the engine pre-set to
  that rep's stage/segment.

## 5 · The deep-dive (1 min) — Privacy agent
Open the **Privacy Compliance Agent** tab.

> "When a rep needs the full legal deep-dive — the Four-Part Necessity &
> Proportionality Test from Bill 25 — this conversational agent walks them through
> it and generates the customer-ready signage and PIA."

- Answer 2–3 questions to show the live brief building on the right.

## 6 · Close (30 sec)
> "Same nine-agent system, one portal. It captures what our best people do,
> applies it consistently, proves the work, and shortens the cycle. This is a
> working prototype — the next step is wiring these agents to Salesforce,
> Automatica, iHost, 6sense and GoToMeeting for real. See `BUILD_PLAN.md`."

---

## If someone asks "is this real?"
Be straight: **it's a working prototype / simulation.** The flows, the logic, the
documents and the i3 branding are real; the system connections (6sense, Salesforce,
transcripts) are simulated to show the experience. It *is* the spec for the
production build — see `v2/BUILD_PLAN.md`.

## Reset between runs
- V engine: **Reset** button (or reload).
- Magenta: **Restart** isn't needed — reload the tab.
