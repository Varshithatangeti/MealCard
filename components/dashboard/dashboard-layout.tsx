"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  CreditCard,
  User,
  Settings,
  LogOut,
  Menu,
  BarChart3,
  UserCog,
  TrendingUp,
  Package,
  FileText,
  ShoppingCart,
  Zap,
  CarIcon as CardIcon,
} from "lucide-react"
import RoleGuard from "@/components/auth/role-guard"
import UserManagement from "./admin/user-management"
import SystemAnalytics from "./admin/system-analytics"
import SystemSettings from "./admin/system-settings"
import SalesOverview from "./manager/sales-overview"
import InventoryManagement from "./manager/inventory-management"
import ReportsAnalytics from "./manager/reports-analytics"
import PointOfSale from "./cashier/point-of-sale"
import CardManagement from "./cashier/card-management"
import QuickActions from "./cashier/quick-actions"
import BalanceOverview from "./student/balance-overview"
import TransactionHistory from "./student/transaction-history"
import MealPlanner from "./student/meal-planner"

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false) // Added state for settings dialog

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-4 w-4" />
              </Button>
              <CreditCard className="h-8 w-8 text-primary" />
              <h1 className="text-xl md:text-2xl font-bold text-balance">Campus Meal Card System</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
                <Badge variant="secondary">{user.role}</Badge>
              </div>
              <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                  </DialogHeader>
                  <RoleGuard allowedRoles={["admin"]}>
                    <SystemSettings />
                  </RoleGuard>
                  <RoleGuard allowedRoles={["manager", "cashier", "student"]}>
                    <UserProfileSettings />
                  </RoleGuard>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <RoleGuard allowedRoles={["admin"]}>
          <AdminDashboard />
        </RoleGuard>

        <RoleGuard allowedRoles={["manager"]}>
          <ManagerDashboard />
        </RoleGuard>

        <RoleGuard allowedRoles={["cashier"]}>
          <CashierDashboard />
        </RoleGuard>

        <RoleGuard allowedRoles={["student"]}>
          <StudentDashboard />
        </RoleGuard>
      </main>
    </div>
  )
}

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-balance">Administrator Dashboard</h2>
        <p className="text-muted-foreground">Complete system oversight and management</p>
      </div>

      <Tabs defaultValue="analytics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            System Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <SystemAnalytics />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="settings">
          <SystemSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ManagerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-balance">Manager Dashboard</h2>
        <p className="text-muted-foreground">Operations management and business insights</p>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Sales Overview
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Inventory
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <SalesOverview />
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryManagement />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CashierDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-balance">Cashier Dashboard</h2>
        <p className="text-muted-foreground">Point of sale and card management operations</p>
      </div>

      <Tabs defaultValue="pos" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pos" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Point of Sale
          </TabsTrigger>
          <TabsTrigger value="cards" className="flex items-center gap-2">
            <CardIcon className="h-4 w-4" />
            Card Management
          </TabsTrigger>
          <TabsTrigger value="quick" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Quick Actions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pos">
          <PointOfSale />
        </TabsContent>

        <TabsContent value="cards">
          <CardManagement />
        </TabsContent>

        <TabsContent value="quick">
          <QuickActions />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-balance">Student Dashboard</h2>
        <p className="text-muted-foreground">Manage your meal card and plan your meals</p>
      </div>

      <Tabs defaultValue="balance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="balance" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Balance
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            History
          </TabsTrigger>
          <TabsTrigger value="meals" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Meal Plans
          </TabsTrigger>
        </TabsList>

        <TabsContent value="balance">
          <BalanceOverview />
        </TabsContent>

        <TabsContent value="history">
          <TransactionHistory />
        </TabsContent>

        <TabsContent value="meals">
          <MealPlanner />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function UserProfileSettings() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`user-settings-${user?.email}`)
      if (saved) {
        return JSON.parse(saved)
      }
    }
    return {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      notifications: {
        email: true,
        sms: false,
        lowBalance: true,
        transactions: true,
      },
      preferences: {
        theme: "light",
        language: "en",
        currency: "USD",
      },
    }
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("[v0] Saving user profile:", profile)

      if (typeof window !== "undefined") {
        localStorage.setItem(`user-settings-${user?.email}`, JSON.stringify(profile))
      }

      const event = new CustomEvent("toast", {
        detail: {
          title: "Profile Updated",
          description: "Your profile settings have been saved successfully.",
        },
      })
      window.dispatchEvent(event)
    } catch (error) {
      const event = new CustomEvent("toast", {
        detail: {
          title: "Error",
          description: "Failed to save profile settings. Please try again.",
          variant: "destructive",
        },
      })
      window.dispatchEvent(event)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Profile Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your account preferences and notifications</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-input rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-input rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full mt-1 px-3 py-2 border border-input rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Theme</label>
              <select
                value={profile.preferences.theme}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    preferences: { ...profile.preferences, theme: e.target.value },
                  })
                }
                className="w-full mt-1 px-3 py-2 border border-input rounded-md"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Email Notifications</label>
                <p className="text-xs text-muted-foreground">Receive notifications via email</p>
              </div>
              <input
                type="checkbox"
                checked={profile.notifications.email}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    notifications: { ...profile.notifications, email: e.target.checked },
                  })
                }
                className="h-4 w-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">SMS Notifications</label>
                <p className="text-xs text-muted-foreground">Receive notifications via SMS</p>
              </div>
              <input
                type="checkbox"
                checked={profile.notifications.sms}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    notifications: { ...profile.notifications, sms: e.target.checked },
                  })
                }
                className="h-4 w-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Low Balance Alerts</label>
                <p className="text-xs text-muted-foreground">Get notified when balance is low</p>
              </div>
              <input
                type="checkbox"
                checked={profile.notifications.lowBalance}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    notifications: { ...profile.notifications, lowBalance: e.target.checked },
                  })
                }
                className="h-4 w-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Transaction Alerts</label>
                <p className="text-xs text-muted-foreground">Get notified for all transactions</p>
              </div>
              <input
                type="checkbox"
                checked={profile.notifications.transactions}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    notifications: { ...profile.notifications, transactions: e.target.checked },
                  })
                }
                className="h-4 w-4"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
