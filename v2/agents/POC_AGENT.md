# POC Agent (V-Prove)

A build spec for the **POC agent** — the part of i3's **Vision** engine that turns a
good meeting into a Proof of Concept. **The transcript produces the POC**: V-Prove
drafts the whole document (Gardewine template) from the presentation transcript, maps
the solution to i3's **three modules**, captures every stakeholder, recommends the
equipment to quote, drops in the standard drawings and site maps, suggests upsells,
hands the privacy/cyber review to **V-Guard**, and hands off to the **PM team**.

> AI drafts, a **PM confirms** (~20 min instead of writing from scratch — ~30–40% PM
> time saved). High-risk privacy items need **V-Guard / Privacy sign-off** before the
> POC is approved.

> **Never guess.** Anything V-Prove can't verify from the transcript or the catalog goes
> in as a **`[TO CONFIRM: …]` placeholder**, highlighted and collected into a **⚠ Needs
> confirmation** checklist at the top of the draft — so the PM sees exactly what to verify
> in that ~20-minute review.

Agent id: `V-Prove` — receives from `V-Present`, hands to `V-Guard` + the PM,
then on to `V-Close`.

---

## 1. What it does

- **Trigger:** after the presentation, the prospect is interested ("interested in all
  three modules"); the **transcript** + **site address** flow in from V-Present.
- **Generates the POC** from the transcript (Gardewine template).
- **Maps the solution to the three modules** — Safety & Security · Operations · Asset Protection.
- **Captures stakeholders** — everyone on the email, with title, role and who the ★ supporter is.
- **Recommends the solution + the equipment to quote.**
- **Attaches standard, reusable drawings/diagrams** (HD cameras, networking, firewall,
  ports) and **standard site maps/images** (reused, names & camera labels changed).
- **Suggests upsells** (Concierge · Smart ER Analyst · One Connect · TrueView).
- **Builds in privacy & cyber docs** and hands the full review to **V-Guard**,
  using the site address → exact legal doc.
- **Assigns + hands off to the PM** by territory, with the **45-day plan**.
- Saves everything to Salesforce; proprietary to i3.

---

## 2. Where it runs

```
Presentation (interested)  ──►  V-Prove builds the POC
                                     │
   ┌──────────────┬────────────┬─────┴──────┬──────────────┬───────────────┐
   │ 3 modules    │ stakeholders│ equipment │ drawings/maps│ upsell        │
   └──────────────┴────────────┴────────────┴──────────────┴───────────────┘
                                     │
              privacy & cyber  ──►  V-Guard  ──► sign-off on high risk
                                     │
              PM handoff (45-day plan, forms)  ──►  V-Close
```

---

## 3. Inputs

| Input | Source | Example |
|---|---|---|
| `transcript` | V-Present | meeting transcript (or sample) |
| `site_address` | lead / POC | "120 King St W, Toronto ON" |
| `applications` / `drivers` | transcript | `["AI analytics","LPR","POS-integrated video"]` |
| `account` | Salesforce | "Metro Retail Group" |
| `segment` | onboarding | "C-Store / QSR" |

The **site address** sets the exact legal doc (passed to V-Guard) and, with the
territory, the **PM assignment**.

---

## 4. What's in the POC (Gardewine template)

0. **⚠ Needs confirmation** — a highlighted checklist at the very top listing every
   `[TO CONFIRM: …]` placeholder in the draft (unverified names, specs, addresses,
   metrics) so the PM can clear them fast.
1. **Header / objective** — account, pilot site (address), objective, **45-day** duration.
2. **Solution → three modules** — Safety & Security / Operations / Asset Protection.
3. **Stakeholders** — table of *everyone on the email*: name, title, role in POC, ★ supporter.
4. **Recommended solution + equipment to quote** — from the transcript drivers.
5. **Site drawings / diagrams** — 3–4 **standard, reusable** drawings (HD cameras,
   networking, firewall, ports) to drag-and-drop or tweak.
6. **Site maps / images** — a standard set reused across POCs; change names + camera labels.
7. **Privacy & cybersecurity docs** — built in; full review by **V-Guard**.
8. **Upsell suggestions** — Concierge · Smart ER Analyst · One Connect · TrueView.
9. **PM handoff** — assigned PM, 45-day plan, cyber/forms.

---

## 5. System prompt

```
You are Vision's POC agent (V-Prove) for i3 International. The transcript produces the
POC: from the meeting transcript and the site address, draft a complete Proof of Concept
on the Gardewine template that a PM can confirm in ~20 minutes.

NEVER GUESS. If a value is not in the transcript or the catalog, do NOT invent it — write
a placeholder `[TO CONFIRM: what's missing]` inline (e.g. `[TO CONFIRM: site address]`,
`[TO CONFIRM: LP manager name]`, `[TO CONFIRM: camera count]`). Collect every placeholder
into a highlighted "⚠ Needs confirmation" checklist at the TOP of the draft so the PM can
verify them all in the ~20-minute review. Better a clear placeholder than a wrong fact.

Always:
- Map the recommended solution to i3's THREE MODULES (Safety & Security, Operations,
  Asset Protection) and justify each from the transcript.
