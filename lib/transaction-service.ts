export interface Transaction {
  id: string
  userId: string
  type: "purchase" | "recharge"
  amount: number
  description: string
  location: string
  timestamp: string
  balanceAfter: number
}

export interface Balance {
  userId: string
  balance: number
  lastUpdated: string
}

export class TransactionService {
  private static baseUrl = "/api"

  static async getTransactions(userId?: string, type?: string, limit?: number): Promise<Transaction[]> {
    const params = new URLSearchParams()
    if (userId) params.append("userId", userId)
    if (type) params.append("type", type)
    if (limit) params.append("limit", limit.toString())

    const response = await fetch(`${this.baseUrl}/transactions?${params}`)
    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch transactions")
    }

    return data.transactions
  }

  static async createTransaction(
    userId: string,
    type: "purchase" | "recharge",
    amount: number,
    description: string,
    location?: string,
  ): Promise<{ transaction: Transaction; newBalance: number }> {
    const response = await fetch(`${this.baseUrl}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        type,
        amount,
        description,
        location,
      }),
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to create transaction")
    }

    return {
      transaction: data.transaction,
      newBalance: data.newBalance,
    }
  }

  static async getBalance(userId: string): Promise<Balance> {
    const response = await fetch(`${this.baseUrl}/balance?userId=${userId}`)
    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch balance")
    }

    return {
      userId: data.userId,
      balance: data.balance,
      lastUpdated: data.lastUpdated,
    }
  }

  static async updateBalance(
    userId: string,
    amount: number,
    type: "purchase" | "recharge" = "recharge",
  ): Promise<{ previousBalance: number; newBalance: number }> {
    const response = await fetch(`${this.baseUrl}/balance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        amount,
        type,
      }),
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to update balance")
    }

    return {
      previousBalance: data.previousBalance,
      newBalance: data.newBalance,
    }
  }

  static async processPayment(
    userId: string,
    amount: number,
    description: string,
    location: string,
  ): Promise<{ success: boolean; newBalance: number; transaction: Transaction }> {
    try {
      const result = await this.createTransaction(
        userId,
        "purchase",
        -Math.abs(amount), // Ensure negative for purchases
        description,
        location,
      )

      return {
        success: true,
        newBalance: result.newBalance,
        transaction: result.transaction,
      }
    } catch (error) {
      throw error
    }
  }

  static async processRecharge(
    userId: string,
    amount: number,
    paymentMethod = "Credit Card",
  ): Promise<{ success: boolean; newBalance: number; transaction: Transaction }> {
    try {
      const result = await this.createTransaction(
        userId,
        "recharge",
        Math.abs(amount), // Ensure positive for recharges
        `Card Recharge - ${paymentMethod}`,
        "Online Payment",
      )

      return {
        success: true,
        newBalance: result.newBalance,
        transaction: result.transaction,
      }
    } catch (error) {
      throw error
    }
  }
}
