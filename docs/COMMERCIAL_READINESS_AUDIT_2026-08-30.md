# Commercial Readiness Audit — 2026-08-30

## Verdict

**NOT READY FOR COMMERCIAL SALE.** The repository has a substantial multi-tenant SaaS foundation, but it does not yet satisfy the P0 invariants for product modelling, runtime parity, source entitlement, and mock-free production behaviour.

This is a source-code audit and targeted automated-test run, not a claim of production E2E validation. Only PostgreSQL and Redis were running locally at audit time; API and the four Next.js apps were not running.

## Actual architecture

| Layer | Actual implementation |
| --- | --- |
| Marketplace | `apps/marketplace`, Next.js, expected public domain `platformbds.vn`, port 3000 in production compose. |
| Customer CMS | `apps/cms`, Next.js, `cms.platformbds.vn`, port 3001. |
| Super Admin | `apps/admin`, Next.js, `admin.platformbds.vn`, port 3002. |
| Tenant runtime | `apps/website`, Next.js wildcard runtime, `*.platformbds.vn`, port 3003. |
| API | `apps/api`, Express/TypeScript, `api.platformbds.vn`, port 5000. |
| Database | PostgreSQL via Prisma in `packages/database/prisma/schema.prisma`. Redis is present but not used as the authoritative business datastore. |
| Media | Cloudinary configuration is supported; uploaded content is also exposed under `/uploads`. |
| Master vs tenant | `Template`, `TemplateConfig`, `TemplateDraft`, and `TemplateVersion` are master-side entities. Tenant content is in `Tenant`, `TenantThemeSettings`, `TenantPage`, `TenantSection`, `CompanyInfo`, `Project`, `Post`, `Media`, `Lead`, etc. |

The source includes 24 website standalone packages with both HTML and PHP/MySQL variants. The Next.js registry also contains BDS and LP components. This does **not** prove parity between marketplace demo, SaaS runtime, and each exported package.

## What is genuinely implemented

- Password hashing, refresh tokens, registration/login/reset/verification endpoints, role middleware, tenant-access middleware, CSRF middleware, and API rate limits exist.
- Tenant-scoped CMS CRUD exists for theme, company information, pages/sections, projects, posts, media, forms, and leads.
- Public contact submission writes `ContactFormSubmission` and attempts to create a tenant-scoped CRM `Lead`.
- Manual proof upload moves `PENDING` to `WAITING_CONFIRM`; Super Admin approval paths and a SePay webhook path exist.
- Provisioning creates a tenant and tenant-scoped pages, sections, company information, and theme data. CMS routes explicitly block `/templates*`.
- Template draft/version models and admin routes exist; a tenant is linked to `templateVersionId`.
- API TypeScript check passes.

## P0 blockers

### P0-1 — Source download authorization can disclose the wrong template

`GET /api/marketplace/templates/:slug/download` searches for **any** completed order owned by the current user (or supplied order number), but does not constrain it to the requested template or `BUY_SOURCE` type. A customer who completed any purchase can request another slug and receive a generated package for that slug.

Evidence: `apps/api/src/controllers/marketplace.controller.ts`, `downloadTemplateSource`, query beginning at line 417.

Required fix: authorize by an immutable entitlement/order record with all of `userId`, `templateId`, `templateVersionId`, `purchaseType=BUY_SOURCE`, active license, and completed payment. Do not use arbitrary email/order-number OR conditions. Prefer an authenticated export endpoint or an expiring signed URL generated only after this check.

### P0-2 — Marketplace product catalog and filtering are not DB-backed in the actual UI

The API has a DB-backed `/templates` endpoint, but Marketplace pages render `WEBSITE_TEMPLATES`/`LANDING_TEMPLATES` imported from local `templatesData.ts`. Search, categories, filter counts and sorting therefore run over browser-side static data. Landing Page categories are hard-coded and include only four LP IDs although the data declares seven LPs.

Evidence: `apps/marketplace/src/pages/templates.tsx`; `apps/marketplace/src/pages/landing-pages.tsx`.

