"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import type { UserRole } from "@/contexts/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      // If not logged in and not on login page, redirect to login
      if (!user && pathname !== "/login") {
        router.push("/login")
      }

      // If logged in but not authorized for this route
      if (user && allowedRoles && !allowedRoles.includes(user.role)) {
        router.push("/unauthorized")
      }

      // If logged in and on login page, redirect to dashboard
      if (user && pathname === "/login") {
        router.push("/")
      }
    }
  }, [user, isLoading, router, pathname, allowedRoles])

  // Show nothing while checking authentication
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  // If on login page or authenticated and authorized, show children
  if (pathname === "/login" || (user && (!allowedRoles || allowedRoles.includes(user.role)))) {
    return <>{children}</>
  }

  // Otherwise show nothing while redirecting
  return null
}
