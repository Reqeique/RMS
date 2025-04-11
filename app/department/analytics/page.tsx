"use client"

import { useState } from "react"
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
  Tooltip,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Download,
  TrendingUp,
  Users,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react"

// Sample data for department analytics
const monthlyFeedbackData = [
  { name: "Jan", positive: 65, neutral: 25, negative: 10 },
  { name: "Feb", positive: 59, neutral: 30, negative: 11 },
  { name: "Mar", positive: 80, neutral: 15, negative: 5 },
  { name: "Apr", positive: 55, neutral: 30, negative: 15 },
  { name: "May", positive: 40, neutral: 35, negative: 25 },
  { name: "Jun", positive: 70, neutral: 20, negative: 10 },
]

const feedbackTypeData = [
  { name: "Cleanliness", value: 45 },
  { name: "Staff Attitude", value: 25 },
  { name: "Response Time", value: 15 },
  { name: "Amenities", value: 10 },
  { name: "Other", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const staffPerformanceData = [
  { name: "Maria G.", cleanliness: 90, attitude: 95, speed: 85 },
  { name: "Alex T.", cleanliness: 85, attitude: 90, speed: 95 },
  { name: "James W.", cleanliness: 80, attitude: 85, speed: 75 },
  { name: "Sarah J.", cleanliness: 95, attitude: 90, speed: 90 },
  { name: "David L.", cleanliness: 75, attitude: 80, speed: 85 },
]

const radarData = [
  { subject: "Cleanliness", A: 85, fullMark: 100 },
  { subject: "Staff Attitude", A: 90, fullMark: 100 },
  { subject: "Response Time", A: 78, fullMark: 100 },
  { subject: "Amenities", A: 92, fullMark: 100 },
  { subject: "Value", A: 88, fullMark: 100 },
  { subject: "Overall", A: 87, fullMark: 100 },
]

const issueResolutionData = [
  { name: "Jan", resolved: 45, new: 50 },
  { name: "Feb", resolved: 55, new: 45 },
  { name: "Mar", resolved: 60, new: 40 },
  { name: "Apr", resolved: 50, new: 55 },
  { name: "May", resolved: 65, new: 45 },
  { name: "Jun", resolved: 70, new: 40 },
]

const feedbackChartConfig = {
  positive: {
    label: "Positive",
    color: "hsl(142, 76%, 36%)", // Green
  },
  neutral: {
    label: "Neutral",
    color: "hsl(48, 96%, 53%)", // Yellow
  },
  negative: {
    label: "Negative",
    color: "hsl(0, 84%, 60%)", // Red
  },
} satisfies ChartConfig

const staffChartConfig = {
  cleanliness: {
    label: "Cleanliness",
    color: "hsl(142, 76%, 36%)", // Green
  },
  attitude: {
    label: "Attitude",
    color: "hsl(48, 96%, 53%)", // Yellow
  },
  speed: {
    label: "Speed",
    color: "hsl(0, 84%, 60%)", // Red
  },
} satisfies ChartConfig

const feedbackTypeConfig = {
  cleanliness: {
    label: "Cleanliness",
    color: "hsl(142, 76%, 36%)", // Green
  },
  "staff attitude": {
    label: "Staff Attitude",
    color: "hsl(48, 96%, 53%)", // Yellow
  },
  "response time": {
    label: "Response Time",
    color: "hsl(0, 84%, 60%)", // Red
  },
  amenities: {
    label: "Amenities",
    color: "hsl(262, 83%, 58%)", // Purple
  },
  other: {
    label: "Other",
    color: "hsl(199, 89%, 48%)", // Blue
  },
} satisfies ChartConfig

const issueChartConfig = {
  resolved: {
    label: "Resolved Issues",
    color: "hsl(142, 76%, 36%)", // Green
  },
  new: {
    label: "New Issues",
    color: "hsl(0, 84%, 60%)", // Red
  },
} satisfies ChartConfig

export default function DepartmentAnalytics() {
  const [timeRange, setTimeRange] = useState("6months")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Department Analytics</h1>
          <p className="text-sm text-muted-foreground">Detailed analysis of department performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedback Score</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <div className="flex items-center">
              <span className="text-xs text-emerald-500 inline-flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +5.2%
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center">
              <span className="text-xs text-red-500 inline-flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +2
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff Performance</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <div className="flex items-center">
              <span className="text-xs text-emerald-500 inline-flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +3.1%
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <div className="flex items-center">
              <span className="text-xs text-emerald-500 inline-flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +1.8%
              </span>
              <span className="text-xs text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="feedback" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-auto w-full">
          <TabsTrigger value="feedback">Feedback Analysis</TabsTrigger>
          <TabsTrigger value="staff">Staff Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="issues">Issue Resolution</TabsTrigger>
        </TabsList>

        <TabsContent value="feedback" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Feedback Distribution</CardTitle>
                <CardDescription>Breakdown of feedback by sentiment</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={feedbackChartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyFeedbackData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="positive" stackId="a" fill="var(--color-positive)" />
                      <Bar dataKey="neutral" stackId="a" fill="var(--color-neutral)" />
                      <Bar dataKey="negative" stackId="a" fill="var(--color-negative)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback by Type</CardTitle>
                <CardDescription>What guests are commenting on</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={feedbackTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {feedbackTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Feedback Sentiment Over Time</CardTitle>
              <CardDescription>Trend analysis of feedback sentiment</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={feedbackChartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyFeedbackData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="positive"
                      stackId="1"
                      stroke="var(--color-positive)"
                      fill="var(--color-positive)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="neutral"
                      stackId="1"
                      stroke="var(--color-neutral)"
                      fill="var(--color-neutral)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="negative"
                      stackId="1"
                      stroke="var(--color-negative)"
                      fill="var(--color-negative)"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Staff Performance Metrics</CardTitle>
                <CardDescription>Performance across key metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={staffChartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={staffPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="cleanliness" fill="var(--color-cleanliness)" />
                      <Bar dataKey="attitude" fill="var(--color-attitude)" />
                      <Bar dataKey="speed" fill="var(--color-speed)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Department Performance Radar</CardTitle>
                <CardDescription>Holistic view of department performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="Department" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Staff Leaderboard</CardTitle>
              <CardDescription>Top performing staff members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {staffPerformanceData
                  .sort((a, b) => {
                    const aAvg = (a.cleanliness + a.attitude + a.speed) / 3
                    const bAvg = (b.cleanliness + b.attitude + b.speed) / 3
                    return bAvg - aAvg
                  })
                  .map((staff, index) => {
                    const avgScore = ((staff.cleanliness + staff.attitude + staff.speed) / 3).toFixed(1)
                    return (
                      <div key={staff.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{staff.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>Cleanliness: {staff.cleanliness}%</span>
                              <span>•</span>
                              <span>Attitude: {staff.attitude}%</span>
                              <span>•</span>
                              <span>Speed: {staff.speed}%</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"}>
                          {avgScore}%
                        </Badge>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Satisfaction Trends</CardTitle>
              <CardDescription>How satisfaction has changed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={feedbackChartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyFeedbackData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="positive" stroke="var(--color-positive)" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="neutral" stroke="var(--color-neutral)" />
                    <Line type="monotone" dataKey="negative" stroke="var(--color-negative)" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Performance metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyFeedbackData.map((month) => {
                    const total = month.positive + month.neutral + month.negative
                    const positivePercent = ((month.positive / total) * 100).toFixed(1)
                    const neutralPercent = ((month.neutral / total) * 100).toFixed(1)
                    const negativePercent = ((month.negative / total) * 100).toFixed(1)

                    return (
                      <div key={month.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{month.name}</span>
                          </div>
                          <Badge variant={Number(positivePercent) > 70 ? "default" : "secondary"}>
                            {positivePercent}% Positive
                          </Badge>
                        </div>
                        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className="flex h-full">
                            <div className="bg-green-500 h-full" style={{ width: `${positivePercent}%` }} />
                            <div className="bg-yellow-500 h-full" style={{ width: `${neutralPercent}%` }} />
                            <div className="bg-red-500 h-full" style={{ width: `${negativePercent}%` }} />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>Important trends and patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Positive feedback increasing",
                      description: "Positive feedback has increased by 15% over the last quarter.",
                      trend: "positive",
                    },
                    {
                      title: "Staff attitude improvement",
                      description: "Staff attitude ratings have improved significantly in the last month.",
                      trend: "positive",
                    },
                    {
                      title: "Response time concerns",
                      description: "Response time ratings have decreased slightly in the past 30 days.",
                      trend: "negative",
                    },
                    {
                      title: "Cleanliness consistency",
                      description: "Cleanliness ratings have remained consistently high throughout the period.",
                      trend: "neutral",
                    },
                  ].map((insight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={`rounded-full p-2 ${
                          insight.trend === "positive"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : insight.trend === "negative"
                              ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                              : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}
                      >
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{insight.title}</p>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Issue Resolution Trends</CardTitle>
              <CardDescription>New vs. resolved issues over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={issueChartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={issueResolutionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="resolved"
                      stroke="var(--color-resolved)"
                      fill="var(--color-resolved)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="new"
                      stroke="var(--color-new)"
                      fill="var(--color-new)"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Issue Categories</CardTitle>
                <CardDescription>Breakdown of issues by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Maintenance", value: 35 },
                          { name: "Cleanliness", value: 25 },
                          { name: "Service", value: 20 },
                          { name: "Amenities", value: 15 },
                          { name: "Other", value: 5 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {feedbackTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resolution Time</CardTitle>
                <CardDescription>Average time to resolve issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Maintenance", time: "2.5 days", trend: "improving" },
                    { category: "Cleanliness", time: "1.2 days", trend: "improving" },
                    { category: "Service", time: "0.8 days", trend: "stable" },
                    { category: "Amenities", time: "3.1 days", trend: "worsening" },
                    { category: "Other", time: "1.5 days", trend: "stable" },
                  ].map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.category}</p>
                        <p className="text-sm text-muted-foreground">Avg. resolution time</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.time}</p>
                        <p
                          className={`text-xs ${
                            item.trend === "improving"
                              ? "text-green-500"
                              : item.trend === "worsening"
                                ? "text-red-500"
                                : "text-yellow-500"
                          }`}
                        >
                          {item.trend === "improving"
                            ? "↓ Improving"
                            : item.trend === "worsening"
                              ? "↑ Worsening"
                              : "→ Stable"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
