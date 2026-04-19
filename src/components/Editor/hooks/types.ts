import { Editor } from "@tiptap/react";
import { LucideIcon } from "lucide-react";

/** Props for the rich-text editor surface (`Editor.tsx`). */
export interface EditorProps {
  initialContent?: string;
  placeholder?: string;
}

export interface EditorToolbarProps {
  editor: Editor | null;
}

export interface EditorFooterProps {
  editor: Editor | null;
  isOnline: boolean;
  spellCheck: boolean;
  setSpellCheck: (value: boolean) => void;
}

// Base item
export interface ToolbarItemBase {
  title?: string;
  hotkey?: string;
}

// Standard button item
export interface StandardToolbarItem extends ToolbarItemBase {
  type?: "standard";
  icon: LucideIcon;
  action: () => boolean;
  isActive?: boolean;
  disabled?: boolean;
}

// Separator
export interface SeparatorToolbarItem {
  type: "separator";
}

// Text style selector
export interface TextStyleToolbarItem extends ToolbarItemBase {
  type: "text-style";
}

// Font size selector
export interface FontSizeToolbarItem extends ToolbarItemBase {
  type: "font-size";
}

// Increase/decrease font size
export interface FontSizeAdjustItem extends ToolbarItemBase {
  type: "font-size-adjust";
  icon: LucideIcon;
  direction: "increase" | "decrease";
  isActive?: boolean;
}

// Color picker
export interface ColorPickerToolbarItem extends ToolbarItemBase {
  type: "color-picker";
}

// Union
export type ToolbarItem =
  | StandardToolbarItem
  | SeparatorToolbarItem
  | TextStyleToolbarItem
  | FontSizeToolbarItem
  | FontSizeAdjustItem
  | ColorPickerToolbarItem;
