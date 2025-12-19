import ActivityRow from "./ActivityRow";

const ActivityTable = ({ logs }) => {
  return (
    <div className="activity-table">
      <div className="table-header">
        <span>Date & Time</span>
        <span>Email</span>
        <span>Event</span>
        <span>Risk</span>
        <span>Device</span>
      </div>

      {logs.map((log) => (
        <ActivityRow key={log.id} log={log} />
      ))}
    </div>
  );
};

export default ActivityTable;
