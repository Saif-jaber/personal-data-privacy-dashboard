import AppscardLayout from "../layouts/AppscardLayout";
import "./Css/ConnectedApps.css";

const ConnectedApps = () => {
  return (
    <div className="connectedApps-page">
      <div className="connectedApps-header">
        <h1>Connected Apps</h1>
        <p>An overview of apps connected to your email</p>
      </div>
      <AppscardLayout />
    </div>
  );
};

export default ConnectedApps;
