"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function ConnectPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send email")
      }

      toast({
        title: language === "en" ? "Message Sent!" : "消息已发送！",
        description: language === "en" 
          ? "Thank you for reaching out. We'll get back to you soon." 
          : "感谢您的联系。我们会尽快回复您。",
        duration: 3000,
      })
      
      setName("")
      setEmail("")
      setMessage("")
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: language === "en" ? "Error" : "错误",
        description: language === "en"
          ? "Failed to send message. Please try again later."
          : "发送消息失败。请稍后重试。",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf8f3]">
      <MainNav 
        language={language} 
        toggleLanguage={toggleLanguage}
        currentPage="Connect"
      />

      <main className="flex-1">
        {/* Hero Section - Values style */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/easter_25/!cottoncandygroup.jpg"
              alt="Connect"
              className="w-full h-full object-cover object-[center_25%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#272727]/70 via-[#272727]/60 to-[#313437]"></div>
          </div>
          <div className="relative z-10 text-center text-[#fbf8f3] px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-bold text-4xl md:text-6xl mb-4"
            >
              {language === "en" ? "CONNECT" : "联系我们"}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs uppercase tracking-[0.3em] text-[#fbf8f3]/50"
            >
              {language === "en" 
                ? "We'd love to hear from you"
                : "我们期待您的联系"}
            </motion.p>
          </div>
        </section>


        {/* Form + Map Side by Side */}
        <section className="bg-[#fbf8f3]">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2">
              {/* Form Side */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 md:p-16 lg:p-20"
              >
                <p className="text-[#636363] text-xs uppercase tracking-[0.3em] mb-3">
                  {language === "en" ? "Send a Message" : "发送消息"}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#272727] mb-8">
                  {language === "en" ? "We'd love to connect" : "我们很乐意与您联系"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-xs uppercase tracking-[0.1em] font-medium text-[#636363]">
                        {language === "en" ? "Name" : "姓名"}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-4 border border-[#272727]/10 bg-white focus:border-[#272727] focus:outline-none transition-colors text-[#272727]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-xs uppercase tracking-[0.1em] font-medium text-[#636363]">
                        {language === "en" ? "Email" : "电子邮件"}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 border border-[#272727]/10 bg-white focus:border-[#272727] focus:outline-none transition-colors text-[#272727]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-xs uppercase tracking-[0.1em] font-medium text-[#636363]">
                      {language === "en" ? "Message" : "消息"}
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-4 border border-[#272727]/10 bg-white focus:border-[#272727] focus:outline-none transition-colors text-[#272727] h-32 resize-none"
                      required
                    ></textarea>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full rounded-none bg-[#272727] text-[#fbf8f3] hover:bg-[#313437] py-5 text-base font-medium tracking-wide"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {language === "en" ? "Sending..." : "发送中..."}
                      </span>
                    ) : (
                      language === "en" ? "Send Message" : "发送消息"
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Map Side */}
              <div className="p-8 md:p-16 lg:p-20">
                <div className="relative h-full min-h-[400px]">
                  <div className="absolute inset-0 bg-[#272727]">
                    <iframe
                      src="https://www.google.com/maps?q=215+Topaz+St,+Milpitas,+CA+95035&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(0.9)' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  
                  {/* Address overlay */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-[#272727] p-5">
                      <p className="text-[#fbf8f3] font-medium mb-1">215 Topaz St</p>
                      <p className="text-[#fbf8f3]/60 text-sm mb-3">Milpitas, CA 95035</p>
                      <a 
                        href="https://maps.google.com/?q=215+Topaz+St,+Milpitas,+CA+95035"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#fbf8f3] text-sm underline underline-offset-4 hover:text-white"
                      >
                        {language === "en" ? "Get Directions →" : "获取路线 →"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MainFooter language={language} />
    </div>
  )
}
