"use client"

import { TrendingUp, MessageSquare, ThumbsUp, ClipboardList, Users2 } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Label, Pie, PieChart, Sector, XAxis, YAxis } from "recharts"
import type { PieSectorDataItem } from "recharts/types/polar/Pie"
import { useState, useMemo } from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Chart data for visitor trends
const visitorChartData = [
  { month: "January", desktop: 186, mobile: 80, other: 45 },
  { month: "February", desktop: 305, mobile: 200, other: 100 },
  { month: "March", desktop: 237, mobile: 120, other: 150 },
  { month: "April", desktop: 73, mobile: 190, other: 50 },
  { month: "May", desktop: 209, mobile: 130, other: 100 },
  { month: "June", desktop: 214, mobile: 140, other: 160 },
]

const visitorChartConfig = {
  desktop: {
    label: "Positive",
    color: "hsl(142, 76%, 36%)", // Green
  },
  mobile: {
    label: "Neutral",
    color: "hsl(48, 96%, 53%)", // Yellow
  },
  other: {
    label: "Negative",
    color: "hsl(0, 84%, 60%)", // Red
  },
} satisfies ChartConfig

// Chart data for feedback sources
const feedbackSourceData = [
  { source: "inperson", count: 275, fill: "var(--color-inperson)" },
  { source: "kiosk", count: 200, fill: "var(--color-kiosk)" },
  { source: "website", count: 187, fill: "var(--color-website)" },
  { source: "email", count: 173, fill: "var(--color-email)" },
  { source: "other", count: 90, fill: "var(--color-other)" },
]

const feedbackSourceConfig = {
  count: {
    label: "Count",
  },
  inperson: {
    label: "In Person",
    color: "hsl(142, 76%, 36%)", // Green
  },
  kiosk: {
    label: "Kiosk",
    color: "hsl(48, 96%, 53%)", // Yellow
  },
  website: {
    label: "Website",
    color: "hsl(0, 84%, 60%)", // Red
  },
  email: {
    label: "Email",
    color: "hsl(262, 83%, 58%)", // Purple
  },
  other: {
    label: "Other",
    color: "hsl(199, 89%, 48%)", // Blue
  },
} satisfies ChartConfig

// Chart data for satisfaction by month
const satisfactionData = [
  { month: "january", satisfaction: 4.2, fill: "var(--color-january)" },
  { month: "february", satisfaction: 4.5, fill: "var(--color-february)" },
  { month: "march", satisfaction: 4.1, fill: "var(--color-march)" },
  { month: "april", satisfaction: 4.7, fill: "var(--color-april)" },
  { month: "may", satisfaction: 4.6, fill: "var(--color-may)" },
]

const satisfactionChartConfig = {
  rating: {
    label: "Rating",
  },
  satisfaction: {
    label: "Satisfaction",
  },
  january: {
    label: "January",
    color: "hsl(142, 76%, 36%)", // Green
  },
  february: {
    label: "February",
    color: "hsl(48, 96%, 53%)", // Yellow
  },
  march: {
    label: "March",
    color: "hsl(0, 84%, 60%)", // Red
  },
  april: {
    label: "April",
    color: "hsl(262, 83%, 58%)", // Purple
  },
  may: {
    label: "May",
    color: "hsl(199, 89%, 48%)", // Blue
  },
} satisfies ChartConfig

