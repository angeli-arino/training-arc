import { describe, expect, it } from "vitest";
import { DEFAULT_SCAN, STATUS, evaluateBodyScan } from "./bodyScanLogic";

describe("evaluateBodyScan", () => {
  it("returns Slay Day for strong recovery signals", () => {
    const result = evaluateBodyScan({
      ...DEFAULT_SCAN,
      energy: 5,
      soreness: "mild",
      breathing: "normal",
      mood: "calm",
      rpe: 4
    });

    expect(result.status).toBe(STATUS.slay);
  });

  it("returns Modify the Quest for mixed signals", () => {
    const result = evaluateBodyScan({
      ...DEFAULT_SCAN,
      energy: 3,
      soreness: "medium",
      breathing: "normal",
      mood: "frazzled",
      rpe: 8
    });

    expect(result.status).toBe(STATUS.modify);
  });

  it("sick-sick breathing overrides to Recovery Episode", () => {
    const result = evaluateBodyScan({
      ...DEFAULT_SCAN,
      energy: 5,
      breathing: "sick_sick"
    });

    expect(result.status).toBe(STATUS.recovery);
  });

  it("emotionally cooked mood overrides to Peace Mode", () => {
    const result = evaluateBodyScan({
      ...DEFAULT_SCAN,
      energy: 5,
      mood: "emotionally_cooked"
    });

    expect(result.status).toBe(STATUS.peace);
  });
});
