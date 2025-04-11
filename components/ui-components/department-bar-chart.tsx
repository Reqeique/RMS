"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

const chartData = [
  { name: "Housekeeping", performance: 85, target: 90 },
  { name: "Front Desk", performance: 92, target: 90 },
  { name: "Food & Beverage", performance: 78, target: 85 },
  { name: "Maintenance", performance: 75, target: 80 },
  { name: "Concierge", performance: 94, target: 90 },
  { name: "Spa", performance: 88, target: 85 },
  { name: "Security", performance: 91, target: 90 },
  { name: "Valet", performance: 82, target: 85 },
]

export function DepartmentBarChart() {
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
          <Bar dataKey="performance" name="Performance Score" fill="#FBBF24" />
          <Bar dataKey="target" name="Target" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
