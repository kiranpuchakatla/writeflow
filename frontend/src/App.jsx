
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock3,
  FileText,
  History,
  Play,
  Pause,
  RotateCcw,
  Target,
  Zap,
  CheckCircle2,
  Palette,
} from "lucide-react";

import useWritingTracker from "./hooks/useWritingTracker";

const THEMES = {
  luxury: {
    name: "Luxury Edition",
    bg: "#101110",
    surface: "#191b19",
    text: "#eee9df",
    muted: "#96958d",
    accent: "#d1b78e",
    border: "rgba(231,220,198,.13)",
    track: "#37372f",
  },
  racing: {
    name: "Racing Edition",
    bg: "#0d0f12",
    surface: "#171a20",
    text: "#f1f1f2",
    muted: "#9298a2",
    accent: "#f04444",
    border: "rgba(240,68,68,.20)",
    track: "#373039",
  },
  midnight: {
    name: "Midnight Edition",
    bg: "#0b1421",
    surface: "#111f30",
    text: "#e8f2ff",
    muted: "#8fa4bb",
    accent: "#62b7f5",
    border: "rgba(98,183,245,.17)",
    track: "#263a50",
  },
  minimal: {
    name: "Minimal Edition",
    bg: "#eeede8",
    surface: "#faf9f5",
    text: "#252621",
    muted: "#74756d",
    accent: "#555b50",
    border: "rgba(30,32,27,.13)",
    track: "#d9d8d0",
  },
};

const GLOBAL_STYLES = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,500;0,600;1,500&display=swap');

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  background: #101110;
  font-family: 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
}

button, input, select { font: inherit; }
button { cursor: pointer; }

.wf {
  --bg: #101110;
  --surface: #191b19;
  --ivory: #eee9df;
  --muted: #96958d;
  --bronze: #b49a72;
  --bronze-light: #d1b78e;
  --border: rgba(231,220,198,.13);
  --track: #37372f;

  min-height: 100vh;
  padding: 36px 6%;
  color: var(--ivory);
  background:
    radial-gradient(ellipse at 80% 0%, rgba(180,154,114,.075), transparent 38%),
    var(--bg);
  animation: pageReveal .7s ease both;
  transition: background .4s ease, color .4s ease;
}

.wf[data-theme="racing"] {
  --bg: #0d0f12;
  --surface: #171a20;
  --ivory: #f1f1f2;
  --muted: #9298a2;
  --bronze: #ef5151;
  --bronze-light: #f04444;
  --border: rgba(240,68,68,.20);
  --track: #373039;
}

.wf[data-theme="midnight"] {
  --bg: #0b1421;
  --surface: #111f30;
  --ivory: #e8f2ff;
  --muted: #8fa4bb;
  --bronze: #58a9ed;
  --bronze-light: #62b7f5;
  --border: rgba(98,183,245,.17);
  --track: #263a50;
}

.wf[data-theme="minimal"] {
  --bg: #eeede8;
  --surface: #faf9f5;
  --ivory: #252621;
  --muted: #74756d;
  --bronze: #62665d;
  --bronze-light: #555b50;
  --border: rgba(30,32,27,.13);
  --track: #d9d8d0;
  background: #eeede8;
}

.wf-container {
  max-width: 1320px;
  margin: auto;
}

/* HEADER */

.wf-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding-bottom: 27px;
  margin-bottom: 55px;
  border-bottom: 1px solid var(--border);
}

.wf-brand {
  display: flex;
  align-items: center;
  gap: 15px;
}

.wf-logo {
  width: 43px;
  height: 43px;
  display: grid;
  place-items: center;
  color: #171713;
  background: var(--bronze-light);
  border-radius: 2px;
}

.wf-brand h1 {
  font-family: 'Manrope', sans-serif;
  font-size: 19px;
  font-weight: 800;
  letter-spacing: 2px;
  margin: 0;
  text-transform: uppercase;
}

.wf-brand p {
  color: var(--muted);
  font-size: 9px;
  letter-spacing: 2.5px;
  margin: 5px 0 0;
}