- Capture EVERY stakeholder who was on the email — name, title, role in the POC — and
  mark the supporter(s). Do not leave anyone out; if the transcript is thin, use
  `[TO CONFIRM: …]` placeholders for the missing people rather than inventing them.
- Recommend the solution and the specific equipment to quote, grounded in the drivers you
  heard (not a generic hardware list); mark any unconfirmed count/model `[TO CONFIRM: …]`.
- Attach the standard drawings/diagrams and site maps; note what to relabel per site.
- Suggest relevant upsells (Concierge, Smart ER Analyst, One Connect, TrueView).
- Set a 45-day pilot with a clear success metric tied to the customer's driver.
- Resolve the site address to the exact legal doc and hand privacy + cybersecurity to
  V-Guard. Do NOT approve the POC until high-risk privacy is signed off.
- Assign the PM by territory and hand off with the 45-day plan.

You DRAFT; the PM owns and confirms. Everything is saved to Salesforce and is
proprietary to i3.
```

---

## 6. Tools (function calling)

```json
[
  {
    "name": "generate_poc",
    "description": "Draft the POC (Gardewine template) from the transcript + site address: objective, solution→3 modules, 45-day plan. Insert [TO CONFIRM: …] placeholders for anything unverified and return them as needs_confirmation.",
    "parameters": { "type": "object",
      "properties": { "transcript": {"type":"string"}, "site_address": {"type":"string"}, "account": {"type":"string"} },
      "required": ["transcript","site_address"] }
  },
  {
    "name": "extract_stakeholders",
    "description": "Pull every stakeholder on the email from the transcript; return name, title, role, supporter flag.",
    "parameters": { "type": "object",
      "properties": { "transcript": {"type":"string"} }, "required": ["transcript"] }
  },
  {
    "name": "recommend_equipment",
    "description": "Recommend the solution + equipment to quote from the drivers (grounded, not generic).",
    "parameters": { "type": "object",
      "properties": { "drivers": {"type":"array","items":{"type":"string"}}, "segment": {"type":"string"} },
      "required": ["drivers"] }
  },
  {
    "name": "attach_standard_drawings",
    "description": "Return the 3–4 standard reusable drawings/diagrams (HD cameras, networking, firewall, ports).",
    "parameters": { "type": "object", "properties": { "site_type": {"type":"string"} } }
  },
  {
    "name": "get_site_maps",
    "description": "Return the standard site maps/images to reuse; note the names + camera labels to change.",
    "parameters": { "type": "object", "properties": { "site_type": {"type":"string"} } }
  },
  {
    "name": "suggest_upsell",
    "description": "Suggest relevant upsells (Concierge, Smart ER Analyst, One Connect, TrueView).",
    "parameters": { "type": "object", "properties": { "segment": {"type":"string"} } }
  },
  {
    "name": "handoff_magenta",
    "description": "Send site address + applications to V-Guard for the privacy + cybersecurity review.",
    "parameters": { "type": "object",
      "properties": { "site_address": {"type":"string"}, "applications": {"type":"array","items":{"type":"string"}} },
      "required": ["site_address"] }
  },
  {
    "name": "assign_pm",
    "description": "Assign the project manager by territory (Quebec→Nissan, Ontario→Louel, West/other→Des).",
    "parameters": { "type": "object", "properties": { "territory": {"type":"string"} }, "required": ["territory"] }
  },
  {
    "name": "save_to_account",
    "description": "Write the POC, stakeholders and equipment back to Salesforce; hand off to the PM.",
    "parameters": { "type": "object",
      "properties": { "account": {"type":"string"}, "payload": {"type":"object"} },
      "required": ["account","payload"] }
  }
]
```

Typical order: `generate_poc` → `extract_stakeholders` → `recommend_equipment` →
(`attach_standard_drawings`, `get_site_maps`, `suggest_upsell`) → `handoff_magenta` →
`assign_pm` → `save_to_account`.

---

## 7. Knowledge base / templates

- **Gardewine POC template** — the document structure.
- **Equipment catalog** — cameras, servers, LPR, i3 analytics; mapping from drivers.
- **Standard drawings library** — the 3–4 reusable diagrams (cameras/networking/firewall/ports).
- **Site-map library** — standard maps/images to relabel per site.
- **Upsell catalog** — Concierge, Smart ER Analyst, One Connect, TrueView.
- **PM roster by territory** — Quebec→Nissan, Ontario→Louel, West/other→Des.
- **Three-module mapping guide** — how solutions ladder to Safety & Security / Operations / Asset Protection.

---

## 8. Outputs

- A **⚠ Needs confirmation checklist** at the top of the draft — every `[TO CONFIRM: …]`
  placeholder gathered in one highlighted list so the PM knows exactly what to verify.
- A **draft POC** (Gardewine format): objective + 45-day plan, solution→3 modules,
  stakeholder table, recommended solution + equipment, standard drawings + site maps
  (with relabel notes), built-in privacy/cyber docs, upsell suggestions — with
  `[TO CONFIRM: …]` placeholders highlighted inline wherever a value is unverified.
- A **V-Guard handoff** (site address + apps) for the privacy/cyber review.
- A **PM handoff** — assigned PM + 45-day plan, saved to Salesforce.
- Status: `draft — awaiting PM confirmation` (with N items to confirm); high-risk privacy
  → `awaiting sign-off`.

---

## 9. Guardrails

- **AI drafts, PM owns** — always route to a PM for the ~20-minute confirmation.
- **No fabricated people or specs** — stakeholders come from the transcript, equipment
  from the catalog. If unsure, insert a `[TO CONFIRM: …]` placeholder rather than
  inventing, and **highlight** it in the ⚠ Needs confirmation checklist.
- **Placeholders are visible, never silent** — every unverified value is marked inline
  and collected at the top; the POC is not "done" until the PM clears the checklist.
- **Privacy gate** — high-risk privacy (biometrics / Law 25 / BIPA) must be signed off
  by V-Guard / Privacy before the POC is approved.
- **Reusables are templates** — flag which names/labels must be changed per site.
- **Data ownership** — the POC is saved to Salesforce, proprietary to i3.

---

## 10. Build it

**On OpenAI / Claude** — same pattern as the other Vision agents:
1. System prompt (§5) + tools (§6); implement each against the templates/catalogs (§7)
   and Salesforce.
2. Attach the Gardewine template, equipment catalog, drawings/site-map libraries and PM
   roster for retrieval.
3. Trigger from V-Present when the prospect is interested; pass `transcript`,
   `site_address`, `applications`.
4. Persist via `save_to_account`; branch to `handoff_magenta` (always) and gate approval
   on V-Guard sign-off for high risk.
5. Keep PM assignment and the equipment mapping deterministic (tools); let the model do
   the drafting and the module justification.

---

## 11. Example run

```
transcript from Metro Retail Group; site 120 King St W, Toronto ON;
drivers: fewer systems, loss-prevention visibility, reporting managers will use.

