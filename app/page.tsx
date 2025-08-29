"use client"

import { useAuth } from "@/components/auth/auth-context"
import LoginForm from "@/components/auth/login-form"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { CreditCard } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user, login, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">CampusCard</span>
              </div>
              <Link href="/website">
                <Button variant="outline">View Website</Button>
              </Link>
            </div>
          </div>
        </nav>
        <LoginForm onLogin={login} />
      </div>
    )
  }

  return <DashboardLayout />
}
