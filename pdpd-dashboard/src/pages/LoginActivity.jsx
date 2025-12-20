import { useState } from "react";
import ActivityTable from "../components/ActivityTable";
import "./Css/LoginActivity.css";

const logs = [
  {
    id: 1,
    time: "2024-12-09T17:30:00",
    email: "alex.carter@gmail.com",
    event: "New device signed in",
    status: "warning",
    device: "Chrome • Windows",
    risk: "Medium",
    ip: "203.0.113.45",
    location: "Dubai, UAE",
    twoFactor: true,
    network: "Wi-Fi",
  },
  {
    id: 2,
    time: "2024-12-08T11:00:00",
    email: "alex.carter@gmail.com",
    event: "Successful login",
    status: "success",
    device: "Safari • macOS",
    risk: "Low",
    ip: "192.0.2.33",
    location: "Abu Dhabi, UAE",
    twoFactor: true,
    network: "Mobile",
  },
  {
    id: 3,
    time: "2024-12-07T03:12:00",
    email: "alex.carter@gmail.com",
    event: "Suspicious login blocked",
    status: "danger",
    device: "Unknown • Linux",
    risk: "High",
    ip: "45.82.11.9",
    location: "Unknown",
    twoFactor: false,
    network: "Unknown",
  },
   {
    id: 4,
    time: "2024-12-04T03:12:00",
    email: "saif@gmail.com",
    event: "Suspicious login blocked",
    status: "danger",
    device: "Unknown • Linux",
    risk: "High",
    ip: "45.82.11.9",
    location: "Unknown",
    twoFactor: false,
    network: "Unknown",
  },
];

const LoginActivity = () => {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  // 🔎 Filter logic
  const filteredLogs = logs.filter((log) => {
    // Email search
    const matchesSearch = log.email
      .toLowerCase()
      .includes(search.toLowerCase());

    // Risk filter
    const matchesRisk =
      riskFilter === "all" ||
      log.risk.toLowerCase() === riskFilter;

    // Time filter
    const now = new Date();
    const logTime = new Date(log.time);
    let matchesTime = true;

    if (timeFilter === "24h") {
      matchesTime = now - logTime <= 24 * 60 * 60 * 1000;
    }
    if (timeFilter === "7d") {
      matchesTime = now - logTime <= 7 * 24 * 60 * 60 * 1000;
    }
    if (timeFilter === "30d") {
      matchesTime = now - logTime <= 30 * 24 * 60 * 60 * 1000;
    }

    return matchesSearch && matchesRisk && matchesTime;
  });

  return (
    <div className="login-activity-page">
      <div className="activity-header">
        <h1>Login Activity ({logs.length})</h1>
        <p>Security and login events for your Google account (click to expand)</p>
      </div>

      {/* 🔍 Filters */}
      <div className="activity-filters">
        <input
          type="text"
          placeholder="Search by email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
        >
          <option value="all">All risks</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="all">All time</option>
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
        </select>
      </div>

      <ActivityTable logs={filteredLogs} />
    </div>
  );
};

export default LoginActivity;
