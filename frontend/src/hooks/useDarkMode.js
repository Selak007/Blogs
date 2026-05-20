import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";
const DARK_MODE = "dark";
const LIGHT_MODE = "light";

const getStoredTheme = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    return null;
  }
};

const getPreferredTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme) {
    return storedTheme;
  }

  if (typeof window === "undefined") {
    return LIGHT_MODE;
  }

  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? DARK_MODE : LIGHT_MODE;
};

const applyThemeClass = (isDark) => {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  if (isDark) {
    root.classList.add(DARK_MODE);
  } else {
    root.classList.remove(DARK_MODE);
  }
};

const persistTheme = (isDark) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, isDark ? DARK_MODE : LIGHT_MODE);
  } catch (error) {
    // Silently ignore persistence issues
  }
};

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => getPreferredTheme() === DARK_MODE);

  useEffect(() => {
    applyThemeClass(isDarkMode);
    persistTheme(isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  return [isDarkMode, toggleDarkMode];
};

export default useDarkMode;
