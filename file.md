# TempahSekolah — actual file and symbol register

Milestone 1 plus production-readiness audit, 27 October 2026. Implementation/audit commit: **`6231c83d137e19399d13ce2ce66b05761c02097c`**. Documentation-only reference updates follow this commit. No PR was created.
Ranges below were read from the formatted files in this working tree; regenerate after edits.
The uploaded plan is preserved in `docs/file-blueprint.v1.md`. Future blueprint paths
without an entry below have not been implemented. No tenant schema or RLS tests exist yet.

| File                                                                                         | Symbol / section                             | Actual lines | Responsibility                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------ | ------------------------------------------------------------------- |
| [src/app/layout.tsx](src/app/layout.tsx)                                                     | `RootLayout`                                 | 15–30        | Shared HTML, Bahasa Melayu metadata, header/footer and skip link    |
| [src/app/page.tsx](src/app/page.tsx)                                                         | `Home`                                       | 83–282       | Landing sections, content and FAQ data                              |
| [src/app/globals.css](src/app/globals.css)                                                   | `@theme / :root / component styles / @media` | 1–1395       | Design tokens, components and responsive/reduced-motion rules       |
| [src/app/demo/page.tsx](src/app/demo/page.tsx)                                               | `DemoPage`                                   | 9–68         | Request-time contact configuration and honest unavailable state     |
| [src/app/loading.tsx](src/app/loading.tsx)                                                   | `Loading`                                    | 1–8          | Route loading announcement and skeleton                             |
| [src/app/error.tsx](src/app/error.tsx)                                                       | `ErrorPage`                                  | 2–12         | Sanitized route error and retry action                              |
| [src/app/not-found.tsx](src/app/not-found.tsx)                                               | `NotFound`                                   | 2–11         | 404 with recovery navigation                                        |
| [src/components/ui/brand.tsx](src/components/ui/brand.tsx)                                   | `Brand`                                      | 4–20         | Accessible home link and logo                                       |
| [src/components/ui/button.tsx](src/components/ui/button.tsx)                                 | `ButtonLink`                                 | 4–14         | Primary, secondary and light link variants                          |
| [src/components/marketing/header.tsx](src/components/marketing/header.tsx)                   | `Header`                                     | 9–56         | Desktop navigation and mobile disclosure state                      |
| [src/components/marketing/footer.tsx](src/components/marketing/footer.tsx)                   | `Footer`                                     | 3–24         | Footer navigation and development status                            |
| [src/components/marketing/program-preview.tsx](src/components/marketing/program-preview.tsx) | `ProgramPreview`                             | 124–220      | Five selectable illustrative category examples; no checkout         |
| [src/lib/demo-contact.ts](src/lib/demo-contact.ts)                                           | `buildDemoContactHref / getDemoContactHref`  | 2–30         | Server-read single-mailbox validation and encoded mailto draft      |
| [tests/e2e/landing.spec.ts](tests/e2e/landing.spec.ts)                                       | `Playwright tests`                           | 1–140        | Rendering/axe, categories, keyboard/menu/FAQ, contact branches, 404 |
| [playwright.config.ts](playwright.config.ts)                                                 | `defineConfig`                               | 1–29         | Production test server; desktop and 360px mobile; two workers       |
| [next.config.ts](next.config.ts)                                                             | `nextConfig`                                 | 2–26         | Security headers and server configuration                           |

## Other files created

- `src/app/icon.svg`: local favicon; no external image requests.
- `package.json`, `package-lock.json`, `.nvmrc`: scripts, locked dependencies and Node major version.
- `tsconfig.json`, `next-env.d.ts`: strict TypeScript and generated Next.js type references.
- `postcss.config.mjs`, `eslint.config.mjs`: Tailwind integration and zero-warning lint rules.
- `.env.example`, `.gitignore`: optional configuration names and ignored local secrets/build outputs.
- `.github/workflows/ci.yml`: lint, types, build, Chromium and both contact configurations.
- `AGENTS.md`: generated by Next.js dev, with installed-version documentation guidance.
- `README.md`: exact setup, run and validation instructions.
- `docs/TempahSekolah_PRD_v1.0.md`, `docs/file-blueprint.v1.md`: unchanged uploaded source documents.
- `docs/file.md`: pointer preserving the PRD’s relative file-map link.
- `docs/decisions/001-milestone-one.md`: scope interpretation and security boundaries.
- `docs/milestone-1-report.md`: completion evidence and outstanding checks.

## Tests and future editing

The current browser suite protects Home, Header, ProgramPreview, DemoPage and NotFound
on desktop/mobile. Axe scans cover the landing and contact pages. Both absent and
configured DEMO_CONTACT_EMAIL branches are exercised in separate runs. Loading/error
fallbacks are built and typed but have not been verified with an injected runtime failure.
Update this register with every implementation change; update the implementation commit when source files change.
Auth, capacity, payment and fulfilment symbols from the approved blueprint remain unimplemented.

## Production-readiness audit additions

- `tests/unit/demo-contact.test.mjs`, lines 1–35: 15 mailbox validation cases.
- `tests/e2e/security.spec.ts`, lines 1–78: 5 security/responsiveness tests, two viewports.
- `docs/audit/production-readiness.md`: 12 severity-ranked findings and NO-GO evidence.
- `docs/audit/npm-audit.json`: known-advisory snapshot.
- `docs/audit/public-http-smoke.json`: local HTTP timing/error samples.
- `package.json`: `test:unit` script; CI now checks unit tests and dependency audit.

## Netlify hosting correction — 28 October 2026

- `netlify.toml`: explicit build command, publish directory, Node 24 and Next.js runtime plugin.
- `package.json`, `package-lock.json`: pinned `@netlify/plugin-nextjs` 5.16.4.
- `.gitignore`, `eslint.config.mjs`: exclude generated `.netlify` runtime/build outputs.
- `docs/runbooks/netlify.md`, `README.md`: deployment evidence and user steps.
- No application routes, database schema, booking or payment behaviour changed.
