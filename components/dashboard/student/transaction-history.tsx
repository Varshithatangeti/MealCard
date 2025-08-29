"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { useState } from "react"

interface Transaction {
  id: string
  type: "purchase" | "recharge"
  amount: number
  description: string
  location: string
  date: string
  time: string
  balance: number
}

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "purchase",
      amount: -8.5,
      description: "Lunch Combo",
      location: "Main Cafeteria",
      date: "2024-01-16",
      time: "12:30 PM",
      balance: 45.75,
    },
    {
      id: "2",
      type: "purchase",
      amount: -4.25,
      description: "Coffee & Pastry",
      location: "Library Cafe",
      date: "2024-01-16",
      time: "9:15 AM",
      balance: 54.25,
    },
    {
      id: "3",
      type: "recharge",
      amount: 25.0,
      description: "Card Recharge",
      location: "Online Payment",
      date: "2024-01-15",
      time: "6:45 PM",
      balance: 58.5,
    },
    {
      id: "4",
      type: "purchase",
      amount: -12.75,
      description: "Dinner Special",
      location: "Main Cafeteria",
      date: "2024-01-15",
      time: "7:20 PM",
      balance: 33.5,
    },
    {
      id: "5",
      type: "purchase",
      amount: -3.5,
      description: "Snack",
      location: "Vending Machine",
      date: "2024-01-15",
      time: "3:10 PM",
      balance: 46.25,
    },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || transaction.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Transaction History</h2>
        <Button variant="outline" size="sm" className="text-green-700 border-green-200 bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="purchase">Purchases</SelectItem>
            <SelectItem value="recharge">Recharges</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transaction List */}
      <div className="space-y-3">
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "purchase" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                    }`}
                  >
                    {transaction.type === "purchase" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownLeft className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.location}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.date} at {transaction.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">Balance: ${transaction.balance.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No transactions found</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
