import { useState } from "react";
import "./Css/Devices.css";
import DevicesRow from "../components/DevicesRow.jsx";
import DevicesMobileCard from "../components/DevicesMobileCard.jsx";

const initialDevices = [
  {
    id: 1,
    device: "MacBook Pro · Chrome",
    platform: "macOS",
    lastActive: "2 hours ago",
    status: "active",
  },
  {
    id: 2,
    device: "Android Phone · Chrome",
    platform: "Android",
    lastActive: "Yesterday",
    status: "recent",
  },
  {
    id: 3,
    device: "Unknown Device",
    platform: "Windows",
    lastActive: "Just now",
    status: "suspicious",
  },
];

const DevicesPage = () => {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredDevices = initialDevices.filter((d) => {
    const matchesSearch = d.device
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPlatform =
      platform === "all" || d.platform === platform;

    const matchesStatus =
      status === "all" || d.status === status;

    return matchesSearch && matchesPlatform && matchesStatus;
  });

  return (
    <div className="devices-page">
      {/* Header */}
      <div className="activity-header">
        <h1>Devices (3)</h1>
        <p>Devices that have recently accessed your account</p>
      </div>

      {/* Filters */}
      <div className="devices-filters">
        <input
          type="text"
          placeholder="Search device..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="all">All platforms</option>
          <option value="macOS">macOS</option>
          <option value="Windows">Windows</option>
          <option value="Android">Android</option>
          <option value="iOS">iOS</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="recent">Recent</option>
          <option value="suspicious">Suspicious</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="devices-table">
        <div className="devices-table-header">
          <span>Device</span>
          <span>Platform</span>
          <span>Last Active</span>
          <span>Status</span>
        </div>

        {filteredDevices.map((device) => (
          <DevicesRow key={device.id} device={device} />
        ))}
      </div>

      {/* Empty state */}
      {filteredDevices.length === 0 && (
        <p className="empty-state">
          No devices match your filters.
        </p>
      )}

      {/* Mobile Cards */}
      {filteredDevices.map((device) => (
        <DevicesMobileCard key={device.id} device={device} />
      ))}
    </div>
  );
};

export default DevicesPage;
