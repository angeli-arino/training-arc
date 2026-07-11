import { PillButton, SoftCard } from "../../components/ui";
import { TrainingResult } from "../../types/training";
import styles from "./WorkoutLog.module.css";

type WorkoutFilter = "all" | "run" | "gym" | "other";

interface WorkoutLogProps {
  filter?: WorkoutFilter;
  latestResult: TrainingResult | null;
  onFilterChange?: (filter: WorkoutFilter) => void;
}

export function WorkoutLog({ latestResult }: WorkoutLogProps) {
  return (
    <form className={styles.logForm} noValidate>
      <article className={styles.questionCard}>
        <div className={styles.questionTitle}>
          <span className={styles.step}>01</span>
          <div>
            <p className="label">Energy</p>
            <h2>How charged are you?</h2>
          </div>
        </div>
        <div className={styles.numberScale} role="radiogroup" aria-label="Energy scale">
          {[1, 2, 3, 4, 5].map((value) => (
            <button key={value} type="button">
              {value}
            </button>
          ))}
        </div>
      </article>

      <article className={styles.questionCard}>
        <div className={styles.questionTitle}>
          <span className={styles.step}>02</span>
          <div>
            <p className="label">Soreness</p>
            <h2>How spicy is the body?</h2>
          </div>
        </div>
        <div className={styles.numberScale} role="radiogroup" aria-label="Soreness scale">
          {[1, 2, 3, 4, 5].map((value) => (
            <button key={value} type="button">
              {value}
            </button>
          ))}
        </div>
      </article>

      <article className={styles.notesCard}>
        <label htmlFor="notes">
          <span className="label">Tiny note</span>
          <strong>Anything worth remembering?</strong>
        </label>
        <textarea id="notes" rows={4} placeholder="Heavy legs, good mood, slept late…" />
      </article>

      <PillButton>Save today’s log <span aria-hidden="true">✦</span></PillButton>
      <p className={styles.saveMessage} role="status">Saved to your arc. Nice and gentle.</p>
    </form>
  );
}
