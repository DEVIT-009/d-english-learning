import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement
  if (theme === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
}

export function ThemeToggle() {
  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark")

  function toggle() {
    const next = isDark ? "light" : "dark"
    localStorage.setItem("theme", next)
    applyTheme(next)
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}

export function initThemeFromStorage() {
  const stored = localStorage.getItem("theme") as "light" | "dark" | null
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
  applyTheme(stored ?? (prefersDark ? "dark" : "light"))
}