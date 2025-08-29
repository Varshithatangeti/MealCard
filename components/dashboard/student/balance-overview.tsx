"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Plus, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function BalanceOverview() {
  const [showBalance, setShowBalance] = useState(true)
  const [currentBalance, setCurrentBalance] = useState(45.75)
  const [isRechargeDialogOpen, setIsRechargeDialogOpen] = useState(false)
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false)
  const [rechargeAmount, setRechargeAmount] = useState("")
  const [lastRecharge, setLastRecharge] = useState({ amount: 25.0, date: "2024-01-15" })
  const { toast } = useToast()

  const handleRecharge = () => {
    const amount = Number.parseFloat(rechargeAmount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to recharge",
        variant: "destructive",
      })
      return
    }

    if (amount < 5) {
      toast({
        title: "Minimum Amount",
        description: "Minimum recharge amount is $5.00",
        variant: "destructive",
      })
      return
    }

    if (amount > 500) {
      toast({
        title: "Maximum Amount",
        description: "Maximum recharge amount is $500.00",
        variant: "destructive",
      })
      return
    }

    setCurrentBalance((prev) => prev + amount)
    setLastRecharge({
      amount: amount,
      date: new Date().toISOString().split("T")[0],
    })
    setRechargeAmount("")
    setIsRechargeDialogOpen(false)

    toast({
      title: "Recharge Successful",
      description: `$${amount.toFixed(2)} has been added to your card`,
    })
  }

  const handleViewCard = () => {
    setIsCardDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      {/* Balance Card */}
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-green-800">Current Balance</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
              className="text-green-700 hover:text-green-800"
            >
              {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-green-800">
                {showBalance ? `$${currentBalance.toFixed(2)}` : "••••"}
              </div>
              <p className="text-sm text-green-600 mt-1">Available to spend</p>
            </div>
            <CreditCard className="h-12 w-12 text-green-600" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Dialog open={isRechargeDialogOpen} onOpenChange={setIsRechargeDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-16 bg-green-600 hover:bg-green-700 text-white">
              <div className="flex flex-col items-center gap-1">
                <Plus className="h-5 w-5" />
                <span className="text-sm">Add Money</span>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Money to Card</DialogTitle>
              <DialogDescription>
                Enter the amount you want to add to your meal card (Min: $5, Max: $500)
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="5"
                  max="500"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  className="col-span-3"
                  placeholder="Enter amount"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>• Minimum recharge: $5.00</p>
                <p>• Maximum recharge: $500.00</p>
                <p>• Processing fee: $0.00</p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleRecharge}>Add Money</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isCardDialogOpen} onOpenChange={setIsCardDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="h-16 border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
              onClick={handleViewCard}
            >
              <div className="flex flex-col items-center gap-1">
                <CreditCard className="h-5 w-5" />
                <span className="text-sm">View Card</span>
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Your Meal Card</DialogTitle>
              <DialogDescription>Campus meal card information and details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm opacity-90">Campus Meal Card</p>
                    <p className="text-lg font-semibold">University Dining</p>
                  </div>
                  <CreditCard className="h-8 w-8 opacity-90" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm opacity-90">Card Number</p>
                  <p className="text-xl font-mono tracking-wider">**** **** **** 1234</p>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <p className="text-xs opacity-90">Cardholder</p>
                    <p className="font-medium">JOHN STUDENT</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-90">Valid Thru</p>
                    <p className="font-medium">12/26</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Student ID</p>
                  <p className="text-muted-foreground">STU123456</p>
                </div>
                <div>
                  <p className="font-medium">Card Status</p>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
                <div>
                  <p className="font-medium">Issue Date</p>
                  <p className="text-muted-foreground">Sep 1, 2023</p>
                </div>
                <div>
                  <p className="font-medium">Expiry Date</p>
                  <p className="text-muted-foreground">Dec 31, 2026</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Last Recharge Info */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Last Recharge</p>
              <p className="text-xs text-muted-foreground">{lastRecharge.date}</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              +${lastRecharge.amount.toFixed(2)}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Low Balance Alert */}
      {currentBalance < 50 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse" />
              <div>
                <p className="text-sm font-medium text-orange-800">Low Balance Alert</p>
                <p className="text-xs text-orange-600">Consider adding money to your card</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