Required fix: introduce a canonical Product catalog, serve it through the API with `productType`, category, price, sort and pagination, then have both marketplace categories call that API.

### P0-3 — Product/licensing model cannot express the required business contract

`Template` has price columns, but has no `productType`, `purchaseType`, `salePrice`, `status/version` product snapshot, supported CMS modules, or source-package entitlement. `Order.type` mixes `BUY`, `RENT`, and `BUY_SOURCE`; there is no normalized license/product-line entity. Landing Pages are represented mostly by naming/data conventions, not as a first-class product type.

Evidence: `packages/database/prisma/schema.prisma` models `Template` and `Order`.

Required fix: define a Product/ProductVersion/License (or equivalent) model before extending checkout. Separate `WEBSITE_TEMPLATE` and `LANDING_PAGE`; separate hosted SaaS entitlement from source-template download entitlement.

### P0-4 — Order state machine is insufficient and inconsistent

The database enum provides only `PENDING`, `PENDING_SUBDOMAIN_CONFLICT`, `AWAITING_MANUAL_REVIEW`, `WAITING_CONFIRM`, `COMPLETED`, and `REJECTED`. It cannot accurately record paid-but-provisioning, provisioning failure, cancellation, or retry state. The SePay webhook marks an order `COMPLETED` before provisioning; provisioning failures are not represented as an order state.

Required fix: use explicit payment and fulfillment/provision state (or a documented equivalent), with idempotency keys and transactional transition guards. `COMPLETED` must mean the entitlement has been successfully fulfilled, not merely that a webhook was received.

### P0-5 — Tenant runtime deliberately falls back to mock/demo data

The tenant home SSR catches API failures then supplies default projects/posts and an accessible tenant status. Blog detail also falls back to demo blogs/default company data. `TenantRenderer` builds a `templateMock` object. This violates the requirement not to hide API/DB failure with mock/fallback content and risks displaying a plausible but incorrect customer website.

Evidence: `apps/website/src/pages/index.tsx` around lines 160–272; `apps/website/src/pages/blog/[slug].tsx`; `apps/website/src/components/TenantRenderer.tsx`.

Required fix: only master-demo routes may use master demo data. Tenant routes must fail closed with a clear availability page when tenant configuration cannot be read, and must render the provisioned template version and tenant state only.

### P0-6 — Demo/SaaS/source parity is unproven and structurally split

Marketplace demo components live under `apps/marketplace/src/components/demo/templates`; tenant runtime components are separately copied under `apps/website/src/components/templates`; standalone output is separately generated in `standalone-templates`. Provisioning creates a generic fixed set of sections rather than a versioned snapshot of the selected master layout. No E2E parity matrix exists for master demo → tenant A/B → source package.

Required fix: make every product version reference one canonical template manifest, use it for demo, SaaS provisioning, and package construction, and add parity E2E tests for website and LP products.

### P0-7 — Export mechanism conflicts with the agreed source-product model

The source entitlement flow in the brief is “one versioned, sanitized template package shared by authorized source buyers”. This repository also has `ExportJobService` + `SingleTenantExporterService`, which builds a per-order/single-tenant ZIP. `requestExport` permits any non-`RENT` completed order, including hosted purchase semantics, while the direct endpoint has the authorization flaw above.

Required fix: select one supported policy per license: (a) immutable canonical source package for `SOURCE_TEMPLATE_LICENSE`, or (b) tenant-current export only when explicitly sold. Do not leave both flows with incompatible authorization or content guarantees.

### P0-8 — Form/lead contract is only partially implemented

The public endpoint persists basic fields and creates a lead, but does not persist form identity, source URL/page, project/property relation, UTM, IP/user-agent, duplicate policy, or a strong transaction between submission and lead. The CRM creation failure is swallowed, so a user can receive success while CMS never receives a lead.

Evidence: `apps/api/src/controllers/public.website.controller.ts`, `submitContactForm`.

Required fix: model a canonical form submission with required attribution fields; make submission + lead creation transactional or visibly reconcileable; add anti-spam/deduplication per tenant.

### P0-9 — Business KPI endpoint contains fabricated values

