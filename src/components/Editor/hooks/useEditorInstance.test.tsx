/** @vitest-environment happy-dom */

import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { buildEditorRootAttributes } from "../editorSurface";
import { useEditorInstance } from "./useEditorInstance";

describe("useEditorInstance", () => {
  it("wires TipTap to editor surface attributes and updates spellcheck", async () => {
    const { result } = renderHook(() =>
      useEditorInstance({
        initialContent: "<p>Integration</p>",
        placeholder: "Write here",
      })
    );

    await waitFor(() => {
      expect(result.current.editor).not.toBeNull();
    });

    const editor = result.current.editor!;
    expect(editor.isDestroyed).toBe(false);
    expect(editor.getText()).toContain("Integration");
    expect(editor.options.editorProps?.attributes).toEqual(
      buildEditorRootAttributes(true)
    );
    expect(result.current.spellCheck).toBe(true);

    await act(async () => {
      result.current.setSpellCheck(false);
    });

    await waitFor(() => {
      expect(editor.options.editorProps?.attributes).toEqual(
        buildEditorRootAttributes(false)
      );
    });
  });
});
