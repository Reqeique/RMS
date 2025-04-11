"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, ClipboardList, Filter, Search, Timer, User } from "lucide-react"

// Sample orders data
const ordersData = [
  {
    id: "ORD-001",
    title: "Clean rooms 301-310",
    description: "Deep cleaning required for rooms 301-310. Pay special attention to bathrooms.",
    priority: "high",
    status: "in-progress",
    assignedTo: "Maria Garcia",
    department: "Housekeeping",
    dueBy: "2024-06-10T17:00:00",
    createdAt: "2024-06-10T09:30:00",
    requestedBy: "Front Desk",
  },
  {
    id: "ORD-002",
    title: "Restock supplies in floor 4",
    description: "Restock all cleaning supplies and amenities for rooms on floor 4.",
    priority: "medium",
    status: "pending",
    assignedTo: "Alex Thompson",
    department: "Housekeeping",
    dueBy: "2024-06-10T15:00:00",
    createdAt: "2024-06-10T08:15:00",
    requestedBy: "Inventory",
  },
  {
    id: "ORD-003",
    title: "Special cleaning for VIP arrival",
    description: "Presidential suite needs special preparation for VIP guest arriving tomorrow.",
    priority: "critical",
    status: "pending",
    assignedTo: "Unassigned",
    department: "Housekeeping",
    dueBy: "2024-06-10T18:00:00",
    createdAt: "2024-06-10T10:45:00",
    requestedBy: "Management",
  },
  {
    id: "ORD-004",
    title: "Fix broken AC in room 215",
    description: "AC unit in room 215 is not cooling properly. Needs immediate attention.",
    priority: "high",
    status: "in-progress",
    assignedTo: "John Smith",
    department: "Maintenance",
    dueBy: "2024-06-10T14:00:00",
    createdAt: "2024-06-10T11:30:00",
    requestedBy: "Front Desk",
  },
  {
    id: "ORD-005",
    title: "Replace light bulbs in hallway",
    description: "Several light bulbs in the 3rd floor hallway need replacement.",
    priority: "low",
    status: "pending",
    assignedTo: "Unassigned",
    department: "Maintenance",
    dueBy: "2024-06-11T12:00:00",
    createdAt: "2024-06-10T13:15:00",
    requestedBy: "Housekeeping",
  },
  {
    id: "ORD-006",
    title: "Clean conference room A",
    description: "Conference room A needs to be cleaned and prepared for tomorrow's meeting.",
    priority: "medium",
    status: "completed",
    assignedTo: "James Wilson",
    department: "Housekeeping",
    dueBy: "2024-06-09T16:00:00",
    createdAt: "2024-06-09T10:30:00",
    requestedBy: "Events",
    completedAt: "2024-06-09T15:45:00",
  },
  {
    id: "ORD-007",
    title: "Maintenance issue in room 215",
    description: "Guest reported a leak in the bathroom. Need to clean up after maintenance fixes it.",
    priority: "high",
    status: "pending",
    assignedTo: "Lisa Chen",
    department: "Housekeeping",
    dueBy: "2024-06-10T14:00:00",
    createdAt: "2024-06-10T11:20:00",
    requestedBy: "Maintenance",
  },
]

// Sample staff data
const staffData = [
  { id: "1", name: "Maria Garcia", position: "Senior Housekeeper", department: "Housekeeping", currentLoad: 2 },
  { id: "2", name: "Alex Thompson", position: "Housekeeper", department: "Housekeeping", currentLoad: 1 },
  { id: "3", name: "James Wilson", position: "Housekeeper", department: "Housekeeping", currentLoad: 0 },
  { id: "4", name: "Sarah Johnson", position: "Supervisor", department: "Housekeeping", currentLoad: 1 },
  { id: "5", name: "Lisa Chen", position: "Housekeeper", department: "Housekeeping", currentLoad: 1 },
  { id: "6", name: "John Smith", position: "Maintenance Technician", department: "Maintenance", currentLoad: 3 },
  { id: "7", name: "Robert Brown", position: "Maintenance Supervisor", department: "Maintenance", currentLoad: 1 },
]

// Sample departments data
const departmentsData = [
  { id: "1", name: "Housekeeping" },
  { id: "2", name: "Maintenance" },
  { id: "3", name: "Front Desk" },
  { id: "4", name: "Food & Beverage" },
  { id: "5", name: "Spa & Wellness" },
]

