import type { PropsWithChildren } from "react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export function Layout({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <Navbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-[16rem_1fr]">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="min-h-[calc(100vh-3.5rem)] p-4 sm:p-6">
          {children}
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
