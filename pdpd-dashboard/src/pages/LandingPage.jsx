import { useState, useEffect, useRef } from "react";
import "./Css/LandingPage.css";

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState(null);
  const tabsRef = useRef(null); // reference to the tabs container

  const handleTabClick = (tabName) => {
    setActiveTab(activeTab === tabName ? null : tabName);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tabsRef.current && !tabsRef.current.contains(event.target)) {
        setActiveTab(null); // close any open dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navBarTop">
        <h1 className="logo">PDP</h1>

        <div className="tabs" ref={tabsRef}>
          {/* Product Tab */}
          <div className={`tab-item ${activeTab === "product" ? "active" : ""}`}>
            <button onClick={() => handleTabClick("product")}>Product</button>
            <div className="dropdown">
              <a href="#feature1">Dashboard</a>
              <a href="#feature2">Privacy Controls</a>
              <a href="#feature3">Activity Log</a>
              <a href="#feature4">Connected Apps</a>
            </div>
          </div>

          {/* Privacy Tab */}
          <div className={`tab-item ${activeTab === "privacy" ? "active" : ""}`}>
            <button onClick={() => handleTabClick("privacy")}>Privacy</button>
            <div className="dropdown">
              <a href="#scan">Scan Account</a>
              <a href="#settings">Settings</a>
            </div>
          </div>

          {/* Learn Tab */}
          <div className={`tab-item ${activeTab === "learn" ? "active" : ""}`}>
            <button onClick={() => handleTabClick("learn")}>Learn</button>
            <div className="dropdown">
              <a href="#docs">Documentation</a>
              <a href="#blog">Blog</a>
            </div>
          </div>
        </div>

        <div className="cta-btn">
          <a href="#login" className="login">Log in</a>
          <a href="#signup" className="signup">Sign up</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>
            Privacy made simple <br />
            <span>know what’s happening with your data</span>
          </h1>

          <p>
            Scan your Google account to uncover connected apps, permissions,
            login activity, and tracking settings — all presented clearly,
            securely, and transparently.
          </p>

          <div className="hero-actions">
            <a href="#get-started" className="btn btn-primary">
              Check Your Privacy
            </a>
            <a href="#demo" className="btn btn-secondary">
              View Demo
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
