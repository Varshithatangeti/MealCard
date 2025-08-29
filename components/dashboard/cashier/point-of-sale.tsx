"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Scan, Plus, Minus, ShoppingCart, DollarSign, User, CheckCircle, XCircle, Eye } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  category: string
}

interface Student {
  id: number
  name: string
  cardNumber: string
  balance: number
  status: "active" | "inactive" | "blocked"
  mealPlan?: {
    type: string
    remaining: number
    total: number
  }
}

const menuItems = [
  { id: 1, name: "Lunch Combo", price: 12.99, category: "Meals" },
  { id: 2, name: "Breakfast Special", price: 8.99, category: "Meals" },
  { id: 3, name: "Salad Bowl", price: 9.99, category: "Healthy" },
  { id: 4, name: "Pizza Slice", price: 4.99, category: "Quick Bites" },
  { id: 5, name: "Coffee", price: 2.99, category: "Beverages" },
  { id: 6, name: "Sandwich", price: 7.99, category: "Quick Bites" },
  { id: 7, name: "Soup", price: 5.99, category: "Healthy" },
  { id: 8, name: "Soda", price: 1.99, category: "Beverages" },
]

const mockStudents: Student[] = [
  {
    id: 1,
    name: "John Doe",
    cardNumber: "1234567890",
    balance: 125.5,
    status: "active",
    mealPlan: { type: "Premium Plan", remaining: 45, total: 60 },
  },
  {
    id: 2,
    name: "Jane Smith",
    cardNumber: "1234567891",
    balance: 89.25,
    status: "active",
    mealPlan: { type: "Basic Plan", remaining: 12, total: 30 },
  },
  {
    id: 3,
    name: "Mike Johnson",
    cardNumber: "1234567892",
    balance: 15.75,
    status: "active",
    mealPlan: { type: "Standard Plan", remaining: 8, total: 45 },
  },
  {
    id: 4,
    name: "Sarah Wilson",
    cardNumber: "1234567893",
    balance: 0.0,
    status: "inactive",
    mealPlan: { type: "Basic Plan", remaining: 0, total: 30 },
  },
]

