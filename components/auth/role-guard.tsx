"use client"

import type React from "react"

import { useAuth } from "./auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"

type UserRole = "admin" | "manager" | "cashier" | "student"

interface RoleGuardProps {
  allowedRoles: UserRole[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function RoleGuard({ allowedRoles, children, fallback }: RoleGuardProps) {
  const { user, logout } = useAuth()

  if (!user) {
    return null // This should be handled by the main auth check
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-[400px]">
          <Alert className="max-w-md">
            <ShieldAlert className="h-4 w-4" />
            <AlertDescription className="space-y-4">
              <p>You don't have permission to access this area.</p>
              <p>Required roles: {allowedRoles.join(", ")}</p>
              <p>Your role: {user.role}</p>
              <Button onClick={logout} variant="outline" size="sm">
                Switch Account
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )
    )
  }

  return <>{children}</>
}
