import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import Dashboard from "./components/Dashboard.jsx";
import NavBarLayout from "./layouts/NavBarLayout.jsx";
import ConnectedApps from "./pages/ConnectedApps.jsx";
import LoginActivity from "./pages/LoginActivity.jsx";
import DevicesPage from "./pages/DevicesPage.jsx";


function App() {
  return (
    <Routes>
      {/* Auth pages (no sidebar) */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<NavBarLayout />}>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/connected-apps" element={<ConnectedApps />}></Route>
        <Route path="/login-activity" element={<LoginActivity />}></Route>
        <Route path="/devices" element={<DevicesPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
