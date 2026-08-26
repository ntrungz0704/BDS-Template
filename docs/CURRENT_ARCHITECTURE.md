# CURRENT ARCHITECTURE REPORT — PLATFORMBDS V2

**Date:** 2026-08-23  
**Auditor:** Principal Software Architect  
**Project:** PlatformBDS Enterprise

---

## 1. Five-App Monorepo Topology

```text
PLATFORMBDS MONOREPO (Turborepo + pnpm)
├── apps/
│   ├── marketplace/   (:3000) -> Public Catalog, Live Search, Demo Viewer, Cart & Pricing (Next.js Pages)
│   ├── cms/           (:3001) -> Customer Owner CMS Management Portal (Next.js Pages)
│   ├── admin/         (:3002) -> Super Admin Multi-Tenant & Template Management (Next.js Pages)
│   ├── website/       (:3003) -> Public Multi-Tenant Website Renderer Engine (Next.js Pages)
│   └── api/           (:5000) -> REST API Core (Node.js/Express + Prisma PostgreSQL)
└── packages/
    ├── database/      -> Prisma ORM Schema (38 Models), Seed scripts, Client
    ├── types/         -> Shared TypeScript interfaces & enums
    ├── utils/         -> Formatting, Vietnam addresses, Color palettes, Template configs
    └── ui/            -> Shared Reusable UI Components
```

---

## 2. Core Business Workflows

### 2.1 Role Matrix (Strict 2-Role System)
* **`SUPER_ADMIN`**: Full platform authority. Creates customer accounts using Gmail, assigns templates, manages tenants, orders, manual payments, licenses, and template master configurations.
* **`CUSTOMER_OWNER`**: Restricted to own website instance. Edits content (projects, posts, media, theme, hotline, company info), previews, views own public URL. Cannot access Admin, other tenants, or modify Template Master.

### 2.2 Customer Onboarding Flow
1. Customer browses Marketplace (`:3000`) and tests live interactive Demos.
2. Customer contacts Super Admin via Zalo / Hotline (`0919 006 030` / `0983 312 219`).
3. Super Admin creates Customer Account on Admin Portal (`:3002`) using customer's Gmail.
4. Super Admin assigns chosen Template and creates a Tenant Website Instance.
5. Trial is automatically activated (3 days, 3 saves limit).
6. Customer logs in at `/login` and is redirected directly to Customer CMS (`:3001`).
7. Customer customizes content, previews live without consuming quota, and saves persistently (atomic quota increment).
8. Customer shares their live URL (`platformbds.vn/[slug]` or `[slug].platformbds.vn`).

---

## 3. Separation of Concerns: Master vs Instance

* **Template Master (`Template` model)**: Managed solely by `SUPER_ADMIN`. Contains master layout definitions, default configurations, screenshots, and version history.
* **Customer Website Instance (`Tenant` model + related tables)**: Owned by `CUSTOMER_OWNER`. Stores tenant-specific company info, projects, posts, media assets, theme settings, and page/section overrides.
