import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import Dashboard from "./components/Dashboard.jsx";
import NavBarLayout from "./layouts/NavBarLayout.jsx";
import ConnectedApps from "./pages/ConnectedApps.jsx";


function App() {
  return (
    <Routes>
      {/* Auth pages (no sidebar) */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      
      <Route element={<NavBarLayout />}>
        {/* Dashboard layout (WITH sidebar) */}
        <Route path="/dashboard" element={<Dashboard />}></Route>
        {/* connected apps page (with sidebar)*/}
        <Route path="/connected-apps" element={<ConnectedApps />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
