"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { authService, type User } from "@/lib/api/auth"
import { useToast } from "@/components/ui/use-toast"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Check for saved token and fetch user on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("docmitr-auth-token")
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const response = await authService.getCurrentUser()
        setUser(response.data)
      } catch (error) {
        // Token might be invalid or expired
        localStorage.removeItem("docmitr-auth-token")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      const response = await authService.login({ email, password })
      const { user, token } = response.data

      // Save token and user
      localStorage.setItem("docmitr-auth-token", token)
      setUser(user)

      return true
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      // Ignore errors on logout
    } finally {
      localStorage.removeItem("docmitr-auth-token")
      setUser(null)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
