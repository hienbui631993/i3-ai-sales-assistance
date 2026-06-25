# VISION technical spec for Layer 2 and Layer 3

## Purpose
This spec defines the first production build for VISION inside iHost.

The goal is to create:
- Layer 2: core entry points and workflow routing
- Layer 3: orchestrator logic that decides what happens next

This version assumes:
- iHost is the main UI
- Salesforce is the CRM source of truth for opportunities
- company data remains owned by i3
- AI supports workflow quality, but rules control progression

---

## 1. Scope for the first build

### In scope
- User roles and access checks
- Entry point routing
- Stage detection
- Required field enforcement
- Orchestrator decision engine
- Agent activation logic
- Structured data capture
- Audit trail
- Simulation ready API contracts

### Out of scope for v1
- Full ZoomInfo live integration
- Full 6sense live integration
- Live LinkedIn scraping
- Full PM execution engine
- Full legal document generation
- Production forecasting model

---

## 2. Layer 2: core entry points

### Supported entry points
1. Dashboard
2. Admin setup
3. New lead
4. Existing opportunity
5. Presentation transcript upload
6. New POC handoff
7. Legal review trigger

### Entry point purpose

#### Dashboard
Default landing page for reps, managers, and approved partners.
Shows:
- tasks due today
- quota pacing
- active leads
- active presentations
- active POCs
- blockers

#### Admin setup
Used by admin or leadership to create and configure a rep profile.
Captures:
- rep identity
- segment
- territory
- manager
- annual targets
- permissions

#### New lead
Creates a new company-owned lead record in VISION.
Captures:
- account name
- segment
- region
- source
- initial intent data

#### Existing opportunity
Loads an existing Salesforce or iHost opportunity.
Used when deal context already exists.

#### Presentation transcript upload
Creates or updates a presentation stage record.
Used to:
- summarize meeting content
- detect likely use case
- generate POC draft inputs

#### New POC handoff
Creates a POC draft and routes it to PM handoff preparation.
Requires:
- use case
- site
- stakeholders
- success metrics
- blockers

#### Legal review trigger
Starts privacy and legal review workflow.
Triggers when:
- biometrics selected
- facial matching selected
- cross-border data involved
- data residency unclear
- privacy owner unclear

---

## 3. Layer 3: orchestrator logic

### Core responsibility
The orchestrator decides:
- who is using the system
- what stage they are in
- what data exists already
- what is missing
- which agent to activate
- which next steps are required

### Core principle
Rules determine progression.
AI improves recommendations and output quality.

### Inputs to orchestrator
- user role
- user permissions
- entry point
- account id
- opportunity id
- current stage
- segment
- region
- uploaded files or transcript
- selected solution types
- required field completion status
- risk triggers

### Outputs from orchestrator
- active agent
- current stage
- missing required fields
- recommended next actions
- escalation flags
- save instructions
- downstream system updates

---

## 4. Roles and permissions

### Roles
- Admin
- Sales Rep
- Manager
- PM
- Partner

### Example permissions

#### Admin
- create rep profile
- edit assignments
- set goals
- assign access
- view all records

#### Sales Rep
- view own dashboard
- create leads
- upload transcript
- create POC draft
- run legal check
- view own pipeline

#### Manager
- view team dashboard
- review coaching alerts
- approve progression checkpoints
- review rep performance

#### PM
- receive approved POC handoff
- view implementation fields
- update POC execution status

#### Partner
- limited access only
- presentation agent
- legal agent if enabled
- no access to internal performance data

---

## 5. Required fields by stage

### Dashboard
No required fields. Read only aggregation.

### Admin setup
Required:
- employee_name
- role
- segment
- territory
- annual_goal
- manager_id

### Onboarding
Required:
- experience_level
- onboarding_week
- readiness_score or reflection input
- linkedin_profile_url

### Prospecting
Required:
- account_name
- segment
- region
- problem_statement
- intent_summary
- suggested_buying_group

### Presentation
Required:
- audience_summary
- meeting_goal
- objections
- transcript_or_notes

### POC
Required:
- site_name
- success_metrics
- duration_days
- stakeholder_list
- primary_supporter
- blocker_summary

### Legal and privacy
Required:
- jurisdiction
- purpose
- identifies_people
- biometrics_flag
- profiling_flag
- signage_status
- data_residency
- privacy_owner_status

### Closing
Required:
- commercial_goal
- next_commitment
- competitive_risk
- target_close_date

---

## 6. Agent activation matrix

| Stage | Primary agent | Secondary agent |
|---|---|---|
| Onboarding | V-Start | V-Coach |
| Prospecting | V-Target | V-Reach |
| Presentation | V-Present | V-Target |
| POC | V-Prove | PM Agent |
| Legal & Privacy | V-Guard | V-Prove |
| Closing | V-Close | V-Guard |

---

## 7. Routing logic

