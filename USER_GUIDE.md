# VISION — User Guide

For **end users**: salespeople, managers, and leadership. This explains how to actually
use the VISION agents on screen. No technical background needed.

---

## Opening the agents

The agents are **single HTML files**. To use one:

1. Download the file (e.g. `vision-agentic-engine.html`).
2. Double-click it, or open it in any browser (Chrome, Edge, Safari, Firefox). It works on
   a **laptop or a phone**.
3. Nothing installs and nothing is sent anywhere — it runs locally in your browser.

Two apps:
- **`vision-agentic-engine.html`** — the full sales engine (all 10 agents).
- **`vguard-legal-agent.html`** — the standalone privacy/legal expert for POCs.

---

## VISION engine — screen by screen

Use the **Navigation** bar at the top to switch screens. The panel on the top right is
**V's voice** — when V "thinks," it shows an animated message, then the recommendation.

### Dashboard
Your home base.
- **Entry-point selector** — choose where you are: *New hire*, *Existing rep*,
  *Advanced rep (POC)*, or *Partner / Integrator*. V routes you to the right starting screen.
- **Metric tiles** — goal, commitments, pipeline, orders, ramp model, activity integrity.
  Tap a tile to jump to that area or hear V's guidance.
- **The V agent stack** — a tap-list of all ten agents; click any to open it.

### Architecture
The **infographic**. The glowing **V** core in the center routes to the ten agents around
it, with animated lines showing data flowing back (the closed loop). **Click any node** to
jump into that agent.

### Onboarding (V-Start · V-Coach)
- Fill in the rep's profile (role, region, segment, experience, manager).
- Set mentors met and confidence; V calculates **readiness** and your **ramp model**.
- On the right, the **i3 training path** — click a module to mark it complete.

### Prospecting (V-Target · V-Reach)
- Set segment and outreach style; paste **intent signals** from 6sense / SixthSense.
- V scores **intent** (Hot / Warm / Cold) and lists the **buying group** with the right
  story for each role.
- Tap **Draft outreach** to have V prepare emails/LinkedIn/call openings, then
  **Send to action queue**.

### Verification (V-Verify)
- See **verified vs claimed** activity across email, calls, meetings, and LinkedIn.
- The **activity-integrity** score shows how aligned your logged activity is with reality.
  Keep it high — it feeds your performance score and the forecast.

### Presentation (V-Present)
- Set the audience, the **manager** joining, the meeting goal, and likely objections.
- Paste your **transcript / notes**. Tap **Analyze transcript**, then **Generate draft POC**.

### POC (V-Prove)
- Pre-loaded with the **Gardewine** model — edit the account, site, duration, objective,
  and success metrics for your deal.
- **Select the i3 AI tools in scope.** ⚠️ A tool marked with ⚠️ (e.g. Facial Recognition)
  turns the **Privacy gate** red and a **Run V-Guard review** button appears.
- Use **Simulate PM handoff** and **Push to Salesforce** to see the downstream steps.

### Legal & Privacy (V-Guard)
- A quick summary gate. Set jurisdiction, biometrics, profiling, and signage to see the
  applicable law and risk.
- For the **full guided review** (questions, signage wording, documents, PDF export), open
  the standalone **`vguard-legal-agent.html`**.

### Closing (V-Close)
- Set the commercial goal, price position vs the incumbent, and the next commitment.
- Tap **Generate close pack** for the executive review summary.

### Leadership (V-Score)
- For managers: rep **segmentation** (top / mid / developing), the **KPI funnel**, and the
  **expert-intervention triggers**. Tap **Run leadership forecast**.

---

## V-Guard legal agent — how to use it

This is a **guided conversation**. V-Guard asks one question at a time on the left; the
**compliance brief** builds live on the right.

1. **Select the i3 applications** the POC will use. Anything in the *Concern* group triggers
   a deeper review.
2. Answer each question — system integration, jurisdiction, purpose, evidence of a real
   problem, less-intrusive alternatives, who's monitored, privacy zones, signage, data
   residency, PIA status, privacy officer.
3. Watch the **brief** fill in: risk level, decision, applicable laws, the **four-part test**,
   the **signage wording** to post, the **documents** to generate, sales positioning, and
   who owns each step.
4. Tap **Export brief (print / PDF)** to save it and attach it to the POC.
5. Tap **Download PIA workbook (CSV)** to get an Excel-ready Privacy Impact Assessment —
   deal context, risk, the four-part test, signage, documentation, and ownership, each with
   a blank *Status / Owner / Evidence* column for the assessor to complete.
6. **Start over** resets for the next deal.

> **Note:** V-Guard is decision-support, **not legal advice** (a banner says so in the app).
> Always confirm requirements with counsel and the i3 Privacy Officer before relying on them.

**Tip for a demo:** pick *Facial Recognition*, answer *"Yes — integrating multiple systems,"*
and choose *Quebec* — you'll watch it escalate to **High** with the CAI declaration, express
consent, and PIA all flagged.

---

## Frequently asked

**Do I need internet?** No — the files run locally. (The future hosted version will need it.)

**Is my data saved?** Not in this prototype; refreshing the page resets it. The production
version writes to Salesforce and i3 records (see TECHNICAL.md).

**What's the difference between the two files?** The engine covers the whole sales process;
the V-Guard file is the deep-dive legal expert for the privacy step.

**Who do I escalate a high-risk privacy deal to?** The i3 Privacy Team — Grace Hoang and team
(shown in the V-Guard brief on High-risk deals).
