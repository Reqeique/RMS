"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Mail, Phone, Building } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function StaffRegistrationForm({ onClose }: { onClose: () => void }) {
  const [formStep, setFormStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    startDate: "",
    password: "",
    confirmPassword: "",
    address: "",
    emergencyContact: "",
    permissions: [] as string[],
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (permission: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, permissions: [...prev.permissions, permission] }
      } else {
        return { ...prev, permissions: prev.permissions.filter((p) => p !== permission) }
      }
    })
  }

  const handleNext = () => {
    setFormStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setFormStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after success
      setTimeout(() => {
        onClose()
      }, 2000)
    }, 1500)
  }

  const isNextDisabled = () => {
    if (formStep === 1) {
      return !formData.firstName || !formData.lastName || !formData.email || !formData.phone
    }
    if (formStep === 2) {
      return !formData.department || !formData.position || !formData.startDate
    }
    if (formStep === 3) {
      return !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword
    }
    return false
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-zinc-900 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>Register New Staff Member</DialogTitle>
          <DialogDescription>Create a new staff account and set up their permissions</DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Staff Registered Successfully</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-md">
              The new staff member has been registered and their login credentials have been created.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="px-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          formStep >= step
                            ? "bg-primary text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {step}
                      </div>
                      {step < 4 && (
                        <div
                          className={`w-10 h-1 ${formStep > step ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"}`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {formStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john.doe@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2 text-gray-400" />
                      <Select
                        value={formData.department}
                        onValueChange={(value) => handleSelectChange("department", value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="housekeeping">Housekeeping</SelectItem>
                          <SelectItem value="frontdesk">Front Desk</SelectItem>
                          <SelectItem value="foodbeverage">Food & Beverage</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="management">Management</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="Manager, Supervisor, Staff, etc."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address (Optional)</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Staff member's address"
                    />
                  </div>
                </div>
              )}

              {formStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                    {formData.password &&
                      formData.confirmPassword &&
                      formData.password !== formData.confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                      )}
                  </div>

                  <div className="space-y-2">
                    <Label>System Permissions</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        { id: "view_feedback", label: "View Feedback" },
                        { id: "respond_feedback", label: "Respond to Feedback" },
                        { id: "manage_orders", label: "Manage Orders" },
                        { id: "view_analytics", label: "View Analytics" },
                        { id: "manage_staff", label: "Manage Staff" },
                        { id: "admin_access", label: "Admin Access" },
                      ].map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.id}
                            checked={formData.permissions.includes(permission.id)}
                            onCheckedChange={(checked) => handleCheckboxChange(permission.id, checked as boolean)}
                          />
                          <label
                            htmlFor={permission.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {permission.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {formStep === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact (Optional)</Label>
                    <Input
                      id="emergencyContact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      placeholder="Name and phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any additional information about this staff member"
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Review Information</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
                        <p className="text-sm">
                          {formData.firstName} {formData.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-sm">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Department</p>
                        <p className="text-sm">{formData.department}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Position</p>
                        <p className="text-sm">{formData.position}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Start Date</p>
                        <p className="text-sm">{formData.startDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Permissions</p>
                        <p className="text-sm">{formData.permissions.length} granted</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="px-6 py-4 bg-gray-50 dark:bg-zinc-800/50">
              <div className="flex justify-between w-full">
                <Button type="button" variant="outline" onClick={formStep === 1 ? onClose : handleBack}>
                  {formStep === 1 ? "Cancel" : "Back"}
                </Button>

                {formStep < 4 ? (
                  <Button type="button" onClick={handleNext} disabled={isNextDisabled()}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register Staff"}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
