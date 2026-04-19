import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { FontSize } from "../extensions/fontSizeExtension";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import {
  Hyperlink,
  createHyperlinkPopover,
  previewHyperlinkPopover,
} from "@docs.plus/extension-hyperlink";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useState, useEffect } from "react";
import { Indent } from "@docs.plus/extension-indent";

interface UseEditorProps {
  initialContent?: string;
  placeholder?: string;
}

export function useEditorInstance({
  initialContent = "<p>Start writing...</p>",
  placeholder = "Start typing here...",
}: UseEditorProps) {
  const [spellCheck, setSpellCheck] = useState<boolean>(true);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        link: false,
      }),
      Underline,
      Placeholder.configure({
        placeholder,
      }),
      CharacterCount,
      FontSize.configure({
        types: ["textStyle"],
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
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
    ],
    content: initialContent,
  });

  // Update spellcheck when the toggle changes
  useEffect(() => {
    if (editor) {
      editor.setOptions({
        editorProps: {
          attributes: {
            spellcheck: spellCheck.toString(),
          },
        },
      });
    }
  }, [spellCheck, editor]);

  return { editor, spellCheck, setSpellCheck };
}
