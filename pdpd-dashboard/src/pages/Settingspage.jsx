import { useState } from "react";
import "./Css/Settings.css";
import { useTheme } from "../components/ThemeContext.jsx";

/* ── Icons ────────────────────────────────────────────── */
const IconSun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const IconMoon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const IconMonitor = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);
const IconBell = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const IconRefresh = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
  </svg>
);
const IconExternalLink = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* ── Toggle ───────────────────────────────────────────── */
function Toggle({ enabled, onToggle }) {
  return (
    <button className={`settings-toggle ${enabled ? "on" : ""}`} onClick={onToggle} aria-pressed={enabled}>
      <span className="settings-toggle-knob" />
    </button>
  );
}

/* ── Section ──────────────────────────────────────────── */
function Section({ icon, title, children }) {
  return (
    <div className="section-container">
      <div className="section-header-wrapper">
        <span className="section-icon-svg">{icon}</span>
        <h2 className="section-header">{title}</h2>
      </div>
      <div className="items-container">{children}</div>
    </div>
  );
}

/* ── Row variants ─────────────────────────────────────── */
function ToggleRow({ label, description, enabled, onToggle }) {
  return (
    <div className="privacy-row settings-control-row">
      <span className="row-title">{label}</span>
      <span className="row-description">{description}</span>
      <div className="row-control">
        <Toggle enabled={enabled} onToggle={onToggle} />
      </div>
    </div>
  );
}

function ActionRow({ label, description, children }) {
  return (
    <div className="privacy-row settings-control-row">
      <span className="row-title">{label}</span>
      <span className="row-description">{description}</span>
      <div className="row-control">{children}</div>
    </div>
  );
}

/* ── Main Page ────────────────────────────────────────── */
export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifs, setNotifs] = useState({
    loginAlerts: true,
    newApp: true,
    riskWarnings: true,
    weeklySummary: false,
  });
  const [scanFreq, setScanFreq] = useState("manual");
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [lastScanned, setLastScanned] = useState("2 hours ago");

  const toggleNotif = (key) => setNotifs((p) => ({ ...p, [key]: !p[key] }));

  const handleRefresh = () => {
    if (scanning) return;
    setScanning(true); setScanDone(false);
    setTimeout(() => {
      setScanning(false); setScanDone(true); setLastScanned("just now");
      setTimeout(() => setScanDone(false), 3000);
    }, 1800);
  };

  return (
    <div className="privacy-center-page">

      <div className="page-top-header">
        <h1>Settings</h1>
        <p>Manage your preferences, notifications, and scan data.</p>
      </div>

      {/* Appearance */}
      <Section icon={<IconSun />} title="Appearance">
        <div className="privacy-row settings-control-row">
          <span className="row-title">Theme</span>
          <span className="row-description">Choose how the dashboard looks to you.</span>
          <div className="row-control theme-picker">
            {[
              { value: "light",  label: "Light",  Icon: IconSun },
              { value: "dark",   label: "Dark",   Icon: IconMoon },
              { value: "system", label: "System", Icon: IconMonitor },
            ].map(({ value, label, Icon }) => (
              <button
                key={value}
                className={`theme-btn ${theme === value ? "active" : ""}`}
                onClick={() => setTheme(value)}
              >
                <span className="theme-btn-icon"><Icon /></span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Notifications */}
      <Section icon={<IconBell />} title="Notifications">
        {[
          { key: "loginAlerts",   label: "Login alerts",     desc: "Get notified when a new device signs in to your account." },
          { key: "newApp",        label: "New app detected", desc: "Alert when a third-party app connects to your account." },
          { key: "riskWarnings",  label: "Risk warnings",    desc: "Notify when your privacy score drops below 60." },
          { key: "weeklySummary", label: "Weekly summary",   desc: "Receive a weekly digest of your account privacy status." },
        ].map(({ key, label, desc }) => (
          <ToggleRow key={key} label={label} description={desc} enabled={notifs[key]} onToggle={() => toggleNotif(key)} />
        ))}
      </Section>

      {/* Scan Data */}
      <Section icon={<IconRefresh />} title="Scan Data">
        <ActionRow
          label="Refresh data"
          description={`Re-fetch connected apps, devices, and login activity. Last scanned ${lastScanned}.`}
        >
          <button
            className={`settings-action-btn${scanning ? " loading" : ""}${scanDone ? " done" : ""}`}
            onClick={handleRefresh}
            disabled={scanning}
          >
            <span className={`btn-icon${scanning ? " spinning" : ""}`}>
              {scanDone ? <IconCheck /> : <IconRefresh />}
            </span>
            {scanning ? "Scanning…" : scanDone ? "Done" : "Refresh"}
          </button>
        </ActionRow>

        <ActionRow label="Scan frequency" description="How often the dashboard auto-refreshes your data.">
          <select className="settings-select" value={scanFreq} onChange={(e) => setScanFreq(e.target.value)}>
            <option value="manual">Manual only</option>
            <option value="24h">Every 24 hours</option>
            <option value="3d">Every 3 days</option>
            <option value="7d">Every week</option>
          </select>
        </ActionRow>
      </Section>

      {/* Review in Google */}
      <Section icon={<IconExternalLink />} title="Google Account">
        <a
          href="https://myaccount.google.com"
          target="_blank"
          rel="noreferrer"
          className="privacy-row"
        >
          <span className="row-title">Review in Google</span>
          <span className="row-description">Manage permissions, connected apps, and security settings directly in your Google Account.</span>
          <div className="row-arrow-container">
            <span className="link-icon-svg"><IconExternalLink /></span>
          </div>
        </a>
      </Section>

      <p className="page-bottom-note">PDPD v0.1.0 · Privacy Dashboard</p>
    </div>
  );
}