/**
 * ProseMirror root DOM contract. Keep in sync with `.tiptap` in `src/index.css`.
 * Hyperlink popover theming: `--hl-*` in `index.css` + package styles in `main.tsx`.
 */
export const EDITOR_ROOT_CLASS_NAME = "tiptap";

export function buildEditorRootAttributes(spellCheck: boolean): {
  class: string;
  spellcheck: string;
} {
  return {
    class: EDITOR_ROOT_CLASS_NAME,
    spellcheck: String(spellCheck),
  };
}
