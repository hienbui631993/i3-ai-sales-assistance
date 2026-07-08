# Market Research Agent

A build spec for the **Market Research agent** — the intelligence layer of i3's
**Vision** sales engine. It researches **markets, accounts and competitors**, ties
every finding to i3's **three modules** (Safety & Security · Operations · Asset
Protection), and hands a ready-to-use brief to the **marketing / prospecting** agent
(V-Target) and the **presentation** agent (V-Present).

> Decision-support, not a data warehouse. It **cites its sources** (external claims only
> from **vetted, approved** ones), respects data-provider **credit costs**, and never
> invents facts about a company.

---

## 1. What it does

- **Segment research** — for a target vertical (C-Store / QSR, Grocery, Commercial,
  Education, Institution, Integrator): market size, trends, buying triggers, the
  associations and events that matter.
- **Account research** — for a named company: firmographics, recent news (Google
  Alerts), and **pain points mapped to the three modules**, with the angle to pitch.
- **Competitor intelligence** — how to out-position the incumbent (Eagle Eye, Verkada,
  Solink, DTiQ, OpenEye, HME…), pulled from the i3 cost-matrix battlecards.
- **Intent + shortlist** — rank accounts by intent (6sense / ZoomInfo) into a
  recommended list for the rep.
- **Feeds** the marketing agent (leads to work) and the presentation agent (deck +
  brief). Everything is saved to Salesforce and is proprietary to i3.

Agent id: `V-Research` (feeds `V-Target` and `V-Present`).

---

## 2. Where it runs

```
Segment / account / competitor  ──►  Market Research agent
                                          │
        ┌───────────────┬─────────────────┼──────────────────┐
        │ Segment brief │ Account brief   │ Competitor brief  │
        │ (size, trends)│ (news → 3 mods) │ (how i3 wins)     │
        └───────────────┴─────────────────┴──────────────────┘
                                          ▼
     Intent-ranked shortlist → V-Target (leads) · brief → V-Present (deck)
```

---

## 3. Inputs

| Input | Source | Example |
|---|---|---|
| `mode` | caller | `segment` \| `account` \| `competitor` |
| `segment` | rep / territory | "C-Store / QSR" |
| `territory` | onboarding | "Ontario & Atlantic" |
| `company` | rep / lead | "Metro Retail Group" |
| `site_address` | lead / POC | "120 King St W, Toronto ON" |
| `competitor` | close stage | "Verkada" |

---

## 4. Data sources

Ground every claim in one of these (and label which):

- **6sense** — buyer intent (respect the existing **6-month filter**; credits per query
  — prefer a monthly / bi-monthly manual export before automating).
- **ZoomInfo** — firmographics + contacts.
- **Sales Navigator** — people, moves, org structure.
- **Google Alerts** — recent company news (incidents, fines, exec statements, expansion).
- **HubSpot** — nurture / drip engagement history.
- **i3 knowledge** — segment playbooks, win/loss, cost-matrix battlecards.
- **External / public web — approved sources only** — reputable news, official company
  filings & press releases, government / regulatory (e.g. the OPC), and recognised
  industry associations / reports. Restricted to an **admin-maintained allow-list of
  vetted, legitimate sources**; every finding is tagged with its **source + credibility**,
  and anything off the allow-list is excluded or flagged — never cited as confirmed.

> Cost note (from Prospecting): 6sense/ZoomInfo cost i3 $100K+/yr combined; keep pulls
> deliberate and cache results. Data-pulling can be offered as a **concierge service**
> to integrators who hit their numbers.

---

## 5. System prompt

```
You are Vision's Market Research agent for i3 International. You research markets,
accounts and competitors and return a concise, sourced brief the salesperson can act on.

Always tie findings to i3's THREE MODULES:
- Safety & Security  (incidents, fines, shrink, staff safety)
- Operations         (customer engagement, efficiency, reporting managers will use)
- Asset Protection   (POS exception, LPR, protecting stock and premises)

Rules:
- Cite the source for every non-obvious claim (6sense / ZoomInfo / Google Alerts / news).
- Never invent facts about a real company. If you can't verify, say so and flag it.
- Only use EXTERNAL / public sources on the approved allow-list (legit, vetted). Tag each
  external finding with its source + credibility; if a source isn't approved, exclude it
  or flag it — never present it as confirmed.
- Respect data-provider credit cost: prefer cached / exported data; don't over-pull.
- Be concrete and short. For accounts, give: what you found, their pain, the angle.
- For competitors, give: their weakness + how i3 wins (from the cost-matrix battlecard).
- Rank accounts by intent and recommend who to work first.
- Everything is saved to Salesforce and is proprietary to i3.

Output by mode:
- segment    → market size, trends, buying triggers, key associations/events, ICP.
- account    → firmographics, recent signals, pain points → 3 modules, recommended angle.
- competitor → weaknesses, i3 positioning, the one-line "how to beat them".
```

---

## 6. Tools (function calling)

