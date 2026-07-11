import { useEffect, useMemo, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { AppIcon, BottomNavigation, Header, IconOrb, PillButton, SoftCard } from "./components/ui";
import { BodyScanQuest } from "./features/body-scan/BodyScanQuest";
import { DEFAULT_SCAN, evaluateBodyScan } from "./features/body-scan/bodyScanLogic";
import { ResultCard } from "./features/body-scan/ResultCard";
import { WeeklyArc } from "./features/weekly-arc/WeeklyArc";
import { ArcStats } from "./features/arc-stats/ArcStats";
import { Profile } from "./features/profile/Profile";
import { WorkoutLog } from "./features/workout-log/WorkoutLog";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { BodyScan, Route, SavedArc, Theme, TrainingResult } from "./types/training";
import styles from "./App.module.css";
import uiStyles from "./components/ui.module.css";

export default function App() {
  const [route, setRoute] = useState<Route>("home");
  const [theme, setTheme] = useLocalStorage<Theme>("trainingArcTheme", "light");
  const [scan, setScan] = useLocalStorage<BodyScan>("trainingArcDraft", DEFAULT_SCAN);
  const [latestResult, setLatestResult] = useLocalStorage<TrainingResult | null>("trainingArcResult", null);
  const [saved, setSaved] = useLocalStorage<SavedArc[]>("trainingArcSaved", []);
  const [scanStep, setScanStep] = useState(0);
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
          hideHeading={route === "profile"}
        />
        {route === "home" ? <HomeScreen latestResult={latestResult} onStartScan={() => navigate("scan")} onOpenQuests={() => navigate("arc")} /> : null}
        {route === "scan" ? <BodyScanQuest scan={scan} scanStep={scanStep} onScanChange={setScan} onStepChange={setScanStep} onComplete={completeScan} /> : null}
        {route === "result" && latestResult ? (
          <ResultCard result={latestResult} onSave={saveArc} onRetake={() => navigate("scan")} />
        ) : null}
        {route === "result" && !latestResult ? (
          <ResultCard result={evaluateBodyScan(scan)} onSave={saveArc} onRetake={() => navigate("scan")} />
        ) : null}
        {route === "log" ? <WorkoutLog latestResult={latestResult} /> : null}
        {route === "arc" ? <WeeklyArc latestResult={latestResult} /> : null}
        {route === "stats" ? <ArcStats /> : null}
        {route === "profile" ? <Profile /> : null}
      </main>
      <BottomNavigation route={route} onRouteChange={navigate} />
      {needRefresh[0] ? <UpdatePrompt onLater={() => needRefresh[1](false)} onUpdate={() => updateServiceWorker(true)} /> : null}
    </div>
  );
}

function HomeScreen({ latestResult, onStartScan, onOpenQuests }: { latestResult: TrainingResult | null; onStartScan: () => void; onOpenQuests: () => void }) {
  const compassStatus = latestResult?.status || "Modify the Quest";

  return (
    <>
      <SoftCard className={styles.planCard} onClick={onOpenQuests}>
        <span className={styles.planIcon}><AppIcon name="plan" /></span>
        <div className={styles.cardContent}>
          <p className="label">Plan</p>
          <h2>Tempo Run + Upper Body</h2>
          <p>Protect the protagonist, then collect the tiny win.</p>
        </div>
        <div className={styles.planSide}>
          <span className={styles.pill}>Week 1</span>
          <span className={styles.chevron} aria-hidden="true">›</span>
        </div>
      </SoftCard>
      <SoftCard className={styles.scanCard}>
        <div className={styles.scanCopy}>
          <p className="label">Cooked Meter</p>
          <h2>How cooked are we today?</h2>
          <p>Quick check-in before you train, modify, or rest.</p>
        </div>
        <div className={styles.orb} aria-hidden="true"><AppIcon name="heart" /></div>
        <button className={styles.primaryFull} type="button" onClick={onStartScan}>
          Start Body Scan Quest <span aria-hidden="true">→</span>
        </button>
      </SoftCard>
      <TrainingCompassCard status={compassStatus} result={latestResult} />
      <section className={styles.widgetGrid} aria-label="Today at a glance">
        <TinyWidget icon="moon" label="Sleep" value="7h 10m" tone="soft" />
        <TinyWidget icon="heart" label="Soreness" value="Mild" tone="warm" />
      </section>
      <HomeWeeklyArc />
    </>
  );
}

function HomeWeeklyArc() {
  return <section className={styles.homeWeeklyArc} aria-label="Weekly Arc summary">
    <div><p className="eyebrow">Weekly Arc</p><h2>Keep the streak gentle</h2></div><span>3 / 5 quests</span>
    <div className={styles.weekDots}>{["M", "T", "W", "T", "F", "S", "S"].map((day, index) => <div key={`${day}-${index}`} className={index < 2 ? styles.weekComplete : index === 2 ? styles.weekToday : ""}><small>{day}</small><b>{index < 2 ? "✓" : index + 1}</b></div>)}</div>
  </section>;
}

function TrainingCompassCard({ status, result }: { status: string; result: TrainingResult | null }) {
  return (
    <SoftCard>
      <div className={styles.compassCard}>
        <div className={styles.compassCopy}>
          <p className="eyebrow">Training Compass</p>
          <h2>{status}</h2>
          <p>{result ? result.recommendation : "Energy is okay, soreness is spicy. We stay consistent without being dramatic."}</p>
          <div className={uiStyles.chipRow}>
            <button className={`${uiStyles.chip} ${uiStyles.chipAccent}`} type="button">◒ Reduce intensity</button>
            <button className={uiStyles.chip} type="button">✦ Tiny win accepted</button>
          </div>
        </div>
        <span className={styles.compassOrb}><IconOrb label="bolt" size="small" /></span>
      </div>
    </SoftCard>
  );
}

function TinyWidget({ icon, label, value, tone }: { icon: string; label: string; value: string; tone: "soft" | "warm" }) {
  return (
    <article className={`${styles.tinyWidget} ${tone === "warm" ? styles.tinyWidgetWarm : styles.tinyWidgetSoft}`}>
      <span className={styles.metricIcon}><AppIcon name={icon} /></span>
      <div><span>{label}</span><strong>{value}</strong></div>
      <svg className={styles.sparkline} viewBox="0 0 100 24" aria-hidden="true"><path d="M2 18 14 15 25 19 38 9 51 14 65 6 78 11 98 4" /></svg>
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
      kicker: "Daily Log",
      title: "Capture the signal,\nskip the essay.",
      subtitle: "A quick log that is actually quick."
    };
  }

  if (route === "arc") {
    return {
      kicker: "Quest Board",
      title: "Your training,\nwithout the chaos.",
      subtitle: "One week at a time. Clear priorities, kinder adjustments."
    };
  }

  if (route === "stats") {
    return {
      kicker: "Arc Stats",
      title: "Progress you can\nactually feel.",
      subtitle: "Useful trends, no punishment dashboard."
    };
  }

  if (route === "profile") {
    return { kicker: "", title: "" };
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
