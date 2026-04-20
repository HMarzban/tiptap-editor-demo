import { HocuspocusProvider } from "@hocuspocus/provider";
import { useEffect, useState } from "react";
import type { Awareness } from "y-protocols/awareness";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import {
  getCollabRoomId,
  getCollabWebSocketUrl,
  getWebrtcPeerOpts,
  getWebrtcSignalingUrls,
} from "@/config/collaboration";
import type { CollabSyncProvider } from "@/lib/collabProvider";
import { getCollabUserIdentity } from "@/lib/collabUser";

export type CollaborationSession = {
  ydoc: Y.Doc | null;
  provider: CollabSyncProvider | null;
  /** True when collab is off, or the sync layer is ready to edit. */
  isReady: boolean;
  /** Awareness clients in this document, including this tab. */
  peerCount: number;
};

/**
 * One Y.Doc + sync provider when `enabled` is true.
 * Uses Hocuspocus WebSocket if `VITE_COLLAB_WS_URL` is set; otherwise y-webrtc (public signaling).
 */
export function useCollaborationSession(
  enabled: boolean
): CollaborationSession {
  const wsUrl = getCollabWebSocketUrl();
  const useWebSocket = wsUrl.length > 0;
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<CollabSyncProvider | null>(null);
  const [synced, setSynced] = useState(false);
  const [peerCount, setPeerCount] = useState(1);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const doc = new Y.Doc();
    let cancelled = false;
    let readyFallbackId: ReturnType<typeof setTimeout> | undefined;
    let webrtc: WebrtcProvider | undefined;

    const onWebrtcSynced = ({ synced: ok }: { synced: boolean }) => {
      if (ok) {
        setSynced(true);
      }
    };

    const prov: CollabSyncProvider = useWebSocket
      ? new HocuspocusProvider({
          url: wsUrl,
          name: getCollabRoomId(),
          document: doc,
          onSynced: () => setSynced(true),
        })
      : (webrtc = new WebrtcProvider(getCollabRoomId(), doc, {
          signaling: getWebrtcSignalingUrls(),
          peerOpts: getWebrtcPeerOpts(),
        }));

    if (useWebSocket) {
      const hp = prov as HocuspocusProvider;
      if (!hp.awareness) {
        hp.destroy();
        doc.destroy();
        return undefined;
      }
    }

    const awareness: Awareness = prov.awareness!;

    if (!useWebSocket) {
      webrtc!.on("synced", onWebrtcSynced);
      readyFallbackId = setTimeout(() => {
        if (!cancelled) {
          setSynced(true);
        }
      }, 4000);
    }

    awareness.setLocalStateField("user", getCollabUserIdentity());

    const onAwareness = () => {
      setPeerCount(awareness.getStates().size);
    };
    awareness.on("update", onAwareness);
    onAwareness();

    queueMicrotask(() => {
      if (cancelled) return;
      setYdoc(doc);
      setProvider(prov);
    });

    return () => {
      cancelled = true;
      if (readyFallbackId !== undefined) {
        clearTimeout(readyFallbackId);
      }
      if (webrtc) {
        webrtc.off("synced", onWebrtcSynced);
      }
      awareness.off("update", onAwareness);
      prov.destroy();
      doc.destroy();
      setYdoc(null);
      setProvider(null);
      setSynced(false);
      setPeerCount(1);
    };
  }, [enabled, useWebSocket, wsUrl]);

  const isReady =
    !enabled || (ydoc !== null && provider !== null && synced);

  return { ydoc, provider, isReady, peerCount };
}
