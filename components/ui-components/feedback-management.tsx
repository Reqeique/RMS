"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  MessageSquare,
  Filter,
  Search,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  Download,
  Share2,
  Calendar,
  Send,
  MessageCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface FeedbackItem {
  id: string
  guest: string
  message: string
  sentiment: "positive" | "negative" | "neutral"
  source: "chatbot" | "kiosk" | "app" | "website"
  category: string
  timestamp: string
  status: "new" | "in-progress" | "resolved"
  responseTime?: string
  department?: string
  dueDate?: string
  phone?: string
}

const sentimentConfig = {
  positive: {
    icon: ThumbsUp,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  negative: {
    icon: ThumbsDown,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
  },
  neutral: {
    icon: MessageSquare,
    color: "text-yellow-600 dark:text-yellow-300",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
  },
}

const statusConfig = {
  new: {
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  "in-progress": {
    color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300",
  },
  resolved: {
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
}

const sourceConfig = {
  chatbot: "AI Chatbot",
  kiosk: "Digital Kiosk",
  app: "Mobile App",
  website: "Website",
}

const FEEDBACK_ITEMS: FeedbackItem[] = [
  {
    id: "1",
    guest: "John Smith",
    message: "The room service was excellent and very prompt. I appreciate the staff's attention to detail.",
    sentiment: "positive",
    source: "chatbot",
    category: "Room Service",
    timestamp: "Today, 2:45 PM",
    status: "resolved",
    responseTime: "5 min",
    department: "Food & Beverage",
    dueDate: "Completed",
    phone: "+251912345678",
  },
  {
    id: "2",
    guest: "Sarah Johnson",
    message: "The air conditioning in my room isn't working properly. It's too hot to sleep comfortably.",
    sentiment: "negative",
    source: "kiosk",
    category: "Room Maintenance",
    timestamp: "Today, 1:30 PM",
    status: "in-progress",
    responseTime: "10 min",
    department: "Maintenance",
    dueDate: "Today, 5:00 PM",
    phone: "+251923456789",
  },
  {
    id: "3",
    guest: "Michael Brown",
    message: "Breakfast was good but I would appreciate more vegan options on the menu.",
    sentiment: "neutral",
    source: "app",
    category: "Food Quality",
    timestamp: "Today, 9:15 AM",
    status: "new",
    department: "Food & Beverage",
    dueDate: "Tomorrow, 9:00 AM",
    phone: "+251934567890",
  },
  {
    id: "4",
    guest: "Emily Davis",
    message: "The spa services were amazing! The massage therapist was very professional.",
    sentiment: "positive",
    source: "website",
    category: "Spa Services",
    timestamp: "Yesterday, 4:20 PM",
    status: "resolved",
    responseTime: "15 min",
    department: "Spa",
    dueDate: "Completed",
    phone: "+251945678901",
  },
  {
    id: "5",
    guest: "Robert Wilson",
    message: "My room wasn't cleaned properly. There were still dirty towels from the previous day.",
    sentiment: "negative",
    source: "kiosk",
    category: "Room Cleanliness",
    timestamp: "Yesterday, 2:10 PM",
    status: "resolved",
    responseTime: "8 min",
    department: "Housekeeping",
    dueDate: "Completed",
    phone: "+251956789012",
  },
  {
    id: "6",
    guest: "Jennifer Lee",
    message: "Check-in process was smooth and efficient. Staff was very friendly.",
    sentiment: "positive",
    source: "app",
    category: "Check-in/out",
    timestamp: "Yesterday, 10:30 AM",
    status: "resolved",
    responseTime: "3 min",
    department: "Front Desk",
    dueDate: "Completed",
    phone: "+251967890123",
  },
]

export default function FeedbackManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sentimentFilter, setSentimentFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [selectedFeedbackForShare, setSelectedFeedbackForShare] = useState<FeedbackItem | null>(null)
  const [shareMessage, setShareMessage] = useState("")
  const [sharePriority, setSharePriority] = useState("medium")
  const [shareDepartment, setShareDepartment] = useState("")
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [selectedFeedbackForReply, setSelectedFeedbackForReply] = useState<FeedbackItem | null>(null)
  const [replyMessage, setReplyMessage] = useState("")
  const [sendSMS, setSendSMS] = useState(true)

  const filteredFeedback = FEEDBACK_ITEMS.filter((item) => {
    // Search filter
    if (
      searchQuery &&
      !item.message.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.guest.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Status filter
    if (statusFilter !== "all" && item.status !== statusFilter) {
      return false
    }

    // Sentiment filter
    if (sentimentFilter !== "all" && item.sentiment !== sentimentFilter) {
      return false
    }

    // Source filter
    if (sourceFilter !== "all" && item.source !== sourceFilter) {
      return false
    }

    return true
  })

  const handleShareFeedback = (feedback: FeedbackItem) => {
    setSelectedFeedbackForShare(feedback)
    setShareDialogOpen(true)
    setShareMessage(`Regarding feedback: "${feedback.message.substring(0, 50)}..."`)
    setSharePriority("medium")
    setShareDepartment("")
  }

  const handleSubmitShare = () => {
    // Here you would implement the actual sharing logic
    console.log("Sharing feedback to department:", {
      feedback: selectedFeedbackForShare,
      department: shareDepartment,
      message: shareMessage,
      priority: sharePriority,
    })

    // Close the dialog and reset form
    setShareDialogOpen(false)
    setSelectedFeedbackForShare(null)
    setShareMessage("")
    setSharePriority("medium")
    setShareDepartment("")
  }

  const handleReplyToFeedback = (feedback: FeedbackItem) => {
    setSelectedFeedbackForReply(feedback)
    setReplyDialogOpen(true)
    setReplyMessage("")
    setSendSMS(true)
  }

  const handleSubmitReply = () => {
    // Here you would implement the actual reply logic
    console.log("Replying to feedback:", {
      feedback: selectedFeedbackForReply,
      message: replyMessage,
      sendSMS: sendSMS,
    })

    // Close the dialog and reset form
    setReplyDialogOpen(false)
    setSelectedFeedbackForReply(null)
    setReplyMessage("")
    setSendSMS(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Feedback Management</h1>
        <div className="flex items-center gap-3">
          <Button className="bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search feedback..."
            className="pl-9 bg-white/50 dark:bg-black/30 border-zinc-200/50 dark:border-zinc-800/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-10 bg-white/50 dark:bg-black/30 border-zinc-200/50 dark:border-zinc-800/50 w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
            <SelectTrigger className="h-10 bg-white/50 dark:bg-black/30 border-zinc-200/50 dark:border-zinc-800/50 w-[130px]">
              <SelectValue placeholder="Sentiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sentiment</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" className="text-gray-500">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-zinc-100 dark:bg-zinc-800/50">
          <TabsTrigger value="all" className="text-xs">
            All Feedback
          </TabsTrigger>
          <TabsTrigger value="positive" className="text-xs">
            Positive
          </TabsTrigger>
          <TabsTrigger value="neutral" className="text-xs">
            Neutral
          </TabsTrigger>
          <TabsTrigger value="negative" className="text-xs">
            Negative
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFeedback.length > 0 ? (
              filteredFeedback.map((item) => {
                const SentimentIcon = sentimentConfig[item.sentiment].icon

                return (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                      <div className="flex items-center gap-2">
                        <div className={cn("p-2 rounded-full", sentimentConfig[item.sentiment].bgColor)}>
                          <SentimentIcon className={cn("w-4 h-4", sentimentConfig[item.sentiment].color)} />
                        </div>
                        <div>
                          <CardTitle className="text-sm font-medium">{item.guest}</CardTitle>
                          <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn("text-[10px] px-1.5 py-0 h-4", statusConfig[item.status].color)}
                      >
                        {item.status}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3 line-clamp-3">{item.message}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                          {sourceConfig[item.source]}
                        </span>
                        {item.department && (
                          <span className="text-xs px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                            {item.department}
                          </span>
                        )}
                        <span className="text-xs px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      {item.dueDate && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          Due: {item.dueDate}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-3">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleShareFeedback(item)
                          }}
                        >
                          <Share2 className="w-3 h-3 mr-1" />
                          Share
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleReplyToFeedback(item)
                          }}
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Reply
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        View Details
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })
            ) : (
              <div className="col-span-full text-center py-10">
                <MessageSquare className="w-10 h-10 text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">No feedback found</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="positive" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFeedback
              .filter((item) => item.sentiment === "positive")
              .map((item) => {
                const SentimentIcon = sentimentConfig[item.sentiment].icon

                return (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                      <div className="flex items-center gap-2">
                        <div className={cn("p-2 rounded-full", sentimentConfig[item.sentiment].bgColor)}>
                          <SentimentIcon className={cn("w-4 h-4", sentimentConfig[item.sentiment].color)} />
                        </div>
                        <div>
                          <CardTitle className="text-sm font-medium">{item.guest}</CardTitle>
                          <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn("text-[10px] px-1.5 py-0 h-4", statusConfig[item.status].color)}
                      >
                        {item.status}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3 line-clamp-3">{item.message}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                          {sourceConfig[item.source]}
                        </span>
                        {item.department && (
                          <span className="text-xs px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                            {item.department}
                          </span>
                        )}
                        <span className="text-xs px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-3">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleShareFeedback(item)
                          }}
                        >
                          <Share2 className="w-3 h-3 mr-1" />
                          Share
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleReplyToFeedback(item)
                          }}
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Reply
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        View Details
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        <TabsContent value="neutral" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFeedback
              .filter((item) => item.sentiment === "neutral")
              .map((item) => {
                const SentimentIcon = sentimentConfig[item.sentiment].icon

                return (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                      <div className="flex items-center gap-2">
                        <div className={cn("p-2 rounded-full", sentimentConfig[item.sentiment].bgColor)}>
                          <SentimentIcon className={cn("w-4 h-4", sentimentConfig[item.sentiment].color)} />
                        </div>
                        <div>
                          <CardTitle className="text-sm font-medium">{item.guest}</CardTitle>
                          <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn("text-[10px] px-1.5 py-0 h-4", statusConfig[item.status].color)}
                      >
                        {item.status}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3 line-clamp-3">{item.message}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                          {sourceConfig[item.source]}
                        </span>
                        {item.department && (
                          <span className="text-xs px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                            {item.department}
                          </span>
                        )}
                        <span className="text-xs px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-3">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleShareFeedback(item)
                          }}
                        >
                          <Share2 className="w-3 h-3 mr-1" />
                          Share
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleReplyToFeedback(item)
                          }}
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Reply
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        View Details
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
          </div>
        </TabsContent>

        <TabsContent value="negative" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFeedback
              .filter((item) => item.sentiment === "negative")
              .map((item) => {
                const SentimentIcon = sentimentConfig[item.sentiment].icon

                return (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                      <div className="flex items-center gap-2">
                        <div className={cn("p-2 rounded-full", sentimentConfig[item.sentiment].bgColor)}>
                          <SentimentIcon className={cn("w-4 h-4", sentimentConfig[item.sentiment].color)} />
                        </div>
                        <div>
                          <CardTitle className="text-sm font-medium">{item.guest}</CardTitle>
                          <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn("text-[10px] px-1.5 py-0 h-4", statusConfig[item.status].color)}
                      >
                        {item.status}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3 line-clamp-3">{item.message}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                          {sourceConfig[item.source]}
                        </span>
                        {item.department && (
                          <span className="text-xs px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                            {item.department}
                          </span>
                        )}
                        <span className="text-xs px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full">
                          {item.category}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-3">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleShareFeedback(item)
                          }}
                        >
                          <Share2 className="w-3 h-3 mr-1" />
                          Share
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleReplyToFeedback(item)
                          }}
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Reply
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        View Details
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })}
          </div>
        </TabsContent>
      </Tabs>
      {/* Share Feedback Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Share Feedback with Department</DialogTitle>
            <DialogDescription>
              Forward this feedback to a department with additional instructions or context.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="shareDepartment" className="text-right">
                Department
              </Label>
              <Select value={shareDepartment} onValueChange={setShareDepartment} className="col-span-3">
                <SelectTrigger id="shareDepartment">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="housekeeping">Housekeeping</SelectItem>
                  <SelectItem value="frontdesk">Front Desk</SelectItem>
                  <SelectItem value="foodbeverage">Food & Beverage</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="spa">Spa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sharePriority" className="text-right">
                Priority
              </Label>
              <Select value={sharePriority} onValueChange={setSharePriority} className="col-span-3">
                <SelectTrigger id="sharePriority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="shareMessage" className="text-right">
                Message
              </Label>
              <Textarea
                id="shareMessage"
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
                className="col-span-3"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitShare} disabled={!shareDepartment || !shareMessage}>
              Share Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply to Feedback Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reply to Feedback</DialogTitle>
            <DialogDescription>Send a direct response to the guest who provided this feedback.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
              <div className="flex items-start gap-3 mb-2">
                {selectedFeedbackForReply && (
                  <>
                    <div
                      className={cn("p-2 rounded-full", sentimentConfig[selectedFeedbackForReply.sentiment].bgColor)}
                    >
                      {(() => {
                        const SentimentIcon = sentimentConfig[selectedFeedbackForReply.sentiment].icon
                        return (
                          <SentimentIcon
                            className={cn("w-4 h-4", sentimentConfig[selectedFeedbackForReply.sentiment].color)}
                          />
                        )
                      })()}
                    </div>
                    <div>
                      <p className="font-medium">{selectedFeedbackForReply?.guest}</p>
                      <p className="text-sm text-gray-500">{selectedFeedbackForReply?.timestamp}</p>
                    </div>
                  </>
                )}
              </div>
              <p className="text-sm">{selectedFeedbackForReply?.message}</p>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone Number
              </Label>
              <div className="col-span-3 flex items-center gap-2 bg-gray-50 dark:bg-gray-900/50 p-2 rounded-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1">
                  <div className="w-6 h-4">
                    <svg width="24" height="16" viewBox="0 0 513 343" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0.759277H513V114.759H0V0.759277Z" fill="#20AA46" />
                      <path d="M0 228.759H513V342.759H0V228.759Z" fill="#E92F3B" />
                      <path d="M0 114.759H513V228.759H0V114.759Z" fill="#FADF50" />
                      <path
                        d="M257.631 290.315C323.11 290.315 376.191 237.234 376.191 171.755C376.191 106.276 323.11 53.1948 257.631 53.1948C192.152 53.1948 139.071 106.276 139.071 171.755C139.071 237.234 192.152 290.315 257.631 290.315Z"
                        fill="#205CCA"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M257.64 76.8853L279.932 140.976H352.947L294.019 183.067L316.47 250.422L257.64 208.401L198.809 250.422L221.293 182.971L165.3 140.976H235.292L236.272 138.033L236.361 138.063L257.64 76.8853ZM231.492 152.376L225.093 171.571L199.5 152.376H231.492ZM231.014 189.859L220.71 220.769L246.889 202.071L231.014 189.859ZM267.47 201.412L294.569 220.769L284.268 189.864L267.47 201.412ZM291.025 171.196L317.373 152.376H283.706L291.025 171.196ZM267.862 140.976L257.64 111.586L247.417 140.976H267.862ZM243.508 152.376L234.83 178.412L256.526 195.102L281.431 177.98L271.474 152.376H243.508Z"
                        fill="#FFDB3D"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M289.423 122.361L312.223 85.8809L317.057 88.9019L294.257 125.382L289.423 122.361ZM221.091 127.766L196.011 91.286L200.708 88.0568L225.788 124.537L221.091 127.766ZM160.847 203.295L201.887 187.335L203.953 192.648L162.913 208.608L160.847 203.295ZM313.393 187.335L354.433 203.295L352.367 208.608L311.327 192.648L313.393 187.335ZM254.79 274.351V231.031H260.49V274.351H254.79Z"
                        fill="#FFDB3D"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">+251</span>
                </div>
                <span className="text-sm font-medium px-2">{selectedFeedbackForReply?.phone?.replace("+251", "")}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sendSMS" className="text-right">
                Send as SMS
              </Label>
              <div className="flex items-center gap-2 col-span-3">
                <Switch id="sendSMS" checked={sendSMS} onCheckedChange={setSendSMS} />
                <Label htmlFor="sendSMS" className="text-sm text-gray-500">
                  Send this reply as an SMS message
                </Label>
              </div>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="replyMessage" className="text-right">
                Message
              </Label>
              <Textarea
                id="replyMessage"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="col-span-3"
                rows={4}
                placeholder="Thank you for your feedback..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitReply} disabled={!replyMessage} className="gap-2">
              <Send className="h-4 w-4" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
