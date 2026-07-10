import { DEFAULT_SCAN, STATUS, evaluateBodyScan } from "./bodyScanLogic.js";

const app = document.querySelector("#app");

const ENERGY_OPTIONS = [
  [1, "floor"],
  [2, "low battery"],
  [3, "functional"],
  [4, "ready"],
  [5, "main character"],
];

const RPE_OPTIONS = Array.from({ length: 10 }, (_, index) => {
  const value = index + 1;
  const label = value === 1 ? "chill" : value === 5 ? "steady" : value === 10 ? "boss fight" : "";
  return [value, label];
});

const CHOICES = {
  soreness: [
    ["none", "None"],
    ["mild", "Mild"],
    ["medium", "Medium"],
    ["spicy", "Spicy"],
    ["absolutely_cooked", "Absolutely cooked"],
  ],
  breathing: [
    ["normal", "Normal"],
    ["slightly_off", "Slightly off"],
    ["coughing", "Coughing"],
    ["sick_sick", "Sick-sick"],
  ],
  mood: [
    ["calm", "Calm"],
    ["frazzled", "Frazzled"],
    ["anxious", "Anxious"],
    ["emotionally_cooked", "Emotionally cooked"],
  ],
  plannedWorkout: [
    ["run", "Run"],
    ["gym", "Gym"],
    ["hybrid", "Hybrid"],
    ["rest_day", "Rest day"],
    ["unsure", "Unsure"],
  ],
};

const state = {
  route: "home",
  theme: localStorage.getItem("trainingArcTheme") || "light",
  scanStep: 0,
  scan: loadJson("trainingArcDraft", DEFAULT_SCAN),
  latestResult: loadJson("trainingArcResult", null),
  saved: loadJson("trainingArcSaved", []),
  filter: "all",
};

const scanSteps = [
  {
    key: "energy",
    title: "What is the energy level?",
    helper: "Choose the number that matches your current battery.",
    render: () => scoreGrid("energy", ENERGY_OPTIONS, 5),
  },
  {
    key: "soreness",
    title: "How spicy is the soreness?",
    helper: "A little drama is allowed. Joint pain gets extra respect.",
    render: () => choiceGrid("soreness", CHOICES.soreness),
  },
  {
    key: "breathing",
    title: "Breathing and illness check",
    helper: "If your body is waving a tiny flag, we listen.",
    render: () => choiceGrid("breathing", CHOICES.breathing),
  },
  {
    key: "mood",
    title: "Where is the emotional weather?",
    helper: "Peace Mode exists because training is not separate from life.",
    render: () => choiceGrid("mood", CHOICES.mood),
  },
  {
    key: "plannedWorkout",
    title: "What quest was planned?",
    helper: "Pick the closest version. Unsure is a valid training era.",
    render: () => choiceGrid("plannedWorkout", CHOICES.plannedWorkout),
  },
  {
    key: "rpe",
    title: "Recent effort check",
    helper: "How hard has training felt lately?",
    render: () => scoreGrid("rpe", RPE_OPTIONS, 10),
  },
];

function loadJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function setRoute(route) {
  state.route = route;
  if (route === "scan") state.scanStep = 0;
  render();
}

function setTheme(theme) {
  state.theme = theme;
  localStorage.setItem("trainingArcTheme", theme);
  render();
}

function appShell(content) {
  document.documentElement.dataset.theme = state.theme;
  return `
    <div class="app-shell">
      <main class="screen" aria-live="polite">${content}</main>
      ${bottomNav()}
    </div>
  `;
}

function softCard(content, variant = "default", extraClass = "") {
  return `<section class="soft-card soft-card--${variant} ${extraClass}">${content}</section>`;
}

function pillButton(label, variant = "primary", attrs = "") {
  return `<button class="pill-button pill-button--${variant}" ${attrs}>${label}</button>`;
}

function statusChip(status) {
  const slug = statusToSlug(status);
  return `<span class="status-chip status-chip--${slug}"><span class="status-dot"></span>${status}</span>`;
}