export default function DepartmentOrders() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [assignStaffId, setAssignStaffId] = useState("")
  const [assignDepartmentId, setAssignDepartmentId] = useState("")

  // Filter orders based on search query and filters
  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesPriority = priorityFilter === "all" || order.priority.toLowerCase() === priorityFilter.toLowerCase()
    const matchesDepartment =
      departmentFilter === "all" || order.department.toLowerCase() === departmentFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesPriority && matchesDepartment
  })

  const selectedOrderItem = ordersData.find((order) => order.id === selectedOrder)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Department Orders</h1>
        <p className="text-sm text-muted-foreground">Manage and assign orders across all departments</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departmentsData.map((dept) => (
                    <SelectItem key={dept.id} value={dept.name.toLowerCase()}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8">
                <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-2 text-lg font-medium">No orders found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <Card
                  key={order.id}
                  className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedOrder === order.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedOrder(order.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{order.title}</h3>
                          <Badge
                            variant={
                              order.priority === "critical"
                                ? "destructive"
                                : order.priority === "high"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {order.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {order.id} • {order.department} • Created: {new Date(order.createdAt).toLocaleString()}
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
                        className="text-xs"
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm line-clamp-2">{order.description}</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span>
                          {order.assignedTo === "Unassigned" ? (
                            <span className="text-amber-500">Unassigned</span>
                          ) : (
                            order.assignedTo
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Timer className="h-3 w-3 text-muted-foreground" />
                        <span>Due: {new Date(order.dueBy).toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        <div className="md:w-1/3">
          {selectedOrderItem ? (
            <Card>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
                <CardDescription>ID: {selectedOrderItem.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Order Information</h3>
                  <p className="mt-1 text-sm">{selectedOrderItem.title}</p>
                  <p className="mt-1 text-sm">{selectedOrderItem.description}</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Priority:</span>{" "}
                      <Badge
                        variant={
                          selectedOrderItem.priority === "critical"
                            ? "destructive"
                            : selectedOrderItem.priority === "high"
                              ? "default"
                              : "secondary"
                        }
                        className="ml-1"
                      >
                        {selectedOrderItem.priority}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>{" "}
                      <Badge
                        variant={
                          selectedOrderItem.status === "completed"
                            ? "default"
                            : selectedOrderItem.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                        className="ml-1"
                      >
                        {selectedOrderItem.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Department:</span>{" "}
                      <span>{selectedOrderItem.department}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created:</span>{" "}
                      <span>{new Date(selectedOrderItem.createdAt).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Due By:</span>{" "}
                      <span>{new Date(selectedOrderItem.dueBy).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Requested By:</span>{" "}
                      <span>{selectedOrderItem.requestedBy}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Assigned To:</span>{" "}
                      <span className={selectedOrderItem.assignedTo === "Unassigned" ? "text-amber-500" : ""}>
                        {selectedOrderItem.assignedTo}
                      </span>
                    </div>
                    {selectedOrderItem.completedAt && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Completed At:</span>{" "}
                        <span>{new Date(selectedOrderItem.completedAt).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedOrderItem.status !== "completed" && (
                  <>
                    {!selectedOrderItem.department && (
                      <div>
                        <h3 className="text-sm font-medium">Assign Department</h3>
                        <Select value={assignDepartmentId} onValueChange={setAssignDepartmentId}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departmentsData.map((dept) => (
                              <SelectItem key={dept.id} value={dept.id}>
                                {dept.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {selectedOrderItem.assignedTo === "Unassigned" && (
                      <div>
                        <h3 className="text-sm font-medium">Assign Staff</h3>
                        <Select value={assignStaffId} onValueChange={setAssignStaffId}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select staff member" />
                          </SelectTrigger>
                          <SelectContent>
                            {staffData
                              .filter(
                                (staff) =>
                                  staff.department.toLowerCase() === selectedOrderItem.department.toLowerCase(),
                              )
                              .map((staff) => (
                                <SelectItem key={staff.id} value={staff.id}>
                                  <div className="flex items-center justify-between w-full">
                                    <span>{staff.name}</span>
                                    <Badge variant="outline" className="ml-2">
                                      {staff.currentLoad} tasks
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-medium">Notes</h3>
                      <Textarea placeholder="Add notes or special instructions..." className="mt-2" rows={3} />
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {selectedOrderItem.status === "completed" ? (
                  <Button className="w-full" variant="outline">
                    View Completion Report
                  </Button>
                ) : (
                  <>
                    {selectedOrderItem.status === "pending" ? (
                      <Button disabled={!assignStaffId && selectedOrderItem.assignedTo === "Unassigned"}>
                        Assign & Start
                      </Button>
                    ) : (
                      <Button>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark as Completed
                      </Button>
                    )}
                    <Button variant="outline">Create New Order</Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-2 text-lg font-medium">No order selected</h3>
                <p className="text-sm text-muted-foreground">Select an order to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
