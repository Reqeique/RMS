"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

const chartData = [
  { name: "Housekeeping", positive: 82, neutral: 10, negative: 8 },
  { name: "Front Desk", positive: 88, neutral: 8, negative: 4 },
  { name: "F&B", positive: 75, neutral: 15, negative: 10 },
  { name: "Maintenance", positive: 70, neutral: 18, negative: 12 },
  { name: "Concierge", positive: 92, neutral: 5, negative: 3 },
  { name: "Spa", positive: 85, neutral: 10, negative: 5 },
]

export function SentimentByDepartmentChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
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
          <Bar dataKey="positive" name="Positive" stackId="a" fill="#10B981" />
          <Bar dataKey="neutral" name="Neutral" stackId="a" fill="#FBBF24" />
          <Bar dataKey="negative" name="Negative" stackId="a" fill="#EF4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
