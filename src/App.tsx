import { useEffect, useMemo, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { BottomNavigation, Header, IconOrb, PillButton, SoftCard, StatusChip } from "./components/ui";
import { BodyScanQuest } from "./features/body-scan/BodyScanQuest";
import { DEFAULT_SCAN, evaluateBodyScan } from "./features/body-scan/bodyScanLogic";
import { ResultCard } from "./features/body-scan/ResultCard";
import { WeeklyArc } from "./features/weekly-arc/WeeklyArc";
import { WorkoutLog } from "./features/workout-log/WorkoutLog";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { BodyScan, Route, SavedArc, STATUS, Theme, TrainingResult } from "./types/training";
import styles from "./App.module.css";

type WorkoutFilter = "all" | "run" | "gym" | "other";

export default function App() {
  const [route, setRoute] = useState<Route>("home");
  const [theme, setTheme] = useLocalStorage<Theme>("trainingArcTheme", "light");
  const [scan, setScan] = useLocalStorage<BodyScan>("trainingArcDraft", DEFAULT_SCAN);
  const [latestResult, setLatestResult] = useLocalStorage<TrainingResult | null>("trainingArcResult", null);
  const [saved, setSaved] = useLocalStorage<SavedArc[]>("trainingArcSaved", []);
  const [scanStep, setScanStep] = useState(0);
  const [filter, setFilter] = useState<WorkoutFilter>("all");
  const { needRefresh, updateServiceWorker } = useRegisterSW();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const headerCopy = useMemo(() => getHeaderCopy(route, latestResult), [route, latestResult]);

  function navigate(nextRoute: Route) {
    setRoute(nextRoute);
    if (nextRoute === "scan") setScanStep(0);
  }

  function completeScan() {
    const result = evaluateBodyScan(scan);
    setLatestResult(result);
    setRoute("result");
  }

  function saveArc() {
    const result = latestResult ?? evaluateBodyScan(scan);
    const entry: SavedArc = {
      date: new Date().toISOString(),
      status: result.status,
      scan
    };

    setSaved([entry, ...saved].slice(0, 14));
    setLatestResult(result);
    setRoute("arc");
  }

  return (
    <div className={styles.appShell}>
      <main className={styles.screen} aria-live="polite">
        <Header
          kicker={headerCopy.kicker}
          title={headerCopy.title}
          subtitle={headerCopy.subtitle}
          theme={theme}
          onThemeChange={setTheme}
        />
        {route === "home" ? <HomeScreen latestResult={latestResult} onStartScan={() => navigate("scan")} /> : null}
        {route === "scan" ? (
          <BodyScanQuest
            scan={scan}
            scanStep={scanStep}
            onScanChange={setScan}
            onStepChange={setScanStep}
            onComplete={completeScan}
          />
        ) : null}
        {route === "result" && latestResult ? (
          <ResultCard result={latestResult} onSave={saveArc} onRetake={() => navigate("scan")} />
        ) : null}
        {route === "result" && !latestResult ? (
          <ResultCard result={evaluateBodyScan(scan)} onSave={saveArc} onRetake={() => navigate("scan")} />
        ) : null}
        {route === "log" ? <WorkoutLog filter={filter} latestResult={latestResult} onFilterChange={setFilter} /> : null}
        {route === "arc" ? <WeeklyArc latestResult={latestResult} /> : null}
      </main>
      <BottomNavigation route={route} onRouteChange={navigate} />
      {needRefresh[0] ? <UpdatePrompt onLater={() => needRefresh[1](false)} onUpdate={() => updateServiceWorker(true)} /> : null}
    </div>
  );
}

function HomeScreen({ latestResult, onStartScan }: { latestResult: TrainingResult | null; onStartScan: () => void }) {
  const compassStatus = latestResult?.status || "No scan yet today";

  return (
    <>
      <SoftCard variant="blush">
        <div className={styles.todayArc}>
          <div>
            <p className="eyebrow">Plan</p>
            <h2>Tempo Run + Upper Body</h2>
            <p className="muted">Protect the protagonist, then collect the tiny win.</p>
          </div>
          <span className={styles.miniBadge}>Week 1</span>
        </div>
      </SoftCard>
      <SoftCard variant="hero">
        <div className={styles.heroLayout}>
          <div>
            <p className="eyebrow">Cooked Meter</p>
            <h2>How cooked are we today?</h2>
            <p>Quick check-in before you train, modify, or rest.</p>
            <PillButton onClick={onStartScan}>Start Body Scan Quest</PillButton>
          </div>
          <IconOrb label="scan" size="hero" />
        </div>
      </SoftCard>
      <TrainingCompassCard status={compassStatus} result={latestResult} />
      <section className={styles.widgetGrid} aria-label="Today at a glance">
        <TinyWidget label="Sleep" value="7h 10m" tone="soft" />
        <TinyWidget label="Soreness" value="Mild" tone="warm" />
        <TinyWidget label="Last workout" value="Gym" tone="soft" />
        <TinyWidget label="Weekly load" value="2 / 4" tone="warm" />
        <TinyWidget label="Mood" value={latestResult?.status === STATUS.peace ? "Needs softness" : "Steady"} tone="soft" />
      </section>
    </>
  );
}

function TrainingCompassCard({ status, result }: { status: string; result: TrainingResult | null }) {
  return (
    <SoftCard>
      <div className={styles.compassCard}>
        <div>
          <p className="eyebrow">Training Compass</p>
          <h2>{status}</h2>
          <p>{result ? result.recommendation : "No scan yet today. Let's check in before the quest."}</p>
        </div>
        {result ? <StatusChip status={result.status} /> : <IconOrb label="arc" size="small" />}
      </div>
    </SoftCard>
  );
}

function TinyWidget({ label, value, tone }: { label: string; value: string; tone: "soft" | "warm" }) {
  return (
    <article className={`${styles.tinyWidget} ${tone === "warm" ? styles.tinyWidgetWarm : styles.tinyWidgetSoft}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function UpdatePrompt({ onLater, onUpdate }: { onLater: () => void; onUpdate: () => void }) {
  return (
    <aside className={styles.updatePrompt} aria-live="polite">
      <div>
        <strong>A new Training Arc update is ready.</strong>
        <p>Update when you are not mid check-in.</p>
      </div>
      <div className={styles.updateActions}>
        <PillButton variant="secondary" onClick={onLater}>
          Later
        </PillButton>
        <PillButton onClick={onUpdate}>Update</PillButton>
      </div>
    </aside>
  );
}

function getHeaderCopy(route: Route, latestResult: TrainingResult | null) {
  if (route === "scan") {
    return {
      kicker: "Body Scan Quest",
      title: "Step into the check-in",
      subtitle: "Answer quickly. This is a check-in, not a trial."
    };
  }

  if (route === "result") {
    return {
      kicker: "Training Compass",
      title: latestResult?.status ?? "Training Compass",
      subtitle: "A kind decision, not a verdict."
    };
  }

  if (route === "log") {
    return {
      kicker: "Workout Log",
      title: "Soft journal energy",
      subtitle: "Saved quests, tiny wins, and training notes."
    };
  }

  if (route === "arc") {
    return {
      kicker: "Weekly Arc",
      title: "This week has character development",
      subtitle: "Planner strip first, numbers second."
    };
  }

  return {
    kicker: "Today's Arc",
    title: greeting(),
    subtitle: "A cozy check-in before we send it, soften it, or rest."
  };
}

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning Abby";
  if (hour < 18) return "Afternoon Abby";
  return "Good evening, Abby";
}
