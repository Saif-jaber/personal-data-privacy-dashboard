import { useState, useEffect, useRef } from "react";
import "./Css/LandingPage.css";
import AuthLayout from "../layouts/AuthLayout.jsx";
import LoginForm from "../components/LoginForm.jsx";
import SignupForm from "../components/SignupForm.jsx";
import Modal from "../components/Modal.jsx";

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [activeForm, setActiveForm] = useState(null);

  const tabsRef = useRef(null);

  const handleTabClick = (tabName) => {
    setActiveTab(activeTab === tabName ? null : tabName);
  };

  // url for images
  const dashImgUrl = 'src/assets/dash.png'; // src\assets\logins.png
  const connectedApssImgUrl = 'src/assets/connected-apps.png';
  const logsImgUrl = 'src/assets/logs.png';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tabsRef.current && !tabsRef.current.contains(event.target)) {
        setActiveTab(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeForm !== null) {
      // Freeze
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh"; 
    } else {
      // Unfreeze
      document.body.style.overflow = "unset";
      document.body.style.height = "unset";
    }
  
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.height = "unset";
    };
  }, [activeForm]);

  return (
    /* This wrapper manages the blur state for everything inside it */
    <div className={`page-root ${activeForm ? "content-blurred" : ""}`}>
      
      <div className="main-wrapper">
        {/* Navbar Section */}
        <nav className="navBarTop">
          <h1 className="logo">DPD</h1>
          <div className="tabs" ref={tabsRef}>
            {["product", "privacy", "learn"].map((tab) => (
              <div key={tab} className={`tab-item ${activeTab === tab ? "active" : ""}`}>
                <button onClick={() => handleTabClick(tab)}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
                <div className="dropdown">
                  {tab === "product" && (
                    <>
                      <a href="#dashboard">Dashboard</a>
                      <a href="#privacy-section">Privacy Controls</a>
                      <a href="#login-section">Activity Log</a>
                      <a href="#CApps-section">Connected Apps</a>
                    </>
                  )}
                  {tab === "privacy" && (
                    <>
                      <a>Scan Account</a>
                      <a>Settings</a>
                    </>
                  )}
                  {tab === "learn" && (
                    <>
                      <a>Documentation</a>
                      <a>Blog</a>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="cta-btn">
            <a className="login" onClick={() => setActiveForm("login")}>Log in</a>
            <a className="signup" onClick={() => setActiveForm("signup")}>Sign up</a>
          </div>
        </nav>
  
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>
              Privacy made simple <br />
              <span>know what’s happening with your data</span>
            </h1>
            <p>
              Scan your Google account to uncover connected apps, permissions,
              login activity, and tracking settings all presented clearly,
              securely, and transparently.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" onClick={() => setActiveForm("signup")}>Check Your Privacy</a>
              <a className="btn btn-secondary">View Demo</a>
            </div>
          </div>
  
          <div className="loader">
            <svg id="cloud" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <defs>
                <filter id="roundness">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="1.5"></feGaussianBlur>
                  <feColorMatrix
                    values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"
                  ></feColorMatrix>
                </filter>
                <mask id="shapes">
                  <g fill="white">
                    <polygon points="50 37.5 80 75 20 75 50 37.5"></polygon>
                    <circle cx="20" cy="60" r="15"></circle>
                    <circle cx="80" cy="60" r="15"></circle>
                    <g>
                      <circle cx="20" cy="60" r="15"></circle>
                      <circle cx="20" cy="60" r="15"></circle>
                      <circle cx="20" cy="60" r="15"></circle>
                    </g>
                  </g>
                </mask>
                <mask id="clipping" clipPathUnits="userSpaceOnUse">
                  <g id="lines" filter="url(#roundness)">
                    <g mask="url(#shapes)" stroke="white">
                      <line x1="-50" y1="-40" x2="150" y2="-40"></line>
                      <line x1="-50" y1="-31" x2="150" y2="-31"></line>
                      <line x1="-50" y1="-22" x2="150" y2="-22"></line>
                      <line x1="-50" y1="-13" x2="150" y2="-13"></line>
                      <line x1="-50" y1="-4" x2="150" y2="-4"></line>
                      <line x1="-50" y1="5" x2="150" y2="5"></line>
                      <line x1="-50" y1="14" x2="150" y2="14"></line>
                      <line x1="-50" y1="23" x2="150" y2="23"></line>
                      <line x1="-50" y1="32" x2="150" y2="32"></line>
                      <line x1="-50" y1="41" x2="150" y2="41"></line>
                      <line x1="-50" y1="50" x2="150" y2="50"></line>
                      <line x1="-50" y1="59" x2="150" y2="59"></line>
                      <line x1="-50" y1="68" x2="150" y2="68"></line>
                      <line x1="-50" y1="77" x2="150" y2="77"></line>
                      <line x1="-50" y1="86" x2="150" y2="86"></line>
                      <line x1="-50" y1="95" x2="150" y2="95"></line>
                      <line x1="-50" y1="104" x2="150" y2="104"></line>
                      <line x1="-50" y1="113" x2="150" y2="113"></line>
                      <line x1="-50" y1="122" x2="150" y2="122"></line>
                      <line x1="-50" y1="131" x2="150" y2="131"></line>
                      <line x1="-50" y1="140" x2="150" y2="140"></line>
                    </g>
                  </g>
                </mask>
              </defs>
              <rect
                x="0"
                y="0"
                width="100"
                height="100"
                rx="0"
                ry="0"
                mask="url(#clipping)"
              ></rect>
              <g>
                <path
                  d="M33.52,68.12 C35.02,62.8 39.03,58.52 44.24,56.69 C49.26,54.93 54.68,55.61 59.04,58.4 C59.04,58.4 56.24,60.53 56.24,60.53 C55.45,61.13 55.68,62.37 56.63,62.64 C56.63,62.64 67.21,65.66 67.21,65.66 C67.98,65.88 68.75,65.3 68.74,64.5 C68.74,64.5 68.68,53.5 68.68,53.5 C68.67,52.51 67.54,51.95 66.75,52.55 C66.75,52.55 64.04,54.61 64.04,54.61 C57.88,49.79 49.73,48.4 42.25,51.03 C35.2,53.51 29.78,59.29 27.74,66.49 C27.29,68.08 28.22,69.74 29.81,70.19 C30.09,70.27 30.36,70.31 30.63,70.31 C31.94,70.31 33.14,69.44 33.52,68.12Z"
                ></path>
                <path
                  d="M69.95,74.85 C68.35,74.4 66.7,75.32 66.25,76.92 C64.74,82.24 60.73,86.51 55.52,88.35 C50.51,90.11 45.09,89.43 40.73,86.63 C40.73,86.63 43.53,84.51 43.53,84.51 C44.31,83.91 44.08,82.67 43.13,82.4 C43.13,82.4 32.55,79.38 32.55,79.38 C31.78,79.16 31.02,79.74 31.02,80.54 C31.02,80.54 31.09,91.54 31.09,91.54 C31.09,92.53 32.22,93.09 33.01,92.49 C33.01,92.49 35.72,90.43 35.72,90.43 C39.81,93.63 44.77,95.32 49.84,95.32 C52.41,95.32 55,94.89 57.51,94.01 C64.56,91.53 69.99,85.75 72.02,78.55 C72.47,76.95 71.54,75.3 69.95,74.85Z"
                ></path>
              </g>
            </svg>
          </div>
        </section>

        <section className="pdpd-overview-section">
          <div className="pdpd-overview-wrapper">
            <div className="pdpd-overview-text">
              <div className="pdpd-overview-badge" id="dashboard">Privacy Tool</div>
              <h1>
                Personal Data Privacy Dashboard
                <span className="pdpd-overview-highlight"> (DPD)</span>
              </h1>
        
              <p className="pdpd-overview-lead">
                A simple, secure way to discover who really has access to your Google account 
                and take back control of your personal data.
              </p>
        
              <div className="pdpd-overview-points">
                <div className="pdpd-overview-point">
                  <div className="pdpd-overview-number">1</div>
                  <p>Shows all third-party apps still connected to your Google account</p>
                </div>
                
                <div className="pdpd-overview-point">
                  <div className="pdpd-overview-number">2</div>
                  <p>Reveals what sensitive permissions those apps were granted</p>
                </div>
                
                <div className="pdpd-overview-point">
                  <div className="pdpd-overview-number">3</div>
                  <p>Detects recent logins, unfamiliar devices & suspicious activity</p>
                </div>
                
                <div className="pdpd-overview-point">
                  <div className="pdpd-overview-number">4</div>
                  <p>Calculates your personal <strong>privacy risk score</strong></p>
                </div>
              </div>
        
            <p className="pdpd-overview-security">
              <strong>Security & Privacy:</strong> We collect and store only the minimum information required to operate this website. This includes your email address and a securely hashed password for authentication purposes. We also record basic login timestamps strictly for security monitoring and system integrity. No device information, IP addresses, location data, browsing activity, or third-party personal data is collected, stored, or shared.
               For Google sign-in features, authentication is handled via secure OAuth 2.0, and your Google password is never accessed or stored by this website. Wherever possible, data processing is performed on the client side.
            </p>
        
              <div className="pdpd-overview-outcome">
                <h3>What you get</h3>
                <p>Clear recommendations • One-click revocation options • 
                   Better understanding of your digital footprint</p>
              </div>
            </div>
        
            <div className="pdpd-overview-visual">
              <div className="pdpd-overview-mockup">
                <img src={dashImgUrl} alt="Dashboard preview" />
              </div>
            </div>
          </div>
        </section>
  
        {/* Main Dashboard Section */}
        <section className="dashboard-section" id="CApps-section">
          <div className="dashboard-card-wide">
            <div className="dashboard-left">
              <h2>Connected Apps Overview</h2>
              <p>Scan your Google account to see all third-party apps with access, their permissions, 
              recent login activity, and your overall privacy risk score all in one secure dashboard.</p>
            </div>
  
            <div className="dashboard-right">
              <img src={connectedApssImgUrl} alt="dashboard-img" />
            </div>
          </div>
        </section>

        <section className="dashboard-section" style={{paddingTop: '0rem'}} id="login-section">
          <div className="dashboard-card-wide">
            <div className="dashboard-left">
              <h2>Login Activity Overview</h2>
              <p>Monitor all recent sign-ins to your Google account, detect suspicious activity, 
               check risk levels and see login locations, devices and IP details in one clear view.</p>
            </div>
  
            <div className="dashboard-right">
                <img src={logsImgUrl} alt="dashboard-img" />
              </div>
            </div>
  
          <div className="feature-grid-row" id="privacy-section">
            <div className="feature-card-item">
              <div className="card-top-header">
                <h3>Privacy Insights</h3>
                <p>Know who has access to your data and monitor suspicious activity.</p>
              </div>
              <div className="white-inner-container">
                <ul className="feature-list">
                  <li>Connected apps & permissions see what apps access your account</li>
                  <li>Login activity detect suspicious logins quickly</li>
                  <li>Privacy score understand your account safety at a glance</li>
                </ul>
              </div>
            </div>
  
            <div className="feature-card-item">
              <div className="card-top-header">
                <h3>Actionable Recommendations</h3>
                <p>Improve account security with clear, step-by-step guidance.</p>
              </div>
              <div className="white-inner-container">
                <ul className="feature-list">
                  <li>Risk alerts identify potential privacy vulnerabilities</li>
                  <li>Settings adjustments control tracking and app permissions</li>
                  <li>Security tips take steps to protect your data easily</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <footer className="pdpd-footer">
          <div className="container">
            {/* Left - Main message */}
            <div className="main-message">
              <h2>DPD</h2>
              <p>
                Know who really has access to your data<br />
                Take back control of your digital privacy
              </p>
    
              <button
                className="back-to-top-btn"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to Top ↑
              </button>
            </div>
    
            {/* Right - Minimal relevant links */}
            <div className="links-area">
              <div className="links-column">
                <h4>Product</h4>
                <ul>
                  <li><a>How It Works</a></li>
                  <li><a>Connect Google Account</a></li>
                  <li><a>Privacy Score</a></li>
                </ul>
              </div>
    
              <div className="links-column">
                <h4>Support</h4>
                <ul>
                  <li><a>FAQ</a></li>
                  <li><a>Contact Us</a></li>
                </ul>
              </div>
    
              <div className="links-column">
                <h4>Legal</h4>
                <ul>
                  <li><a>Privacy Policy</a></li>
                  <li><a>Terms of Use</a></li>
                </ul>
              </div>
            </div>
          </div>
    
          {/* Bottom bar */}
          <div className="footer-bottom">
            <div className="bottom-content">
              <div className="copyright">
                © {new Date().getFullYear()} DPD – All rights reserved
              </div>
    
              <div className="bottom-links">
                <a>Privacy Policy</a>
                <span className="separator">•</span>
                <a>Terms of Use</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Modal is OUTSIDE the blurred main-wrapper but INSIDE the page-root */}
      <Modal isOpen={activeForm !== null} onClose={() => setActiveForm(null)}>
        {activeForm === "login" && (
          <AuthLayout>
            <LoginForm 
              onClose={() => setActiveForm(null)} 
              onSwitch={() => setActiveForm("signup")} 
            />
          </AuthLayout>
        )}
        {activeForm === "signup" && (
          <AuthLayout>
            <SignupForm 
              onClose={() => setActiveForm(null)} 
              onSwitch={() => setActiveForm("login")} 
            />
          </AuthLayout>
        )}
      </Modal>

    </div>
  );
};

export default LandingPage;