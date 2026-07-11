import styles from "./ArcStats.module.css";

export function ArcStats() {
  return (
    <section className={styles.stats} aria-label="Arc statistics">
      <div className={styles.metrics}>
        <article className={styles.metric}><p>Current streak</p><strong>8 days</strong><span>best: 14</span></article>
        <article className={styles.metric}><p>Training balance</p><strong>92%</strong><span>on plan</span></article>
      </div>

      <article className={styles.chartCard}>
        <div className={styles.chartHeader}><div><p className="eyebrow">Readiness</p><h2>Last 7 days</h2></div><span className={styles.change}>↗ +8%</span></div>
        <svg className={styles.readinessChart} viewBox="0 0 480 180" role="img" aria-label="Readiness trend rising over the last seven days">
          <defs><linearGradient id="readiness-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#ff5b9e" stopOpacity=".42"/><stop offset="1" stopColor="#ffb5d2" stopOpacity=".02"/></linearGradient></defs>
          <path className={styles.grid} d="M0 42H480M0 112H480M0 178H480" />
          <path className={styles.area} d="M0 154 C42 142 72 140 103 126 S152 83 196 86 S238 76 277 82 S321 82 352 54 S404 69 434 48 S464 43 480 30 V180 H0Z" />
          <path className={styles.line} d="M0 154 C42 142 72 140 103 126 S152 83 196 86 S238 76 277 82 S321 82 352 54 S404 69 434 48 S464 43 480 30" />
        </svg>
        <div className={styles.days}><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
      </article>

      <article className={styles.volumeCard}>
        <div className={styles.chartHeader}><div><p className="eyebrow">Training volume</p><h2>Four-week rhythm</h2></div><span className={styles.balance}>Balanced</span></div>
        <div className={styles.bars} aria-label="Four weeks of gradually varied training volume"><span /><span /><span /><span /></div>
      </article>

      <article className={styles.insightCard}>
        <div className={styles.insightIcon}>✦</div>
        <div>
          <p className="eyebrow">Tiny insight</p>
          <h2>Your best sessions follow 7+ hours of sleep.</h2>
          <p>Not shocking, but now it is your lore.</p>
        </div>
      </article>
    </section>
  );
}
