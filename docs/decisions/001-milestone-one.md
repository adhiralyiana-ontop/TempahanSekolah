# Milestone 1: public application foundation

The current user instruction authorizes the application structure, design system,
landing page, local run instructions and a successful production build. That is
narrower than PRD section 17's M1 (schema, Auth, RBAC/RLS). This implementation
follows the explicit current scope. It does **not** claim the PRD's tenant-isolation
gate has passed. The uploaded document's historical prohibition on code generation
has been superseded by the user's explicit instruction to build Milestone 1.

## Architecture

Next.js App Router and strict TypeScript, Tailwind CSS v4 with shared CSS design
tokens, small UI primitives, server-rendered public pages, and client islands for
the menu and illustrative catalog. No remote fonts or image/CDN dependencies.
Bahasa Melayu first, 360px minimum target, 44px interactive controls, visible focus,
reduced-motion support. Colors follow the PRD: #176B73, #16324F, #F4B942 and #F7FAFC.

Future services remain Supabase PostgreSQL/Auth/Storage behind server-validated
authorization and RLS. No database exists in this milestone. No schema, migrations,
Supabase requests, login endpoints, checkout, payment or QR fulfillment are created.
Future domain modules should be added as working slices rather than empty stubs.
Never put service-role or gateway credentials into client components or variables
with the NEXT_PUBLIC_ prefix. Authorization and negative RLS tests are required
before exposing tenant data. Do not use this landing page as proof of backend readiness.

## Contact and privacy

/demo reads optional DEMO_CONTACT_EMAIL on the server at request time. An unset or
invalid mailbox produces an honest unavailable state. A configured mailbox produces
a mailto draft; the visitor must send it in their own mail client. No lead database,
API submission, success toast claiming delivery, analytics, student data collection
or fictional customer testimonials. Displayed catalog prices and dates are labeled
illustrations and cannot be purchased. No live demo or booking functionality is
advertised as available. Pricing and G1–G5 remain open as described by the PRD.

## Operations

No deployment, cloud account provisioning, paid service activation or database change.
Page indexing is disabled pending launch. Security headers disallow framing and MIME
sniffing; camera access is disabled for this public milestone. Revisit that permission
for the authorized QR scanning milestone. Production security review, CSP, privacy
policy and pilot approval remain future work. Error/loading boundaries are present;
production error injection is not introduced solely to test framework behavior.

CI runs lint, type checking, build and desktop/mobile Chromium tests with axe. CI is
configured but its hosted execution must be verified after pushing to GitHub.
