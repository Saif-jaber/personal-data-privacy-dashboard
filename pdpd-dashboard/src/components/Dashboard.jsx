import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./Css/Dash.css";

const Dashboard = () => {
  const Navigate = useNavigate();
  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>An overview of your personal data and privacy</p>
      </div>

      {/* Cards Grid */}
      <div className="cards-grid">
        {/* Privacy Score Card */}
        <div className="privacy-score-card">
          <div className="card-top">
            <h3>Privacy Score</h3>
            <div className="card-icon">↗</div>
          </div>

          <div className="score-value">85</div>

          <div className="score-change">
            <span className="stat-badge success">▲</span>
            Improved from last month
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-card">
          <div className="card-top">
            <h4>Connected Apps</h4>
            <div className="card-icon-outline" onClick={()=> Navigate("/connected-apps")}>↗</div>
          </div>
          <div className="summary-value">12</div>
          <div className="summary-change">
            <span className="stat-badge success">▲</span>
            Increased from last month
          </div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <h4>Suspecious Activity</h4>
            <div className="card-icon-outline" onClick={()=> Navigate("/login-activity")}>↗</div>
          </div>
          <div className="summary-value">2</div>
          <div className="summary-change danger">
            <span className="stat-badge danger">▲</span>
            Needs attention
          </div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <h4>Recent Logins</h4>
            <div className="card-icon-outline" onClick={()=> Navigate("/login-activity")}>↗</div>
          </div>
          <div className="summary-value">5</div>
          <div className="summary-change">
            <span className="stat-badge success">▲</span>
            Last 7 days
          </div>
        </div>

        <div className="summary-card">
          <div className="card-top">
            <h4>Active Devices</h4>
            <div className="card-icon-outline" onClick={()=> Navigate("/devices")}>↗</div>
          </div>
          <div className="summary-value">3</div>
          <div className="summary-change">
            <span className="stat-badge success">▲</span>
            Active
          </div>
        </div>
      </div>

      {/* ===== ANALYTICS + WARNINGS LAYOUT ===== */}
      <div className="analytics-warnings-grid">
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
                  data-tooltip={`${item.value} activities`}
                />
                <span>{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Warnings */}
        <div className="warnings-section">
          <h3>Quick Warnings</h3>
          <ul>
            <li>⚠️ A third-party app has extensive permissions</li>
            <li>⚠️ Location tracking is enabled</li>
          </ul>
        </div>
      </div>

      {/* Nested pages */}
      <Outlet />
    </div>
  );
};

export default Dashboard;
