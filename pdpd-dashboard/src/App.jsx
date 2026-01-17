import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import NavBarLayout from "./layouts/NavBarLayout.jsx";
import ConnectedApps from "./pages/ConnectedApps.jsx";
import LoginActivity from "./pages/LoginActivity.jsx";
import DevicesPage from "./pages/DevicesPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Action from "./pages/Action.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const App = () => {
  return (
    <Routes>
      {/* Auth pages (no sidebar) */}
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<LandingPage />} />

      <Route element={<NavBarLayout />}>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/connected-apps" element={<ConnectedApps />}></Route>
        <Route path="/login-activity" element={<LoginActivity />}></Route>
        <Route path="/devices" element={<DevicesPage />}></Route>
        <Route path="/action" element={<Action />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
