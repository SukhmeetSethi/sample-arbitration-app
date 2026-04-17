# Legal Compliance — Indian Framework

## 1. Primary Legislation

### Arbitration and Conciliation Act, 1996 (as amended 2015, 2019, 2021)

| Section | Relevance | Platform Implementation |
|---------|-----------|------------------------|
| Section 7 | Arbitration agreement must be in writing | Upload & validate arbitration clause at filing |
| Section 11 | Appointment of arbitrators | Workflow for party-agreed, institution, and court referral |
| Section 12 | Grounds for challenge; disclosure | Auto-generate disclosure form (Fifth/Seventh Schedule) |
| Section 13 | Challenge procedure | In-platform challenge workflow with timelines |
| Section 17 | Interim measures by tribunal | Application template + order workflow |
| Section 18 | Equal treatment of parties | Audit trail: equal access to documents, equal hearing time |
| Section 19 | Rules of procedure | Configurable procedural rules per institution |
| Section 21 | Commencement of proceedings | Auto-generate compliant arbitration notice |
| Section 23 | Statements of claim and defence | Templates with mandatory fields per statute |
| Section 24 | Hearings and written proceedings | Virtual hearing engine with recording |
| Section 25 | Default of a party | Automated default recording if party fails to appear/respond |
| Section 29A | Time limit for award (12 months, extendable by 6) | Countdown timer, extension request workflow |
| Section 31 | Form and contents of award | Award template with mandatory sections |
| Section 34 | Setting aside of award | Auto-generate court application |
| Section 36 | Enforcement of award | Auto-generate enforcement petition |

### Key 2021 Amendment Impacts
- Section 42A: Confidentiality of proceedings — platform must enforce access controls
- Section 43D: Qualifications of arbitrators (Eighth Schedule) — verify during onboarding
- Automatic stay on Section 34 application removed — enforcement can proceed in parallel

---

## 2. Information Technology Act, 2000

| Provision | Relevance | Implementation |
|-----------|-----------|----------------|
| Section 3 | Digital signatures (DSC) | Award signing by arbitrators |
| Section 3A | Electronic signatures (Aadhaar eSign) | Party document signing |
| Section 43A | Data protection (reasonable security) | Encryption, access controls, audit logs |
| Section 65B | Admissibility of electronic records | Hearing recordings with certificate of authenticity |
| Section 72A | Breach of confidentiality | Data handling policies, NDA for platform staff |

### Section 65B Compliance for Recordings
Every hearing recording must be accompanied by a certificate stating:
1. The recording was produced by the platform during the hearing
2. The device/system was operating properly
3. The SHA-256 hash of the recording for integrity verification
4. Signed by a responsible person (platform officer or arbitrator)

---

## 3. Digital Personal Data Protection Act, 2023 (DPDPA)

| Requirement | Implementation |
|-------------|----------------|
| Consent | Explicit consent at registration; granular consent for data processing |
| Purpose limitation | Data used only for arbitration proceedings |
| Data minimization | Collect only what's necessary for the case |
| Storage limitation | Case data retained for 10 years (legal requirement), then anonymized |
| Data principal rights | Right to access, correct, erase (subject to legal retention) |
| Data fiduciary obligations | Appoint DPO, maintain processing records |
| Cross-border transfer | Data stays in India (AWS/GCP Mumbai region) |
| Breach notification | Notify DPBI within 72 hours of breach |

---

## 4. Indian Evidence Act, 1872 (Bharatiya Sakshya Adhiniyam, 2023)

| Provision | Relevance |
|-----------|-----------|
| Section 63 (old) / Section 57 (new) | Admissibility of electronic records |
| Section 65B (old) / Section 61 (new) | Certificate for electronic evidence |

Platform must ensure all documents and recordings can be produced as admissible evidence in court proceedings.

---

## 5. Consumer Protection Act, 2019

Relevant for consumer disputes that may be arbitrated:
- E-commerce disputes with arbitration clauses
- Platform must not create unfair arbitration terms
- Consumer's right to approach Consumer Forum preserved

---

## 6. Compliance Checklist for Platform Operations

### Data & Privacy
- [ ] Privacy policy published and accessible
- [ ] Cookie consent mechanism
- [ ] Data Processing Agreement (DPA) with all vendors
- [ ] Data stored exclusively in India
- [ ] Encryption at rest (AES-256) and in transit (TLS 1.3)
- [ ] Annual security audit by CERT-IN empanelled auditor

### Arbitration Process
- [ ] All statutory timelines enforced via automated alerts
- [ ] Equal access to documents for all parties verified
- [ ] Conflict-of-interest checks automated
- [ ] Award format compliant with Section 31
- [ ] Confidentiality of proceedings enforced (Section 42A)

### Financial
- [ ] GST registration and compliant invoicing
- [ ] TDS deduction on arbitrator fees (Section 194J)
- [ ] Escrow account with RBI-compliant payment aggregator
- [ ] Anti-money laundering (AML) checks for high-value disputes

### Accessibility
- [ ] Platform accessible to persons with disabilities (RPwD Act 2016)
- [ ] Multi-language support for official Indian languages
- [ ] Low-bandwidth mode for rural users
