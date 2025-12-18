import "./Css/AppCards.css";


const AppsCard = ({ icon, name, description, enabled, onToggle }) => {
  return (
    <div className="app-card">
      <div className="app-card-header">
        <div className="app-card-info">
          <img src={icon} alt={name} className="app-card-icon" />
          <h3 className="app-card-title">{name}</h3>
        </div>

        <label className="app-switch">
          <input
            type="checkbox"
            checked={enabled}
            onChange={onToggle}
          />
          <span className="app-slider"></span>
        </label>
      </div>

      <p className="app-card-description">{description}</p>
    </div>
  );
};

export default AppsCard;
