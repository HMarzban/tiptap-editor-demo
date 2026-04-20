import type { DecorationAttrs } from "@tiptap/pm/view";

const HEX6 = /^#[0-9a-fA-F]{6}$/;

/** Awareness `user` payload from CollaborationCaret / y-tiptap. */
export type CollabCaretUser = Record<string, unknown>;

function caretColor(user: CollabCaretUser): string {
  const c = user.color;
  return typeof c === "string" && HEX6.test(c) ? c : "#888888";
}

function caretLabel(user: CollabCaretUser): string {
  const n = user.name;
  return typeof n === "string" && n.trim().length > 0 ? n.trim() : "Guest";
}

/**
 * DOM for remote cursors (CollaborationCaret `render` option).
 * Uses a `span` label so it stays inline-width — `div` was stretching full line.
 */
export function renderCollaborationCaret(user: CollabCaretUser): HTMLElement {
  const color = caretColor(user);
  const cursor = document.createElement("span");
  cursor.classList.add("collaboration-carets__caret");
  cursor.setAttribute("style", `border-color: ${color}`);

  const label = document.createElement("span");
  label.classList.add("collaboration-carets__label");
  label.setAttribute("style", `background-color: ${color}`);
  label.textContent = caretLabel(user);

  cursor.appendChild(label);
  return cursor;
}

/** Softer remote selection than y-tiptap default (full-line orange slab). */
export function renderCollaborationSelection(
  user: CollabCaretUser
): DecorationAttrs {
  const color = caretColor(user);
  return {
    class: "collaboration-carets__selection",
    style: `background-color: color-mix(in srgb, ${color} 22%, transparent);`,
  };
}
