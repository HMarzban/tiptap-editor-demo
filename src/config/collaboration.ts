/**
 * Opt-in realtime editing: set `VITE_COLLAB=true` and `VITE_COLLAB_WS_URL` to a
 * reachable WebSocket (e.g. `wss://…` on GitHub Pages). No server ships with this app.
 */

const DEFAULT_ROOM = "tiptap-demo";

export function isCollabEnabled(): boolean {
  return import.meta.env.VITE_COLLAB === "true";
}

/** Yjs sync endpoint (Hocuspocus-compatible WebSocket). Empty if unset. */
export function getCollabWebSocketUrl(): string {
  return import.meta.env.VITE_COLLAB_WS_URL?.trim() ?? "";
}

export function isCollabWebSocketConfigured(): boolean {
  return getCollabWebSocketUrl().length > 0;
}

export function getCollabRoomId(): string {
  const raw = import.meta.env.VITE_COLLAB_ROOM?.trim();
  return raw && raw.length > 0 ? raw : DEFAULT_ROOM;
}
