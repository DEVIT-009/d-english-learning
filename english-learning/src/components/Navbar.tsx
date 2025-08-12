import { Link, NavLink } from "react-router-dom";
import { Menu, Moon, Sun, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

type NavbarProps = {
  onToggleSidebar: () => void;
};

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const { isDark, setIsDark } = useDarkMode();
  const [openUser, setOpenUser] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-3 sm:px-4">
        <button
          aria-label="Toggle sidebar"
          className="inline-flex items-center justify-center rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 sm:hidden"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-2 w-2 rounded-sm bg-blue-600" />
          <span>MyApp</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 text-sm sm:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-blue-600 ${
                isActive ? "text-blue-600" : "text-zinc-600 dark:text-zinc-300"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `hover:text-blue-600 ${
                isActive ? "text-blue-600" : "text-zinc-600 dark:text-zinc-300"
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `hover:text-blue-600 ${
                isActive ? "text-blue-600" : "text-zinc-600 dark:text-zinc-300"
              }`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `hover:text-blue-600 ${
                isActive ? "text-blue-600" : "text-zinc-600 dark:text-zinc-300"
              }`
            }
          >
            Settings
          </NavLink>
        </nav>

        <div className="ml-2 flex items-center gap-2">
          <button
            aria-label="Toggle dark mode"
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <div className="relative">
            <button
              className="flex items-center gap-2 rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => setOpenUser((v) => !v)}
            >
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
              <ChevronDown className="h-4 w-4" />
            </button>
            {openUser && (
              <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  Settings
                </Link>
                <button className="block w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
