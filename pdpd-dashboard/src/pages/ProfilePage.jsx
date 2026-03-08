import { useEffect, useState } from "react";
import ProfileActivityStats from "../components/ProfileActivityStats";
import "./Css/ProfilePage.css";

const ProfilePage = () => {
  const [userCode, setUserCode] = useState("");
  const [email, setEmail] = useState("");
  const [creationDate, setCreationDate] = useState("");

  const [stats] = useState({
    totalLogins: 18,
    totalSignOuts: 7,
    totalActivity: 31,
  });

  const handleInfoFetch = async (userEmail) => {
    try {
      console.log("sending email:", userEmail);

      const res = await fetch("http://localhost:5000/getInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await res.json();
      console.log("response data:", data);

      if (!res.ok) {
        throw new Error(data.message || "user info fetch failed");
      }

      setUserCode(data.userCode || "");
      setEmail(data.email || "");
      setCreationDate(data.creationDate || "");
    } catch (err) {
      console.log("info fetch error:", err);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    console.log("saved email:", savedEmail);

    if (savedEmail) {
      handleInfoFetch(savedEmail);
    } else {
      console.log("No email found in localStorage");
    }
  }, []);

 const countAge = (date) => {
  if (!date) return "";

  const created = new Date(date);
  const now = new Date();

  let years = now.getFullYear() - created.getFullYear();
  let months = now.getMonth() - created.getMonth();
  let days = now.getDate() - created.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""}`;
  }

  if (months > 0) {
    return `${months} month${months !== 1 ? "s" : ""}, ${days} day${days !== 1 ? "s" : ""}`;
  }

  return `${days} day${days !== 1 ? "s" : ""}`;
};

  return (
    <div className="account-page">
      <div className="profile-main-grid">
        <div className="profile-left-panel">
          <div className="profile-header">
            <div className="avatar-wrapper">
              <div className="avatar-circle">
                <span>{email ? email[0].toUpperCase() : "G"}</span>
              </div>
            </div>

            <div className="profile-header-info">
              <h1>Profile</h1>
              <div className="profile-actions">
                <button className="btn-blue">Upload New Picture</button>
                <button className="btn-blue-outline">Remove</button>
              </div>
            </div>
          </div>

          <div className="profile-form">
            <div className="form-field">
              <label>User Code</label>
              <div className="input-box">
                <span>{userCode}</span>
              </div>
            </div>

            <div className="form-field">
              <label>Email</label>
              <div className="input-box">
                <span>{email}</span>
              </div>
            </div>

            <div className="form-field">
              <label>Account Age</label>
              <div className="input-box">
                <span>{countAge(creationDate)}</span>
              </div>
            </div>

            <button className="pushable" type="button">
              <span className="shadow"></span>
              <span className="edge"></span>
              <span className="front">Update</span>
            </button>
          </div>
        </div>

        <div className="profile-right-panel">
          <ProfileActivityStats
            totalLogins={stats.totalLogins}
            totalSignOuts={stats.totalSignOuts}
            totalActivity={stats.totalActivity}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;