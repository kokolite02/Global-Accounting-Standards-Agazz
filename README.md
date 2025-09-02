# Global Accounting Standards — Web App (Monorepo-lite)

A production-ready starter for a Global Accounting Standards platform used by auditors, accountants, financial institutions, and companies.

## Features (scaffolded)

- **Standards Library**: CRUD for standards, versions, tags; read-friendly UI.
- **Query & Feedback**: Users can submit queries on standards and leave feedback; owners can respond and resolve.
- **Search**: Meilisearch indexing for standards, questions, answers.
- **Q&A Module**: Threaded Q&A with role-based permissions.
- **Download & Backup**: Export standards/Q&A to JSON; scheduled backup to MinIO (S3-compatible).
- **User Management**: Email/password auth with NextAuth; organizations, roles & RBAC (auditor, accountant, reviewer, admin).
- **Audit Log**: Key events logged.
- **API**: RESTful route handlers (Next.js App Router) with Zod validation.
- **Infra**: Docker Compose for Postgres, Meilisearch, Redis, MinIO. One command to run everything.

> This is a template and intentionally light on UI. Extend it to your needs.

## Tech Stack

- **Frontend/Backend**: Next.js 14 (App Router) + TypeScript
- **Auth**: NextAuth (Credentials provider; ready for OIDC add-ons)
- **ORM/DB**: Prisma + PostgreSQL
- **Search**: Meilisearch
- **Cache/Queue**: Redis (BullMQ-ready)
- **Object Storage**: MinIO (S3-compatible)
- **Validation**: Zod
- **Styles**: Tailwind CSS + shadcn/ui
- **Containerization**: Docker & Docker Compose

## Quick Start

### 1) Requirements
- Docker + Docker Compose
- Node >= 18, pnpm (or npm/yarn)

### 2) Clone & Install
```bash
pnpm install
# or: npm install
```

### 3) Environment
Copy `.env.example` to `.env.local` and adjust if needed.
```bash
cp .env.example apps/web/.env.local
```

### 4) Start Services (DB, Search, Storage, Redis)
```bash
docker compose up -d
```

### 5) Initialize DB & Seed
```bash
cd apps/web
pnpm prisma migrate dev --name init
pnpm prisma db seed
```

### 6) Run Dev Server
```bash
pnpm dev
# then open http://localhost:3000
```

### 7) First Login
- Email: `admin@example.com`
- Password: `admin123`

## Monorepo-lite Layout
```
global-accounting-standards/
├─ apps/
│  └─ web/               # Next.js full-stack app (API routes + UI)
├─ docker/
│  ├─ meilisearch.env
│  └─ init.sql           # optional extras
├─ docker-compose.yml
├─ package.json
├─ pnpm-workspace.yaml
└─ README.md
```

## Production Notes
- Replace Credentials with SSO (OIDC/SAML) as needed.
- Provision a managed Postgres/Redis/Meilisearch/S3.
- Add HTTPS and hardened headers (e.g., Next-safe).
- Configure backups to real S3 and offsite schedule.
- Add CI (GitHub Actions) for test, build, deploy.
