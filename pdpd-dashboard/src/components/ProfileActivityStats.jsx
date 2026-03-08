import "./Css/ProfileActivityStats.css";

const ProfileActivityStats = ({
  totalLogins = 0,
  totalSignOuts = 0,
  totalActivity = 0,
}) => {
  const total = totalLogins + totalSignOuts + totalActivity;

  const loginPercent = total ? ((totalLogins / total) * 100).toFixed(1) : 0;
  const signOutPercent = total ? ((totalSignOuts / total) * 100).toFixed(1) : 0;
  const activityPercent = total ? ((totalActivity / total) * 100).toFixed(1) : 0;

  const signOutEnd = Number(loginPercent) + Number(signOutPercent);

  return (
    <div className="profile-stats-card">
      <div className="profile-stats-header">
        <h3>Account Activity</h3>
        <span className="profile-stats-subtitle">Google activity summary</span>
      </div>

      <div className="profile-stats-content">
        <div className="profile-stats-chart-wrap">
          <div
            className="profile-stats-donut"
            style={{
              background: `conic-gradient(
                #3b82f6 0% ${loginPercent}%,
                #22c55e ${loginPercent}% ${signOutEnd}%,
                #8b5cf6 ${signOutEnd}% 100%
              )`,
            }}
          >
            <div className="profile-stats-donut-inner">
              <span>{total}</span>
              <small>Total</small>
            </div>
          </div>
        </div>

        <div className="profile-stats-legend">
          <div className="stats-item">
            <div className="stats-label-row">
              <span className="stats-dot login-dot"></span>
              <span>Logins</span>
            </div>
            <div className="stats-number">{totalLogins}</div>
            <div className="stats-percent">{loginPercent}%</div>
          </div>

          <div className="stats-item">
            <div className="stats-label-row">
              <span className="stats-dot signout-dot"></span>
              <span>Sign Outs</span>
            </div>
            <div className="stats-number">{totalSignOuts}</div>
            <div className="stats-percent">{signOutPercent}%</div>
          </div>

          <div className="stats-item">
            <div className="stats-label-row">
              <span className="stats-dot activity-dot"></span>
              <span>Activity</span>
            </div>
            <div className="stats-number">{totalActivity}</div>
            <div className="stats-percent">{activityPercent}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileActivityStats;