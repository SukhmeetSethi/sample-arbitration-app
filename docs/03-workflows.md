# Core Workflows

## Workflow 1: Case Filing & Initiation

```
Claimant                    Platform                      Respondent
   │                           │                              │
   ├── Register / Login ──────►│                              │
   ├── Select dispute type ───►│                              │
   ├── Upload arbitration      │                              │
   │   clause / agreement ────►│                              │
   ├── Fill claim details ────►│                              │
   │   (parties, value, facts) │                              │
   ├── Upload supporting docs ►│                              │
   ├── Pay filing fee ────────►│                              │
   │                           ├── Validate & create case ───►│
   │                           ├── Generate case number       │
   │                           ├── Send arbitration notice ──►│
   │                           │   (email + SMS + platform)   │
   │                           │                              │
   │                           │◄── Respondent registers ─────┤
   │                           │◄── Files response / counter ─┤
   │                           │    claim within 30 days      │
   │                           │                              │
```

### Key Rules
- Filing fee auto-calculated based on dispute value slab
- Arbitration notice compliant with Section 21 of A&C Act 1996
- 30-day response window with automated reminders at Day 7, 15, 25
- If respondent doesn't respond, platform records default and proceeds

---

## Workflow 2: Arbitrator Appointment

```
                        Platform
                           │
   ┌───────────────────────┼───────────────────────┐
   │                       │                       │
   ▼                       ▼                       ▼
Party-Agreed           Institution-             Court-Referred
Arbitrator             Appointed                (Section 11)
   │                       │                       │
   ├─ Both parties name    ├─ Institution selects  ├─ Platform generates
   │  agreed arbitrator    │  from verified panel  │  Section 11 application
   │                       │  based on domain,     │  for court filing
   ├─ Platform sends       │  availability, value  │
   │  appointment request  │                       ├─ Tracks court order
   │                       ├─ Conflict check       │
   ├─ Arbitrator accepts   │  (Fifth Schedule)     ├─ Onboards court-
   │  / declines           │                       │  appointed arbitrator
   │                       ├─ Disclosure statement │
   ├─ Disclosure filed     │  generated            │
   │  (Section 12)         │                       │
   │                       ├─ Parties can challenge│
   └───────┬───────────────┴───────────┬───────────┘
           │                           │
           ▼                           ▼
     Tribunal Constituted        Challenge Process
     (Sole / 3-member)          (Section 13 workflow)
```

### Key Rules
- Conflict-of-interest check against Fifth & Seventh Schedule
- 15-day window for parties to challenge arbitrator appointment
- If 3-member tribunal: each party appoints one, two appointees select presiding
- Fee agreement auto-generated based on arbitrator's published schedule

---

## Workflow 3: Pre-Hearing & Pleadings

```
Timeline (from tribunal constitution):

Day 0    ── Tribunal constituted
Day 1-7  ── First procedural order issued (hearing schedule, timelines)
Day 7-30 ── Statement of Claim filed by Claimant
Day 30-60── Statement of Defence filed by Respondent
Day 45-75── Rejoinder by Claimant (if permitted)
Day 60-90── Sur-rejoinder by Respondent (if permitted)
Day 75+  ── Document production requests & compliance
```

### Platform Actions at Each Stage
- Auto-generate procedural order template for arbitrator
- Deadline tracker with countdown timers on dashboard
- Document filing with automatic service to all parties
- Objection workflow for disputed documents
- Section 17 interim relief application (if needed)

---

## Workflow 4: Virtual Hearing

```
Pre-Hearing                  During Hearing              Post-Hearing
    │                             │                          │
    ├─ Schedule hearing           ├─ Waiting room            ├─ Recording saved
    │  (arbitrator sets date)     │  (identity check)        │  with SHA-256 hash
    │                             │                          │
    ├─ Send calendar invites      ├─ Main hearing room       ├─ Transcript generated
    │  (all parties + tribunal)   │  (video + audio +        │  (auto + manual edit)
    │                             │   screen share)           │
    ├─ Upload hearing bundle      │                          ├─ Orders / directions
    │  (indexed documents)        ├─ Exhibit presentation    │  uploaded by tribunal
    │                             │  (real-time markup)      │
    ├─ Tech check (optional)      │                          ├─ Next hearing date
    │                             ├─ Breakout rooms          │  scheduled
    │                             │  (private caucus)        │
    │                             │                          │
    │                             ├─ Live transcription      │
    │                             │  (Hindi + English)       │
    │                             │                          │
    │                             ├─ Objection recording     │
    │                             │  (timestamped)           │
```

### Hearing Types Supported
1. Oral hearing (full video)
2. Documents-only proceeding (no video, written submissions)
3. Hybrid (some parties in person, some virtual — future phase)

### Technical Requirements
- Max 20 participants per hearing room
- Recording in MP4 + separate audio track
- Bandwidth adaptive: auto-downgrades video quality on poor connections
- Mobile-friendly for parties joining from phones

---

## Workflow 5: Award & Post-Award

