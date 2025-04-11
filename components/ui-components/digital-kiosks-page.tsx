"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Tablet, Calendar, Filter, Search, Settings, ArrowRight, ThumbsUp, MapPin, Battery, Power } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function DigitalKiosksPage() {
  const [timeRange, setTimeRange] = useState("30days")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Digital Kiosks</h1>
        <div className="flex items-center gap-3">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="h-9 text-sm bg-white dark:bg-black border-zinc-200 dark:border-zinc-800 w-[150px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-white dark:bg-black border-zinc-200 dark:border-zinc-800">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Kiosk Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Kiosks</CardTitle>
            <CardDescription>Active digital kiosks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">12</div>
              <Tablet className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 mt-1">
              <ArrowRight className="h-3 w-3 mr-1" />2 new kiosks added this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
            <CardDescription>Kiosk usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">3,542</div>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 mt-1">
              <ArrowRight className="h-3 w-3 mr-1" />
              +18.5% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Time</CardTitle>
            <CardDescription>Time spent per interaction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">2m 15s</div>
              <Battery className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 mt-1">
              <ArrowRight className="h-3 w-3 mr-1 rotate-180" />
              15s shorter than last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Feedback Collected</CardTitle>
            <CardDescription>From kiosk interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">1,248</div>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 mt-1">
              <ArrowRight className="h-3 w-3 mr-1" />
              +22.3% from last period
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kiosk Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-zinc-100 dark:bg-zinc-800/50 w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kiosk Locations</CardTitle>
              <CardDescription>Active digital kiosks and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "K001",
                    name: "Main Lobby Kiosk",
                    location: "Main Lobby",
                    status: "online",
                    lastActive: "2 minutes ago",
                    batteryLevel: 85,
                    interactions: 428,
                    feedbackCount: 156,
                  },
                  {
                    id: "K002",
                    name: "Restaurant Entrance",
                    location: "Restaurant Area",
                    status: "online",
                    lastActive: "5 minutes ago",
                    batteryLevel: 72,
                    interactions: 356,
                    feedbackCount: 124,
                  },
                  {
                    id: "K003",
                    name: "Pool Area Kiosk",
                    location: "Pool Deck",
                    status: "offline",
                    lastActive: "2 hours ago",
                    batteryLevel: 15,
                    interactions: 287,
                    feedbackCount: 98,
                  },
                  {
                    id: "K004",
                    name: "Conference Center",
                    location: "Conference Hall",
                    status: "online",
                    lastActive: "1 minute ago",
                    batteryLevel: 92,
                    interactions: 312,
                    feedbackCount: 142,
                  },
                ].map((kiosk, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-medium">{kiosk.name}</h3>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[10px]",
                              kiosk.status === "online"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                            )}
                          >
                            {kiosk.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {kiosk.location}
                        </div>
                      </div>

                      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Battery</div>
                          <div className="flex items-center gap-2">
                            <Battery className="h-3.5 w-3.5 text-muted-foreground" />
                            <Progress
                              value={kiosk.batteryLevel}
                              className={cn("h-2 flex-1", kiosk.batteryLevel < 20 ? "text-red-500" : "text-primary")}
                            />
                            <span className="text-xs font-medium">{kiosk.batteryLevel}%</span>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Interactions</div>
                          <div className="text-sm font-medium">{kiosk.interactions}</div>
                        </div>

                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Feedback</div>
                          <div className="text-sm font-medium">{kiosk.feedbackCount}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8">
                          <Settings className="h-3.5 w-3.5 mr-1" />
                          Manage
                        </Button>
                        {kiosk.status === "offline" && (
                          <Button variant="outline" size="sm" className="h-8">
                            <Power className="h-3.5 w-3.5 mr-1" />
                            Restart
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Tablet className="h-4 w-4 mr-2" />
                Add New Kiosk
              </Button>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Kiosk Usage by Location</CardTitle>
                <CardDescription>Interaction frequency by kiosk location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { location: "Main Lobby", interactions: 428, percentage: 28 },
                    { location: "Restaurant Area", interactions: 356, percentage: 23 },
                    { location: "Pool Deck", interactions: 287, percentage: 19 },
                    { location: "Conference Hall", interactions: 312, percentage: 20 },
                    { location: "Spa Entrance", interactions: 159, percentage: 10 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{item.location}</div>
                        <div className="text-sm text-muted-foreground">{item.interactions} interactions</div>
                      </div>
                      <Progress value={item.percentage} max={30} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feedback Collection</CardTitle>
                <CardDescription>Feedback collected through kiosks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-700 dark:text-green-400">78%</div>
                      <div className="text-xs text-green-600 dark:text-green-500">Positive</div>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">14%</div>
                      <div className="text-xs text-yellow-600 dark:text-yellow-500">Neutral</div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-red-700 dark:text-red-400">8%</div>
                      <div className="text-xs text-red-600 dark:text-red-500">Negative</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Top Feedback Categories</h4>
                    {[
                      { category: "Room Cleanliness", count: 245, percentage: 19.6 },
                      { category: "Staff Service", count: 218, percentage: 17.5 },
                      { category: "Food Quality", count: 187, percentage: 15.0 },
                      { category: "Amenities", count: 156, percentage: 12.5 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{item.category}</span>
                          <span className="text-muted-foreground">{item.count}</span>
                        </div>
                        <Progress value={item.percentage} max={20} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Kiosk Devices</CardTitle>
              <CardDescription>Manage all kiosk hardware and software</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search devices..."
                      className="pl-9 bg-white dark:bg-black border-zinc-200 dark:border-zinc-800"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button>
                      <Tablet className="h-4 w-4 mr-2" />
                      Add Device
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Device ID</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Name</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Location</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Status</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Last Active</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Software</th>
                        <th className="text-left p-3 text-xs font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {[
                        {
                          id: "K001",
                          name: "Main Lobby Kiosk",
                          location: "Main Lobby",
                          status: "online",
                          lastActive: "2 minutes ago",
                          software: "v2.4.1",
                        },
                        {
                          id: "K002",
                          name: "Restaurant Entrance",
                          location: "Restaurant Area",
                          status: "online",
                          lastActive: "5 minutes ago",
                          software: "v2.4.1",
                        },
                        {
                          id: "K003",
                          name: "Pool Area Kiosk",
                          location: "Pool Deck",
                          status: "offline",
                          lastActive: "2 hours ago",
                          software: "v2.3.8",
                        },
                        {
                          id: "K004",
                          name: "Conference Center",
                          location: "Conference Hall",
                          status: "online",
                          lastActive: "1 minute ago",
                          software: "v2.4.1",
                        },
                      ].map((kiosk, index) => (
                        <tr key={index} className="hover:bg-muted/50">
                          <td className="p-3 text-sm">{kiosk.id}</td>
                          <td className="p-3 text-sm font-medium">{kiosk.name}</td>
                          <td className="p-3 text-sm">{kiosk.location}</td>
                          <td className="p-3">
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-[10px]",
                                kiosk.status === "online"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                              )}
                            >
                              {kiosk.status}
                            </Badge>
                          </td>
                          <td className="p-3 text-sm">{kiosk.lastActive}</td>
                          <td className="p-3 text-sm">{kiosk.software}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <Settings className="h-3.5 w-3.5" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          {/* Analytics content */}
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          {/* Settings content */}
        </TabsContent>
      </Tabs>
    </div>
  )
}
