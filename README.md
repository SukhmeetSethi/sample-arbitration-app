# NyayaSetu — Online Arbitration & Dispute Resolution Platform

An end-to-end ODR platform for the Indian market that automates the entire arbitration lifecycle — from filing to award — with integrated virtual hearings, document management, AI-assisted drafting, and government court integration.

## Running the Prototype

```bash
cd legal/prototype && python3 -m http.server 8090
# Open http://localhost:8090
```

## Project Structure

```
legal/
├── docs/
│   ├── 01-product-requirements.md    # Detailed PRD
│   ├── 02-user-personas.md           # Target users
│   ├── 03-workflows.md               # Core arbitration workflows
│   ├── 04-integrations.md            # Court & third-party integrations
│   ├── 05-legal-compliance.md        # Indian legal framework compliance
│   └── 06-tech-architecture.md       # System architecture & stack
├── prototype/
│   ├── index.html                     # Entry point (React 18 + Babel CDN)
│   ├── styles.css                     # Full UI styling
│   ├── mockData.js                    # Mock cases, arbitrators, hearings, templates
│   ├── draftTemplates.js             # 19 legal document template definitions (questions, metadata)
│   ├── draftGenerator.js            # AI draft generation engine (full document content)
│   ├── documentWorkflow.js          # Post-filing workflow: sequential docs, PDF preview, reminders
│   ├── respondentFlow.js            # Respondent: notice view, deadline, reply workflow, Section 11 trigger
│   ├── arbitratorPicker.js          # Arbitrator selection: platform browse or external add
│   ├── institutionDashboard.js      # Arbitrator dashboard: AI brief, search, prep, actions, calendar
│   ├── components.js                 # Dashboard, Cases, Case Detail, Filing Wizard, Drafting Engine
│   ├── components2.js                # Arbitrator Marketplace, Onboarding, Hearings, Hearing Room, Awards
│   └── app.js                        # Main app shell with routing & role switcher
└── README.md
```

## Functional Flows

### 1. Claimant Flow — Case Filing to Notice

```
File New Case (4-step wizard)
    ↓
Case Created → Documents Tab opens
    ↓
Post-Filing Document Workflow (sequential checklist):
    ├── [1] Section 21 — Arbitration Notice (AI-prefilled, PDF preview, iterate via prompts)
    ├── [2] Annexures & Supporting Documents (unlocked after notice finalized)
    ├── [3] Section 9 — Interim Measures Application (optional)
    └── [4] Section 11 — Arbitrator Appointment Petition (optional)
    ↓
Propose Arbitrator (pick from platform or add external)
    ↓
Send Notice to Respondent (Email + SMS / WhatsApp / Registered Post)
    ↓
Automated Reminders (Day 10 + Day 20 before 30-day deadline)
```

### 2. Section 11 Trigger — No Response After 30 Days

```
30 days pass without respondent reply
    ↓
Alert on Claimant's Case Overview:
    "⚠️ 30-Day Deadline Expired — No Response from Respondent"
    ↓
One-click: Generate Section 11 Petition
    → AI-prefilled court petition with:
      - Notice date, reminder dates
      - Failure reason (no response despite 2 reminders)
      - Prayer for court-appointed arbitrator
    ↓
File with High Court (e-filing simulation)
```

### 3. Respondent Flow — Notice Receipt to Reply

```
Switch to Respondent role → Open case with pending notice
    ↓
Notice View:
    ├── Deadline countdown (days remaining, urgency colors)
    ├── Full Section 21 Notice in PDF view
    ├── Legal context (consequences of non-response under Section 11)
    └── "Respond to Notice" button
    ↓
Choose Response Type:
    ├── 🤝 Accept & Propose Arbitrator (recommended)
    │       → ArbitratorPicker (platform or external)
    │       → AI generates acceptance + arbitrator proposal
    ├── 🛡️ File Statement of Defence (Section 23)
    │       → AI generates defence with counterclaim
    └── ⚠️ Challenge Jurisdiction (Section 16)
            → AI generates jurisdiction plea
    ↓
Review AI Draft in PDF view + Refine via chat prompts
    ↓
File Response → Claimant notified
```

