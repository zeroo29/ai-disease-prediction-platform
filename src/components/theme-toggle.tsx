"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return false;
  }

  const saved = localStorage.getItem("theme");

  if (saved) {
    return saved === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle() {
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  function toggle() {
    setDark((current) => !current);
  }

  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="rounded-lg border border-[var(--line)] p-2"
    >
      {dark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}