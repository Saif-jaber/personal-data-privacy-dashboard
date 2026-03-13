import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SecurityQuestionPopup from "./SecurityQuestionPopup.jsx";

import "./Css/Dash.css";

const Dashboard = () => {
  const Navigate = useNavigate();

  const [securityPopupOpen, setSecurityPopupOpen] = useState(false);

  useEffect(() => {
    const hasAnswered = localStorage.getItem("QSet") ? true : false;

    if (!hasAnswered) {
      setSecurityPopupOpen(true);
    }
  }, []);

  const handleSecuritySubmit = async ({
    securityQuestion,
    securityAnswer,
    questionID,
  }) => {
    try {
      const email = localStorage.getItem("email");

      console.log("Submitting security question...");
      console.log("Email:", email);
      console.log("Question:", securityQuestion);
      console.log("Question ID:", questionID);
      console.log("Answer:", securityAnswer);

      if (!email) {
        console.log("No email found in localStorage");
        return;
      }

      const res = await fetch("http://localhost:5000/addSecurityQ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          questionID,
          answer: securityAnswer,
        }),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (res.ok) {
        localStorage.setItem("QSet", "true");
        setSecurityPopupOpen(false);
        console.log(data.message);
      } else {
        console.log(data.error || data.message || "Failed to save security question");
      }
    } catch (err) {
      console.error("Error saving security question:", err);
    }
  };

  return (
    <div className="dashboard">
      {securityPopupOpen && (
        <SecurityQuestionPopup onSubmit={handleSecuritySubmit} />
      )}

      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>An overview of your personal data and privacy</p>
      </div>

      <div className="cards-grid">
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

        <div className="summary-card">
          <div className="card-top">
            <h4>Connected Apps</h4>
            <div
              className="card-icon-outline"
              onClick={() => Navigate("/connected-apps")}
            >
              ↗
            </div>
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
            <div
              className="card-icon-outline"
              onClick={() => Navigate("/login-activity")}
            >
              ↗
            </div>
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
            <div
              className="card-icon-outline"
              onClick={() => Navigate("/login-activity")}
            >
              ↗
            </div>
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
            <div
              className="card-icon-outline"
              onClick={() => Navigate("/devices")}
            >
              ↗
            </div>
          </div>
          <div className="summary-value">3</div>
          <div className="summary-change">
            <span className="stat-badge success">▲</span>
            Active
          </div>
        </div>
      </div>

      <div className="analytics-warnings-grid">
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

        <div className="warnings-section">
          <h3>Quick Warnings</h3>
          <ul>
            <li>⚠️ A third-party app has extensive permissions</li>
            <li>⚠️ Location tracking is enabled</li>
          </ul>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Dashboard;