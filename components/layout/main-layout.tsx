"use client"

import type React from "react"
import { MobileHeader } from "@/components/mobile-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Sidebar } from "@/components/layout/sidebar"

interface MainLayoutProps {
  children: React.ReactNode
  title: string
}

export function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block md:w-64 md:flex-shrink-0">
        <div className="fixed inset-y-0 z-50 w-64 border-r">
          <Sidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col w-full md:ml-64">
        {/* Mobile Header - visible only on mobile */}
        <MobileHeader title={title} />

        {/* Desktop Header - visible only on desktop */}
        <header className="hidden md:flex h-16 items-center border-b bg-background px-6">
          <h1 className="text-2xl font-bold">{title}</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 px-4 py-4 pb-20 md:p-6 md:pb-6">{children}</main>

        {/* Mobile Navigation - visible only on mobile */}
        <MobileNavigation />
      </div>
    </div>
  )
}
