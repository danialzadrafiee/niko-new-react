// src/components/layout/CharityLayout.tsx

import React, { useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, HandHeart, Menu, X } from "lucide-react"
import { Toaster } from "react-hot-toast"

const CharityLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: "/charity/fundraises/create", label: "ایجاد صندوق", icon: HandHeart },
    { path: "/charity/fundraises/owned", label: "صدندوق های من", icon: HandHeart },
    { path: "/charity/statistics", label: "آمار صندوق‌های خیریه", icon: HandHeart },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Toaster position="top-right" />

      {/* Sidebar */}
      <div className={`bg-[#5432a1] text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <Link to="/charity" className="text-white flex items-center space-x-2 px-4">
          <LayoutDashboard className="h-8 w-8" />
          <span className="text-2xl font-extrabold">پنل مدیریت</span>
        </Link>

        <nav className="mt-10">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${location.pathname === item.path ? "bg-white bg-opacity-10" : "hover:bg-white hover:bg-opacity-10"}`}>
              <item.icon className="h-6 w-6" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden">
              {sidebarOpen ? <X /> : <Menu />}
            </button>
            <div className="flex items-center">
              <Button variant="outline" asChild>
                <Link to="/">بازگشت به سایت اصلی</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default CharityLayout
