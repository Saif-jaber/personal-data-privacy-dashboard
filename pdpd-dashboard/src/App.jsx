import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import Dashboard from "./components/Dashboard.jsx";
import NavBarLayout from "./layouts/NavBarLayout.jsx";

function App() {
  return (
    <Routes>
      {/* Auth pages (no sidebar) */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard layout (WITH sidebar) */}
      <Route element={<NavBarLayout />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<HomePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
