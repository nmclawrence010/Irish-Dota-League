import React from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../store/themeStore";

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white/10 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
    </button>
  );
};
