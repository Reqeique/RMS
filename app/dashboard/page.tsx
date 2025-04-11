"use client"

import { Tooltip } from "@/components/ui/tooltip"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ArrowUpRight, Users, MessageSquare, AlertTriangle, ClipboardList, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for dashboard
const overviewData = [
  { name: "Jan", feedback: 65, issues: 25, orders: 40 },
  { name: "Feb", feedback: 59, issues: 30, orders: 45 },
  { name: "Mar", feedback: 80, issues: 15, orders: 60 },
  { name: "Apr", feedback: 55, issues: 30, orders: 50 },
  { name: "May", feedback: 40, issues: 35, orders: 55 },
  { name: "Jun", feedback: 70, issues: 20, orders: 65 },
]

const sentimentData = [
  { name: "Positive", value: 65 },
  { name: "Neutral", value: 25 },
  { name: "Negative", value: 10 },
]

const departmentPerformanceData = [
  { name: "Housekeeping", score: 85 },
  { name: "Front Desk", score: 92 },
  { name: "F&B", score: 78 },
  { name: "Maintenance", score: 88 },
  { name: "Spa", score: 95 },
]

const COLORS = ["#4ade80", "#facc15", "#f87171"]

const overviewChartConfig = {
  feedback: {
    label: "Feedback",
    color: "hsl(142, 76%, 36%)", // Green
  },
  issues: {
    label: "Issues",
    color: "hsl(0, 84%, 60%)", // Red
  },
  orders: {
    label: "Orders",
    color: "hsl(217, 91%, 60%)", // Blue
  },
} satisfies ChartConfig

const departmentChartConfig = {
  score: {
    label: "Performance Score",
    color: "hsl(217, 91%, 60%)", // Blue
  },
} satisfies ChartConfig

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("30days")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground">Welcome back to your dashboard</p>
        </div>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="year">This year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 inline-flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +12.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +8.2%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 inline-flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +18.7%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 inline-flex items-center">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                +3.1%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Activity Overview</CardTitle>
                <CardDescription>Feedback, issues, and orders over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={overviewChartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={overviewData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="feedback" stroke="var(--color-feedback)" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="issues" stroke="var(--color-issues)" />
                      <Line type="monotone" dataKey="orders" stroke="var(--color-orders)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Sentiment Distribution</CardTitle>
                <CardDescription>Feedback sentiment breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Performance scores across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={departmentChartConfig} className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={departmentPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="score" fill="var(--color-score)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "New feedback received",
                      description: "A guest submitted feedback about room service",
                      time: "5 minutes ago",
                      type: "feedback",
                    },
                    {
                      title: "Issue resolved",
                      description: "AC issue in room 415 was fixed",
                      time: "30 minutes ago",
                      type: "issue",
                    },
                    {
                      title: "Order completed",
                      description: "Housekeeping completed room cleaning order",
                      time: "1 hour ago",
                      type: "order",
                    },
                    {
                      title: "New staff registered",
                      description: "Maria Garcia was added to Housekeeping",
                      time: "2 hours ago",
                      type: "staff",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`rounded-full p-2 ${
                          item.type === "feedback"
                            ? "bg-green-100 text-green-600"
                            : item.type === "issue"
                              ? "bg-red-100 text-red-600"
                              : item.type === "order"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-purple-100 text-purple-600"
                        }`}
                      >
                        {item.type === "feedback" ? (
                          <MessageSquare className="h-4 w-4" />
                        ) : item.type === "issue" ? (
                          <AlertTriangle className="h-4 w-4" />
                        ) : item.type === "order" ? (
                          <ClipboardList className="h-4 w-4" />
                        ) : (
                          <Users className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Trends</CardTitle>
              <CardDescription>Feedback volume and sentiment over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={overviewData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="feedback" stroke="#4ade80" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { name: "Housekeeping", issues: 12, orders: 24, feedback: 85, sentiment: "positive" },
              { name: "Front Desk", issues: 5, orders: 18, feedback: 92, sentiment: "positive" },
              { name: "Food & Beverage", issues: 8, orders: 30, feedback: 78, sentiment: "neutral" },
              { name: "Maintenance", issues: 15, orders: 22, feedback: 88, sentiment: "positive" },
              { name: "Spa & Wellness", issues: 3, orders: 15, feedback: 95, sentiment: "positive" },
            ].map((dept) => (
              <Card key={dept.name}>
                <CardHeader>
                  <CardTitle>{dept.name}</CardTitle>
                  <CardDescription>Department performance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Feedback Score</p>
                        <p className="text-2xl font-bold">{dept.feedback}%</p>
                      </div>
                      <Badge
                        variant={
                          dept.sentiment === "positive"
                            ? "default"
                            : dept.sentiment === "neutral"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {dept.sentiment}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Open Issues</p>
                        <p className="text-xl font-bold">{dept.issues}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Active Orders</p>
                        <p className="text-xl font-bold">{dept.orders}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
