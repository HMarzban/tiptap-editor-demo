import { EditorContent } from "@tiptap/react";
import { Card } from "@/components/ui/card";
import { EditorToolbar } from "./EditorToolbar";
import { EditorFooter } from "./EditorFooter";
import { useNetworkStatus } from "./hooks/useNetworkStatus";
import { useEditorInstance } from "./hooks/useEditorInstance";
import { EditorProps } from "./hooks/types";
import {
  EMPTY_DOCUMENT_HTML,
  DEFAULT_EDITOR_PLACEHOLDER,
} from "@/config/editorDefaults";

export function Editor({
  initialContent = EMPTY_DOCUMENT_HTML,
  placeholder = DEFAULT_EDITOR_PLACEHOLDER,
}: EditorProps) {
  const isOnline = useNetworkStatus();
  const { editor, spellCheck, setSpellCheck } = useEditorInstance({
    initialContent,
    placeholder,
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
      />
    </Card>
  );
}

export default Editor;
