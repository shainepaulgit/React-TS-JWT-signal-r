import { createContext, useContext } from "react";
import type { ThemeContextType } from "./themeContextType";

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};