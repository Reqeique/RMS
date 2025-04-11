"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SentimentTrendChart } from "./sentiment-trend-chart"
import { SentimentByDepartmentChart } from "./sentiment-by-department-chart"
import { SentimentBySourceChart } from "./sentiment-by-source-chart"
import { Calendar } from "lucide-react"

export default function SentimentAnalysisDashboard() {
  const [timeRange, setTimeRange] = useState("30days")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sentiment Analysis</h1>
        <div className="flex items-center gap-3">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
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
          <Button variant="outline" className="bg-white dark:bg-[#1F1F23] border-zinc-200 dark:border-zinc-800">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Sentiment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-300">Positive Sentiment</CardTitle>
            <CardDescription className="text-green-700 dark:text-green-400">Customer satisfaction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-green-800 dark:text-green-300">78.5%</div>
              <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex items-center text-xs text-green-700 dark:text-green-400 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              2.3% improvement from last period
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
              Neutral Sentiment
            </CardTitle>
            <CardDescription className="text-yellow-700 dark:text-yellow-400">
              Neither positive nor negative
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-yellow-800 dark:text-yellow-300">14.2%</div>
              <MessageSquare className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="flex items-center text-xs text-yellow-700 dark:text-yellow-400 mt-1">
              <TrendingUp className="h-3 w-3 mr-1 rotate-90" />
              0.5% change from last period
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-800 dark:text-red-300">Negative Sentiment</CardTitle>
            <CardDescription className="text-red-700 dark:text-red-400">Areas needing improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-red-800 dark:text-red-300">7.3%</div>
              <ThumbsDown className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex items-center text-xs text-red-700 dark:text-red-400 mt-1">
              <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
              1.8% decrease from last period
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-zinc-100 dark:bg-zinc-800/50 w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">By Department</TabsTrigger>
          <TabsTrigger value="sources">By Source</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sentiment Trend</CardTitle>
                <CardDescription>Sentiment distribution over time</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <SentimentTrendChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sentiment by Department</CardTitle>
                <CardDescription>How different departments are performing</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <SentimentByDepartmentChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Sentiment Drivers</CardTitle>
              <CardDescription>Key factors influencing customer sentiment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-3">Positive Drivers</h3>
                  <div className="space-y-3">
                    {[
                      { factor: "Staff friendliness", impact: 85, mentions: 324 },
                      { factor: "Room cleanliness", impact: 78, mentions: 287 },
                      { factor: "Check-in efficiency", impact: 72, mentions: 256 },
                      { factor: "Food quality", impact: 68, mentions: 198 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-40 shrink-0 text-sm">{item.factor}</div>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${item.impact}%` }} />
                        </div>
                        <div className="w-16 text-right text-sm">{item.impact}%</div>
                        <div className="w-20 text-right text-xs text-muted-foreground">{item.mentions} mentions</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-medium mb-3">Negative Drivers</h3>
                  <div className="space-y-3">
                    {[
                      { factor: "Wifi connectivity", impact: 42, mentions: 87 },
                      { factor: "Noise levels", impact: 38, mentions: 76 },
                      { factor: "Room temperature", impact: 35, mentions: 68 },
                      { factor: "Wait times", impact: 30, mentions: 54 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-40 shrink-0 text-sm">{item.factor}</div>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: `${item.impact}%` }} />
                        </div>
                        <div className="w-16 text-right text-sm">{item.impact}%</div>
                        <div className="w-20 text-right text-xs text-muted-foreground">{item.mentions} mentions</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sentiment Analysis by Department</CardTitle>
              <CardDescription>Detailed sentiment breakdown for each department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    name: "Housekeeping",
                    positive: 82,
                    neutral: 10,
                    negative: 8,
                    trend: "improving",
                    topPositive: "Room cleanliness",
                    topNegative: "Missed items",
                  },
                  {
                    name: "Front Desk",
                    positive: 88,
                    neutral: 8,
                    negative: 4,
                    trend: "stable",
                    topPositive: "Staff friendliness",
                    topNegative: "Wait times",
                  },
                  {
                    name: "Food & Beverage",
                    positive: 75,
                    neutral: 15,
                    negative: 10,
                    trend: "improving",
                    topPositive: "Food quality",
                    topNegative: "Menu variety",
                  },
                  {
                    name: "Maintenance",
                    positive: 70,
                    neutral: 18,
                    negative: 12,
                    trend: "needs attention",
                    topPositive: "Quick response",
                    topNegative: "AC/Heating issues",
                  },
                ].map((dept, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-medium">{dept.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground">Trend:</div>
                        <div
                          className={cn(
                            "text-sm font-medium",
                            dept.trend === "improving"
                              ? "text-green-600 dark:text-green-400"
                              : dept.trend === "stable"
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-amber-600 dark:text-amber-400",
                          )}
                        >
                          {dept.trend}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Sentiment Distribution</span>
                      </div>
                      <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
                        <div className="h-full bg-green-500" style={{ width: `${dept.positive}%` }} />
                        <div className="h-full bg-yellow-400" style={{ width: `${dept.neutral}%` }} />
                        <div className="h-full bg-red-500" style={{ width: `${dept.negative}%` }} />
                      </div>
                      <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                        <div>Positive: {dept.positive}%</div>
                        <div>Neutral: {dept.neutral}%</div>
                        <div>Negative: {dept.negative}%</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Top Positive Factor</div>
                        <div className="text-sm font-medium flex items-center">
                          <ThumbsUp className="h-3.5 w-3.5 text-green-500 mr-1" />
                          {dept.topPositive}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Top Negative Factor</div>
                        <div className="text-sm font-medium flex items-center">
                          <ThumbsDown className="h-3.5 w-3.5 text-red-500 mr-1" />
                          {dept.topNegative}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sentiment by Feedback Source</CardTitle>
              <CardDescription>How sentiment varies across different feedback channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] mb-6">
                <SentimentBySourceChart />
              </div>

              <div className="space-y-4">
                {[
                  {
                    source: "AI Chatbot",
                    positive: 80,
                    neutral: 12,
                    negative: 8,
                    volume: 425,
                    responseRate: 92,
                    avgResponseTime: "2 min",
                  },
                  {
                    source: "Digital Kiosk",
                    positive: 75,
                    neutral: 15,
                    negative: 10,
                    volume: 312,
                    responseRate: 100,
                    avgResponseTime: "immediate",
                  },
                  {
                    source: "Mobile App",
                    positive: 82,
                    neutral: 10,
                    negative: 8,
                    volume: 528,
                    responseRate: 85,
                    avgResponseTime: "4 hr",
                  },
                  {
                    source: "Website",
                    positive: 78,
                    neutral: 14,
                    negative: 8,
                    volume: 386,
                    responseRate: 80,
                    avgResponseTime: "6 hr",
                  },
                ].map((source, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-medium">{source.source}</h3>
                      <div className="text-sm text-muted-foreground">
                        Volume: <span className="font-medium text-foreground">{source.volume} feedbacks</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Sentiment Distribution</span>
                      </div>
                      <div className="h-3 w-full bg-muted rounded-full overflow-hidden flex">
                        <div className="h-full bg-green-500" style={{ width: `${source.positive}%` }} />
                        <div className="h-full bg-yellow-400" style={{ width: `${source.neutral}%` }} />
                        <div className="h-full bg-red-500" style={{ width: `${source.negative}%` }} />
                      </div>
                      <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                        <div>Positive: {source.positive}%</div>
                        <div>Neutral: {source.neutral}%</div>
                        <div>Negative: {source.negative}%</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Response Rate</div>
                        <div className="text-sm font-medium">{source.responseRate}%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Avg. Response Time</div>
                        <div className="text-sm font-medium">{source.avgResponseTime}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          {/* Trends content */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
