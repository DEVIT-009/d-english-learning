import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* overlay on mobile */}
      <div
        className={`fixed inset-0 z-30 bg-black/30 transition-opacity sm:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-zinc-200 bg-white p-4 transition-transform duration-200 dark:border-zinc-800 dark:bg-zinc-900 sm:static sm:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between sm:hidden">
          <span className="font-semibold">Navigation</span>
          <button
            aria-label="Close sidebar"
            className="rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-md px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                isActive ? "bg-zinc-100 dark:bg-zinc-800 font-medium" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `rounded-md px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                isActive ? "bg-zinc-100 dark:bg-zinc-800 font-medium" : ""
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `rounded-md px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                isActive ? "bg-zinc-100 dark:bg-zinc-800 font-medium" : ""
              }`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `rounded-md px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                isActive ? "bg-zinc-100 dark:bg-zinc-800 font-medium" : ""
              }`
            }
          >
            Settings
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
