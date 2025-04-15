"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "admin" | "doctor"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  doctorId?: string // Only for doctors
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: "user-1",
    name: "Admin User",
    email: "admin@docmitr.com",
    password: "password123", // In a real app, never store plain text passwords
    role: "admin" as UserRole,
    avatar: "/compassionate-doctor-consultation.png",
  },
  {
    id: "user-2",
    name: "Dr. Michael Chen",
    email: "doctor@docmitr.com",
    password: "password123",
    role: "doctor" as UserRole,
    doctorId: "D-1001",
    avatar: "/abstract-geometric-shapes.png?height=36&width=36&query=Dr. Michael Chen",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("docmitr-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Failed to parse saved user", error)
        localStorage.removeItem("docmitr-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      // Remove password before storing user
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("docmitr-user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("docmitr-user")
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
