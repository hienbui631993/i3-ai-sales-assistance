# Vision — Architecture & Build Write-up

Engineering companion to the visual diagram (`v2/vision-architecture.html`) and
the working model (`v2/vision-sales-agent.html`). Read with `BUILD_PLAN.md` for the
agent-to-tool detail.

**What Vision is:** an agentic sales assistant that helps i3 reps (and integrators
and partners) get more leads, close faster, and grow revenue in their core segment.
It lives **inside iHost** — it is **not public**.

---

## 1. Access model (who uses it, how)

| Tier | How they reach it | Scope |
|---|---|---|
| **i3 Sales Reps** | Inside iHost (SSO) | All stages / agents |
| **Integrators** | Linked into iHost | All agents, on their own deals |
| **Channel Partners** | Inside iHost, partner-scoped | A **subset** of agents by tier — e.g. Presentation and Legal & Privacy |
| **Partner self-host** | Their own deployment | Same Vision code, partner-scoped config + their own keys |

- **Authentication:** iHost SSO. The user's **role/tier** is the single source of
  truth for which agents are visible. The working model demonstrates this — switch
  the role to *Partner* and only the Presentation and Legal agents are unlocked.
- **Partner self-host:** ship Vision as a deployable package (container + config).
  Partners supply their own LLM key and connect their own CRM; i3 provides the
  setup guide and the knowledge base they're licensed to use. Same codebase, no
  fork — behaviour is driven by config, not branches.

## 2. Layers (top to bottom)

1. **Access tiers** → 2. **iHost (host app + identity)** → 3. **Vision
   orchestrator + LLM** → 4. **Agents (one per stage)** → 5. **Tool/integration
   layer** → 6. **Knowledge base (retrieval).** Cross-cutting: data residency,
   verification-first, human checkpoints.