## 7.1 High level flow
```text
User enters VISION
→ authenticate user
→ load role and permissions
→ detect entry point
→ load related record if present
→ determine stage
→ validate required fields
→ detect triggers and blockers
→ activate agent
→ return screen + actions + missing fields
```

## 7.2 Example decision logic

### Case A: user opens dashboard
```python
def route_dashboard(user):
    if user.role not in ["Admin", "SalesRep", "Manager", "Partner", "PM"]:
        raise AccessDenied()
    return {
        "screen": "dashboard",
        "agent": "orchestrator",
        "actions": [
            "load_tasks",
            "load_pipeline_summary",
            "load_goal_tracking",
            "load_stage_alerts"
        ]
    }
```

### Case B: new lead created
```python
def route_new_lead(user, payload):
    validate_required(payload, ["account_name", "segment", "region"])
    lead_id = save_lead(payload, owner=user.id)
    return {
        "screen": "prospecting",
        "agent": "V-Target",
        "record_id": lead_id,
        "actions": [
            "suggest_buying_group",
            "score_intent",
            "recommend_next_day_action"
        ]
    }
```

### Case C: presentation transcript uploaded
```python
def route_transcript(user, opportunity_id, transcript_text):
    validate_required({"transcript_text": transcript_text}, ["transcript_text"])
    save_transcript(opportunity_id, transcript_text, owner=user.id)
    return {
        "screen": "presentation",
        "agent": "V-Present",
        "actions": [
            "summarize_transcript",
            "extract_use_case",
            "extract_stakeholders",
            "suggest_poc_button"
        ]
    }
```

### Case D: generate POC draft
```python
def route_generate_poc(user, opportunity_id):
    data = load_opportunity_context(opportunity_id)
    missing = missing_fields(data, [
        "site_name",
        "success_metrics",
        "stakeholder_list"
    ])
    if missing:
        return {
            "screen": "poc",
            "agent": "V-Prove",
            "missing_fields": missing,
            "actions": ["prompt_for_missing_fields"]
        }
    return {
        "screen": "poc",
        "agent": "V-Prove",
        "actions": [
            "generate_poc_draft",
            "prepare_pm_handoff"
        ]
    }
```

### Case E: legal trigger
```python
def route_legal_review(user, payload):
    trigger = (
        payload.get("biometrics_flag") is True or
        payload.get("facial_matching_flag") is True or
        payload.get("cross_border_flag") is True
    )
    if not trigger:
        return {
            "screen": "legal_privacy",
            "agent": "V-Guard",
            "actions": ["run_standard_review"]
        }
    return {
        "screen": "legal_privacy",
        "agent": "V-Guard",
        "actions": [
            "calculate_risk",
            "generate_required_next_steps",
            "set_escalation_flag"
        ]
    }
```

---

## 8. Suggested data model

## 8.1 Users
```json
{
  "id": "usr_123",
  "name": "Avery Chen",
  "role": "SalesRep",
  "manager_id": "usr_200",
  "segment": "Grocery",
  "territory": "Quebec and Atlantic Canada",
  "annual_goal": 4500000,
  "permissions": ["dashboard", "leads", "presentation", "poc", "legal"]
}
```

## 8.2 Accounts
```json
{
  "id": "acc_001",
  "name": "Metro Quebec",
  "segment": "Grocery",
  "region": "Quebec, Canada",
  "source": "6sense",
  "owner_user_id": "usr_123"
}
```

## 8.3 Opportunities
```json
{
  "id": "opp_001",
  "account_id": "acc_001",
  "stage": "Presentation",
  "objective": "Validate privacy ready pilot",
  "pipeline_value": 250000,
  "close_target_date": "2026-06-30",
  "salesforce_id": "006..."
}
```

## 8.4 Stakeholders
```json
{
  "id": "stk_001",
  "opportunity_id": "opp_001",
  "name": "Chris Lytwtn",
  "title": "IT Director",
  "email": "chris@example.com",
  "support_level": "supporter"
}
```

## 8.5 Presentation records
```json
{
  "id": "pre_001",
  "opportunity_id": "opp_001",
  "audience_summary": "VP AP, Director Ops, IT Director",
  "meeting_goal": "Secure scoped pilot",
  "transcript_text": "...",
  "summary_text": "...",
  "use_case_tags": ["ORC", "privacy", "pilot"]
}
```

## 8.6 POC drafts
```json
{
  "id": "poc_001",
  "opportunity_id": "opp_001",
  "site_name": "Toronto terminal",
  "duration_days": 45,
  "success_metrics": [
    "incident capture",
    "safety reporting",
    "operator adoption"
  ],
  "blockers": ["scope approval"],
  "status": "draft"
}
```

## 8.7 Legal review records
```json
{
  "id": "leg_001",
  "opportunity_id": "opp_001",
  "jurisdiction": "Quebec, Canada",
  "purpose": "loss prevention",
  "biometrics_flag": true,
  "profiling_flag": true,
  "signage_status": "Needs update",
  "risk_score": 8,
  "risk_level": "High",
  "decision": "Escalate before POC approval"
}
```

