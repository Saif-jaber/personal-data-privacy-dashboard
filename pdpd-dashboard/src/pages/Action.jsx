import './Css/Action.css';

const privacySections = [
  {
    category: "Security & Account Protection",
    icon: "src/assets/protection-svgrepo-com.svg",
    items: [
      { title: "Security Checkup", desc: "Review recent sign-ins, devices, and security recommendations", link: "https://myaccount.google.com/security-checkup" },
      { title: "2-Step Verification", desc: "Protect your account with an extra layer of security", link: "https://myaccount.google.com/signinoptions/two-step-verification" },
      { title: "Your devices", desc: "See and manage devices signed into your Google Account", link: "https://myaccount.google.com/device-activity" },
      { title: "Third-party apps with account access", desc: "Review and remove app permissions", link: "https://myaccount.google.com/permissions" },
    ]
  },
  {
    category: "Activity Controls & History",
    icon: "src/assets/settings-alt-svgrepo-com.svg",
    items: [
      { title: "Web & App Activity", desc: "Control what gets saved from Chrome, Search, Maps, etc.", link: "https://myaccount.google.com/activitycontrols" },
      { title: "Location History", desc: "Manage your Location History and timeline", link: "https://myaccount.google.com/activitycontrols?cat=location" },
      { title: "My Activity", desc: "Browse, search, and delete your Google activity", link: "https://myactivity.google.com/" },
      { title: "YouTube History", desc: "Manage watch and search history on YouTube", link: "https://myaccount.google.com/activitycontrols/youtube" },
    ]
  },
  {
    category: "Personalization & Ads",
    icon: "src/assets/ad-set-svgrepo-com.svg",
    items: [
      { title: "Ad personalization", desc: "See and control ads based on your activity", link: "https://adssettings.google.com/" },
      { title: "My Ad Center", desc: "Customize your ad experience across Google", link: "https://myadcenter.google.com/" },
    ]
  },
  {
    category: "Data & Account Tools",
    icon: "src/assets/data-source-solid-svgrepo-com.svg",
    items: [
      { title: "Privacy Checkup", desc: "Step-by-step review of your key privacy settings", link: "https://myaccount.google.com/privacycheckup" },
      { title: "Download your data", desc: "Get a copy of your Google data (Takeout)", link: "https://takeout.google.com/" },
      { title: "Google Dashboard", desc: "View summary of data stored by Google services", link: "https://myaccount.google.com/dashboard" },
    ]
  },
];

const Action = () => {
  return (
    <div className="privacy-center-page">
      <header className="page-top-header">
        <h1>Privacy & Security Center</h1>
        <p>Quick access to manage your data, activity, permissions and security settings</p>
      </header>

      {privacySections.map((section, index) => (
        <div key={index} className="section-container">
          <div className="section-header-wrapper">
            <img
              src={section.icon}
              alt=""
              className="section-icon"
              width="24"
              height="24"
              loading="lazy"
            />
            <h2 className="section-header">{section.category}</h2>
          </div>

          <div className="items-container">
            {section.items.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="privacy-row"
              >
                <div className="row-title">{item.title}</div>
                <div className="row-description">{item.desc}</div>
                <div className="row-arrow-container">
                  <img
                    src="src\assets\arrow-up-right-from-square-svgrepo-com.svg" // arrow icon path
                    alt=""
                    className="custom-arrow"
                    width="22"
                    height="22"
                    loading="lazy"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}

      <div className="page-bottom-note">
        All links lead to official Google Account pages • Sign in required to make changes
      </div>
    </div>
  );
};

export default Action;