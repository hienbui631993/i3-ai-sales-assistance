# VISION — Operating Playbook

This is the practical "how to run a deal through VISION" guide, including the **Q25
privacy due-diligence process** that V-Guard enforces. Where PROCESS.md defines *what*
the stages are, this guide explains *how* to actually work them.

---

## Part A — Running a deal, stage by stage

### 1. Start the rep right (V-Start / V-Coach)
- Load the new hire's HR data; VISION builds the rep profile and assigns the **training path**.
- Work the 30/60/90 schedule. Mark modules complete as they finish.
- Don't push a rep to independent live calls until **readiness = "Ready for live calls."**
  Until then, use guided reps and mentor shadowing.

### 2. Find the right accounts (V-Target)
- Feed in intent signals from **6sense / SixthSense / ZoomInfo**.
- VISION scores intent (Hot / Warm / Cold). For **Hot** accounts, go multi-threaded.
- **Map the whole buying group** — never sell to one person. Each role gets a different story:
  - **IT** → integration & security
  - **Operations** → efficiency & cost reduction
  - **Executive** → ROI & business value
  - **Asset Protection** → shrink / ORC reduction
- Contact in priority order: first / second / third by intent and influence.

### 3. Reach out — and prove you did (V-Reach → V-Verify)
- Use the drafted email / LinkedIn / call openings; fix any bad contact data first.
- **Log your outcomes.** V-Verify compares verified activity (email/phone/mobile) to what
  was claimed. A gap doesn't get you in trouble automatically — but it triggers a coaching
  flag and protects the forecast. Keep claimed and verified aligned.

### 4. Present with your manager (V-Present)
- Set the meeting goal (usually: agreement to a scoped pilot + executive walkthrough).
- Bring the **manager** into the executive walkthrough.
- Capture the transcript/notes in VISION — this is what becomes the POC. Don't let it
  live in your inbox.

### 5. Build the POC (V-Prove)
- VISION turns the transcript into a scoped POC. Fill in site, duration, success metrics,
  named supporters, and blockers. (Model it on **Gardewine**: single site → prove value →
  phased rollout.)
- Select the **i3 AI tools** in scope. ⚠️ Selecting a sensitive tool (facial recognition,
  LPR, age/gender, behavioral, heat mapping) **automatically triggers the V-Guard gate**.
- Hand off to the PM agent for scope, timeline, cybersecurity forms, and approvals.

### 6. Clear the privacy gate (V-Guard) — see Part B.

### 7. Close (V-Close)
- Position price against the incumbent (e.g. Protex AI: high cost, hard to scale) —
  operational value **at a price point that enables company-wide adoption**.
- You should arrive here with documentation, verified activity, named stakeholders, and
  legal answers already captured. Closing is the final controlled step, not a scramble.

### 8. Leadership reads the loop (V-Score)
- Managers see rep segmentation, the KPI funnel, and intervention triggers.
- Optimize current reps before adding headcount.

---

## Part B — The Q25 Privacy Due-Diligence Process (V-Guard)

This is the heart of the legal agent. It exists because privacy can't be a one-time
training the team forgets — it has to be **built into the POC as due diligence**.

### B1. When does V-Guard trigger?
A privacy review is required when **any** of these is true:
- A **"Concern" i3 application** is in scope: Facial Recognition / Biometrics, i3 AI
  Loyalty, AI Sentry, Audio Monitoring, LPR / Gate Control, Engagement / Demographics,
  Heat Mapping, Customer Overflow, Service Anomaly.
- Two systems are **integrated** (e.g. POS data + video) — this creates new data
  combinations that form a *profile that tracks people*, and pushes risk from low/average
  to **HIGH**.
- People are **identified, tracked, or profiled** in any way.

### B2. The four-part necessity & proportionality test
Every triggered deal runs this test (from the Q25 deck):

1. **Purpose** — primary purpose defined and documented; each purpose assessed separately
   (loss prevention, safety, analytics); **evidence of an actual problem** exists (shrink
   data, incident logs); speculative/prohibited purposes ruled out.
