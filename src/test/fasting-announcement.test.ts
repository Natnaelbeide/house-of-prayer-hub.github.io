import { describe, expect, it } from "vitest";
import { upcomingPrograms } from "@/data/upcomingPrograms";

describe("November fasting and prayer", () => {
  it("runs November 10 through November 13, 2026", () => {
    const program = upcomingPrograms.find((item) => item.id === "fasting-prayer-november");
    expect(program?.date).toBe("November 10–13, 2026");
  });
});