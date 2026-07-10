import test from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_SCAN, STATUS, evaluateBodyScan } from "./bodyScanLogic.js";

test("returns Slay Day for strong recovery signals", () => {
  const result = evaluateBodyScan({
    ...DEFAULT_SCAN,
    energy: 5,
    soreness: "mild",
    breathing: "normal",
    mood: "calm",
    rpe: 4,
  });

  assert.equal(result.status, STATUS.slay);
});

test("returns Modify the Quest for mixed signals", () => {
  const result = evaluateBodyScan({
    ...DEFAULT_SCAN,
    energy: 3,
    soreness: "medium",
    breathing: "normal",
    mood: "frazzled",
    rpe: 8,
  });

  assert.equal(result.status, STATUS.modify);
});

test("sick-sick breathing overrides to Recovery Episode", () => {
  const result = evaluateBodyScan({
    ...DEFAULT_SCAN,
    energy: 5,
    breathing: "sick_sick",
  });

  assert.equal(result.status, STATUS.recovery);
});

test("emotionally cooked mood overrides to Peace Mode", () => {
  const result = evaluateBodyScan({
    ...DEFAULT_SCAN,
    energy: 5,
    mood: "emotionally_cooked",
  });

  assert.equal(result.status, STATUS.peace);
});
