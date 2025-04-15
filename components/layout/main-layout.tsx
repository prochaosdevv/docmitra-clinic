"use client"

import type React from "react"
import { MobileHeader } from "@/components/mobile-header"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
// Add the import for PullToRefresh
import { PullToRefresh } from "@/components/ui/pull-to-refresh"
import { useToast } from "@/components/ui/use-toast"

// In the MainLayout component, wrap the main content with PullToRefresh
export function MainLayout({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()

  const handleRefresh = async () => {
    // Simulate a refresh delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Show a toast notification
    toast({
      title: "Refreshed",
      description: "Content has been updated",
    })

    // In a real app, you would refetch data here
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <MobileHeader />
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
                  {/* Mock notifications data */}
                  {/* {notifications.map((notification) => (
                    <DropdownMenuItem
                      key={notification.id}
                      className="flex flex-col items-start p-3 cursor-pointer hover:bg-muted"
                    >
                      <p className="text-sm">{notification.message}</p>
                      <span className="text-xs text-muted-foreground mt-1">{notification.time}</span>
                    </DropdownMenuItem>
                  ))} */}
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
        <PullToRefresh onRefresh={handleRefresh}>
          <main className="flex-1 overflow-y-auto pb-16 md:pb-0">{children}</main>
        </PullToRefresh>
        <MobileNavigation />
      </div>
    </div>
  )
}
