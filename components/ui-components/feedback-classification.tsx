import { cn } from "@/lib/utils"
import { ArrowRight, Filter, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FeedbackCategory {
  id: string
  name: string
  count: number
  percentage: number
  trend: "up" | "down" | "stable"
  sentiment: {
    positive: number
    neutral: number
    negative: number
  }
}

interface FeedbackClassificationProps {
  categories?: FeedbackCategory[]
  className?: string
}

const CATEGORIES: FeedbackCategory[] = [
  {
    id: "1",
    name: "Room Cleanliness",
    count: 124,
    percentage: 28,
    trend: "up",
    sentiment: {
      positive: 45,
      neutral: 30,
      negative: 25,
    },
  },
  {
    id: "2",
    name: "Staff Service",
    count: 98,
    percentage: 22,
    trend: "stable",
    sentiment: {
      positive: 70,
      neutral: 20,
      negative: 10,
    },
  },
  {
    id: "3",
    name: "Food Quality",
    count: 87,
    percentage: 19,
    trend: "down",
    sentiment: {
      positive: 55,
      neutral: 25,
      negative: 20,
    },
  },
  {
    id: "4",
    name: "Amenities",
    count: 65,
    percentage: 14,
    trend: "stable",
    sentiment: {
      positive: 60,
      neutral: 30,
      negative: 10,
    },
  },
  {
    id: "5",
    name: "Check-in/out",
    count: 52,
    percentage: 11,
    trend: "up",
    sentiment: {
      positive: 65,
      neutral: 20,
      negative: 15,
    },
  },
  {
    id: "6",
    name: "Value for Money",
    count: 28,
    percentage: 6,
    trend: "down",
    sentiment: {
      positive: 40,
      neutral: 30,
      negative: 30,
    },
  },
]

export default function FeedbackClassification({ categories = CATEGORIES, className }: FeedbackClassificationProps) {
  const totalFeedback = categories.reduce((acc, category) => acc + category.count, 0)

  return (
    <div className={cn("w-full", "morph-glass rounded-xl shadow-lg", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Feedback Categories</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Total: {totalFeedback} feedbacks</p>
          </div>

          <div className="flex items-center gap-2">
            <Select defaultValue="7days">
              <SelectTrigger className="h-9 text-sm bg-white/50 dark:bg-black/30 border-zinc-200/50 dark:border-zinc-800/50 w-[130px] rounded-lg">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
              </SelectContent>
            </Select>

            <button className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-white/5 border border-zinc-200/50 dark:border-zinc-800/50">
              <Filter className="h-4 w-4" />
            </button>

            <button className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-white/5 border border-zinc-200/50 dark:border-zinc-800/50">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={cn(
                "group flex flex-col",
                "p-5 rounded-xl",
                "border border-zinc-100/50 dark:border-zinc-800/50",
                "hover:bg-zinc-50/50 dark:hover:bg-white/5",
                "transition-all duration-200",
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-base text-zinc-900 dark:text-zinc-100">{category.name}</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs px-2 py-0.5 h-5",
                      category.trend === "up"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : category.trend === "down"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                    )}
                  >
                    {category.trend === "up" ? "↑" : category.trend === "down" ? "↓" : "→"} {category.trend}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{category.count}</span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">({category.percentage}%)</span>
                </div>
              </div>

              <div className="h-3 w-full bg-zinc-100/50 dark:bg-zinc-800/50 rounded-full overflow-hidden flex mb-2">
                <div
                  className="h-full bg-emerald-500 dark:bg-emerald-600"
                  style={{ width: `${category.sentiment.positive}%` }}
                />
                <div
                  className="h-full bg-yellow-500 dark:bg-yellow-600"
                  style={{ width: `${category.sentiment.neutral}%` }}
                />
                <div
                  className="h-full bg-red-500 dark:bg-red-600"
                  style={{ width: `${category.sentiment.negative}%` }}
                />
              </div>

              <div className="flex text-xs text-zinc-500 dark:text-zinc-400 justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 dark:bg-emerald-600 rounded-full mr-1.5"></div>
                  <span>Positive: {category.sentiment.positive}%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 dark:bg-yellow-600 rounded-full mr-1.5"></div>
                  <span>Neutral: {category.sentiment.neutral}%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 dark:bg-red-600 rounded-full mr-1.5"></div>
                  <span>Negative: {category.sentiment.negative}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-zinc-100/20 dark:border-zinc-800/20">
        <button
          type="button"
          className={cn(
            "w-full flex items-center justify-center gap-2",
            "py-3 px-4 rounded-lg",
            "text-sm font-medium",
            "bg-white/50 dark:bg-white/10",
            "text-zinc-900 dark:text-zinc-100",
            "border border-zinc-200/50 dark:border-zinc-700/50",
            "hover:bg-zinc-50/80 dark:hover:bg-white/5",
            "shadow-sm hover:shadow",
            "transition-all duration-200",
          )}
        >
          <span>View Detailed Classification</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
