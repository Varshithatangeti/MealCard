"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Download, FileText, TrendingUp, DollarSign, Calendar } from "lucide-react"

const monthlyRevenueData = [
  { month: "Jan", revenue: 32450, transactions: 2340, customers: 456 },
  { month: "Feb", revenue: 28900, transactions: 2100, customers: 423 },
  { month: "Mar", revenue: 35600, transactions: 2580, customers: 489 },
  { month: "Apr", revenue: 31200, transactions: 2250, customers: 445 },
  { month: "May", revenue: 38900, transactions: 2890, customers: 512 },
  { month: "Jun", revenue: 42300, transactions: 3120, customers: 534 },
]

const customerSegmentData = [
  { segment: "Students", count: 1156, percentage: 85.2, color: "#15803d" },
  { segment: "Faculty", count: 134, percentage: 9.9, color: "#84cc16" },
  { segment: "Staff", count: 45, percentage: 3.3, color: "#f59e0b" },
  { segment: "Visitors", count: 21, percentage: 1.6, color: "#dc2626" },
]

const peakHoursData = [
  { hour: "7AM", usage: 12 },
  { hour: "8AM", usage: 28 },
  { hour: "9AM", usage: 15 },
  { hour: "10AM", usage: 8 },
  { hour: "11AM", usage: 22 },
  { hour: "12PM", usage: 45 },
  { hour: "1PM", usage: 38 },
  { hour: "2PM", usage: 25 },
  { hour: "3PM", usage: 18 },
  { hour: "4PM", usage: 12 },
  { hour: "5PM", usage: 32 },
  { hour: "6PM", usage: 28 },
  { hour: "7PM", usage: 15 },
  { hour: "8PM", usage: 8 },
]

const reportTemplates = [
  {
    name: "Daily Sales Report",
    description: "Comprehensive daily sales and transaction summary",
    frequency: "Daily",
    lastGenerated: "2024-01-15 09:00",
  },
  {
    name: "Weekly Performance",
    description: "Weekly sales trends and customer analytics",
    frequency: "Weekly",
    lastGenerated: "2024-01-14 18:00",
  },
  {
    name: "Monthly Financial",
    description: "Monthly revenue, costs, and profit analysis",
    frequency: "Monthly",
    lastGenerated: "2024-01-01 08:00",
  },
  {
    name: "Inventory Status",
    description: "Current inventory levels and restock recommendations",
    frequency: "Weekly",
    lastGenerated: "2024-01-14 16:30",
  },
]

export default function ReportsAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedReport, setSelectedReport] = useState("sales")
  const { toast } = useToast()

  const handleExportAll = () => {
    toast({
      title: "Exporting Reports",
      description: "All reports are being generated and will be downloaded shortly.",
    })

    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "All reports have been exported successfully.",
      })
    }, 2000)
  }

  const handleGenerateReport = (reportName: string) => {
    toast({
      title: "Generating Report",
      description: `${reportName} is being generated...`,
    })

    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Generated",
        description: `${reportName} has been generated and downloaded.`,
      })
    }, 1500)
  }

  const handleScheduleReport = (reportName: string) => {
    toast({
      title: "Report Scheduled",
      description: `${reportName} has been scheduled for automatic generation.`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Reports & Analytics</h3>
          <p className="text-sm text-muted-foreground">Generate insights and export detailed reports</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExportAll}>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
          <TabsTrigger value="customers">Customer Insights</TabsTrigger>
          <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
          <TabsTrigger value="reports">Report Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$42,300</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +8.7% from last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Transaction</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$13.56</div>
                <div className="text-xs text-muted-foreground">Per transaction</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12.4%</div>
                <div className="text-xs text-muted-foreground">Month over month</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue performance over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#15803d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Distribution of customers by type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={customerSegmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ segment, percentage }) => `${segment}: ${percentage}%`}
                    >
                      {customerSegmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Growth</CardTitle>
                <CardDescription>New customers acquired monthly</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, "New Customers"]} />
                    <Line type="monotone" dataKey="customers" stroke="#84cc16" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Customer Insights</CardTitle>
              <CardDescription>Key customer metrics and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {customerSegmentData.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: segment.color }} />
                        <span className="font-medium">{segment.segment}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{segment.count}</p>
                        <Badge variant="secondary">{segment.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Average Spending</h4>
                    <p className="text-2xl font-bold">$127.50</p>
                    <p className="text-sm text-muted-foreground">Per customer per month</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Retention Rate</h4>
                    <p className="text-2xl font-bold">89.2%</p>
                    <p className="text-sm text-muted-foreground">Monthly retention</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Peak Usage Hours</CardTitle>
              <CardDescription>System usage patterns throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={peakHoursData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, "Transactions"]} />
                  <Bar dataKey="usage" fill="#84cc16" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Busiest Days</CardTitle>
                <CardDescription>Weekly usage distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => {
                    const usage = [85, 92, 78, 95, 100, 45, 32][index]
                    return (
                      <div key={day} className="flex items-center justify-between">
                        <span className="font-medium">{day}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${usage}%` }} />
                          </div>
                          <span className="text-sm text-muted-foreground w-8">{usage}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Average Response Time</span>
                    <Badge variant="default">1.2s</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Success Rate</span>
                    <Badge variant="default">99.8%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Peak Concurrent Users</span>
                    <Badge variant="secondary">156</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Daily Active Users</span>
                    <Badge variant="secondary">423</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>Pre-configured reports for regular analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTemplates.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{report.frequency}</Badge>
                          <span className="text-xs text-muted-foreground">Last: {report.lastGenerated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleScheduleReport(report.name)}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                      <Button size="sm" onClick={() => handleGenerateReport(report.name)}>
                        <Download className="h-4 w-4 mr-2" />
                        Generate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
