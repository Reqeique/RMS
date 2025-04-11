"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar, TrendingUp } from "lucide-react"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for performance analysis
const monthlyPerformanceData = [
  { month: "Jan", satisfaction: 4.2, efficiency: 85, response: 92 },
  { month: "Feb", satisfaction: 4.5, efficiency: 88, response: 90 },
  { month: "Mar", satisfaction: 4.1, efficiency: 82, response: 85 },
  { month: "Apr", satisfaction: 4.7, efficiency: 90, response: 95 },
  { month: "May", satisfaction: 4.6, efficiency: 89, response: 93 },
  { month: "Jun", satisfaction: 4.8, efficiency: 92, response: 96 },
]

const staffPerformanceData = [
  {
    name: "Maria G.",
    cleanliness: 90,
    attitude: 95,
    speed: 85,
    attention: 88,
    knowledge: 92,
  },
  {
    name: "Alex T.",
    cleanliness: 85,
    attitude: 90,
    speed: 95,
    attention: 82,
    knowledge: 88,
  },
  {
    name: "James W.",
    cleanliness: 80,
    attitude: 85,
    speed: 75,
    attention: 78,
    knowledge: 80,
  },
  {
    name: "Sarah J.",
    cleanliness: 95,
    attitude: 90,
    speed: 90,
    attention: 92,
    knowledge: 94,
  },
  {
    name: "David L.",
    cleanliness: 75,
    attitude: 80,
    speed: 85,
    attention: 70,
    knowledge: 75,
  },
]

const departmentComparisonData = [
  { name: "Housekeeping", value: 87 },
  { name: "Front Desk", value: 92 },
  { name: "Restaurant", value: 85 },
  { name: "Maintenance", value: 78 },
  { name: "Spa", value: 90 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const performanceChartConfig = {
  satisfaction: {
    label: "Satisfaction",
    color: "hsl(142, 76%, 36%)", // Green
  },
  efficiency: {
    label: "Efficiency",
    color: "hsl(48, 96%, 53%)", // Yellow
  },
  response: {
    label: "Response Time",
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

const radarChartConfig = {
  radar: {
    label: "Performance",
    color: "hsl(262, 83%, 58%)", // Purple
  },
} satisfies ChartConfig

const departmentComparisonConfig = {
  value: {
    label: "Performance Score",
  },
  housekeeping: {
    label: "Housekeeping",
    color: "hsl(142, 76%, 36%)", // Green
  },
  "front desk": {
    label: "Front Desk",
    color: "hsl(48, 96%, 53%)", // Yellow
  },
  restaurant: {
    label: "Restaurant",
    color: "hsl(0, 84%, 60%)", // Red
  },
  maintenance: {
    label: "Maintenance",
    color: "hsl(262, 83%, 58%)", // Purple
  },
  spa: {
    label: "Spa",
    color: "hsl(199, 89%, 48%)", // Blue
  },
} satisfies ChartConfig

export default function PerformanceAnalysis() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedStaff, setSelectedStaff] = useState("Maria G.")

  const selectedStaffData = staffPerformanceData.find((staff) => staff.name === selectedStaff)
  const radarData = selectedStaffData
    ? [
        { subject: "Cleanliness", A: selectedStaffData.cleanliness, fullMark: 100 },
        { subject: "Attitude", A: selectedStaffData.attitude, fullMark: 100 },
        { subject: "Speed", A: selectedStaffData.speed, fullMark: 100 },
        { subject: "Attention to Detail", A: selectedStaffData.attention, fullMark: 100 },
        { subject: "Knowledge", A: selectedStaffData.knowledge, fullMark: 100 },
      ]
    : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Performance Analysis</h1>
          <p className="text-sm text-muted-foreground">Detailed analysis of department performance metrics</p>
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
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">4.5/5</div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.3 from last month
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">89%</div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +4% from last month
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">93%</div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +1% from last month
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="staff">Staff Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Department Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics Over Time</CardTitle>
              <CardDescription>How key metrics have changed over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={performanceChartConfig} className="h-[300px]">
                <LineChart data={monthlyPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" domain={[0, 5]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="satisfaction"
                    stroke="var(--color-satisfaction)"
                    activeDot={{ r: 8 }}
                  />
                  <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="var(--color-efficiency)" />
                  <Line yAxisId="right" type="monotone" dataKey="response" stroke="var(--color-response)" />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Staff Performance Comparison</CardTitle>
                <CardDescription>Performance metrics across all staff members</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={staffChartConfig} className="h-[300px]">
                  <BarChart data={staffPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="cleanliness" fill="var(--color-cleanliness)" />
                    <Bar dataKey="attitude" fill="var(--color-attitude)" />
                    <Bar dataKey="speed" fill="var(--color-speed)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Individual Staff Analysis</CardTitle>
                <CardDescription>Detailed performance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Select defaultValue={selectedStaff} onValueChange={setSelectedStaff}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select staff member" />
                    </SelectTrigger>
                    <SelectContent>
                      {staffPerformanceData.map((staff) => (
                        <SelectItem key={staff.name} value={staff.name}>
                          {staff.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <ChartContainer config={radarChartConfig} className="h-[300px]">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name={selectedStaff}
                      dataKey="A"
                      stroke="var(--color-radar)"
                      fill="var(--color-radar)"
                      fillOpacity={0.6}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Comparison</CardTitle>
              <CardDescription>How your department compares to others</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={departmentComparisonConfig} className="h-[300px]">
                <BarChart
                  data={departmentComparisonData}
                  layout="vertical"
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8">
                    {departmentComparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`var(--color-${entry.name.toLowerCase()})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
