import { useEditor } from "@tiptap/react";
import { useState, useEffect } from "react";
import { createEditorExtensions } from "../createEditorExtensions";
import {
  DEFAULT_INITIAL_HTML,
  DEFAULT_PLACEHOLDER_TEXT,
  EDITOR_ROOT_CLASS_NAME,
} from "../constants";

export interface UseEditorInstanceParams {
  initialContent?: string;
  placeholder?: string;
}

export function useEditorInstance({
  initialContent = DEFAULT_INITIAL_HTML,
  placeholder = DEFAULT_PLACEHOLDER_TEXT,
}: UseEditorInstanceParams) {
  const [spellCheck, setSpellCheck] = useState(true);

  const editor = useEditor({
    extensions: createEditorExtensions({ placeholder }),
    content: initialContent,
    editorProps: {
      attributes: {
        class: EDITOR_ROOT_CLASS_NAME,
        spellcheck: String(spellCheck),
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    editor.setOptions({
      editorProps: {
        attributes: {
          class: EDITOR_ROOT_CLASS_NAME,
          spellcheck: String(spellCheck),
        },
      },
    });
  }, [spellCheck, editor]);

  return { editor, spellCheck, setSpellCheck };
}
