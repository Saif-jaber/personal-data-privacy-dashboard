import { useState } from "react";

const ActivityRow = ({ log }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop/Tablet row (keeps your table) */}
      <div
        className="table-row"
        onClick={() => setOpen(!open)}
        role="button"
        aria-expanded={open}
      >
        <span>{log.time}</span>
        <span>{log.email}</span>
        <span className={`event ${log.status}`}>{log.event}</span>
        <span className={`risk ${log.risk.toLowerCase()}`}>{log.risk}</span>
        <span>{log.device}</span>
      </div>

      {/* Desktop/Tablet expanded details */}
      {open && (
        <div className="row-details">
          <div><strong>IP Address:</strong> {log.ip}</div>
          <div><strong>Location:</strong> {log.location}</div>
          <div><strong>2FA Used:</strong> {log.twoFactor ? "Yes" : "No"}</div>
          <div><strong>Network:</strong> {log.network}</div>
        </div>
      )}

      {/* Mobile full card (shows EVERYTHING, no expand) */}
      <div className="mobile-log-card">
        <div className="mobile-card-top">
          <div className="mobile-card-event">
            <span className={`event ${log.status}`}>{log.event}</span>
          </div>
          <div className={`risk ${log.risk.toLowerCase()}`}>{log.risk}</div>
        </div>

        <div className="mobile-card-grid">
          <div className="mobile-field">
            <span className="mobile-label">Time</span>
            <span className="mobile-value">{log.time}</span>
          </div>

          <div className="mobile-field">
            <span className="mobile-label">Email</span>
            <span className="mobile-value">{log.email}</span>
          </div>

          <div className="mobile-field">
            <span className="mobile-label">Device</span>
            <span className="mobile-value">{log.device}</span>
          </div>

          <div className="mobile-field">
            <span className="mobile-label">Location</span>
            <span className="mobile-value">{log.location}</span>
          </div>

          <div className="mobile-field">
            <span className="mobile-label">IP Address</span>
            <span className="mobile-value">{log.ip}</span>
          </div>

          <div className="mobile-field">
            <span className="mobile-label">2FA Used</span>
            <span className="mobile-value">{log.twoFactor ? "Yes" : "No"}</span>
          </div>

          <div className="mobile-field">
            <span className="mobile-label">Network</span>
            <span className="mobile-value">{log.network}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityRow;
