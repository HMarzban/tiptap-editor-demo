import { useEditor } from "@tiptap/react";
import { useState, useEffect } from "react";
import { createEditorExtensions } from "../createEditorExtensions";
import {
  EMPTY_DOCUMENT_HTML,
  DEFAULT_EDITOR_PLACEHOLDER,
} from "@/config/editorDefaults";
import { buildEditorRootAttributes } from "../editorSurface";

export interface UseEditorInstanceParams {
  initialContent?: string;
  placeholder?: string;
}

export function useEditorInstance({
  initialContent = EMPTY_DOCUMENT_HTML,
  placeholder = DEFAULT_EDITOR_PLACEHOLDER,
}: UseEditorInstanceParams) {
  const [spellCheck, setSpellCheck] = useState(true);

  const editor = useEditor({
    extensions: createEditorExtensions({ placeholder }),
    content: initialContent,
    editorProps: {
      attributes: buildEditorRootAttributes(spellCheck),
    },
  });

  useEffect(() => {
    if (!editor) return;
    editor.setOptions({
      editorProps: {
        attributes: buildEditorRootAttributes(spellCheck),
      },
    });
  }, [spellCheck, editor]);

  return { editor, spellCheck, setSpellCheck };
}
