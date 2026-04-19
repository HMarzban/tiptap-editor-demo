import React from "react";
import { Clock, CircleDot, SpellCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FooterProps } from "./hooks/types";

const Footer: React.FC<FooterProps> = ({
  editor,
  isOnline,
  spellCheck,
  setSpellCheck,
}) => {
  if (!editor) return null;

  const wordCount = editor.storage.characterCount?.words() || 0;
  const charCount = editor.storage.characterCount?.characters() || 0;

  // Calculate reading time (average reading speed: 200 words per minute)
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Get line count by counting newlines in the text
  const text = editor.getText();
  const lineCount = text ? text.split("\n").length : 1;

  return (
    <div className="border-t px-3 py-2 flex justify-between items-center text-sm text-muted-foreground bg-muted/30">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <CircleDot
            className={cn(
              "w-3 h-3 mr-1",
              isOnline ? "text-green-500" : "text-neutral-400"
            )}
          />
          <span>{isOnline ? "Online" : "Offline"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSpellCheck(!spellCheck)}
            className={cn(
              "h-7  text-xs",
              spellCheck ? "text-primary font-medium" : "text-muted-foreground"
            )}
          >
            <SpellCheck
              className={cn(
                "h-3 w-3 mr-1",
                spellCheck ? "text-primary" : "text-muted-foreground"
              )}
            />
            Spell Check
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{readingTimeMinutes} min read</span>
        </div>

        <div>
          {wordCount} {wordCount === 1 ? "word" : "words"} | {charCount}{" "}
          {charCount === 1 ? "char" : "chars"} | {lineCount}{" "}
          {lineCount === 1 ? "line" : "lines"}
        </div>
      </div>
    </div>
  );
};

export default Footer;
