import { useState } from "react";
import SetupLoader from "./SetupLoader";
import "./Css/SecurityQuestionPopup.css";

const SecurityQuestionPopup = ({ onSubmit, isSubmitting = false }) => {
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");

  const securityIcon = "src/assets/lock-keyhole-circle-svgrepo-com.svg";

  const securityQuestions = [
    "What was the name of your first pet?",
    "What is your mother's maiden name?",
    "What was the name of your first school?",
    "In what city were you born?",
    "What is your favorite childhood nickname?",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    if (!securityQuestion.trim() || !securityAnswer.trim()) return;

    const questionID = securityQuestions.indexOf(securityQuestion) + 1;

    if (questionID === 0) {
      console.log("Question not found");
      return;
    }

    if (onSubmit) {
      onSubmit({
        securityQuestion,
        securityAnswer,
        questionID,
      });
    }
  };

  return (
    <div className="modal-overlay">
      {isSubmitting ? (
        <div className="setup-loader-fullscreen">
          <SetupLoader />
        </div>
      ) : (
        <div className="security-popup">
          <form className="security-form" onSubmit={handleSubmit}>
            <div className="security-header">
              <div className="security-icon">
                <img
                  src={securityIcon}
                  alt="Security icon"
                  className="custom-icon"
                />
              </div>
  
              <span className="mandatory-badge">Mandatory</span>
            </div>
  
            <div className="security-note">
              <label className="security-title">Security Question</label>
              <span className="security-subtitle">
                Choose a security question and provide your answer below.
              </span>
            </div>
  
            <div className="input-group">
              <label className="input-label">Question</label>
  
              <select
                className="security-input"
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
                required
              >
                <option value="">Select a security question</option>
  
                {securityQuestions.map((question, index) => (
                  <option key={index} value={question}>
                    {question}
                  </option>
                ))}
              </select>
            </div>
  
            <div className="input-group">
              <label className="input-label">Answer</label>
  
              <input
                type="text"
                className="security-input"
                placeholder="Enter your answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
              />
            </div>
  
            <button type="submit" className="security-submit">
              Save Security Question
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SecurityQuestionPopup;