import "./Css/Form.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const navigate = useNavigate(); // to navigate to other routes

    return (
      <div className="login-wrapper">
        <div className="login-card">
  
          {/* Header */}
          <div className="login-header">
            <div className="header-row">
              <h1>Welcome back</h1>
            </div>
            <p>Sign in to your dashboard</p>
          </div>
  
          {/* Form */}
          <form className="login-form">
  
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" />
            </div>
  
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" />
            </div>
  
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
  
              <span className="forgot-password">Forgot password?</span>
            </div>
  
            <button type="submit" className="primary-btn">
              Sign In
            </button>
  
            <div className="divider">
              <span></span>
              OR
              <span></span>
            </div>
  
            <button type="button" className="secondary-btn">
              Sign in with Google
            </button>
  
            <p className="switch-text">
              Don’t have an account?
              <span onClick= {()=> navigate("/")}> Sign up</span>
            </p>
  
          </form>
        </div>
      </div>
    );
};

export default LoginForm;