```json
[
  {
    "name": "research_segment",
    "description": "Return market size, trends, buying triggers, associations/events and ICP for a segment + territory.",
    "parameters": { "type": "object",
      "properties": { "segment": {"type":"string"}, "territory": {"type":"string"} },
      "required": ["segment"] }
  },
  {
    "name": "research_account",
    "description": "Firmographics + recent news (Google Alerts) for a company; extract pain points.",
    "parameters": { "type": "object",
      "properties": { "company": {"type":"string"}, "site_address": {"type":"string"} },
      "required": ["company"] }
  },
  {
    "name": "pull_intent",
    "description": "Buyer-intent signals + score from 6sense/ZoomInfo (uses the 6-month filter; credit-aware).",
    "parameters": { "type": "object",
      "properties": { "segment": {"type":"string"}, "company": {"type":"string"} } }
  },
  {
    "name": "web_search_approved",
    "description": "Search external/public sources for a company or market — RESTRICTED to the admin-approved allow-list of legitimate sources. Returns findings each with source, URL and credibility; excludes/flags anything off the allow-list.",
    "parameters": { "type": "object",
      "properties": { "query": {"type":"string"}, "company": {"type":"string"} },
      "required": ["query"] }
  },
  {
    "name": "map_to_modules",
    "description": "Map findings/pain points to Safety & Security / Operations / Asset Protection with the pitch angle.",
    "parameters": { "type": "object",
      "properties": { "findings": {"type":"array","items":{"type":"string"}} },
      "required": ["findings"] }
  },
  {
    "name": "competitor_brief",
    "description": "Return the incumbent's weaknesses and how i3 wins (from the cost-matrix battlecard).",
    "parameters": { "type": "object",
      "properties": { "competitor": {"type":"string"}, "segment": {"type":"string"} },
      "required": ["competitor"] }
  },
  {
    "name": "rank_shortlist",
    "description": "Rank accounts by intent + ICP fit into a recommended shortlist for the rep.",
    "parameters": { "type": "object",
      "properties": { "accounts": {"type":"array","items":{"type":"object"}} },
      "required": ["accounts"] }
  },
  {
    "name": "save_to_account",
    "description": "Write the research brief back to Salesforce (feeds V-Target and V-Present).",
    "parameters": { "type": "object",
      "properties": { "account": {"type":"string"}, "payload": {"type":"object"} },
      "required": ["account","payload"] }
  }
]
```

Typical order — **account mode:** `research_account` → `web_search_approved` →
`pull_intent` → `map_to_modules` → `save_to_account`. **segment mode:**
`research_segment` → `web_search_approved` → `pull_intent` → `rank_shortlist` →
`save_to_account`.

---

## 7. Outputs

**Segment brief** — market size + growth, top 3 trends, buying triggers, key
associations/events, the ICP to target.

**Account brief** (feeds the presentation deck):

| Module | What we found (source) | The angle |
|---|---|---|
| Safety & Security | Site incident + fine ~2 mo ago (Google Alerts) | Lead with incident reduction |
| Operations | CEO wants better customer engagement (news) | Video analytics tied to ops + engagement |
| Asset Protection | POS registers in use (firmographics) | i3 AI smart-POS exception capability |

Plus: intent score, recommended first contact, recent signals.

**Competitor brief** — one line per rival, e.g. *"Verkada: slick cloud but premium and
thin on POS/AI retail depth — win on value + data integration."*

**Shortlist** — accounts ranked by intent, "call these first."

---

## 8. Guardrails

- **Cite sources**; flag anything unverified rather than guessing.
- **Approved sources only** — external / public claims must come from the vetted
  allow-list (legit + approved); exclude or flag anything unverified or low-credibility.
- **Credit-aware** — cache/export before hitting paid APIs; honour the 6-month filter.
- **No fabricated company facts** — real names require real signals.
- **Data ownership** — briefs are saved to Salesforce, proprietary to i3.
- **Human check** — the rep confirms the brief before it drives outreach.

---

## 9. Build it

**On OpenAI / Claude** — same pattern as the other Vision agents:
1. System prompt (§5) + tools (§6); implement each tool against 6sense / ZoomInfo /
   Sales Navigator / Google Alerts / Salesforce / the i3 KB.
2. Attach the segment playbooks, win/loss and cost-matrix battlecards for retrieval.
3. Call in **segment mode** from Prospecting (V-Target) and **account mode** from
   Presentation (V-Present); persist via `save_to_account`.
4. Keep the intent/credit logic deterministic (a tool), and let the model do the
   synthesis and the pitch angle.

---

## 10. Example run

```
mode=account, company="Metro Retail Group", site="120 King St W, Toronto ON"

- research_account → retail, multi-site; Google Alerts: incident + fine (~2 mo),
  CEO quote on customer engagement; POS registers in use.
- pull_intent → 92 (surging on "retail video analytics")
- map_to_modules → Safety&Security / Operations / Asset Protection (table above)
- save_to_account → feeds V-Present's deck
Output: "Here's Metro Retail — what I found, their pain by module, the angle to pitch,
and intent 92 (call first)."
```

---

*Part of the Vision agent set (see `MAGENTA_AGENT.md`). Working references:
`v2/vision-sales-agent.html` (Prospecting + Presentation) and
`v2/v-vision-sales-engine.html`. © 2026 i3 International Inc.*
