# NyayaSetu — Online Arbitration & Dispute Resolution Platform

An end-to-end ODR platform for the Indian market that automates the entire arbitration lifecycle — from filing to award — with integrated virtual hearings, document management, and government court integration.

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
├── prototype/                         # Working HTML/React prototype
│   ├── index.html                     # Entry point (React 18 + Babel CDN)
│   ├── styles.css                     # Full UI styling
│   ├── mockData.js                    # Mock cases, arbitrators, hearings, templates
│   ├── components.js                  # Dashboard, Cases, Case Detail, Filing Wizard, Template Picker & Editor
│   ├── components2.js                 # Arbitrator Marketplace, Onboarding, Hearings, Hearing Room, Awards
│   └── app.js                         # Main app shell with routing & role switcher
└── README.md
```

## Running the Prototype

```bash
cd legal/prototype && python3 -m http.server 8080
# Open http://localhost:8080
```

### Prototype Features
- **Dashboard** — Stats, recent cases, upcoming hearings, notifications
- **Case Filing** — 4-step wizard with auto fee calculation (Section 21 compliant)
- **Case Detail** — Tabbed view: Overview, Documents, Hearings, Timeline
- **Document Templates** — 9 predefined legal templates (Arbitration Notice, Statement of Claim/Defence, Interim Relief, etc.) with section-wise AI content generation
- **Arbitrator Marketplace** — Search, filter by domain, view profiles, appoint
- **Arbitrator Onboarding** — 4-step registration with KYC & credential upload
- **Virtual Hearing Room** — Video tiles, recording indicator, mute/camera controls, live transcript
- **Awards & Court Filings** — Award list, Section 34/36 court filing tracker
- **Role Switcher** — Toggle Claimant / Arbitrator / Institution views

## Quick Links

- [Product Requirements](docs/01-product-requirements.md)
- [User Personas](docs/02-user-personas.md)
- [Workflows](docs/03-workflows.md)
- [Integrations](docs/04-integrations.md)
- [Legal Compliance](docs/05-legal-compliance.md)
- [Tech Architecture](docs/06-tech-architecture.md)
