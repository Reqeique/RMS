import EscalationSystem from "@/components/ui-components/escalation-system"

export default function EscalationsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Escalation System</h1>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <EscalationSystem />
        </div>
      </div>
    </div>
  )
}