2. **Technology Need & Effectiveness** — the tool is necessary; effectiveness evaluated
   (accuracy, bias, error rates); incremental benefit is meaningful; less-intrusive
   measures are insufficient.
3. **Less-Intrusive Alternatives** — alternatives evaluated; unnecessary features disabled
   (audio, FRT, excess analytics); **biometrics are a last resort**; data minimized
   (zones, angles, retention).
4. **Proportionality** — reasonable-person test; intrusion proportionate to risk severity;
   risk classified low/medium/high; high-risk requires enhanced safeguards; fully documented.

### B3. The bills, by jurisdiction
| Where | Applies |
|-------|---------|
| Quebec | **Law 25 (Bill 25)** + PIPEDA |
| Alberta / BC | PIPA (AB/BC) + PIPEDA |
| Canada (other) | PIPEDA |
| European Union | GDPR |
| United Kingdom | UK GDPR + DPA 2018 |
| California | CCPA / CPRA |
| Illinois | **BIPA** (written consent, private right of action) |
| Texas | CUBI |

Standards referenced alongside: **SOC 2, ISO 27001**. Assessments produced: **PIA** (Privacy
Impact Assessment) and **DPIA** (Data Protection Impact Assessment).

### B4. Signage — what regulators accept
**Recommended wording (OPC-aligned, purpose-specific):**
> "Images are being monitored and recorded 24 hours for the purposes of crime prevention
> and public safety. This is managed by [i3 / Customer] — for more information contact our
> Privacy Office at [phone / email]."

**Rejected by the OPC — do not use:**
- "These premises are monitored by video surveillance that may include electronic or
  biometric technologies." *(too vague)*
- "…to protect our customers and businesses." *(too broad)*

If **biometrics** are used, signage must additionally state **what** is obtained, **how** it
is managed and used, and **what it does NOT do** (no marketing, no demographics).

### B5. Quebec Law 25 specifics
- A **biometric database** must be **declared to the CAI at least 60 days** before service.
- Sensitive personal information requires **express consent** (individual sign-off), not implied.
- Cameras are **restricted in areas with an expectation of privacy** (restrooms, breakrooms).
- A **PIA** is required for personal-information systems.

### B6. Who owns each compliance step
| Area | Owner |
|------|-------|
| Four-part necessity test | Sales |
| Consent & transparency (signage) | Customer + Sales |
| Data security / breach prevention / access | SOC 2 + Privacy |
| Cross-border access & PIA | Privacy + SOC 2 |
| Disclosing personal information | Customer + SOC 2 + Privacy |
| Data retention | Customer Contract + i3 CMS + Privacy |
| Employee privacy | Video Applications |
| Process mapping | Sales + PM |
| Biometric technology | Sales + Privacy |
| Privacy Officer & i3 Privacy Management Program | i3 Leadership |

**Escalation:** High-risk deals route to the **i3 Privacy Team** — Grace Hoang (lead),
with Steve M, Kishan P, and Sharon Bauer (Bamboo Data Consulting) — before POC approval.

### B7. Data residency
Privacy prefers **Canada-for-Canada, US-for-US** storage. Cross-border / U.S. support access
needs documented controls (and SCCs for EU/UK transfers).

---

## Part C — Sales positioning by risk level

| Risk | How to position |
|------|-----------------|
| **High** | Frame narrowly as a defined **security / incident-investigation** use case. Do NOT describe it as broad tracking, profiling, marketing, or demographic intelligence. |
| **Medium** | Keep the use case tightly tied to the documented purpose; don't expand scope during the sales cycle. |
| **Low** | Standard security positioning while confirming notice, retention, and access controls. |

---

## Part D — Golden rules

1. **Map the buying group, not a person.**
2. **Capture everything in VISION** — transcripts, stakeholders, legal answers — so it lands
   in Salesforce, not someone's inbox.
3. **Log real activity.** Verified beats claimed.
4. **Never skip the privacy gate** on sensitive tooling.
5. **Biometrics are a last resort**, and integration changes the risk picture.
