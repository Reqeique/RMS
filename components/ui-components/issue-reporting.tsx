"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, FileVideo, Upload, X, AlertTriangle, CheckCircle } from "lucide-react"

interface IssueReportingProps {
  className?: string
}

export function IssueReporting({ className }: IssueReportingProps) {
  const [files, setFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])

      // Create preview URLs
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file))
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls])
    }
  }

  const removeFile = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewUrls[index])

    setFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        setFiles([])
        setPreviewUrls([])
        const form = e.target as HTMLFormElement
        form.reset()
      }, 3000)
    }, 1500)
  }

  const isImage = (file: File) => file.type.startsWith("image/")
  const isVideo = (file: File) => file.type.startsWith("video/")

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Report an Issue</CardTitle>
        <CardDescription>Submit details about issues that need attention from your department head</CardDescription>
      </CardHeader>

      {isSuccess ? (
        <CardContent className="text-center py-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Issue Reported Successfully</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Your issue has been submitted to the department head and will be addressed soon.
          </p>
        </CardContent>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Issue Title</Label>
              <Input id="title" placeholder="Brief description of the issue" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="housekeeping">Housekeeping</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="frontdesk">Front Desk</SelectItem>
                  <SelectItem value="foodbeverage">Food & Beverage</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <div className="flex flex-wrap gap-2">
                {["low", "medium", "high", "critical"].map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    className={cn(
                      "px-3 py-2 rounded-md border-2 text-sm font-medium transition-colors",
                      priority === "critical"
                        ? "data-[state=active]:text-red-600 data-[state=active]:dark:text-red-400"
                        : priority === "high"
                          ? "data-[state=active]:text-amber-600 data-[state=active]:dark:text-amber-400"
                          : priority === "medium"
                            ? "data-[state=active]:text-yellow-600 data-[state=active]:dark:text-yellow-400"
                            : "data-[state=active]:text-emerald-600 data-[state=active]:dark:text-emerald-400",
                      "data-[state=active]:border-primary data-[state=active]:bg-primary/5",
                      "data-[state=inactive]:border-muted data-[state=inactive]:bg-background data-[state=inactive]:hover:bg-muted/30",
                    )}
                    data-state={priority === "medium" ? "active" : "inactive"}
                    onClick={() => {
                      // In a real implementation, this would update state
                      document.querySelectorAll('[data-state="active"]').forEach((el) => {
                        el.setAttribute("data-state", "inactive")
                      })
                      ;(event.target as HTMLButtonElement).setAttribute("data-state", "active")
                    }}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Issue Description</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about the issue"
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Upload Images or Videos</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-2">
                    <Camera className="h-5 w-5 text-muted-foreground" />
                    <FileVideo className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Drag and drop files here or click to browse</p>
                  <Input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
              </div>
            </div>

            {files.length > 0 && (
              <div className="grid gap-2">
                <Label>Uploaded Files</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {files.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="border rounded-lg overflow-hidden aspect-video bg-muted flex items-center justify-center">
                        {isImage(file) ? (
                          <img
                            src={previewUrls[index] || "/placeholder.svg"}
                            alt={`Preview ${index}`}
                            className="object-cover w-full h-full"
                          />
                        ) : isVideo(file) ? (
                          <video src={previewUrls[index]} className="object-cover w-full h-full" controls />
                        ) : (
                          <div className="text-xs text-center p-2">{file.name}</div>
                        )}
                      </div>
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div className="text-sm text-amber-800 dark:text-amber-300">
                <p className="font-medium">Important Note</p>
                <p className="mt-1">
                  This report will be visible to your department head and administrators. Please ensure all information
                  is accurate.
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Issue Report"}
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  )
}

export default IssueReporting
