import { createTheme } from "@mui/material/styles";

export interface ThemeContextType {
  mode: "light" | "dark";
  toggleMode: () => void;
  changeAccent: (accent: string) => void;
  muiTheme: ReturnType<typeof createTheme>;
  accentMap: Record<string, { name: string; value: string }>;
}