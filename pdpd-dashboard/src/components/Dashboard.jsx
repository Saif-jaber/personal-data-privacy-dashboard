import { Outlet } from "react-router-dom";
import "./Css/Dash.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>An overview of your personal data and privacy</p>
      </div>

      {/* Cards Grid */}
      <div className="cards-grid">
        {/* Privacy Score Card (Dark Blue) */}
        <div className="privacy-score-card">
          <div className="card-top">
            <h3>Privacy Score</h3>
            <div className="card-icon">↗</div>
          </div>

          <div className="score-value">85</div>

          <div className="score-change">
            <span className="badge">▲</span>
            Improved from last month
          </div>
        </div>

        {/* Summary Cards (White) */}
        <div className="summary-card">
          <div className="card-top">
            <h4>Connected Apps</h4>
            <div className="card-icon-outline">↗</div>
          </div>
          <div className="summary-value">12</div>
          <div className="summary-change">
            <span className="badge">▲</span>
            Increased from last month
          </div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <h4>High-Risk Apps</h4>
            <div className="card-icon-outline">↗</div>
          </div>
          <div className="summary-value">3</div>
          <div className="summary-change danger">
            <span className="badge danger">▲</span>
            Needs attention
          </div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <h4>Recent Logins</h4>
            <div className="card-icon-outline">↗</div>
          </div>
          <div className="summary-value">5</div>
          <div className="summary-change">
            <span className="badge">▲</span>
            Last 7 days
          </div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <h4>Tracking Status</h4>
            <div className="card-icon-outline">↗</div>
          </div>
          <div className="summary-value text">Enabled</div>
          <div className="summary-change">
            <span className="badge">▲</span>
            Active
          </div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="weekly-analytics">
        <h3>Weekly Activity</h3>
      
        <div className="analytics-bars">
          {[
            { day: "S", value: 45 },
            { day: "M", value: 70 },
            { day: "T", value: 55, active: true },
            { day: "W", value: 85 },
            { day: "T", value: 40 },
            { day: "F", value: 60 },
            { day: "S", value: 50 },
          ].map((item, index) => (
            <div className="analytics-item" key={index}>
              <div
                className={`analytics-bar ${item.active ? "active" : ""}`}
                style={{ height: `${item.value}%` }}
              />
              <span>{item.day}</span>
            </div>
          ))}
        </div>
      </div>
      

      {/* Warnings */}
      <div className="warnings-section">
        <h3>Quick Warnings</h3>
        <ul>
          <li>⚠️ A third-party app has extensive permissions</li>
          <li>⚠️ Location tracking is enabled</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="dashboard-actions">
        <button>View Connected Apps</button>
        <button>Login Activity</button>
        <button>Privacy Settings</button>
      </div>

      {/* Nested pages */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
