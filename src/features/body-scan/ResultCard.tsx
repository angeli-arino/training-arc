import { PillButton, SoftCard, StatusChip, statusSlug } from "../../components/ui";
import { TrainingResult } from "../../types/training";
import styles from "./ResultCard.module.css";

interface ResultCardProps {
  result: TrainingResult;
  onSave: () => void;
  onRetake: () => void;
}

export function ResultCard({ result, onSave, onRetake }: ResultCardProps) {
  return (
    <>
      <SoftCard variant="result">
        <div className={`${styles.resultHero} ${styles[statusSlug(result.status)]}`}>
          <StatusChip status={result.status} />
          <h2>{result.hero}</h2>
          <p>{result.why}</p>
        </div>
        <div className={styles.resultList}>
          <div>
            <p className="eyebrow">Recommendation</p>
            <p>{result.recommendation}</p>
          </div>
          <div>
            <p className="eyebrow">Modified plan</p>
            <p>{result.modifiedPlan}</p>
          </div>
          <div>
            <p className="eyebrow">Tiny win</p>
            <p>{result.tinyWin}</p>
          </div>
        </div>
      </SoftCard>
      <div className={styles.actionStack}>
        <PillButton onClick={onSave}>Save today's arc</PillButton>
        <PillButton variant="secondary" onClick={onRetake}>
          Retake Body Scan Quest
        </PillButton>
      </div>
    </>
  );
}
