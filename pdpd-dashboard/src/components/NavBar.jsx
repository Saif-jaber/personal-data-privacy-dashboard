import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Css/Navbar.css";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const closeSidebar = () => setOpen(false);

  return (
    <>
      {/* ===== Mobile Top Bar ===== */}
      <div className="topbar">
        <button className="menu-btn" onClick={() => setOpen(true)}>
          ☰
        </button>
        <span className="topbar-title">DataLens</span>
      </div>

      {/* ===== Overlay (mobile) ===== */}
      {open && <div className="overlay active" onClick={closeSidebar} />}

      {/* ===== Sidebar ===== */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon">
            <img
              src="src/assets/logo-removebg-preview.png"
              alt="DataLens logo"
            />
          </div>
          <span className="logo-text">DataLens</span>

          {/* Close (mobile only) */}
          <button className="sidebar-close-btn" onClick={closeSidebar}>
            ✕
          </button>
        </div>

        {/* ================= MENU ================= */}
        <div className="sidebar-section">
          <p className="section-title">MENU</p>

          <NavLink
            to="/Dashboard"
            end
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <img
              src="src/assets/clapperboard-svgrepo-com.svg"
              className="icon"
              alt=""
            />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/connected-apps"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <img
              src="src/assets/mobile-signal-svgrepo-com.svg"
              className="icon"
              alt=""
            />
            <span>Connected Apps</span>
          </NavLink>

          <NavLink
            to="/login-activity"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <img
              src="src/assets/user-lock-alt-svgrepo-com.svg"
              className="icon"
              alt=""
            />
            <span>Login Activity</span>
          </NavLink>

          <NavLink
            to="/devices"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <img
              src="src/assets/desktop-computer-svgrepo-com.svg"
              className="icon"
              alt=""
            />
            <span>Devices</span>
          </NavLink>

          <NavLink
            to="/action"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <img
              src="src/assets/grid-search-svgrepo-com.svg"
              className="icon"
              alt=""
            />
            <span>Action Center</span>
          </NavLink>
        </div>

        {/* ================= GENERAL ================= */}
        <div className="sidebar-section">
          <p className="section-title">GENERAL</p>

          <NavLink
            to="/profile"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <img
              src="src/assets/image-user-svgrepo-com.svg"
              className="icon"
              alt=""
            />
            <span>Profile</span>
          </NavLink>

          <NavLink
            to="/settings"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <img
              src="src/assets/gear-svgrepo-com.svg"
              className="icon"
              alt=""
            />
            <span>Settings</span>
          </NavLink>

          <NavLink
            to="/tips"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `sidebar-item ${isActive ? "active" : ""}`
            }
          >
            <img
              src="src/assets/circle-information-svgrepo-com.svg"
              className="icon"
              alt=""
            />
            <span>Tips & Info</span>
          </NavLink>

          <NavLink
            to="/"
            onClick={closeSidebar}
            className="sidebar-item logout"
          >
            <img
              src="src/assets/exit-svgrepo-com.svg"
              className="icon"
              alt=""
            />
            <span>Logout</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default NavBar;
