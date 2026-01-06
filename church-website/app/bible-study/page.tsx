"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

function getNextFriday(): Date {
  const today = new Date()
  const dayOfWeek = today.getDay() // 0 = Sunday, 5 = Friday
  const daysUntilFriday = (5 - dayOfWeek + 7) % 7 || 7 // If today is Friday, get next Friday
  const nextFriday = new Date(today)
  nextFriday.setDate(today.getDate() + daysUntilFriday)
  return nextFriday
}

function formatDate(date: Date, language: "en" | "zh"): string {
  if (language === "en") {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  } else {
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long"
    })
  }
}

export default function BibleStudyPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  
  const nextFriday = useMemo(() => getNextFriday(), [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf8f3]">
      <MainNav 
        language={language} 
        toggleLanguage={toggleLanguage}
      />

      <main className="flex-1">
        {/* Hero Section with Next Bible Study */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/pexels-lum3n-44775-167699.jpg"
              alt="Bible Study"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#272727]/70 via-[#272727]/60 to-[#313437]"></div>
          </div>
          
          <div className="relative z-10 text-center text-[#fbf8f3] px-4 mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-bold text-4xl md:text-6xl mb-4"
            >
              {language === "en" ? "BIBLE STUDY" : "查经"}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs uppercase tracking-[0.3em] text-[#fbf8f3]/50"
            >
              {language === "en" 
                ? "Dive deeper into God's Word together"
                : "一起深入研读神的话语"}
            </motion.p>
          </div>

          {/* Next Bible Study Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10 w-full max-w-4xl mx-auto px-4 mt-8"
          >
            <div className="bg-[#272727] p-8 lg:p-12 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-[#636363] mb-4">
                {language === "en" ? "Next Bible Study" : "下次查经"}
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-4">
                <Calendar className="h-8 w-8 text-[#fbf8f3]/60" />
                <h2 className="text-3xl md:text-4xl font-bold text-[#fbf8f3]">
                  {formatDate(nextFriday, language)}
                </h2>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[#fbf8f3]/80">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-[#636363]" />
                  <span className="text-lg">{language === "en" ? "8:00 PM" : "晚上 8:00"}</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-[#636363]"></div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#636363]" />
                  <span className="text-lg">215 Topaz St, Milpitas, CA 95035</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* What to Expect - LIGHT with Photos */}
        <section className="py-20 bg-[#fbf8f3]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[#636363] mb-2">
                  {language === "en" ? "What We Do" : "我们做什么"}
                </p>
                <h2 className="text-3xl font-bold text-[#272727]">
                  {language === "en" ? "What to Expect" : "学习方式"}
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInVariants}
                  transition={{ duration: 0.6 }}
                  className="group"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img 
                      src="/easter_25/DSC_0445.jpg" 
                      alt="Worship"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#272727] mb-2">
                    {language === "en" ? "Worship" : "敬拜"}
                  </h3>
                  <p className="text-[#636363]">
                    {language === "en"
                      ? "We begin with a time of worship, lifting our voices in praise together."
                      : "我们以敬拜开始，一同高声赞美。"}
                  </p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInVariants}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="group"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img 
                      src="/easter_25/DSC_0471.jpg" 
                      alt="Discussion"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#272727] mb-2">
                    {language === "en" ? "Discussion" : "讨论"}
                  </h3>
                  <p className="text-[#636363]">
                    {language === "en"
                      ? "Going over an outline of selected verses, exploring scripture together."
                      : "一同研读精选经文大纲，深入探讨圣经。"}
                  </p>
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInVariants}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="group"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-4">
                    <img 
                      src="/easter_25/DSC_0519.jpg" 
                      alt="Fellowship"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#272727] mb-2">
                    {language === "en" ? "Fellowship" : "团契"}
                  </h3>
                  <p className="text-[#636363]">
                    {language === "en"
                      ? "12 small groups to choose from, building meaningful connections with others."
                      : "12个小组可供选择，与他人建立有意义的联系。"}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - DARK */}
        <section className="py-16 bg-[#313437]">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-[#fbf8f3] mb-4">
                {language === "en" ? "Join Us This Friday" : "本周五加入我们"}
              </h2>
              <p className="text-[#fbf8f3]/70 mb-8">
                {language === "en"
                  ? "Everyone is welcome, whether you're new to the Bible or have been studying for years."
                  : "无论您是圣经新手还是学习多年，我们都欢迎您。"}
              </p>
              <Link href="/connect">
                <Button className="rounded-none bg-[#fbf8f3] text-[#272727] hover:bg-white px-8">
                  {language === "en" ? "Get Connected" : "联系我们"}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <MainFooter language={language} />
    </div>
  )
}
