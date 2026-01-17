import "./Css/ProfilePage.css";

const ProfilePage = () => {
  return (
    <div className="account-page">
      {/*  Top Profile Section  */}
      <div className="profile-header">
        <div className="avatar-wrapper">
          <div className="avatar-circle">
            <span>D</span>
          </div>
        </div>

        <div className="profile-header-info">
          <h1>De Groentjes</h1>

          <div className="profile-actions">
            <button className="btn-blue">Upload New Picture</button>
            <button className="btn-blue-outline">Remove</button>
          </div>
        </div>
      </div>

      {/*  User Info Fields  */}
      <div className="profile-form">
        <div className="form-field">
          <label>User Code</label>
          <div className="input-box">
            <span>DG12345</span>
          </div>
        </div>

        <div className="form-field">
          <label>Email</label>
          <div className="input-box">
            <span>degroentjes@gmail.com</span>
          </div>
        </div>

        <div className="form-field">
          <label>Account Age</label>
          <div className="input-box">
            <span>2 years</span>
          </div>
        </div>

        {/* Pushable Update Button */}
        <button className="pushable">
          <span className="shadow"></span>
          <span className="edge"></span>
          <span className="front">Update</span>
        </button>
        
      </div>
    </div>
  );
};

export default ProfilePage;
