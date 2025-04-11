"use client"

import type React from "react"

import {
  BarChart2,
  MessageSquare,
  Users2,
  AlertTriangle,
  Settings,
  Menu,
  Tablet,
  ArrowUpRight,
  Hotel,
  X,
  Bell,
  Search,
  User,
  LogOut,
  ChevronDown,
  TrendingUp,
  Home,
  ClipboardList,
} from "lucide-react"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "../theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const notificationRef = useRef<HTMLDivElement>(null)
  const notificationButtonRef = useRef<HTMLButtonElement>(null)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        notificationButtonRef.current &&
        !notificationButtonRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  const notifications = [
    {
      id: 1,
      title: "New feedback received",
      description: "A new feedback has been submitted",
      time: "5 minutes ago",
      unread: true,
      type: "feedback",
    },
    {
      id: 2,
      title: "New order assigned",
      description: "Clean rooms 301-310 has been assigned to you",
      time: "30 minutes ago",
      unread: true,
      type: "issue",
    },
    {
      id: 3,
      title: "Department order completed",
      description: "Housekeeping completed the cleaning request for rooms 401-410",
      time: "2 hours ago",
      unread: false,
      type: "order",
    },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: any
    children: React.ReactNode
  }) {
    const isActive = pathname === href

    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className={cn(
          "flex items-center px-3 py-2 text-sm rounded-md transition-all",
          isActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/5",
        )}
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg premium-glass shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed-sidebar m-4 mb-10 h-[calc(100vh-2.5rem)] w-64 transform transition-transform duration-300 ease-in-out z-[60]",
          "rounded-lg overflow-hidden bg-white dark:bg-zinc-900 shadow-lg",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="sidebar-container no-scrollbar">
          <div className="absolute top-4 right-4 lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="h-16 px-6 flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 relative z-10">
            <Link href="/dashboard" className="flex items-center gap-3">
              <Hotel className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white">RMS</span>
            </Link>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      ref={notificationButtonRef}
                      variant="ghost"
                      size="icon"
                      className="relative"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowNotifications(!showNotifications)
                      }}
                    >
                      <Bell className="h-4 w-4" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500 hover:bg-red-600">
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <ThemeToggle />
            </div>
          </div>

          {showNotifications && (
            <div
              ref={notificationRef}
              className="fixed top-20 right-4 lg:right-72 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-zinc-900 shadow-lg rounded-lg border border-gray-200 dark:border-zinc-800 z-[100] max-h-[80vh] overflow-auto"
            >
              <div className="p-3 border-b border-gray-200 dark:border-zinc-800 sticky top-0 bg-white dark:bg-zinc-900 flex justify-between items-center">
                <h3 className="font-medium">Notifications</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowNotifications(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b border-gray-200 dark:border-zinc-800 ${
                      notification.unread ? "bg-blue-50 dark:bg-blue-900/10" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`rounded-full p-1.5 ${
                          notification.type === "feedback"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : notification.type === "issue"
                              ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                              : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}
                      >
                        {notification.type === "feedback" ? (
                          <MessageSquare className="h-3 w-3" />
                        ) : notification.type === "issue" ? (
                          <AlertTriangle className="h-3 w-3" />
                        ) : (
                          <ClipboardList className="h-3 w-3" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{notification.description}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-gray-200 dark:border-zinc-800 sticky bottom-0 bg-white dark:bg-zinc-900">
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  View all notifications
                </Button>
              </div>
            </div>
          )}

          <div className="px-4 py-3 border-b border-gray-200 dark:border-zinc-800 relative z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-9 h-9 bg-gray-50 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="sidebar-content relative z-10 no-scrollbar">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Dashboard
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Home}>
                    Overview
                  </NavItem>
                  <NavItem href="/dashboard/analytics" icon={BarChart2}>
                    Analytics
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Feedback
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard/feedback-management" icon={MessageSquare}>
                    Feedback Management
                  </NavItem>
                  <NavItem href="/dashboard/categories" icon={ClipboardList}>
                    Feedback Categories
                  </NavItem>
                  <NavItem href="/dashboard/sentiment" icon={TrendingUp}>
                    Sentiment Analysis
                  </NavItem>
                  <NavItem href="/dashboard/kiosks" icon={Tablet}>
                    Digital Kiosks
                  </NavItem>
                  <NavItem href="/dashboard/feedback-form" icon={MessageSquare}>
                    Feedback Form
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Operations
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard/orders" icon={ArrowUpRight}>
                    Department Orders
                  </NavItem>
                  <NavItem href="/dashboard/escalations" icon={AlertTriangle}>
                    Issues & Escalations
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Management
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard/staff" icon={Users2}>
                    Staff Management
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Settings
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard/settings" icon={Settings}>
                    Settings
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto p-4 border-t border-gray-200 dark:border-zinc-800 relative z-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start px-2">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                  </div>
                  <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-zinc-900 border-0">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
