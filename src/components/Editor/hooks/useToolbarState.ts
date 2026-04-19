import { useState, useEffect } from "react";
import { Editor } from "@tiptap/react";

export const TEXT_COLORS = [
  { name: "Default", color: "inherit" },
  { name: "Black", color: "#000000" },
  { name: "Gray", color: "#666666" },
  { name: "Red", color: "#ff0000" },
  { name: "Orange", color: "#FF8A00" },
  { name: "Yellow", color: "#FFDD00" },
  { name: "Green", color: "#36B37E" },
  { name: "Blue", color: "#0065FF" },
  { name: "Purple", color: "#8777D9" },
  { name: "Pink", color: "#FF5CAA" },
];

export const FONT_SIZES = [
  { name: "12px", value: "12px" },
  { name: "14px", value: "14px" },
  { name: "16px", value: "16px" },
  { name: "18px", value: "18px" },
  { name: "20px", value: "20px" },
  { name: "24px", value: "24px" },
  { name: "28px", value: "28px" },
  { name: "32px", value: "32px" },
  { name: "36px", value: "36px" },
  { name: "48px", value: "48px" },
];

export const TEXT_STYLES = [
  { name: "Paragraph", value: "paragraph" },
  { name: "Heading 1", value: "h1" },
  { name: "Heading 2", value: "h2" },
  { name: "Heading 3", value: "h3" },
];

export function useToolbarState(editor: Editor | null) {
  const [activeColor, setActiveColor] = useState("inherit");
  const [currentFontSize, setCurrentFontSize] = useState("16px");
  const [currentTextStyle, setCurrentTextStyle] = useState("paragraph");

  const getNearestValidFontSize = (size: string | null | undefined): string => {
    if (!size) return "16px";

    const numericSize = parseInt(size, 10);
    const sizes = FONT_SIZES.map((s) => parseInt(s.value, 10));

    // Find the closest value
    const nearest = sizes.reduce((prev, curr) =>
      Math.abs(curr - numericSize) < Math.abs(prev - numericSize) ? curr : prev
    );

    return `${nearest}px`;
  };

  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      const { color } = editor.getAttributes("textStyle");
      setActiveColor(color || "inherit");

      const { fontSize } = editor.getAttributes("textStyle");
      const normalizedSize = getNearestValidFontSize(fontSize);
      setCurrentFontSize(normalizedSize);

      // Update text style and font size
      if (editor.isActive("heading", { level: 1 })) {
        setCurrentTextStyle("h1");
        setCurrentFontSize("36px");
      } else if (editor.isActive("heading", { level: 2 })) {
        setCurrentTextStyle("h2");
        setCurrentFontSize("28px");
      } else if (editor.isActive("heading", { level: 3 })) {
        setCurrentTextStyle("h3");
        setCurrentFontSize("24px");
      } else {
        setCurrentTextStyle("paragraph");
      }
    };

    editor.on("selectionUpdate", handleUpdate);
    editor.on("focus", handleUpdate);
    return () => {
      editor.off("selectionUpdate", handleUpdate);
      editor.off("focus", handleUpdate);
    };
  }, [editor]);

  // Helpers
  const setFontSize = (size: string) => {
    if (!editor) return;
    editor.chain().focus().setFontSize(size).run();
    setCurrentFontSize(size);
  };

  const adjustFontSize = (direction: "increase" | "decrease") => {
    if (!editor) return;
    const currentSize = parseInt(currentFontSize, 10);
    const sizes = FONT_SIZES.map((s) => parseInt(s.value, 10)).sort(
      (a, b) => a - b
    );

    let newSize: number;
    if (direction === "increase") {
      newSize =
        sizes.find((size) => size > currentSize) || sizes[sizes.length - 1];
    } else {
      newSize =
        sizes.reverse().find((size) => size < currentSize) ||
        sizes[sizes.length - 1];
    }

    setFontSize(`${newSize}px`);
  };

  const setTextStyle = (style: string) => {
    if (!editor) return;
    editor.chain().focus().clearNodes().run();

    switch (style) {
      case "h1":
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 1 })
          .setFontSize("36px")
          .run();
        break;
      case "h2":
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 2 })
          .setFontSize("30px")
          .run();
        break;
      case "h3":
        editor
          .chain()
          .focus()
          .toggleHeading({ level: 3 })
          .setFontSize("24px")
          .run();
        break;
      case "paragraph":
      default:
        editor.chain().focus().setParagraph().setFontSize("16px").run();
        break;
    }

    setCurrentTextStyle(style);
  };

  const setColor = (color: string) => {
    if (!editor) return;
    editor.chain().focus().setColor(color).run();
    setActiveColor(color);
  };

  const isColorActive = (color: string) => {
    if (!editor) return false;
    return editor.isActive("textStyle", { color });
  };

  return {
    activeColor,
    currentFontSize,
    currentTextStyle,
    setFontSize,
    adjustFontSize,
    setTextStyle,
    setColor,
    isColorActive,
  };
}
