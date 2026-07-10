export const STATUS = {
  slay: "Slay Day",
  modify: "Modify the Quest",
  recovery: "Recovery Episode",
  peace: "Peace Mode",
};

export const DEFAULT_SCAN = {
  energy: 3,
  soreness: "mild",
  breathing: "normal",
  mood: "calm",
  plannedWorkout: "run",
  rpe: 5,
};

const SORENESS_SCORE = {
  none: 1,
  mild: 1,
  medium: 0,
  spicy: -1,
  absolutely_cooked: -2,
};

const BREATHING_SCORE = {
  normal: 1,
  slightly_off: 0,
  coughing: -1,
  sick_sick: -3,
};

const PLAN_LABEL = {
  run: "easy run rhythm",
  gym: "lighter accessories or upper body",
  hybrid: "choose either run or gym, not both",
  rest_day: "keep the rest day protected",
  unsure: "pick the gentlest useful option",
};

function scoreEnergy(energy) {
  if (energy >= 4) return 2;
  if (energy === 3) return 1;
  return -2;
}

function scoreRpe(rpe) {
  if (rpe <= 5) return 1;
  if (rpe <= 7) return 0;
  return -1;
}

function getBaseScore(scan) {
  return (
    scoreEnergy(scan.energy) +
    SORENESS_SCORE[scan.soreness] +
    BREATHING_SCORE[scan.breathing] +
    scoreRpe(scan.rpe)
  );
}

function getModification(scan) {
  return PLAN_LABEL[scan.plannedWorkout] || PLAN_LABEL.unsure;
}

function resultFor(status, scan, score) {
  const common = {
    status,
    score,
    plan: scan.plannedWorkout,
  };

  if (status === STATUS.peace) {
    return {
      ...common,
      tone: "grounding",
      hero: "Regulate first. Training can wait.",
      why: "Your nervous system is asking for the main quest today.",
      recommendation: "Start with one soft reset, then decide again in 20 minutes.",
      modifiedPlan: "Five minutes of breathing, a shower, or a gentle walk outside.",
      tinyWin: "Tiny win accepted: one calm reset.",
    };
  }

  if (status === STATUS.recovery) {
    return {
      ...common,
      tone: "protective",
      hero: "Protect the protagonist.",
      why: "Low recovery signals mean intensity would cost more than it gives.",
      recommendation: "Rest, walk gently, stretch, hydrate, and make bedtime easy.",
      modifiedPlan: "Skip proving mode. Recovery is the training.",
      tinyWin: "Tiny win accepted: 20 minutes of mobility or an early night.",
    };
  }

  if (status === STATUS.modify) {
    return {
      ...common,
      tone: "practical",
      hero: "Still showing up, just smarter.",
      why: "Your scan has mixed signals, so today wants a softer version.",
      recommendation: "Reduce intensity, volume, or complexity and keep the habit alive.",
      modifiedPlan: `Quest adjustment: ${getModification(scan)}.`,
      tinyWin: "Tiny win accepted: stop while it still feels kind.",
    };
  }

  return {
    ...common,
    tone: "upbeat",
    hero: "Main character energy detected.",
    why: "Energy, breathing, and recovery signals are steady enough to train.",
    recommendation: "Train as planned, keep it sensible, and check in after.",
    modifiedPlan: "No modification needed.",
    tinyWin: "Tiny win accepted: warm up properly.",
  };
}

export function evaluateBodyScan(scan) {
  if (scan.mood === "emotionally_cooked") {
    return resultFor(STATUS.peace, scan, getBaseScore(scan));
  }

  if (scan.breathing === "sick_sick") {
    return resultFor(STATUS.recovery, scan, getBaseScore(scan));
  }

  if (
    scan.energy === 1 &&
    (scan.soreness === "spicy" || scan.soreness === "absolutely_cooked")
  ) {
    return resultFor(STATUS.recovery, scan, getBaseScore(scan));
  }

  if (scan.mood === "anxious" && scan.energy <= 2) {
    return resultFor(STATUS.peace, scan, getBaseScore(scan));
  }

  if (scan.mood === "anxious") {
    return resultFor(STATUS.modify, scan, getBaseScore(scan));
  }

  const score = getBaseScore(scan);

  if (score >= 4) return resultFor(STATUS.slay, scan, score);
  if (score >= 1) return resultFor(STATUS.modify, scan, score);
  return resultFor(STATUS.recovery, scan, score);
}
