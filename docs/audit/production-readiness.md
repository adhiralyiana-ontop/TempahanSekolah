# TempahSekolah audit — 27 October 2026

**Recommendation: NO-GO for launching the PRD application or a paid pilot.**
Scope: repository baseline `ac55a9c4b587ac1a84014b738ac7da89f3c4e7de` plus the
incremental fixes recorded in Git with this report. Testing ran on Linux, Node
24.19.0, npm 11.9.0, against a local Next.js production build. This is a source
review and focused local dynamic audit, not a third-party penetration-test certificate.
No deployment, real payment, email delivery or remote database test was performed.

The only implemented business surface is a public landing page and an optional
mailto demo draft. Catalog cards are clearly illustrative. No existing tenant data
or payment endpoint was found. Missing requirements below are **launch gaps**, not
proof of a presently exploitable data leak. The narrower user-approved Milestone 1
is distinct from PRD section 17's Auth/RLS foundation milestone.

## Severity and disposition

- Critical: 0 confirmed critical vulnerabilities in the implemented surface.
- High: 7 open launch gaps (A01–A07).
- Medium: 2 findings (A08 open, A11 baseline mitigation applied with residual work).
- Low: 3 findings (A09–A10 fixed, A12 open maintenance concern).

High means production booking, money or sensitive data cannot be safely supported
without the requirement. Medium means a material assurance or hardening gap. Low
means a limited usability, configuration or maintenance defect. None of the
missing workflows is silently treated as tested or safe.

## Findings: reproduction, impact, fix and confirmation

### A01 — High / OPEN — Core booking application absent

**Affected files:** `src/app/page.tsx` (`Home`),
`src/components/marketing/program-preview.tsx` (`ProgramPreview`), `package.json`.
Expected future routes/modules listed in `docs/file-blueprint.v1.md` do not exist.
**Reproduce:** GET `/app`, `/api/v1/admin/programs`, `/api/v1/public/checkouts`;
the audit browser suite observes 404. The only selectable items on `/` update
illustrations; they do not create a persisted program, cart or booking.
**Impact:** FR-03–07 and FR-12–15 cannot operate; the product cannot fulfil orders.
**Recommended fix:** Build approved M2/M3/M5 slices in order: programs/catalog,
atomic capacity and idempotent checkout, receipt access, fulfilment and reporting.
Do not turn illustrative cards into apparent checkout controls without a backend.
**Resolution test:** Execute AC-01–04, AC-13–14, AC-16 end-to-end on actual seeded
services, including price tampering, last-stock concurrency and duplicate fulfilment.

### A02 — High / OPEN — Staff identity and authorization absent

**Affected files:** `src/app/layout.tsx`, `package.json`; there is no `/login`,
identity module, server authz helper, protected admin route or Supabase Auth client.
**Reproduce:** Inspect tracked routes and dependencies; GET `/login`, `/app`,
`/platform` returns 404. No authenticated role/resource operations can be exercised.
**Impact:** FR-01/02 and PRD sections 9/14 are unmet. There is currently no exposed
admin resource to bypass, but staff operations cannot safely be introduced as-is.
**Recommended fix:** Implement Supabase staff sessions, MFA for admins, invitation
expiry, session invalidation and deny-by-default tenant/resource authorization.
**Resolution test:** Role matrix for anonymous, inactive, organiser, finance,
collection staff and admin; expired/revoked sessions and school-A access to school-B
must fail on the server and return no protected data.

### A03 — High / OPEN — Database isolation and access controls not implemented

