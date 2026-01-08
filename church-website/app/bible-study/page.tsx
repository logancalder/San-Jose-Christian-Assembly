"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Calendar, Loader2 } from "lucide-react"
import Link from "next/link"
import { DateTime } from "luxon"

interface BibleStudyEvent {
  id: string
  title_en: string
  title_zh?: string
  start_time: string
  location_en?: string
  location_zh?: string
}

function formatDate(date: DateTime, language: "en" | "zh"): string {
  if (language === "en") {
    return date.toFormat("EEEE, MMMM d, yyyy")
  } else {
    return date.setLocale("zh-CN").toFormat("yyyy年M月d日 EEEE")
  }
}

function formatTime(date: DateTime, language: "en" | "zh"): string {
  if (language === "en") {
    return date.toFormat("h:mm a")
  } else {
    const hour = date.hour
    const minute = date.toFormat("mm")
    if (hour < 12) {
      return `上午 ${hour}:${minute}`
    } else if (hour === 12) {
      return `中午 12:${minute}`
    } else {
      return `晚上 ${hour - 12}:${minute}`
    }
  }
}

export default function BibleStudyPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [nextBibleStudy, setNextBibleStudy] = useState<BibleStudyEvent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNextBibleStudy = async () => {
      try {
        const today = DateTime.now().setZone('America/Los_Angeles').toFormat('yyyy-MM-dd')
        const response = await fetch(`/api/events?start=${today}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        
        const events = await response.json()
        
        // Find the first event that contains "Bible Study" in the title (case insensitive)
        const bibleStudyEvent = events.find((event: BibleStudyEvent) => 
          event.title_en.toLowerCase().includes('bible study')
        )
        
        if (bibleStudyEvent) {
          setNextBibleStudy(bibleStudyEvent)
        }
      } catch (error) {
        console.error('Error fetching bible study event:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNextBibleStudy()
  }, [])

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
          
          <div className="relative z-10 text-center text-[#fbf8f3] px-4 mb-8 sm:mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-bold text-3xl sm:text-4xl md:text-6xl mb-3 sm:mb-4"
            >
              {language === "en" ? "BIBLE STUDY" : "查经"}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.3em] text-[#fbf8f3]/50"
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
            className="relative z-10 w-full max-w-4xl mx-auto px-4 mt-4 sm:mt-8"
          >
            <div className="bg-[#272727] p-5 sm:p-8 lg:p-12 text-center">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.3em] text-[#636363] mb-3 sm:mb-4">
                {language === "en" ? "Next Bible Study" : "下次查经"}
              </p>
              
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-[#fbf8f3]/60" />
                </div>
              ) : nextBibleStudy ? (
                <>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-[#fbf8f3]/60" />
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#fbf8f3]">
                      {formatDate(DateTime.fromISO(nextBibleStudy.start_time).setZone('America/Los_Angeles'), language)}
                    </h2>
                      </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[#fbf8f3]/80">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#636363]" />
                      <span className="text-base sm:text-lg">
                        {formatTime(DateTime.fromISO(nextBibleStudy.start_time).setZone('America/Los_Angeles'), language)}
                      </span>
                      </div>
                    <div className="hidden sm:block w-px h-6 bg-[#636363]"></div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#636363]" />
                      <span className="text-sm sm:text-lg">
                        {language === "en" 
                          ? (nextBibleStudy.location_en || "215 Topaz St, Milpitas, CA 95035")
                          : (nextBibleStudy.location_zh || nextBibleStudy.location_en || "215 Topaz St, Milpitas, CA 95035")}
                      </span>
                    </div>
                </div>
                </>
              ) : (
                <p className="text-[#fbf8f3]/70 text-base sm:text-lg py-4">
                    {language === "en" 
                    ? "No upcoming Bible Study scheduled. Check back soon!"
                    : "暂无即将举行的查经。请稍后再来查看！"}
                  </p>
              )}
            </div>
          </motion.div>
        </section>

        {/* What to Expect - LIGHT with Photos */}
        <section className="py-12 sm:py-20 bg-[#fbf8f3]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6 }}
                className="text-center mb-8 sm:mb-12"
              >
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.3em] text-[#636363] mb-2">
                  {language === "en" ? "What We Do" : "我们做什么"}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#272727]">
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
                  className="group text-center md:text-left"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-3 sm:mb-4">
                    <img 
                      src="/easter_25/DSC_0445.jpg" 
                      alt="Worship"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#272727] mb-2">
                    {language === "en" ? "Worship" : "敬拜"}
                  </h3>
                  <p className="text-[#636363] text-sm sm:text-base">
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
                  className="group text-center md:text-left"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-3 sm:mb-4">
                    <img 
                      src="/easter_25/DSC_0471.jpg" 
                      alt="Discussion"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#272727] mb-2">
                    {language === "en" ? "Discussion" : "讨论"}
                  </h3>
                  <p className="text-[#636363] text-sm sm:text-base">
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
                  className="group text-center md:text-left"
                >
                  <div className="aspect-[4/3] overflow-hidden mb-3 sm:mb-4">
                    <img 
                      src="/easter_25/DSC_0519.jpg" 
                      alt="Fellowship"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#272727] mb-2">
                    {language === "en" ? "Fellowship" : "团契"}
                  </h3>
                  <p className="text-[#636363] text-sm sm:text-base">
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
        <section className="py-10 sm:py-16 bg-[#313437]">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#fbf8f3] mb-3 sm:mb-4">
                {language === "en" ? "Join Us for Bible Study" : "加入我们的查经"}
              </h2>
              <p className="text-[#fbf8f3]/70 mb-6 sm:mb-8 text-sm sm:text-base px-2">
                {language === "en"
                  ? "Everyone is welcome, whether you're new to the Bible or have been studying for years."
                  : "无论您是圣经新手还是学习多年，我们都欢迎您。"}
              </p>
              <Link href="/connect">
                <Button className="rounded-none bg-[#fbf8f3] text-[#272727] hover:bg-white px-6 sm:px-8">
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
