"use client"

import { useState } from "react"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const initialData = [
  { category: "Room Cleanliness", value: 85, fullMark: 100 },
  { category: "Staff Service", value: 92, fullMark: 100 },
  { category: "Food Quality", value: 78, fullMark: 100 },
  { category: "Amenities", value: 65, fullMark: 100 },
  { category: "Check-in/out", value: 88, fullMark: 100 },
  { category: "Value for Money", value: 72, fullMark: 100 },
  { category: "Location", value: 95, fullMark: 100 },
  { category: "Wi-Fi", value: 68, fullMark: 100 },
]

const timeRanges = {
  "7days": [
    { category: "Room Cleanliness", value: 82, fullMark: 100 },
    { category: "Staff Service", value: 90, fullMark: 100 },
    { category: "Food Quality", value: 75, fullMark: 100 },
    { category: "Amenities", value: 62, fullMark: 100 },
    { category: "Check-in/out", value: 85, fullMark: 100 },
    { category: "Value for Money", value: 70, fullMark: 100 },
    { category: "Location", value: 95, fullMark: 100 },
    { category: "Wi-Fi", value: 65, fullMark: 100 },
  ],
  "30days": initialData,
  "90days": [
    { category: "Room Cleanliness", value: 87, fullMark: 100 },
    { category: "Staff Service", value: 94, fullMark: 100 },
    { category: "Food Quality", value: 80, fullMark: 100 },
    { category: "Amenities", value: 68, fullMark: 100 },
    { category: "Check-in/out", value: 90, fullMark: 100 },
    { category: "Value for Money", value: 75, fullMark: 100 },
    { category: "Location", value: 96, fullMark: 100 },
    { category: "Wi-Fi", value: 72, fullMark: 100 },
  ],
  year: [
    { category: "Room Cleanliness", value: 83, fullMark: 100 },
    { category: "Staff Service", value: 91, fullMark: 100 },
    { category: "Food Quality", value: 76, fullMark: 100 },
    { category: "Amenities", value: 70, fullMark: 100 },
    { category: "Check-in/out", value: 87, fullMark: 100 },
    { category: "Value for Money", value: 74, fullMark: 100 },
    { category: "Location", value: 94, fullMark: 100 },
    { category: "Wi-Fi", value: 69, fullMark: 100 },
  ],
}

const departments = {
  all: initialData,
  housekeeping: [
    { category: "Room Cleanliness", value: 85, fullMark: 100 },
    { category: "Amenities", value: 65, fullMark: 100 },
    { category: "Value for Money", value: 72, fullMark: 100 },
  ],
  frontdesk: [
    { category: "Staff Service", value: 92, fullMark: 100 },
    { category: "Check-in/out", value: 88, fullMark: 100 },
  ],
  food: [
    { category: "Food Quality", value: 78, fullMark: 100 },
    { category: "Value for Money", value: 72, fullMark: 100 },
  ],
}

export function InteractiveRadarChart() {
  const [timeRange, setTimeRange] = useState<string>("30days")
  const [department, setDepartment] = useState<string>("all")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Determine which data to show based on filters
  let chartData = timeRanges[timeRange as keyof typeof timeRanges]

  if (department !== "all") {
    chartData = departments[department as keyof typeof departments]
  }

  // Filter data if a category is active
  const displayData = activeCategory ? chartData.filter((item) => item.category === activeCategory) : chartData

  const handleCategoryClick = (dataKey: string) => {
    if (activeCategory === dataKey) {
      setActiveCategory(null) // Toggle off if already selected
    } else {
      setActiveCategory(dataKey)
    }
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-zinc-800 p-2 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-md">
          <p className="font-medium text-sm">{payload[0].payload.category}</p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Score: <span className="font-medium">{payload[0].value}</span>/100
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Feedback by Category</CardTitle>
            <CardDescription>Interactive visualization of feedback scores</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
              </SelectContent>
            </Select>

            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="housekeeping">Housekeeping</SelectItem>
                <SelectItem value="frontdesk">Front Desk</SelectItem>
                <SelectItem value="food">Food & Beverage</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={displayData}>
              <PolarGrid stroke="#374151" opacity={0.2} />
              <PolarAngleAxis
                dataKey="category"
                tick={{
                  fill: "#6B7280",
                  fontSize: 10,
                  cursor: "pointer",
                }}
                tickFormatter={(value) => {
                  // Truncate long category names
                  return value.length > 10 ? `${value.substring(0, 10)}...` : value
                }}
                onClick={(data) => handleCategoryClick(data.value)}
              />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#6B7280", fontSize: 10 }} />
              <Radar
                name="Feedback Score"
                dataKey="value"
                stroke="#FBBF24"
                fill="#FBBF24"
                fillOpacity={0.5}
                animationDuration={500}
                animationEasing="ease-out"
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
          {chartData.map((item) => (
            <div
              key={item.category}
              className={`p-2 border rounded-md cursor-pointer transition-all ${
                activeCategory === item.category || !activeCategory
                  ? "border-primary bg-primary/5"
                  : "border-zinc-200 dark:border-zinc-800"
              }`}
              onClick={() => handleCategoryClick(item.category)}
            >
              <div className="text-xs font-medium">{item.category}</div>
              <div className="text-sm font-bold">{item.value}/100</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
