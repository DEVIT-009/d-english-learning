import { Outlet } from "react-router-dom"
import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { Footer } from "@/components/layout/footer"

export function AppShell() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container grid flex-1 grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="py-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}