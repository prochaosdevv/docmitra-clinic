"use client"

import type React from "react"
import { useState } from "react"
import { MobileHeader } from "@/components/mobile-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { PullToRefresh } from "@/components/ui/pull-to-refresh"
import { useToast } from "@/components/ui/use-toast"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Mock notifications data
  const notifications = [
    { id: 1, message: "New appointment scheduled", time: "10 mins ago" },
    { id: 2, message: "Dr. Smith updated patient records", time: "30 mins ago" },
    { id: 3, message: "Prescription ready for review", time: "1 hour ago" },
    { id: 4, message: "Lab results available for Patient #1234", time: "2 hours ago" },
    { id: 5, message: "Staff meeting at 3:00 PM", time: "3 hours ago" },
  ]

  const handleRefresh = async () => {
    setIsRefreshing(true)

    // Simulate a refresh delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would fetch fresh data here
    // For example: await fetchLatestData()

    setIsRefreshing(false)

    // Show a toast notification
    toast({
      title: "Refreshed",
      description: "Content has been updated",
      duration: 2000,
    })
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block md:w-64 md:flex-shrink-0">
        <div className="fixed inset-y-0 z-50 w-64 border-r">
          <Sidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col w-full">
        {/* Mobile Header - visible only on mobile */}
        <MobileHeader />

        {/* Desktop Header - visible only on desktop */}
        <header className="hidden md:flex h-16 items-center justify-between border-b bg-background px-6">
          <h1 className="text-2xl font-bold">Clinic Management</h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between p-2 border-b">
                  <h3 className="font-medium">Notifications</h3>
                  <Button variant="ghost" size="sm" className="text-xs text-blue-500">
                    Mark all as read
                  </Button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="flex flex-col items-start p-3 cursor-pointer hover:bg-muted"
                    >
                      <p className="text-sm">{notification.message}</p>
                      <span className="text-xs text-muted-foreground mt-1">{notification.time}</span>
                    </DropdownMenuItem>
                  ))}
                </div>
                <div className="p-2 border-t text-center">
                  <Button variant="ghost" size="sm" className="text-xs text-blue-500 w-full">
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content with Pull to Refresh */}
        <PullToRefresh onRefresh={handleRefresh}>
          <main className="flex-1 px-4 py-4 pb-20 md:p-6 md:pb-6">{children}</main>
        </PullToRefresh>

        {/* Mobile Navigation - visible only on mobile */}
        <MobileNavigation />
      </div>
    </div>
  )
}
