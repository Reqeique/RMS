import type React from "react"
import type { Metadata } from "next"
import DepartmentSidebar from "@/components/ui-components/department-sidebar"

export const metadata: Metadata = {
  title: "Department Dashboard | RMS",
  description: "Department dashboard for the Resort Management System",
}

export default function DepartmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DepartmentSidebar />
      <main className="lg:pl-72 pt-4 pb-10">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}
