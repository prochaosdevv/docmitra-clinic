"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Calendar,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Users,
  Wallet,
  Stethoscope,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/components/ui/use-toast";
import { useUi } from "@/contexts/ui-context";

export function TabViewSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const { setOpenSideBar } = useUi();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    router.push("/login");
  };

  const isDoctor = user?.role === "doctor";
  const dashboardPath = isDoctor ? "/doctor-dashboard" : "/";

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex h-16 justify-between items-center border-b px-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="DocMitr Logo" width={40} height={40} />
          <span className="text-xl font-bold text-blue-600">DocMitr</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden w-8 h-8 bg-slate-100"
          onClick={() => {
            setOpenSideBar(false);
          }}
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </Button>
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
            <AvatarImage
              src={user?.avatar || "/compassionate-doctor-consultation.png"}
              alt={user?.name || "User"}
            />
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
            <p className="text-sm font-medium leading-none">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-muted-foreground capitalize truncate">
              {user?.role || "User"}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
