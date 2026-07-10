import { ReactNode } from "react";
import { Route, Theme, TrainingStatus } from "../types/training";
import styles from "./ui.module.css";

interface HeaderProps {
  kicker: string;
  title: string;
  subtitle?: string;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

interface SoftCardProps {
  children: ReactNode;
  variant?: "default" | "hero" | "blush" | "result" | "compact";
  className?: string;
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

export function Header({ kicker, title, subtitle, theme, onThemeChange }: HeaderProps) {
  return (
    <header className={styles.pageHeader}>
      <div>
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        {subtitle ? <p className="muted">{subtitle}</p> : null}
      </div>
      <div className={styles.themeToggle} role="group" aria-label="Theme">
        <button
          className={theme === "light" ? styles.active : ""}
          type="button"
          onClick={() => onThemeChange("light")}
        >
          Light
        </button>
        <button
          className={theme === "dark" ? styles.active : ""}
          type="button"
          onClick={() => onThemeChange("dark")}
        >
          Dark
        </button>
      </div>
    </header>
  );
}

export function SoftCard({ children, variant = "default", className = "" }: SoftCardProps) {
  return <section className={`${styles.softCard} ${styles[`softCard_${variant}`]} ${className}`}>{children}</section>;
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
  return <span className={`${styles.iconOrb} ${styles[`iconOrb_${size}`]}`} aria-hidden="true">{label}</span>;
}

export function BottomNavigation({ route, onRouteChange }: BottomNavigationProps) {
  const items: Array<[Route, string]> = [
    ["home", "Home"],
    ["log", "Log"],
    ["arc", "Arc"],
    ["scan", "Scan"]
  ];

  return (
    <nav className={styles.bottomNav} aria-label="Primary navigation">
      {items.map(([itemRoute, label]) => (
        <button
          className={route === itemRoute ? styles.active : ""}
          key={itemRoute}
          type="button"
          onClick={() => onRouteChange(itemRoute)}
        >
          <span className={styles.navIcon} aria-hidden="true">
            {label.slice(0, 1)}
          </span>
          {label}
        </button>
      ))}
    </nav>
  );
}

export function statusSlug(status: TrainingStatus): string {
  return status.toLowerCase().replaceAll(" ", "-");
}
