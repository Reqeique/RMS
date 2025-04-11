"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { User, Users, Building } from "lucide-react"
import Link from "next/link"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Determine where to redirect based on role and device
    const isMobile = window.innerWidth < 1024

    if (selectedRole === "employee" || isMobile) {
      window.location.href = "/employee"
    } else if (selectedRole === "department") {
      window.location.href = "/department"
    } else {
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden rounded-2xl morph-glass-light">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome to RMS</h1>
                <p className="text-balance text-muted-foreground">Login to your RMS account</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required className="rounded-xl" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required className="rounded-xl" />
              </div>
              <Button type="submit" className="w-full rounded-xl" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue as</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full flex-col h-auto py-3 rounded-xl",
                    selectedRole === "admin" && "border-primary bg-primary/5 text-primary",
                  )}
                  onClick={() => setSelectedRole("admin")}
                >
                  <Building className="h-5 w-5 mb-1" />
                  <span className="text-xs">Admin</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full flex-col h-auto py-3 rounded-xl",
                    selectedRole === "department" && "border-primary bg-primary/5 text-primary",
                  )}
                  onClick={() => setSelectedRole("department")}
                >
                  <Users className="h-5 w-5 mb-1" />
                  <span className="text-xs">Department</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full flex-col h-auto py-3 rounded-xl",
                    selectedRole === "employee" && "border-primary bg-primary/5 text-primary",
                  )}
                  onClick={() => setSelectedRole("employee")}
                >
                  <User className="h-5 w-5 mb-1" />
                  <span className="text-xs">Employee</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block rounded-r-2xl overflow-hidden">
            <img
              src="/placeholder.svg?height=600&width=400"
              alt="RMS Resort"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
