# VISION — i3 Agentic Sales Assistance

**VISION (V)** is i3 International's internal **agentic sales engine**: a closed-loop,
AI-guided system that walks every salesperson through the full deal lifecycle —
from onboarding to close — while protecting company knowledge and enforcing
privacy compliance.

> "This is not a tool. It is a scalable revenue system that captures what works,
> applies it consistently, improves over time, and extends beyond i3 into its
> partner ecosystem." — *i3 Future Revenue System brief*

---

## Why this exists

Today i3's success depends on individual experience, instinct, and inconsistent
process. A small group of top performers execute with repeatable approaches that
have never been captured or scaled. As the company grows toward its **$50M+ by 2028**
target, that inconsistency gets expensive.

VISION captures the workflow of top performers, standardizes it into a repeatable
process, embeds it into daily execution, and continuously improves it using real
data — so the whole team can sell like the best, and **output per rep rises before
headcount does**.

---

## What's in this repository

| File | What it is |
|------|-----------|
| `vision-agentic-engine.html` | **The main demo.** The full 10-agent VISION engine: dashboard, architecture infographic, onboarding, prospecting, verification, presentation, POC, legal, closing, and leadership. |
| `vguard-legal-agent.html` | **The standalone V-Guard legal agent.** A guided privacy/legal expert that screens a POC against Quebec Law 25, GDPR, PIPEDA, BIPA, CCPA and produces signage + documentation. Grounded in the Q25 deck. |
| `vision-basic-working-model.html` | The earlier single-page working model (kept for reference). |
| `README.md` | This file. |
| `PROCESS.md` | The end-to-end sales process and how each agent fits the flow. |
| `GUIDE.md` | The operating playbook, including the Q25 privacy due-diligence process. |
| `USER_GUIDE.md` | Step-by-step instructions for end users (reps, managers, leadership). |
| `TECHNICAL.md` | How to run/deploy the prototype and the production LLM architecture. |
| `documents/` | Source material (Q25 deck, Gardewine POC, onboarding schedule, competitor matrix, privacy guides). *On the `main` branch.* |

---

## The agent stack

VISION is one orchestrator (**V**) routing to ten specialist agents:

| Agent | Stage | Role |
|-------|-------|------|
| **V-Start** | Onboarding | HR data → rep profile, permissions, training path, segment |
| **V-Coach** | Onboarding | i3 Live / i3host training, readiness, 45-day ramp |
| **V-Target** | Prospecting | 6sense / SixthSense / Salesforce → account & buying-group map |
| **V-Reach** | Prospecting | Drafts email / LinkedIn / call openings, validates contacts |
| **V-Verify** | Verification | Verifies real activity (email/phone/mobile) vs claimed |
| **V-Present** | Presentation | Deck prep, objections, manager loop-in, transcript capture |
| **V-Prove** | POC | Transcript → scoped POC, success criteria, PM handoff |
| **V-Guard** | Legal & Privacy | Q25/GDPR/PIPEDA/BIPA screening, signage, documentation |
| **V-Close** | Closing | Price position vs incumbent, contract language, commitment |
| **V-Score** | Leadership | Rep scoring, segmentation, KPI funnel, intervention triggers |

See **PROCESS.md** for the full flow and **USER_GUIDE.md** for how to drive each one.

---

## Quick start

These demos are **single self-contained HTML files** — no build, no server required.

1. Download `vision-agentic-engine.html` (or `vguard-legal-agent.html`).
2. Open it in any modern browser (works on laptop or phone).
3. Use the **Navigation** bar to move between stages, or the **entry-point selector**
   on the dashboard to start as a new hire, existing rep, advanced rep (POC), or partner.

For deployment options (hosting, or building the real reasoning agents), see **TECHNICAL.md**.

---

## Status

This is a **working prototype / alignment layer**. The screens, flow, and rule logic
are real and demoable, but the AI reasoning is currently simulated. The roadmap to
make the agents actually reason and call tools (OpenAI/Claude for reasoning, Llama for
scoring, Salesforce + vector DB for data) is documented in **TECHNICAL.md**.

---

*Internal i3 International project. Everything entered into VISION is treated as
proprietary company knowledge.*
