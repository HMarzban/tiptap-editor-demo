import { Card } from "@/components/ui/card";
import { EditorWorkspace } from "./EditorWorkspace";
import { useNetworkStatus } from "./hooks/useNetworkStatus";
import { useCollaborationSession } from "./hooks/useCollaborationSession";
import { EditorProps } from "./hooks/types";
import {
  EMPTY_DOCUMENT_HTML,
  DEFAULT_EDITOR_PLACEHOLDER,
} from "@/config/editorDefaults";
import { isCollabEnabled } from "@/config/collaboration";

export function Editor({
  initialContent = EMPTY_DOCUMENT_HTML,
  placeholder = DEFAULT_EDITOR_PLACEHOLDER,
}: EditorProps) {
  const isOnline = useNetworkStatus();
  const collabOn = isCollabEnabled();
  const session = useCollaborationSession(collabOn);

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
