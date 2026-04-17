# Technical Architecture

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │ Web App  │  │ Mobile   │  │ WhatsApp │  │ Court e-File  │  │
│  │ (React)  │  │ (PWA)    │  │ Bot      │  │ Bridge        │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────┬────────┘  │
└───────┼──────────────┼──────────────┼───────────────┼──────────┘
        │              │              │               │
┌───────▼──────────────▼──────────────▼───────────────▼──────────┐
│                     API GATEWAY (Kong / AWS API GW)             │
│              Rate limiting, Auth, Request routing                │
└───────┬──────────────┬──────────────┬───────────────┬──────────┘
        │              │              │               │
┌───────▼──────────────▼──────────────▼───────────────▼──────────┐
│                     APPLICATION LAYER                            │
│                                                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │ Case Service│ │ User Service│ │ Hearing Svc │               │
│  │ (filing,    │ │ (auth, KYC, │ │ (scheduling,│               │
│  │  timeline,  │ │  profiles,  │ │  video,     │               │
│  │  documents) │ │  arbitrator │ │  recording, │               │
│  │             │ │  onboarding)│ │  transcript)│               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
│                                                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐               │
│  │ Award Svc   │ │ Payment Svc │ │ Notification│               │
│  │ (drafting,  │ │ (escrow,    │ │ Service     │               │
│  │  signing,   │ │  invoicing, │ │ (email, SMS,│               │
│  │  enforcement│ │  refunds)   │ │  WhatsApp)  │               │
│  └─────────────┘ └─────────────┘ └─────────────┘               │
│                                                                  │
│  ┌─────────────┐ ┌─────────────┐                                │
│  │ Court       │ │ Search &    │                                │
│  │ Integration │ │ Analytics   │                                │
│  │ Service     │ │ Service     │                                │
│  └─────────────┘ └─────────────┘                                │
└──────────────────────────┬─────────────────────────────────────┘
                           │
┌──────────────────────────▼─────────────────────────────────────┐
│                      DATA LAYER                                 │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │PostgreSQL│  │ Redis    │  │ S3       │  │Elastic   │       │
│  │(cases,   │  │(sessions,│  │(documents│  │Search    │       │
│  │ users,   │  │ cache,   │  │ recordings│ │(full-text│       │
│  │ awards)  │  │ queues)  │  │ awards)  │  │ search)  │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

## 2. Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | React + TypeScript | Large ecosystem, component libraries for complex forms |
| UI Framework | Ant Design | Enterprise-grade, good table/form components |
| Mobile | PWA (Progressive Web App) | No app store dependency, works on low-end phones |
| API Gateway | Kong (self-hosted) or AWS API Gateway | Rate limiting, auth, routing |
| Backend | Node.js (NestJS) | TypeScript end-to-end, good for real-time features |
| Database | PostgreSQL (RDS) | ACID compliance critical for legal data |
| Cache | Redis (ElastiCache) | Session management, real-time features |
| Object Storage | AWS S3 (Mumbai) | Document & recording storage, versioning |
| Search | ElasticSearch (OpenSearch) | Full-text search across case documents |
| Video | 100ms.live SDK (Phase 1) → LiveKit (Phase 3) | India-optimized, recording, breakout rooms |
| Message Queue | AWS SQS / Redis Streams | Async processing (notifications, PDF generation) |
| PDF Generation | Puppeteer / wkhtmltopdf | Award PDFs, court filing documents |
| AI / LLM | OpenAI GPT-4 / Azure OpenAI (India region) | Document template drafting, case summarization |
| Template Engine | Handlebars + custom section schema | Structured legal document templates with hints |
| Auth | Keycloak (self-hosted) | RBAC, SSO, Aadhaar login integration |
| Monitoring | Prometheus + Grafana | Metrics, alerting |
| Logging | ELK Stack (OpenSearch) | Centralized logging, audit trail |
| CI/CD | GitHub Actions + ArgoCD | Automated deployment |
| Infrastructure | AWS (Mumbai region) | Data residency, managed services |
| IaC | Terraform | Reproducible infrastructure |

## 3. Data Model (Core Entities)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    User      │     │    Case      │     │  Arbitrator  │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id           │     │ id           │     │ id           │
│ email        │     │ case_number  │     │ user_id (FK) │
│ phone        │     │ type         │     │ bar_council_id│
│ role         │────►│ status       │◄────│ domain       │
│ kyc_status   │     │ dispute_value│     │ experience   │
│ org_id       │     │ claimant_id  │     │ fee_schedule │
└──────────────┘     │ respondent_id│     │ kyc_status   │
                     │ arbitrator_id│     │ rating       │
                     │ institution_id│    │ availability │
                     │ filed_at     │     └──────────────┘
                     │ deadline     │
                     └──────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
     ┌────────▼───┐  ┌─────▼──────┐ ┌────▼────────┐
     │  Document  │  │  Hearing   │ │   Award     │
     ├────────────┤  ├────────────┤ ├─────────────┤
     │ id         │  │ id         │ │ id          │
     │ case_id    │  │ case_id    │ │ case_id     │
     │ type       │  │ scheduled  │ │ type        │
     │ file_url   │  │ status     │ │ content     │
     │ version    │  │ recording  │ │ signed_url  │
     │ uploaded_by│  │ transcript │ │ signed_at   │
     │ access_level│ │ duration   │ │ status      │
     └────────────┘  └────────────┘ └─────────────┘
```

## 4. Security Architecture

### Authentication & Authorization
- Multi-factor auth: Password + OTP (SMS/email)
- Aadhaar-based login for verified users
- Role-Based Access Control (RBAC):
  - `claimant` — own cases only
  - `respondent` — own cases only
  - `advocate` — client's cases (with authorization letter)
  - `arbitrator` — assigned cases only
  - `institution_admin` — institution's cases
  - `platform_admin` — all cases (audit logged)

### Data Security
- All data encrypted at rest (AES-256 via AWS KMS)
- TLS 1.3 for all data in transit
- Database-level row security (PostgreSQL RLS) for multi-tenant isolation
- Document access logged with IP, timestamp, user ID
- Hearing recordings stored with integrity hash (SHA-256)
- Annual penetration testing by CERT-IN empanelled auditor

### Audit Trail
Every action logged:
```json
{
  "timestamp": "2026-04-17T10:30:00Z",
  "user_id": "usr_abc123",
  "action": "document.upload",
  "case_id": "ARB-2026-00142",
  "resource": "doc_xyz789",
  "ip": "x.x.x.x",
  "metadata": { "file_name": "exhibit_A.pdf", "size_bytes": 245000 }
}
```

## 5. Deployment Architecture

```
AWS Mumbai Region (ap-south-1)
│
├── VPC
│   ├── Public Subnet
│   │   ├── ALB (Application Load Balancer)
│   │   └── NAT Gateway
│   │
│   ├── Private Subnet (App)
│   │   ├── ECS Fargate (application services)
│   │   └── ECS Fargate (background workers)
│   │
│   └── Private Subnet (Data)
│       ├── RDS PostgreSQL (Multi-AZ)
│       ├── ElastiCache Redis (cluster)
│       └── OpenSearch (3-node cluster)
│
├── S3 (document storage, versioned, encrypted)
├── CloudFront (static assets CDN)
├── SES (email)
├── SQS (message queues)
├── KMS (encryption key management)
└── CloudWatch (monitoring + alerts)
```

## 6. API Design Principles

- RESTful APIs with OpenAPI 3.0 specification
- Versioned: `/api/v1/cases`, `/api/v1/hearings`
- Pagination: cursor-based for large result sets
- Rate limiting: 100 req/min for authenticated users, 20 req/min for public
- Webhook support for court integration partners
- GraphQL endpoint for complex dashboard queries (Phase 2)

## 7. Estimated Infrastructure Cost (Monthly)

| Service | Spec | Est. Cost (USD) |
|---------|------|-----------------|
| ECS Fargate | 4 services × 2 tasks × 1vCPU/2GB | ~$200 |
| RDS PostgreSQL | db.r6g.large, Multi-AZ | ~$350 |
| ElastiCache Redis | cache.r6g.large | ~$150 |
| OpenSearch | 3 × r6g.large.search | ~$450 |
| S3 | 1 TB storage + requests | ~$25 |
| CloudFront | 500 GB transfer | ~$50 |
| ALB | 1 ALB + data processing | ~$30 |
| SES + SQS | Email + queues | ~$20 |
| 100ms.live | 10,000 hearing minutes | ~$300 |
| **Total** | | **~$1,575/mo** |

*Note: Costs are estimates. Use the AWS Pricing Calculator for accurate projections.*
