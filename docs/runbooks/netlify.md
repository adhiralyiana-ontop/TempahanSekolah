# Netlify Next.js deployment

## Diagnosis and correction

The user supplied a successful Next.js build log but the public root displayed
Netlify's generic 404. The supplied log had no Next.js Runtime or function-bundling
step. UI plugin search returned no matches. A successful Next.js compilation alone
does not produce Netlify's routing and server function for the dynamic `/demo` route.

`netlify.toml` now explicitly selects:

- `npm run build`, publish `.next`, Node 24.
- `@netlify/plugin-nextjs` pinned at 5.16.4 in package.json/package-lock.json.

The supported npm installation plus `[[plugins]]` configuration follows the runtime's
published README. No manual UI plugin installation or static-export conversion is
needed. The config does not add a payment service or provision a paid resource.
An existing Git-connected site's automatic publishing can deploy commits as usual.

## User steps after GitHub updates

1. Open Netlify → Deploys and select the new commit's deployment.
2. If no deployment starts automatically, Trigger deploy → Deploy project.
3. Inspect the new deploy's log (not the older published deploy). It should identify
   the repository's netlify.toml, `Using Next.js Runtime - v5.16.4`, and function
   packaging for `___netlify-server-handler`.
4. When published, check `/`, `/demo`, and an unknown URL. Expect the landing page,
   the demo availability/contact page, and the application's Malay 404 respectively.
5. If unsuccessful, collect the complete new build log and the new deploy status.
   Check whether `NETLIFY_NEXT_PLUGIN_SKIP` or plugins being disabled is configured;
   do not print secret values. The adapter must run, not merely be installed.

Existing UI build settings can stay at the repository root with `npm run build`
and `.next`. The tracked config makes them reproducible. The optional
`DEMO_CONTACT_EMAIL` still controls the contact link; Supabase keys are not required.

## Validation on 28 October 2026

- Unit tests: 15 passed. Lint, strict types and ordinary Next.js build passed.
- Full npm dependency audit after adding the adapter: zero known vulnerabilities.
- Real Netlify Build runner 37.7.0 executed locally with this config:

  ```sh
  npm_config_cache=/workspace/.npm-cache npm exec --cache /workspace/.npm-cache --yes --package=@netlify/build@37.7.0 -- netlify-build --offline --config netlify.toml
  ```

  The command exited 0, selected runtime 5.16.4, built the app and bundled
  `___netlify-server-handler`. The generated function manifest registered `/*`
  routing with `prefer_static: true` and Node 24 runtime. The runner warned that
  the latest online plugin catalogue could not be fetched; it used the installed,
  pinned adapter successfully. No TLS/checksum verification was disabled.

- Production browser regression suite: 20 passed (desktop/mobile Chromium,
  default demo-contact configuration). Hosted adapter responses remain unverified.
- `.netlify` outputs are local generated artifacts, ignored by Git and lint.
- Hosted Netlify delivery is not verified from this cloud: outbound site access
  is blocked. Offline build/bundling is not proof of a published working website.
- The full PRD production-readiness NO-GO remains in effect for actual booking,
  sensitive school data or paid pilots. This correction only prepares public hosting.