function iconOrb(label, size = "default") {
  return `<span class="icon-orb icon-orb--${size}" aria-hidden="true">${label}</span>`;
}

function statusToSlug(status) {
  return status.toLowerCase().replaceAll(" ", "-");
}

function header(kicker, title, subtitle = "") {
  return `
    <header class="page-header">
      <div>
        <p class="kicker">${kicker}</p>
        <h1>${title}</h1>
        ${subtitle ? `<p class="muted">${subtitle}</p>` : ""}
      </div>
      ${themeToggle()}
    </header>
  `;
}

function themeToggle() {
  return `
    <div class="theme-toggle" role="group" aria-label="Theme">
      <button class="${state.theme === "light" ? "active" : ""}" data-theme="light">Light</button>
      <button class="${state.theme === "dark" ? "active" : ""}" data-theme="dark">Dark</button>
    </div>
  `;
}

function homeScreen() {
  const result = state.latestResult;
  const compassStatus = result?.status || "No scan yet today";

  return `
    ${header("Today's Arc", greeting(), "A cozy check-in before we send it, soften it, or rest.")}
    ${softCard(`
      <div class="today-arc">
        <div>
          <p class="eyebrow">Plan</p>
          <h2>Tempo Run + Upper Body</h2>
          <p class="muted">Protect the protagonist, then collect the tiny win.</p>
        </div>
        <span class="mini-badge">Week 1</span>
      </div>
    `, "blush")}
    ${softCard(`
      <div class="hero-layout">
        <div>
          <p class="eyebrow">Cooked Meter</p>
          <h2>How cooked are we today?</h2>
          <p>Quick check-in before you train, modify, or rest.</p>
          ${pillButton("Start Body Scan Quest", "primary", 'data-route="scan"')}
        </div>
        ${iconOrb("scan", "hero")}
      </div>
    `, "hero")}
    ${trainingCompassCard(compassStatus, result)}
    <section class="widget-grid" aria-label="Today at a glance">
      ${tinyWidget("Sleep", "7h 10m", "soft")}
      ${tinyWidget("Soreness", "Mild", "warm")}
      ${tinyWidget("Last workout", "Gym", "soft")}
      ${tinyWidget("Weekly load", "2 / 4", "warm")}
      ${tinyWidget("Mood", result?.status === STATUS.peace ? "Needs softness" : "Steady", "soft")}
    </section>
  `;
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning Abby";
  if (hour < 18) return "Afternoon Abby";
  return "Good evening, Abby";
}

function trainingCompassCard(status, result) {
  const body = result
    ? `<p>${result.recommendation}</p>`
    : `<p>No scan yet today. Let's check in before the quest.</p>`;

  return softCard(`
    <div class="compass-card">
      <div>
        <p class="eyebrow">Training Compass</p>
        <h2>${status}</h2>
        ${body}
      </div>
      ${result ? statusChip(result.status) : iconOrb("arc", "small")}
    </div>
  `, "default");
}

function tinyWidget(label, value, tone) {
  return `
    <article class="tiny-widget tiny-widget--${tone}">
      <span>${label}</span>
      <strong>${value}</strong>
    </article>
  `;
}

function scanScreen() {
  const step = scanSteps[state.scanStep];
  const isLast = state.scanStep === scanSteps.length - 1;

  return `
    ${header("Body Scan Quest", `Step ${state.scanStep + 1} of ${scanSteps.length}`, "Answer quickly. This is a check-in, not a trial.")}
    ${softCard(`
      <div class="scan-progress" aria-hidden="true">
        <span style="width: ${((state.scanStep + 1) / scanSteps.length) * 100}%"></span>
      </div>
      <div class="question-block">
        <p class="eyebrow">${step.key === "rpe" ? "Recent effort / RPE" : "Cooked Meter"}</p>
        <h2>${step.title}</h2>
        <p class="muted">${step.helper}</p>
        ${step.render()}
      </div>
    `, "default", "scan-card")}
    <div class="action-row">
      ${pillButton("Back", "secondary", `data-scan-back ${state.scanStep === 0 ? "disabled" : ""}`)}
      ${pillButton(isLast ? "Reveal Training Compass" : "Next", "primary", "data-scan-next")}
    </div>
  `;
}