**Affected files:** `.env.example`, `package.json`, `docs/TempahSekolah_PRD_v1.0.md`
section 11; no `supabase/migrations/` or `supabase/tests/` exists.
**Reproduce:** Inspect tracked files and dependencies. Required Supabase bindings
are absent in the audited runtime (names/presence only checked); no database was
provided to query. There is no RLS or composite-FK SQL to review.
**Impact:** Tenant isolation, private storage, grants, price/capacity constraints,
and transactional integrity are unproven. This is not a finding that an existing
remote database has RLS disabled; no such database was audited.
**Recommended fix:** Version schema/grants/RLS, tenant-consistent composite FKs,
private storage policies, atomic functions and minimum service-role privileges.
**Resolution test:** AC-02/12 against a disposable real Postgres/Supabase instance:
JWTs for two schools, anon grants, cross-school joins/inserts/updates/storage/exports,
negative capacity attempts and concurrent reservations. Tests must assert denied
operations at the database, not merely hidden UI controls.

### A04 — High / OPEN — Payment and webhook lifecycle absent

**Affected files:** `package.json`, `src/app/page.tsx`, PRD section 13. No payment
adapter, webhook route, merchant store or scheduled reconciliation exists.
**Reproduce:** GET and unsigned POST to `/api/v1/webhooks/payments/billplz` return
404/405. There is no bill creation, hold, callback state or transaction to inspect.
**Impact:** Paid orders cannot be accepted, reconciled or refunded. Missing endpoint
responses do not establish working signature verification or tenant-safe payments.
**Recommended fix:** Resolve merchant gates, implement M4 with amount/currency/
merchant matching, authenticated callbacks, durable event deduplication, monotonic
state transitions, expiry reconciliation, late-paid exceptions and refund audit.
**Resolution test:** AC-05–11 in provider sandbox, including forged and repeated
callbacks, wrong merchant/amount, `paid=true` redirect, callback outage, double-paid
attempt and payment after stock release. **All currently unrun.**

### A05 — High / OPEN — Pilot governance and personal-data controls unresolved

**Affected files:** `docs/TempahSekolah_PRD_v1.0.md` sections 1.1, 5 and 14;
`src/app/demo/page.tsx` currently collects no pupil data.
**Reproduce:** G1–G5 are explicitly marked open in the approved baseline; there is
no approved merchant, school/minor policy, retention schedule or operational privacy
notice in the repository. G5 specifically is a commercial question, not alone a
technical prototype blocker.
**Impact:** A paid/minor-data pilot lacks the documented authority and handling
rules required by its own PRD. This is a readiness finding, not a legal determination.
**Recommended fix:** Record owner-approved G1–G4 pilot decisions, applicable notices,
minimal data fields, guardian/participant rules, deletion/retention and refund owners.
**Resolution test:** Owner sign-off plus AC-13; verify export/deletion and retention
on synthetic records before real pupil data or paid pilot use.

### A06 — High / OPEN — Backup, restore and incident readiness absent

**Affected files:** PRD sections 14/16, `docs/decisions/001-milestone-one.md`.
There are no backup/restore, incident, reconciliation or refund runbooks.
**Reproduce:** Inspect `docs/`; no backup job, restore evidence, RPO/RTO, incident
owner or monitoring alert configuration is supplied. GitHub source history does
not back up future Supabase data, Storage or provider-side transactions.
**Impact:** Data recovery and financial incident handling cannot be demonstrated.
**Recommended fix:** Select backup/storage scope and RPO/RTO, document and automate
restore, incident response, merchant-key rotation, refund escalation and alert routing.
**Resolution test:** AC-15: isolated restore of DB + Storage + configuration, verify
row counts/FKs and resumption/reconciliation, time recovery and demonstrate alert
receipt. Database restore and failover were **not executed** in this audit.

### A07 — High / OPEN — Production deployment controls unverified

