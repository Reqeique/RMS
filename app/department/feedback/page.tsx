"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, Filter, MessageSquare, Phone, Search, Star, ThumbsDown, ThumbsUp } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample feedback data
const feedbackData = [
  {
    id: "FB-001",
    guest: "John Smith",
    room: "304",
    date: "2024-06-10T10:30:00",
    rating: 5,
    comment: "The room was exceptionally clean and well-maintained. Housekeeping staff was very professional.",
    source: "Kiosk",
    status: "Resolved",
    assignedTo: "Maria Garcia",
    phone: "+251912345678",
  },
  {
    id: "FB-002",
    guest: "Emily Davis",
    room: "412",
    date: "2024-06-09T15:15:00",
    rating: 4,
    comment: "Room was clean but there was a slight issue with the bathroom supplies not being fully restocked.",
    source: "Website",
    status: "In Progress",
    assignedTo: "Alex Thompson",
    phone: "+251923456789",
  },
  {
    id: "FB-003",
    guest: "Michael Brown",
    room: "215",
    date: "2024-06-08T09:45:00",
    rating: 2,
    comment: "Found dust under the bed and the towels didn't seem fresh. Disappointed with the cleanliness standards.",
    source: "Email",
    status: "Open",
    assignedTo: "Unassigned",
    phone: "+251934567890",
  },
  {
    id: "FB-004",
    guest: "Sarah Johnson",
    room: "510",
    date: "2024-06-07T14:20:00",
    rating: 5,
    comment: "Excellent service! The room was spotless and the staff was very attentive to our needs.",
    source: "In Person",
    status: "Resolved",
    assignedTo: "James Wilson",
    phone: "+251945678901",
  },
  {
    id: "FB-005",
    guest: "Robert Williams",
    room: "301",
    date: "2024-06-06T11:10:00",
    rating: 3,
    comment: "Average cleanliness. Nothing special but nothing terrible either.",
    source: "Kiosk",
    status: "Resolved",
    assignedTo: "Lisa Chen",
    phone: "+251956789012",
  },
]

export default function DepartmentFeedback() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null)
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [replyMessage, setReplyMessage] = useState("")
  const [sendSMS, setSendSMS] = useState(true)

  // Filter feedback based on search query and filters
  const filteredFeedback = feedbackData.filter((feedback) => {
    const matchesSearch =
      feedback.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || feedback.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesRating =
      ratingFilter === "all" ||
      (ratingFilter === "positive" && feedback.rating >= 4) ||
      (ratingFilter === "neutral" && feedback.rating === 3) ||
      (ratingFilter === "negative" && feedback.rating <= 2)

    return matchesSearch && matchesStatus && matchesRating
  })

  const selectedFeedbackItem = feedbackData.find((feedback) => feedback.id === selectedFeedback)

  const handleReply = () => {
    // Here you would implement the actual reply logic
    console.log("Replying to feedback:", {
      feedback: selectedFeedbackItem,
      message: replyMessage,
      sendSMS: sendSMS,
    })

    // Close the dialog and reset form
    setReplyDialogOpen(false)
    setReplyMessage("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Department Feedback</h1>
        <p className="text-sm text-muted-foreground">Manage and respond to feedback for your department</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search feedback..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-[130px]">
                  <Star className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            {filteredFeedback.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-2 text-lg font-medium">No feedback found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredFeedback.map((feedback) => (
                <Card
                  key={feedback.id}
                  className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedFeedback === feedback.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedFeedback(feedback.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{feedback.guest}</h3>
                          <Badge variant="outline" className="text-xs">
                            Room {feedback.room}
                          </Badge>
                          <Badge
                            variant={
                              feedback.status === "Resolved"
                                ? "default"
                                : feedback.status === "In Progress"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {feedback.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(feedback.date).toLocaleString()} • {feedback.source}
                        </p>
                      </div>
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm line-clamp-2">{feedback.comment}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        <div className="md:w-1/3">
          {selectedFeedbackItem ? (
            <Card>
              <CardHeader>
                <CardTitle>Feedback Details</CardTitle>
                <CardDescription>ID: {selectedFeedbackItem.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Guest Information</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar>
                      <AvatarFallback>
                        {selectedFeedbackItem.guest
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">{selectedFeedbackItem.guest}</p>
                      <p className="text-xs text-muted-foreground">Room {selectedFeedbackItem.room}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{selectedFeedbackItem.phone}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Feedback</h3>
                  <div className="flex items-center gap-1 mt-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < selectedFeedbackItem.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    <span className="text-sm ml-2">{selectedFeedbackItem.rating}/5</span>
                  </div>
                  <p className="mt-2 text-sm">{selectedFeedbackItem.comment}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Status</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={
                        selectedFeedbackItem.status === "Resolved"
                          ? "default"
                          : selectedFeedbackItem.status === "In Progress"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {selectedFeedbackItem.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Assigned to: {selectedFeedbackItem.assignedTo}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Response</h3>
                  <Textarea
                    placeholder="Type your response here..."
                    className="mt-2"
                    rows={4}
                    onClick={() => setReplyDialogOpen(true)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Positive
                  </Button>
                  <Button size="sm" variant="outline">
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    Negative
                  </Button>
                </div>
                <Button size="sm">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Resolve
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-2 text-lg font-medium">No feedback selected</h3>
                <p className="text-sm text-muted-foreground">Select a feedback item to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reply to Feedback</DialogTitle>
            <DialogDescription>Send a response to the guest. You can also send an SMS notification.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedFeedbackItem && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" value={selectedFeedbackItem.phone} className="col-span-3" readOnly />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Your response message..."
                className="col-span-3"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sms" className="text-right">
                Send SMS
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="sms" checked={sendSMS} onCheckedChange={setSendSMS} />
                <Label htmlFor="sms">Also send as SMS message</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setReplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleReply}>
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
