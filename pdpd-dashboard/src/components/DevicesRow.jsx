const DevicesRow = ({ device }) => {
  return (
    <div className="devices-table-row">
      <span>{device.device}</span>
      <span>{device.platform}</span>
      <span>{device.lastActive}</span>

      <span className={`device-status ${device.status}`}>
        {device.status}
      </span>
    </div>
  );
};

export default DevicesRow;
