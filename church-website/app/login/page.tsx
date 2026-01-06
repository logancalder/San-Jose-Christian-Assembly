"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MainNav from "@/components/main-nav"
import MainFooter from "@/components/main-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      // Store the token in localStorage
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      // Redirect to profile page
      router.push("/profile")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav language={language} toggleLanguage={toggleLanguage} currentPage="Login" />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8"
          >
            <h1 className="text-2xl font-bold text-center mb-6">
              {language === "en" ? "Login" : "登录"}
            </h1>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">
                  {language === "en" ? "Email" : "电子邮箱"}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">
                  {language === "en" ? "Password" : "密码"}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <Button type="submit" className="w-full">
                {language === "en" ? "Login" : "登录"}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-600">
              {language === "en" ? (
                <>
                  Don't have an account?{" "}
                  <Link href="/register" className="text-blue-600 hover:underline">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  还没有账号？{" "}
                  <Link href="/register" className="text-blue-600 hover:underline">
                    注册
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <MainFooter language={language} />
    </div>
  )
} 