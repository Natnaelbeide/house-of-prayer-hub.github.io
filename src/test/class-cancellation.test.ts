import { describe, expect, it } from "vitest";
import { classCancellation } from "@/data/upcomingPrograms";

describe("This week's class cancellations", () => {
  it("cancels Wednesday November 11", () => {
    expect(classCancellation.dates).toContain("2026-11-11");
  });

  it("cancels Thursday November 12", () => {
    expect(classCancellation.dates).toContain("2026-11-12");
  });
});