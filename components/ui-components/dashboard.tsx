import { MessageSquare, Building2, ArrowUpRight } from "lucide-react"
import FeedbackClassification from "./feedback-classification"
import DepartmentPerformance from "./department-performance"
import DepartmentOrderSystem from "./department-order-system"

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2 ">
            <MessageSquare className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
            Feedback Classification
          </h2>
          <div className="flex-1">
            <FeedbackClassification className="h-full" />
          </div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
            Department Performance
          </h2>
          <div className="flex-1">
            <DepartmentPerformance className="h-full" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 flex flex-col items-start justify-start border border-gray-200 dark:border-[#1F1F23]">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 text-left flex items-center gap-2">
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-900 dark:text-zinc-50" />
          Department Order System
        </h2>
        <DepartmentOrderSystem />
      </div>
    </div>
  )
}
