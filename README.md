# TempahSekolah

Bahasa Melayu landing page for the school-program booking platform. **Milestone 1
only:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4. No operational
booking, accounts, payments or database yet. See [scope decision](docs/decisions/001-milestone-one.md).

## Local setup

Requirements: Node.js 24 LTS (see `.nvmrc`), npm 11, Git. From this checkout:

```sh
cd /workspace/TempahanSekolah  # replace with your checkout path locally
npm ci
cp .env.example .env.local   # first setup only; preserve an existing .env.local
npm run dev
```

Open the local server on port 3000 in your browser. No environment values or
Supabase account are required for the public landing page. Stop with Ctrl+C.
If your environment does not allow writes to npm's default cache, install with
`npm ci --cache /workspace/.npm-cache` (or another writable cache path).

Optional: set `DEMO_CONTACT_EMAIL` in `.env.local` to a single valid mailbox you
control, then restart the server. `/demo` opens a draft in the visitor's mail
application; it does not send or store a request. Without that variable, the page
explains that demo requests are not yet open. Supabase variables in `.env.example`
are reserved for a future milestone, currently unused. Never place private keys
in `NEXT_PUBLIC_*` variables, source files or Git.

## Verify and run the production build

```sh
npm run test:unit
npm run lint
npm run typecheck
npm run build
npm run start
```

`typecheck` generates Next.js route types, then runs strict `tsc --noEmit`.
`build` must succeed before `start`. Run only one process per port; use
`npm run start -- --port 3001` for another port. Services are foreground processes
and must be restarted after a machine restart. No remote services are required.

## Browser tests

After building, stop any process using port 3100; Playwright starts its own
production server. Normal local installation:

```sh
npx playwright install chromium
npm test
```

On Linux, use `npx playwright install --with-deps chromium` if browser system
libraries are missing. In this cloud environment Chromium is already installed:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
TEST_DEMO_CONTACT_EMAIL=demo@example.com PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test
```

The second run tests the configured contact branch with a non-delivering example
address. Desktop and 360px mobile tests cover rendering, no horizontal overflow,
client runtime errors, five category choices, keyboard skip link and FAQ,
mobile navigation, demo availability/contact, 404 recovery and axe WCAG scans.
Run `npm run test:unit` for 15 mailbox validation and injection cases using Node.js 24. `npm test` runs browser tests separately. Security checks cover actual response
headers, missing sensitive routes, unused query payloads and mobile-to-desktop resize. Failure traces go to ignored `test-results/`.

## Code map and specification

- [file.md](file.md): actual files and symbols; update alongside code changes.
- [Approved PRD](docs/TempahSekolah_PRD_v1.0.md): uploaded baseline, kept unchanged.
- [Original proposed file map](docs/file-blueprint.v1.md): historical plan, not completion claims.
- [Milestone report](docs/milestone-1-report.md): evidence and outstanding verification.

Public routes: `/` and `/demo`; unknown paths return a custom 404. Future domains,
APIs, Supabase migrations and RLS tests should follow the approved blueprint only
when their milestone is authorized. No deployment has been performed.

See [production readiness audit](docs/audit/production-readiness.md) for the NO-GO
recommendation, severity-ranked findings, fixes, evidence and unexecuted PRD tests.

## Netlify hosting

`netlify.toml` declares the Next.js build, `.next` publish directory and the explicit
`@netlify/plugin-nextjs` runtime. The runtime is pinned in the npm lockfile; no UI
plugin search is required. See [Netlify runbook](docs/runbooks/netlify.md) for
expected deployment logs and troubleshooting. No paid resource is provisioned by
this configuration. Hosting the public pages does not implement the deferred
booking, database or payment milestones.
