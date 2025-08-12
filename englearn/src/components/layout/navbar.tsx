import { Link, NavLink } from "react-router-dom"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSidebarStore } from "@/stores/ui"

const links = [
  { to: "/", label: "Home" },
  { to: "/lessons", label: "Lessons" },
  { to: "/practice", label: "Practice" },
  { to: "/speak", label: "Speak" },
  { to: "/vocab", label: "Vocab" },
  { to: "/quiz", label: "Quiz" },
  { to: "/progress", label: "Progress" },
]

export function Navbar() {
  const open = useSidebarStore((s) => s.open)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={open} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="font-semibold text-lg">
            EngLearn
          </Link>
        </div>
        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `text-sm ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}