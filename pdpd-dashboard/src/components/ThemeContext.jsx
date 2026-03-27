import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "system"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);

    const root = document.documentElement;

    const applyTheme = (mode) => {
      root.classList.remove("light", "dark");

      if (mode === "light") root.classList.add("light");
      else if (mode === "dark") root.classList.add("dark");
      else {
        // system mode
        const isDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        root.classList.add(isDark ? "dark" : "light");
      }
    };

    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);