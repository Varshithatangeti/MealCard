"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from "recharts"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Clock, Download } from "lucide-react"

const dailySalesData = [
  { day: "Mon", sales: 1247, transactions: 89, avgTransaction: 14.02 },
  { day: "Tue", sales: 1456, transactions: 102, avgTransaction: 14.27 },
  { day: "Wed", sales: 1123, transactions: 78, avgTransaction: 14.4 },
  { day: "Thu", sales: 1789, transactions: 125, avgTransaction: 14.31 },
  { day: "Fri", sales: 2134, transactions: 156, avgTransaction: 13.68 },
  { day: "Sat", sales: 987, transactions: 67, avgTransaction: 14.73 },
  { day: "Sun", sales: 756, transactions: 45, avgTransaction: 16.8 },
]

const hourlyData = [
  { hour: "6AM", sales: 45, transactions: 3 },
  { hour: "7AM", sales: 156, transactions: 12 },
  { hour: "8AM", sales: 234, transactions: 18 },
  { hour: "9AM", sales: 189, transactions: 14 },
  { hour: "10AM", sales: 123, transactions: 9 },
  { hour: "11AM", sales: 267, transactions: 19 },
  { hour: "12PM", sales: 456, transactions: 32 },
  { hour: "1PM", sales: 389, transactions: 28 },
  { hour: "2PM", sales: 234, transactions: 17 },
  { hour: "3PM", sales: 178, transactions: 13 },
  { hour: "4PM", sales: 145, transactions: 11 },
  { hour: "5PM", sales: 298, transactions: 21 },
  { hour: "6PM", sales: 345, transactions: 24 },
  { hour: "7PM", sales: 234, transactions: 17 },
  { hour: "8PM", sales: 123, transactions: 9 },
  { hour: "9PM", sales: 89, transactions: 6 },
]

const topItems = [
  { name: "Lunch Combo", sales: 234, revenue: 2808, percentage: 18.5 },
  { name: "Coffee & Pastry", sales: 189, revenue: 1134, percentage: 15.2 },
  { name: "Breakfast Special", sales: 156, revenue: 1404, percentage: 12.8 },
  { name: "Salad Bowl", sales: 134, revenue: 1206, percentage: 11.1 },
  { name: "Pizza Slice", sales: 98, revenue: 588, percentage: 8.9 },
]

export default function SalesOverview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,247</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +8.2% from yesterday
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +12.5% from yesterday
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Transaction</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$14.02</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              -2.1% from yesterday
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12PM</div>
            <div className="text-xs text-muted-foreground">$456 in sales</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Weekly Sales Trend</CardTitle>
              <CardDescription>Daily sales performance over the past week</CardDescription>
            </div>
            <Select defaultValue="week">
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`$${value}`, name === "sales" ? "Sales" : "Transactions"]} />
                <Area type="monotone" dataKey="sales" stroke="#15803d" fill="#15803d" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hourly Sales Pattern</CardTitle>
            <CardDescription>Sales distribution throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
                <Line type="monotone" dataKey="sales" stroke="#84cc16" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Selling Items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Top Selling Items</CardTitle>
            <CardDescription>Best performing menu items today</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${item.revenue.toFixed(2)}</p>
                  <Badge variant="secondary">{item.percentage}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
