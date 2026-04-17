# NyayaSetu — Product Requirements Document

## 1. Vision

NyayaSetu ("Bridge to Justice") is an Online Dispute Resolution (ODR) platform that digitizes and automates the entire arbitration lifecycle under Indian law — from case filing through final award and court enforcement. It serves claimants, respondents, advocates, private arbitrators, and institutional arbitration centres.

## 2. Problem Statement

- Indian courts have 50M+ pending cases; arbitration is a faster alternative but still paper-heavy.
- No unified platform exists that covers filing → hearing → award → court enforcement digitally.
- Private arbitrators lack a marketplace to get discovered and manage their caseload.
- Parties struggle with scheduling, document exchange, and compliance timelines.

## 3. Goals

| Goal | Metric |
|------|--------|
| Reduce case resolution time | < 90 days for fast-track, < 180 days for regular |
| Digitize 100% of arbitration paperwork | Zero physical filings required |
| Onboard 500+ private arbitrators in Year 1 | Verified panel size |
| Integrate with at least 5 High Court e-filing systems | Court API connections |
| Achieve 95%+ hearing attendance rate | Virtual hearing completion |

## 4. Core Modules

### 4.1 Case Filing & Management
- Online filing of arbitration notice (Section 21, A&C Act 1996)
- Auto-generation of Statement of Claim / Defence templates
- Document upload with e-signature (Aadhaar eSign / DSC)
- Case timeline tracker with statutory deadline alerts
- Fee calculator based on dispute value (as per arbitral institution schedules)

### 4.2 Arbitrator Marketplace & Onboarding
- Self-registration portal for private arbitrators
- Profile: qualifications, domain expertise, years of experience, fee schedule, availability calendar
- Verification pipeline: Bar Council ID, Aadhaar KYC, past award samples
- Rating & review system (post-award, anonymized)
- Institutional panel management for arbitration centres
- Conflict-of-interest disclosure workflow (Section 12, Fifth/Seventh Schedule)

### 4.3 Virtual Hearing Engine
- Integrated video conferencing (WebRTC-based)
- Screen sharing & real-time document presentation
- Recording with tamper-proof hashing (SHA-256) for evidentiary value
- Waiting room, breakout rooms for private caucus
- Live transcription (Hindi + English) with speaker identification
- Hearing scheduling with calendar sync (Google / Outlook)

### 4.4 Document Management System
- Structured case file with indexed bundles
- Version control on all submissions
- Access control: party-specific, arbitrator-only, tribunal-only views
- Bulk download as paginated PDF with table of contents
- Digital exhibit marking and cross-referencing
- **Predefined Document Templates** — 9 templates covering the full arbitration lifecycle:
  - Filing: Arbitration Notice (Section 21)
  - Pleadings: Statement of Claim (Section 23), Statement of Defence, Rejoinder
  - Applications: Interim Relief (Section 17)
  - Submissions: Written Submissions / Arguments
  - Court Filings: Section 34 (Setting Aside), Section 36 (Enforcement)
  - Arbitrator: Conflict of Interest Disclosure (Section 12)
- Each template has structured sections with contextual hints
- **AI-Assisted Content Generation** — per-section or bulk AI drafting that:
  - Auto-fills case-specific details (parties, dates, dispute value)
  - Generates legally structured content referencing applicable A&C Act provisions
  - Provides editable drafts as a starting point for customization
- Users can also paste/type content directly into any section

### 4.5 Award & Enforcement
- Award drafting workspace with clause library
- Digital signing of award by arbitrator(s)
- Auto-generation of Section 34 / Section 36 application templates
- Integration with court e-filing for enforcement petitions
- Award repository with search (anonymized for public, full for parties)

### 4.6 Communication & Notifications
- In-platform secure messaging (party ↔ tribunal)
- Email + SMS + WhatsApp notifications for deadlines and hearing reminders
- Statutory notice delivery tracking with timestamps

### 4.7 Billing & Payments
- Arbitrator fee escrow via Razorpay / PayU
- Split payments: institutional admin fee + arbitrator fee
- GST-compliant invoicing
- Refund workflow for withdrawn cases

## 5. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Availability | 99.9% uptime |
| Data residency | India (AWS Mumbai / GCP Mumbai) |
| Encryption | AES-256 at rest, TLS 1.3 in transit |
| Concurrent hearings | 500+ simultaneous |
| Page load time | < 2 seconds |
| Accessibility | WCAG 2.1 AA |
| Languages | English, Hindi, Marathi, Tamil, Telugu, Kannada, Bengali |

## 6. Release Phases

### Phase 1 — MVP (Months 1–4)
- Case filing & management
- Arbitrator onboarding (manual verification)
- Basic virtual hearings (video + recording)
- Document upload & sharing
- Email/SMS notifications

### Phase 2 — Growth (Months 5–8)
- Arbitrator marketplace with ratings
- Live transcription
- Award drafting workspace
- Payment escrow
- Court e-filing integration (Delhi HC, Bombay HC)

### Phase 3 — Scale (Months 9–12)
- AI-assisted case summarization
- Multi-language transcription
- WhatsApp bot for case status
- API for institutional arbitration centres
- Analytics dashboard for arbitrators & institutions
