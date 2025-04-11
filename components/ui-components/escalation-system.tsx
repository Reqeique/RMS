"use client"

import React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Clock, ArrowRight, User, Phone, Mail, Search, CheckCircle, AlertTriangle, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface EscalationItem {
  id: string
  guest: string
  issue: string
  priority: "Critical" | "High" | "Medium" | "Low"
  status: "pending" | "assigned" | "resolved"
  timeElapsed: string
  assignedTo?: string
  contactMethod: "phone" | "email" | "in-person"
  contactInfo: string
  department?: string
  location?: string
  notes?: string
  createdAt: string
}

const priorityConfig = {
  Critical: {
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    icon: AlertTriangle,
  },
  High: {
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    icon: AlertTriangle,
  },
  Medium: {
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    icon: Clock,
  },
  Low: {
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    icon: CheckCircle,
  },
}

const statusConfig = {
  pending: {
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
  assigned: {
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  resolved: {
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
}

const contactConfig = {
  phone: {
    icon: Phone,
    label: "Call",
  },
  email: {
    icon: Mail,
    label: "Email",
  },
  "in-person": {
    icon: User,
    label: "In-Person",
  },
}

const ESCALATIONS: EscalationItem[] = [
  {
    id: "ESC-001",
    guest: "Robert Wilson",
    issue: "Water leak in bathroom causing floor damage",
    priority: "Critical",
    status: "assigned",
    timeElapsed: "15 min",
    assignedTo: "Maintenance Team",
    contactMethod: "phone",
    contactInfo: "+1 (555) 123-4567",
    department: "Maintenance",
    location: "Room 302",
    notes: "Guest reported water coming from under the bathroom sink. Maintenance team dispatched.",
    createdAt: "2023-06-10T09:30:00",
  },
  {
    id: "ESC-002",
    guest: "Sarah Johnson",
    issue: "Air conditioning not working, room temperature at 85°F",
    priority: "High",
    status: "pending",
    timeElapsed: "30 min",
    contactMethod: "email",
    contactInfo: "sarah.j@example.com",
    department: "Maintenance",
    location: "Room 415",
    createdAt: "2023-06-10T10:15:00",
  },
  {
    id: "ESC-003",
    guest: "Michael Brown",
    issue: "Missing items from room after housekeeping visit",
    priority: "High",
    status: "assigned",
    timeElapsed: "45 min",
    assignedTo: "Security Team",
    contactMethod: "in-person",
    contactInfo: "Room 302",
    department: "Housekeeping",
    location: "Room 302",
    notes: "Guest reported missing laptop and watch. Security team investigating.",
    createdAt: "2023-06-10T11:00:00",
  },
  {
    id: "ESC-004",
    guest: "Emily Davis",
    issue: "Loud noise from adjacent room, unable to sleep",
    priority: "Medium",
    status: "resolved",
    timeElapsed: "1 hr 20 min",
    assignedTo: "Front Desk",
    contactMethod: "phone",
    contactInfo: "+1 (555) 987-6543",
    department: "Front Desk",
    location: "Room 303",
    notes: "Noise complaint resolved. Guests in adjacent room were asked to keep noise down.",
    createdAt: "2023-06-10T01:20:00",
  },
  {
    id: "ESC-005",
    guest: "David Lee",
    issue: "Food poisoning after dining at hotel restaurant",
    priority: "Critical",
    status: "assigned",
    timeElapsed: "25 min",
    assignedTo: "F&B Manager",
    contactMethod: "phone",
    contactInfo: "+1 (555) 234-5678",
    department: "Food & Beverage",
    location: "Room 512",
    notes: "Guest reported severe symptoms after dinner. Medical assistance provided.",
    createdAt: "2023-06-10T20:45:00",
  },
  {
    id: "ESC-006",
    guest: "Jennifer Wilson",
    issue: "Billing discrepancy on room charges",
    priority: "Medium",
    status: "pending",
    timeElapsed: "1 hr 5 min",
    contactMethod: "email",
    contactInfo: "jennifer.w@example.com",
    department: "Accounting",
    location: "Room 218",
    createdAt: "2023-06-10T14:30:00",
  },
  {
    id: "ESC-007",
    guest: "Thomas Anderson",
    issue: "Room not cleaned for two consecutive days",
    priority: "High",
    status: "assigned",
    timeElapsed: "50 min",
    assignedTo: "Housekeeping Manager",
    contactMethod: "in-person",
    contactInfo: "Room 401",
    department: "Housekeeping",
    location: "Room 401",
    notes: "Guest very upset about room condition. Immediate cleaning scheduled.",
    createdAt: "2023-06-10T11:45:00",
  },
]

// Sample staff data for assignment
const STAFF = [
  { id: "1", name: "Maria Garcia", department: "Housekeeping", position: "Manager", avatar: "MG" },
  { id: "2", name: "John Smith", department: "Maintenance", position: "Supervisor", avatar: "JS" },
  { id: "3", name: "Sarah Johnson", department: "Front Desk", position: "Manager", avatar: "SJ" },
  { id: "4", name: "David Lee", department: "Security", position: "Team Lead", avatar: "DL" },
  { id: "5", name: "Lisa Chen", department: "Food & Beverage", position: "Manager", avatar: "LC" },
  { id: "6", name: "Robert Wilson", department: "Maintenance", position: "Technician", avatar: "RW" },
  { id: "7", name: "Emily Davis", department: "Housekeeping", position: "Supervisor", avatar: "ED" },
  { id: "8", name: "Michael Brown", department: "Security", position: "Officer", avatar: "MB" },
]

export default function EscalationSystem() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEscalation, setSelectedEscalation] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newEscalation, setNewEscalation] = useState({
    guest: "",
    issue: "",
    priority: "High",
    contactMethod: "phone",
    contactInfo: "",
    department: "",
    location: "",
    notes: "",
  })

  const filteredEscalations = ESCALATIONS.filter((item) => {
    // Status filter
    if (statusFilter !== "all" && item.status !== statusFilter) {
      return false
    }

    // Priority filter
    if (priorityFilter !== "all" && item.priority !== priorityFilter) {
      return false
    }

    // Department filter
    if (departmentFilter !== "all" && item.department !== departmentFilter.toLowerCase()) {
      return false
    }

    // Search filter
    if (
      searchQuery &&
      !item.guest.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.issue.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const selectedItem = ESCALATIONS.find((item) => item.id === selectedEscalation)

  const handleCreateEscalation = () => {
    // Logic to create a new escalation would go here
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Escalation Management</h1>
          <p className="text-sm text-muted-foreground">Handle and resolve guest issues efficiently</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Escalation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Escalation</DialogTitle>
              <DialogDescription>Create a new escalation for immediate attention and resolution.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="guest" className="text-right text-sm font-medium">
                  Guest Name
                </label>
                <Input
                  id="guest"
                  value={newEscalation.guest}
                  onChange={(e) => setNewEscalation({ ...newEscalation, guest: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="location" className="text-right text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  value={newEscalation.location}
                  onChange={(e) => setNewEscalation({ ...newEscalation, location: e.target.value })}
                  placeholder="Room number or area"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="department" className="text-right text-sm font-medium">
                  Department
                </label>
                <Select
                  value={newEscalation.department}
                  onValueChange={(value) => setNewEscalation({ ...newEscalation, department: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Front Desk">Front Desk</SelectItem>
                    <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="priority" className="text-right text-sm font-medium">
                  Priority
                </label>
                <Select
                  value={newEscalation.priority}
                  onValueChange={(value) => setNewEscalation({ ...newEscalation, priority: value as any })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="contactMethod" className="text-right text-sm font-medium">
                  Contact Method
                </label>
                <Select
                  value={newEscalation.contactMethod}
                  onValueChange={(value) => setNewEscalation({ ...newEscalation, contactMethod: value as any })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select contact method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="contactInfo" className="text-right text-sm font-medium">
                  Contact Info
                </label>
                <Input
                  id="contactInfo"
                  value={newEscalation.contactInfo}
                  onChange={(e) => setNewEscalation({ ...newEscalation, contactInfo: e.target.value })}
                  placeholder="Phone number, email, or room number"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="issue" className="text-right text-sm font-medium pt-2">
                  Issue
                </label>
                <Textarea
                  id="issue"
                  value={newEscalation.issue}
                  onChange={(e) => setNewEscalation({ ...newEscalation, issue: e.target.value })}
                  placeholder="Describe the issue in detail"
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <label htmlFor="notes" className="text-right text-sm font-medium pt-2">
                  Notes
                </label>
                <Textarea
                  id="notes"
                  value={newEscalation.notes}
                  onChange={(e) => setNewEscalation({ ...newEscalation, notes: e.target.value })}
                  placeholder="Additional notes or context"
                  className="col-span-3"
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateEscalation}>Create Escalation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search escalations..."
                className="pl-9 bg-white/50 dark:bg-[#1F1F23]/50 border-zinc-200/50 dark:border-zinc-800/50 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 text-sm bg-white/50 dark:bg-[#1F1F23]/50 border-zinc-200/50 dark:border-zinc-800/50 w-[130px] rounded-lg">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="h-9 text-sm bg-white/50 dark:bg-[#1F1F23]/50 border-zinc-200/50 dark:border-zinc-800/50 w-[130px] rounded-lg">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="h-9 text-sm bg-white/50 dark:bg-[#1F1F23]/50 border-zinc-200/50 dark:border-zinc-800/50 w-[150px] rounded-lg">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Front Desk">Front Desk</SelectItem>
                  <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                {ESCALATIONS.filter((item) => item.status === "pending").length} Pending
              </Badge>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                {ESCALATIONS.filter((item) => item.status === "assigned").length} Assigned
              </Badge>
              <Badge
                variant="outline"
                className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
              >
                {ESCALATIONS.filter((item) => item.status === "resolved").length} Resolved
              </Badge>
            </div>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">Last 24 Hours</span>
          </div>

          <div className="space-y-3">
            {filteredEscalations.length === 0 ? (
              <div className="text-center py-8">
                <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-2 text-lg font-medium">No escalations found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredEscalations.map((item) => {
                const ContactIcon = contactConfig[item.contactMethod].icon
                const PriorityIcon = priorityConfig[item.priority].icon

                return (
                  <Card
                    key={item.id}
                    className={cn(
                      "cursor-pointer hover:shadow-md transition-all duration-200",
                      selectedEscalation === item.id ? "border-primary" : "",
                    )}
                    onClick={() => setSelectedEscalation(item.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.guest}</h3>
                            <Badge
                              variant="outline"
                              className={cn("text-xs px-1.5 py-0.5", priorityConfig[item.priority].color)}
                            >
                              <PriorityIcon className="w-3 h-3 mr-1" />
                              {item.priority}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={cn("text-xs px-1.5 py-0.5", statusConfig[item.status].color)}
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-zinc-600 dark:text-zinc-400">
                              {item.id} • {item.department} • {item.location}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                          <Clock className="w-3 h-3 mr-1" />
                          {item.timeElapsed}
                        </div>
                      </div>

                      <p className="text-xs text-zinc-700 dark:text-zinc-300 mb-3">{item.issue}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                          {item.assignedTo && (
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                              Assigned to:{" "}
                              <span className="font-medium text-zinc-700 dark:text-zinc-300">{item.assignedTo}</span>
                            </span>
                          )}
                          <div className="flex items-center gap-1">
                            <ContactIcon className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{item.contactInfo}</span>
                          </div>
                        </div>

                        <button
                          className={cn(
                            "flex items-center gap-1",
                            "py-1 px-2 rounded",
                            "text-[10px] font-medium",
                            "bg-white/50 dark:bg-white/10",
                            "text-zinc-900 dark:text-zinc-100",
                            "border border-zinc-200/50 dark:border-zinc-700/50",
                            "hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30",
                            "transition-all duration-200",
                          )}
                        >
                          {contactConfig[item.contactMethod].label}
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className={cn(
                "flex items-center justify-center gap-2",
                "py-2 px-4 rounded-lg",
                "text-xs font-medium",
                "bg-white/50 dark:bg-white/10",
                "text-zinc-900 dark:text-zinc-100",
                "border border-zinc-200/50 dark:border-zinc-700/50",
                "hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30",
                "shadow-sm hover:shadow",
                "transition-all duration-200",
              )}
            >
              <span>View All Escalations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="md:w-1/3">
          {selectedItem ? (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{selectedItem.guest}</CardTitle>
                  <Badge
                    variant="outline"
                    className={cn("text-xs px-2 py-0.5", priorityConfig[selectedItem.priority].color)}
                  >
                    {selectedItem.priority}
                  </Badge>
                </div>
                <CardDescription>
                  {selectedItem.id} • {selectedItem.location} • Created{" "}
                  {new Date(selectedItem.createdAt).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Issue Details</h3>
                  <p className="text-sm">{selectedItem.issue}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <h4 className="text-xs text-muted-foreground mb-1">Status</h4>
                    <Badge
                      variant="outline"
                      className={cn("text-xs px-2 py-0.5", statusConfig[selectedItem.status].color)}
                    >
                      {selectedItem.status}
                    </Badge>
                  </div>
                  <div>
                    <h4 className="text-xs text-muted-foreground mb-1">Department</h4>
                    <span className="text-sm">{selectedItem.department}</span>
                  </div>
                  <div>
                    <h4 className="text-xs text-muted-foreground mb-1">Contact Method</h4>
                    <div className="flex items-center gap-1">
                      {React.createElement(contactConfig[selectedItem.contactMethod].icon, { className: "h-3 w-3" })}
                      <span className="text-sm">{contactConfig[selectedItem.contactMethod].label}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs text-muted-foreground mb-1">Contact Info</h4>
                    <span className="text-sm">{selectedItem.contactInfo}</span>
                  </div>
                </div>

                {selectedItem.assignedTo && (
                  <div>
                    <h3 className="text-sm font-medium mb-1">Assignment</h3>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>
                          {selectedItem.assignedTo
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{selectedItem.assignedTo}</span>
                    </div>
                  </div>
                )}

                {selectedItem.notes && (
                  <div>
                    <h3 className="text-sm font-medium mb-1">Notes</h3>
                    <p className="text-sm">{selectedItem.notes}</p>
                  </div>
                )}

                {selectedItem.status !== "resolved" && (
                  <div>
                    <h3 className="text-sm font-medium mb-1">Assign To</h3>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select staff member" />
                      </SelectTrigger>
                      <SelectContent>
                        {STAFF.filter((staff) => staff.department === selectedItem.department).map((staff) => (
                          <SelectItem key={staff.id} value={staff.id}>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>{staff.avatar}</AvatarFallback>
                              </Avatar>
                              <div>
                                <span>{staff.name}</span>
                                <span className="text-xs text-muted-foreground ml-2">({staff.position})</span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {selectedItem.status === "resolved" ? (
                  <Button variant="outline" className="w-full">
                    Reopen Escalation
                  </Button>
                ) : (
                  <>
                    <Button variant="outline">Update Status</Button>
                    <Button>{selectedItem.status === "pending" ? "Assign & Start" : "Mark as Resolved"}</Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-2 text-lg font-medium">No escalation selected</h3>
                <p className="text-sm text-muted-foreground">Select an escalation to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
