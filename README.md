# TipTap editor demo

React + [TipTap](https://tiptap.dev/) v3 demo: toolbar (headings, lists, links, images, tasks), hyperlink popovers, indent, and light/dark theme. The bundled sample document is there to exercise formatting.

**Live:** [hmarzban.github.io/tiptap-editor-demo](https://hmarzban.github.io/tiptap-editor-demo/)

## Quick start

Requirements: [Bun](https://bun.sh) 1.x.

```bash
bun install
bun run dev
```

Open the URL Vite prints (default `http://localhost:5173`).

Production build and local preview:

```bash
bun run build
bun run preview
```

For this repo’s GitHub Pages base path, use **http://localhost:4173/tiptap-editor-demo/** after `bun run preview`.

## Stack

Bun, React 19, Vite 8, Tailwind CSS 4, TipTap 3 / ProseMirror. Quality checks: ESLint, TypeScript (`tsc -b`), Vitest, GitHub Actions. Optional realtime editing uses Yjs, **`y-webrtc`** (peer-to-peer, public signaling), or optionally **`@hocuspocus/provider`** when you set a WebSocket URL; see below.

## Optional collaboration

Multi-user editing (shared document, remote carets) works from a **static** build—no app server required.

**Default path (good for GitHub Pages demos):** set **`VITE_COLLAB=true`** only. The app uses **WebRTC** via [y-webrtc](https://github.com/yjs/y-webrtc) with **public signaling** (override with comma-separated **`VITE_COLLAB_SIGNALING`** if needed). ICE uses public **Google STUN** hosts. This is **best-effort**: peers may fail to connect on strict networks, and **content is not durable**—treat it as a playground.

**Optional WebSocket path:** set **`VITE_COLLAB_WS_URL`** to a Hocuspocus-compatible **`wss://`** endpoint; then WebRTC is **not** used.

For both paths, **`VITE_COLLAB_ROOM`** selects the document / room (optional). Copy **`.env.example`** into **`.env.local`** or set the same **`VITE_*`** variables in CI for production builds.

The **GitHub Pages** workflow sets **`VITE_COLLAB=true`** at build time so the hosted demo can use WebRTC without extra secrets.

## Scripts

| Command | Purpose |
| --- | --- |
| `bun run dev` | Dev server |
| `bun run build` | Typecheck + production build |
| `bun run preview` | Serve `dist/` |
| `bun run lint` | ESLint |
| `bun run typecheck` | TypeScript only |
| `bun run test` | Vitest (single run) |
| `bun run test:watch` | Vitest watch |
| `bun run ci` | Lint, typecheck, test, build (same as CI) |

## Continuous integration

On push and on pull requests to `main` or `master`, CI runs `bun install --frozen-lockfile`, then lint, typecheck, test, and build.

## Where things live

- **Editor chrome and extensions:** `src/components/Editor/` (extensions are composed in `createEditorExtensions.ts`).
- **Defaults and sample HTML:** `src/config/`, `src/content/`.
- **ProseMirror root class and attributes:** `editorSurface.ts` and `.tiptap` in `src/index.css`.
- **Collaboration config:** `src/config/collaboration.ts`; shared provider typing in `src/lib/collabProvider.ts`. Only variables prefixed with **`VITE_`** are exposed to the browser.

## License

[MIT](LICENSE). Copyright (c) 2026 Hossein Marzban.