### 4. Arbitrator / Institution Dashboard

```
Switch to Arbitrator role → Dashboard shows:

┌─────────────────────────────────────────────────────────┐
│ 🤖 AI Weekly Brief                                      │
│   - Personalized summary of the week ahead              │
│   - Key metrics: hearings, pending orders, deadlines    │
│   - Case-by-case narrative with recommendations         │
├─────────────────────────────────────────────────────────┤
│ 🔍 Case Search                                          │
│   - Full-text search by case ID, party, type, status    │
│   - Tabular results with all case metadata              │
├─────────────────────────────────────────────────────────┤
│ 📚 Case Prep AI                                         │
│   - Select a case → Chat with AI                        │
│   - Ask about: key issues, timeline, applicable law,    │
│     hearing preparation, award drafting guidance         │
├─────────────────────────────────────────────────────────┤
│ ⚡ Action Board                                          │
│   - Prioritized tasks (high/medium/low)                 │
│   - Types: Hearings, Orders, Disclosures, Reviews       │
│   - Mark as done                                        │
├─────────────────────────────────────────────────────────┤
│ 📅 Calendar                                             │
│   - Monthly grid with color-coded events                │
│   - Hearings (red), Deadlines (orange), Prep (blue)     │
│   - Upcoming events sidebar                             │
└─────────────────────────────────────────────────────────┘
```

### 5. AI Document Drafting Engine (19 Templates)

Available across all roles with conversational Q&A or full auto-generation:

| Category | Templates |
|----------|-----------|
| Pre-Arbitration | Section 21 Notice, Section 11 Petition, Conciliation Request |
| Applications | Section 9 (Court Interim), Section 17 (Tribunal Interim), Section 13 (Challenge Arbitrator) |
| Pleadings | Statement of Claim (S.23), Statement of Defence, Rejoinder, Sur-Rejoinder |
| Submissions | Written Arguments (S.24), Section 16 Jurisdiction Plea |
| Arbitrator Docs | Section 12 Disclosure, Procedural Order, Arbitral Award (S.31), Section 33 Correction |
| Court Filings | Section 34 (Set Aside), Section 36 (Enforcement) |
| Settlement | Settlement Agreement (S.30) |

### 6. Other Prototype Features

- **Virtual Hearing Room** — Video tiles, recording indicator, mute/camera, live transcript
- **Arbitrator Marketplace** — Search, filter by domain, view profiles, appoint
- **Arbitrator Onboarding** — 4-step registration with KYC & credential upload
- **Awards & Court Filings** — Award list, Section 34/36 court filing tracker
- **Role Switcher** — Toggle Claimant / Respondent / Arbitrator views

## Legal Framework

Built around the **Arbitration and Conciliation Act, 1996** (as amended 2015, 2019, 2021):

- **Section 7** — Arbitration agreement validity
- **Section 9** — Interim measures by court
- **Section 11** — Appointment of arbitrators
- **Section 12** — Grounds for challenge / disclosure
- **Section 16** — Competence of tribunal (jurisdiction)
- **Section 17** — Interim measures by tribunal
- **Section 21** — Commencement of proceedings (notice)
- **Section 23** — Statements of claim and defence
- **Section 29A** — Time limit for award (12 months)
- **Section 30** — Settlement
- **Section 31** — Form and contents of award
- **Section 34** — Setting aside of award
- **Section 36** — Enforcement of award

## Tech Stack (Prototype)

- React 18 (CDN) + Babel in-browser transform
- Pure CSS (no framework)
- No backend — all mock data
- No build step — open `index.html` directly or serve via any HTTP server

## Quick Links

- [Product Requirements](docs/01-product-requirements.md)
- [User Personas](docs/02-user-personas.md)
- [Workflows](docs/03-workflows.md)
- [Integrations](docs/04-integrations.md)
- [Legal Compliance](docs/05-legal-compliance.md)
- [Tech Architecture](docs/06-tech-architecture.md)