**Affected files:** `.github/workflows/ci.yml`, `.env.example`, `next.config.ts`.
**Reproduce:** Workflow runs validation only; no staging/prod target, TLS/DNS,
secret-store bindings, scheduler, rollback or runtime-health evidence is provided.
No deployed target was authorized for testing. The current production build runs
locally; this does not verify a hosted environment.
**Impact:** Release, HTTPS, environment separation and operational recovery cannot
be certified; sensitive future jobs lack a demonstrated execution environment.
**Recommended fix:** Prepare a separately authorized staging/release plan with
isolated DB/provider keys, least privilege, HTTPS, scheduled jobs, health checks,
monitoring and rollback. Keep `robots: noindex` until public-launch approval.
**Resolution test:** Staging smoke/E2E with host headers/TLS/cookies, failed deploy
rollback, expired credentials, scheduled-job authorization and actual CI results.
No deployment or paid resource was activated by this audit.

### A08 — Medium / OPEN — PRD performance and reliability not demonstrated

**Affected files:** `tests/e2e/landing.spec.ts`, `tests/e2e/security.spec.ts`,
`docs/audit/public-http-smoke.json`. No capacity/load suite or business API exists.
**Reproduce:** Existing suites exercise public UI; they cannot execute 100–150
simultaneous checkouts, 2,000-request bursts, gateway outage or process recovery.
The recorded smoke is only 100 GETs per public page at concurrency 10.
**Impact:** No support for PRD p95 API, stock-integrity or payment-recovery targets.
**Recommended fix:** Add targeted load/failure tests after actual backend slices
exist, and establish staging baselines with resource and error-rate monitoring.
**Resolution test:** PRD section 7's defined workload + AC-02/09/10/15; observe DB
locks, errors, stock invariants and recovery after restarts. Local GET latency is
not a substitute for these tests. Error/loading boundaries compile; fault-injected
retry, stalled rendering, assistive tech and cross-browser tests remain unrun.

### A09 — Low / FIXED — Malformed demo mailbox accepted

**Affected file:** `src/lib/demo-contact.ts`.
**Reproduce before fix:** Set config to `.demo@example.com`, `a..b@example.com`,
`d@a.-b.com` or a local part longer than 64 characters; `getDemoContactHref()`
returned a draft link. This is trusted server config, not an unauthenticated input.
**Impact:** Misconfigured contact links can lose demo enquiries; no demonstrated
header injection or data exfiltration. Existing encoding was retained.
**Fix applied:** Pure `buildDemoContactHref` validates dot-atom local parts, DNS
labels, lengths and recipient count; unsafe/query/CRLF values fail closed.
**Resolution test:** `npm run test:unit`: 15 cases, including valid encoded plus
address/subdomain and malformed addresses/header injection/length boundaries.

### A10 — Low / FIXED — Mobile navigation duplicated after desktop resize

**Affected files:** `src/app/globals.css`, `src/components/marketing/header.tsx`.
**Reproduce before fix:** At 360px open mobile menu, then resize to 1280px.
`#mobile-navigation` remained visible alongside desktop navigation (reproduced).
**Impact:** Duplicated links, confusing keyboard navigation on resize/orientation.
**Fix applied:** Hide the mobile disclosure at desktop widths even while its state
remains open. Its state still correctly controls visibility at mobile sizes.
**Resolution test:** `security.spec.ts` opens at 360px and asserts mobile menu
hidden and desktop navigation visible after resize, in both browser projects.

### A11 — Medium / PARTIALLY MITIGATED — Browser hardening incomplete

**Affected file:** `next.config.ts`.
**Reproduce before fix:** GET `/` had X-Frame-Options/nosniff but no CSP. No XSS
exploit was found; this is defence in depth, not proof of exploitability.
**Fix applied:** CSP now denies base URLs, objects, framing and form submission.
It deliberately does not claim inline-script protection: no `script-src` exists.
**Impact:** The baseline reduces embedding/base/form risks, while a future script
injection could still execute; the sampled query is unused and did not execute.
**Recommended remaining fix:** Design a Next-compatible nonce/hash script policy
and test it on the authorized hosting target before handling sensitive data; never
claim a static policy with unrestricted inline scripts provides that protection.
**Resolution test:** Current browser suite checks actual headers on 200 and 404
responses and normal page hydration. Future full-policy tests must block injected
scripts while allowing all legitimate chunks, server actions and navigation.

