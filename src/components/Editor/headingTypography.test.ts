import { describe, expect, it } from "vitest";
import {
  HEADING_LEVEL_FONT_PX,
  PARAGRAPH_FONT_PX,
} from "./headingTypography";

describe("headingTypography", () => {
  it("keeps toolbar and command font sizes in sync for H1–H3", () => {
    expect(HEADING_LEVEL_FONT_PX[1]).toBe("36px");
    expect(HEADING_LEVEL_FONT_PX[2]).toBe("30px");
    expect(HEADING_LEVEL_FONT_PX[3]).toBe("24px");
  });

  it("defines a single paragraph size token", () => {
    expect(PARAGRAPH_FONT_PX).toBe("16px");
  });
});
