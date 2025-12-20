const DevicesMobileCard = ({ device }) => {
  return (
    <div className="mobile-device-card">
      <div className="mobile-device-title">
        {device.device}
      </div>

      <div className="mobile-device-grid">
        <div>
          <span className="mobile-label">Platform</span>
          <span className="mobile-value">{device.platform}</span>
        </div>

        <div>
          <span className="mobile-label">Last Active</span>
          <span className="mobile-value">{device.lastActive}</span>
        </div>

        <div>
          <span className="mobile-label">Status</span>
          <span className={`device-status ${device.status}`}>
            {device.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DevicesMobileCard;
