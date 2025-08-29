"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Users, DollarSign, Clock, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"

interface QuickStat {
  label: string
  value: string
  change?: string
  trend?: "up" | "down"
  icon: React.ReactNode
}

const quickStats: QuickStat[] = [
  {
    label: "Today's Sales",
    value: "$1,247",
    change: "+8.2%",
    trend: "up",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    label: "Transactions",
    value: "89",
    change: "+12",
    trend: "up",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    label: "Active Students",
    value: "456",
    icon: <Users className="h-4 w-4" />,
  },
  {
    label: "Avg Transaction",
    value: "$14.02",
    change: "-2.1%",
    trend: "down",
    icon: <TrendingUp className="h-4 w-4" />,
  },
]

const recentTransactions = [
  { id: 1, student: "John Doe", amount: 12.5, time: "2 min ago", status: "completed" },
  { id: 2, student: "Jane Smith", amount: 8.75, time: "5 min ago", status: "completed" },
  { id: 3, student: "Mike Johnson", amount: 15.99, time: "8 min ago", status: "completed" },
  { id: 4, student: "Sarah Wilson", amount: 6.5, time: "12 min ago", status: "completed" },
  { id: 5, student: "Bob Brown", amount: 11.25, time: "15 min ago", status: "completed" },
]

const lowBalanceAlerts = [
  { name: "Alice Cooper", cardNumber: "1234567894", balance: 3.25 },
  { name: "David Lee", cardNumber: "1234567895", balance: 7.8 },
  { name: "Emma Davis", cardNumber: "1234567896", balance: 2.15 },
]

export default function QuickActions() {
  const [quickCardLookup, setQuickCardLookup] = useState("")
  const [lookupResult, setLookupResult] = useState<{ name: string; balance: number; status: string } | null>(null)

  const handleQuickLookup = () => {
    // Mock lookup - in real app this would be an API call
    if (quickCardLookup === "1234567890") {
      setLookupResult({ name: "John Doe", balance: 125.5, status: "active" })
    } else if (quickCardLookup === "1234567891") {
      setLookupResult({ name: "Jane Smith", balance: 89.25, status: "active" })
    } else {
      setLookupResult(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <div className={`flex items-center text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  <TrendingUp className={`h-3 w-3 mr-1 ${stat.trend === "down" ? "rotate-180" : ""}`} />
                  {stat.change}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Card Lookup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Quick Balance Check
            </CardTitle>
            <CardDescription>Instantly check a student's balance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter card number"
                value={quickCardLookup}
                onChange={(e) => setQuickCardLookup(e.target.value)}
              />
              <Button onClick={handleQuickLookup} disabled={!quickCardLookup}>
                Check
              </Button>
            </div>

            {lookupResult && (
              <div className="p-3 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{lookupResult.name}</p>
                    <p className="text-sm text-muted-foreground">Balance: ${lookupResult.balance.toFixed(2)}</p>
                  </div>
                  <Badge variant="default">{lookupResult.status}</Badge>
                </div>
              </div>
            )}

            {quickCardLookup && !lookupResult && quickCardLookup.length >= 10 && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>Card not found. Please check the number.</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Low Balance Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Low Balance Alerts
            </CardTitle>
            <CardDescription>Students with low meal card balances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowBalanceAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{alert.name}</p>
                    <p className="text-sm text-muted-foreground">Card: {alert.cardNumber}</p>
                  </div>
                  <Badge variant="destructive">${alert.balance.toFixed(2)}</Badge>
                </div>
              ))}
            </div>

            {lowBalanceAlerts.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <p>No low balance alerts</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Transactions
          </CardTitle>
          <CardDescription>Latest transactions processed at this terminal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{transaction.student}</p>
                  <p className="text-sm text-muted-foreground">{transaction.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                  <Badge variant="default" className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total transactions today:</span>
            <span className="font-medium">89 transactions</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
