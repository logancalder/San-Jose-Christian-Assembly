"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, CheckCircle } from "lucide-react"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"
import { useToast } from "@/hooks/use-toast"

export default function SubscribePage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      
      toast({
        title: language === "en" ? "Success!" : "成功！",
        description: language === "en" 
          ? "You've been subscribed to daily devotions." 
          : "您已成功订阅每日灵修。",
        duration: 3000,
      })
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail("")
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav language={language} toggleLanguage={toggleLanguage} />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Link href="/" className="inline-flex items-center text-sm mb-8 hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === "en" ? "Back to Home" : "返回首页"}
            </Link>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h1 className="text-3xl font-bold mb-6 text-center">
                {language === "en" ? "Subscribe to Daily Devotions" : "订阅每日灵修"}
              </h1>
              
              {isSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">
                    {language === "en" ? "Thank You!" : "谢谢您！"}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {language === "en" 
                      ? "You've been successfully subscribed to our daily devotions." 
                      : "您已成功订阅我们的每日灵修。"}
                  </p>
                  <Button 
                    onClick={() => router.push("/")}
                    className="w-full"
                  >
                    {language === "en" ? "Return to Home" : "返回首页"}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {language === "en" ? "Email Address" : "电子邮箱"}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={language === "en" ? "your@email.com" : "您的邮箱"}
                      required
                      className="w-full"
                    />
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">
                      {language === "en" 
                        ? "By subscribing, you'll receive our daily devotionals directly in your inbox." 
                        : "订阅后，您将直接在收件箱中收到我们的每日灵修。"}
                    </p>
                    <p>
                      {language === "en" 
                        ? "We respect your privacy and will never share your information." 
                        : "我们尊重您的隐私，绝不会分享您的信息。"}
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting 
                      ? (language === "en" ? "Subscribing..." : "订阅中...") 
                      : (language === "en" ? "Subscribe" : "订阅")}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <MainFooter language={language} />
    </div>
  )
} 