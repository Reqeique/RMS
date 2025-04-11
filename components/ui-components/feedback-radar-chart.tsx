"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts"

const chartData = [
  { category: "Room Cleanliness", value: 85 },
  { category: "Staff Service", value: 92 },
  { category: "Food Quality", value: 78 },
  { category: "Amenities", value: 65 },
  { category: "Check-in/out", value: 88 },
  { category: "Value for Money", value: 72 },
  { category: "Location", value: 95 },
  { category: "Wi-Fi", value: 68 },
]

export function FeedbackRadarChart() {
  return (
    <div className="flex flex-col h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#374151" opacity={0.2} />
          <PolarAngleAxis dataKey="category" tick={{ fill: "#6B7280", fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#6B7280", fontSize: 10 }} />
          <Radar name="Feedback Score" dataKey="value" stroke="#FBBF24" fill="#FBBF24" fillOpacity={0.5} />
        </RadarChart>
      </ResponsiveContainer>
      <div className="flex justify-center items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mt-2">
        <TrendingUp className="h-4 w-4 text-emerald-500" />
        <span>Showing feedback scores across categories (0-100)</span>
      </div>
    </div>
  )
}
