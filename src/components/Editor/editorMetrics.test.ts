import type { Editor } from "@tiptap/react";
import { describe, expect, it } from "vitest";
import { getEditorDocumentStats } from "./editorMetrics";

function editorStub(options: {
  text: string;
  characterCount?: {
    words?: () => number;
    characters?: () => number;
  };
}): Editor {
  return {
    getText: () => options.text,
    storage: options.characterCount
      ? { characterCount: options.characterCount }
      : {},
  } as unknown as Editor;
}

describe("getEditorDocumentStats", () => {
  it("uses CharacterCount storage when present", () => {
    const stats = getEditorDocumentStats(
      editorStub({
        text: "hello world",
        characterCount: {
          words: () => 2,
          characters: () => 11,
        },
      })
    );
    expect(stats).toEqual({
      wordCount: 2,
      charCount: 11,
      lineCount: 1,
    });
  });

  it("falls back to plain text when CharacterCount storage is missing", () => {
    const stats = getEditorDocumentStats(editorStub({ text: "abc" }));
    expect(stats.wordCount).toBe(1);
    expect(stats.charCount).toBe(3);
    expect(stats.lineCount).toBe(1);
  });

  it("counts lines from newline-separated text", () => {
    const stats = getEditorDocumentStats(
      editorStub({ text: "a\nb\nc", characterCount: { words: () => 0 } })
    );
    expect(stats.lineCount).toBe(3);
    expect(stats.wordCount).toBe(3);
  });

  it("derives counts from text when CharacterCount reports zero but text is non-empty", () => {
    const stats = getEditorDocumentStats(
      editorStub({
        text: "hello",
        characterCount: {
          words: () => 0,
          characters: () => 0,
        },
      })
    );
    expect(stats.wordCount).toBe(1);
    expect(stats.charCount).toBe(5);
  });

  it("treats an empty document as one line", () => {
    const stats = getEditorDocumentStats(editorStub({ text: "" }));
    expect(stats.lineCount).toBe(1);
  });
});
