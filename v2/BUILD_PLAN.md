# Build Plan — From Simulation to Production

How to turn the `v2/` prototypes (V engine, Magenta, Manager view, Privacy agent)
into a live system wired to i3's real stack. North America first, then global.

---

## 1. What's real today vs. what to build

| Layer | Prototype (today) | Production (to build) |
|---|---|---|
| UI / UX | Self-contained HTML, i3 Brand Kit | Same screens, served from i3Host (web app) |
| Agent reasoning | Scripted "thinking" stream | Real LLM agents (function calling) |
| Knowledge | Embedded from your docs | Retrieval over a maintained knowledge base |
| System data | Simulated (Salesforce/i3Host/etc.) | Live API calls + auth |
| Verification | Simulated anti-gaming | Real email/call/calendar/mobile signals |

The prototype **is the spec** — the screens, flows, agent roster and decision
logic are the requirements. Production swaps the simulated layer for real calls.

## 2. Architecture (one agent engine, many tools)

```
            i3Host (web UI — reps & integrators)
                       │
            ┌──────────┴───────────┐
            │   V orchestrator      │   ← decides which agent runs, enforces stage rules
            └──────────┬───────────┘
        ┌──────────────┼───────────────────────────┐
   LLM agents     Tool / function layer        Knowledge base (retrieval)
  (V-Start …      get_opportunity (Salesforce)   Q25 / Law 25 deck
   V-Close)       get_quote (i3Host)              LP & Privacy Guide, FRT laws
                  get_pricing (Automatica/Matrix) Gardewine POC template
                  get_transcript (GoToMeeting)    Onboarding docs + 30-90 schedule
                  get_intent (6sense/ZoomInfo)    Competitor cost matrix / battlecards
                  write_record (Salesforce)
                  send_outreach / verify_activity
```

**Principle (from the agentic-sales brief):** external LLMs guide decisions; rules
control progression; only *verified* activity advances a stage.

## 3. The 9 agents → real tools

| Agent | Real tools to wire | Notes |
|---|---|---|
| V-Start | HR feed, onboarding doc store, i3Host | Parse doc → profile, plan, reflection cadence |
| V-Target | 6sense, ZoomInfo, LinkedIn, HubSpot | Intent + buying-group mapping |
| V-Reach | Marketing automation, social, VAR CRM | Hand-off + nurture + partner activation |
| V-Coach | i3Live (LMS), Salesforce | Module completion, test scores, readiness |
| V-Guide | Email, calling, calendar, mobile/MDM | **Verification layer — build before UI** |
| V-Present | GoToMeeting/Zoom, deck system | Transcript capture, manager invite |
| V-Prove | i3Host POC docs, PM tooling | Gardewine template, 45-day metrics |
| V-Guard (Magenta) | Q25 KB, signage/PIA generator, Salesforce | Privacy gate; jurisdiction rules |
| V-Close | Automatica (ERP), cost matrix, Salesforce, DocuSign | Pricing, battlecards, contract, sync |

## 4. Platform choice

Either works; the architecture is identical (system prompt + function tools +
retrieval). Recommendation: **pilot on one, keep tools provider-agnostic.**

- **OpenAI** — GPT-4o + function calling / Assistants API. (You asked to see this;
  the Magenta sim shows the function-call pattern.)
- **Claude (Anthropic)** — strong tool use + document generation; already in the
  i3 stack per the agentic-sales brief.
- **Salesforce Agentforce** — if you want it native in the CRM long-term.

Keep the **tool/function definitions** as the stable contract so you can swap the
model later without rebuilding integrations.

## 5. Build order (do verification before UI polish)
1. **Map stages + required proof** at each stage (done — it's the V engine).
2. **Integrate the systems that create truth:** Salesforce, i3Host, Automatica,
   email, calling, calendar, GoToMeeting.
3. **Build the verification layer** (V-Guide) — email/call/meeting/mobile proof +
   anti-gaming. This is the trust foundation; build it first.
4. **Wire the privacy gate** (V-Guard/Magenta) into i3Host quoting triggers.
5. **Rep action screen + Manager dashboard** on live data.
6. **Scoring + leadership intelligence** last.

## 6. Pilot scope (North America first)
- **Region:** North America v1 (Quebec/Law 25 in scope for the privacy gate).
- **Users:** a small group of disciplined reps + leadership.
- **Segment:** one to start (e.g. Retail or Commercial).
- **Success proof:** V delivers a lead → rep presents → activity *verified* →
  privacy gate clears → deal advances → Salesforce shows the full validated trail.
- **Then:** refine on data → expand segments → global (add GDPR/PIPA/other
  jurisdictions to V-Guard's rulebook).

## 7. Guardrails
- **Data residency:** Canada-for-Canada where required; document cross-border
  access (this is exactly what V-Guard checks).
- **Privacy of the system itself:** V-Guide should track only *work* communication
  tied to sales activity, never personal mobile use.
- **Human checkpoints:** AI guides; managers and the Privacy Officer approve
  high-risk steps. Keep the human in the loop.
- **Not legal advice:** V-Guard/Magenta is decision-support; high-risk findings
  route to the i3 Privacy team for sign-off.

## 8. What to load next (to deepen the agents)
Drop these into the repo and the agents get sharper:
- Segment playbooks (Retail / Commercial / School / Integrator)
- The full sales-process document (stage-by-stage required fields)
- Real reflection-form questions / response export (for V-Start & Manager view)
- Pricing/kit rules from Automatica (for V-Close)
