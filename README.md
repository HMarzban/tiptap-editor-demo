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

Bun, React 19, Vite 8, Tailwind CSS 4, TipTap 3 / ProseMirror. Quality checks: ESLint, TypeScript (`tsc -b`), Vitest, GitHub Actions. Optional realtime editing uses Yjs and a WebSocket client (`@hocuspocus/provider`); see below.

## Optional collaboration

You can turn on **multi-user editing** (shared document, remote carets) by pointing the app at a **WebSocket URL** that speaks a Hocuspocus-compatible protocol. This project is a **static site**—it does not start a sync server for you.

1. Copy `.env.example` to `.env.local` (or set the same variables in your deploy environment).
2. Set **`VITE_COLLAB=true`** and **`VITE_COLLAB_WS_URL`** (use `wss://` when the page is served over HTTPS).
3. Optionally set **`VITE_COLLAB_ROOM`** to split traffic into different documents.

Leave collaboration off for the default single-user demo (`VITE_COLLAB` unset or `false`). If collab is on but **`VITE_COLLAB_WS_URL`** is missing, the UI explains what to configure.

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
- **Collaboration config:** `src/config/collaboration.ts`. Only variables prefixed with **`VITE_`** are exposed to the browser.

## License

[MIT](LICENSE). Copyright (c) 2026 Hossein Marzban.
