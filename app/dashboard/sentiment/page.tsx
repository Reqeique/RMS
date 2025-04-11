import SentimentAnalysisDashboard from "@/components/ui-components/sentiment-analysis-dashboard"

export default function SentimentPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <SentimentAnalysisDashboard />
      </div>
    </div>
  )
}
