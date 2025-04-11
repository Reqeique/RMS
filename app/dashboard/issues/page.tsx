"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, CheckCircle, Filter, Search, User } from "lucide-react"

// Sample issues data
const issuesData = [
  {
    id: "ISS-001",
    title: "Broken shower in room 302",
    description: "Guest reported that the shower head is broken and needs immediate attention.",
    priority: "High",
    status: "open",
    assignedTo: "Unassigned",
    reportedAt: "2024-06-10T09:30:00",
    reportedBy: "Front Desk",
    category: "Maintenance",
    department: "Housekeeping",
  },
  {
    id: "ISS-002",
    title: "AC not working in room 415",
    description: "Guest complained about AC not cooling properly. Needs inspection.",
    priority: "Medium",
    status: "in-progress",
    assignedTo: "Maria Garcia",
    reportedAt: "2024-06-10T10:15:00",
    reportedBy: "Guest Services",
    category: "Maintenance",
    department: "Maintenance",
  },
  {
    id: "ISS-003",
    title: "Stained carpet in room 210",
    description: "Deep cleaning required for a large coffee stain on the carpet.",
    priority: "Low",
    status: "open",
    assignedTo: "Unassigned",
    reportedAt: "2024-06-09T14:45:00",
    reportedBy: "Housekeeping",
    category: "Cleaning",
    department: "Housekeeping",
  },
  {
    id: "ISS-004",
    title: "Missing amenities in room 512",
    description: "Guest reported missing toiletries and coffee supplies.",
    priority: "Medium",
    status: "resolved",
    assignedTo: "Alex Thompson",
    reportedAt: "2024-06-09T16:30:00",
    reportedBy: "Guest",
    category: "Supplies",
    department: "Housekeeping",
    resolvedAt: "2024-06-09T17:15:00",
    resolution: "Delivered missing amenities and added extra as courtesy.",
  },
  {
    id: "ISS-005",
    title: "Noise complaint from room 303",
    description: "Guest in room 303 complained about excessive noise from room 305.",
    priority: "High",
    status: "resolved",
    assignedTo: "Sarah Johnson",
    reportedAt: "2024-06-10T01:20:00",
    reportedBy: "Front Desk",
    category: "Guest Relations",
    department: "Front Desk",
    resolvedAt: "2024-06-10T01:45:00",
    resolution: "Spoke with guests in room 305 who agreed to keep noise down.",
  },
  {
    id: "ISS-006",
    title: "Broken TV in room 401",
    description: "TV in room 401 is not turning on. Guest requested immediate fix.",
    priority: "High",
    status: "open",
    assignedTo: "Unassigned",
    reportedAt: "2024-06-10T11:20:00",
    reportedBy: "Guest",
    category: "Electronics",
    department: "Maintenance",
  },
  {
    id: "ISS-007",
    title: "Leaking faucet in room 207",
    description: "Bathroom sink faucet is leaking. Needs repair.",
    priority: "Medium",
    status: "in-progress",
    assignedTo: "John Smith",
    reportedAt: "2024-06-09T13:10:00",
    reportedBy: "Housekeeping",
    category: "Plumbing",
    department: "Maintenance",
  },
]

