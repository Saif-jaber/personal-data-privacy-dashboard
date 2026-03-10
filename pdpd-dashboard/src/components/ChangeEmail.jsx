import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./Css/ChangeEmailPopup.css";

const ChangeEmailPopup = ({
  oldEmail = localStorage.getItem("email") || "",
  onSubmit,
  onClose,
}) => {
  const [newEmail, setNewEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  const emailIcon = "src/assets/email-sign-svgrepo-com.svg";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCaptcha = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newEmail.trim()) return;
    if (!captchaToken) return;

    if (onSubmit) {
      onSubmit({
        oldEmail,
        newEmail,
        captchaToken,
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="email-popup">
        <button type="button" className="popup-close" onClick={onClose}>
          ✕
        </button>

        <form className="email-form" onSubmit={handleSubmit}>
          <div className="email-icon">
            <img src={emailIcon} alt="Email icon" className="custom-icon" />
          </div>

          <div className="email-note">
            <label className="email-title">Change Email</label>
            <span className="email-subtitle">
              Update your account email by entering a new one below.
            </span>
          </div>

          <div className="input-group">
            <label className="input-label">Old Email</label>
            <input
              type="email"
              className="email-input"
              value={oldEmail}
              readOnly
            />
          </div>

          <div className="input-group">
            <label className="input-label">New Email</label>
            <input
              type="email"
              className="email-input"
              placeholder="Enter your new email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </div>

          <div className="captcha-wrapper">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={handleCaptcha}
              size={isMobile ? "compact" : "normal"}
            />
          </div>

          <button
            type="submit"
            className="email-submit"
            disabled={!captchaToken}
          >
            Update Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeEmailPopup;