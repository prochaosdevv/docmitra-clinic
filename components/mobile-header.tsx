"use client";

import Image from "next/image";
import { AlignLeft, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { useUi } from "@/contexts/ui-context";
import React from "react";
import { useClickOutside } from "@/hooks/use-outsideclick";
import { useIsMobile } from "@/hooks/use-mobile";

export function MobileHeader() {
  const { toggleSideBar, openSideBar } = useUi();
  const sidebarRef = React.useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  // Mock notifications data
  const notifications = [
    { id: 1, message: "New appointment scheduled", time: "10 mins ago" },
    {
      id: 2,
      message: "Dr. Smith updated patient records",
      time: "30 mins ago",
    },
    { id: 3, message: "Prescription ready for review", time: "1 hour ago" },
    {
      id: 4,
      message: "Lab results available for Patient #1234",
      time: "2 hours ago",
    },
    { id: 5, message: "Staff meeting at 3:00 PM", time: "3 hours ago" },
  ];

  useClickOutside(sidebarRef, (e: MouseEvent) => {
    if (!isMobile) return; // Only run this on mobile

    // Check if the click happened on a nav link or inside the sidebar
    if (openSideBar && !sidebarRef.current?.contains(e.target as Node)) {
      toggleSideBar();
    }
  });

  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 md:hidden"
      ref={sidebarRef}
    >
      <div className="flex items-center gap-2">
        <AlignLeft
          className="h-5 w-5 cursor-pointer text-blue-600"
          onClick={toggleSideBar}
        />
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
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-blue-500"
              >
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
                  <span className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </span>
                </DropdownMenuItem>
              ))}
            </div>
            <div className="p-2 border-t text-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-blue-500 w-full"
              >
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
