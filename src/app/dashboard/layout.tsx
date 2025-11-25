// "use client"

import type React from "react"

import { SignOutButton } from "@clerk/nextjs"
import { auth, currentUser } from "@clerk/nextjs/server"
import Link from "next/link"
import { redirect } from "next/navigation"
import { LayoutDashboard, Users, LogOut, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/")
  }

  const user = await currentUser()

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="fixed left-0 top-0 w-64 h-screen border-r border-border bg-card flex flex-col">
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
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary font-medium transition-all hover:bg-primary/20"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Agencies</span>
            <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
          </Link>

          <Link
            href="/dashboard/contacts"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground font-medium transition-all hover:bg-accent hover:text-foreground"
          >
            <Users className="w-5 h-5" />
            <span>Contacts</span>
            <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
          </Link>
        </nav>

        {/* User Profile & Sign Out */}
        <div className="p-4 border-t border-border">
          <div className="mb-4 p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground mb-1">Signed in as</p>
            <p className="text-sm font-semibold text-foreground truncate">
              {user?.emailAddresses[0]?.emailAddress || "User"}
            </p>
          </div>
          <SignOutButton redirectUrl="/">
            <Button variant="outline" size="sm" className="w-full justify-start gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </aside>

      <main className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="border-b w-full border-border bg-background/50 backdrop-blur-sm px-8 py-4 fixed">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-2">Manage your agencies and contacts</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8 mt-20">
          <div className="max-w-6xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  )
}
