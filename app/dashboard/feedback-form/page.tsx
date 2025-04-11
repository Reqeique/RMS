"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, ChevronRight, Hotel, Star, ThumbsUp } from "lucide-react"

export default function FeedbackFormPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roomNumber: "",
    service: "",
    rating: 0,
    reason: "",
    comments: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleRatingChange = (value: string) => {
    setFormData((prev) => ({ ...prev, rating: Number.parseInt(value) }))
    // Clear error when field is edited
    if (errors.rating) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.rating
        return newErrors
      })
    }
  }

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 2) {
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      if (!formData.roomNumber.trim()) newErrors.roomNumber = "Room number is required"
    } else if (currentStep === 3) {
      if (!formData.service) newErrors.service = "Please select a service"
      if (formData.rating === 0) newErrors.rating = "Please select a rating"
      if (formData.rating < 4 && !formData.reason.trim()) newErrors.reason = "Please provide a reason for your rating"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(step)) {
      setIsSubmitting(true)
      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted:", formData)
        setIsSubmitting(false)
        setStep(4) // Move to thank you step
      }, 1500)
    }
  }

  const renderStepIndicator = () => {
    return (
      <div className="flex justify-center mb-6">
        <div className="flex items-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  step >= i
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground border border-muted-foreground/20"
                }`}
              >
                {step > i ? <CheckCircle className="h-5 w-5" /> : i}
              </div>
              {i < 3 && <div className={`h-1 w-10 mx-1 ${step > i ? "bg-primary" : "bg-muted-foreground/20"}`}></div>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Card className="border-none shadow-lg">
        <CardHeader className="text-center bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex justify-center mb-2">
            <Hotel className="h-10 w-10" />
          </div>
          <CardTitle className="text-2xl">Guest Feedback Form</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            We value your opinion and would love to hear about your experience
          </CardDescription>
        </CardHeader>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="p-6">
              {step < 4 && renderStepIndicator()}

              {step === 1 && (
                <div className="text-center py-8">
                  <ThumbsUp className="h-16 w-16 mx-auto mb-4 text-primary" />
                  <h2 className="text-2xl font-bold mb-4">Welcome to our Feedback Form</h2>
                  <p className="mb-6 text-muted-foreground">
                    Your feedback helps us improve our services and provide a better experience for all our guests.
                  </p>
                  <p className="mb-2 text-sm">This form will take approximately 2-3 minutes to complete.</p>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 py-4">
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className={errors.phone ? "border-red-500" : ""}
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="roomNumber">Room Number</Label>
                    <Input
                      id="roomNumber"
                      name="roomNumber"
                      value={formData.roomNumber}
                      onChange={handleChange}
                      placeholder="Enter your room number"
                      className={errors.roomNumber ? "border-red-500" : ""}
                    />
                    {errors.roomNumber && <p className="text-red-500 text-sm">{errors.roomNumber}</p>}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 py-4">
                  <h2 className="text-xl font-semibold mb-4">Your Experience</h2>

                  <div className="space-y-2">
                    <Label htmlFor="service">Which service would you like to rate?</Label>
                    <Select value={formData.service} onValueChange={(value) => handleSelectChange("service", value)}>
                      <SelectTrigger className={errors.service ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="room_cleanliness">Room Cleanliness</SelectItem>
                        <SelectItem value="food_quality">Food Quality</SelectItem>
                        <SelectItem value="staff_service">Staff Service</SelectItem>
                        <SelectItem value="amenities">Amenities</SelectItem>
                        <SelectItem value="check_in">Check-in Experience</SelectItem>
                        <SelectItem value="overall">Overall Experience</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>How would you rate this service?</Label>
                    <div className="flex justify-center py-2">
                      <RadioGroup
                        value={formData.rating.toString()}
                        onValueChange={handleRatingChange}
                        className="flex space-x-2"
                      >
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <div key={rating} className="flex flex-col items-center space-y-1">
                            <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} className="sr-only" />
                            <Label
                              htmlFor={`rating-${rating}`}
                              className={`cursor-pointer p-2 rounded-full hover:bg-muted transition-colors ${
                                formData.rating === rating ? "text-yellow-500" : "text-muted-foreground"
                              }`}
                            >
                              <Star
                                className={`h-8 w-8 ${
                                  formData.rating >= rating ? "fill-yellow-400 text-yellow-400" : ""
                                }`}
                              />
                            </Label>
                            <span className="text-xs">{rating}</span>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    {errors.rating && <p className="text-red-500 text-sm text-center">{errors.rating}</p>}
                  </div>

                  {formData.rating > 0 && formData.rating < 4 && (
                    <div className="space-y-2">
                      <Label htmlFor="reason">What could we improve?</Label>
                      <Textarea
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="Please let us know what we could do better"
                        className={errors.reason ? "border-red-500" : ""}
                      />
                      {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="comments">Additional Comments (Optional)</Label>
                    <Textarea
                      id="comments"
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      placeholder="Any other feedback you'd like to share with us"
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center rounded-full p-4 bg-green-100 text-green-600 mb-6">
                    <CheckCircle className="h-12 w-12" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Thank You for Your Feedback!</h2>
                  <p className="mb-6 text-muted-foreground">
                    We appreciate you taking the time to share your experience with us. Your feedback helps us improve
                    our services.
                  </p>
                  <div className="bg-muted p-4 rounded-lg mb-6 mx-auto max-w-xs">
                    <p className="text-sm mb-2">Use this promo code on your next visit:</p>
                    <p className="text-xl font-bold text-primary">THANKYOU10</p>
                    <p className="text-xs text-muted-foreground mt-2">Valid for 10% off your next stay</p>
                  </div>
                </div>
              )}
            </CardContent>
          </motion.div>
        </AnimatePresence>

        <CardFooter className="flex justify-between p-6 pt-0">
          {step > 1 && step < 4 && (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          )}
          {step === 1 && (
            <Button className="ml-auto" onClick={nextStep}>
              Get Started
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {step === 2 && (
            <Button onClick={nextStep}>
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {step === 3 && (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          )}
          {step === 4 && (
            <Button className="mx-auto" onClick={() => (window.location.href = "/")}>
              Return to Homepage
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