export default function PointOfSale() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cardNumber, setCardNumber] = useState("")
  const [student, setStudent] = useState<Student | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionResult, setTransactionResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false)
  const { toast } = useToast()

  const addToCart = (item: (typeof menuItems)[0]) => {
    console.log("[v0] Adding item to cart:", item)
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
      )
      setCart(updatedCart)
      console.log("[v0] Updated existing item quantity, new cart:", updatedCart)
    } else {
      const newCart = [...cart, { ...item, quantity: 1 }]
      setCart(newCart)
      console.log("[v0] Added new item to cart, new cart:", newCart)
    }

    toast({
      title: "Item Added",
      description: `${item.name} added to cart`,
    })
  }

  const removeFromCart = (itemId: number) => {
    console.log("[v0] Removing item from cart, itemId:", itemId)
    const existingItem = cart.find((cartItem) => cartItem.id === itemId)
    if (existingItem && existingItem.quantity > 1) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem,
      )
      setCart(updatedCart)
      console.log("[v0] Decreased item quantity, new cart:", updatedCart)
    } else {
      const updatedCart = cart.filter((cartItem) => cartItem.id !== itemId)
      setCart(updatedCart)
      console.log("[v0] Removed item completely, new cart:", updatedCart)
    }
  }

  const clearCart = () => {
    console.log("[v0] Clearing cart")
    setCart([])
    toast({
      title: "Cart Cleared",
      description: "All items removed from cart",
    })
  }

  const lookupStudent = () => {
    console.log("[v0] Looking up student with card number:", cardNumber)
    const foundStudent = mockStudents.find((s) => s.cardNumber === cardNumber)
    console.log("[v0] Student lookup result:", foundStudent)
    setStudent(foundStudent || null)
    if (!foundStudent) {
      console.log("[v0] Student not found")
      setTransactionResult({ success: false, message: "Card not found. Please check the card number." })
      toast({
        title: "Card Not Found",
        description: "Please check the card number and try again",
        variant: "destructive",
      })
    } else {
      console.log("[v0] Student found successfully:", foundStudent.name)
      setTransactionResult(null)
      toast({
        title: "Card Found",
        description: `Welcome, ${foundStudent.name}!`,
      })
    }
  }

  const processTransaction = async () => {
    console.log("[v0] Starting transaction processing")
    console.log("[v0] Current student:", student)
    console.log("[v0] Current cart:", cart)

    if (!student || cart.length === 0) {
      console.log("[v0] Transaction cancelled - no student or empty cart")
      return
    }

    setIsProcessing(true)
    setTransactionResult(null)

    // Simulate processing delay
    console.log("[v0] Simulating processing delay...")
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    console.log("[v0] Transaction total:", total)
    console.log("[v0] Student balance:", student.balance)
    console.log("[v0] Student status:", student.status)

    if (student.status !== "active") {
      console.log("[v0] Transaction failed - card not active")
      setTransactionResult({ success: false, message: "Card is not active. Please contact administration." })
      toast({
        title: "Transaction Failed",
        description: "Card is not active",
        variant: "destructive",
      })
    } else if (student.balance < total) {
      console.log("[v0] Transaction failed - insufficient balance")
      setTransactionResult({
        success: false,
        message: `Insufficient balance. Available: $${student.balance.toFixed(2)}`,
      })
      toast({
        title: "Insufficient Balance",
        description: `Available balance: $${student.balance.toFixed(2)}`,
        variant: "destructive",
      })
    } else {
      // Update student balance (in real app, this would be an API call)
      const newBalance = student.balance - total
      console.log("[v0] Transaction successful, new balance:", newBalance)
      setStudent({ ...student, balance: newBalance })
      setTransactionResult({
        success: true,
        message: `Transaction successful! New balance: $${newBalance.toFixed(2)}`,
      })
      toast({
        title: "Payment Successful",
        description: `$${total.toFixed(2)} charged. New balance: $${newBalance.toFixed(2)}`,
      })
      setCart([])
      console.log("[v0] Cart cleared after successful transaction")
    }

    setIsProcessing(false)
    console.log("[v0] Transaction processing completed")
  }

  const handleViewCard = () => {
    console.log("[v0] View card button clicked")
    if (!student) {
      console.log("[v0] No student selected for card view")
      toast({
        title: "No Card Selected",
        description: "Please lookup a student card first",
        variant: "destructive",
      })
      return
    }
    console.log("[v0] Opening card dialog for student:", student.name)
    setIsCardDialogOpen(true)
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const categories = [...new Set(menuItems.map((item) => item.category))]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Menu Items */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Menu Items</CardTitle>
            <CardDescription>Select items to add to the order</CardDescription>
          </CardHeader>
          <CardContent>
            {categories.map((category) => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-primary">{category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {menuItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        onClick={() => addToCart(item)}
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Cart and Payment */}
      <div className="space-y-6">
        {/* Student Card Lookup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Student Card
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="Scan or enter card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col justify-end">
                <Button onClick={lookupStudent} disabled={!cardNumber}>
                  <Scan className="h-4 w-4 mr-2" />
                  Lookup
                </Button>
              </div>
            </div>

            {student && (
              <div className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{student.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={student.status === "active" ? "default" : "destructive"}>{student.status}</Badge>
                    <Button variant="ghost" size="sm" onClick={handleViewCard}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Balance:</span>
                  <span className="font-medium text-lg">${student.balance.toFixed(2)}</span>
                </div>
                {student.mealPlan && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Meal Plan:</span>
                    <span className="text-sm">
                      {student.mealPlan.remaining}/{student.mealPlan.total} remaining
                    </span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Shopping Cart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Current Order
            </CardTitle>
            {cart.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearCart}>
                Clear All
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No items in cart</p>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => removeFromCart(item.id)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => addToCart(item)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transaction Result */}
        {transactionResult && (
          <Alert variant={transactionResult.success ? "default" : "destructive"}>
            {transactionResult.success ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertDescription>{transactionResult.message}</AlertDescription>
          </Alert>
        )}

        {/* Process Payment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Process Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              size="lg"
              onClick={processTransaction}
              disabled={!student || cart.length === 0 || isProcessing}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Charge ${total.toFixed(2)}
                </>
              )}
            </Button>

            {student && total > student.balance && (
              <p className="text-sm text-destructive mt-2 text-center">
                Insufficient balance (${student.balance.toFixed(2)} available)
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* View Card Dialog */}
      <Dialog open={isCardDialogOpen} onOpenChange={setIsCardDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Student Card Details</DialogTitle>
            <DialogDescription>Complete information for {student?.name}</DialogDescription>
          </DialogHeader>
          {student && (
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
                  <p className="text-xl font-mono tracking-wider">**** **** **** {student.cardNumber.slice(-4)}</p>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <div>
                    <p className="text-xs opacity-90">Cardholder</p>
                    <p className="font-medium">{student.name.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-90">Status</p>
                    <p className="font-medium">{student.status.toUpperCase()}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Current Balance</p>
                  <p className="text-lg font-bold text-green-600">${student.balance.toFixed(2)}</p>
                </div>
                <div>
                  <p className="font-medium">Card Status</p>
                  <Badge variant={student.status === "active" ? "default" : "destructive"}>{student.status}</Badge>
                </div>
                {student.mealPlan && (
                  <>
                    <div>
                      <p className="font-medium">Meal Plan</p>
                      <p className="text-muted-foreground">{student.mealPlan.type}</p>
                    </div>
                    <div>
                      <p className="font-medium">Meals Remaining</p>
                      <p className="text-muted-foreground">
                        {student.mealPlan.remaining}/{student.mealPlan.total}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
