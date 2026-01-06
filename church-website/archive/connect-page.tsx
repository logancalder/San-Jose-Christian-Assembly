"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Loader2 } from "lucide-react"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/components/main-footer"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import ParallaxHero from "@/components/parallax-hero"

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

      // Show success toast
      toast({
        title: language === "en" ? "Message Sent!" : "消息已发送！",
        description: language === "en" 
          ? "Thank you for reaching out. We'll get back to you soon." 
          : "感谢您的联系。我们会尽快回复您。",
        duration: 3000,
      })
      
      // Reset form
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

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav 
        language={language} 
        toggleLanguage={toggleLanguage}
        currentPage="Connect"
      />

      <main className="flex-1 pt-14">
        {/* Hero Section */}
        <ParallaxHero
          type="image"
          src="/easter_25/!cottoncandygroup.jpg"
          initialOffset={-30}
        >
          <h1 className="font-bold text-4xl md:text-6xl mb-4">
            {language === "en" ? "CONNECT WITH US" : "联系我们"}
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            {language === "en" 
              ? "WE'D LOVE TO HEAR FROM YOU AND HELP YOU GET CONNECTED TO OUR COMMUNITY"
              : "我们期待听到您的声音，帮助您融入我们的社区"}
          </p>
        </ParallaxHero>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                // variants={fadeInVariants}
                transition={{ duration: 0.6 }}
                className="text-center p-8 border-2 border-black"
              >
                <Phone className="w-8 h-8 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">
                  {language === "en" ? "PHONE" : "电话"}
                </h3>
                <p>(408) 945-1095</p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                // variants={fadeInVariants}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center p-8 border-2 border-black"
              >
                <Mail className="w-8 h-8 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">
                  {language === "en" ? "EMAIL" : "电子邮件"}
                </h3>
                <p>pastor@sjca.org</p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                // variants={fadeInVariants}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center p-8 border-2 border-black"
              >
                <MapPin className="w-8 h-8 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">
                  {language === "en" ? "ADDRESS" : "地址"}
                </h3>
                <p>215 Topaz St<br />Milpitas, CA 95035</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-5 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-8 text-center">
                {language === "en" ? "SEND US A MESSAGE" : "发送消息"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6 pb-10">
                <div>
                  <label className="block mb-2 font-medium">
                    {language === "en" ? "Name" : "姓名"}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border-2 border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">
                    {language === "en" ? "Email" : "电子邮件"}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border-2 border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">
                    {language === "en" ? "Message" : "消息"}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border-2 border-black h-32"
                    required
                  ></textarea>
                </div>
                <Button 
                  type="submit" 
                  className="w-full rounded-none"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {language === "en" ? "Sending..." : "发送中..."}
                    </span>
                  ) : (
                    language === "en" ? "Send Message" : "发送"
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <MainFooter language={language} />
    </div>
  )
} 