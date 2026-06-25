# VISION — Technical Guide

Covers two things:
1. **Running / deploying the current prototype** (static HTML).
2. **The production architecture** to turn these simulated agents into real, reasoning,
   tool-calling agents.

---

## Part 1 — The prototype (today)

### What it is
Three self-contained HTML files with inline CSS and vanilla JavaScript. **No build step,
no dependencies, no backend.** State lives in a single in-memory `state` object and resets
on refresh.

```
vision-agentic-engine.html   # full 10-agent engine
vguard-legal-agent.html      # standalone V-Guard legal agent
vision-basic-working-model.html
```

### Run locally
Just open the file in a browser. Or serve the folder:

```bash
# any static server works
python3 -m http.server 8080
# then visit http://localhost:8080/vision-agentic-engine.html
```

### Deploy the prototype (pick one)
- **GitHub Pages** — push to a repo, enable Pages on the branch; the files are served as-is.
- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder or connect the repo;
  no build command needed (it's static).
- **Internal share** — drop the HTML files on any web server or SharePoint/Teams file share.

### Editing
Each file has three sections: `<style>`, the HTML shell, and a `<script>` block. The script
holds the `state` object, the per-agent logic, and a `render()` function that redraws the
active screen. To change copy or rules, edit the relevant function and reload.

> **Validation tip:** the script is plain JS. You can extract it and run
> `node --check` to catch syntax errors before sharing.

---

## Part 2 — The production system

The prototype is the **alignment layer**. The real system is a **closed-loop, multi-agent
platform** described in the *i3 Future Revenue System* brief.

### 2.1 High-level architecture

```
            React / TypeScript front end  (or the current HTML, hosted)
                              │
                    VISION Orchestrator
              (routing, stage detection, state)
                              │
   ┌──────────┬──────────┬────┴─────┬──────────┬──────────┐
 V-Target  V-Reach   V-Present   V-Prove   V-Guard    V-Score …
   │          │          │          │          │          │
   └──────────┴────── tools / function calls ──┴──────────┘
                              │
        Reasoning layer            Intelligence layer
   OpenAI · Claude · Copilot            Llama (internal)
   reasoning, messaging,            scoring, forecasting,
   structured output               regression, learning
                              │
        Data layer:  Salesforce · i3host / i3 Live · 6sense / SixthSense ·
                     email & phone systems · meeting transcripts · POC docs
                              │
        Knowledge layer:  Vector DB (Pinecone / Weaviate) over Q25 deck,
                          privacy guides, SOPs, POC templates, product manuals
                              │
        Warehouse:  Snowflake / BigQuery        Orchestration: LangChain or custom
```

### 2.2 The two model tiers (core principle)
- **External models guide decisions** — OpenAI, Claude, Copilot for reasoning, summarization,
  messaging, and structured outputs.
- **The internal model builds intelligence** — **Llama** for deal scoring, rep performance
  modeling, forecasting, and regression.

> For long-document legal reasoning (Q25, GDPR, BIPA), **Claude** is the recommended primary
> for **V-Guard** — load the privacy corpus into the vector DB and let the agent retrieve.

### 2.3 The four engines → services
| Engine | Responsibility |
|--------|----------------|
| Lead Intelligence Engine | identify high-intent prospects, track engagement, score conversion |
| Sales Execution Agent | next best action, messaging, progression, training reinforcement |
| Performance Intelligence Engine | engagement quality, stage conversion, consistency, improvement |
| Leadership Agent | pipeline visibility, forecast accuracy, performance insights, headcount calls |

### 2.4 Recommended stack
| Layer | Choice |
|-------|--------|
| Front end | React + TypeScript (Tailwind), or host the current HTML in Phase 1 |
| Orchestration | OpenAI Agents SDK **or** LangGraph (state, durable execution, multi-agent) |
| Reasoning | OpenAI / Claude / Copilot APIs |
| Intelligence | Llama (deal scoring, forecasting) |
| Vector store | Pinecone or Weaviate |
| Warehouse | Snowflake or BigQuery |
| Backend | Python microservices |
| CRM | Salesforce (system of record) |

### 2.5 Agent contract (how an agent becomes "agentic")
An agent is more than UI. Each must: **make a decision · call tools · trigger a workflow ·
update systems.** Define each agent with:

- a **system prompt** (role, guardrails, output format),
- a set of **tools / function definitions** it may call,
- **retrieval** access to the relevant knowledge namespace,
- a **structured output schema** (validated, so the model retries on mismatch).

**Example — V-Guard tool sketch:**
```jsonc
// Tool the orchestrator exposes to V-Guard
{
  "name": "assess_privacy_risk",
  "description": "Screen a POC against applicable privacy law and return a structured brief.",
  "input_schema": {
    "type": "object",
    "properties": {
      "jurisdiction": { "type": "string" },
      "ai_tools":     { "type": "array", "items": { "type": "string" } },
      "integration":  { "type": "boolean", "description": "two systems combined, e.g. POS+video" },
      "subjects":     { "type": "string", "enum": ["public","employees","both","minors"] },
      "signage":      { "type": "string", "enum": ["adequate","vague","none"] }
    },
    "required": ["jurisdiction", "ai_tools"]
  }
}
// Returns: { risk_level, applicable_laws[], four_part_test{}, signage[], documents[], owners[] }
```
The V-Guard logic in `vguard-legal-agent.html` (the `compute()` and `jurisdictionRules()`
functions) is effectively the reference implementation of that return contract — port it
server-side and back it with retrieval over the privacy corpus.

### 2.6 Expert-intervention logic
Wire triggers into the orchestrator: deal size over threshold, engagement drop, rising POC
risk, or a high-value opportunity → notify the right human and pause automation.

### 2.7 Proof-of-work integrations (V-Verify)
- **Email:** connect the company email system (Microsoft Graph / Gmail API) — sent,
  timestamp, recipient, reply, follow-up.
- **Phone / mobile:** connect the calling system or company mobile workflow — number dialed,
  duration, conversation occurred, transcript when available.
- Verified activity (not claims) feeds the engagement score and forecast.

### 2.8 Security, privacy & data residency
- Treat all captured content as proprietary; write to Salesforce + i3-owned records.
- Honor **Canada-for-Canada / US-for-US** residency; document cross-border access; SCCs for
  EU/UK transfers.
- Target **SOC 2 / ISO 27001** controls for the data and intelligence layers.
- Keep human checkpoints — AI is support, not replacement.

### 2.9 Phased rollout
| Phase | Window | Goal |
|-------|--------|------|
| Phase 1 | 0–45 days | Build core system; pilot with a small group incl. leadership |
| Phase 2 | 45–90 days | Integrate intelligence & guidance; expand pilot |
| Phase 3 | 90–150 days | Full rollout; leadership dashboards; optimization engine |

Suggested first agents to build (revenue path): **V-Target → V-Prove → V-Guard → V-Close.**

### 2.10 Hard requirement
The system needs **clean data, enforced process, and consistent usage**. Without discipline,
it will not perform — this is a process system first and an AI system second.

---

## Repository conventions
- Branch for development; open a PR rather than committing to `main` directly.
- The `documents/` source material lives on `main`.
- Keep each agent demo a single self-contained HTML file until Phase 1 introduces the
  React front end and the orchestration backend.
