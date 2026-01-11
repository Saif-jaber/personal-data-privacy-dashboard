import "./Css/Form.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import ErrorMessage from "./ErrorMessage.jsx";
import SuccessMessage from "./SuccessMessage.jsx";

const Signup = ({ onClose, onSwitch }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [goodMessage, setGoodMessage] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ── Google Login Hook ────────────────────────────────────────────────
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      setIsGoogleLoading(true);

      try {
        const res = await fetch("http://localhost:5000/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code: response.code }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || "Google authentication failed");
        }

        const data = await res.json();

        console.log("Google login success:", data);

        setGoodMessage("Signed up successfully with Google!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1600);
      } catch (err) {
        console.error("Google auth error:", err);
        setMessage(err.message || "Failed to sign in with Google. Please try again.");
      } finally {
        setIsGoogleLoading(false);
      }
    },

    onError: (errorResponse) => {
      console.log("Google Login Failed:", errorResponse);
      setMessage("Google sign up was cancelled or failed");
      setIsGoogleLoading(false);
    },

    flow: "auth-code",

    // ──────────────── Important fix ───────────────────────
    prompt: "select_account",           // ← Forces account chooser every time
    // prompt: "select_account consent", // More aggressive version (shows consent too)

    access_type: "offline",             // Allows refresh token (good practice)
    scope: "openid email profile",      // Explicit scopes
  });

  const handleManualSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Email and password are required");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setMessage("Password should be at least 8 characters long");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setGoodMessage("Account created successfully!");
        setTimeout(() => navigate("/dashboard"), 1800);
      } else {
        setMessage(data.message || "Something went wrong during account creation");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server connection error. Please try again later.");
    }
  };

  useEffect(() => {
    if (!message && !goodMessage) return;

    const timer = setTimeout(() => {
      setMessage("");
      setGoodMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [message, goodMessage]);

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        {goodMessage && <SuccessMessage message={goodMessage} />}
        {message && <ErrorMessage message={message} />}

        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <div className="signup-header">
          <h1>Create your account</h1>
          <p>Secure access to your dashboard</p>
        </div>

        <form className="signup-form" onSubmit={handleManualSignup}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="primary-btn" disabled={isGoogleLoading}>
            Create Account
          </button>

          <div className="divider">
            <span></span>
            <span className="divider-text">OR</span>
            <span></span>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className={`primary-btn google-button ${isGoogleLoading ? "loading" : ""}`}
            onClick={() => googleLogin()}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <span className="loading-text">Connecting...</span>
            ) : (
              <>
                <span className="google-icon">G</span>
                Sign up with Google
              </>
            )}
          </button>

          <p className="switch-text">
            Already have an account?{" "}
            <span className="login-link" onClick={onSwitch}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;