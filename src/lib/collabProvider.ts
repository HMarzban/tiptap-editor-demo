import type { HocuspocusProvider } from "@hocuspocus/provider";
import type { WebrtcProvider } from "y-webrtc";

/** Yjs sync driver for Collaboration + CollaborationCaret (both expose `.awareness`). */
export type CollabSyncProvider = HocuspocusProvider | WebrtcProvider;
