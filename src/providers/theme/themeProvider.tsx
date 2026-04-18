import { useLayoutEffect, useState, type ReactNode } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeContext } from './theme-context';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "dark"
  );
  const [accent, setAccent] = useState<string>(localStorage.getItem("accent") || "blue");

  const accentMap: Record<string, { name: string; value: string }> = {
    green: { name: "Green", value: "#00b57e" },
    pink: { name: "Pink", value: "#ff4fa3" },
    red: { name: "Red", value: "#ff3b30" },
    blue: { name: "Blue", value: "#0d6efd" },
    violet: { name: "Violet", value: "#8a2be2" },
    orange: { name: "Orange", value: "#ff9500" },
  };

  const accentColor = accentMap[accent]?.value || accentMap.blue.value;

  // Update CSS variables and localStorage whenever mode or accent changes
  useLayoutEffect(() => {
    const rgb = accentColor
      .slice(1)
      .match(/.{2}/g)
      ?.map((x) => parseInt(x, 16))
      .join(",") || "13,110,253"; // fallback RGB for blue

    const root = document.documentElement;
    root.style.setProperty("--accent", accentColor);
    root.style.setProperty("--accent-rgb", rgb);
    root.style.setProperty("--bs-primary", accentColor);
    root.style.setProperty("--bs-primary-rgb", rgb);
    root.style.setProperty("--bs-link-color", accentColor);
    root.style.setProperty("--bs-link-hover-color", `rgba(${rgb}, 0.8)`);
    root.style.setProperty("--bs-focus-ring-color", `rgba(${rgb}, 0.35)`);

    document.body.setAttribute("data-bs-theme", mode);

    localStorage.setItem("theme", mode);
    localStorage.setItem("accent", accent);
  }, [mode, accent, accentColor]);

  const muiTheme = createTheme({
    palette: {
      mode,
      primary: { main: accentColor },
      background: {
        default: mode === "light" ? "#f8f9fa" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },
    transitions: { duration: { short: 200 } },
  });

  const toggleMode = () => setMode((prev) => (prev === "light" ? "dark" : "light"));
  const changeAccent = (color: string) => setAccent(color);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleMode,
        changeAccent,
        muiTheme,
        accentMap,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
