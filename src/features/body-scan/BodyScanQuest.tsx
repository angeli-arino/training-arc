import { BodyScan, Breathing, Mood, PlannedWorkout, Soreness } from "../../types/training";
import { PillButton, SoftCard } from "../../components/ui";
import styles from "./BodyScanQuest.module.css";

const ENERGY_OPTIONS: Array<[number, string]> = [
  [1, "floor"],
  [2, "low battery"],
  [3, "functional"],
  [4, "ready"],
  [5, "main character"]
];

const RPE_OPTIONS: Array<[number, string]> = Array.from({ length: 10 }, (_, index) => {
  const value = index + 1;
  const label = value === 1 ? "chill" : value === 5 ? "steady" : value === 10 ? "boss fight" : "";
  return [value, label];
});

const CHOICES = {
  soreness: [
    ["none", "None"],
    ["mild", "Mild"],
    ["medium", "Medium"],
    ["spicy", "Spicy"],
    ["absolutely_cooked", "Absolutely cooked"]
  ] satisfies Array<[Soreness, string]>,
  breathing: [
    ["normal", "Normal"],
    ["slightly_off", "Slightly off"],
    ["coughing", "Coughing"],
    ["sick_sick", "Sick-sick"]
  ] satisfies Array<[Breathing, string]>,
  mood: [
    ["calm", "Calm"],
    ["frazzled", "Frazzled"],
    ["anxious", "Anxious"],
    ["emotionally_cooked", "Emotionally cooked"]
  ] satisfies Array<[Mood, string]>,
  plannedWorkout: [
    ["run", "Run"],
    ["gym", "Gym"],
    ["hybrid", "Hybrid"],
    ["rest_day", "Rest day"],
    ["unsure", "Unsure"]
  ] satisfies Array<[PlannedWorkout, string]>
};

interface BodyScanQuestProps {
  scan: BodyScan;
  scanStep: number;
  onScanChange: (scan: BodyScan) => void;
  onStepChange: (step: number) => void;
  onComplete: () => void;
}

type ScanStep =
  | {
      key: "energy" | "rpe";
      title: string;
      helper: string;
      kind: "score";
      options: Array<[number, string]>;
      count: 5 | 10;
    }
  | {
      key: "soreness" | "breathing" | "mood" | "plannedWorkout";
      title: string;
      helper: string;
      kind: "choice";
      options: Array<[string, string]>;
    };

const SCAN_STEPS: ScanStep[] = [
  {
    key: "energy",
    title: "What is the energy level?",
    helper: "Choose the number that matches your current battery.",
    kind: "score",
    options: ENERGY_OPTIONS,
    count: 5
  },
  {
    key: "soreness",
    title: "How spicy is the soreness?",
    helper: "A little drama is allowed. Joint pain gets extra respect.",
    kind: "choice",
    options: CHOICES.soreness
  },
  {
    key: "breathing",
    title: "Breathing and illness check",
    helper: "If your body is waving a tiny flag, we listen.",
    kind: "choice",
    options: CHOICES.breathing
  },
  {
    key: "mood",
    title: "Where is the emotional weather?",
    helper: "Peace Mode exists because training is not separate from life.",
    kind: "choice",
    options: CHOICES.mood
  },
  {
    key: "plannedWorkout",
    title: "What quest was planned?",
    helper: "Pick the closest version. Unsure is a valid training era.",
    kind: "choice",
    options: CHOICES.plannedWorkout
  },
  {
    key: "rpe",
    title: "Recent effort check",
    helper: "How hard has training felt lately?",
    kind: "score",
    options: RPE_OPTIONS,
    count: 10
  }
];

export function BodyScanQuest({ scan, scanStep, onScanChange, onStepChange, onComplete }: BodyScanQuestProps) {
  const step = SCAN_STEPS[scanStep] ?? SCAN_STEPS[0];
  const isLast = scanStep === SCAN_STEPS.length - 1;

  return (
    <>
      <SoftCard className={styles.scanCard}>
        <div className={styles.scanProgress} aria-hidden="true">
          <span style={{ width: `${((scanStep + 1) / SCAN_STEPS.length) * 100}%` }} />
        </div>
        <div className={styles.questionBlock}>
          <p className="eyebrow">{step.key === "rpe" ? "Recent effort / RPE" : "Cooked Meter"}</p>
          <h2>{step.title}</h2>
          <p className="muted">{step.helper}</p>
          {step.kind === "score" ? (
            <ScoreGrid
              count={step.count}
              label={step.key}
              options={step.options}
              selected={Number(scan[step.key])}
              onSelect={(value) => onScanChange({ ...scan, [step.key]: value })}
            />
          ) : (
            <ChoiceGrid
              label={step.key}
              options={step.options}
              selected={String(scan[step.key])}
              onSelect={(value) => onScanChange({ ...scan, [step.key]: value })}
            />
          )}
        </div>
      </SoftCard>
      <div className={styles.actionRow}>
        <PillButton variant="secondary" disabled={scanStep === 0} onClick={() => onStepChange(Math.max(0, scanStep - 1))}>
          Back
        </PillButton>
        <PillButton
          onClick={() => {
            if (isLast) {
              onComplete();
              return;
            }

            onStepChange(Math.min(SCAN_STEPS.length - 1, scanStep + 1));
          }}
        >
          {isLast ? "Reveal Training Compass" : "Next"}
        </PillButton>
      </div>
    </>
  );
}

function ScoreGrid({
  label,
  options,
  selected,
  count,
  onSelect
}: {
  label: string;
  options: Array<[number, string]>;
  selected: number;
  count: 5 | 10;
  onSelect: (value: number) => void;
}) {
  return (
    <div className={`${styles.scoreGrid} ${count === 10 ? styles.scoreGridTen : ""}`} role="radiogroup" aria-label={label}>
      {options.map(([value, caption]) => (
        <button
          aria-checked={selected === value}
          className={`${styles.scoreButton} ${selected === value ? styles.selected : ""}`}
          key={value}
          role="radio"
          type="button"
          onClick={() => onSelect(value)}
        >
          <span>{value}</span>
          {caption ? <small>{caption}</small> : null}
        </button>
      ))}
    </div>
  );
}

function ChoiceGrid({
  label,
  options,
  selected,
  onSelect
}: {
  label: string;
  options: Array<[string, string]>;
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className={styles.choiceGrid} role="radiogroup" aria-label={label}>
      {options.map(([value, caption]) => (
        <button
          aria-checked={selected === value}
          className={`${styles.choicePill} ${selected === value ? styles.selected : ""}`}
          key={value}
          role="radio"
          type="button"
          onClick={() => onSelect(value)}
        >
          {caption}
        </button>
      ))}
    </div>
  );
}
