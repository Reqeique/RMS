import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-4xl">
        <LoginForm />
      </div>
    </div>
  )
}
