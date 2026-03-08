import "./Css/SecurityTipsPage.css";

const SecurityTipsPage = () => {
  return (
    <div className="security-page">
      <div className="security-header">
        <h1>Security Tips & Information</h1>
        <p>
          Learn how permissions, third-party apps, and online tracking work,
          and follow simple steps to stay safer online.
        </p>
      </div>

      <div className="security-grid">
        <div className="security-card">
          <h2>Basic Explanation of Permissions</h2>
          <p>
            Permissions are requests made by apps or websites to access certain
            parts of your device or account.
          </p>

          <div className="security-list">
            <div className="security-list-item">
              <strong>Camera & Microphone:</strong>
              <span>
                Used for video calls, voice recording, scanning QR codes, or
                taking pictures.
              </span>
            </div>

            <div className="security-list-item">
              <strong>Location:</strong>
              <span>
                Used for maps, delivery services, nearby search results, and
                suspicious login detection.
              </span>
            </div>

            <div className="security-list-item">
              <strong>Files & Photos:</strong>
              <span>
                Used when you upload profile pictures, documents, or other
                attachments.
              </span>
            </div>

            <div className="security-list-item">
              <strong>Contacts:</strong>
              <span>
                Used to help invite friends, connect accounts, or autofill
                shared details.
              </span>
            </div>
          </div>

          <div className="security-note warning-note">
            A permission is not always dangerous, but it should make sense for
            what the app actually does.
          </div>
        </div>

        <div className="security-card">
          <h2>How Third-Party Apps Work</h2>
          <p>
            When you use services like “Sign in with Google,” you are allowing
            another app or website to access certain information from your
            account.
          </p>

          <div className="steps-grid">
            <div className="step-box">
              <span className="step-number">1</span>
              <p>You choose to connect your account.</p>
            </div>

            <div className="step-box">
              <span className="step-number">2</span>
              <p>The app asks for specific permissions.</p>
            </div>

            <div className="step-box">
              <span className="step-number">3</span>
              <p>You approve or deny the requested access.</p>
            </div>

            <div className="step-box">
              <span className="step-number">4</span>
              <p>The app only receives the access you allowed.</p>
            </div>
          </div>

          <ul className="security-bullets">
            <li>Some apps only request your basic profile and email.</li>
            <li>Other apps may request access to files, contacts, or calendar data.</li>
            <li>You should review connected apps regularly.</li>
            <li>You can usually remove app access later from your account settings.</li>
          </ul>
        </div>

        <div className="security-card">
          <h2>Why Tracking Happens</h2>
          <p>
            Tracking happens because websites and apps want to understand user
            behavior, improve services, prevent fraud, remember settings, and
            personalize content or ads.
          </p>

          <div className="two-column-boxes">
            <div className="info-box">
              <h3>Helpful Uses</h3>
              <ul className="security-bullets">
                <li>Keeping you signed in</li>
                <li>Remembering your preferences</li>
                <li>Detecting unusual activity</li>
                <li>Improving app performance</li>
              </ul>
            </div>

            <div className="info-box">
              <h3>Things to Be Careful About</h3>
              <ul className="security-bullets">
                <li>Ads may be personalized using your activity</li>
                <li>Some apps may collect more data than needed</li>
                <li>Tracking can happen across multiple websites</li>
                <li>Data sharing rules differ from one service to another</li>
              </ul>
            </div>
          </div>

          <div className="security-note">
            Tracking does not always mean spying, but it does mean information
            is being collected and used to understand activity or personalize
            experiences.
          </div>
        </div>

        <div className="security-card">
          <h2>Simple Steps to Stay Safe Online</h2>

          <div className="two-column-boxes">
            <div className="info-box">
              <h3>Account Safety</h3>
              <ul className="security-bullets">
                <li>Use strong and unique passwords</li>
                <li>Turn on two-factor authentication</li>
                <li>Review account activity regularly</li>
                <li>Remove access for unused apps</li>
              </ul>
            </div>

            <div className="info-box">
              <h3>Browsing Safety</h3>
              <ul className="security-bullets">
                <li>Be careful when opening links in emails or messages</li>
                <li>Check website names before logging in</li>
                <li>Keep your apps and browser updated</li>
                <li>Avoid sensitive logins on unsafe public networks</li>
              </ul>
            </div>
          </div>

          <div className="security-note success-note">
            Good security usually comes from small habits repeated regularly.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTipsPage;