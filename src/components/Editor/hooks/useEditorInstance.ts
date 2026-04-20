import { useEditor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { createEditorExtensions } from "../createEditorExtensions";
import {
  EMPTY_DOCUMENT_HTML,
  DEFAULT_EDITOR_PLACEHOLDER,
} from "@/config/editorDefaults";
import { buildEditorRootAttributes } from "../editorSurface";
import type { CollabSyncProvider } from "@/lib/collabProvider";

export type EditorCollaborationBinding = {
  ydoc: Y.Doc;
  provider: CollabSyncProvider;
};

export interface UseEditorInstanceParams {
  initialContent?: string;
  placeholder?: string;
  collaboration?: EditorCollaborationBinding;
}

export function useEditorInstance({
  initialContent = EMPTY_DOCUMENT_HTML,
  placeholder = DEFAULT_EDITOR_PLACEHOLDER,
  collaboration,
}: UseEditorInstanceParams) {
  const [spellCheck, setSpellCheck] = useState(true);
  const seedRef = useRef(false);

  const editor = useEditor({
    extensions: createEditorExtensions({ placeholder, collaboration }),
    content: collaboration ? undefined : initialContent,
    editorProps: {
      attributes: buildEditorRootAttributes(spellCheck),
    },
  });

  useEffect(() => {
    seedRef.current = false;
  }, [collaboration?.ydoc, collaboration?.provider]);

  useEffect(() => {
    if (!editor || !collaboration) {
      return;
    }

    const awareness = collaboration.provider.awareness;
    if (!awareness) {
      return;
    }

    const trySeed = () => {
      if (seedRef.current) {
        return;
      }
      if (!editor.isEmpty) {
        seedRef.current = true;
        return;
      }
      if (awareness.getStates().size > 1) {
        return;
      }
      editor.commands.setContent(initialContent);
      seedRef.current = true;
    };

    awareness.on("update", trySeed);
    trySeed();
    return () => {
      awareness.off("update", trySeed);
    };
  }, [editor, collaboration, initialContent]);

  useEffect(() => {
    if (!editor) {
      return;
    }
    editor.setOptions({
      editorProps: {
        attributes: buildEditorRootAttributes(spellCheck),
      },
    });
  }, [spellCheck, editor]);

  return { editor, spellCheck, setSpellCheck };
}