function scoreGrid(key, options, count) {
  return `
    <div class="score-grid score-grid--${count}" role="radiogroup" aria-label="${key}">
      ${options
        .map(([value, label]) => {
          const selected = Number(state.scan[key]) === value;
          return `
            <button
              class="score-button ${selected ? "selected" : ""}"
              data-score-key="${key}"
              data-score-value="${value}"
              role="radio"
              aria-checked="${selected}"
            >
              <span>${value}</span>
              ${label ? `<small>${label}</small>` : ""}
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function choiceGrid(key, options) {
  return `
    <div class="choice-grid" role="radiogroup" aria-label="${key}">
      ${options
        .map(([value, label]) => {
          const selected = state.scan[key] === value;
          return `
            <button
              class="choice-pill ${selected ? "selected" : ""}"
              data-choice-key="${key}"
              data-choice-value="${value}"
              role="radio"
              aria-checked="${selected}"
            >
              ${label}
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function resultScreen() {
  const result = state.latestResult || evaluateBodyScan(state.scan);
  state.latestResult = result;

  return `
    ${header("Training Compass", result.status, "A kind decision, not a verdict.")}
    ${resultCard(result)}
    <div class="action-row stacked">
      ${pillButton("Save today's arc", "primary", "data-save-arc")}
      ${pillButton("Retake Body Scan Quest", "secondary", 'data-route="scan"')}
    </div>
  `;
}

function resultCard(result) {
  return softCard(`
    <div class="result-hero result-hero--${statusToSlug(result.status)}">
      ${statusChip(result.status)}
      <h2>${result.hero}</h2>
      <p>${result.why}</p>
    </div>
    <div class="result-list">
      <div>
        <p class="eyebrow">Recommendation</p>
        <p>${result.recommendation}</p>
      </div>
      <div>
        <p class="eyebrow">Modified plan</p>
        <p>${result.modifiedPlan}</p>
      </div>
      <div>
        <p class="eyebrow">Tiny win</p>
        <p>${result.tinyWin}</p>
      </div>
    </div>
  `, "result");
}

function logScreen() {
  const workouts = [
    ["run", "Easy Run", "Today", "32 min", "RPE 5", state.latestResult?.status || "Modify the Quest"],
    ["gym", "Upper Body", "Yesterday", "45 min", "RPE 7", "Slay Day"],
    ["walk", "Recovery Walk", "Tue", "22 min", "RPE 2", "Recovery Episode"],
  ];
  const filtered = state.filter === "all" ? workouts : workouts.filter(([type]) => type === state.filter);

  return `
    ${header("Workout Log", "Soft journal energy", "Saved quests, tiny wins, and training notes.")}
    <div class="filter-row" role="group" aria-label="Workout filter">
      ${["all", "run", "gym", "other"].map((filter) => `
        <button class="choice-pill ${state.filter === filter ? "selected" : ""}" data-filter="${filter}">
          ${filter[0].toUpperCase() + filter.slice(1)}
        </button>
      `).join("")}
    </div>
    <section class="list-stack">
      ${filtered.length ? filtered.map(workoutCard).join("") : softCard(`<p>No logs yet. Tiny wins count when you save them.</p>`, "compact")}
    </section>
    ${pillButton("View all logs", "secondary", "data-soft-action")}
  `;
}

function workoutCard([type, title, date, duration, rpe, status]) {
  return softCard(`
    <article class="workout-card">
      ${iconOrb(typeLabel(type), "small")}
      <div>
        <p class="eyebrow">${date}</p>
        <h2>${title}</h2>
        <p class="muted">${duration} - ${rpe}</p>
      </div>
      ${statusChip(status)}
    </article>
  `, "compact");
}

function typeLabel(type) {
  return {
    run: "Run",
    gym: "Gym",
    walk: "Walk",
  }[type] || "Log";
}

function weeklyArcScreen() {
  const days = [
    ["M", "6", "Slay Day", "Run"],
    ["T", "7", "Modify the Quest", "Gym"],
    ["W", "8", "Recovery Episode", "Walk"],
    ["T", "9", "Peace Mode", "Reset"],
    ["F", "10", state.latestResult?.status || "Modify the Quest", "Today"],
    ["S", "11", "Slay Day", "Long"],
    ["S", "12", "Recovery Episode", "Rest"],
  ];

  return `
    ${header("Weekly Arc", "This week has character development", "Planner strip first, numbers second.")}
    ${softCard(weeklyArcStrip(days), "blush")}
    ${softCard(`
      <p class="eyebrow">Training load summary</p>
      <h2>Hard days 2 / 3</h2>
      <p class="muted">Long run protected. Recovery debt is being watched gently.</p>
    `, "default")}
    ${softCard(`
      <p class="eyebrow">Focus this week</p>
      <h2>Tiny wins count</h2>
      <p class="muted">Keep the rhythm, soften the sharp edges, and save the day you actually have.</p>
    `, "default")}
  `;
}

function weeklyArcStrip(days) {
  return `
    <div class="weekly-strip" aria-label="Weekly status strip">
      ${days
        .map(([day, date, status, note]) => `
          <div class="day-bubble day-bubble--${statusToSlug(status)}">
            <span>${day}</span>
            <strong>${date}</strong>
            <small>${note}</small>
          </div>
        `)
        .join("")}
    </div>
  `;
}

function bottomNav() {
  const items = [
    ["home", "Home"],
    ["log", "Log"],
    ["arc", "Arc"],
    ["scan", "Scan"],
  ];

  return `
    <nav class="bottom-nav" aria-label="Primary navigation">
      ${items.map(([route, label]) => `
        <button class="${state.route === route ? "active" : ""}" data-route="${route}">
          <span class="nav-icon" aria-hidden="true">${label.slice(0, 1)}</span>${label}
        </button>
      `).join("")}
    </nav>
  `;
}

function saveArc() {
  const result = state.latestResult || evaluateBodyScan(state.scan);
  const entry = {
    date: new Date().toISOString(),
    status: result.status,
    scan: state.scan,
  };
  state.saved = [entry, ...state.saved].slice(0, 14);
  saveJson("trainingArcSaved", state.saved);
  saveJson("trainingArcResult", result);
  setRoute("arc");
}

function handleClick(event) {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.dataset.route) {
    setRoute(target.dataset.route);
    return;
  }

  if (target.dataset.theme) {
    setTheme(target.dataset.theme);
    return;
  }

  if (target.dataset.scoreKey) {
    state.scan[target.dataset.scoreKey] = Number(target.dataset.scoreValue);
    saveJson("trainingArcDraft", state.scan);
    render();
    return;
  }

  if (target.dataset.choiceKey) {
    state.scan[target.dataset.choiceKey] = target.dataset.choiceValue;
    saveJson("trainingArcDraft", state.scan);
    render();
    return;
  }

  if (target.hasAttribute("data-scan-back") && state.scanStep > 0) {
    state.scanStep -= 1;
    render();
    return;
  }

  if (target.hasAttribute("data-scan-next")) {
    if (state.scanStep < scanSteps.length - 1) {
      state.scanStep += 1;
      render();
      return;
    }

    state.latestResult = evaluateBodyScan(state.scan);
    saveJson("trainingArcResult", state.latestResult);
    setRoute("result");
    return;
  }

  if (target.hasAttribute("data-save-arc")) {
    saveArc();
    return;
  }

  if (target.dataset.filter) {
    state.filter = target.dataset.filter;
    render();
  }
}

function render() {
  const screens = {
    home: homeScreen,
    scan: scanScreen,
    result: resultScreen,
    log: logScreen,
    arc: weeklyArcScreen,
  };

  app.innerHTML = appShell((screens[state.route] || homeScreen)());
}

app.addEventListener("click", handleClick);
render();
