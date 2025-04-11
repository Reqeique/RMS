"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle,
  ClipboardList,
  AlertTriangle,
  User,
  Camera,
  FileVideo,
  Upload,
  X,
  Clock,
  LogOut,
  Settings,
  Package,
  Calendar,
  Search,
  Bell,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function EmployeePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("orders")
  const [files, setFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showOrderDetails, setShowOrderDetails] = useState<string | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedAssignee, setSelectedAssignee] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null)
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])

      // Create preview URLs
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls])
    }
  }

  const removeFile = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index])

    setFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmitIssue = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        setFiles([])
        setPreviewUrls([])
        setSelectedDepartment("")
        setSelectedAssignee("")
        const form = e.target as HTMLFormElement
        form.reset()
      }, 3000)
    }, 1500)
  }

  const handleLogout = () => {
    router.push("/")
  }

  const isImage = (file: File) => file.type.startsWith("image/")
  const isVideo = (file: File) => file.type.startsWith("video/")

  const orders = [
    {
      id: "ORD-001",
      title: "Clean rooms 301-310",
      description: "Deep cleaning required for rooms 301-310. Pay special attention to bathrooms.",
      priority: "High",
      status: "pending",
      department: "Housekeeping",
      assignedBy: "Sarah Johnson",
      assignedTo: "John Doe",
      dueBy: "Today, 5:00 PM",
      createdAt: "Today, 9:30 AM",
    },
    {
      id: "ORD-002",
      title: "Fix AC in room 405",
      description: "Guest complained about AC not cooling properly. Check refrigerant levels and repair as needed.",
      priority: "Critical",
      status: "in-progress",
      department: "Maintenance",
      assignedBy: "Robert Wilson",
      assignedTo: "John Doe",
      dueBy: "Today, 2:00 PM",
      createdAt: "Today, 10:15 AM",
    },
    {
      id: "ORD-003",
      title: "Restock mini bar in VIP rooms",
      description: "Restock mini bars in all VIP rooms (501-510) with premium items.",
      priority: "Medium",
      status: "completed",
      department: "Food & Beverage",
      assignedBy: "Michael Brown",
      assignedTo: "John Doe",
      dueBy: "Completed",
      createdAt: "Yesterday, 4:20 PM",
      completedAt: "Yesterday, 5:45 PM",
    },
  ]

  const tasks = [
    {
      id: "TASK-001",
      title: "Daily room inspection",
      dueDate: "Today, 4:00 PM",
      status: "pending",
      priority: "Medium",
      description: "Conduct standard inspection of assigned rooms (401-410).",
    },
    {
      id: "TASK-002",
      title: "Staff meeting",
      dueDate: "Tomorrow, 9:00 AM",
      status: "pending",
      priority: "High",
      description: "Mandatory department meeting to discuss new procedures.",
    },
    {
      id: "TASK-003",
      title: "Inventory check",
      dueDate: "Yesterday",
      status: "completed",
      priority: "Medium",
      description: "Complete monthly inventory check of cleaning supplies.",
    },
  ]

  const notifications = [
    {
      id: 1,
      title: "New order assigned",
      description: "You have been assigned to clean rooms 301-310",
      time: "5 minutes ago",
      unread: true,
      type: "order",
    },
    {
      id: 2,
      title: "Task reminder",
      description: "Daily room inspection due in 2 hours",
      time: "30 minutes ago",
      unread: true,
      type: "task",
    },
    {
      id: 3,
      title: "Order completed",
      description: "You marked 'Restock mini bar in VIP rooms' as completed",
      time: "Yesterday",
      unread: false,
      type: "order",
    },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  const departmentStaff = {
    housekeeping: ["Sarah Johnson", "Alex Thompson", "Maria Garcia"],
    maintenance: ["Robert Wilson", "David Lee", "James Miller"],
    frontdesk: ["Emily Davis", "Jessica Wang", "Daniel Brown"],
    foodbeverage: ["Michael Brown", "Lisa Chen", "Kevin Taylor"],
    security: ["Thomas Anderson", "Sophia Martinez", "William Johnson"],
    spa: ["Olivia Wilson", "Natalie Kim", "Ryan Davis"],
  }

  const priorityColors = {
    Critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    High: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    Medium: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    Low: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  }

  const statusColors = {
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    completed: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  }

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== "all" && order.status !== statusFilter) {
      return false
    }

    if (
      searchQuery &&
      !order.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !order.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !order.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter !== "all" && task.status !== statusFilter) {
      return false
    }

    if (
      searchQuery &&
      !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !task.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !task.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  const handleCompleteTask = (taskId: string) => {
    setCompletingTaskId(taskId)

    // Simulate API call
    setTimeout(() => {
      setCompletingTaskId(null)
      setCompletedTaskIds((prev) => [...prev, taskId])

      // Update the task status in the UI
      const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, status: "completed" } : task))

      // In a real app, you would update the tasks state here
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="sticky top-4 left-0 right-0 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg shadow-md px-4">
            <div className="flex items-center">
              <h1 className="text-lg font-bold">RMS Employee Portal</h1>
            </div>
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative"
                      onClick={() => setShowNotifications(!showNotifications)}
                    >
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500 hover:bg-red-600">
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>John Doe</span>
                      <span className="text-xs text-muted-foreground">Housekeeping</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Panel */}
      {showNotifications && (
        <div className="fixed left-4 lg:left-auto lg:right-4 top-20 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-zinc-900 shadow-lg rounded-lg border border-gray-200 dark:border-zinc-800 z-50 max-h-[80vh] overflow-auto">
          <div className="p-3 border-b border-gray-200 dark:border-zinc-800 sticky top-0 bg-white dark:bg-zinc-900">
            <h3 className="font-medium">Notifications</h3>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-b border-gray-200 dark:border-zinc-800 ${
                  notification.unread ? "bg-blue-50 dark:bg-blue-900/10" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`rounded-full p-1.5 ${
                      notification.type === "order"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}
                  >
                    {notification.type === "order" ? (
                      <ClipboardList className="h-3 w-3" />
                    ) : (
                      <AlertTriangle className="h-3 w-3" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{notification.description}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-gray-200 dark:border-zinc-800 sticky bottom-0 bg-white dark:bg-zinc-900">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View all notifications
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Welcome, John</h2>
            <p className="text-sm text-muted-foreground">Here's what you need to take care of today</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-9 w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <ClipboardList className="h-4 w-4 mr-2 text-blue-500" />
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.filter((o) => o.status !== "completed").length}</div>
              <p className="text-sm text-muted-foreground">Active orders assigned to you</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Package className="h-4 w-4 mr-2 text-amber-500" />
                Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks.filter((t) => t.status !== "completed").length}</div>
              <p className="text-sm text-muted-foreground">Pending tasks to complete</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {orders.filter((o) => o.status === "completed").length +
                  tasks.filter((t) => t.status === "completed").length}
              </div>
              <p className="text-sm text-muted-foreground">Items completed this week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="report">Report Issue</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-2 text-lg font-medium">No orders found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div
                          className={cn(
                            "w-full md:w-1 h-2 md:h-auto",
                            order.status === "completed"
                              ? "bg-emerald-500"
                              : order.status === "in-progress"
                                ? "bg-blue-500"
                                : "bg-amber-500",
                          )}
                        />
                        <div className="p-4 flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-base font-medium">{order.title}</h3>
                                <Badge className={cn("text-xs", priorityColors[order.priority])}>
                                  {order.priority}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {order.id} • {order.department} • Created: {order.createdAt}
                              </p>
                            </div>
                            <Badge
                              variant={
                                order.status === "completed"
                                  ? "default"
                                  : order.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="text-xs capitalize"
                            >
                              {order.status}
                            </Badge>
                          </div>

                          <p className="text-sm mb-3">{order.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {order.status === "completed" ? "Completed" : `Due: ${order.dueBy}`}
                            </div>

                            <div className="flex items-center gap-2">
                              {order.status !== "completed" && (
                                <Select defaultValue={order.status}>
                                  <SelectTrigger className="h-8 text-xs w-[140px]">
                                    <SelectValue placeholder="Update status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs h-8"
                                onClick={() => setShowOrderDetails(order.id)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8">
                <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-2 text-lg font-medium">No tasks found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => {
                  const isCompleting = completingTaskId === task.id
                  const isCompleted = task.status === "completed" || completedTaskIds.includes(task.id)

                  return (
                    <Card key={task.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div
                            className={cn(
                              "w-full md:w-1 h-2 md:h-auto",
                              isCompleted
                                ? "bg-emerald-500"
                                : task.status === "in-progress"
                                  ? "bg-blue-500"
                                  : "bg-amber-500",
                            )}
                          />
                          <div className="p-4 flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-base font-medium">{task.title}</h3>
                                  <Badge className={cn("text-xs", priorityColors[task.priority])}>
                                    {task.priority}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {task.id} • Due: {task.dueDate}
                                </p>
                              </div>
                              <Badge
                                variant={
                                  isCompleted ? "default" : task.status === "in-progress" ? "secondary" : "outline"
                                }
                                className="text-xs capitalize"
                              >
                                {isCompleted ? "completed" : task.status}
                              </Badge>
                            </div>

                            <p className="text-sm mb-3">{task.description}</p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                {task.dueDate}
                              </div>

                              {!isCompleted && (
                                <Button
                                  size="sm"
                                  className="text-xs h-8"
                                  disabled={isCompleting}
                                  onClick={() => handleCompleteTask(task.id)}
                                >
                                  {isCompleting ? (
                                    <>
                                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                                      Processing...
                                    </>
                                  ) : (
                                    "Complete Task"
                                  )}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="report" className="space-y-4">
            {isSuccess ? (
              <Card className="text-center py-6">
                <CardContent>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Issue Reported Successfully
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Your issue has been submitted to the department head and will be addressed soon.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <form onSubmit={handleSubmitIssue}>
                <Card>
                  <CardHeader>
                    <CardTitle>Report an Issue</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Issue Title</label>
                      <Input placeholder="Brief description of the issue" required />
                    </div>

                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Department</label>
                      <Select required value={selectedDepartment} onValueChange={setSelectedDepartment}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="housekeeping">Housekeeping</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="frontdesk">Front Desk</SelectItem>
                          <SelectItem value="foodbeverage">Food & Beverage</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="spa">Spa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedDepartment && (
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Assign To</label>
                        <Select value={selectedAssignee} onValueChange={setSelectedAssignee}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select staff member" />
                          </SelectTrigger>
                          <SelectContent>
                            {departmentStaff[selectedDepartment as keyof typeof departmentStaff]?.map((staff) => (
                              <SelectItem key={staff} value={staff}>
                                {staff}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Priority</label>
                      <Select defaultValue="Medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Issue Description</label>
                      <Textarea
                        placeholder="Provide detailed information about the issue"
                        className="min-h-[100px]"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Upload Images or Videos</label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex gap-2">
                            <Camera className="h-5 w-5 text-muted-foreground" />
                            <FileVideo className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <p className="text-sm text-muted-foreground">Drag and drop files here or click to browse</p>
                          <Input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            accept="image/*,video/*"
                            multiple
                            onChange={handleFileChange}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById("file-upload")?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Choose Files
                          </Button>
                        </div>
                      </div>
                    </div>

                    {files.length > 0 && (
                      <div className="grid gap-2">
                        <label className="text-sm font-medium">Uploaded Files</label>
                        <div className="grid grid-cols-3 gap-2">
                          {files.map((file, index) => (
                            <div key={index} className="relative group">
                              <div className="border rounded-lg overflow-hidden aspect-video bg-muted flex items-center justify-center">
                                {isImage(file) ? (
                                  <img
                                    src={previewUrls[index] || "/placeholder.svg"}
                                    alt={`Preview ${index}`}
                                    className="object-cover w-full h-full"
                                  />
                                ) : isVideo(file) ? (
                                  <video src={previewUrls[index]} className="object-cover w-full h-full" controls />
                                ) : (
                                  <div className="text-xs text-center p-2">{file.name}</div>
                                )}
                              </div>
                              <button
                                type="button"
                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeFile(index)}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Issue Report"}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Details Dialog */}
      {showOrderDetails && (
        <Dialog open={!!showOrderDetails} onOpenChange={() => setShowOrderDetails(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>{orders.find((o) => o.id === showOrderDetails)?.id}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">{orders.find((o) => o.id === showOrderDetails)?.title}</h3>
                <p className="text-sm">{orders.find((o) => o.id === showOrderDetails)?.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p className="text-sm font-medium">{orders.find((o) => o.id === showOrderDetails)?.department}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Assigned By</p>
                  <p className="text-sm font-medium">{orders.find((o) => o.id === showOrderDetails)?.assignedBy}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm font-medium">{orders.find((o) => o.id === showOrderDetails)?.createdAt}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Due By</p>
                  <p className="text-sm font-medium">{orders.find((o) => o.id === showOrderDetails)?.dueBy}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Status</p>
                <div className="flex items-center gap-2">
                  <Badge
                    className={cn(
                      "text-xs",
                      statusColors[orders.find((o) => o.id === showOrderDetails)?.status as keyof typeof statusColors],
                    )}
                  >
                    {orders.find((o) => o.id === showOrderDetails)?.status}
                  </Badge>
                </div>
              </div>

              {orders.find((o) => o.id === showOrderDetails)?.status !== "completed" && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Update Status</p>
                  <Select defaultValue={orders.find((o) => o.id === showOrderDetails)?.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Update status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Textarea placeholder="Add notes about this order (optional)" className="mt-2" />
                </div>
              )}
            </div>

            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowOrderDetails(null)}>
                Close
              </Button>

              {orders.find((o) => o.id === showOrderDetails)?.status !== "completed" && (
                <Button>
                  {orders.find((o) => o.id === showOrderDetails)?.status === "pending"
                    ? "Start Order"
                    : "Complete Order"}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-4 left-0 right-0 z-10 px-4">
        <div className="premium-glass rounded-lg shadow-lg mx-auto max-w-md">
          <div className="grid grid-cols-3 gap-2 p-2">
            <Button
              variant={activeTab === "orders" ? "default" : "ghost"}
              className="flex flex-col h-auto py-2 rounded-md"
              onClick={() => setActiveTab("orders")}
            >
              <ClipboardList className="h-5 w-5 mb-1" />
              <span className="text-xs">Orders</span>
            </Button>
            <Button
              variant={activeTab === "tasks" ? "default" : "ghost"}
              className="flex flex-col h-auto py-2 rounded-md"
              onClick={() => setActiveTab("tasks")}
            >
              <Package className="h-5 w-5 mb-1" />
              <span className="text-xs">Tasks</span>
            </Button>
            <Button
              variant={activeTab === "report" ? "default" : "ghost"}
              className="flex flex-col h-auto py-2 rounded-md"
              onClick={() => setActiveTab("report")}
            >
              <AlertTriangle className="h-5 w-5 mb-1" />
              <span className="text-xs">Report</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
