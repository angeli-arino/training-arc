import { SoftCard, statusSlug } from "../../components/ui";
import { STATUS, TrainingResult, TrainingStatus } from "../../types/training";
import styles from "./WeeklyArc.module.css";

interface WeeklyArcProps {
  latestResult: TrainingResult | null;
}

export function WeeklyArc({ latestResult }: WeeklyArcProps) {
  const days: Array<[string, string, TrainingStatus, string]> = [
    ["M", "6", STATUS.slay, "Run"],
    ["T", "7", STATUS.modify, "Gym"],
    ["W", "8", STATUS.recovery, "Walk"],
    ["T", "9", STATUS.peace, "Reset"],
    ["F", "10", latestResult?.status ?? STATUS.modify, "Today"],
    ["S", "11", STATUS.slay, "Long"],
    ["S", "12", STATUS.recovery, "Rest"]
  ];

  return (
    <>
      <SoftCard variant="blush">
        <div className={styles.weeklyStrip} aria-label="Weekly status strip">
          {days.map(([day, date, status, note]) => (
            <div className={`${styles.dayBubble} ${styles[statusSlug(status)]}`} key={`${day}-${date}`}>
              <span>{day}</span>
              <strong>{date}</strong>
              <small>{note}</small>
            </div>
          ))}
        </div>
      </SoftCard>
      <SoftCard>
        <p className="eyebrow">Training load summary</p>
        <h2>Hard days 2 / 3</h2>
        <p className="muted">Long run protected. Recovery debt is being watched gently.</p>
      </SoftCard>
      <SoftCard>
        <p className="eyebrow">Focus this week</p>
        <h2>Tiny wins count</h2>
        <p className="muted">Keep the rhythm, soften the sharp edges, and save the day you actually have.</p>
      </SoftCard>
    </>
  );
}
