import { describe, expect, it } from "vitest";
import {
  buildEditorRootAttributes,
  EDITOR_ROOT_CLASS_NAME,
} from "./editorSurface";

describe("editorSurface", () => {
  it("exposes a single root class name for CSS and editorAttributes", () => {
    expect(EDITOR_ROOT_CLASS_NAME).toBe("tiptap");
  });

  it("buildEditorRootAttributes maps spellCheck to a string spellcheck attribute", () => {
    expect(buildEditorRootAttributes(true)).toEqual({
      class: "tiptap",
      spellcheck: "true",
    });
    expect(buildEditorRootAttributes(false)).toEqual({
      class: "tiptap",
      spellcheck: "false",
    });
  });
});
