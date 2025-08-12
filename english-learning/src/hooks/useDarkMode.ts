import { useEffect, useState } from "react";

export function useDarkMode() {
  const storageKey = "theme";
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(storageKey);
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem(storageKey, "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem(storageKey, "light");
    }
  }, [isDark]);

  return { isDark, setIsDark };
}
