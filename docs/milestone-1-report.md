# Milestone 1 completion report

Completed 27 October 2026 (Asia/Kuala_Lumpur). Scope follows the user's explicit
five-item Milestone 1 request; the broader Auth/schema foundation from the PRD is
not included. No later milestone has been started.

## Delivered

- Next.js 16.4.3 / React 19.3.1, strict TypeScript, Tailwind CSS 4.3.3, frozen npm lockfile.
- Bahasa Melayu landing page, reusable brand/button, documented tokens, responsive
  navigation, five selectable catalog illustrations, native accessible FAQ and footer.
- Demo contact route with unavailable/configured states; only opens an email draft.
- Loading skeleton, sanitized retry boundary, custom 404 and metadata/local favicon.
- CI workflow, two-viewport browser suite, original PRD/blueprint copies, scope ADR,
  local setup instructions, and actual file/symbol/line register in `file.md`.
- No pre-existing application files, features or database schemas were changed.

## Executed validation

| Check                         | Result                                                                                       |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| Node/npm                      | Node 24.19.0, npm 11.9.0                                                                     |
| Lockfile repeatability        | `npm ci --cache /workspace/.npm-cache --no-audit --no-fund` passed                           |
| Lint                          | `npm run lint` passed with zero warnings                                                     |
| Strict types                  | `npm run typecheck` passed                                                                   |
| Production build              | `npm run build` passed: `/`, `/demo`, 404 and icon compiled                                  |
| Development HTTP smoke        | `npm run dev -- --port 3002`; `/` and `/demo` returned 200 with expected content             |
| Browser default configuration | 10/10 passed on production server; desktop Chromium and 360px mobile Chromium                |
| Browser configured contact    | 10/10 passed with `TEST_DEMO_CONTACT_EMAIL=demo@example.com`                                 |
| axe                           | Zero violations in tested WCAG A/AA rules on landing and demo, both viewports/configurations |
| Visual review                 | Full-page desktop 1440px and mobile 360px screenshots inspected                              |
| Input documents               | Copies verified byte-for-byte against both uploads                                           |

An initial closing-banner contrast failure was fixed and passed on rerun. An
initial mobile test incorrectly looked for the old accessible name after opening
the menu; it now checks the close action and expanded state. The initial lint
warning about an anonymous PostCSS export was corrected. No assertions were
removed or accessibility rules disabled. A final lint/type/build pass includes
the installed Next.js version's recommended error `retry` API.

Test servers started for validation were stopped afterward. `npm run dev` starts
local development again. The test mail address is only a non-delivering fixture;
no email was sent and no paid service was used.

## Remaining unverified / deferred

- No Supabase database, schema migrations, Auth, RBAC/RLS or tenant isolation tests.
  Therefore PRD section 17's broader M1 gate has **not** passed.
- No booking, checkout, payments, resits, QR fulfillment or real-time quota behavior.
- No real mailbox/email-client delivery test; configure a mailbox you control for contact.
- Loading and error components compile; delayed-loading/error-retry scenarios were
  not fault-injected. Automated axe checks do not establish full WCAG conformance;
  assistive-technology review, Firefox/WebKit and physical-device testing remain.
- Implementation is recorded in Git commit `92f1a710f72a916bda196a20f45f6915efa93798`. GitHub Actions execution must be checked after upload; local test evidence above remains the verified result.
- No security audit, load test, deployment or paid service activation. PRD G1–G5
  remain open; pricing, merchant and pilot decisions are unchanged.
- npm reports ESLint 9 upstream end-of-support. It is kept in the supported peer
  range for the selected Next.js lint configuration; plan a coordinated upgrade.

## Reproduction

See `README.md` for local commands, environment names and both browser test modes.
Cloud onboarding's `install_script` and `start_skill` are saved separately as a
configuration draft; saving does not apply runtime settings or publish a snapshot.
The implementation is committed. No fresh-task snapshot restoration was tested.
GitHub publication is a separate action requested by the user after milestone completion.
