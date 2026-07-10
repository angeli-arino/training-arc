import { IconOrb, PillButton, SoftCard, StatusChip } from "../../components/ui";
import { STATUS, TrainingResult } from "../../types/training";
import styles from "./WorkoutLog.module.css";

type WorkoutFilter = "all" | "run" | "gym" | "other";
type WorkoutType = "run" | "gym" | "walk";

interface WorkoutLogProps {
  filter: WorkoutFilter;
  latestResult: TrainingResult | null;
  onFilterChange: (filter: WorkoutFilter) => void;
}

const WORKOUTS: Array<[WorkoutType, string, string, string, string, typeof STATUS.modify | typeof STATUS.slay | typeof STATUS.recovery]> = [
  ["run", "Easy Run", "Today", "32 min", "RPE 5", STATUS.modify],
  ["gym", "Upper Body", "Yesterday", "45 min", "RPE 7", STATUS.slay],
  ["walk", "Recovery Walk", "Tue", "22 min", "RPE 2", STATUS.recovery]
];

export function WorkoutLog({ filter, latestResult, onFilterChange }: WorkoutLogProps) {
  const workouts = WORKOUTS.map((workout, index) => {
    if (index === 0 && latestResult) return [workout[0], workout[1], workout[2], workout[3], workout[4], latestResult.status] as const;
    return workout;
  });
  const filtered = filter === "all" ? workouts : workouts.filter(([type]) => type === filter);

  return (
    <>
      <div className={styles.filterRow} role="group" aria-label="Workout filter">
        {(["all", "run", "gym", "other"] as WorkoutFilter[]).map((item) => (
          <button
            className={`${styles.choicePill} ${filter === item ? styles.selected : ""}`}
            key={item}
            type="button"
            onClick={() => onFilterChange(item)}
          >
            {item[0].toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>
      <section className={styles.listStack}>
        {filtered.length ? (
          filtered.map((workout) => <WorkoutCard key={`${workout[1]}-${workout[2]}`} workout={workout} />)
        ) : (
          <SoftCard variant="compact">
            <p>No logs yet. Tiny wins count when you save them.</p>
          </SoftCard>
        )}
      </section>
      <PillButton variant="secondary">View all logs</PillButton>
    </>
  );
}

function WorkoutCard({ workout }: { workout: readonly [WorkoutType, string, string, string, string, string] }) {
  const [type, title, date, duration, rpe, status] = workout;

  return (
    <SoftCard variant="compact">
      <article className={styles.workoutCard}>
        <IconOrb label={typeLabel(type)} size="small" />
        <div>
          <p className="eyebrow">{date}</p>
          <h2>{title}</h2>
          <p className="muted">
            {duration} - {rpe}
          </p>
        </div>
        <StatusChip status={status as TrainingResult["status"]} />
      </article>
    </SoftCard>
  );
}

function typeLabel(type: WorkoutType): string {
  return {
    run: "Run",
    gym: "Gym",
    walk: "Walk"
  }[type];
}
