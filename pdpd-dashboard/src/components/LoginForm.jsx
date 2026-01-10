import "./Css/Form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const LoginForm = ({ onClose, onSwitch }) => {

  const [message, setMessage] = useState(''); // for later 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e)=>{
    e.preventDefault(); // prevent page reload

    try{
      if (!email || !password) {
        setMessage("Email and password are required");
        return;
      }

      console.log("Submitting:", { email, password }); // for debugging only 

      const data = {email, password};
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
      });
  
      if(res.ok){
        setMessage("Logged in successfully");
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        }
        else{
          setMessage("wrong email or password");
        }

      }catch(err){
      console.error(err);
      setMessage("Server connection error");
  }
}

    return (
      <div className="login-wrapper">
        <div className="login-card">

          <button className="close-btn" onClick={onClose}>
            &times;
          </button>

          {/* Header */}
          <div className="login-header">
            <div className="header-row">
              <h1>Welcome back</h1>
            </div>
            <p>Sign in to your dashboard</p>
          </div>
  
          {/* Form */}
          <form className="login-form" onSubmit={handleLogin}>
  
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>
  
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
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
              <span onClick={onSwitch}> Sign up</span>
            </p>
  
          </form>
        </div>
      </div>
    );
};

export default LoginForm;
