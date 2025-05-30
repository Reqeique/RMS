"use client"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

const chartData = [
  { name: "Mobile App", desktop: 0, mobile: 420, tablet: 0 },
  { name: "Website", desktop: 380, mobile: 120, tablet: 0 },
  { name: "Kiosk", desktop: 0, mobile: 0, tablet: 310 },
  { name: "In Person", desktop: 0, mobile: 0, tablet: 180 },
  { name: "Email", desktop: 290, mobile: 0, tablet: 0 },
  { name: "Phone", desktop: 0, mobile: 210, tablet: 0 },
]

export function FeedbackBarChart() {
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
          <Bar dataKey="desktop" name="Desktop" fill="#10B981" />
          <Bar dataKey="mobile" name="Mobile" fill="#FBBF24" />
          <Bar dataKey="tablet" name="Tablet/Kiosk" fill="#6366F1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
