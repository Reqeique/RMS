"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Calendar, Filter, MoreHorizontal, Plus, Search, User, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample staff data
const staffData = [
  {
    id: "1",
    name: "Maria Garcia",
    position: "Senior Housekeeper",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2020-03-15",
    performance: 95,
    currentLoad: 2,
    skills: ["Deep Cleaning", "Supervision", "Training"],
    schedule: "Morning Shift (6 AM - 2 PM)",
  },
  {
    id: "2",
    name: "Alex Thompson",
    position: "Housekeeper",
    email: "alex.thompson@example.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2021-06-10",
    performance: 88,
    currentLoad: 1,
    skills: ["Room Cleaning", "Laundry"],
    schedule: "Afternoon Shift (2 PM - 10 PM)",
  },
  {
    id: "3",
    name: "James Wilson",
    position: "Housekeeper",
    email: "james.wilson@example.com",
    phone: "+1 (555) 345-6789",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2022-01-05",
    performance: 82,
    currentLoad: 0,
    skills: ["Room Cleaning", "Public Area Cleaning"],
    schedule: "Morning Shift (6 AM - 2 PM)",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    position: "Supervisor",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 456-7890",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2019-11-20",
    performance: 97,
    currentLoad: 1,
    skills: ["Supervision", "Training", "Quality Control", "Inventory Management"],
    schedule: "Rotating Shift",
  },
  {
    id: "5",
    name: "David Lee",
    position: "Housekeeper",
    email: "david.lee@example.com",
    phone: "+1 (555) 567-8901",
    status: "on-leave",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2021-09-15",
    performance: 79,
    currentLoad: 0,
    skills: ["Room Cleaning", "Laundry"],
    schedule: "Night Shift (10 PM - 6 AM)",
    leaveUntil: "2024-06-20",
  },
  {
    id: "6",
    name: "Lisa Chen",
    position: "Housekeeper",
    email: "lisa.chen@example.com",
    phone: "+1 (555) 678-9012",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2022-03-10",
    performance: 91,
    currentLoad: 1,
    skills: ["Room Cleaning", "VIP Service"],
    schedule: "Afternoon Shift (2 PM - 10 PM)",
  },
]

export default function StaffManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null)
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false)

  // Filter staff based on search query and filters
  const filteredStaff = staffData.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || staff.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const selectedStaffMember = staffData.find((staff) => staff.id === selectedStaff)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Staff Management</h1>
          <p className="text-sm text-muted-foreground">Manage your department staff members</p>
        </div>
        <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>Enter the details of the new staff member.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" placeholder="Full name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">
                  Position
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="housekeeper">Housekeeper</SelectItem>
                    <SelectItem value="senior-housekeeper">Senior Housekeeper</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="Email address" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" placeholder="Phone number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="schedule" className="text-right">
                  Schedule
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning Shift (6 AM - 2 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon Shift (2 PM - 10 PM)</SelectItem>
                    <SelectItem value="night">Night Shift (10 PM - 6 AM)</SelectItem>
                    <SelectItem value="rotating">Rotating Shift</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddStaffOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddStaffOpen(false)}>Add Staff</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {filteredStaff.length === 0 ? (
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-2 text-lg font-medium">No staff found</h3>
                <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredStaff.map((staff) => (
                <Card
                  key={staff.id}
                  className={`cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedStaff === staff.id ? "border-primary" : ""
                  }`}
                  onClick={() => setSelectedStaff(staff.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={staff.avatar} alt={staff.name} />
                        <AvatarFallback>
                          {staff.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{staff.name}</h3>
                          <Badge variant={staff.status === "active" ? "default" : "secondary"} className="text-xs">
                            {staff.status === "active" ? "Active" : "On Leave"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{staff.position}</p>
                        <div className="mt-1 flex items-center gap-4 text-xs">
                          <div>
                            <span className="text-muted-foreground">Performance:</span>{" "}
                            <span
                              className={
                                staff.performance >= 90
                                  ? "text-green-600 dark:text-green-400"
                                  : staff.performance >= 80
                                    ? "text-amber-600 dark:text-amber-400"
                                    : "text-red-600 dark:text-red-400"
                              }
                            >
                              {staff.performance}%
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Current Load:</span>{" "}
                            <span>{staff.currentLoad} tasks</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        <div className="md:w-1/3">
          {selectedStaffMember ? (
            <Card>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle>{selectedStaffMember.name}</CardTitle>
                  <CardDescription>{selectedStaffMember.position}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Staff</DropdownMenuItem>
                    <DropdownMenuItem>Assign Tasks</DropdownMenuItem>
                    <DropdownMenuItem>View Schedule</DropdownMenuItem>
                    <DropdownMenuItem>Performance Review</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedStaffMember.avatar} alt={selectedStaffMember.name} />
                    <AvatarFallback>
                      {selectedStaffMember.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Badge variant={selectedStaffMember.status === "active" ? "default" : "secondary"}>
                      {selectedStaffMember.status === "active" ? "Active" : "On Leave"}
                    </Badge>
                    {selectedStaffMember.status === "on-leave" && selectedStaffMember.leaveUntil && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Until: {new Date(selectedStaffMember.leaveUntil).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p>{selectedStaffMember.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p>{selectedStaffMember.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Join Date</p>
                    <p>{new Date(selectedStaffMember.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Schedule</p>
                    <p>{selectedStaffMember.schedule}</p>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm">Skills</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedStaffMember.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm">Performance</p>
                  <div className="mt-1">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          selectedStaffMember.performance >= 90
                            ? "bg-green-500"
                            : selectedStaffMember.performance >= 80
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${selectedStaffMember.performance}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1 text-xs">
                      <span>0%</span>
                      <span
                        className={
                          selectedStaffMember.performance >= 90
                            ? "text-green-600 dark:text-green-400"
                            : selectedStaffMember.performance >= 80
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-red-600 dark:text-red-400"
                        }
                      >
                        {selectedStaffMember.performance}%
                      </span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm">Current Tasks</p>
                  {selectedStaffMember.currentLoad > 0 ? (
                    <div className="mt-1 space-y-2">
                      <div className="rounded-md border p-2 text-xs">
                        <div className="font-medium">Clean rooms 301-310</div>
                        <div className="text-muted-foreground">Due: Today, 5:00 PM</div>
                      </div>
                      {selectedStaffMember.currentLoad > 1 && (
                        <div className="rounded-md border p-2 text-xs">
                          <div className="font-medium">Restock supplies on floor 4</div>
                          <div className="text-muted-foreground">Due: Today, 3:00 PM</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs mt-1">No active tasks</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Schedule
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Assign Task
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <User className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-2 text-lg font-medium">No staff selected</h3>
                <p className="text-sm text-muted-foreground">Select a staff member to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
