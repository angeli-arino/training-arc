export const STATUS = {
  slay: "Slay Day",
  modify: "Modify the Quest",
  recovery: "Recovery Episode",
  peace: "Peace Mode"
} as const;

export type TrainingStatus = (typeof STATUS)[keyof typeof STATUS];
export type Soreness = "none" | "mild" | "medium" | "spicy" | "absolutely_cooked";
export type Breathing = "normal" | "slightly_off" | "coughing" | "sick_sick";
export type Mood = "calm" | "frazzled" | "anxious" | "emotionally_cooked";
export type PlannedWorkout = "run" | "gym" | "hybrid" | "rest_day" | "unsure";
export type Route = "home" | "scan" | "result" | "log" | "arc";
export type Theme = "light" | "dark";

export interface BodyScan {
  energy: number;
  soreness: Soreness;
  breathing: Breathing;
  mood: Mood;
  plannedWorkout: PlannedWorkout;
  rpe: number;
}

export interface TrainingResult {
  status: TrainingStatus;
  score: number;
  plan: PlannedWorkout;
  tone: "grounding" | "protective" | "practical" | "upbeat";
  hero: string;
  why: string;
  recommendation: string;
  modifiedPlan: string;
  tinyWin: string;
}

export interface SavedArc {
  date: string;
  status: TrainingStatus;
  scan: BodyScan;
}
