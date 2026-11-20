import { describe, expect, it } from "vitest";
import { upcomingPrograms } from "@/data/upcomingPrograms";

describe("Fasting and prayer", () => {
  it("runs November 24 through December 31, 2026", () => {
    const program = upcomingPrograms.find((item) => item.id === "fasting-prayer-november");
    expect(program?.date).toBe("November 24 – December 31, 2026");
  });
});