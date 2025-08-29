"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UserRole = "admin" | "manager" | "cashier" | "student"

interface User {
  id: number
  name: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session on mount
    const storedUser = localStorage.getItem("campus-meal-card-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("campus-meal-card-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("campus-meal-card-user", JSON.stringify(userData))

    if (userData.role !== "student") {
      // For non-students, ensure they're in the created users list for future logins
      const existingUsers = JSON.parse(localStorage.getItem("campus-meal-card-created-users") || "[]")
      const userExists = existingUsers.some((u: any) => u.email === userData.email)

      if (!userExists) {
        const updatedUsers = [
          ...existingUsers,
          {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            status: "active",
            createdAt: new Date().toISOString().split("T")[0],
          },
        ]
        localStorage.setItem("campus-meal-card-created-users", JSON.stringify(updatedUsers))
      }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("campus-meal-card-user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
