"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Bot, User, Send, ThumbsUp, ThumbsDown, Smile, Frown, Meh } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Hello! I'm your AI assistant. I'd love to hear about your experience. What would you like to share today?",
    sender: "bot",
    timestamp: new Date(),
  },
]

export default function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      let botResponse = ""

      // Simple keyword matching for demo purposes
      const lowercaseInput = input.toLowerCase()
      if (lowercaseInput.includes("room") && (lowercaseInput.includes("dirty") || lowercaseInput.includes("clean"))) {
        botResponse =
          "I'm sorry to hear about the room cleanliness issue. This is important feedback. Could you provide your room number so we can address this immediately?"
      } else if (
        lowercaseInput.includes("staff") &&
        (lowercaseInput.includes("rude") || lowercaseInput.includes("unhelpful"))
      ) {
        botResponse =
          "I apologize for the staff interaction you experienced. We take service quality very seriously. Could you share when this happened and which department it involved?"
      } else if (
        lowercaseInput.includes("food") ||
        lowercaseInput.includes("restaurant") ||
        lowercaseInput.includes("breakfast")
      ) {
        botResponse =
          "Thank you for your feedback about our dining services. We're always looking to improve our menu and service. Would you mind sharing specific items or suggestions?"
      } else if (
        lowercaseInput.includes("great") ||
        lowercaseInput.includes("excellent") ||
        lowercaseInput.includes("amazing")
      ) {
        botResponse =
          "That's wonderful to hear! We're delighted that you had a positive experience. Is there anything specific that made your stay special?"
      } else {
        botResponse =
          "Thank you for sharing your feedback. Your input helps us improve our services. Is there anything specific you'd like us to address or improve?"
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-[500px] border border-gray-200 dark:border-[#1F1F23] rounded-xl overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("flex items-start gap-3 max-w-[80%]", message.sender === "user" ? "ml-auto" : "mr-auto")}
          >
            <div
              className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                message.sender === "user" ? "bg-gray-100 dark:bg-[#1F1F23] order-2" : "bg-blue-100 dark:bg-blue-900/30",
              )}
            >
              {message.sender === "user" ? (
                <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              ) : (
                <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              )}
            </div>

            <div
              className={cn(
                "rounded-lg p-3 text-sm",
                message.sender === "user"
                  ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  : "bg-gray-100 dark:bg-[#1F1F23] text-gray-900 dark:text-gray-100",
              )}
            >
              <p>{message.content}</p>
              <div
                className={cn(
                  "text-[10px] mt-1",
                  message.sender === "user" ? "text-gray-300 dark:text-gray-600" : "text-gray-500 dark:text-gray-400",
                )}
              >
                {formatTime(message.timestamp)}
              </div>

              {message.sender === "bot" && (
                <div className="flex items-center gap-1 mt-2">
                  <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#2B2B30] transition-colors">
                    <ThumbsUp className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#2B2B30] transition-colors">
                    <ThumbsDown className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-3 max-w-[80%]">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
              <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="rounded-lg p-3 bg-gray-100 dark:bg-[#1F1F23] text-gray-900 dark:text-gray-100">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your feedback here..."
            className="flex-1 bg-white dark:bg-[#1F1F23] border-gray-200 dark:border-[#2B2B30]"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className="bg-white dark:bg-white text-gray-900 dark:text-gray-900 border border-gray-200 hover:bg-gray-50"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          <button className="p-2 rounded-full bg-gray-100 dark:bg-[#1F1F23] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#2B2B30] transition-colors">
            <Smile className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 dark:bg-[#1F1F23] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#2B2B30] transition-colors">
            <Meh className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 dark:bg-[#1F1F23] text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#2B2B30] transition-colors">
            <Frown className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
