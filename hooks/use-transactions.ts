"use client"

import { useState, useEffect } from "react"
import { TransactionService, type Transaction, type Balance } from "@/lib/transaction-service"

export function useTransactions(userId?: string, type?: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await TransactionService.getTransactions(userId, type)
      setTransactions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch transactions")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchTransactions()
    }
  }, [userId, type])

  const createTransaction = async (
    type: "purchase" | "recharge",
    amount: number,
    description: string,
    location?: string,
  ) => {
    if (!userId) throw new Error("User ID is required")

    try {
      const result = await TransactionService.createTransaction(userId, type, amount, description, location)

      // Refresh transactions
      await fetchTransactions()

      return result
    } catch (err) {
      throw err
    }
  }

  return {
    transactions,
    loading,
    error,
    createTransaction,
    refetch: fetchTransactions,
  }
}

export function useBalance(userId?: string) {
  const [balance, setBalance] = useState<Balance | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBalance = async () => {
    if (!userId) return

    try {
      setLoading(true)
      setError(null)
      const data = await TransactionService.getBalance(userId)
      setBalance(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch balance")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [userId])

  const updateBalance = async (amount: number, type: "purchase" | "recharge" = "recharge") => {
    if (!userId) throw new Error("User ID is required")

    try {
      const result = await TransactionService.updateBalance(userId, amount, type)

      // Refresh balance
      await fetchBalance()

      return result
    } catch (err) {
      throw err
    }
  }

  return {
    balance,
    loading,
    error,
    updateBalance,
    refetch: fetchBalance,
  }
}
