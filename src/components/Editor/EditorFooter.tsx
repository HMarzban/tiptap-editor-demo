import { Clock, CircleDot, SpellCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EditorFooterProps } from "./hooks/types";
import { READING_SPEED_WORDS_PER_MINUTE } from "@/config/editorDefaults";
import { getEditorDocumentStats } from "./editorMetrics";

export function EditorFooter({
  editor,
  isOnline,
  spellCheck,
  setSpellCheck,
}: EditorFooterProps) {
  if (!editor) return null;

  const { wordCount, charCount, lineCount } = getEditorDocumentStats(editor);
  const readingTimeMinutes = Math.max(
    1,
    Math.ceil(wordCount / READING_SPEED_WORDS_PER_MINUTE)
  );

  return (
    <footer
      className="border-t px-3 py-2 flex justify-between items-center text-sm text-muted-foreground bg-muted/30"
      aria-label="Editor status"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <CircleDot
            className={cn(
              "w-3 h-3 mr-1",
              isOnline ? "text-green-500" : "text-neutral-400"
            )}
            aria-hidden
          />
          <span>{isOnline ? "Online" : "Offline"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setSpellCheck(!spellCheck)}
            className={cn(
              "h-7 text-xs",
              spellCheck ? "text-primary font-medium" : "text-muted-foreground"
            )}
          >
            <SpellCheck
              className={cn(
                "h-3 w-3 mr-1",
                spellCheck ? "text-primary" : "text-muted-foreground"
              )}
              aria-hidden
            />
            Spellcheck
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" aria-hidden />
          <span>{readingTimeMinutes} min read</span>
        </div>

        <div className="tabular-nums">
          {wordCount} {wordCount === 1 ? "word" : "words"} · {charCount}{" "}
          {charCount === 1 ? "character" : "characters"} · {lineCount}{" "}
          {lineCount === 1 ? "line" : "lines"}
        </div>
      </div>
    </footer>
  );
}
