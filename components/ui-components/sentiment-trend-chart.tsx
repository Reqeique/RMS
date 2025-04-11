"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

const chartData = [
  { date: "Jan", positive: 75, neutral: 15, negative: 10 },
  { date: "Feb", positive: 72, neutral: 18, negative: 10 },
  { date: "Mar", positive: 78, neutral: 14, negative: 8 },
  { date: "Apr", positive: 76, neutral: 15, negative: 9 },
  { date: "May", positive: 80, neutral: 12, negative: 8 },
  { date: "Jun", positive: 82, neutral: 10, negative: 8 },
  { date: "Jul", positive: 85, neutral: 9, negative: 6 },
  { date: "Aug", positive: 84, neutral: 10, negative: 6 },
  { date: "Sep", positive: 78, neutral: 14, negative: 8 },
  { date: "Oct", positive: 80, neutral: 12, negative: 8 },
  { date: "Nov", positive: 82, neutral: 11, negative: 7 },
  { date: "Dec", positive: 85, neutral: 10, negative: 5 },
]

export function SentimentTrendChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis dataKey="date" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              borderColor: "#374151",
              borderRadius: "0.375rem",
              fontSize: "0.75rem",
            }}
            itemStyle={{ color: "#E5E7EB" }}
            labelStyle={{ color: "#9CA3AF", fontWeight: "bold", marginBottom: "0.25rem" }}
          />
          <Legend />
          <Line type="monotone" dataKey="positive" name="Positive" stroke="#10B981" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="neutral" name="Neutral" stroke="#FBBF24" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="negative" name="Negative" stroke="#EF4444" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
