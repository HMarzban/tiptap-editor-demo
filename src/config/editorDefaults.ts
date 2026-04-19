/**
 * Single source for editor bootstrap strings (empty state + placeholders).
 * Demo HTML lives in `src/content/sampleDocumentHtml.ts`.
 */
export { SAMPLE_DOCUMENT_HTML } from "@/content/sampleDocumentHtml";

/** When `initialContent` is omitted on `<Editor />`. */
export const EMPTY_DOCUMENT_HTML = "<p>Start writing...</p>";

/** Default placeholder in the TipTap placeholder extension. */
export const DEFAULT_EDITOR_PLACEHOLDER = "Start typing here…";

/** Placeholder copy for the demo app shell. */
export const APP_SHELL_PLACEHOLDER = "Start writing your content…";

/** Silent reading speed for footer “min read” (words per minute). */
export const READING_SPEED_WORDS_PER_MINUTE = 200;
