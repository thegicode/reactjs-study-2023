import { createContext } from "react";

interface ThemeContextType {
    isDark: boolean;
    setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