```
Arbitrator                  Platform                    Parties
    │                          │                           │
    ├─ Draft award in          │                           │
    │  workspace (clause       │                           │
    │  library + templates)    │                           │
    │                          │                           │
    ├─ Upload final award ────►│                           │
    │  (digitally signed)      │                           │
    │                          ├─ Verify digital signature │
    │                          ├─ Timestamp award          │
    │                          ├─ Notify parties ─────────►│
    │                          │                           │
    │                          │                           ├─ Download award
    │                          │                           │
    │                          │   ┌─── Accept ◄───────────┤
    │                          │   │                       │
    │                          │   ├─── Challenge ◄────────┤
    │                          │   │    (Section 34)       │
    │                          │   │    within 3 months    │
    │                          │   │                       │
    │                          │   └─── Enforce ◄──────────┤
    │                          │        (Section 36)       │
    │                          │                           │
    │                          ├─ Generate court filing ───►│
    │                          │  (auto-fill petition)     │
    │                          │                           │
    │                          ├─ e-File with court ──────►│ (Court)
    │                          │  (via integration API)    │
```

### Key Rules
- Award must be in writing and signed (Section 31)
- Reasoned award required unless parties agree otherwise
- 3-month limitation for Section 34 challenge (+ 30 days condonable)
- Platform archives award for 10 years minimum

---

## Workflow 6: Document Template & AI-Assisted Drafting

```
User                        Platform                     AI Engine
 │                             │                             │
 ├─ Open case Documents tab ──►│                             │
 │                             │                             │
 ├─ Click "New from Template" ►│                             │
 │                             ├─ Show template picker       │
 │                             │  (9 templates, filterable   │
 │                             │   by category)              │
 │                             │                             │
 ├─ Select template ──────────►│                             │
 │                             ├─ Open template editor       │
 │                             │  (structured sections       │
 │                             │   with hints)               │
 │                             │                             │
 │  ┌── Option A: Manual ──────┤                             │
 │  │   Paste / type content   │                             │
 │  │   into each section      │                             │
 │  │                          │                             │
 │  ├── Option B: AI per       │                             │
 │  │   section ──────────────►├─ Send section context ─────►│
 │  │                          │                             │
 │  │                          │◄── AI-generated draft ──────┤
 │  │                          │    (case details auto-      │
 │  │                          │     filled, legal refs)     │
 │  │                          │                             │
 │  └── Option C: AI fill all ►├─ Batch generate all ───────►│
 │      empty sections         │   empty sections            │
 │                             │                             │
 ├─ Review & edit content ────►│                             │
 ├─ Save Draft ───────────────►│                             │
 ├─ Submit to Case File ──────►│                             │
 │                             ├─ Add to case documents      │
 │                             ├─ Notify other parties       │
```

### Available Templates

| Category | Template | Sections |
|----------|----------|----------|
| Filing | Arbitration Notice (Section 21) | 6 |
| Pleading | Statement of Claim (Section 23) | 6 |
| Pleading | Statement of Defence (Section 23) | 5 |
| Pleading | Rejoinder | 4 |
| Application | Interim Relief (Section 17) | 5 |
| Submission | Written Submissions / Arguments | 4 |
| Court Filing | Section 34 — Setting Aside | 5 |
| Court Filing | Section 36 — Enforcement | 4 |
| Arbitrator | Conflict of Interest Disclosure (Section 12) | 5 |

### AI Content Generation
- Generates legally structured drafts referencing applicable A&C Act provisions
- Auto-fills case-specific data: party names, dates, dispute value, case ID
- Each section can be independently generated or regenerated
- Content is always editable — AI provides a starting point, not a final draft
- Contextual hints guide users on what each section should contain

---

## Workflow 7: Arbitrator Onboarding

```
Arbitrator                  Platform                    Admin
    │                          │                           │
    ├─ Self-register ─────────►│                           │
    │  (basic profile)         │                           │
    │                          │                           │
    ├─ Upload credentials ────►│                           │
    │  - Bar Council ID        │                           │
    │  - Aadhaar / PAN         │                           │
    │  - CV / past awards      │                           │
    │  - Domain expertise      │                           │
    │  - Fee schedule          │                           │
    │                          ├─ KYC verification ───────►│
    │                          │  (Aadhaar eKYC API)       │
    │                          │                           │
    │                          │◄── Manual review ─────────┤
    │                          │    (credentials check)    │
    │                          │                           │
    │◄── Approved / Rejected ──┤                           │
    │                          │                           │
    ├─ Set availability ──────►│                           │
    │  calendar                │                           │
    │                          │                           │
    ├─ Listed on marketplace ──┤                           │
    │  (searchable by domain,  │                           │
    │   location, fee range)   │                           │
```

### Verification Levels
1. Basic — Email + phone verified (can receive appointments but not listed publicly)
2. Verified — KYC + Bar Council ID confirmed (listed on marketplace)
3. Premium — Past awards reviewed + institution endorsement (featured listing)