export default function DepartmentDashboard() {
  const pieChartId = "satisfaction-pie"
  const [activeMonth, setActiveMonth] = useState(satisfactionData[0].month)

  const activeIndex = useMemo(() => satisfactionData.findIndex((item) => item.month === activeMonth), [activeMonth])
  const months = useMemo(() => satisfactionData.map((item) => item.month), [])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Housekeeping Department</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your department's performance and tasks.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6/5</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Orders</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">-4 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff on Duty</CardTitle>
            <Users2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Out of 12 total staff</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Area Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Feedback Trends</CardTitle>
            <CardDescription>Showing feedback distribution for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={visitorChartConfig} className="h-[250px]">
              <AreaChart
                accessibilityLayer
                data={visitorChartData}
                margin={{
                  left: 12,
                  right: 12,
                  top: 12,
                }}
                stackOffset="expand"
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                <Area
                  dataKey="other"
                  type="natural"
                  fill="var(--color-other)"
                  fillOpacity={0.1}
                  stroke="var(--color-other)"
                  stackId="a"
                />
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="var(--color-mobile)"
                  fillOpacity={0.4}
                  stroke="var(--color-mobile)"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">January - June 2024</div>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Pie Chart */}
        <Card data-chart={pieChartId} className="flex flex-col">
          <ChartStyle id={pieChartId} config={satisfactionChartConfig} />
          <CardHeader className="flex-row items-start space-y-0 pb-0">
            <div className="grid gap-1">
              <CardTitle>Satisfaction by Month</CardTitle>
              <CardDescription>January - May 2024</CardDescription>
            </div>
            <Select value={activeMonth} onValueChange={setActiveMonth}>
              <SelectTrigger className="ml-auto h-7 w-[130px] rounded-lg pl-2.5" aria-label="Select a month">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent align="end" className="rounded-xl">
                {months.map((key) => {
                  const config = satisfactionChartConfig[key as keyof typeof satisfactionChartConfig]

                  if (!config) {
                    return null
                  }

                  return (
                    <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className="flex h-3 w-3 shrink-0 rounded-sm"
                          style={{
                            backgroundColor: `var(--color-${key})`,
                          }}
                        />
                        {config?.label}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="flex flex-1 justify-center pb-0">
            <ChartContainer id={pieChartId} config={satisfactionChartConfig} className="mx-auto h-[220px] w-full">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={satisfactionData}
                  dataKey="satisfaction"
                  nameKey="month"
                  innerRadius={60}
                  strokeWidth={5}
                  activeIndex={activeIndex}
                  activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                    <g>
                      <Sector {...props} outerRadius={outerRadius + 10} />
                      <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                    </g>
                  )}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                              {satisfactionData[activeIndex].satisfaction.toFixed(1)}
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                              Rating
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Feedback Sources</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={feedbackSourceConfig} className="h-[250px]">
              <BarChart
                accessibilityLayer
                data={feedbackSourceData}
                layout="vertical"
                margin={{
                  left: 0,
                }}
              >
                <YAxis
                  dataKey="source"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => feedbackSourceConfig[value as keyof typeof feedbackSourceConfig]?.label}
                />
                <XAxis dataKey="count" type="number" hide />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="count" layout="vertical" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Kiosk feedback up by 12% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">Showing feedback sources for the last 6 months</div>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="bg-zinc-100 dark:bg-zinc-800/50 w-full justify-start">
          <TabsTrigger value="orders">Active Orders</TabsTrigger>
          <TabsTrigger value="staff">Staff Status</TabsTrigger>
          <TabsTrigger value="feedback">Recent Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                id: "ORD-001",
                title: "Clean rooms 301-310",
                description: "Deep cleaning required for rooms 301-310. Pay special attention to bathrooms.",
                priority: "high",
                status: "in-progress",
                assignedTo: "Maria Garcia",
                dueBy: "Today, 5:00 PM",
              },
              {
                id: "ORD-002",
                title: "Restock supplies in floor 4",
                description: "Restock all cleaning supplies and amenities for rooms on floor 4.",
                priority: "medium",
                status: "pending",
                assignedTo: "Alex Thompson",
                dueBy: "Today, 3:00 PM",
              },
              {
                id: "ORD-003",
                title: "Special cleaning for VIP arrival",
                description: "Presidential suite needs special preparation for VIP guest arriving tomorrow.",
                priority: "critical",
                status: "pending",
                assignedTo: "Unassigned",
                dueBy: "Today, 6:00 PM",
              },
            ].map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-medium">{order.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">{order.description}</p>
                    </div>
                    <Badge
                      variant={
                        order.priority === "critical"
                          ? "destructive"
                          : order.priority === "high"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {order.priority}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div>
                      <span className="text-muted-foreground">Status:</span>{" "}
                      <Badge
                        variant={
                          order.status === "pending"
                            ? "outline"
                            : order.status === "in-progress"
                              ? "secondary"
                              : "default"
                        }
                        className="ml-1"
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Due:</span> <span>{order.dueBy}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ID:</span> <span>{order.id}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Assigned to:</span>{" "}
                      <span className={order.assignedTo === "Unassigned" ? "text-amber-500" : ""}>
                        {order.assignedTo}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="staff" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Maria Garcia",
                position: "Senior Housekeeper",
                status: "Active",
                currentTask: "Cleaning rooms 301-310",
                completedToday: 8,
              },
              {
                name: "Alex Thompson",
                position: "Housekeeper",
                status: "Active",
                currentTask: "Restocking supplies",
                completedToday: 5,
              },
              {
                name: "James Wilson",
                position: "Housekeeper",
                status: "Break",
                currentTask: "None",
                completedToday: 6,
              },
              {
                name: "Sarah Johnson",
                position: "Supervisor",
                status: "Active",
                currentTask: "Inspecting rooms",
                completedToday: 12,
              },
              {
                name: "David Lee",
                position: "Housekeeper",
                status: "Off Duty",
                currentTask: "None",
                completedToday: 0,
              },
              {
                name: "Lisa Chen",
                position: "Housekeeper",
                status: "Active",
                currentTask: "Special cleaning for VIP",
                completedToday: 7,
              },
            ].map((staff, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar>
                      <AvatarFallback>
                        {staff.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-medium">{staff.name}</h3>
                      <p className="text-xs text-muted-foreground">{staff.position}</p>
                    </div>
                    <Badge
                      variant={
                        staff.status === "Active" ? "default" : staff.status === "Break" ? "secondary" : "outline"
                      }
                      className="ml-auto"
                    >
                      {staff.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Current Task:</span> <span>{staff.currentTask}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Completed Today:</span>{" "}
                      <span>{staff.completedToday} tasks</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="mt-6">
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                id: "FB-001",
                guest: "John Smith",
                rating: 5,
                comment:
                  "The room was exceptionally clean and well-maintained. Housekeeping staff was very professional.",
                date: "Today, 10:30 AM",
                room: "304",
              },
              {
                id: "FB-002",
                guest: "Emily Davis",
                rating: 4,
                comment:
                  "Room was clean but there was a slight issue with the bathroom supplies not being fully restocked.",
                date: "Yesterday, 3:15 PM",
                room: "412",
              },
              {
                id: "FB-003",
                guest: "Michael Brown",
                rating: 2,
                comment:
                  "Found dust under the bed and the towels didn't seem fresh. Disappointed with the cleanliness standards.",
                date: "2 days ago",
                room: "215",
              },
            ].map((feedback) => (
              <Card key={feedback.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-medium">{feedback.guest}</h3>
                      <p className="text-xs text-muted-foreground">
                        Room {feedback.room} • {feedback.date}
                      </p>
                    </div>
                    <div className="flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < feedback.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </div>
                  </div>

                  <p className="text-sm mb-3">{feedback.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