// Sample escalations data
const escalationsData = [
  {
    id: "ESC-001",
    title: "Repeated AC issues in room 415",
    description: "Guest has complained multiple times about AC issues. Needs urgent attention.",
    priority: "Critical",
    status: "pending",
    originalIssueId: "ISS-002",
    escalatedAt: "2024-06-10T14:30:00",
    escalatedBy: "Front Desk Manager",
    assignedTo: "Maintenance Head",
    department: "Maintenance",
  },
  {
    id: "ESC-002",
    title: "VIP guest complaint about room cleanliness",
    description: "VIP guest in room 501 complained about room not being properly cleaned upon arrival.",
    priority: "Critical",
    status: "in-progress",
    originalIssueId: "ISS-008",
    escalatedAt: "2024-06-10T12:15:00",
    escalatedBy: "Guest Relations",
    assignedTo: "Housekeeping Head",
    department: "Housekeeping",
  },
  {
    id: "ESC-003",
    title: "Recurring plumbing issues on 2nd floor",
    description: "Multiple rooms on 2nd floor reporting plumbing issues. Might be a systemic problem.",
    priority: "High",
    status: "pending",
    originalIssueId: "ISS-007",
    escalatedAt: "2024-06-09T16:45:00",
    escalatedBy: "Maintenance Staff",
    assignedTo: "Facilities Director",
    department: "Maintenance",
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

export default function IssuesAndEscalations() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
  const [selectedEscalation, setSelectedEscalation] = useState<string | null>(null)
  const [assignStaffId, setAssignStaffId] = useState("")
  const [assignDepartmentId, setAssignDepartmentId] = useState("")
  const [resolution, setResolution] = useState("")

  // Filter issues based on search query and filters
  const filteredIssues = issuesData.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || issue.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesPriority = priorityFilter === "all" || issue.priority.toLowerCase() === priorityFilter.toLowerCase()
    const matchesDepartment =
      departmentFilter === "all" || issue.department.toLowerCase() === departmentFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesPriority && matchesDepartment
  })

  // Filter escalations based on search query and filters
  const filteredEscalations = escalationsData.filter((escalation) => {
    const matchesSearch =
      escalation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      escalation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      escalation.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || escalation.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesPriority =
      priorityFilter === "all" || escalation.priority.toLowerCase() === priorityFilter.toLowerCase()
    const matchesDepartment =
      departmentFilter === "all" || escalation.department.toLowerCase() === departmentFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesPriority && matchesDepartment
  })

  const selectedIssueItem = issuesData.find((issue) => issue.id === selectedIssue)
  const selectedEscalationItem = escalationsData.find((escalation) => escalation.id === selectedEscalation)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Issues & Escalations</h1>
        <p className="text-sm text-muted-foreground">Manage and resolve issues across all departments</p>
      </div>

      <Tabs defaultValue="issues">
        <TabsList>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="escalations">Escalations</TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="mt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-2/3 space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search issues..."
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
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-[130px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
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
                {filteredIssues.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-2 text-lg font-medium">No issues found</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  filteredIssues.map((issue) => (
                    <Card
                      key={issue.id}
                      className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedIssue === issue.id ? "border-primary" : ""
                      }`}
                      onClick={() => {
                        setSelectedIssue(issue.id)
                        setSelectedEscalation(null)
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{issue.title}</h3>
                              <Badge
                                variant={
                                  issue.priority === "High"
                                    ? "destructive"
                                    : issue.priority === "Medium"
                                      ? "default"
                                      : "secondary"
                                }
                                className="text-xs"
                              >
                                {issue.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {issue.id} • {issue.category} • {issue.department} • Reported:{" "}
                              {new Date(issue.reportedAt).toLocaleString()}
                            </p>
                          </div>
                          <Badge
                            variant={
                              issue.status === "resolved"
                                ? "default"
                                : issue.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {issue.status}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm line-clamp-2">{issue.description}</p>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3 text-muted-foreground" />
                            <span>
                              {issue.assignedTo === "Unassigned" ? (
                                <span className="text-amber-500">Unassigned</span>
                              ) : (
                                issue.assignedTo
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">Reported by:</span> <span>{issue.reportedBy}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            <div className="md:w-1/3">
              {selectedIssueItem ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Issue Details</CardTitle>
                    <CardDescription>ID: {selectedIssueItem.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">Issue Information</h3>
                      <p className="mt-1 text-sm">{selectedIssueItem.title}</p>
                      <p className="mt-1 text-sm">{selectedIssueItem.description}</p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Priority:</span>{" "}
                          <Badge
                            variant={
                              selectedIssueItem.priority === "High"
                                ? "destructive"
                                : selectedIssueItem.priority === "Medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="ml-1"
                          >
                            {selectedIssueItem.priority}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>{" "}
                          <Badge
                            variant={
                              selectedIssueItem.status === "resolved"
                                ? "default"
                                : selectedIssueItem.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="ml-1"
                          >
                            {selectedIssueItem.status}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Department:</span>{" "}
                          <span>{selectedIssueItem.department}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Category:</span>{" "}
                          <span>{selectedIssueItem.category}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Reported By:</span>{" "}
                          <span>{selectedIssueItem.reportedBy}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Reported At:</span>{" "}
                          <span>{new Date(selectedIssueItem.reportedAt).toLocaleString()}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Assigned To:</span>{" "}
                          <span className={selectedIssueItem.assignedTo === "Unassigned" ? "text-amber-500" : ""}>
                            {selectedIssueItem.assignedTo}
                          </span>
                        </div>
                        {selectedIssueItem.resolvedAt && (
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Resolved At:</span>{" "}
                            <span>{new Date(selectedIssueItem.resolvedAt).toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedIssueItem.resolution ? (
                      <div>
                        <h3 className="text-sm font-medium">Resolution</h3>
                        <p className="mt-1 text-sm">{selectedIssueItem.resolution}</p>
                      </div>
                    ) : (
                      <>
                        {selectedIssueItem.department === "Unassigned" && (
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

                        {selectedIssueItem.assignedTo === "Unassigned" && (
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
                                      staff.department.toLowerCase() === selectedIssueItem.department.toLowerCase(),
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
                          <h3 className="text-sm font-medium">Resolution</h3>
                          <Textarea
                            placeholder="Describe how the issue was resolved..."
                            className="mt-2"
                            rows={3}
                            value={resolution}
                            onChange={(e) => setResolution(e.target.value)}
                          />
                        </div>
                      </>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {selectedIssueItem.status === "resolved" ? (
                      <Button className="w-full" variant="outline">
                        Reopen Issue
                      </Button>
                    ) : (
                      <>
                        {selectedIssueItem.status === "open" ? (
                          <Button disabled={!assignStaffId && selectedIssueItem.assignedTo === "Unassigned"}>
                            Assign & Start
                          </Button>
                        ) : (
                          <Button disabled={!resolution}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Resolved
                          </Button>
                        )}
                        <Button variant="outline">Escalate Issue</Button>
                      </>
                    )}
                  </CardFooter>
                </Card>
              ) : selectedEscalationItem ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Escalation Details</CardTitle>
                    <CardDescription>ID: {selectedEscalationItem.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">Escalation Information</h3>
                      <p className="mt-1 text-sm">{selectedEscalationItem.title}</p>
                      <p className="mt-1 text-sm">{selectedEscalationItem.description}</p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Priority:</span>{" "}
                          <Badge variant="destructive" className="ml-1">
                            {selectedEscalationItem.priority}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>{" "}
                          <Badge
                            variant={
                              selectedEscalationItem.status === "resolved"
                                ? "default"
                                : selectedEscalationItem.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="ml-1"
                          >
                            {selectedEscalationItem.status}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Department:</span>{" "}
                          <span>{selectedEscalationItem.department}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Original Issue:</span>{" "}
                          <span>{selectedEscalationItem.originalIssueId}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Escalated By:</span>{" "}
                          <span>{selectedEscalationItem.escalatedBy}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Escalated At:</span>{" "}
                          <span>{new Date(selectedEscalationItem.escalatedAt).toLocaleString()}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Assigned To:</span>{" "}
                          <span>{selectedEscalationItem.assignedTo}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium">Resolution Plan</h3>
                      <Textarea
                        placeholder="Describe the resolution plan..."
                        className="mt-2"
                        rows={3}
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button disabled={!resolution}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Resolve Escalation
                    </Button>
                    <Button variant="outline">View Original Issue</Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-2 text-lg font-medium">No item selected</h3>
                    <p className="text-sm text-muted-foreground">Select an issue to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="escalations" className="mt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-2/3 space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search escalations..."
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
                      <SelectItem value="resolved">Resolved</SelectItem>
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
                {filteredEscalations.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-2 text-lg font-medium">No escalations found</h3>
                    <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  filteredEscalations.map((escalation) => (
                    <Card
                      key={escalation.id}
                      className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedEscalation === escalation.id ? "border-primary" : ""
                      }`}
                      onClick={() => {
                        setSelectedEscalation(escalation.id)
                        setSelectedIssue(null)
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{escalation.title}</h3>
                              <Badge variant="destructive" className="text-xs">
                                {escalation.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {escalation.id} • {escalation.department} • Escalated:{" "}
                              {new Date(escalation.escalatedAt).toLocaleString()}
                            </p>
                          </div>
                          <Badge
                            variant={
                              escalation.status === "resolved"
                                ? "default"
                                : escalation.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {escalation.status}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm line-clamp-2">{escalation.description}</p>
                        <div className="mt-2 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3 text-muted-foreground" />
                            <span>{escalation.assignedTo}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">Original Issue:</span>{" "}
                            <span>{escalation.originalIssueId}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            <div className="md:w-1/3">
              {selectedEscalationItem ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Escalation Details</CardTitle>
                    <CardDescription>ID: {selectedEscalationItem.id}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium">Escalation Information</h3>
                      <p className="mt-1 text-sm">{selectedEscalationItem.title}</p>
                      <p className="mt-1 text-sm">{selectedEscalationItem.description}</p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Priority:</span>{" "}
                          <Badge variant="destructive" className="ml-1">
                            {selectedEscalationItem.priority}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>{" "}
                          <Badge
                            variant={
                              selectedEscalationItem.status === "resolved"
                                ? "default"
                                : selectedEscalationItem.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="ml-1"
                          >
                            {selectedEscalationItem.status}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Department:</span>{" "}
                          <span>{selectedEscalationItem.department}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Original Issue:</span>{" "}
                          <span>{selectedEscalationItem.originalIssueId}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Escalated By:</span>{" "}
                          <span>{selectedEscalationItem.escalatedBy}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Escalated At:</span>{" "}
                          <span>{new Date(selectedEscalationItem.escalatedAt).toLocaleString()}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Assigned To:</span>{" "}
                          <span>{selectedEscalationItem.assignedTo}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium">Resolution Plan</h3>
                      <Textarea
                        placeholder="Describe the resolution plan..."
                        className="mt-2"
                        rows={3}
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button disabled={!resolution}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Resolve Escalation
                    </Button>
                    <Button variant="outline">View Original Issue</Button>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
