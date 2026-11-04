<br>

<p align="center">
    <a href="https://werbot.com" target="_blank">
        <img width="300" src="https://github.com/werbot/.github/raw/main/img/yellow/text.svg" alt="Werbot Logo">
    </a>
</p>

<h3 align="center">Werbot is a single sign-on solution<br>for easy and secure sharing of servers,<br>
databases or app access</h3>

<br>

<p align="center">
    <a href="https://github.com/werbot/werbot.web/releases">
    <img src="https://img.shields.io/github/v/release/werbot/werbot.web?sort=semver&label=Release&color=651FFF" />
    </a>
    &nbsp;
    <a href="https://github.com/werbot/werbot.web"><img src="https://img.shields.io/badge/frontend-sveltekit-orange.svg"></a>
    &nbsp;
    <a href="https://twitter.com/werbot_"><img src="https://img.shields.io/twitter/follow/werbot_?style=social"></a>
</p>

<p align="center">
    <a href="https://www.linkedin.com/company/werbot/"><img height="20" src="https://github.com/werbot/.github/raw/main/img/social/linkedin.svg" alt="LinkedIn"></a>
    &nbsp;
    <a href="https://twitter.com/werbot_"><img height="20" src="https://github.com/werbot/.github/raw/main/img/social/twitter.svg" alt="Twitter"></a>
    &nbsp;
    <a href="https://www.youtube.com/channel/UCQk0_i0h-xB9s9sv4R7HX2g"><img height="20" src="https://github.com/werbot/.github/raw/main/img/social/youtube.svg" alt="Youtube"></a>
    &nbsp;
    <a href="https://dev.to/werbot"><img height="20" src="https://github.com/werbot/.github/raw/main/img/social/dev.svg" alt="Dev"></a>
    &nbsp;
    <a href="https://stackoverflow.com/questions/tagged/werbot"><img height="20" src="https://github.com/werbot/.github/raw/main/img/social/stack-overflow.svg" alt="StackOverflow"></a>
</p>

## <img width="24" src="https://github.com/werbot/.github/raw/main/img/yellow/logo.svg">&nbsp;&nbsp;What is Werbot?

<img src="https://github.com/werbot/.github/raw/main/img/preview/app_main_sh.png">

## Stack

- SvelteKit 2 with Svelte 5 runes, static output via `@sveltejs/adapter-static` (`ssr = false`)
- Tailwind CSS 4 through `@tailwindcss/vite`
- TypeScript, ESLint 9 (flat config), Prettier, Vitest, Playwright
- Bun for install, scripts and the add-on generator

The app is a client-side SPA: `build/index.html` is the fallback that nginx
serves for every route. The API base URL is read from `VITE_API_URL` at build
time (see `.env.production.example`).

## Requirements

- Bun 1.3+
- Node 20+ (only for tooling that still expects it)
- Docker (optional, for the production image)

## Commands

| Command | Description |
| --- | --- |
| `bun install` | Install dependencies |
| `bun run dev` | Generate add-on routes and start the dev server on `:5173` |
| `bun run build` | Generate add-on routes and build into `build/` |
| `bun run preview` | Serve the production build on `:4173` |
| `bun run check` | `svelte-check` type checking |
| `bun run lint` | ESLint plus the no-Vue guard |
| `bun run test:unit` | Vitest unit and component tests |
| `bun run test:e2e` | Playwright smoke and visual tests |
| `bun run test:visual` | Playwright visual parity suite only |

`predev`, `prebuild`, `precheck` and `pretest:unit` run
`scripts/addons/generate.ts` first, so generated routes exist before
`svelte-kit sync`.

## Add-on generator

`scripts/addons/generate.ts` scans add-on roots for `web/router/<section>/index.mjs`,
`web/pages/**/*.svelte` and `web/pages/<section>/menu.ts`, then writes generated
SvelteKit route wrappers to `src/routes/` and a registry to
`src/generated/addons/`. Generated files are gitignored and removed on the next
run.

