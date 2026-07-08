# Demo Walkthrough — i3 Vision

Scripts to present the prototype internally (leadership, sales, partners).
Self-contained simulations — no login, no install. Present from the
**always-latest** branch links so you never show a stale build.

---

# ⭐ Vision Sales Agent — 5-minute scripted demo

The headline demo. One file: `v2/vision-sales-agent.html`
Preview: `https://htmlpreview.github.io/?https://github.com/hienbui631993/i3-ai-sales-assistance/blob/claude/v2/v2/vision-sales-agent.html`

> Each **▸** is a click; each **“…”** is your line. Total ~5 min.

### 0 · Open with the pitch (15 sec)
“This is Vision — the sales agent that lives inside i3Host. It tells the rep what to
do at every stage, from onboarding to close.”

### 1 · The admin sets a rep up (45 sec)
▸ Top-right role **Admin** → ▸ **Build workflow & start with Vision**.
“An i3 admin onboards a salesperson — segment, territory, responsibility, and
their number for the year. Vision builds the workflow and **starts the engine for
them automatically.** Notice it’s **saved to Salesforce and proprietary to i3** —
if the rep leaves, the company keeps everything.”
▸ **Start → open their dashboard.**

### 2 · The rep’s morning (45 sec)
“This is the first thing the rep sees every day.” *(point to widgets)*
“What to do today, their monthly goal, commitment, pipeline, orders — fed from
Salesforce and Automatica.”
▸ Click the **Today** widget → “It drills straight into the pipeline.”
▸ On the to-do list, click **Leads →** to jump into the work.

### 3 · Smarter targeting + the ‘get-relevant’ coach (75 sec)
On **Prospecting** ▸ **Assess me & find the buying group**.
“Two things. One — Vision read my **LinkedIn**: it scores how relevant I am to my
segment and tells me how to fix it, and **books me a session with Marketing** plus
the **associations** to join. Two — it doesn’t chase one contact. From 6sense and
ZoomInfo it lays out the **whole buying group** — who decides, their **intent**, and
exactly **what to do tomorrow.**”

### 4 · Presentation → POC, nothing forgotten (90 sec)
▸ Back to dashboard → **Presentation** → ▸ **Use sample transcript**.
“The rep just drops the meeting transcript in. Vision pulls the drivers and
**captures everyone who was in the room.**”
▸ **Build POC from this →** (or open **Proof of Concept** → **Generate POC from transcript**).
“It builds the POC in our Gardewine format. It **pushes the rep to add everyone on
the email — title and position — and flags who’s a supporter.** It recommends the
**solution and the equipment** to quote. And it won’t let key info get forgotten.”
▸ **Contact PM & create the official POC →**
“One click hands it to the **PM agent**, which keeps the PM on the **timeline** and
the **cybersecurity forms** — all interconnected.”

### 5 · Close the loop (20 sec)
“Lead to close, one agent, inside i3Host — for our reps, our integrators, and the
agents we choose to give partners. Everything the rep enters stays with i3.”

**If asked “is this real?”** → “Working prototype. The flow, logic and i3 content
are real; the system connections are simulated to show the experience. It’s the
spec for the build — see `ARCHITECTURE.md` and `BUILD_PLAN.md`.”

**Reset:** reload the tab.

---

# Full Portal Walkthrough (V + V-Guard) — ~8–10 min

A click-by-click script for the whole portal (engine, V-Guard, manager view).

## Open these tabs first
1. **Portal** — `v2/index.html`
2. **V engine** — `v2/v-vision-sales-engine.html`
3. **V-Guard · Privacy & Cybersecurity Agent** — `v2/i3-privacy-compliance-agent.html`
   (merged; the old `magenta-portal-simulation.html` login/quote sim was retired)

(Branch preview: `https://htmlpreview.github.io/?https://github.com/hienbui631993/i3-ai-sales-assistance/blob/claude/v2/v2/portal.html`)

---

## 1 · The pitch (30 sec) — Portal
Open **portal.html**.

> "This is the i3 Vision portal — one place for our reps *and* our partners. The
> agentic engine guides the deal, the privacy co-pilot keeps it compliant, and
> managers see the truth. Today it's North America, v1."

- Click the **Channel Partner** toggle → point out the **Architecture card
  disappears**. "Partners get the tools, not our internal engineering detail."
- Toggle back to **i3 Sales Rep**.

## 2 · The engine thinks (2 min) — V
Click the **Meet Vision** card.

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
- When it reaches **V-Guard**, point to the **Open V-Guard portal →** link on its
  card. "Legal/privacy isn't a side tool — it's an agent in the line. That's the
  privacy review, and it opens the V-Guard portal."

## 3 · Privacy in the quote (2 min) — V-Guard
Click **Open V-Guard portal →** (or the V-Guard tab).

- **Sign in** (rep or partner).
- In the quote builder, **Add** *i3 AI Loyalty (facial)* and *Audio Monitoring*.
  > "The moment a privacy-sensitive solution lands on the quote, V-Guard triggers —
  > this is the gate in our POC due diligence."
- Click **Open V-Guard review** → watch the **function-call trace** pull from
  Salesforce, i3Host, Automatica and the GoToMeeting transcript.
- Answer the 4 questions → show the **decision + signage + PIA**, then **Apply to
  quote**.
  > "Privacy step just went from ~3–5 days to ~8 minutes — and it's written back to
  > Salesforce so the deal keeps moving."

## 4 · The manager sees the truth (2 min) — Sales Agent · Admin menu
Open the **Vision Sales Agent** tab → top-right role **Admin** → **▦ Manager
Dashboard** tab. (The Sales Process page's ▦ Manager button lands here too.)

> "Every rep Vision is guiding — readiness, weekly reflections, mentor progress,
> and where they sit in the pipeline. Reps in trouble are flagged."

- Point to the flagged reps (low readiness or behind on reflections).
- Click a row (e.g. **Andrew Ioannou**) → the **rep detail** opens inline —
  their plan, acclimation-deliverables checklist, and next milestone.

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
> Automatica, i3Host, 6sense and GoToMeeting for real. See `BUILD_PLAN.md`."

---

## If someone asks "is this real?"
Be straight: **it's a working prototype / simulation.** The flows, the logic, the
documents and the i3 branding are real; the system connections (6sense, Salesforce,
transcripts) are simulated to show the experience. It *is* the spec for the
production build — see `v2/BUILD_PLAN.md`.

## Reset between runs
- V engine: **Reset** button (or reload).
- V-Guard: **Restart** isn't needed — reload the tab.
