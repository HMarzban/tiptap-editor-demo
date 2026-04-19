import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Link2,
  Image,
  Plus,
  Minus,
} from "lucide-react";
import { ToolbarItem } from "./types";
import { promptForImageUrl } from "@/lib/promptForImageUrl";

export function useToolbarItems(editor: Editor | null): ToolbarItem[] {
  if (!editor) return [];

  const toolbarItems: ToolbarItem[] = [
    { type: "text-style", title: "Text Style" },
    { type: "separator" },
    {
      type: "font-size-adjust",
      icon: Minus,
      direction: "decrease",
      title: "Decrease Font Size",
    },
    { type: "font-size", title: "Font Size" },
    {
      type: "font-size-adjust",
      icon: Plus,
      direction: "increase",
      title: "Increase Font Size",
    },
    { type: "separator" },
    {
      type: "standard",
      icon: Bold,
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      hotkey: "Ctrl+B",
    },
    {
      type: "standard",
      icon: Italic,
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      hotkey: "Ctrl+I",
    },
    {
      type: "standard",
      icon: Underline,
      title: "Underline",
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
      hotkey: "Ctrl+U",
    },
    {
      type: "standard",
      icon: Strikethrough,
      title: "Strikethrough",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      hotkey: "Ctrl+Shift+X",
    },
    { type: "color-picker", title: "Text Color" },
    { type: "separator" },
    {
      type: "standard",
      icon: List,
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      hotkey: "Ctrl+Shift+8",
    },
    {
      type: "standard",
      icon: ListOrdered,
      title: "Numbered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      hotkey: "Ctrl+Shift+7",
    },
    {
      type: "standard",
      icon: ListTodo,
      title: "Task List",
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: editor.isActive("taskList"),
      hotkey: "Ctrl+Shift+9",
    },
    {
      type: "standard",
      icon: Quote,
      title: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
      hotkey: "Ctrl+Shift+B",
    },
    {
      type: "standard",
      icon: Code,
      title: "Code Block",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive("codeBlock"),
      hotkey: "Ctrl+Alt+C",
    },
    { type: "separator" },
    {
      type: "standard",
      icon: Link2,
      title: "Hyperlink",
      action: () => {
        editor.chain().focus().setHyperlink().run();
        return true;
      },
      isActive: editor.isActive("hyperlink"),
      hotkey: "Mod+K",
    },
    {
      type: "standard",
      icon: Image,
      title: "Image",
      action: () => {
        const url = promptForImageUrl();
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
        return true;
      },
      hotkey: "Ctrl+Shift+I",
    },
  ];

  return toolbarItems;
}