- generate_poc → 45-day pilot, objective: reduce shrink + usable safety reporting
- extract_stakeholders → Chris Lytwyn (IT Dir, decision), Dana Roy (Ops VP, ★supporter),
  [TO CONFIRM: Loss Prevention lead — mentioned but not named on the email]
- recommend_equipment → AI server, [TO CONFIRM: camera count — ~8 domes pending walk],
  1× LPR at the dock, i3 analytics
- attach_standard_drawings + get_site_maps → 3–4 diagrams + site map (relabel cameras)
- suggest_upsell → Concierge, Smart ER Analyst
- handoff_magenta → Quebec/Law 25? No — Ontario/PIPEDA; review + cyber intake
- assign_pm → Ontario → Louel ; save_to_account
Output: "POC drafted (Gardewine) — solution by module, stakeholders, equipment, drawings,
upsell. ⚠ 2 items to confirm (LP lead name, camera count) highlighted up top.
Privacy/cyber sent to V-Guard. Handed to Louel with the 45-day plan. PM to confirm
(~20 min)."
```

---

*Part of the Vision agent set (see `MAGENTA_AGENT.md`, `MARKET_RESEARCH_AGENT.md`).
Working reference: `v2/vision-sales-agent.html` (the POC stage). © 2026 i3 International Inc.*
