import { HocuspocusProvider } from "@hocuspocus/provider";
import { useEffect, useState } from "react";
import * as Y from "yjs";
import {
  getCollabRoomId,
  getCollabWebSocketUrl,
} from "@/config/collaboration";
import { getCollabUserIdentity } from "@/lib/collabUser";

export type CollaborationSession = {
  ydoc: Y.Doc | null;
  provider: HocuspocusProvider | null;
  /** True when collab is off, or Yjs has completed an initial sync with the server. */
  isReady: boolean;
  /** Awareness clients in this document, including this tab. */
  peerCount: number;
};

/**
 * One Y.Doc + WebSocket sync provider per mounted editor when `enabled` and a
 * `VITE_COLLAB_WS_URL` are set. When `enabled` is false, returns a trivial ready session.
 */
export function useCollaborationSession(
  enabled: boolean
): CollaborationSession {
  const wsUrl = getCollabWebSocketUrl();
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<HocuspocusProvider | null>(null);
  const [synced, setSynced] = useState(false);
  const [peerCount, setPeerCount] = useState(1);

  useEffect(() => {
    if (!enabled || !wsUrl) {
      return undefined;
    }

    const doc = new Y.Doc();
    const prov = new HocuspocusProvider({
      url: wsUrl,
      name: getCollabRoomId(),
      document: doc,
      onSynced: () => setSynced(true),
    });

    const awareness = prov.awareness;
    if (!awareness) {
      prov.destroy();
      doc.destroy();
      return undefined;
    }

    awareness.setLocalStateField("user", getCollabUserIdentity());

    const onAwareness = () => {
      setPeerCount(awareness.getStates().size);
    };
    awareness.on("update", onAwareness);
    onAwareness();

    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setYdoc(doc);
      setProvider(prov);
    });

    return () => {
      cancelled = true;
      awareness.off("update", onAwareness);
      prov.destroy();
      doc.destroy();
      setYdoc(null);
      setProvider(null);
      setSynced(false);
      setPeerCount(1);
    };
  }, [enabled, wsUrl]);

  const isReady =
    !enabled || (ydoc !== null && provider !== null && synced);

  return { ydoc, provider, isReady, peerCount };
}
