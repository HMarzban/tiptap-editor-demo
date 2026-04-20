import type { Editor } from "@tiptap/react";

export type EditorDocumentStats = {
  wordCount: number;
  charCount: number;
  lineCount: number;
};

type CharacterCountStorage = {
  words?: () => number;
  characters?: () => number;
};

/**
 * Footer metrics: use CharacterCount when sane; if the doc has text but counts are zero,
 * derive from `getText()` (covers stale React / rare collab mismatches).
 */
export function getEditorDocumentStats(editor: Editor): EditorDocumentStats {
  const text = editor.getText();
  const lineCount = text.length > 0 ? text.split("\n").length : 1;
  const cc = editor.storage.characterCount as CharacterCountStorage | undefined;

  let wordCount = typeof cc?.words === "function" ? cc.words() : 0;
  let charCount =
    typeof cc?.characters === "function" ? cc.characters() : text.length;

  // CharacterCount storage can report 0 while the doc has text (e.g. rare collab edge cases).
  if (text.length > 0) {
    if (charCount === 0) {
      charCount = text.length;
    }
    if (wordCount === 0 && /\S/.test(text)) {
      wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    }
  }

  return { wordCount, charCount, lineCount };
}
