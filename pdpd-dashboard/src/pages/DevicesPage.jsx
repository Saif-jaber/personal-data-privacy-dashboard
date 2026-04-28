import { useState, useEffect } from "react";
import "./Css/Devices.css";
import DevicesRow from "../components/DevicesRow.jsx";
import DevicesMobileCard from "../components/DevicesMobileCard.jsx";

const DevicesPage = () => {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("all");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const email = localStorage.getItem("userEmail");

        const res = await fetch("http://localhost:YOUR_PORT/getDevices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!data || !Array.isArray(data.devices)) {
          console.error("Invalid response:", data);
          setDevices([]);
          return;
        }

        const formatted = data.devices.map((d) => ({
          id: d.id,
          device: `${d.device_name} · ${d.browser}`,
          platform: d.os,
          lastActive: new Date(d.last_active).toLocaleString(),
          status: "active",
        }));

        setDevices(formatted);
      } catch (err) {
        console.error("Fetch error:", err);
        setDevices([]);
      }
    };

    fetchDevices();
  }, []);

  const filteredDevices = devices.filter((d) => {
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
        <h1>Devices</h1>
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
        <p className="empty-state">No devices match your filters.</p>
      )}

      {/* Mobile Cards */}
      {filteredDevices.map((device) => (
        <DevicesMobileCard key={device.id} device={device} />
      ))}
    </div>
  );
};

export default DevicesPage;
