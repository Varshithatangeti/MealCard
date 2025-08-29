"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Settings, Bell, Shield, DollarSign, Save, RefreshCw } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const defaultSettings = {
  // General Settings
  systemName: "Campus Meal Card System",
  maintenanceMode: false,
  allowRegistration: true,
  maxLoginAttempts: 5,
  sessionTimeout: 30,

  // Payment Settings
  minRechargeAmount: 5.0,
  maxRechargeAmount: 500.0,
  lowBalanceThreshold: 10.0,
  transactionFee: 0.0,

  // Notification Settings
  emailNotifications: true,
  smsNotifications: false,
  lowBalanceAlerts: true,
  transactionAlerts: true,

  // Security Settings
  requireStrongPasswords: true,
  enableTwoFactor: false,
  passwordExpiry: 90,
  auditLogging: true,
}

export default function SystemSettings() {
  const [settings, setSettings] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("system-settings")
      if (saved) {
        return { ...defaultSettings, ...JSON.parse(saved) }
      }
    }
    return defaultSettings
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (typeof window !== "undefined") {
        localStorage.setItem("system-settings", JSON.stringify(settings))
      }

      console.log("[v0] Saving settings:", settings)

      toast({
        title: "Settings Saved",
        description: "System settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = async () => {
    if (
      !confirm("Are you sure you want to reset all settings to their default values? This action cannot be undone.")
    ) {
      return
    }

    setIsResetting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setSettings(defaultSettings)

      if (typeof window !== "undefined") {
        localStorage.removeItem("system-settings")
      }

      toast({
        title: "Settings Reset",
        description: "All settings have been reset to their default values.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} disabled={isResetting}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {isResetting ? "Resetting..." : "Reset"}
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Basic system configuration options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="systemName">System Name</Label>
                  <Input
                    id="systemName"
                    value={settings.systemName}
                    onChange={(e) => setSettings({ ...settings, systemName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout.toString()}
                    onChange={(e) =>
                      setSettings({ ...settings, sessionTimeout: Number.parseInt(e.target.value) || 30 })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Temporarily disable system access</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Allow New Registrations</Label>
                    <p className="text-sm text-muted-foreground">Enable new user account creation</p>
                  </div>
                  <Switch
                    checked={settings.allowRegistration}
                    onCheckedChange={(checked) => setSettings({ ...settings, allowRegistration: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Payment Settings
              </CardTitle>
              <CardDescription>Configure payment and transaction limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minRecharge">Minimum Recharge Amount ($)</Label>
                  <Input
                    id="minRecharge"
                    type="number"
                    step="0.01"
                    value={settings.minRechargeAmount.toString()}
                    onChange={(e) =>
                      setSettings({ ...settings, minRechargeAmount: Number.parseFloat(e.target.value) || 5.0 })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="maxRecharge">Maximum Recharge Amount ($)</Label>
                  <Input
                    id="maxRecharge"
                    type="number"
                    step="0.01"
                    value={settings.maxRechargeAmount.toString()}
                    onChange={(e) =>
                      setSettings({ ...settings, maxRechargeAmount: Number.parseFloat(e.target.value) || 500.0 })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="lowBalance">Low Balance Threshold ($)</Label>
                  <Input
                    id="lowBalance"
                    type="number"
                    step="0.01"
                    value={settings.lowBalanceThreshold.toString()}
                    onChange={(e) =>
                      setSettings({ ...settings, lowBalanceThreshold: Number.parseFloat(e.target.value) || 10.0 })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="transactionFee">Transaction Fee ($)</Label>
                  <Input
                    id="transactionFee"
                    type="number"
                    step="0.01"
                    value={settings.transactionFee.toString()}
                    onChange={(e) =>
                      setSettings({ ...settings, transactionFee: Number.parseFloat(e.target.value) || 0.0 })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Low Balance Alerts</Label>
                    <p className="text-sm text-muted-foreground">Alert users when balance is low</p>
                  </div>
                  <Switch
                    checked={settings.lowBalanceAlerts}
                    onCheckedChange={(checked) => setSettings({ ...settings, lowBalanceAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Transaction Alerts</Label>
                    <p className="text-sm text-muted-foreground">Send alerts for all transactions</p>
                  </div>
                  <Switch
                    checked={settings.transactionAlerts}
                    onCheckedChange={(checked) => setSettings({ ...settings, transactionAlerts: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security and authentication options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxAttempts"
                    type="number"
                    value={settings.maxLoginAttempts.toString()}
                    onChange={(e) =>
                      setSettings({ ...settings, maxLoginAttempts: Number.parseInt(e.target.value) || 5 })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={settings.passwordExpiry.toString()}
                    onChange={(e) =>
                      setSettings({ ...settings, passwordExpiry: Number.parseInt(e.target.value) || 90 })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Strong Passwords</Label>
                    <p className="text-sm text-muted-foreground">Enforce password complexity rules</p>
                  </div>
                  <Switch
                    checked={settings.requireStrongPasswords}
                    onCheckedChange={(checked) => setSettings({ ...settings, requireStrongPasswords: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                  </div>
                  <Switch
                    checked={settings.enableTwoFactor}
                    onCheckedChange={(checked) => setSettings({ ...settings, enableTwoFactor: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all system activities</p>
                  </div>
                  <Switch
                    checked={settings.auditLogging}
                    onCheckedChange={(checked) => setSettings({ ...settings, auditLogging: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {settings.maintenanceMode && (
        <Alert>
          <AlertDescription>
            <strong>Warning:</strong> Maintenance mode is enabled. Users will not be able to access the system.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
