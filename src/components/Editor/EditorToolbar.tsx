import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Heading, Palette } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useToolbarState,
  TEXT_COLORS,
  TEXT_STYLES,
  FONT_SIZES,
} from "./hooks/useToolbarState";
import { useToolbarItems } from "./hooks/useToolbarItems";
import { EditorToolbarProps, ToolbarItem } from "./hooks/types";

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const {
    activeColor,
    currentFontSize,
    currentTextStyle,
    setFontSize,
    adjustFontSize,
    setTextStyle,
    setColor,
    isColorActive,
  } = useToolbarState(editor);

  const toolbarItems = useToolbarItems(editor);

  if (!editor) return null;

  function renderToolbarItem(item: ToolbarItem, index: number) {
    if (item.type === "separator") {
      return (
        <Separator key={index} orientation="vertical" className="!mx-1 !h-5" />
      );
    }

    if (item.type === "text-style") {
      return (
        <Select
          key={index}
          value={currentTextStyle}
          onValueChange={setTextStyle}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <SelectTrigger className="w-[130px] h-8">
                <Heading className="h-4 w-4 mr-1" />
                <SelectValue placeholder="Text Style" />
              </SelectTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
          <SelectContent>
            {TEXT_STYLES.map(({ name, value }) => (
              <SelectItem key={value} value={value}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (item.type === "font-size") {
      return (
        <Select key={index} value={currentFontSize} onValueChange={setFontSize}>
          <Tooltip>
            <TooltipTrigger asChild>
              <SelectTrigger className="w-[84px] h-8">
                <SelectValue placeholder="Font Size" />
              </SelectTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
          <SelectContent>
            {FONT_SIZES.map(({ name, value }) => (
              <SelectItem key={value} value={value}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (item.type === "font-size-adjust") {
      return (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Button
              variant={item.isActive ? "secondary" : "ghost"}
              size="icon"
              onClick={() => adjustFontSize(item.direction)}
              className={`h-8 w-8 ${
                item.isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-neutral-700"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="sr-only">{item.title}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.title}</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    if (item.type === "color-picker") {
      return (
        <Popover key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 relative ${
                    isColorActive(activeColor)
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : ""
                  }`}
                >
                  <Palette className="h-4 w-4" />
                  <span
                    className="absolute bottom-1 right-1 h-2 w-2 rounded-full"
                    style={{
                      backgroundColor:
                        activeColor !== "inherit"
                          ? activeColor
                          : "currentColor",
                    }}
                  />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.title}</p>
            </TooltipContent>
          </Tooltip>
          <PopoverContent className="w-64 p-2">
            <div className="grid grid-cols-5 gap-2">
              {TEXT_COLORS.map(({ name, color }) => {
                const active = isColorActive(color);
                return (
                  <button
                    key={color}
                    type="button"
                    className={`h-6 w-6 rounded-md transition-transform ${
                      active ? "ring-2 ring-offset-1" : ""
                    }`}
                    style={{
                      backgroundColor:
                        color === "inherit" ? "transparent" : color,
                      border:
                        color === "inherit" ? "1px dashed neutral" : "none",
                    }}
                    onClick={() => setColor(color)}
                    title={name}
                  />
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      );
    }

    return (
      <Tooltip key={index}>
        <TooltipTrigger asChild>
          <Button
            variant={item.isActive ? "secondary" : "ghost"}
            size="icon"
            onClick={item.action}
            disabled={item.disabled}
            className={`h-8 w-8 ${
              item.isActive
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "hover:bg-accent hover:text-accent-foreground dark:hover:bg-neutral-700"
            }`}
          >
            {item.icon && <item.icon className="h-4 w-4" />}
            <span className="sr-only">{item.title}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {item.title}{" "}
            {item.hotkey && (
              <span className="text-xs opacity-70">({item.hotkey})</span>
            )}
          </p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div className="border-b flex items-center p-3" role="toolbar">
      <div className="flex items-center gap-1 flex-wrap">
        {toolbarItems.map((item, index) => renderToolbarItem(item, index))}
      </div>
    </div>
  );
}
