"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, Filter, MoreHorizontal, UserPlus, Building } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

export default function StaffManagementPage() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [registrationType, setRegistrationType] = useState<"staff" | "department-head">("staff")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [viewStaffDetails, setViewStaffDetails] = useState<number | null>(null)
  const [showEditStaffDialog, setShowEditStaffDialog] = useState(false)
  const [staffToEdit, setStaffToEdit] = useState<any>(null)

  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: "John Smith",
      username: "jsmith",
      department: "Housekeeping",
      position: "Manager",
      status: "Active",
      email: "john.smith@kuriftu.com",
      phone: "+251 912 345 678",
      role: "Department Head",
      permissions: ["manage_staff", "view_analytics", "respond_feedback"],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      username: "sjohnson",
      department: "Front Desk",
      position: "Supervisor",
      status: "Active",
      email: "sarah.johnson@kuriftu.com",
      phone: "+251 923 456 789",
      role: "Department Head",
      permissions: ["manage_staff", "view_analytics", "respond_feedback"],
    },
    {
      id: 3,
      name: "Michael Brown",
      username: "mbrown",
      department: "Food & Beverage",
      position: "Chef",
      status: "Active",
      email: "michael.brown@kuriftu.com",
      phone: "+251 934 567 890",
      role: "Staff",
      permissions: ["respond_feedback"],
    },
    {
      id: 4,
      name: "Emily Davis",
      username: "edavis",
      department: "Spa",
      position: "Therapist",
      status: "On Leave",
      email: "emily.davis@kuriftu.com",
      phone: "+251 945 678 901",
      role: "Staff",
      permissions: ["respond_feedback"],
    },
    {
      id: 5,
      name: "Robert Wilson",
      username: "rwilson",
      department: "Maintenance",
      position: "Technician",
      status: "Active",
      email: "robert.wilson@kuriftu.com",
      phone: "+251 956 789 012",
      role: "Department Head",
      permissions: ["manage_staff", "view_analytics", "respond_feedback"],
    },
  ])

  const handleDeleteStaff = (id: number) => {
    setStaffMembers(staffMembers.filter((staff) => staff.id !== id))
  }

  const filteredStaff = staffMembers.filter(
    (staff) =>
      (activeTab === "all" ||
        (activeTab === "department-heads" && staff.role === "Department Head") ||
        (activeTab === "staff" && staff.role === "Staff")) &&
      (staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.position.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleAddStaff = () => {
    setRegistrationType("staff")
    setShowRegistrationForm(true)
  }

  const handleAddDepartmentHead = () => {
    setRegistrationType("department-head")
    setShowRegistrationForm(true)
  }

  const handleEditStaff = (id: number) => {
    const staff = staffMembers.find((s) => s.id === id)
    if (staff) {
      setStaffToEdit(staff)
      setShowEditStaffDialog(true)
    }
  }

  const handleUpdateStaff = () => {
    if (staffToEdit) {
      setStaffMembers(staffMembers.map((staff) => (staff.id === staffToEdit.id ? staffToEdit : staff)))
      setShowEditStaffDialog(false)
      setStaffToEdit(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Staff Management</h1>
          <div className="flex gap-2">
            <Button
              className="bg-white dark:bg-white text-gray-900 dark:text-gray-900 border border-gray-200 dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-50"
              onClick={handleAddStaff}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Staff
            </Button>
            <Button
              className="bg-white dark:bg-white text-gray-900 dark:text-gray-900 border border-gray-200 dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-50"
              onClick={handleAddDepartmentHead}
            >
              <Building className="h-4 w-4 mr-2" />
              Add Department Head
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Staff Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, username, department..."
                  className="pl-9 bg-white dark:bg-zinc-900 border-gray-200 dark:border-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-3">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="department-heads">Department Heads</TabsTrigger>
                    <TabsTrigger value="staff">Staff</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.username}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>{staff.position}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            staff.role === "Department Head"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : ""
                          }
                        >
                          {staff.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            staff.status === "Active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          }`}
                        >
                          {staff.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setViewStaffDetails(staff.id)}>
                                <UserPlus className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditStaff(staff.id)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteStaff(staff.id)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Registration Form */}
      {showRegistrationForm && (
        <Dialog open={true} onOpenChange={() => setShowRegistrationForm(false)}>
          <DialogContent className="sm:max-w-[600px] bg-white dark:bg-zinc-900">
            <DialogHeader>
              <DialogTitle>
                {registrationType === "department-head" ? "Register New Department Head" : "Register New Staff Member"}
              </DialogTitle>
              <DialogDescription>
                {registrationType === "department-head"
                  ? "Create a new department head account with management permissions"
                  : "Create a new staff account and assign to a department"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="jdoe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@kuriftu.com" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+251 9XX XXX XXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="housekeeping">Housekeeping</SelectItem>
                      <SelectItem value="frontdesk">Front Desk</SelectItem>
                      <SelectItem value="foodbeverage">Food & Beverage</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="spa">Spa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="Manager, Supervisor, Staff, etc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm password" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="manage_staff" defaultChecked={registrationType === "department-head"} />
                    <Label htmlFor="manage_staff">Manage Staff</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="view_analytics" defaultChecked={registrationType === "department-head"} />
                    <Label htmlFor="view_analytics">View Analytics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="respond_feedback" defaultChecked />
                    <Label htmlFor="respond_feedback">Respond to Feedback</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="manage_orders" defaultChecked={registrationType === "department-head"} />
                    <Label htmlFor="manage_orders">Manage Orders</Label>
                  </div>
                  {registrationType === "department-head" && (
                    <div className="flex items-center space-x-2">
                      <Switch id="admin_access" />
                      <Label htmlFor="admin_access">Admin Access</Label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRegistrationForm(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowRegistrationForm(false)}>
                {registrationType === "department-head" ? "Register Department Head" : "Register Staff"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Staff Profile View */}
      {viewStaffDetails && (
        <Dialog open={true} onOpenChange={() => setViewStaffDetails(null)}>
          <DialogContent className="sm:max-w-[600px] bg-white dark:bg-zinc-900">
            <DialogHeader>
              <DialogTitle>Staff Profile</DialogTitle>
            </DialogHeader>

            {(() => {
              const staff = staffMembers.find((s) => s.id === viewStaffDetails)
              if (!staff) return null

              return (
                <div className="py-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                      {staff.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{staff.name}</h3>
                      <p className="text-sm text-muted-foreground">@{staff.username}</p>
                    </div>
                    <Badge
                      className="ml-auto"
                      variant="outline"
                      className={
                        staff.role === "Department Head"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          : ""
                      }
                    >
                      {staff.role}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Department</h4>
                      <p>{staff.department}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Position</h4>
                      <p>{staff.position}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                      <p>{staff.email}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Phone</h4>
                      <p>{staff.phone}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          staff.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}
                      >
                        {staff.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Permissions</h4>
                    <div className="flex flex-wrap gap-2">
                      {staff.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="bg-primary/10">
                          {permission.replace("_", " ")}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })()}

            <DialogFooter>
              <Button variant="outline" onClick={() => setViewStaffDetails(null)}>
                Close
              </Button>
              <Button>Edit Profile</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Staff Dialog */}
      {showEditStaffDialog && staffToEdit && (
        <Dialog open={true} onOpenChange={() => setShowEditStaffDialog(false)}>
          <DialogContent className="sm:max-w-[600px] bg-white dark:bg-zinc-900">
            <DialogHeader>
              <DialogTitle>Edit Staff Member</DialogTitle>
              <DialogDescription>Update staff information and permissions</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editFirstName">First Name</Label>
                  <Input
                    id="editFirstName"
                    value={staffToEdit.name.split(" ")[0]}
                    onChange={(e) =>
                      setStaffToEdit({
                        ...staffToEdit,
                        name: e.target.value + " " + staffToEdit.name.split(" ").slice(1).join(" "),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editLastName">Last Name</Label>
                  <Input
                    id="editLastName"
                    value={staffToEdit.name.split(" ").slice(1).join(" ")}
                    onChange={(e) =>
                      setStaffToEdit({
                        ...staffToEdit,
                        name: staffToEdit.name.split(" ")[0] + " " + e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editUsername">Username</Label>
                  <Input
                    id="editUsername"
                    value={staffToEdit.username}
                    onChange={(e) => setStaffToEdit({ ...staffToEdit, username: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEmail">Email</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    value={staffToEdit.email}
                    onChange={(e) => setStaffToEdit({ ...staffToEdit, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="editDepartment">Department</Label>
                  <Select
                    value={staffToEdit.department.toLowerCase()}
                    onValueChange={(value) =>
                      setStaffToEdit({
                        ...staffToEdit,
                        department: value.charAt(0).toUpperCase() + value.slice(1),
                      })
                    }
                  >
                    <SelectTrigger id="editDepartment">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="housekeeping">Housekeeping</SelectItem>
                      <SelectItem value="frontdesk">Front Desk</SelectItem>
                      <SelectItem value="foodbeverage">Food & Beverage</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="spa">Spa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPosition">Position</Label>
                  <Input
                    id="editPosition"
                    value={staffToEdit.position}
                    onChange={(e) => setStaffToEdit({ ...staffToEdit, position: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    { id: "manage_staff", label: "Manage Staff" },
                    { id: "view_analytics", label: "View Analytics" },
                    { id: "respond_feedback", label: "Respond to Feedback" },
                    { id: "manage_orders", label: "Manage Orders" },
                    { id: "admin_access", label: "Admin Access" },
                  ].map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Switch
                        id={`edit_${permission.id}`}
                        checked={staffToEdit.permissions.includes(permission.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setStaffToEdit({
                              ...staffToEdit,
                              permissions: [...staffToEdit.permissions, permission.id],
                            })
                          } else {
                            setStaffToEdit({
                              ...staffToEdit,
                              permissions: staffToEdit.permissions.filter((p: string) => p !== permission.id),
                            })
                          }
                        }}
                      />
                      <Label htmlFor={`edit_${permission.id}`}>{permission.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditStaffDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateStaff}>Update Staff</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