.wf-header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.wf-status {
  border: 1px solid var(--border);
  padding: 10px 15px;
  color: var(--bronze-light);
  background: rgba(180,154,114,.06);
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.wf-theme-select {
  appearance: none;
  background: var(--surface);
  color: var(--ivory);
  border: 1px solid var(--border);
  border-radius: 2px;
  padding: 11px 13px;
  font-size: 10px;
  letter-spacing: .5px;
  cursor: pointer;
  outline: none;
  transition: border-color .3s ease;
}

.wf-theme-select:hover,
.wf-theme-select:focus {
  border-color: var(--bronze-light);
}

.wf-theme-select option {
  background: var(--surface);
  color: var(--ivory);
}

/* PAGE HEADING */

.wf-heading {
  margin-bottom: 38px;
  animation: slideUp .7s ease both;
}

.wf-heading h2 {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(32px, 5vw, 55px);
  font-weight: 500;
  letter-spacing: -2.5px;
  margin: 0 0 13px;
  line-height: 1.1;
}

.wf-heading p {
  color: var(--muted);
  font-size: 13px;
}

/* LAYOUT */

.wf-grid {
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  gap: 18px;
}

.wf-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 27px;
  box-shadow: 0 12px 45px rgba(0,0,0,.10);
  transition:
    background .4s ease,
    border-color .35s ease,
    transform .35s ease;
  animation: slideUp .7s ease both;
}

.wf-card:hover {
  border-color: var(--bronze-light);
  transform: translateY(-3px);
}

.wf[data-theme="minimal"] .wf-card {
  box-shadow: 0 5px 20px rgba(0,0,0,.035);
}

.wf[data-theme="minimal"] .wf-card:hover {
  background: #ffffff;
}

/* CIRCULAR PROGRESS */

.wf-progress-card {
  display: flex;
  align-items: center;
  gap: 35px;
  min-height: 290px;
}

.wf-ring {
  width: 220px;
  height: 220px;
  flex: 0 0 220px;
  position: relative;
}

.wf-ring svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.wf-ring circle {
  fill: none;
  stroke-width: 3;
}

.wf-ring .track {
  stroke: var(--track);
}

.wf-ring .value {
  stroke: var(--bronze-light);
  stroke-linecap: butt;
  transition: stroke-dashoffset 1s cubic-bezier(.2,.7,.2,1);
}

.wf-ring-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.wf-percent {
  font-family: 'Manrope', sans-serif;
  font-size: 52px;
  font-weight: 500;
  letter-spacing: -3px;
  font-variant-numeric: tabular-nums;
}

.wf-percent-label {
  color: var(--bronze);
  font-size: 9px;
  letter-spacing: 2px;
  margin-top: 5px;
}

.wf-progress-info {
  flex: 1;
  min-width: 0;
}

.wf-eyebrow {
  color: var(--bronze);
  font-size: 9px;
  letter-spacing: 2.5px;
  font-weight: 600;
}

.wf-progress-info h3 {
  font-family: 'Manrope', sans-serif;
  font-size: 25px;
  font-weight: 500;
  margin: 13px 0 9px;
}

.wf-muted {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.9;
}

.wf-progress-line {
  height: 2px;
  background: var(--track);
  overflow: hidden;
  margin: 25px 0 12px;
}

.wf-progress-line div {
  height: 100%;
  background: var(--bronze-light);
  transition: width .8s cubic-bezier(.2,.7,.2,1);
}

.wf-progress-caption {
  display: flex;
  justify-content: space-between;
  color: var(--muted);
  font-size: 10px;
}

/* STATISTICS */

.wf-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 13px;
}

.wf-stats .wf-card {
  min-height: 137px;
}

.wf-stat-icon {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--bronze-light) 12%, transparent);
  color: var(--bronze-light);
  border-radius: 2px;
  margin-bottom: 17px;
}

.wf-stat-label {
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.wf-stat-value {
  font-family: 'Manrope', sans-serif;
  font-size: 29px;
  font-weight: 500;
  letter-spacing: -1px;
  margin-top: 8px;
  font-variant-numeric: tabular-nums;
}

.wf-stat-sub {
  color: var(--muted);
  font-size: 10px;
  margin-top: 5px;
}

/* LOWER SECTIONS */

.wf-bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-top: 18px;
}

