"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Plus, Search, History, DollarSign, CheckCircle, AlertCircle } from "lucide-react"

interface Transaction {
  id: number
  type: "purchase" | "recharge"
  amount: number
  description: string
  timestamp: string
  status: "completed" | "pending" | "failed"
}

interface Student {
  id: number
  name: string
  cardNumber: string
  balance: number
  status: "active" | "inactive" | "blocked"
  email: string
}

const mockStudents: Student[] = [
  { id: 1, name: "John Doe", cardNumber: "1234567890", balance: 125.5, status: "active", email: "john@university.edu" },
  {
    id: 2,
    name: "Jane Smith",
    cardNumber: "1234567891",
    balance: 89.25,
    status: "active",
    email: "jane@university.edu",
  },
  {
    id: 3,
    name: "Mike Johnson",
    cardNumber: "1234567892",
    balance: 15.75,
    status: "active",
    email: "mike@university.edu",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    cardNumber: "1234567893",
    balance: 0.0,
    status: "inactive",
    email: "sarah@university.edu",
  },
]

const mockTransactions: Transaction[] = [
  {
    id: 1,
    type: "purchase",
    amount: -12.5,
    description: "Lunch Combo",
    timestamp: "2024-01-15 12:30",
    status: "completed",
  },
  {
    id: 2,
    type: "recharge",
    amount: 50.0,
    description: "Card Recharge",
    timestamp: "2024-01-15 09:15",
    status: "completed",
  },
  {
    id: 3,
    type: "purchase",
    amount: -8.75,
    description: "Coffee & Pastry",
    timestamp: "2024-01-15 14:20",
    status: "completed",
  },
  {
    id: 4,
    type: "purchase",
    amount: -15.99,
    description: "Dinner Special",
    timestamp: "2024-01-14 18:45",
    status: "completed",
  },
  {
    id: 5,
    type: "recharge",
    amount: 25.0,
    description: "Card Recharge",
    timestamp: "2024-01-14 10:30",
    status: "completed",
  },
]

export default function CardManagement() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [cardLookup, setCardLookup] = useState("")
  const [rechargeAmount, setRechargeAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionResult, setTransactionResult] = useState<{ success: boolean; message: string } | null>(null)

  const lookupCard = () => {
    console.log("[v0] Card lookup initiated with input:", cardLookup)
    const student = mockStudents.find(
      (s) => s.cardNumber === cardLookup || s.name.toLowerCase().includes(cardLookup.toLowerCase()),
    )
    console.log("[v0] Card lookup result:", student)
    setSelectedStudent(student || null)
    if (!student) {
      console.log("[v0] Student not found in card lookup")
      setTransactionResult({ success: false, message: "Student not found. Please check the card number or name." })
    } else {
      console.log("[v0] Student found successfully:", student.name)
      setTransactionResult(null)
    }
  }

  const processRecharge = async () => {
    console.log("[v0] Starting recharge process")
    console.log("[v0] Selected student:", selectedStudent)
    console.log("[v0] Recharge amount:", rechargeAmount)
    console.log("[v0] Payment method:", paymentMethod)

    if (!selectedStudent || !rechargeAmount) {
      console.log("[v0] Recharge cancelled - missing student or amount")
      return
    }

    setIsProcessing(true)
    setTransactionResult(null)

    // Simulate processing delay
    console.log("[v0] Simulating recharge processing delay...")
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const amount = Number.parseFloat(rechargeAmount)
    console.log("[v0] Parsed recharge amount:", amount)

    if (amount < 5 || amount > 500) {
      console.log("[v0] Recharge failed - invalid amount")
      setTransactionResult({ success: false, message: "Recharge amount must be between $5.00 and $500.00" })
    } else {
      // Update student balance (in real app, this would be an API call)
      const newBalance = selectedStudent.balance + amount
      console.log("[v0] Recharge successful, new balance:", newBalance)
      setSelectedStudent({ ...selectedStudent, balance: newBalance })
      setTransactionResult({
        success: true,
        message: `Successfully recharged $${amount.toFixed(2)}. New balance: $${newBalance.toFixed(2)}`,
      })
      setRechargeAmount("")
      console.log("[v0] Recharge amount field cleared")
    }

    setIsProcessing(false)
    console.log("[v0] Recharge processing completed")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "inactive":
        return "secondary"
      case "blocked":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getTransactionIcon = (type: string) => {
    return type === "recharge" ? (
      <Plus className="h-4 w-4 text-green-500" />
    ) : (
      <DollarSign className="h-4 w-4 text-blue-500" />
    )
  }

  return (
    <div className="space-y-6">
      {/* Card Lookup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Student Lookup
          </CardTitle>
          <CardDescription>Search by card number or student name</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="lookup">Card Number or Name</Label>
              <Input
                id="lookup"
                placeholder="Enter card number or student name"
                value={cardLookup}
                onChange={(e) => setCardLookup(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-end">
              <Button onClick={lookupCard} disabled={!cardLookup}>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {selectedStudent && (
            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{selectedStudent.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedStudent.email}</p>
                </div>
                <Badge variant={getStatusColor(selectedStudent.status)}>{selectedStudent.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Card Number</p>
                  <p className="font-medium">{selectedStudent.cardNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Balance</p>
                  <p className="font-medium text-lg text-primary">${selectedStudent.balance.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedStudent && (
        <Tabs defaultValue="recharge" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="recharge">Recharge Card</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="recharge" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Recharge Card
                </CardTitle>
                <CardDescription>Add funds to the student's meal card</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Recharge Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      min="5"
                      max="500"
                      step="0.01"
                      value={rechargeAmount}
                      onChange={(e) => setRechargeAmount(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Minimum: $5.00, Maximum: $500.00</p>
                  </div>
                  <div>
                    <Label htmlFor="payment">Payment Method</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div>
                  <Label>Quick Amounts</Label>
                  <div className="flex gap-2 mt-2">
                    {[10, 25, 50, 100].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setRechargeAmount(amount.toString())}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>

                {transactionResult && (
                  <Alert variant={transactionResult.success ? "default" : "destructive"}>
                    {transactionResult.success ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertDescription>{transactionResult.message}</AlertDescription>
                  </Alert>
                )}

                <Button
                  className="w-full"
                  onClick={processRecharge}
                  disabled={!rechargeAmount || isProcessing || selectedStudent.status !== "active"}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Recharge ${rechargeAmount || "0.00"}
                    </>
                  )}
                </Button>

                {selectedStudent.status !== "active" && (
                  <p className="text-sm text-destructive text-center">Cannot recharge inactive or blocked cards</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Transaction History
                </CardTitle>
                <CardDescription>Recent transactions for {selectedStudent.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(transaction.type)}
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.timestamp}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-blue-600"}`}>
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <Badge
                          variant={transaction.status === "completed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {mockTransactions.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">No transactions found for this student.</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
