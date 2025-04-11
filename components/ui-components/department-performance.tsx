import { cn } from "@/lib/utils"
import { ArrowRight, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DepartmentData {
  id: string
  name: string
  responseRate: number
  avgResponseTime: string
  resolvedIssues: number
  pendingIssues: number
  satisfaction: number
  performance: "excellent" | "good" | "average" | "poor"
}

interface DepartmentPerformanceProps {
  departments?: DepartmentData[]
  className?: string
}

const DEPARTMENTS: DepartmentData[] = [
  {
    id: "1",
    name: "Housekeeping",
    responseRate: 92,
    avgResponseTime: "15 min",
    resolvedIssues: 87,
    pendingIssues: 12,
    satisfaction: 85,
    performance: "excellent",
  },
  {
    id: "2",
    name: "Front Desk",
    responseRate: 95,
    avgResponseTime: "8 min",
    resolvedIssues: 102,
    pendingIssues: 5,
    satisfaction: 90,
    performance: "excellent",
  },
  {
    id: "3",
    name: "Food & Beverage",
    responseRate: 88,
    avgResponseTime: "22 min",
    resolvedIssues: 65,
    pendingIssues: 18,
    satisfaction: 78,
    performance: "good",
  },
  {
    id: "4",
    name: "Maintenance",
    responseRate: 85,
    avgResponseTime: "35 min",
    resolvedIssues: 42,
    pendingIssues: 15,
    satisfaction: 75,
    performance: "good",
  },
  {
    id: "5",
    name: "Concierge",
    responseRate: 97,
    avgResponseTime: "5 min",
    resolvedIssues: 58,
    pendingIssues: 3,
    satisfaction: 92,
    performance: "excellent",
  },
]

const performanceConfig = {
  excellent: {
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  good: {
    color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300",
  },
  average: {
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  poor: {
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
}

export default function DepartmentPerformance({ departments = DEPARTMENTS, className }: DepartmentPerformanceProps) {
  return (
    <div className={cn("w-full", "morph-glass rounded-xl shadow-lg", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Department Response Performance</h2>

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
        </div>

        <div className="space-y-5">
          {departments.map((dept) => (
            <div
              key={dept.id}
              className={cn(
                "group flex flex-col",
                "p-5 rounded-xl",
                "border border-zinc-100/50 dark:border-zinc-800/50",
                "hover:bg-zinc-50/50 dark:hover:bg-white/5",
                "transition-all duration-200",
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-base text-zinc-900 dark:text-zinc-100">{dept.name}</span>
                  <Badge
                    variant="outline"
                    className={cn("text-xs px-2 py-0.5 h-5", performanceConfig[dept.performance].color)}
                  >
                    {dept.performance}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">Response Rate:</span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{dept.responseRate}%</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col items-center p-4 bg-zinc-50/50 dark:bg-black/20 rounded-xl">
                  <Clock className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mb-2" />
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{dept.avgResponseTime}</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Avg. Response</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-zinc-50/50 dark:bg-black/20 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mb-2" />
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{dept.resolvedIssues}</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Resolved</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-zinc-50/50 dark:bg-black/20 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-amber-500 dark:text-amber-400 mb-2" />
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{dept.pendingIssues}</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Pending</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">Guest Satisfaction</span>
                  <span className="text-zinc-900 dark:text-zinc-100">{dept.satisfaction}%</span>
                </div>
                <div className="h-3 bg-zinc-100/50 dark:bg-black/30 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      dept.satisfaction >= 90
                        ? "bg-emerald-500 dark:bg-emerald-600"
                        : dept.satisfaction >= 80
                          ? "bg-yellow-300 dark:bg-yellow-400"
                          : dept.satisfaction >= 70
                            ? "bg-amber-500 dark:bg-amber-600"
                            : "bg-red-500 dark:bg-red-600",
                    )}
                    style={{ width: `${dept.satisfaction}%` }}
                  />
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
          <span>View Department Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