.wf-section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 23px;
}

.wf-section-title h3 {
  margin: 0;
  font-family: 'Manrope', sans-serif;
  font-size: 15px;
  font-weight: 600;
}

.wf-timer {
  font-family: 'Manrope', sans-serif;
  font-size: clamp(29px, 4vw, 43px);
  font-weight: 500;
  letter-spacing: 3px;
  font-variant-numeric: tabular-nums;
  margin: 20px 0 10px;
}

.wf-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 24px;
}

/* BUTTONS */

.wf-btn {
  border: 1px solid var(--border);
  color: var(--ivory);
  background: transparent;
  border-radius: 2px;
  padding: 13px 19px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  transition:
    background .3s ease,
    color .3s ease,
    border-color .3s ease,
    transform .3s ease;
}

.wf-btn:hover {
  border-color: var(--bronze-light);
  color: var(--bronze-light);
  transform: translateY(-2px);
}

.wf-btn-primary {
  background: var(--bronze-light);
  color: #151510;
  border-color: var(--bronze-light);
}

.wf-btn-primary:hover {
  background: var(--bronze-light);
  color: #151510;
  filter: brightness(1.1);
}

.wf-btn:active {
  transform: scale(.97);
}

.wf-btn:disabled {
  opacity: .3;
  cursor: not-allowed;
  transform: none;
}

.wf[data-theme="minimal"] .wf-btn {
  color: #292a27;
  border-color: #c9c8bf;
}

.wf[data-theme="minimal"] .wf-btn-primary {
  background: #555b50;
  color: white;
  border-color: #555b50;
}

.wf-shortcut {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  color: var(--muted);
  font-size: 10px;
  margin-top: 21px;
}

.wf-key {
  display: inline-block;
  padding: 4px 8px;
  border: 1px solid var(--border);
  color: var(--ivory);
  border-radius: 2px;
  margin-right: 5px;
}

/* HISTORY */

.wf-history-item {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 15px 0;
  border-bottom: 1px solid var(--border);
  color: var(--ivory);
  font-size: 11px;
}

.wf-history-item:last-child {
  border: 0;
}

.wf-history-item strong {
  color: var(--bronze-light);
  font-weight: 500;
}

.wf-empty {
  color: var(--muted);
  font-size: 12px;
}

/* SETUP SCREEN */

.wf-setup {
  max-width: 500px;
  margin: 9vh auto;
  padding: 40px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 3px;
  animation: slideUp .7s ease both;
}

.wf-setup h2 {
  font-family: 'Manrope', sans-serif;
  font-size: 29px;
  font-weight: 500;
  margin: 25px 0 10px;
}

.wf-field {
  margin-top: 23px;
}

.wf-field label {
  display: block;
  color: var(--bronze);
  font-size: 9px;
  letter-spacing: 1.8px;
  margin-bottom: 10px;
}

.wf-field input {
  width: 100%;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--ivory);
  padding: 15px;
  border-radius: 2px;
  outline: none;
  transition: border-color .3s ease;
}

.wf-field input:focus {
  border-color: var(--bronze-light);
}

.wf-setup .wf-btn {
  width: 100%;
  margin-top: 28px;
}

/* COMPLETION */

.wf-complete {
  color: var(--bronze-light);
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 500;
}

/* ANIMATIONS */

@keyframes pageReveal {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}

/* RESPONSIVE */

@media (max-width: 950px) {
  .wf-grid { grid-template-columns: 1fr; }
  .wf-progress-card { min-height: 250px; }
}

@media (max-width: 650px) {
  .wf { padding: 22px 16px; }

  .wf-header {
    margin-bottom: 40px;
  }

  .wf-header-right {
    flex-direction: column;
    align-items: flex-end;
    gap: 7px;
  }

  .wf-theme-select {
    max-width: 145px;
    font-size: 9px;
  }

  .wf-heading h2 { font-size: 35px; }

  .wf-progress-card {
    flex-direction: column;
    text-align: center;
    padding: 28px 20px;
  }

  .wf-ring {
    width: 185px;
    height: 185px;
    flex-basis: 185px;
  }

  .wf-progress-caption { text-align: left; }
  .wf-bottom { grid-template-columns: 1fr; }
  .wf-card { padding: 21px; }
  .wf-setup { padding: 25px; }
}

