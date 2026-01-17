import "./Css/Form.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import ErrorMessage from "./ErrorMessage.jsx";
import SuccessMessage from "./SuccessMessage.jsx";

const LoginForm = ({ onClose, onSwitch }) => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [goodMessage, setGoodMessage] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Google login handler
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsGoogleLoading(true);
    setMessage("");
    setGoodMessage("");

    try {
      const res = await fetch("http://localhost:5000/auth/google/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Google login failed");
      }

      const data = await res.json();
      console.log("Google login success:", data);

      setGoodMessage("Logged in successfully with Google!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error("Google login error:", err);
      setMessage(err.message || "Failed to login with Google");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Manual login handler
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Email and password are required");
      return;
    }

    if (password.length < 8) {
      setMessage("Password should be at least 8 characters long");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setGoodMessage("Logged in successfully!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setMessage(data.message || "Wrong email or password");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server connection error");
    }
  };

  // reset the messages after 3 sec
  useEffect(() => {
    if (!message && !goodMessage) return;

    const timer = setTimeout(() => {
      setMessage("");
      setGoodMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, goodMessage]);

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {goodMessage && <SuccessMessage message={goodMessage} />}
        {message && <ErrorMessage message={message} />}

        {/* Header */}
        <div className="login-header">
          <h1>Welcome back</h1>
          <p>Log in to your dashboard</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <span className="forgot-password">Forgot password?</span>
          </div>

          <button
            type="submit"
            className="primary-btn"
            disabled={isGoogleLoading}
          >
            Sign In
          </button>

          <div className="divider">
            <h3 className="divider-text">OR</h3>
          </div>

          {/* Google login button */}
          <div
            className="google-btn-wrapper"
            style={{ gridColumn: "span 2", width: "100%" }}
          >
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setMessage("Google login failed or was cancelled")}
              useOneTap={false}
              theme="outline"
              size="large"
              width="100%"
              text="signin_with"
            />
          </div>

          <p className="switch-text">
            Don’t have an account?{" "}
            <span className="login-link" onClick={onSwitch}>
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