`getMarketplaceStats` returns `500 + totalTenants`, `1200 + completedOrders`, clamps templates to at least 16, and fixes rating at 4.9. This is not DB truth.

Evidence: `apps/api/src/controllers/marketplace.controller.ts`, `getMarketplaceStats`.

Required fix: return actual aggregate values or remove the claim from production UI.

## Other critical gaps

- Customer chooses a subdomain at checkout for hosted rental, while the new invariant requires automatic unique slug generation unless business explicitly allows choice.
- `TenantThemeSettings` contains `customCss`, which conflicts with the no raw-CSS customer policy even if UI currently does not expose it.
- `getPageContent` returns a successful empty synthetic page when a published page is absent. This hides a provisioning/content error.
- API default production fallback URLs point to `https://bds-template-api.onrender.com`, while production compose config points at `api.platformbds.vn`; deployment configuration is not single-source-of-truth.
- No running app/API was available locally, so public URL, QR amount/memo generation, webhook provider verification, two-tenant isolation, CMS persistence, and responsive behaviour could not be validated live.

## Automated verification performed

| Check | Result |
| --- | --- |
| `pnpm --filter api lint` | Pass |
| `pnpm --filter api test -- --runInBand` | **Fail**: 2 failed, 31 passed, 33 total |
| API test failure 1 | Order-status ownership regression: another account received HTTP 200 where test expects 404. |
| API test failure 2 | Single-tenant export README does not meet the asserted installation-contract content. |
| Local Docker | PostgreSQL and Redis healthy; API, marketplace, CMS, admin and tenant website not running. |

## Recommended remediation order

1. Immediately disable/fix the direct template download endpoint and add a negative entitlement regression test.
2. Freeze a canonical Product/ProductVersion/License + order/payment/fulfillment state design.
3. Replace marketplace static catalog/filter/KPI paths with API/DB data.
4. Remove tenant runtime mock fallbacks; establish canonical template manifests and master-version snapshots.
5. Implement separate, audited source-package delivery for source licenses and SaaS tenant provisioning for hosted licenses.
6. Upgrade form attribution/lead transaction and test tenant A/B isolation.
7. Add the P0 acceptance suite: master isolation, demo/tenant/source parity, provisioning idempotency, QR/admin approval, authorization, and clean self-host package installation.

## Remediation update — 2026-08-30

Implemented after this audit:

- Source download now requires the authenticated owner, exact template, `BUY_SOURCE` order type and `COMPLETED` status; an unrelated SaaS purchase cannot authorize a download.
- Order-status lookup now requires authentication and verifies ownership before returning data; legacy email repair remains limited to the matching account.
- Added commercial fields and migration for product type, purchase type, payment status, fulfillment status, immutable product snapshot and idempotency key. Checkout records a server-side price snapshot and honors an idempotency key.
- Admin approval records payment and fulfillment progress. Source orders are marked `NOT_REQUIRED`; SaaS fulfillment transitions through `PROVISIONING` to `ACTIVE` after tenant creation.
- Public form submissions now record attribution and create the CRM lead in the same database transaction.
- Tenant runtime no longer substitutes a showcase tenant/template or demo projects/posts when tenant configuration fails; unknown template and missing page configuration now fail closed.
- Both website and landing-page catalog screens query the DB API, with loading/error states and DB-backed product type/category filtering. The seed catalog creates a version-1 configuration for the published product records, including LP 01–07.
- Source packaging fails closed for an unavailable LP/source artifact or unknown template rather than sending a different template. Export request, status and token download are all authenticated and scoped to the purchasing `userId`.
- Raw customer `customCss` is no longer accepted by CMS or injected by the tenant runtime. The old destructive seed cleanup was removed, and bootstrap seeding no longer overwrites the Super Admin password.
- The marketplace production proxy no longer has a hard-coded retired API endpoint; deployments must supply their API URL through environment configuration.

Still open before a production release: replace the duplicated demo/SaaS/source component trees with one canonical manifest and run the full live QR/webhook plus two-tenant browser E2E acceptance suite. These are structural/release-validation work, not safe to infer without a deployed payment provider and two real tenant test accounts.
