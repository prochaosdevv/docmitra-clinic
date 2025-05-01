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
  BetweenHorizontalEnd,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/components/ui/use-toast";
import { useUi } from "@/contexts/ui-context";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function Sidebar() {
  const { openSideBar } = useUi();
  const collapsed = !openSideBar;
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { toast } = useToast();

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
  const isStaff = user?.role === "staff";
  const dashboardPath = isDoctor
    ? "/doctor-dashboard"
    : isStaff
    ? "/staff-dashboard"
    : "/";

  const navItems = [
    { path: dashboardPath, label: "Dashboard", icon: LayoutDashboard },
    { path: "/appointments", label: "Appointments", icon: Calendar },
    { path: "/patients", label: "Patients", icon: Users },
    { path: "/medical-records", label: "Medical Records", icon: ClipboardList },
    ...(isDoctor || isStaff
      ? []
      : [
          { path: "/doctors", label: "Doctors", icon: Stethoscope },
          { path: "/staff", label: "Staff", icon: Users },
          { path: "/billing", label: "Billing", icon: Wallet },
          { path: "/inventory", label: "Inventory", icon: Package },
          { path: "/settings", label: "Settings", icon: Settings },
        ]),
  ];

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div
        className={`flex h-16 items-center ${
          collapsed ? "justify-center" : "justify-start"
        } border-b px-4`}
      >
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="DocMitr Logo" width={32} height={32} />
          {!collapsed && (
            <span className="text-xl font-bold text-blue-600">DocMitr</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map(({ path, label, icon: Icon }) =>
            collapsed ? (
              <Tooltip key={path}>
                <TooltipTrigger asChild>
                  <Link
                    href={path}
                    className={cn(
                      "flex items-center justify-center rounded-md py-2 text-sm font-medium transition-colors",
                      isActive(path)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={6}
                  className="bg-black text-white"
                >
                  <p>{label}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={path}
                href={path}
                className={cn(
                  "flex items-center gap-3 rounded-md py-2 px-3 text-sm font-medium transition-colors",
                  isActive(path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            )
          )}
        </nav>
      </div>

      {/* Footer */}
      {/* Footer */}
      <div className="border-t p-4">
        {collapsed ? (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer mx-auto">
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
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="w-full justify-start"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        ) : (
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
              <p className="text-sm font-medium leading-none truncate">
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
        )}
      </div>
    </div>
  );
}
