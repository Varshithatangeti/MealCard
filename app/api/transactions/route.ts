import { type NextRequest, NextResponse } from "next/server"

// Mock database - in production, this would be a real database
const transactions: any[] = [
  {
    id: "1",
    userId: "student1",
    type: "purchase",
    amount: -8.5,
    description: "Lunch Combo",
    location: "Main Cafeteria",
    timestamp: new Date("2024-01-16T12:30:00").toISOString(),
    balanceAfter: 45.75,
  },
  {
    id: "2",
    userId: "student1",
    type: "recharge",
    amount: 25.0,
    description: "Card Recharge",
    location: "Online Payment",
    timestamp: new Date("2024-01-15T18:45:00").toISOString(),
    balanceAfter: 58.5,
  },
]

const userBalances: Record<string, number> = {
  student1: 45.75,
  student2: 125.5,
  student3: 89.25,
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const type = searchParams.get("type")
  const limit = Number.parseInt(searchParams.get("limit") || "50")

  let filteredTransactions = transactions

  if (userId) {
    filteredTransactions = filteredTransactions.filter((t) => t.userId === userId)
  }

  if (type && type !== "all") {
    filteredTransactions = filteredTransactions.filter((t) => t.type === type)
  }

  // Sort by timestamp descending and limit results
  filteredTransactions = filteredTransactions
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit)

  return NextResponse.json({
    success: true,
    transactions: filteredTransactions,
    total: filteredTransactions.length,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, type, amount, description, location } = body

    // Validate required fields
    if (!userId || !type || !amount || !description) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Get current balance
    const currentBalance = userBalances[userId] || 0

    // For purchases, check if sufficient balance
    if (type === "purchase" && currentBalance < Math.abs(amount)) {
      return NextResponse.json({ success: false, error: "Insufficient balance" }, { status: 400 })
    }

    // Calculate new balance
    const newBalance = currentBalance + amount

    // Create transaction
    const transaction = {
      id: (transactions.length + 1).toString(),
      userId,
      type,
      amount,
      description,
      location: location || "Unknown",
      timestamp: new Date().toISOString(),
      balanceAfter: newBalance,
    }

    // Update records
    transactions.push(transaction)
    userBalances[userId] = newBalance

    return NextResponse.json({
      success: true,
      transaction,
      newBalance,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
