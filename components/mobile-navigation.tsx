"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Home, Plus, User, Users } from "lucide-react"

export function MobileNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-background border-t md:hidden">
      <div className="flex items-center justify-around h-16">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          href="/appointments"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/appointments") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Calendar className="h-5 w-5" />
          <span className="text-xs mt-1">Appointments</span>
        </Link>

        <div className="flex items-center justify-center w-full h-full">
          <button className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg">
            <Plus className="h-6 w-6" />
          </button>
        </div>

        <Link
          href="/patients"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/patients") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Users className="h-5 w-5" />
          <span className="text-xs mt-1">Patients</span>
        </Link>

        <Link
          href="/profile"
          className={`flex flex-col items-center justify-center w-full h-full ${
            isActive("/profile") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  )
}