- Default root: `../add-on` (the sibling checkout in the monorepo).
- Override with `ADDON_ROOTS=/path/to/add-on` or
  `bun scripts/addons/generate.ts --roots /path/to/add-on`. Only one root is
  supported: a colon-separated list with more than one entry fails the run.
- `ADDON_ROOTS=""` builds the host with no add-on routes and no add-on chunks.
- Test fixtures live in `e2e/fixtures/`; unit tests point the generator at them
  explicitly. They are not part of the default root, so production builds never
  include them.

Add-on route changes are picked up when the generator runs again (`bun run dev`
restarts it). A restart after editing `index.mjs` is acceptable.

## Add-on web contract

The host and every add-on share one contract. Folder names and data shapes are
unchanged from the previous frontend; only the component format changed.

| Artifact | Path | Shape |
| --- | --- | --- |
| Pages | `web/pages/**/*.svelte` | Svelte 5 components |
| Routes | `web/router/<section>/index.mjs` | `[{ path, name, children, meta, props }]`; `component: () => import("...svelte")` |
| Menus | `web/pages/<section>/menu.ts` | plain `export const menu = { groupNN: [...] }` |
| Protos | `web/proto/**` | generated TypeScript, unchanged |
| Sections | `admin`, `profile`, `project` | unchanged |

Rules:

- `path`, `children`, `:param`, `props: true`, `redirect` and `meta.layout`
  keep their meaning. `props: true` spreads the route params into the page as
  string props.
- `menu` is merged into the sidebar with numeric group ordering. `topMenu` is
  ignored; the profile dropdown is host-owned.
- Add-on pages may import `@addon-kit` (`gotoRoute`, `routePath`,
  `isActiveRoute`, `authStore`, `systemStore`, `projectStore`, `getMenu`,
  `menuHref`) and their own `@addon/<name>/web/**` files.
- Add-on pages may not import Vue, Vue Router, Pinia, Notiwind or
  `@vueuse/core`. `scripts/check-no-vue.ts` (run by `bun run lint`) enforces
  this for host code and every sibling `add-on/*/web` folder.
- The generator emits one dynamic import per page, so every add-on page stays a
  separate lazy chunk.

## Local visual parity suite

The suite compares 55 routes against `e2e/baselines/` and needs a running
backend with the migration fixtures. Starting the backend and applying the
fixtures are separate steps: `make migration dev up` only runs goose (core
schema, add-on schemas, dev fixtures) against the Postgres from `.env`; it does
not start any service.

```bash
# from the repository root, with the .env created by `make init`:
# 1. start the backend services (Postgres, Redis, gRPC services, taco, haproxy).
#    The `app` service is the published web image, not this working tree.
docker compose -f docker/docker-compose.yaml up -d

# 2. apply migrations and dev fixtures (goose only)
make migration dev up

# from web/: run the dev server against the API, then the suite
VITE_API_URL=https://api.<your-domain> bun run dev -- --port 5174
WEB_BASE_URL=http://localhost:5174 bun run test:visual
```

The compose `taco` service is only published through haproxy. For an API on
`http://localhost:8088`, skip the compose `taco` and `haproxy` services and run
`go run -tags saas ./cmd/taco` in its own shell (it loads `.env`), then start the
dev server with `VITE_API_URL=http://localhost:8088`. `VITE_API_URL` is inlined
when the dev server starts, so restart it after changing the value.

Admin baselines include the `add-on/saas` sidebar entries, so run the suite with
the add-ons checked out. Baselines are updated only for a deliberate change:

```bash
WEB_BASE_URL=http://localhost:5174 bun run test:visual:update
```

## Branch and release

- `master` is the release branch. Feature work lands through pull requests.
- Releases are cut from tags `vX.Y.Z`; the release workflow builds the static
  site, then the nginx image from `build/`.
- The image replaces the API host in the hashed chunks at container start when
  `API_DSN` is set (see `.docker/entrypoint.sh`).

## License

Apache-2.0. See [LICENSE](LICENSE).
