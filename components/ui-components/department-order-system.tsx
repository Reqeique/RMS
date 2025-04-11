"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight, Send, AlertTriangle, Clock, CheckCircle, X, Plus, Filter, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Update the Department Order System with better organization, color coding, and add order button

// First, update the priorityConfig to capitalize priority words and use proper colors
const priorityConfig = {
  Critical: {
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
  High: {
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  },
  Medium: {
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  Low: {
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
}

const statusConfig = {
  pending: {
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    icon: Clock,
  },
  "in-progress": {
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    icon: AlertTriangle,
  },
  completed: {
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    icon: CheckCircle,
  },
}

// Update the OrderItem interface to use capitalized priority
interface OrderItem {
  id: string
  department: string
  title: string
  description: string
  priority: "Critical" | "High" | "Medium" | "Low"
  status: "pending" | "in-progress" | "completed"
  createdAt: string
  dueBy?: string
}

// Update the INITIAL_ORDERS to use capitalized priority
const INITIAL_ORDERS: OrderItem[] = [
  {
    id: "1",
    department: "Housekeeping",
    title: "Deep clean rooms 301-310",
    description: "Multiple guests reported dust and stains in these rooms. Schedule deep cleaning as soon as possible.",
    priority: "High",
    status: "in-progress",
    createdAt: "Today, 9:30 AM",
    dueBy: "Today, 5:00 PM",
  },
  {
    id: "2",
    department: "Maintenance",
    title: "Fix AC units in west wing",
    description:
      "Several guests complained about AC not cooling properly in rooms 401-415. Check refrigerant levels and repair as needed.",
    priority: "Critical",
    status: "pending",
    createdAt: "Today, 10:15 AM",
    dueBy: "Today, 3:00 PM",
  },
  {
    id: "3",
    department: "Food & Beverage",
    title: "Update breakfast menu options",
    description:
      "Based on feedback, add more vegan and gluten-free options to the breakfast menu. Work with chef to develop new items.",
    priority: "Medium",
    status: "pending",
    createdAt: "Yesterday, 4:20 PM",
    dueBy: "Next Monday",
  },
  {
    id: "4",
    department: "Front Desk",
    title: "Improve check-in process",
    description:
      "Guests report long wait times during peak check-in hours. Implement express check-in for loyalty members.",
    priority: "High",
    status: "completed",
    createdAt: "Yesterday, 11:45 AM",
  },
]

export default function DepartmentOrderSystem() {
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  // Update the newOrder state to use capitalized priority
  const [newOrder, setNewOrder] = useState({
    department: "",
    title: "",
    description: "",
    priority: "Medium",
    dueBy: "",
  })
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Update the handleCreateOrder function to use capitalized priority
  const handleCreateOrder = () => {
    const order: OrderItem = {
      id: Date.now().toString(),
      department: newOrder.department,
      title: newOrder.title,
      description: newOrder.description,
      priority: newOrder.priority as "Critical" | "High" | "Medium" | "Low",
      status: "pending",
      createdAt: "Just now",
      dueBy: newOrder.dueBy || undefined,
    }

    setOrders([order, ...orders])
    setIsDialogOpen(false)
    setNewOrder({
      department: "",
      title: "",
      description: "",
      priority: "Medium",
      dueBy: "",
    })
  }

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter((order) => order.id !== id))
  }

  const filteredOrders = orders.filter((order) => {
    // Status filter
    if (statusFilter !== "all" && order.status !== statusFilter) {
      return false
    }

    // Department filter
    if (departmentFilter !== "all" && order.department !== departmentFilter) {
      return false
    }

    // Search filter
    if (
      searchQuery &&
      !order.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !order.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search orders..."
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
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="h-9 text-sm bg-white/50 dark:bg-[#1F1F23]/50 border-zinc-200/50 dark:border-zinc-800/50 w-[130px] rounded-lg">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Housekeeping">Housekeeping</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
              <SelectItem value="Front Desk">Front Desk</SelectItem>
              <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
              <SelectItem value="Concierge">Concierge</SelectItem>
            </SelectContent>
          </Select>

          <button className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 border border-zinc-200/50 dark:border-zinc-800/50">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Update the header section to include an Add Order button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            {orders.filter((order) => order.status === "pending").length} Pending
          </Badge>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            {orders.filter((order) => order.status === "in-progress").length} In Progress
          </Badge>
          <Badge
            variant="outline"
            className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
          >
            {orders.filter((order) => order.status === "completed").length} Completed
          </Badge>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-white/50 dark:bg-white/10 text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 rounded-lg"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Order
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-white dark:bg-[#0F0F12] border-zinc-200/50 dark:border-[#1F1F23]/50 morph-glass rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-zinc-900 dark:text-zinc-100">Create Department Order</DialogTitle>
              <DialogDescription className="text-zinc-600 dark:text-zinc-400">
                Send an enhanced order to a department based on feedback analysis.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Department</label>
                <div className="col-span-3">
                  <Select
                    value={newOrder.department}
                    onValueChange={(value) => setNewOrder({ ...newOrder, department: value })}
                  >
                    <SelectTrigger className="bg-white/50 dark:bg-[#1F1F23]/50 border-zinc-200/50 dark:border-zinc-800/50 rounded-lg">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Front Desk">Front Desk</SelectItem>
                      <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                      <SelectItem value="Concierge">Concierge</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Title</label>
                <Input
                  className="col-span-3 bg-white/50 dark:bg-[#1F1F23]/50 border-zinc-200/50 dark:border-zinc-800/50 rounded-lg"
                  value={newOrder.title}
                  onChange={(e) => setNewOrder({ ...newOrder, title: e.target.value })}
                  placeholder="Order title"
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Description</label>
                <Textarea
                  className="col-span-3 bg-white/50 dark:bg-[#1F1F23]/50 border-zinc-200/50 dark:border-zinc-800/50 min-h-[100px] rounded-lg"
                  value={newOrder.description}
                  onChange={(e) => setNewOrder({ ...newOrder, description: e.target.value })}
                  placeholder="Detailed instructions for the department"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Priority</label>
                <div className="col-span-3">
                  <Select
                    value={newOrder.priority}
                    onValueChange={(value) => setNewOrder({ ...newOrder, priority: value })}
                  >
                    <SelectTrigger className="bg-white/50 dark:bg-[#1F1F23]/50 border-zinc-200/50 dark:border-zinc-800/50 rounded-lg">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    {/* Update the priority SelectContent in the dialog */}
                    <SelectContent>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Due By</label>
                <Input
                  className="col-span-3 bg-white/50 dark:bg-[#1F1F23]/50 border-zinc-200/50 dark:border-zinc-800/50 rounded-lg"
                  value={newOrder.dueBy}
                  onChange={(e) => setNewOrder({ ...newOrder, dueBy: e.target.value })}
                  placeholder="e.g. Today, 5:00 PM"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="bg-white/50 dark:bg-[#1F1F23]/50 border-zinc-200/50 dark:border-zinc-800/50 text-zinc-900 dark:text-zinc-100 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateOrder}
                className="bg-white/50 dark:bg-white/10 text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 rounded-lg"
                disabled={!newOrder.department || !newOrder.title || !newOrder.description}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredOrders.map((order) => {
          const StatusIcon = statusConfig[order.status].icon

          return (
            // Update the order cards to have better organization and alignment
            <div
              key={order.id}
              className={cn("p-4 rounded-lg border morph-glass", "transition-all duration-200 hover:shadow-md")}
            >
              {/* Update the order card content for better organization */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate mr-2">
                      {order.title}
                    </h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Badge
                        variant="outline"
                        className={cn("text-[10px] px-1.5 py-0 h-4", priorityConfig[order.priority].color)}
                      >
                        {order.priority}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn("text-[10px] px-1.5 py-0 h-4", statusConfig[order.status].color)}
                      >
                        <StatusIcon className="w-2.5 h-2.5 mr-1" />
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      Department:{" "}
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">{order.department}</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteOrder(order.id)
                  }}
                  className="p-1 rounded-md text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 ml-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="text-xs text-zinc-700 dark:text-zinc-300 mb-3">{order.description}</p>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Created: <span className="text-zinc-700 dark:text-zinc-300">{order.createdAt}</span>
                  </span>
                  {order.dueBy && (
                    <span className="text-zinc-500 dark:text-zinc-400">
                      Due: <span className="text-zinc-700 dark:text-zinc-300">{order.dueBy}</span>
                    </span>
                  )}
                </div>

                <Select defaultValue={order.status}>
                  <SelectTrigger className="h-7 text-xs bg-white/50 dark:bg-[#1F1F23]/50 border-zinc-200/50 dark:border-zinc-800/50 w-[120px] rounded-lg">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )
        })}
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
          <span>View Order History</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
