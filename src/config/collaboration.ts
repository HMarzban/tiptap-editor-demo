/**
 * Opt-in realtime editing: set `VITE_COLLAB=true`.
 *
 * - With **`VITE_COLLAB_WS_URL`**: Hocuspocus-compatible WebSocket sync (self-hosted).
 * - Without it: **WebRTC** (y-webrtc) + public signaling — fine for a static demo; data can be
 *   ephemeral if peers never connect.
 */

const DEFAULT_ROOM = "tiptap-demo";

/** y-webrtc defaults (package ships `wss://y-webrtc-eu.fly.dev`; override via `VITE_COLLAB_SIGNALING`). */
const DEFAULT_WEBRTC_SIGNALING = ["wss://y-webrtc-eu.fly.dev"] as const;

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
  return raw.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
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
