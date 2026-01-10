import "./Css/Form.css";

const Signup = ({ onClose, onSwitch }) => {

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
          <form className="signup-form">
  
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" />
            </div>
  
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Create a password" />
            </div>
  
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm password" />
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
