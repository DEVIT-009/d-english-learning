import { NavLink } from "react-router-dom"
import { X } from "lucide-react"
import { useSidebarStore } from "@/stores/ui"
import { Button } from "@/components/ui/button"

const links = [
  { to: "/", label: "Home" },
  { to: "/lessons", label: "Lessons" },
  { to: "/practice", label: "Practice" },
  { to: "/speak", label: "Speak" },
  { to: "/vocab", label: "Vocab" },
  { to: "/quiz", label: "Quiz" },
  { to: "/progress", label: "Progress" },
]

export function Sidebar() {
  const isOpen = useSidebarStore((s) => s.isOpen)
  const close = useSidebarStore((s) => s.close)

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 md:hidden ${isOpen ? "block" : "hidden"}`}
        onClick={close}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r bg-background p-4 transition-transform md:static md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between mb-4 md:hidden">
          <span className="font-semibold">Menu</span>
          <Button variant="ghost" size="icon" onClick={close} aria-label="Close menu">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="grid gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={close}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm ${isActive ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}