import { EditorContent } from "@tiptap/react";
import { Card } from "@/components/ui/card";
import { EditorToolbar } from "./EditorToolbar";
import { EditorFooter } from "./EditorFooter";
import {
  useEditorInstance,
  type EditorCollaborationBinding,
} from "./hooks/useEditorInstance";

export type EditorWorkspaceProps = {
  initialContent: string;
  placeholder: string;
  isOnline: boolean;
  collaboration?: EditorCollaborationBinding;
  /** When set, footer shows live collaborator count (Yjs awareness). */
  collaboratorCount?: number;
};

export function EditorWorkspace({
  initialContent,
  placeholder,
  isOnline,
  collaboration,
  collaboratorCount,
}: EditorWorkspaceProps) {
  const { editor, spellCheck, setSpellCheck } = useEditorInstance({
    initialContent,
    placeholder,
    collaboration,
  });

  if (!editor) {
    return (
      <Card className="shadow-lg mx-auto overflow-hidden border">
        <div className="p-4 text-ui-muted" role="status" aria-live="polite">
          Loading editor…
        </div>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg p-0 gap-0 mx-auto overflow-hidden border">
      <EditorToolbar editor={editor} />
      <div className="p-0 max-h-96 overflow-y-auto">
        <EditorContent editor={editor} className="h-full min-h-0" />
      </div>
      <EditorFooter
        editor={editor}
        isOnline={isOnline}
        spellCheck={spellCheck}
        setSpellCheck={setSpellCheck}
        collaboratorCount={collaboratorCount}
      />
    </Card>
  );
}