## 8.8 Audit log
```json
{
  "id": "aud_001",
  "entity_type": "Opportunity",
  "entity_id": "opp_001",
  "action": "generate_poc_draft",
  "user_id": "usr_123",
  "timestamp": "2026-04-15T14:30:00Z",
  "notes": "Generated by V-Prove"
}
```

---

## 9. Suggested API endpoints

## Auth and user context
- `GET /api/me`
- `GET /api/users/{id}`
- `POST /api/users`
- `PATCH /api/users/{id}`

## Dashboard
- `GET /api/dashboard`
- `GET /api/dashboard/tasks`
- `GET /api/dashboard/pipeline`
- `GET /api/dashboard/alerts`

## Leads and accounts
- `POST /api/leads`
- `GET /api/leads/{id}`
- `POST /api/accounts`
- `GET /api/accounts/{id}`
- `POST /api/accounts/{id}/intent-score`
- `POST /api/accounts/{id}/suggest-buying-group`

## Opportunities
- `POST /api/opportunities`
- `GET /api/opportunities/{id}`
- `PATCH /api/opportunities/{id}`
- `POST /api/opportunities/{id}/route`

## Presentation
- `POST /api/opportunities/{id}/transcripts`
- `POST /api/opportunities/{id}/presentation/analyze`
- `POST /api/opportunities/{id}/presentation/extract-stakeholders`

## POC
- `POST /api/opportunities/{id}/poc-draft`
- `PATCH /api/poc-drafts/{id}`
- `POST /api/poc-drafts/{id}/validate`
- `POST /api/poc-drafts/{id}/handoff-pm`

## Legal and privacy
- `POST /api/opportunities/{id}/legal-review`
- `POST /api/legal-reviews/{id}/risk-score`
- `POST /api/legal-reviews/{id}/next-steps`

## Orchestrator
- `POST /api/orchestrator/route`
- `POST /api/orchestrator/next-action`
- `POST /api/orchestrator/validate-stage`

## Sync
- `POST /api/salesforce/sync/opportunity/{id}`
- `POST /api/salesforce/sync/account/{id}`

---

## 10. Example orchestrator request
```json
{
  "user_id": "usr_123",
  "entry_point": "presentation_transcript_upload",
  "opportunity_id": "opp_001",
  "payload": {
    "transcript_text": "Customer wants fewer disconnected systems and a pilot that proves value.",
    "segment": "Grocery",
    "region": "Quebec, Canada"
  }
}
```

## Example orchestrator response
```json
{
  "screen": "presentation",
  "stage": "Presentation",
  "agent": "V-Present",
  "missing_fields": ["meeting_goal", "stakeholder_list"],
  "actions": [
    "summarize_transcript",
    "extract_use_case",
    "prompt_for_missing_fields",
    "offer_generate_poc_button"
  ],
  "alerts": [],
  "save_targets": ["iHost", "Salesforce"]
}
```

---

## 11. Suggested frontend component structure

```text
/components
  Dashboard.tsx
  AdminSetup.tsx
  OnboardingPanel.tsx
  ProspectingPanel.tsx
  PresentationPanel.tsx
  POCDraftPanel.tsx
  LegalReviewPanel.tsx
  ClosingPanel.tsx
  StakeholderTable.tsx
  MissingFieldsBanner.tsx
  AgentVoicePanel.tsx

/lib
  orchestratorClient.ts
  validation.ts
  permissions.ts
  salesforceClient.ts
  auditLogger.ts
```

---

## 12. Suggested backend service structure

```text
/services
  auth_service.py
  orchestrator_service.py
  stage_validation_service.py
  lead_intelligence_service.py
  transcript_service.py
  poc_service.py
  legal_review_service.py
  sync_service.py
  audit_service.py
```

---

## 13. Build order

### Sprint 1
- auth
- user roles
- dashboard shell
- admin setup
- orchestrator route endpoint
- stage validation service

### Sprint 2
- new lead entry point
- prospecting flow
- buying group suggestion logic
- transcript upload flow

### Sprint 3
- POC generation flow
- stakeholder capture
- PM handoff prep
- Salesforce sync for core fields

### Sprint 4
- legal review flow
- risk scoring rules
- blocker alerts
- manager visibility

---

## 14. Non-negotiable controls
- every write action is audited
- every record is company-owned
- required fields block stage progression when missing
- partners see only approved modules
- Salesforce sync is additive and traceable
- AI outputs never bypass validation rules

---

## 15. Final implementation principle
Build Layer 2 and Layer 3 as a controlled workflow engine first.
Then connect AI to improve:
- summaries
- talk tracks
- suggestions
- draft generation
- next best actions

Do not let AI define the workflow.
Let AI strengthen the workflow.

