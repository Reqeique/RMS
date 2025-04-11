"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Star, ChevronLeft, ChevronRight, Check, SendHorizontal } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
}

const feedbackQuestions: Question[] = [
  {
    id: 1,
    question: "How would you rate your overall experience?",
    options: ["Poor", "Below Average", "Average", "Good", "Excellent"],
  },
  {
    id: 2,
    question: "How satisfied were you with the cleanliness of your room?",
    options: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"],
  },
  {
    id: 3,
    question: "How would you rate the staff's friendliness and helpfulness?",
    options: ["Poor", "Below Average", "Average", "Good", "Excellent"],
  },
  {
    id: 4,
    question: "How was the quality of food and beverage services?",
    options: ["Poor", "Below Average", "Average", "Good", "Excellent"],
  },
  {
    id: 5,
    question: "Based on your experience, how likely are you to recommend us to others?",
    options: ["Not Likely", "Somewhat Unlikely", "Neutral", "Somewhat Likely", "Very Likely"],
  },
]

export default function FeedbackCollection() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(feedbackQuestions.length).fill(null))
  const [comments, setComments] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [progress, setProgress] = useState(0)

  const currentQuestion = feedbackQuestions[currentQuestionIndex]

  const handleSelectAnswer = (answerIndex: number) => {
    if (isSubmitted) return

    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = answerIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestionIndex < feedbackQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setProgress(((currentQuestionIndex + 1) / feedbackQuestions.length) * 100)
    } else {
      // Show comments field
      setCurrentQuestionIndex(feedbackQuestions.length)
      setProgress(100)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setProgress(((currentQuestionIndex - 1) / feedbackQuestions.length) * 100)
    }
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    // Here you would typically send the feedback data to your server
    console.log("Feedback answers:", answers)
    console.log("Comments:", comments)
  }

  const handleReset = () => {
    setCurrentQuestionIndex(0)
    setAnswers(Array(feedbackQuestions.length).fill(null))
    setComments("")
    setIsSubmitted(false)
    setProgress(0)
  }

  const renderStarRating = (question: Question, selectedRating: number | null) => {
    return (
      <div className="flex flex-col items-center gap-8 py-6">
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3, 4].map((index) => (
            <button
              key={index}
              className={cn(
                "p-1 rounded-full transition-all transform hover:scale-110",
                selectedRating !== null && index <= selectedRating
                  ? "text-yellow-400"
                  : "text-gray-300 dark:text-gray-600",
              )}
              onClick={() => handleSelectAnswer(index)}
            >
              <Star className="h-10 w-10 fill-current" />
            </button>
          ))}
        </div>
        <div className="text-center text-sm">
          {selectedRating !== null ? (
            <span className="font-medium">{question.options[selectedRating]}</span>
          ) : (
            "Click a star to rate"
          )}
        </div>
      </div>
    )
  }

  const renderCommentSection = () => {
    return (
      <div className="space-y-4 py-4">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          We value your feedback! Please share any additional comments or suggestions below.
        </p>
        <Textarea
          placeholder="Your comments help us improve our services..."
          className="min-h-[150px]"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          disabled={isSubmitted}
        />
      </div>
    )
  }

  const renderThankYouScreen = () => {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-bold mb-2">Thank You for Your Feedback!</h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          Your feedback has been submitted successfully. We appreciate you taking the time to share your thoughts with
          us.
        </p>
        <Button onClick={handleReset} variant="outline" className="mt-6">
          Submit Another Response
        </Button>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-center">Share Your Feedback</CardTitle>
        <CardDescription className="text-center">
          Help us improve our services by rating your experience
        </CardDescription>
        {!isSubmitted && <Progress value={progress} className="h-1 mt-4" />}
      </CardHeader>

      <CardContent className="min-h-[300px] flex flex-col justify-center">
        {isSubmitted ? (
          renderThankYouScreen()
        ) : currentQuestionIndex < feedbackQuestions.length ? (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-center">{currentQuestion.question}</h2>
            {renderStarRating(currentQuestion, answers[currentQuestionIndex])}
          </div>
        ) : (
          renderCommentSection()
        )}
      </CardContent>

      {!isSubmitted && (
        <CardFooter className="flex justify-between border-t border-gray-200 dark:border-[#1F1F23] px-6 py-4">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="text-gray-600 dark:text-gray-400"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentQuestionIndex < feedbackQuestions.length ? (
            <Button onClick={handleNext} disabled={answers[currentQuestionIndex] === null} variant="secondary">
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-white dark:bg-white text-gray-900 dark:text-gray-900 border border-gray-200 hover:bg-gray-50"
            >
              Submit Feedback
              <SendHorizontal className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
