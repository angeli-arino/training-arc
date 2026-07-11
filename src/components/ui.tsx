import { ReactNode } from "react";
import { Route, Theme, TrainingStatus } from "../types/training";
import styles from "./ui.module.css";

interface HeaderProps {
  kicker: string;
  title: string;
  subtitle?: string;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  hideHeading?: boolean;
}

interface SoftCardProps {
  children: ReactNode;
  variant?: "default" | "hero" | "blush" | "result" | "compact";
  className?: string;
  onClick?: () => void;
}

interface PillButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  onClick?: () => void;
}

interface BottomNavigationProps {
  route: Route;
  onRouteChange: (route: Route) => void;
}

export function Header({ kicker, title, subtitle, theme, onThemeChange, hideHeading = false }: HeaderProps) {
  const isHome = kicker === "Today's Arc";
  return (
    <header className={styles.pageHeader}>
      <div className={styles.topbar}>
        <div className={styles.brand}><span>✦</span> Training Arc</div>
        <div className={styles.themeSwitch} role="group" aria-label="Theme">
          <button className={`${styles.themeOption} ${theme === "light" ? styles.isActive : ""}`.trim()} type="button" onClick={() => onThemeChange("light")}>Milk</button>
          <button className={`${styles.themeOption} ${theme === "dark" ? styles.isActive : ""}`.trim()} type="button" onClick={() => onThemeChange("dark")}>Rose</button>
        </div>
      </div>
      {!hideHeading ? <div className={`${styles.headingLayout} ${isHome ? styles.headingHome : ""}`}>
        <div>
          <p className="kicker">{kicker} <span aria-hidden="true">✦</span></p>
          <h1>{title.split("\n").map((line, index) => <span className={index ? styles.titleAccent : ""} key={line}>{line}{index === 0 ? <br /> : null}</span>)}</h1>
          {subtitle ? <p className="muted">{subtitle}</p> : null}
        </div>
        {isHome ? <DeskCompanion /> : null}
      </div> : null}
    </header>
  );
}

function DeskCompanion() {
  return <div className={styles.companion} aria-hidden="true"><span className={styles.steam}>〰</span><span className={styles.cup}>♡</span><span className={styles.hair} /><span className={styles.face}><i /><i /></span><span className={styles.body} /><span className={styles.desk} /><b>✦</b></div>;
}

export function SoftCard({ children, variant = "default", className = "", onClick }: SoftCardProps) {
  const variantClass = styles[`softCard_${variant}`] ?? "";
  const cardClass = [styles.softCard, variantClass, onClick ? styles.softCardButton : "", onClick ? styles.interactiveCard : "", className]
    .filter(Boolean)
    .join(" ");
  return onClick ? <button className={cardClass} type="button" onClick={onClick}>{children}</button> : <section className={cardClass}>{children}</section>;
}

export function PillButton({ children, variant = "primary", disabled = false, onClick }: PillButtonProps) {
  return (
    <button className={`${styles.pillButton} ${styles[`pillButton_${variant}`]}`} disabled={disabled} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export function StatusChip({ status }: { status: TrainingStatus }) {
  return (
    <span className={`${styles.statusChip} ${styles[statusSlug(status)]}`}>
      <span className={styles.statusDot} />
      {status}
    </span>
  );
}

export function IconOrb({ label, size = "default" }: { label: string; size?: "default" | "hero" | "small" }) {
  return <span className={`${styles.iconOrb} ${styles[`iconOrb_${size}`]}`} aria-hidden="true"><AppIcon name={label} /></span>;
}

export function BottomNavigation({ route, onRouteChange }: BottomNavigationProps) {
  const items: Array<[Route, string, string]> = [
    ["home", "Home", "home"],
    ["arc", "Quests", "quest"],
    ["log", "Log", "log"],
    ["stats", "Stats", "stats"],
    ["profile", "Profile", "profile"]
  ];

  return (
    <nav className={styles.bottomNav} aria-label="Primary navigation">
      {items.map(([itemRoute, label, icon]) => (
        <button
          className={route === itemRoute ? styles.active : ""}
          key={`${itemRoute}-${label}`}
          type="button"
          onClick={() => onRouteChange(itemRoute)}
        >
          <span className={styles.navIcon} aria-hidden="true"><AppIcon name={icon} /></span>
          {label}
        </button>
      ))}
    </nav>
  );
}

export function AppIcon({ name }: { name: string }) {
  name = name.toLowerCase();
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (["home", "arc"].includes(name)) return <svg {...common}><path d="m3.5 11 8.5-7 8.5 7v8.5H15v-5H9v5H3.5Z"/><path d="m17 5 .8 1.7 1.7.8-1.7.8L17 11l-.8-1.7-1.7-.8 1.7-.8Z"/></svg>;
  if (name === "quest") return <svg {...common}><path d="M6 20V4m0 1c3-2 6 2 12 0v9c-6 2-9-2-12 0"/></svg>;
  if (name === "sparkle") return <svg {...common}><path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4Z"/></svg>;
  if (name === "stats") return <svg {...common}><path d="M5 20V11m7 9V4m7 16v-7"/></svg>;
  if (name === "profile") return <svg {...common}><circle cx="12" cy="8" r="3.5"/><path d="M4 20c.8-3.4 3.4-5.2 8-5.2s7.2 1.8 8 5.2"/></svg>;
  if (name === "plan") return <svg {...common}><path d="M7 3v3m10-3v3M4.5 9h15M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 19 20.5H5A1.5 1.5 0 0 1 3.5 19V7A1.5 1.5 0 0 1 5 5.5Z"/><path d="m12 12 1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5L11 14l1-2Z"/></svg>;
  if (["log", "gym"].includes(name)) return <svg {...common}><path d="M6 4.5h12v15H6z"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>;
  if (["scan", "heart"].includes(name)) return <svg {...common}><path d="M20.5 9.2c0 5.1-8.5 10-8.5 10s-8.5-4.9-8.5-10a4.6 4.6 0 0 1 8.5-2.5 4.6 4.6 0 0 1 8.5 2.5Z"/><path d="M7 12h2l1.2-2.4 2.1 5 1.3-2.6H17"/></svg>;
  if (name === "run") return <svg {...common}><circle cx="14.5" cy="4.5" r="2"/><path d="m12 8-3 4 3 2 2 5M12 8l4 3 3-1M9 12l-4 6"/></svg>;
  if (name === "walk") return <svg {...common}><circle cx="13" cy="4.5" r="2"/><path d="m11 8-2 5 3 2 1 5M11 9l4 3 3-1M9 13l-4 5"/></svg>;
  if (name === "moon") return <svg {...common}><path d="M19 15.3A8 8 0 0 1 8.7 5a8 8 0 1 0 10.3 10.3Z"/><path d="m17 5 .5 1 .9.5-.9.5-.5 1-.5-1-.9-.5.9-.5Z"/></svg>;
  if (name === "bolt") return <svg {...common}><path d="m13 2-8 12h6l-1 8 9-13h-6Z"/></svg>;
  return <svg {...common}><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>;
}

export function statusSlug(status: TrainingStatus): string {
  return status.toLowerCase().replaceAll(" ", "-");
}
