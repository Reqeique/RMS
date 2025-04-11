"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Jan", total: 125, positive: 95, negative: 30 },
  { name: "Feb", total: 148, positive: 110, negative: 38 },
  { name: "Mar", total: 172, positive: 135, negative: 37 },
  { name: "Apr", total: 159, positive: 120, negative: 39 },
  { name: "May", total: 182, positive: 145, negative: 37 },
  { name: "Jun", total: 210, positive: 170, negative: 40 },
  { name: "Jul", total: 245, positive: 200, negative: 45 },
  { name: "Aug", total: 262, positive: 220, negative: 42 },
  { name: "Sep", total: 248, positive: 205, negative: 43 },
  { name: "Oct", total: 230, positive: 190, negative: 40 },
  { name: "Nov", total: 255, positive: 215, negative: 40 },
  { name: "Dec", total: 275, positive: 230, negative: 45 },
]

export default function FeedbackTrends() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
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
          <Line type="monotone" dataKey="total" name="Total Feedback" stroke="#6366F1" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="positive" name="Positive" stroke="#10B981" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="negative" name="Negative" stroke="#EF4444" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
