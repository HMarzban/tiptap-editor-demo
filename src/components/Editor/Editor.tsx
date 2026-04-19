import { EditorContent } from "@tiptap/react";
import { Card } from "@/components/ui/card";
import EditorCardToolbar from "./Toolbar";
import EditorCardFooter from "./Footer";
import { useNetworkStatus } from "./hooks/useNetworkStatus";
import { useEditorInstance } from "./hooks/useEditorInstance";
import { TextEditorProps } from "./hooks/types";

const EditorCard = ({
  initialContent = "<p>Start writing...</p>",
  placeholder = "Start typing here...",
}: TextEditorProps) => {
  const isOnline = useNetworkStatus();
  const { editor, spellCheck, setSpellCheck } = useEditorInstance({
    initialContent,
    placeholder,
  });

  // Render a placeholder while editor is initializing
  if (!editor) {
    return (
      <Card className="shadow-lg mx-auto overflow-hidden border ">
        <div className="p-4 text-muted-foreground">Loading editor...</div>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg p-0 gap-0  mx-auto overflow-hidden border ">
      <EditorCardToolbar editor={editor} />
      <div className="p-0 max-h-96 overflow-y-auto ">
        <EditorContent editor={editor} className="h-full" />
      </div>
      <EditorCardFooter
        editor={editor}
        isOnline={isOnline}
        spellCheck={spellCheck}
        setSpellCheck={setSpellCheck}
      />
    </Card>
  );
};

export default EditorCard;
