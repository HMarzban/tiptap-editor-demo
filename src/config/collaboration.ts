/**
 * Opt-in realtime editing: set `VITE_COLLAB=true`.
 *
 * - With **`VITE_COLLAB_WS_URL`**: Hocuspocus-compatible WebSocket sync (self-hosted).
 * - Without it: **WebRTC** (y-webrtc); default **no** signaling URLs (same-browser sync only unless
 *   `VITE_COLLAB_SIGNALING` is set). Fine for a static demo; cross-device needs your `wss` or WS URL.
 */

const DEFAULT_ROOM = "tiptap-demo";

/**
 * Default: **no** built-in signaling URLs. Former community relays (`signaling.yjs.dev`, fly.dev,
 * etc.) often fail in the browser, which floods the console with WebSocket errors and does not
 * help users. Same-browser tabs still sync via y-webrtc **BroadcastChannel** without signaling.
 *
 * For two separate devices, set **`VITE_COLLAB_SIGNALING`** to your own `wss://` server that
 * runs the y-webrtc signaling protocol (`y-webrtc-signaling` / `bin/server.js`), or use
 * **`VITE_COLLAB_WS_URL`** (Hocuspocus) instead.
 *
 * Note: **Google STUN** (`stun.l.google.com`) is only for ICE/NAT traversal, not signaling—there
 * is no Google-hosted y-webrtc signaling endpoint.
 */
const DEFAULT_WEBRTC_SIGNALING: readonly string[] = [];

export function isCollabEnabled(): boolean {
  return import.meta.env.VITE_COLLAB === "true";
}

/** Yjs sync endpoint (Hocuspocus-compatible WebSocket). Empty → use WebRTC instead. */
export function getCollabWebSocketUrl(): string {
  return import.meta.env.VITE_COLLAB_WS_URL?.trim() ?? "";
}

/** Comma-separated `wss://` signaling URLs for y-webrtc (must speak y-webrtc protocol). */
export function getWebrtcSignalingUrls(): string[] {
  const raw = import.meta.env.VITE_COLLAB_SIGNALING?.trim();
  if (!raw) {
    return [...DEFAULT_WEBRTC_SIGNALING];
  }
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/** Public STUN (ICE) for WebRTC — helps some NATs; not a Yjs signaling server. */
export function getWebrtcPeerOpts(): { config: RTCConfiguration } {
  return {
    config: {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    },
  };
}

export function getCollabRoomId(): string {
  const raw = import.meta.env.VITE_COLLAB_ROOM?.trim();
  return raw && raw.length > 0 ? raw : DEFAULT_ROOM;
}
