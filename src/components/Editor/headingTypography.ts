/** Single source for heading → font-size mapping (toolbar + commands). */
export const HEADING_LEVEL_FONT_PX = {
  1: "36px",
  2: "30px",
  3: "24px",
} as const;

export type HeadingLevel = keyof typeof HEADING_LEVEL_FONT_PX;

export const PARAGRAPH_FONT_PX = "16px";
