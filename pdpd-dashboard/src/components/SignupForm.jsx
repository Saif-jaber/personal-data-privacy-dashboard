import "./Css/Form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ onClose, onSwitch }) => {

  const navigate = useNavigate(); 
  const [message, setMessage] = useState('');

  //inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e)=>{
    e.preventDefault(); // prevent page reload

    try {
      if (!email || !password) {
        setMessage("Email and password are required");
        return;
      }
      
      if (password !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }

      console.log("Submitting:", { email, password }); // for debugging only 

      const data = {email, password};
      const res = await fetch("http://localhost:5000/signup",{ //fetch request
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
      });

      if(res.ok){
        setMessage("Account created successfully");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
      else{
        setMessage("something wrong has happened during creation");
      }

    } catch (err) {
      console.error(err);
      setMessage("Server connection error");
    }
  }

    return (
      <div className="signup-wrapper">
        <div className="signup-card">

          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
  
          {/* Header */}
          <div className="signup-header">
            <div className="header-row">
              <h1>Create your account</h1>
            </div>
            <p>Secure access to your dashboard</p>
          </div>
  
          {/* Form */}
          <form className="signup-form" onSubmit={handleSignup}>
  
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>
  
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Create a password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>
  
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)}/>
            </div>
  
            <button type="submit" className="primary-btn">
              Create Account
            </button>
  
            <div className="divider">
              <span></span>
              OR
              <span></span>
            </div>
  
            <button type="button" className="secondary-btn">
              Sign up with Google
            </button>
  
            <p className="switch-text">
              Already have an account?
               <span onClick={onSwitch}> Login in</span>
            </p>
  
          </form>
        </div>
      </div>
    );
};

export default Signup;
