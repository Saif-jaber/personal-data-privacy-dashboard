import "./Css/Form.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
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

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsGoogleLoading(true);
  
    try {
      const res = await fetch("http://localhost:5000/auth/google/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: credentialResponse.credential, // ID token
        }),
      });
  
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Google authentication failed");
      }
  
      const data = await res.json();
      console.log("Google login success:", data);
  
      setGoodMessage("Signed up successfully with Google!");
      setTimeout(() => navigate("/dashboard"), 1600);
    } catch (err) {
      console.error("Google auth error:", err);
      setMessage(err.message || "Failed to sign in with Google.");
    } finally {
      setIsGoogleLoading(false);
    }
  };
  

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
        setMessage("");
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
    }, 3000);

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
            <span className="divider-text">OR</span>
          </div>      

          <div className="google-btn-wrapper" style={{ gridColumn: "span 2", width: "100%" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setMessage("Google sign up failed")}
              useOneTap={false}
              render={({ onClick, disabled }) => (
                <button
                  type="button"
                  className="google-button"
                  onClick={onClick}
                  disabled={disabled || isGoogleLoading}
                >
                  <span className="google-icon">G</span>
                  Sign up with Google
                </button>
              )}
            />
          </div>
          

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
