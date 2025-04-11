"use client"

import { BarChart2, TrendingUp, CalendarIcon, UsersIcon, ArrowRight, PieChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FeedbackTrends from "./feedback-trends"
import SentimentOverTime from "./sentiment-over-time"
import { FeedbackRadarChart } from "./feedback-radar-chart"
import { FeedbackBarChart } from "./feedback-bar-chart"

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <div className="flex items-center gap-3">
          <Select defaultValue="30days">
            <SelectTrigger className="h-9 text-sm bg-white dark:bg-[#1F1F23] border-zinc-200 dark:border-zinc-800 w-[150px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-4 rounded-lg",
              "text-xs font-medium",
              "bg-white dark:bg-white",
              "text-zinc-900 dark:text-zinc-900",
              "border border-zinc-200 dark:border-zinc-200",
              "hover:bg-zinc-50 dark:hover:bg-zinc-50",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Custom Range</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              <BarChart2 className="w-5 h-5" />
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">vs last period</span>
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">1,248</h3>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Feedback</p>
            <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              +12.5%
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">
              <UsersIcon className="w-5 h-5" />
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">vs last period</span>
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">85.2%</h3>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Response Rate</p>
            <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              +3.8%
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <BarChart2 className="w-5 h-5" />
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">vs last period</span>
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">18 min</h3>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Avg. Response Time</p>
            <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              +5.2%
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-5 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
              <BarChart2 className="w-5 h-5" />
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">vs last period</span>
          </div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">78.5%</h3>
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Positive Sentiment</p>
            <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              +2.3%
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
            Feedback Trends
          </h2>
          <FeedbackTrends />
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
            Sentiment Over Time
          </h2>
          <SentimentOverTime />
        </div>
      </div>

      {/* Radar Chart and Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
            <PieChart className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
            Feedback by Category
          </h2>
          <FeedbackRadarChart />
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
            Feedback by Device
          </h2>
          <FeedbackBarChart />
        </div>
      </div>

      {/* Top Issues */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
            Top Issues by Volume
          </h2>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-white dark:bg-white",
              "text-zinc-900 dark:text-zinc-900",
              "border border-zinc-200 dark:border-zinc-200",
              "hover:bg-zinc-50 dark:hover:bg-zinc-50",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <span>Export Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-4">
          {[
            { issue: "Room cleanliness concerns", count: 187, percentage: 15, change: "+5.2%" },
            { issue: "Slow check-in process", count: 142, percentage: 11.4, change: "-2.1%" },
            { issue: "Wi-Fi connectivity issues", count: 118, percentage: 9.5, change: "+12.3%" },
            { issue: "Breakfast quality complaints", count: 104, percentage: 8.3, change: "+1.7%" },
            { issue: "Noise from adjacent rooms", count: 92, percentage: 7.4, change: "-3.5%" },
          ].map((item, index) => (
            <div key={index} className="p-4 border border-zinc-100 dark:border-zinc-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.issue}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{item.count}</span>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      item.change.startsWith("+")
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400",
                    )}
                  >
                    {item.change}
                  </span>
                </div>
              </div>
              <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-300 dark:bg-yellow-400 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{item.percentage}% of total feedback</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
