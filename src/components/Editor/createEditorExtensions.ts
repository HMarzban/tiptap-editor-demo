import type { Extensions } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import {
  Hyperlink,
  createHyperlinkPopover,
  previewHyperlinkPopover,
} from "@docs.plus/extension-hyperlink";
import { Indent } from "@docs.plus/extension-indent";
import { FontSize } from "./extensions/fontSizeExtension";

export type CreateEditorExtensionsOptions = {
  placeholder: string;
};

/**
 * TipTap extension composition root. Pairs with:
 * - DOM class: `editorSurface.ts` + `.tiptap` in `index.css`
 * - Footer metrics: `CharacterCount` storage (see `editorMetrics.ts`)
 */
export function createEditorExtensions({
  placeholder,
}: CreateEditorExtensionsOptions): Extensions {
  return [
    StarterKit.configure({
      heading: { levels: [1, 2, 3] },
      link: false,
    }),
    Underline,
    Placeholder.configure({ placeholder }),
    CharacterCount,
    FontSize.configure({ types: ["textStyle"] }),
    TaskList,
    TaskItem.configure({ nested: true }),
    Hyperlink.configure({
      popovers: {
        previewHyperlink: previewHyperlinkPopover,
        createHyperlink: createHyperlinkPopover,
      },
      HTMLAttributes: {
        rel: "noopener noreferrer",
        target: "_blank",
      },
    }),
    Image,
    TextStyle,
    Color,
    Indent.configure({
      indentChars: "\t",
      enabled: true,
      allowedNodeTypes: ["heading", "paragraph", "codeBlock", "code"],
    }),
  ];
}
