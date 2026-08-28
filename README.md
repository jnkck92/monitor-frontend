# monitor

![Build](https://github.com/jnkck92/monitor/actions/workflows/release.yml/badge.svg)
![Version](https://img.shields.io/github/v/tag/jnkck92/monitor?label=version)
![License](https://img.shields.io/badge/license-MIT-blue)

A fullscreen, dark-themed monitor dashboard for fire departments. Displays personnel and vehicle radio statuses in standby mode and switches automatically to an alarm view when an active incident is reported — powered by the [monitor-backend](https://github.com/jnkck92/monitor-backend) which aggregates data from the [Divera 24/7](https://www.divera247.com) API.

---

## Key Features

- **Standby view** — shows all configured personnel and vehicles with their current radio status (Divera status codes with colour coding)
- **Alarm view** — triggered automatically when an active alarm is present; displays alerted vehicles, keyword, address and matched AAO rule
- **Live polling** — status endpoint is polled every 5 seconds; cached data stays visible during connectivity loss
- **Fullscreen monitor layout** — designed to run on a wall-mounted display; fully responsive using `clamp()`-based fluid typography
- **Docker-ready** — multi-stage build produces a minimal Nginx image for arm64 (Raspberry Pi) and amd64

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Vue 3](https://vuejs.org) (Composition API, `<script setup>`) |
| Language | TypeScript |
| Build tool | [Vite](https://vite.dev) |
| Routing | Vue Router 5 |
| Styling | Scoped CSS, CSS custom properties, `clamp()` fluid sizing |
| Linting | ESLint + oxlint + Prettier |
| Container | Docker (multi-stage) + Nginx |
| CI/CD | GitHub Actions |
| Registry | GitHub Container Registry (GHCR) |

---

## Project Structure

```
monitor/
├── .github/
│   └── workflows/
│       ├── ci.yml              # lint + type-check on push
│       └── release.yml         # Docker build & push on tag
├── public/
├── src/
│   ├── assets/                 # Global CSS, theme variables
│   ├── components/
│   │   ├── AlarmHeader.vue     # Alarm keyword, address, elapsed time
│   │   ├── StandbyHeader.vue   # Department name, clock, connection status
│   │   └── StatusCard.vue      # Reusable card for vehicles and persons
│   ├── composables/
│   │   ├── useClock.ts         # Reactive clock (HH:MM:SS + date)
│   │   ├── useElapsed.ts       # Elapsed time since alarm
│   │   └── useStatus.ts        # Polling composable (5 s interval)
│   ├── router/
│   │   └── index.ts
│   ├── types/
│   │   └── status.ts           # TypeScript interfaces for the API
│   ├── views/
│   │   ├── AlarmView.vue       # Active alarm display
│   │   ├── StandbyView.vue     # Normal standby display
│   │   └── StatusView.vue      # Root view — switches between Standby/Alarm
│   ├── App.vue
│   └── main.ts
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── vite.config.ts
└── package.json
```

---

## Prerequisites

- **Node.js** `^22.18.0` or `>=24.12.0`
- **npm** `>=10`
- **Docker** (for containerised deployment)
- A running instance of [monitor-backend](https://github.com/jnkck92/monitor-backend)

---

## Installation & Local Development

```bash
# 1. Clone the repository
git clone https://github.com/jnkck92/monitor.git
cd monitor

# 2. Install dependencies
npm install

# 3. Start the dev server (hot reload)
npm run dev
```

The dev server proxies `/api/*` to the backend configured in `vite.config.ts`. Change the `target` URL to point to your local backend instance:

```typescript
// vite.config.ts
proxy: {
  '/api': {
    target: 'http://localhost:8081',  // ← your backend
    changeOrigin: true
  }
}
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Configuration

| Setting | Location | Description |
|---|---|---|
| Backend URL (dev) | `vite.config.ts` → `server.proxy` | Proxy target for `/api` during development |
| Backend URL (prod) | `nginx.conf` → `location /api/` | Reverse proxy target in the Docker image |
| Department name | `VITE_DEPARTMENT_NAME` env variable | Displayed in the standby header; defaults to `"Feuerwehr"` |
| Poll interval | `src/composables/useStatus.ts` | Default: `5000` ms |

### Environment Variables

Create a `.env.local` file for local overrides (not committed):

```bash
VITE_DEPARTMENT_NAME=Feuerwehr Musterstadt
```

---

## API

The frontend consumes a single endpoint provided by [monitor-backend](https://github.com/jnkck92/monitor-backend):

### `GET /api/status`

Returns the current monitor state.

```json
{
  "mode": "STANDBY",
  "persons": [
    {
      "id": "ortsbm",
      "name": "OrtsBm",
      "radioStatus": { "label": "BEREIT/FUNK", "color": "#6ddd6d" },
      "alerted": null
    }
  ],
  "vehicles": [
    {
      "id": "hlf20",
      "name": "HLF20",
      "radioStatus": { "label": "BEREIT/WACHE", "color": "#1e9e4a" },
      "alerted": null
    }
  ],
  "activeAlarm": null,
  "lastUpdate": "2026-08-28T12:14:23.851Z",
  "error": null
}
```

When `activeAlarm` is non-null, the UI switches to the alarm view:

```json
{
  "activeAlarm": {
    "title": "B2 - Wohnungsbrand",
    "address": "Musterstraße 1, Musterstadt",
    "matchedLabel": "Staffel",
    "matchedColor": "#e67e22"
  }
}
```

---

## Available Scripts

```bash
npm run dev          # Start dev server with HMR
npm run build        # Type-check + production build → dist/
npm run preview      # Preview production build locally
npm run lint         # Run oxlint + eslint (auto-fix)
npm run format       # Format source files with Prettier
npm run type-check   # Run vue-tsc
```

---

## Docker

### Build locally

```bash
docker build -t monitor .
docker run -p 80:80 monitor
```

### Docker Compose

```bash
docker compose up -d
```

The compose file pulls the pre-built image from GHCR. Nginx proxies `/api/*` to the backend as defined in `nginx.conf` — no CORS configuration required.

---

## CI/CD

| Workflow | Trigger | Action |
|---|---|---|
| `ci.yml` | Push / PR to `develop` | Lint + type-check |
| `release.yml` | Push of tag `v*` | Build multi-arch Docker image, push to GHCR |

### Creating a Release

```bash
# On the develop branch:
npm version patch   # or minor / major
git push origin develop --follow-tags
```

The tag push triggers the release workflow which builds and pushes:

```
ghcr.io/jnkck92/monitor:1.2.3
ghcr.io/jnkck92/monitor:latest
```

---

## Contributing

1. Fork the repository
2. Create a feature branch from `develop`: `git checkout -b feat/my-feature`
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org)
4. Open a pull request against `develop`

---

## License

MIT © jnkck92

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
