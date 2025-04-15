"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Activity,
  Calendar,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Users,
  Wallet,
  Stethoscope,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const { toast } = useToast()

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  const isDoctor = user?.role === "doctor"
  const dashboardPath = isDoctor ? "/doctor-dashboard" : "/"

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">MediClinic</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <Link
            href={dashboardPath}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              isActive(dashboardPath)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          <Link
            href="/appointments"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              isActive("/appointments")
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Calendar className="h-4 w-4" />
            Appointments
          </Link>

          <Link
            href="/patients"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              isActive("/patients")
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Users className="h-4 w-4" />
            Patients
          </Link>

          {!isDoctor && (
            <>
              <Link
                href="/doctors"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                  isActive("/doctors")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Stethoscope className="h-4 w-4" />
                Doctors
              </Link>

              <Link
                href="/staff"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                  isActive("/staff")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Users className="h-4 w-4" />
                Staff
              </Link>
            </>
          )}

          <Link
            href="/medical-records"
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              isActive("/medical-records")
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <ClipboardList className="h-4 w-4" />
            Medical Records
          </Link>

          {!isDoctor && (
            <>
              <Link
                href="/billing"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                  isActive("/billing")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Wallet className="h-4 w-4" />
                Billing
              </Link>

              <Link
                href="/inventory"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                  isActive("/inventory")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Package className="h-4 w-4" />
                Inventory
              </Link>

              <Link
                href="/settings"
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                  isActive("/settings")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </>
          )}
        </nav>
      </div>

      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.avatar || "/compassionate-doctor-consultation.png"} alt={user?.name || "User"} />
            <AvatarFallback>
              {user?.name
                ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground capitalize truncate">{user?.role || "User"}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