The orchestrator is the brain: it detects the **sales stage**, selects the agent,
enforces stage rules (what's required to advance), and decides what runs next.
**Rules control progression; the LLM controls quality.**

## 3. The chronological agent flow

Vision is **stage-first** — the first question is *"What stage of sales are you
in?"* A rep can start at **any** stage and in **any** segment.

```
Onboard → Prospect → Train → Outreach(verified) → Present → POC → Legal/Privacy → Close → Salesforce sync
```

| Stage | Agent does | Key input | Key tools |
|---|---|---|---|
| Onboarding | Parse plan → ramp, mentors, training, reflections | Onboarding doc | iHost, LMS, HR |
| Prospecting | Intent → accounts + buying group + first touch | Segment | 6sense, ZoomInfo, LinkedIn |
| Marketing | Hand-off, social, nurture, VAR network | Target list | Marketing, social, HubSpot |
| Presentation* | Transcript → drivers, deck, manager loop | Notes/transcript | GoToMeeting/Teams |
| POC | Scaffold from Gardewine template, 45-day metrics | Goal + site | iHost, PM tooling |
| Privacy & Cybersecurity* (Magenta) | Law 25/GDPR **+ cybersecurity** (cyber intake forms, Canada-for-Canada residency, access control + MFA, encryption, SOC 2 / vendor review, retention), signage, PIA | (defaults applied) | Q25 KB, Salesforce |
| Closing | Cost-matrix battlecard, price, contract | Competitor | Cost Matrix, Automatica, DocuSign |
| Verification | Prove email/call/meeting; anti-gaming | (background) | Email, calling, calendar |
| Manager/Leadership | Readiness, pipeline, reflections, scoring | (roll-up) | Salesforce, LMS |

\* Available to channel partners.

## 4. LLM / platform

Either **OpenAI** (GPT-4o, function calling / Assistants) or **Claude** works — the
architecture is identical: **system prompt + function tools + retrieval**. Keep the
**tool/function contracts stable and provider-agnostic** so the model can be swapped
without touching integrations. Pilot on one provider.

## 5. Tool layer (function calls to build)
`get_opportunity`/`write_record` (Salesforce), `get_quote` (iHost),
`get_pricing` (Automatica + Cost Matrix), `get_intent` (6sense/ZoomInfo),
`get_transcript` (GoToMeeting/Teams), `verify_activity` (email/call/calendar),
`send_outreach`, `generate_signage`/`create_pia` (Legal), `create_poc` (template).

## 6. Knowledge base (retrieval)
Q25/Law 25 deck, LP & Privacy Guide, FRT state laws, competitor Cost Matrix,
Gardewine POC template, onboarding docs + 30-90 schedule, sales-process doc, segment
playbooks, product/pricing kits, reflection forms. Maintained centrally; partners get
the subset they're licensed for.

## 7. Cross-cutting requirements
- **Data residency:** Canada-for-Canada where required; document cross-border access
  (the Legal agent enforces this). NA first → add GDPR/PIPA regions to go global.
- **Verification-first:** only verified activity advances a stage. Build the
  verification layer before UI polish.
- **Human checkpoints:** AI guides; managers and the Privacy Officer approve
  high-risk steps. Vision is decision-support, **not legal advice**.
- **Not public:** runs inside iHost; partner self-host is partner-scoped.

## 8. Build order (recommended)
1. Stage map + required proof per stage (done — it's the working model).
2. Integrate truth systems: Salesforce, iHost, Automatica, email/calling/calendar,
   GoToMeeting.
3. Build the **verification** layer.
4. Wire the **Legal/Privacy** gate into iHost quoting triggers.
5. Rep stage UI + Manager dashboard on live data.
6. Scoring + leadership intelligence.
7. Package **partner self-host** + write the partner setup guide.

## 9. What to load next (sharpens the agents)
Segment playbooks (Retail/Grocery/QSR/Commercial/School/Integrator), the full
sales-process doc, real reflection-form data, and Automatica pricing/kit rules.

## 10. Detailed behaviours (from the working-model critique)

These are now in the working model and should carry into production:

- **Directive, not interrogative.** The agent applies sensible **defaults** (from
  the rep's territory and the quote) and **tells the rep what to do** — short
  "Do this" action lists — rather than asking lots of questions or offering choices
  to ignore. Defaults mean privacy/cyber steps can't be skipped.
- **Site address → exact legal requirement.** The POC captures the **site address**;
  Vision derives the **jurisdiction and the exact legal doc** from it (Quebec → Law 25
  PIA + bilingual signage; Illinois → BIPA written consent; California → CCPA;
  EU → GDPR DPIA; etc.) and feeds it straight into the Privacy & Cybersecurity review.
- **Privacy & Cybersecurity are one gate.** The privacy agent (Magenta) also drives
  the **cybersecurity** checklist: cyber intake forms, Canada-for-Canada data
  residency, access control + MFA, encryption at rest/in transit, SOC 2 / vendor
  review, minimal retention. High-risk = no POC approval until the i3 Privacy team
  signs off.

- **Admin onboarding (the starting button).** An i3 administrator onboards a
  salesperson — name, **segment, territory, responsibility, annual goal**,
  experience. Vision asks for detail, **builds the workflow**, and **auto-starts**
  the rep's automated processes (lead intel, training, daily plan). Output is saved
  to Salesforce and is **proprietary to i3**.
- **Rep dashboard (first thing the rep sees).** Daily tasks, **monthly goal,
  commitment numbers, pipeline, orders** — fed from Salesforce + Automatica.
  Widgets are **clickable** and drill into Leads / Presentations / POCs, each with a
  **nudge** button into the right stage ("call these leads → turn into a
  presentation").
- **Prospecting = buying group, not one contact.** From the segment, Vision surfaces
  the **decision-makers** (Ops VP, IT, Loss Prevention, Finance) with **6sense
  intent + ZoomInfo** data and a clear **"do this tomorrow"** action list.
- **LinkedIn / social presence agent.** The rep enters their LinkedIn → Vision
  **assesses** profile relevance, cadence and connections, recommends fixes,
  **books a session with Marketing**, and suggests **industry associations** to join
  to get more engaged with the market.
- **Presentation → POC.** Upload (or sample) the **presentation transcript**; Vision
  extracts drivers and **auto-captures the attendees**, then **generates the POC**
  in the Gardewine format.
- **Stakeholder capture.** The POC **prompts the rep to add everyone on the email**
  with **title and position**, tagged **decision / supporter / blocker** — so we know
  who backs the POC before it kicks off. Missing info is prompted, not assumed.
- **Solution + equipment recommendation.** Vision maps the discussion to the right
  i3 solution and **lists the equipment** to quote.
- **PM agent interconnection.** "Contact PM" hands the POC to a **PM agent** that
  keeps the PM on the **timeline**, completes **cybersecurity forms**, and collects
  the right **data** for the 45-day validation.
- **Data ownership.** Everything the rep enters is **saved to Salesforce and is
  proprietary to i3** — if the rep leaves, the company keeps the accounts, contacts,
  stakeholders and POCs. Surface this on every data-entry screen.
- **Vision talks ("aha").** A voice toggle uses the browser speech engine so Vision
  **speaks** its guidance during a demo. In production this can be a higher-quality
  TTS voice.

---

## Files in this set
- `vision-sales-agent.html` — **working model** (stage-first sales agent) to critique/simplify
- `vision-architecture.html` — **visual diagram** for engineers
- `ARCHITECTURE.md` — this write-up
- `BUILD_PLAN.md` — production agent-to-tool mapping & pilot plan
- `portal.html` — the hub linking everything
