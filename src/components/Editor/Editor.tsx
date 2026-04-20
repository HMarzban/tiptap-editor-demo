import { Card } from "@/components/ui/card";
import { EditorWorkspace } from "./EditorWorkspace";
import { useNetworkStatus } from "./hooks/useNetworkStatus";
import { useCollaborationSession } from "./hooks/useCollaborationSession";
import { EditorProps } from "./hooks/types";
import {
  EMPTY_DOCUMENT_HTML,
  DEFAULT_EDITOR_PLACEHOLDER,
} from "@/config/editorDefaults";
import {
  isCollabEnabled,
  isCollabWebSocketConfigured,
} from "@/config/collaboration";

export function Editor({
  initialContent = EMPTY_DOCUMENT_HTML,
  placeholder = DEFAULT_EDITOR_PLACEHOLDER,
}: EditorProps) {
  const isOnline = useNetworkStatus();
  const collabOn = isCollabEnabled();
  const collabWsOk = !collabOn || isCollabWebSocketConfigured();
  const session = useCollaborationSession(collabOn);

  if (collabOn && !collabWsOk) {
    return (
      <Card className="shadow-lg mx-auto overflow-hidden border">
        <div className="p-4 text-sm text-muted-foreground" role="status">
          <p>Collaboration needs a WebSocket URL.</p>
          <p className="text-xs mt-2">
            Set{" "}
            <code className="bg-muted px-1 rounded text-foreground">
              VITE_COLLAB_WS_URL
            </code>{" "}
            (e.g. <code className="bg-muted px-1 rounded text-foreground">wss://…</code>
            ) in your build env alongside{" "}
            <code className="bg-muted px-1 rounded text-foreground">
              VITE_COLLAB=true
            </code>
            . This static app does not bundle a sync server.
          </p>
        </div>
      </Card>
    );
  }

  if (collabOn && !session.isReady) {
    return (
      <Card className="shadow-lg mx-auto overflow-hidden border">
        <div className="p-4 text-sm text-muted-foreground" role="status">
          <p>Connecting to collaboration service…</p>
        </div>
      </Card>
    );
  }

  const collaboration =
    collabOn && session.ydoc && session.provider
      ? { ydoc: session.ydoc, provider: session.provider }
      : undefined;

  return (
    <EditorWorkspace
      initialContent={initialContent}
      placeholder={placeholder}
      isOnline={isOnline}
      collaboration={collaboration}
      collaboratorCount={collaboration ? session.peerCount : undefined}
    />
  );
}

export default Editor;
