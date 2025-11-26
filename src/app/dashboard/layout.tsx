"use client"

import type React from "react"
import { SignOutButton } from "@clerk/nextjs"
import Link from "next/link"
import { redirect } from "next/navigation"
import { LayoutDashboard, Users, LogOut, ChevronRight, Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default  function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const isAgenciesActive = pathname === "/dashboard/agencies"
  const isContactsActive = pathname === "/dashboard/contacts"

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-accent"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 w-64 h-screen border-r border-border bg-card flex flex-col transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">A</span>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg text-foreground">AgencyHub</h2>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link
            href="/dashboard/agencies"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
              isAgenciesActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Agencies</span>
            <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
          </Link>

          <Link
            href="/dashboard/contacts"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
              isContactsActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Contacts</span>
            <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
          </Link>
        </nav>

        {/* User Profile & Sign Out */}
        <div className="p-4 border-t border-border">
          {/* <div className="mb-4 p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground mb-1">Signed in as</p>
            <p className="text-sm font-semibold text-foreground truncate">
              {}
            </p>
          </div> */}
          <SignOutButton redirectUrl="/">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2 bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full lg:ml-64">
        {/* Header */}
        <header className="border-b border-border bg-background/50 backdrop-blur-sm px-6 lg:px-8 py-4 fixed w-full lg:w-[calc(100%-256px)] top-0 z-20">
          <div className="flex items-center justify-between">
            <div className="ml-12 lg:ml-0">
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-2">Manage your agencies and contacts</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 lg:p-8 mt-24 lg:mt-20 w-full">
          <div className="max-w-6xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  )
}