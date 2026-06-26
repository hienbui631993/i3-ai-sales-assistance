# V-Guard — Privacy & Compliance Agent

**The legal/privacy "expert in the room" for the i3 sales team.**
A companion to the Q25 (Quebec Law 25 / Bill 25) presentation deck.

---

## 1. What this is and why it exists

The Q25 deck makes the case that Bill 25 (and GDPR, PIPEDA, PIPA, CCPA) now
touches the i3 sales process directly. The problem you raised: privacy training
happens rarely, so reps forget it. They need an **expert they can bring into the
meeting**, on demand, embedded in the sales process as part of POC due diligence.

**V-Guard is that expert.** It is the "Legal review trigger" already named in the
VISION Layer 2/3 technical spec (entry point #7, agent **V-Guard**). When a rep
builds a POC and the quote includes a privacy-sensitive i3 application, V-Guard:

1. **Triggers automatically** on the sensitive tool (facial recognition, AI Loyalty,
   audio, LPR, POS+video, etc.).
2. **Asks the key questions** about jurisdiction, purpose, and the customer's
   current state — the same questions a privacy officer would ask.
3. **Applies the right law** based on province / state / country
   (Law 25 for Quebec, GDPR for the EU, CCPA for California, PIPEDA federally,
   PIPA for AB/BC, BIPA for Illinois).
4. **Runs the Four-Part Necessity & Proportionality Test** (deck slides 18–19).
5. **Returns a decision** — Proceed / Proceed with checkpoint / Escalate — plus a
   risk score, the triggered concerns, and how to position the deal in the room.
6. **Generates the documents** the rep needs: OPC-compliant signage language, a
   PIA/DPIA starter pack, and the required next-steps checklist.
7. **Hands off** — pushes a legal-review record to Salesforce/iHost and, on high
   risk, escalates to the i3 Privacy Officer and SOC 2 group before POC approval.

## 2. What was delivered

| File | What it is |
|---|---|
| `vguard-privacy-compliance-agent.html` | **The working agent.** Self-contained, no install — open in any browser, present in meetings, or host on iHost. Clickable 6-step flow with a live risk engine, scorecard, and document generators. |
| `documents/V-Guard Privacy Compliance Agent - Build Guide.md` | This guide — how it works, how it maps to the deck, and how to build the true LLM-backed version. |

The HTML is a **functional prototype with a real rule engine** — every selection
changes the risk score, applicable laws, signage, and decision live. It is built
on the same i3 design system and vanilla-JS pattern as the existing VISION demos
so it drops straight into that family.

## 3. How the knowledge base maps to the deck

The rule engine is not generic — it encodes the deck:

- **Tool risk classification** → deck **slide 14** (the "Concern/Problematic" column
  vs the "Yes" column). Facial recognition, AI Sentry, AI Loyalty, audio, LPR,
  overflow, service anomaly, engagement = flagged; door count, alert center, health
  monitoring, donation, below-basket = lower-risk.
- **Sensitive personal information & restricted uses** → **slides 11–13**
  (biometrics, profiling, tracking across cameras, cameras in privacy-expectation
  areas like breakrooms/restrooms).
- **POS + video integration escalation** → **slide 17** (integrating two systems
  creates a new data combination and re-triggers risk low → high).
- **Four-Part Necessity & Proportionality Test** → **slides 18–19**, scored 0–4.
- **OPC signage guidance** → **slides 15–16** (the Canadian Tire sign was "too
  vague"; the Metro example shows the recommended specific, purpose-bound language).
  The signage generator produces purpose-specific text and adds explicit biometric
  language when biometrics are involved.
- **Consent model** → **slide 12** (biometrics require *express* opt-in consent, not
  implied/signage-only).
- **Cross-border / data residency** → **slide 24** (Canada-for-Canada vs U.S. access).
- **Escalation to the Privacy Officer / SOC 2 group** → **slides 6 & 10**.

## 4. Where it sits in the sales process (due diligence)

```
Rep builds POC in iHost  ─►  Quote includes a sensitive i3 app?
                                     │ yes
                                     ▼
                          V-Guard triggers (entry point #7)
                                     │
        Asks: jurisdiction · tools · purpose · evidence · alternatives
              · proportionality · sensitivity · customer readiness
                                     │
                          ┌──────────┴───────────┐
                          ▼                       ▼
                    Low / Medium               High risk
              Proceed (+ checkpoint)     Escalate → Privacy Officer
                          │              + SOC 2 sign-off BEFORE POC
                          ▼                       │
        Outputs: signage · PIA starter · next steps · positioning
                          │
                          ▼
              Push legal-review record to Salesforce  →  POC continues
```

This makes the privacy review a **gate in the POC**, not an afterthought — exactly
the "Go forward / No-Go" decision the deck calls for (slide 22).

## 5. Important limitation (read this)

This prototype is a **deterministic rule engine**, not a live AI model. It is fast,
predictable, and explainable — perfect for a demo and for enforcing a consistent
checklist. But it does **not** freely converse or reason about novel situations.

To make it a *true* agentic agent (one that answers any question a rep types,
reasons over the specific customer's context, and adapts), wire the same knowledge
base to a large language model. The rule engine becomes the agent's **guardrails
and tools**; the LLM becomes the **reasoning and conversation**. Section 6 shows how.

## 6. Building the true agentic version — platform options

You asked how to build this on other AI platforms if needed. Here are the realistic
paths, cheapest/fastest first. All of them reuse the knowledge base in this repo.

### Option A — Claude (Anthropic) with tool use *(recommended; matches the deck's "Vy will apply his AI magic")*
- **System prompt:** the V-Guard knowledge base — jurisdiction→law mapping, the tool
  classification table, the Four-Part Test, OPC signage rules, escalation thresholds.
- **Tools (function calling):** `lookup_law(jurisdiction)`, `classify_tool(name)`,
  `score_four_part_test(answers)`, `generate_signage(purpose, tools)`,
  `create_pia(record)`, `push_to_salesforce(record)`. These are the same functions
  already prototyped in the HTML — promote them to real API endpoints.
- **Why Claude:** strong instruction-following and document generation, native tool
  use, and it's already in the i3 stack (the agentic sales brief lists Claude as the
  external reasoning model). Models: `claude-opus-4-8` (deepest reasoning) or
  `claude-sonnet-4-6` (faster/cheaper for high call volume).
- **Effort:** ~1–2 weeks for a backend dev to wrap the rule engine in an API and
  connect it to a Claude agent loop.

### Option B — Microsoft Copilot Studio *(lowest-code, if you're a Microsoft shop)*
- Build a "topic" per trigger, upload the Q25 deck + this knowledge base as grounding
  knowledge, and use Power Automate flows for the Salesforce/iHost actions.
- Good if non-developers need to maintain it; weaker at precise document generation.

### Option C — OpenAI Assistants / GPT *(alternative to Claude)*
- Same architecture as Option A (system prompt + function tools + file-search over the
  deck). The agentic sales brief already lists OpenAI as an approved external model.

### Option D — Salesforce Agentforce / Einstein *(if you want it native in the CRM)*
- Since the trigger and the record both live in Salesforce, building the agent as an
  Agentforce action keeps everything in one platform. Heavier lift, best long-term fit
  once the process is proven.

### Recommended sequence
1. **Now:** use the delivered HTML prototype in real POC meetings to validate the
   questions, the risk logic, and the outputs with the privacy team. Cheap, immediate.
2. **Next:** promote the rule engine's functions to real API endpoints (Salesforce +
   iHost).
3. **Then:** put a Claude agent (Option A) in front of those tools so reps can also
   *ask it anything* in natural language, while the tools keep the answers grounded
   and consistent.

## 7. Build-first checklist (for whoever builds the production version)

- [ ] Confirm the tool→risk classification with the i3 Privacy team (Grace Hoang et al.).
- [ ] Validate the Four-Part Test scoring against a real PIA the privacy team trusts.
- [ ] Have legal review the generated signage templates per jurisdiction.
- [ ] Define the exact iHost quote events that trigger V-Guard (which SKUs = sensitive).
- [ ] Map the V-Guard record to the Salesforce object (spec §8.7: `jurisdiction`,
      `biometrics_flag`, `profiling_flag`, `risk_score`, `risk_level`, `signage_status`,
      `data_residency`, `privacy_owner_status`).
- [ ] Set the escalation routing (who gets the high-risk notification, and the SLA).
- [ ] Decide data residency for the agent itself (Canada-for-Canada).

---

*V-Guard is decision-support, not legal advice. High-risk findings route to i3's
Privacy Officer and SOC 2 group for sign-off. Knowledge base aligned to the
Q25 Presentation Deck Rev.2 (4.15.26).*
