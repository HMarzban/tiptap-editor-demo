# TipTap Editor

Rich text editor (React, Vite, TipTap v3, Bun). Includes toolbar, hyperlink popovers (`@docs.plus/extension-hyperlink`), indent, and light/dark theming via `next-themes`.

## Requirements

- [Bun](https://bun.sh) 1.x (`package.json` `engines.bun`)

## Commands

| Script        | Purpose                          |
| ------------- | -------------------------------- |
| `bun install` | Install dependencies             |
| `bun run dev` | Local dev server                 |
| `bun run lint` | ESLint                           |
| `bun run typecheck` | TypeScript project references |
| `bun run build` | `tsc -b` + production bundle     |
| `bun run ci` | Lint + typecheck + build (local gate) |
| `bun run preview` | Preview production build     |

## CI

GitHub Actions runs `bun install --frozen-lockfile`, lint, typecheck, and build on pushes/PRs to `main` / `master`.

## Production notes

- Build emits **hidden source maps** for error tracking without shipping obvious `.map` URLs to browsers.
- Editor root uses a stable **`tiptap` class** on the ProseMirror element so `index.css` prose rules apply; spellcheck updates no longer wipe that class.
- **Error boundary** wraps the app in `main.tsx` for graceful failure.
- Hyperlink popover tokens (`--hl-*`) are mapped to the app theme in `src/index.css`.

## Environment

Optional `.env.local` (see `.env.example`). Use `VITE_*` only for client-safe values.
