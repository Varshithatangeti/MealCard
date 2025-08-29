import { type NextRequest, NextResponse } from "next/server"

interface User {
  id: number
  name: string
  email: string
  role: "admin" | "manager" | "cashier" | "student"
  status: "active" | "inactive"
  balance?: number
  cardNumber?: string
  createdAt: string
}

// Mock database using file system simulation
const getStoredUsers = (): User[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("campus-meal-card-database-users")
    if (stored) {
      return JSON.parse(stored)
    }
  }
  return []
}

const saveUsers = (users: User[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("campus-meal-card-database-users", JSON.stringify(users))
  }
}

const defaultUsers: User[] = [
  {
    id: 1,
    name: "System Administrator",
    email: "admin@university.edu",
    role: "admin",
    status: "active",
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "Food Service Manager",
    email: "manager@university.edu",
    role: "manager",
    status: "active",
    createdAt: "2024-01-01",
  },
  {
    id: 3,
    name: "Cafeteria Cashier",
    email: "cashier@university.edu",
    role: "cashier",
    status: "active",
    createdAt: "2024-01-01",
  },
  {
    id: 4,
    name: "John Doe",
    email: "student@university.edu",
    role: "student",
    status: "active",
    balance: 125.5,
    cardNumber: "1234567890",
    createdAt: "2024-01-15",
  },
  {
    id: 5,
    name: "Jane Smith",
    email: "jane@university.edu",
    role: "student",
    status: "active",
    balance: 89.25,
    cardNumber: "1234567891",
    createdAt: "2024-01-14",
  },
]

let users: User[] = [...defaultUsers]

// GET - Fetch all users
export async function GET() {
  try {
    console.log("[v0] Database: Fetching all users")
    const storedUsers = getStoredUsers()
    if (storedUsers.length > 0) {
      users = [...defaultUsers, ...storedUsers.filter((u) => !defaultUsers.some((d) => d.email === u.email))]
    }
    return NextResponse.json({ success: true, data: users })
  } catch (error) {
    console.error("[v0] Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 })
  }
}

// POST - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Database: Creating user with data:", body)

    const storedUsers = getStoredUsers()
    const allUsers = [...defaultUsers, ...storedUsers]

    const newId = allUsers.length > 0 ? Math.max(...allUsers.map((u) => u.id)) + 1 : 1

    const newUser: User = {
      id: newId,
      name: body.name,
      email: body.email,
      role: body.role,
      status: "active",
      balance: body.role === "student" ? 0 : undefined,
      cardNumber: body.role === "student" ? `123456${newId.toString().padStart(4, "0")}` : undefined,
      createdAt: new Date().toISOString().split("T")[0],
    }

    const updatedStoredUsers = [...storedUsers, newUser]
    saveUsers(updatedStoredUsers)

    users = [...defaultUsers, ...updatedStoredUsers]
    console.log("[v0] Database: User created successfully:", newUser)

    return NextResponse.json({ success: true, data: newUser })
  } catch (error) {
    console.error("[v0] Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 })
  }
}

// PUT - Update user
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Database: Updating user:", body)

    const userIndex = users.findIndex((u) => u.id === body.id)
    if (userIndex === -1) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    users[userIndex] = { ...users[userIndex], ...body }
    console.log("[v0] Database: User updated successfully:", users[userIndex])

    // Save updated users to localStorage
    const storedUsers = getStoredUsers()
    const updatedStoredUsers = storedUsers.map((u) => (u.id === body.id ? users[userIndex] : u))
    saveUsers(updatedStoredUsers)

    return NextResponse.json({ success: true, data: users[userIndex] })
  } catch (error) {
    console.error("[v0] Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 })
  }
}

// DELETE - Delete user
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = Number.parseInt(searchParams.get("id") || "0")
    console.log("[v0] Database: Deleting user with ID:", userId)

    const userIndex = users.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 })
    }

    const deletedUser = users.splice(userIndex, 1)[0]
    console.log("[v0] Database: User deleted successfully:", deletedUser)

    // Remove deleted user from localStorage
    const storedUsers = getStoredUsers()
    const updatedStoredUsers = storedUsers.filter((u) => u.id !== userId)
    saveUsers(updatedStoredUsers)

    return NextResponse.json({ success: true, data: deletedUser })
  } catch (error) {
    console.error("[v0] Database error:", error)
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 })
  }
}
