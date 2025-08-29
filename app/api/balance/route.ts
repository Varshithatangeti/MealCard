import { type NextRequest, NextResponse } from "next/server"

// Mock user balances - in production, this would be in a database
const userBalances: Record<string, number> = {
  student1: 45.75,
  student2: 125.5,
  student3: 89.25,
  admin1: 0,
  manager1: 0,
  cashier1: 0,
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 })
  }

  const balance = userBalances[userId] || 0

  return NextResponse.json({
    success: true,
    userId,
    balance,
    lastUpdated: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, amount, type = "recharge" } = body

    if (!userId || amount === undefined) {
      return NextResponse.json({ success: false, error: "User ID and amount are required" }, { status: 400 })
    }

    // Get current balance
    const currentBalance = userBalances[userId] || 0

    // For purchases, ensure sufficient balance
    if (type === "purchase" && currentBalance < Math.abs(amount)) {
      return NextResponse.json({ success: false, error: "Insufficient balance" }, { status: 400 })
    }

    // Update balance
    const newBalance = currentBalance + amount
    userBalances[userId] = Math.max(0, newBalance) // Ensure balance doesn't go negative

    return NextResponse.json({
      success: true,
      userId,
      previousBalance: currentBalance,
      newBalance: userBalances[userId],
      amountChanged: amount,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
