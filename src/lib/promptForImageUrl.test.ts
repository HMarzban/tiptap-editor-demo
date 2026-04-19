/** @vitest-environment happy-dom */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { promptForImageUrl } from "./promptForImageUrl";

describe("promptForImageUrl", () => {
  describe("when prompt is available", () => {
    let promptMock: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      promptMock = vi.fn();
      Object.defineProperty(window, "prompt", {
        configurable: true,
        writable: true,
        value: promptMock,
      });
    });

    afterEach(() => {
      Reflect.deleteProperty(window, "prompt");
    });

    it("asks for a URL, trims input, and returns non-empty strings", () => {
      promptMock.mockReturnValue("  https://example.com/x.png  ");
      expect(promptForImageUrl()).toBe("https://example.com/x.png");
      expect(promptMock).toHaveBeenCalledWith("Enter image URL:");
    });

    it("returns null when prompt is dismissed, empty, or whitespace-only", () => {
      promptMock.mockReturnValueOnce(null);
      expect(promptForImageUrl()).toBeNull();

      promptMock.mockReturnValueOnce("");
      expect(promptForImageUrl()).toBeNull();

      promptMock.mockReturnValueOnce("  \t  ");
      expect(promptForImageUrl()).toBeNull();
    });
  });

  it("returns null when `window` is missing (SSR-style)", () => {
    const prev = globalThis.window;
    Reflect.deleteProperty(globalThis, "window");
    try {
      expect(promptForImageUrl()).toBeNull();
    } finally {
      Object.defineProperty(globalThis, "window", {
        configurable: true,
        enumerable: true,
        value: prev,
        writable: true,
      });
    }
  });
});
