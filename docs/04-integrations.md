# Integrations

## 1. Government Court e-Filing

### Target Courts (Phase-wise)

| Phase | Court | System | Integration Method |
|-------|-------|--------|--------------------|
| Phase 2 | Delhi High Court | e-Filing portal | API / Selenium bridge |
| Phase 2 | Bombay High Court | e-Filing portal | API / Selenium bridge |
| Phase 3 | Supreme Court of India | SCI e-Filing | API |
| Phase 3 | NCLT | MCA21 e-Filing | API |
| Phase 3 | District Courts (select) | eCourts | NIC eCourts API |

### Integration Scope
- File Section 34 (setting aside) applications with auto-filled petition
- File Section 36 (enforcement) applications
- File Section 11 (arbitrator appointment) applications
- Track case status in court post-filing
- Receive court orders and upload to platform case file

### Data Exchange Format
- Petition: PDF with embedded metadata (XML sidecar)
- Supporting documents: Indexed PDF bundle
- Digital signatures: DSC Class 3 or Aadhaar eSign
- Court fee: Online payment via court's payment gateway

---

## 2. Identity & KYC

| Service | Purpose | API |
|---------|---------|-----|
| Aadhaar eKYC | Arbitrator identity verification | UIDAI eKYC (via licensed ASA) |
| PAN Verification | Tax identity for invoicing | NSDL PAN API |
| Bar Council | Advocate enrollment verification | Manual + scraping (no public API) |
| DigiLocker | Pull verified certificates | DigiLocker Partner API |

---

## 3. Digital Signatures

| Method | Use Case | Provider |
|--------|----------|----------|
| Aadhaar eSign | Parties signing submissions | Licensed ESP (e.g., NSDL, eMudhra) |
| DSC Class 3 | Arbitrator signing awards | eMudhra / Sify / CDAC |
| Platform signature | Document integrity hash | Internal PKI |

### Legal Validity
- Aadhaar eSign is valid under Section 3A of IT Act 2000
- DSC is valid under Section 3 of IT Act 2000
- Both accepted by Indian courts for arbitration documents

---

## 4. Payment Gateway

| Provider | Purpose |
|----------|---------|
| Razorpay | Filing fees, arbitrator fees, escrow |
| PayU | Backup gateway |
| NEFT/RTGS | High-value arbitrator fee transfers |

### Payment Flows
1. Filing fee: Claimant → Platform (immediate)
2. Arbitrator fee: Both parties → Escrow → Arbitrator (released on milestones)
3. Institutional admin fee: Parties → Institution (via platform)
4. Refunds: Platform → Party (on case withdrawal / settlement)

---

## 5. Communication

| Channel | Provider | Use Case |
|---------|----------|----------|
| Email | AWS SES / SendGrid | All notifications, document service |
| SMS | MSG91 / Twilio | Hearing reminders, deadline alerts |
| WhatsApp | WhatsApp Business API | Case status bot, hearing links |
| In-app | WebSocket (native) | Real-time messaging, tribunal orders |

### Notification Matrix

| Event | Email | SMS | WhatsApp | In-app |
|-------|-------|-----|----------|--------|
| Case filed | ✅ | ✅ | ✅ | ✅ |
| Document uploaded | ✅ | ❌ | ❌ | ✅ |
| Hearing scheduled | ✅ | ✅ | ✅ | ✅ |
| Hearing reminder (1hr) | ❌ | ✅ | ✅ | ✅ |
| Deadline approaching | ✅ | ✅ | ✅ | ✅ |
| Award published | ✅ | ✅ | ✅ | ✅ |
| Payment due | ✅ | ✅ | ❌ | ✅ |

---

## 6. Video Conferencing

### Build vs Buy Decision

**Recommendation: Build on WebRTC with a managed SFU**

| Option | Pros | Cons |
|--------|------|------|
| 100ms.live | India-based, low latency, recording built-in | Vendor lock-in |
| LiveKit (self-hosted) | Open source, full control, no per-minute cost | Ops overhead |
| Daily.co | Simple API, good recording | US-based, latency concerns |
| Custom WebRTC + Janus | Maximum control | High dev effort |

**Chosen: 100ms.live (Phase 1) → LiveKit self-hosted (Phase 3)**

### Requirements
- Recording with server-side composition
- RTMP output for archival
- Breakout rooms for private caucus
- Bandwidth adaptive streaming
- India-region media servers (mandatory for latency)

---

## 7. Storage & Document Processing

| Service | Purpose |
|---------|---------|
| AWS S3 (Mumbai) | Document storage (encrypted, versioned) |
| AWS Textract / Google Document AI | OCR for scanned documents |
| LibreOffice (server) | PDF conversion from Word/Excel uploads |
| ElasticSearch | Full-text search across case documents |

---

## 8. Future Integrations (Phase 3+)

- NITI Aayog ODR framework (when published)
- RBI ODR guidelines for financial disputes
- Insurance regulatory (IRDAI) for insurance arbitration
- MSME Samadhaan portal for MSME disputes
- International arbitration institutions (SIAC, ICC) for cross-border cases
