"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { ArrowRight, Building, Users, Globe, Calendar, Lock, Mail, Phone, User } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    countryCode: "+1",
    phoneNumber: "",
    companyName: "",
    employeeSize: "",
    companySize: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    dateOfBirth: "",
    country: "",
    branches: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const isNextDisabled = () => {
    if (step === 1) {
      return !formData.email || !formData.phoneNumber
    }
    if (step === 2) {
      return !formData.companyName || !formData.employeeSize || !formData.companySize
    }
    if (step === 3) {
      return !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword
    }
    return false
  }

  const employeeSizeOptions = [
    { value: "1-10", label: "1-10 employees" },
    { value: "11-50", label: "11-50 employees" },
    { value: "51-200", label: "51-200 employees" },
    { value: "201-500", label: "201-500 employees" },
    { value: "501-1000", label: "501-1000 employees" },
    { value: "1000+", label: "1000+ employees" },
  ]

  const companySizeOptions = [
    { value: "startup", label: "Startup", icon: Building },
    { value: "small", label: "Small Business", icon: Building },
    { value: "medium", label: "Medium Enterprise", icon: Building },
    { value: "large", label: "Large Enterprise", icon: Building },
  ]

  const countryCodes = [
    { code: "+1", country: "US" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "IN" },
    { code: "+61", country: "AU" },
    { code: "+86", country: "CN" },
    { code: "+49", country: "DE" },
    { code: "+33", country: "FR" },
    { code: "+81", country: "JP" },
    { code: "+7", country: "RU" },
    { code: "+55", country: "BR" },
    { code: "+234", country: "NG" },
    { code: "+27", country: "ZA" },
    { code: "+20", country: "EG" },
    { code: "+254", country: "KE" },
    { code: "+251", country: "ET" },
  ]

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "China",
    "India",
    "Brazil",
    "Nigeria",
    "South Africa",
    "Egypt",
    "Kenya",
    "Ethiopia",
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-3xl">
        <Card className="overflow-hidden rounded-2xl morph-glass-light">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 bg-primary/10 p-6 md:p-8">
                <div className="flex flex-col h-full">
                  <div>
                    <Link href="/" className="flex items-center gap-2 mb-8">
                      <Building className="h-6 w-6 text-primary" />
                      <span className="text-xl font-bold">RMS Admin</span>
                    </Link>

                    <h1 className="text-2xl font-bold mb-2">Create Admin Account</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                      Set up your RMS account to manage your hotel feedback and operations
                    </p>
                  </div>

                  <div className="space-y-6 flex-1">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        1
                      </div>
                      <div>
                        <p className={`font-medium ${step >= 1 ? "text-primary" : "text-gray-500"}`}>
                          Account Information
                        </p>
                        <p className="text-xs text-gray-500">Email and contact details</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        2
                      </div>
                      <div>
                        <p className={`font-medium ${step >= 2 ? "text-primary" : "text-gray-500"}`}>Company Details</p>
                        <p className="text-xs text-gray-500">Your business information</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        3
                      </div>
                      <div>
                        <p className={`font-medium ${step >= 3 ? "text-primary" : "text-gray-500"}`}>Security Setup</p>
                        <p className="text-xs text-gray-500">Create your password</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step >= 4 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        4
                      </div>
                      <div>
                        <p className={`font-medium ${step >= 4 ? "text-primary" : "text-gray-500"}`}>
                          Personal Details
                        </p>
                        <p className="text-xs text-gray-500">Your personal information</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-8">
                    <p className="text-xs text-gray-500">
                      Already have an account?{" "}
                      <Link href="/" className="text-primary font-medium">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 p-6 md:p-8">
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-1">Account Information</h2>
                        <p className="text-sm text-gray-500 mb-6">Enter your contact details</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Phone Number
                          </Label>
                          <div className="flex">
                            <Select
                              value={formData.countryCode}
                              onValueChange={(value) => handleSelectChange("countryCode", value)}
                            >
                              <SelectTrigger className="w-[100px] rounded-r-none">
                                <SelectValue placeholder="+1" />
                              </SelectTrigger>
                              <SelectContent>
                                {countryCodes.map((country) => (
                                  <SelectItem key={country.code} value={country.code}>
                                    {country.code} ({country.country})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Input
                              id="phoneNumber"
                              name="phoneNumber"
                              type="tel"
                              placeholder="123-456-7890"
                              className="flex-1 rounded-l-none"
                              value={formData.phoneNumber}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-1">Company Details</h2>
                        <p className="text-sm text-gray-500 mb-6">Tell us about your business</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyName" className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            Company Name
                          </Label>
                          <Input
                            id="companyName"
                            name="companyName"
                            placeholder="Your Company Name"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Employee Size
                          </Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {employeeSizeOptions.map((option) => (
                              <div
                                key={option.value}
                                className={cn(
                                  "border rounded-lg p-3 cursor-pointer transition-all",
                                  formData.employeeSize === option.value
                                    ? "border-primary bg-primary/5"
                                    : "hover:border-gray-300 dark:hover:border-gray-600",
                                )}
                                onClick={() => handleSelectChange("employeeSize", option.value)}
                              >
                                <p className="text-sm font-medium">{option.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            Company Size
                          </Label>
                          <div className="grid grid-cols-2 gap-3">
                            {companySizeOptions.map((option) => {
                              const Icon = option.icon
                              return (
                                <div
                                  key={option.value}
                                  className={cn(
                                    "border rounded-lg p-4 cursor-pointer transition-all",
                                    formData.companySize === option.value
                                      ? "border-primary bg-primary/5"
                                      : "hover:border-gray-300 dark:hover:border-gray-600",
                                  )}
                                  onClick={() => handleSelectChange("companySize", option.value)}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                      <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <p className="text-sm font-medium">{option.label}</p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-1">Security Setup</h2>
                        <p className="text-sm text-gray-500 mb-6">Create a secure password</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="password" className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Password
                          </Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />
                          <p className="text-xs text-gray-500">
                            Password must be at least 8 characters with a number and special character
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Confirm Password
                          </Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                          />
                          {formData.password &&
                            formData.confirmPassword &&
                            formData.password !== formData.confirmPassword && (
                              <p className="text-xs text-red-500">Passwords do not match</p>
                            )}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold mb-1">Personal Details</h2>
                        <p className="text-sm text-gray-500 mb-6">Tell us about yourself</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Full Name
                          </Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Date of Birth
                          </Label>
                          <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country" className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            Country
                          </Label>
                          <Select
                            value={formData.country}
                            onValueChange={(value) => handleSelectChange("country", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country} value={country.toLowerCase()}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="branches" className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            Number of Branches
                          </Label>
                          <Input
                            id="branches"
                            name="branches"
                            type="number"
                            min="1"
                            placeholder="1"
                            value={formData.branches}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex justify-between">
                    {step > 1 ? (
                      <Button type="button" variant="outline" onClick={handleBack}>
                        Back
                      </Button>
                    ) : (
                      <div></div>
                    )}

                    {step < 4 ? (
                      <Button type="button" onClick={handleNext} disabled={isNextDisabled()} className="gap-2">
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button type="submit" className="gap-2">
                        Create Account
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
