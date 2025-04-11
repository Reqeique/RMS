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
    priority: "high",
    status: "open",
    assignedTo: "Unassigned",
    reportedAt: "2024-06-10T09:30:00",
    reportedBy: "Front Desk",
    category: "Maintenance",
  },
  {
    id: "ISS-002",
    title: "AC not working in room 415",
    description: "Guest complained about AC not cooling properly. Needs inspection.",
    priority: "medium",
    status: "in-progress",
    assignedTo: "Maria Garcia",
    reportedAt: "2024-06-10T10:15:00",
    reportedBy: "Guest Services",
    category: "Maintenance",
  },
  {
    id: "ISS-003",
    title: "Stained carpet in room 210",
    description: "Deep cleaning required for a large coffee stain on the carpet.",
    priority: "low",
    status: "open",
    assignedTo: "Unassigned",
    reportedAt: "2024-06-09T14:45:00",
    reportedBy: "Housekeeping",
    category: "Cleaning",
  },
  {
    id: "ISS-004",
    title: "Missing amenities in room 512",
    description: "Guest reported missing toiletries and coffee supplies.",
    priority: "medium",
    status: "resolved",
    assignedTo: "Alex Thompson",
    reportedAt: "2024-06-09T16:30:00",
    reportedBy: "Guest",
    category: "Supplies",
    resolvedAt: "2024-06-09T17:15:00",
    resolution: "Delivered missing amenities and added extra as courtesy.",
  },
  {
    id: "ISS-005",
    title: "Noise complaint from room 303",
    description: "Guest in room 303 complained about excessive noise from room 305.",
    priority: "high",
    status: "resolved",
    assignedTo: "Sarah Johnson",
    reportedAt: "2024-06-10T01:20:00",
    reportedBy: "Front Desk",
    category: "Guest Relations",
    resolvedAt: "2024-06-10T01:45:00",
    resolution: "Spoke with guests in room 305 who agreed to keep noise down.",
  },
]

// Sample staff data
const staffData = [
  { id: "1", name: "Maria Garcia", position: "Senior Housekeeper", currentLoad: 2 },
  { id: "2", name: "Alex Thompson", position: "Housekeeper", currentLoad: 1 },
  { id: "3", name: "James Wilson", position: "Housekeeper", currentLoad: 0 },
  { id: "4", name: "Sarah Johnson", position: "Supervisor", currentLoad: 1 },
  { id: "5", name: "Lisa Chen", position: "Housekeeper", currentLoad: 1 },
]

export default function DepartmentIssues() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null)
  const [assignStaffId, setAssignStaffId] = useState("")
  const [resolution, setResolution] = useState("")

  // Filter issues based on search query and filters
  const filteredIssues = issuesData.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || issue.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesPriority = priorityFilter === "all" || issue.priority.toLowerCase() === priorityFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesPriority
  })

  const selectedIssueItem = issuesData.find((issue) => issue.id === selectedIssue)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Issues & Tasks</h1>
        <p className="text-sm text-muted-foreground">Manage and resolve issues assigned to your department</p>
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
                <div className="flex gap-2">
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
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
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
                      onClick={() => setSelectedIssue(issue.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{issue.title}</h3>
                              <Badge
                                variant={
                                  issue.priority === "high"
                                    ? "destructive"
                                    : issue.priority === "medium"
                                      ? "default"
                                      : "secondary"
                                }
                                className="text-xs"
                              >
                                {issue.priority}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {issue.id} • {issue.category} • Reported: {new Date(issue.reportedAt).toLocaleString()}
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
                              selectedIssueItem.priority === "high"
                                ? "destructive"
                                : selectedIssueItem.priority === "medium"
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
                        <div>
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
                        {selectedIssueItem.assignedTo === "Unassigned" && (
                          <div>
                            <h3 className="text-sm font-medium">Assign Staff</h3>
                            <Select value={assignStaffId} onValueChange={setAssignStaffId}>
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select staff member" />
                              </SelectTrigger>
                              <SelectContent>
                                {staffData.map((staff) => (
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
                          <Button disabled={!assignStaffId}>Assign & Start</Button>
                        ) : (
                          <Button disabled={!resolution}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Resolved
                          </Button>
                        )}
                      </>
                    )}
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-2 text-lg font-medium">No issue selected</h3>
                    <p className="text-sm text-muted-foreground">Select an issue to view details</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="escalations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Escalated Issues</CardTitle>
              <CardDescription>Issues that have been escalated to management</CardDescription>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-2 text-lg font-medium">No escalated issues</h3>
              <p className="text-sm text-muted-foreground">
                There are currently no issues that have been escalated to management
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
