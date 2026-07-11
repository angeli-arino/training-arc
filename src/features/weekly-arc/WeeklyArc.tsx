import { TrainingResult } from "../../types/training";
import styles from "./WeeklyArc.module.css";

interface WeeklyArcProps {
  latestResult: TrainingResult | null;
}

const quests = [
  { day: "Monday", title: "Heavy Legs", detail: "Completed · 58 min", mark: "✓", complete: true },
  { day: "Tuesday", title: "Easy Run + Upper Body", detail: "Completed · 6.1 km", mark: "✓", complete: true },
  { day: "Wednesday · Today", title: "Tempo Run", detail: "30 min · Modify available", mark: "03", complete: false },
  { day: "Thursday", title: "Rest Day", detail: "Recovery quest", mark: "04", complete: false },
  { day: "Friday", title: "Heavy Legs", detail: "Strength · 60 min", mark: "05", complete: false },
  { day: "Saturday", title: "Upper Body + Optional Easy Run", detail: "Flexible quest", mark: "06", complete: false },
  { day: "Sunday", title: "Long Run", detail: "Easy effort · 70 min", mark: "07", complete: false }
];

export function WeeklyArc({ latestResult }: WeeklyArcProps) {
  const progressCopy = latestResult ? "Your plan adjusted with care." : "You are building momentum without borrowing energy from tomorrow.";

  return (
    <section className={styles.questBoard} aria-label="This week's quest board">
      <article className={styles.progressCard}>
        <div className={styles.progressRing}><strong>72%</strong></div>
        <div>
          <p className="eyebrow">Week 1 progress</p>
          <h2>Three quests cleared</h2>
          <p>{progressCopy}</p>
        </div>
      </article>

      <div className={styles.sectionHeading}>
        <h2>This week</h2>
        <button type="button">Edit plan</button>
      </div>

      <div className={styles.questList}>
        {quests.map((quest) => (
          <article className={`${styles.quest} ${quest.complete ? styles.complete : styles.upcoming}`} key={quest.day}>
            <span className={styles.questMark}>{quest.mark}</span>
            <div className={styles.questCopy}>
              <p>{quest.day}</p>
              <h3>{quest.title}</h3>
              <span>{quest.detail}</span>
            </div>
            <button className={styles.questAction} type="button" aria-label={`Options for ${quest.title}`}>
              {quest.complete ? "•••" : "→"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