@media (max-width: 380px) {
  .wf-stats { grid-template-columns: 1fr; }
}
`;

export default function App() {
  const {
    session,
    history,
    elapsed,
    createSession,
    nextPage,
    previousPage,
    toggleTimer,
    resetSession,
  } = useWritingTracker();

  const [title, setTitle] = useState("My Writing Session");
  const [totalPages, setTotalPages] = useState("49");

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("writeflow_theme");
    return Object.prototype.hasOwnProperty.call(THEMES, saved)
      ? saved
      : "luxury";
  });

  useEffect(() => {
    localStorage.setItem("writeflow_theme", theme);
  }, [theme]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;

      const isTyping =
        target instanceof HTMLElement &&
        (
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
          target.isContentEditable
        );

      if (isTyping || event.repeat || !session) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextPage();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [session, nextPage, previousPage]);

  const total = Number(session?.totalPages || 0);
  const completed = Number(session?.completedPages || 0);
  const remaining = Math.max(0, total - completed);

  const progress =
    total > 0 ? Math.min(100, (completed / total) * 100) : 0;

  const elapsedSeconds = Number(elapsed || 0);

  const pagesPerHour =
    elapsedSeconds > 0
      ? Math.round((completed / elapsedSeconds) * 3600)
      : 0;

  const remainingSeconds =
    pagesPerHour > 0
      ? Math.ceil((remaining / pagesPerHour) * 3600)
      : 0;

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hrs, mins, secs]
      .map((value) => String(value).padStart(2, "0"))
      .join(":");
  };

  const formatEstimate = (seconds) => {
    if (seconds <= 0) return "Not enough data";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.ceil((seconds % 3600) / 60);

    if (hours === 0) return `${minutes} min`;

    return `${hours} hr ${minutes} min`;
  };

  const startWriting = (event) => {
    event.preventDefault();

    const pageCount = Number(totalPages);

    if (!Number.isInteger(pageCount) || pageCount < 1) {
      alert("Please enter a valid total number of pages.");
      return;
    }

    createSession(
      pageCount,
      title.trim() || "My Writing Session"
    );
  };

  const currentTheme = THEMES[theme];

  const ThemeSelector = () => (
    <div className="wf-header-right">
      <select
        className="wf-theme-select"
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
        aria-label="Choose website theme"
      >
        {Object.entries(THEMES).map(([key, value]) => (
          <option value={key} key={key}>
            {value.name}
          </option>
        ))}
      </select>
    </div>
  );

  const Header = ({ showStatus = false }) => (
    <header className="wf-header">
      <div className="wf-brand">
        <div className="wf-logo">
          <BookOpen size={23} />
        </div>
        <div>
          <h1>WriteFlow</h1>
          <p>THE ART OF PRODUCTIVITY</p>
        </div>
      </div>

      <div className="wf-header-right">
        <ThemeSelector />

        {showStatus && (
          <div className="wf-status">
            {remaining === 0
              ? "✓ Completed"
              : session.isRunning
              ? "● Tracking active"
              : "● Paused"}
          </div>
        )}
      </div>
    </header>
  );

  // SETUP PAGE
  if (!session) {
    return (
      <>
        <style>{GLOBAL_STYLES}</style>

        <main className="wf" data-theme={theme}>
          <div className="wf-container">
            <Header />

            <form className="wf-setup" onSubmit={startWriting}>
              <div className="wf-logo">
                <Target size={23} />
              </div>

              <div className="wf-eyebrow" style={{ marginTop: 28 }}>
                YOUR NEXT CHAPTER STARTS HERE
              </div>

              <h2>Make every page count.</h2>

              <p className="wf-muted">
                Set your writing target. We'll take care of tracking your
                progress.
              </p>

              <div className="wf-field">
                <label>SESSION TITLE</label>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Example: College Record"
                />
              </div>

              <div className="wf-field">
                <label>TOTAL NUMBER OF PAGES</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={totalPages}
                  onChange={(event) => setTotalPages(event.target.value)}
                  required
                />
              </div>

              <button className="wf-btn wf-btn-primary" type="submit">
                <Play size={16} />
                Begin Session
              </button>
            </form>
          </div>
        </main>
      </>
    );
  }

  // MAIN DASHBOARD
  return (
    <>
      <style>{GLOBAL_STYLES}</style>

      <main className="wf" data-theme={theme}>
        <div className="wf-container">
          <Header showStatus />

          <div className="wf-heading">
            <div className="wf-eyebrow">YOUR PERSONAL WRITING SPACE</div>
            <h2>{session.title || "My Writing Session"}</h2>
            <p>
              Consistency creates progress. Keep moving, one page at a time.
            </p>
          </div>

          {/* PROGRESS AND STATS */}
          <section className="wf-grid">
            <div className="wf-card wf-progress-card">
              <div className="wf-ring">
                <svg viewBox="0 0 200 200">
                  <circle
                    className="track"
                    cx="100"
                    cy="100"
                    r="86"
                  />

                  <circle
                    className="value"
                    cx="100"
                    cy="100"
                    r="86"
                    strokeDasharray={2 * Math.PI * 86}
                    strokeDashoffset={
                      2 * Math.PI * 86 * (1 - progress / 100)
                    }
                  />
                </svg>

                <div className="wf-ring-center">
                  <div className="wf-percent">
                    {Math.round(progress)}%
                  </div>
                  <div className="wf-percent-label">COMPLETED</div>
                </div>
              </div>

              <div className="wf-progress-info">
                <div className="wf-eyebrow">YOUR PROGRESS</div>

                <h3>
                  {remaining === 0
                    ? "Excellent work!"
                    : `${completed} of ${total} pages`}
                </h3>

                <p className="wf-muted">
                  {remaining === 0
                    ? "You have completed every page in this session."
                    : `${remaining} pages remaining. Keep going, you're making progress.`}
                </p>

                <div className="wf-progress-line">
                  <div style={{ width: `${progress}%` }} />
                </div>

                <div className="wf-progress-caption">
                  <span>{completed} completed</span>
                  <span>{remaining} remaining</span>
                </div>
              </div>
            </div>

            <div className="wf-stats">
              <div className="wf-card">
                <div className="wf-stat-icon">
                  <FileText size={18} />
                </div>
                <div className="wf-stat-label">Total Pages</div>
                <div className="wf-stat-value">{total}</div>
                <div className="wf-stat-sub">Your target</div>
              </div>

              <div className="wf-card">
                <div className="wf-stat-icon">
                  <CheckCircle2 size={18} />
                </div>
                <div className="wf-stat-label">Completed</div>
                <div className="wf-stat-value">{completed}</div>
                <div className="wf-stat-sub">Pages written</div>
              </div>

              <div className="wf-card">
                <div className="wf-stat-icon">
                  <Target size={18} />
                </div>
                <div className="wf-stat-label">Remaining</div>
                <div className="wf-stat-value">{remaining}</div>
                <div className="wf-stat-sub">Pages to go</div>
              </div>

              <div className="wf-card">
                <div className="wf-stat-icon">
                  <Zap size={18} />
                </div>
                <div className="wf-stat-label">Writing Speed</div>
                <div className="wf-stat-value">{pagesPerHour}</div>
                <div className="wf-stat-sub">Pages per hour</div>
              </div>
            </div>
          </section>

          {/* TIMER AND PAGE CONTROLS */}
          <section className="wf-bottom">
            <div className="wf-card">
              <div className="wf-section-title">
                <h3>
                  <Clock3
                    size={17}
                    style={{ verticalAlign: "middle", marginRight: 8 }}
                  />
                  Writing Timer
                </h3>

                <span className="wf-eyebrow">
                  {session.isRunning ? "RUNNING" : "PAUSED"}
                </span>
              </div>

              <div className="wf-timer">
                {formatDuration(elapsedSeconds)}
              </div>

              <p className="wf-muted">
                Total time spent on this writing session.
              </p>

              <div className="wf-actions">
                <button
                  className="wf-btn wf-btn-primary"
                  onClick={toggleTimer}
                  disabled={remaining === 0}
                >
                  {session.isRunning ? (
                    <Pause size={16} />
                  ) : (
                    <Play size={16} />
                  )}

                  {session.isRunning ? "Pause Timer" : "Start Timer"}
                </button>
              </div>

              <div className="wf-shortcut">
                <span>
                  <span className="wf-key">→</span>
                  Next page
                </span>

                <span>
                  <span className="wf-key">←</span>
                  Previous page
                </span>
              </div>
            </div>

            <div className="wf-card">
              <div className="wf-section-title">
                <h3>
                  <Target
                    size={17}
                    style={{ verticalAlign: "middle", marginRight: 8 }}
                  />
                  Page Controls
                </h3>

                <span className="wf-eyebrow">UPDATE PROGRESS</span>
              </div>

              <p className="wf-muted">
                Finished writing a page? Click Next Page or press the
                right arrow key.
              </p>

              <div className="wf-actions">
                <button
                  className="wf-btn"
                  onClick={previousPage}
                  disabled={completed <= 0}
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>

                <button
                  className="wf-btn wf-btn-primary"
                  onClick={nextPage}
                  disabled={completed >= total}
                >
                  Next Page
                  <ArrowRight size={16} />
                </button>
              </div>

              <div
                style={{
                  marginTop: 22,
                  paddingTop: 17,
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div className="wf-stat-label">
                  Estimated time remaining
                </div>

                <div className="wf-stat-value" style={{ fontSize: 22 }}>
                  {formatEstimate(remainingSeconds)}
                </div>

                <div className="wf-stat-sub">
                  Based on your current writing speed
                </div>
              </div>
            </div>
          </section>

          {/* HISTORY AND SESSION ACTIONS */}
          <section className="wf-bottom">
            <div className="wf-card">
              <div className="wf-section-title">
                <h3>
                  <History
                    size={17}
                    style={{ verticalAlign: "middle", marginRight: 8 }}
                  />
                  Session History
                </h3>
              </div>

              {history?.length ? (
                history.slice(0, 5).map((item, index) => (
                  <div
                    className="wf-history-item"
                    key={item._id || index}
                  >
                    <span>{item.title || "Writing Session"}</span>

                    <strong>
                      {item.completedPages || 0}/
                      {item.totalPages || 0} pages
                    </strong>
                  </div>
                ))
              ) : (
                <p className="wf-empty">
                  Your completed sessions will appear here.
                </p>
              )}
            </div>

            <div className="wf-card">
              <div className="wf-section-title">
                <h3>
                  <CheckCircle2
                    size={17}
                    style={{ verticalAlign: "middle", marginRight: 8 }}
                  />
                  Session Actions
                </h3>
              </div>

              <p className="wf-muted">
                Finished writing? Save your session to history and prepare
                for your next target.
              </p>

              <div className="wf-actions">
                <button
                  className="wf-btn"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Finish and save this writing session?"
                      )
                    ) {
                      resetSession();
                    }
                  }}
                >
                  <RotateCcw size={16} />
                  Finish Session
                </button>
              </div>
            </div>
          </section>

          {/* COMPLETION MESSAGE */}
          {remaining === 0 && (
            <div
              className="wf-card"
              style={{
                marginTop: 18,
                textAlign: "center",
                padding: 35,
              }}
            >
              <h3 className="wf-complete">
                Congratulations. Every page, complete.
              </h3>

              <p className="wf-muted">
                You reached your writing goal. Excellent work.
              </p>
            </div>
          )}

          <p
            style={{
              textAlign: "center",
              color: "var(--muted)",
              fontSize: 9,
              letterSpacing: 2,
              marginTop: 35,
            }}
          >
            WRITEFLOW · THE ART OF PRODUCTIVITY
          </p>
        </div>
      </main>
    </>
  );
}
