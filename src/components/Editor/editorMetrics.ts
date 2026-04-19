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
 * Aggregates footer metrics. Prefers `@tiptap/extension-character-count` when registered;
 * falls back to plain text length for characters if storage is missing.
 */
export function getEditorDocumentStats(editor: Editor): EditorDocumentStats {
  const text = editor.getText();
  const lineCount = text ? text.split("\n").length : 1;
  const cc = editor.storage.characterCount as CharacterCountStorage | undefined;

  const wordCount = typeof cc?.words === "function" ? cc.words() : 0;
  const charCount =
    typeof cc?.characters === "function" ? cc.characters() : text.length;

  return { wordCount, charCount, lineCount };
}
