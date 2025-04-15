"use client"

import Image from "next/image"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"

export function MobileHeader() {
  // Mock notifications data
  const notifications = [
    { id: 1, message: "New appointment scheduled", time: "10 mins ago" },
    { id: 2, message: "Dr. Smith updated patient records", time: "30 mins ago" },
    { id: 3, message: "Prescription ready for review", time: "1 hour ago" },
    { id: 4, message: "Lab results available for Patient #1234", time: "2 hours ago" },
    { id: 5, message: "Staff meeting at 3:00 PM", time: "3 hours ago" },
  ]

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 md:hidden">
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="DocMitr Logo" width={28} height={28} />
        <h1 className="text-lg font-semibold text-blue-600">DocMitr</h1>
      </div>
      <div className="flex items-center gap-1">
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
  )
}