### A12 — Low / OPEN — Lint tool upstream end-of-support notice

**Affected files:** `package.json`, `package-lock.json` (ESLint 9.39.5).
**Reproduce:** npm's recorded installation warning identifies ESLint 9 as upstream
unsupported. Full dependency audit currently reports zero known vulnerabilities.
**Impact:** Maintenance risk for a development tool, not a current known runtime CVE.
**Recommended fix:** Schedule a compatible ESLint/Next-config upgrade; do not apply
a blind major update or `npm audit fix --force` during the review.
**Resolution test:** Clean locked install, zero-warning lint, type/build and all
existing suites after the coordinated upgrade.

## Executed evidence and limits

- Fresh audit `npm audit --json`: zero info/low/moderate/high/critical findings;
  registry response saved in `npm-audit.json`. An audit checks known advisories,
  not all supply-chain threats or unknown vulnerabilities.
- Secret patterns: 35 tracked files, both existing Git commits and 13 built client
  JS files checked for private-key, GitHub/AWS/Supabase-secret/JWT patterns; zero
  matches. No `.env.local` tracked. Relevant binding presence checked without values;
  no Supabase, payment or demo binding was set. This heuristic is not a comprehensive
  entropy/provenance scan and says nothing about a future deployed secret store.
- `npm run test:unit`: 15 passed, 0 failed/skipped. After switching new tests from
  CommonJS to ESM to meet existing lint rules, lint/type/build all passed. Node emits
  a non-failing module-type detection warning for direct TS imports in unit tests.
- `npm run lint`, `npm run typecheck`, `npm run build`: passed after fixes.
- Chromium production browser suite: 20 passed with unset email. Configured-email fixture suite: 20 passed as well (40 browser checks across
  two configurations).
- Axe scans: landing and contact pages, desktop and 360px mobile; zero violations
  in tested rules. Keyboard skip link/FAQ/menu tested. No full WCAG certification,
  physical-device, screen-reader, browser zoom or Firefox/WebKit claim.
- Responsive checks cover 360/768/1280px. A preliminary body-font-size assertion was removed because it did not enlarge
  fixed-pixel typography. The renamed responsive-only test was rerun separately;
  this does not claim browser zoom or text-resize compliance.
- Local HTTP smoke: 200/200 expected-content responses; `/` p95 110.26ms, `/demo`
  p95 231.20ms, concurrency 10, warm process. See JSON for measured samples. This
  is neither an SLA nor PRD API/load or long-duration reliability evidence.

## PRD acceptance matrix

| Criteria | State                    | Reason                                                           |
| -------- | ------------------------ | ---------------------------------------------------------------- |
| AC-01–04 | Not executable           | No cart, atomic inventory, idempotency or pricing service        |
| AC-05–11 | Not executable           | No gateway, payment state, merchant or webhook service           |
| AC-12    | Not executable           | No tenants/Auth/RLS database; 404 checks are not isolation tests |
| AC-13    | Not executable           | No backend guardian policy/checkout                              |
| AC-14    | Not executable           | No fulfilment/QR implementation                                  |
| AC-15    | Unrun                    | No data store, backup configuration or restore drill             |
| AC-16    | Partial UI evidence only | Mobile landing passes, but required checkout E2E is absent       |

## Incremental remediation order

1. The small current-surface A09/A10 fixes and A11 baseline are included here; CI
   now runs the 15 unit tests and a high/critical dependency-audit gate.
2. Resolve applicable pilot/privacy/merchant decisions and authorize one backend
   milestone at a time; implement Auth/schema/RLS and prove tenant isolation first.
3. Programs, atomic checkout, sandbox payments, fulfilment/reporting, then staging,
   recovery, security/load tests and school UAT. Real money waits for the gates.

The landing page can be reviewed as an explicitly non-operational prototype.
**Do not launch the full PRD product or accept real orders/payments on this evidence.**
