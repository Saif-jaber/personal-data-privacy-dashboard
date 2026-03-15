import "./Css/SetupLoader.css";

const SetupLoader = () => {
  const text = "Setting up".split("");

  return (
    <div className="setup-loader-wrapper">
      <div className="setup-loader-circle"></div>

      <div className="setup-letter-wrapper">
        {text.map((letter, index) => (
          <span
            key={index}
            className="setup-loader-letter"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SetupLoader;