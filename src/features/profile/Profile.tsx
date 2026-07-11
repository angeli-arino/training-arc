import { AppIcon } from "../../components/ui";
import styles from "./Profile.module.css";

const settings = [
  ["plan", "Training preferences", "3–4 runs · 2 heavy leg days"],
  ["moon", "Recovery settings", "Sleep, soreness, fatigue"],
  ["heart", "Goals & races", "Half marathon · 1 Nov"],
  ["sparkle", "Appearance", "Rose dark mode"]
];

export function Profile() {
  return (
    <section className={styles.profile} aria-label="Player profile">
      <div className={styles.identity}>
        <div className={styles.avatar}>A</div>
        <div><p className="eyebrow">Player Profile</p><h1>Abby</h1><p>Hybrid trainee · Main character energy</p></div>
      </div>
      <article className={styles.chapter}>
        <div className={styles.chapterTop}><div><p className="eyebrow">Current chapter</p><h2>Half Marathon Build</h2></div><strong>Lv. 12</strong></div>
        <div className={styles.xp}><span /></div><p>680 / 1,000 XP to next level</p>
      </article>
      <div className={styles.settings}>
        {settings.map(([icon, title, detail]) => <button type="button" key={title} className={styles.setting}><span className={styles.settingIcon}><AppIcon name={icon} /></span><span><strong>{title}</strong><small>{detail}</small></span><b>›</b></button>)}
      </div>
      <blockquote>“Consistency without self-destruction is still consistency.”<cite>— Training Arc lore</cite></blockquote>
    </section>
  );
}
