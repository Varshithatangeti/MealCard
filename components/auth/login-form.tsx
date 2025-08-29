"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, Eye, EyeOff } from "lucide-react"

type UserRole = "admin" | "manager" | "cashier" | "student"

interface LoginFormProps {
  onLogin: (user: { id: number; name: string; email: string; role: UserRole }) => void
}

// Mock user database for authentication
const mockUsers = [
  {
    id: 1,
    email: "admin@university.edu",
    password: "admin123",
    name: "System Administrator",
    role: "admin" as UserRole,
  },
  {
    id: 2,
    email: "manager@university.edu",
    password: "manager123",
    name: "Food Service Manager",
    role: "manager" as UserRole,
  },
  {
    id: 3,
    email: "cashier@university.edu",
    password: "cashier123",
    name: "Cafeteria Cashier",
    role: "cashier" as UserRole,
  },
  {
    id: 4,
    email: "student@university.edu",
    password: "student123",
    name: "John Doe",
    role: "student" as UserRole,
  },
  {
    id: 5,
    email: "student2@university.edu",
    password: "student123",
    name: "Jane Smith",
    role: "student" as UserRole,
  },
]

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole>("student")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("[v0] Login attempt:", { email, password, selectedRole })

      const user = mockUsers.find((u) => u.email === email && u.password === password && u.role === selectedRole)

      if (user) {
        console.log("[v0] Login successful for user:", user)
        onLogin(user)
      } else {
        console.log("[v0] Login failed - user not found")
        setError("Invalid credentials or role mismatch. Please check your email, password, and selected role.")
      }
    } catch (error) {
      console.error("[v0] Error during login:", error)
      setError("Login failed. Please try again.")
    }

    setIsLoading(false)
  }

  const handleDemoLogin = (role: UserRole) => {
    const demoUser = mockUsers.find((u) => u.role === role)
    if (demoUser) {
      onLogin(demoUser)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CreditCard className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-balance">Campus Meal Card System</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={selectedRole} onValueChange={(value: UserRole) => setSelectedRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="cashier">Cashier</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Demo Credentials</span>
              </div>
            </div>

            <div className="mt-4 text-xs text-muted-foreground space-y-1">
              <p>
                <strong>Demo Credentials:</strong>
              </p>
              <p>Admin: admin@university.edu / admin123</p>
              <p>Manager: manager@university.edu / manager123</p>
              <p>Cashier: cashier@university.edu / cashier123</p>
              <p>Student: student@university.edu / student123</p>
              <p>Student 2: student2@university.edu / student123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
