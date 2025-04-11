"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { name: "Jan", positive: 76, neutral: 14, negative: 10 },
  { name: "Feb", positive: 74, neutral: 15, negative: 11 },
  { name: "Mar", positive: 78, neutral: 13, negative: 9 },
  { name: "Apr", positive: 75, neutral: 15, negative: 10 },
  { name: "May", positive: 80, neutral: 12, negative: 8 },
  { name: "Jun", positive: 81, neutral: 11, negative: 8 },
  { name: "Jul", positive: 82, neutral: 10, negative: 8 },
  { name: "Aug", positive: 84, neutral: 9, negative: 7 },
  { name: "Sep", positive: 83, neutral: 10, negative: 7 },
  { name: "Oct", positive: 82, neutral: 11, negative: 7 },
  { name: "Nov", positive: 84, neutral: 9, negative: 7 },
  { name: "Dec", positive: 85, neutral: 8, negative: 7 },
]

export default function SentimentOverTime() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          stackOffset="expand"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              borderColor: "#374151",
              borderRadius: "0.375rem",
              fontSize: "0.75rem",
            }}
            itemStyle={{ color: "#E5E7EB" }}
            labelStyle={{ color: "#9CA3AF", fontWeight: "bold", marginBottom: "0.25rem" }}
            formatter={(value: number) => [`${(value * 100).toFixed(1)}%`]}
          />
          <Legend />
          <Area type="monotone" dataKey="positive" name="Positive" stackId="1" stroke="#10B981" fill="#10B981" />
          <Area type="monotone" dataKey="neutral" name="Neutral" stackId="1" stroke="#FBBF24" fill="#FBBF24" />
          <Area type="monotone" dataKey="negative" name="Negative" stackId="1" stroke="#EF4444" fill="#EF4444" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
