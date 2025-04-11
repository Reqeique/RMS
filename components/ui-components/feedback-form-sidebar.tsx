"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThumbsUp, ThumbsDown, MessageSquare, CheckCircle, Clock, Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DotPattern } from "@/components/ui/dot-pattern"

interface FeedbackFormSidebarProps {
  onComplete?: () => void
}

export default function FeedbackFormSidebar({ onComplete }: FeedbackFormSidebarProps) {
  const [step, setStep] = useState(1)
  const [sentiment, setSentiment] = useState<string | null>(null)
  const [category, setCategory] = useState<string>("")
  const [feedback, setFeedback] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [countryCode, setCountryCode] = useState<string>("+1")
  const [responseTime, setResponseTime] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsComplete(true)

      // Reset form after showing success
      setTimeout(() => {
        if (onComplete) {
          onComplete()
        }
      }, 2000)
    }, 1500)
  }

  const isNextDisabled = () => {
    if (step === 1) return !sentiment
    if (step === 2) return !category
    if (step === 3) return !feedback
    if (step === 4) return !name
    return false
  }

  return (
    <div className="px-6 py-4 relative">
      <DotPattern className="opacity-5" />

      {isComplete ? (
        <div className="text-center py-8 animate-scale-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Thank You for Your Feedback!</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Your feedback has been submitted successfully and will help us improve our services.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {step === 1 && "How was your experience?"}
                {step === 2 && "What area would you like to comment on?"}
                {step === 3 && "Tell us more about your experience"}
                {step === 4 && "Your information"}
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">Step {step} of 4</span>
            </div>
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-in-out"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Please select your overall sentiment about our services:
              </p>
              <RadioGroup value={sentiment || ""} onValueChange={setSentiment} className="grid grid-cols-3 gap-3">
                <div>
                  <RadioGroupItem value="positive" id="positive" className="peer sr-only" />
                  <Label
                    htmlFor="positive"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all duration-200 hover:scale-105"
                  >
                    <ThumbsUp className="mb-2 h-6 w-6 text-emerald-500" />
                    <span className="text-sm font-medium">Positive</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="neutral" id="neutral" className="peer sr-only" />
                  <Label
                    htmlFor="neutral"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all duration-200 hover:scale-105"
                  >
                    <MessageSquare className="mb-2 h-6 w-6 text-blue-500" />
                    <span className="text-sm font-medium">Neutral</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="negative" id="negative" className="peer sr-only" />
                  <Label
                    htmlFor="negative"
                    className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all duration-200 hover:scale-105"
                  >
                    <ThumbsDown className="mb-2 h-6 w-6 text-red-500" />
                    <span className="text-sm font-medium">Negative</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Which aspect of our service would you like to provide feedback on?
              </p>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="room_cleanliness">Room Cleanliness</SelectItem>
                  <SelectItem value="staff_service">Staff Service</SelectItem>
                  <SelectItem value="food_quality">Food Quality</SelectItem>
                  <SelectItem value="amenities">Amenities</SelectItem>
                  <SelectItem value="check_in_out">Check-in/out Process</SelectItem>
                  <SelectItem value="value_for_money">Value for Money</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <Label
                  htmlFor="responseTime"
                  className="text-gray-700 dark:text-gray-300 font-medium flex items-center"
                >
                  <Clock className="h-4 w-4 mr-1.5" />
                  Average Response Time <span className="text-gray-400 text-xs ml-1">(Optional)</span>
                </Label>
                <Select value={responseTime} onValueChange={setResponseTime}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="How long did it take to get a response?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under_5min">Under 5 minutes</SelectItem>
                    <SelectItem value="5_15min">5-15 minutes</SelectItem>
                    <SelectItem value="15_30min">15-30 minutes</SelectItem>
                    <SelectItem value="30_60min">30-60 minutes</SelectItem>
                    <SelectItem value="over_60min">Over 1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Please share your thoughts, suggestions, or concerns:
              </p>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Your feedback helps us improve..."
                className="min-h-[150px]"
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">
                  Your Name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="border-gray-200 dark:border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300 font-medium flex items-center">
                  <Phone className="h-4 w-4 mr-1.5" />
                  Phone Number <span className="text-gray-400 text-xs ml-1">(Optional)</span>
                </Label>
                <div className="flex">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-[80px] rounded-r-none border-r-0">
                      <SelectValue placeholder="+1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+1">+1</SelectItem>
                      <SelectItem value="+44">+44</SelectItem>
                      <SelectItem value="+91">+91</SelectItem>
                      <SelectItem value="+251">+251</SelectItem>
                      <SelectItem value="+86">+86</SelectItem>
                      <SelectItem value="+81">+81</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="rounded-l-none flex-1"
                    type="tel"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  We may contact you regarding your feedback if needed
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className={cn(
                "bg-white/50 dark:bg-black/50 border-gray-200/50 dark:border-gray-700/50",
                step === 1 && "opacity-50 cursor-not-allowed",
              )}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={isNextDisabled() || isSubmitting}
              className={cn("transition-all", isNextDisabled() || isSubmitting ? "opacity-70" : "hover:scale-105")}
            >
              {isSubmitting ? "Submitting..." : step < 4 ? "Next" : "Submit Feedback"}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
