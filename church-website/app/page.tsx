"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, Heart, MapPin, Clock, Calendar, ArrowRight, Play } from "lucide-react"
import VideoBackground from "@/components/video-background"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "./components/main-footer"
import { useToast } from "@/hooks/use-toast"
import { DateTime } from "luxon"

interface Event {
  id: string
  start_time: string
  end_time?: string
  title_en: string
  title_zh?: string
  description_en?: string
  description_zh?: string
  location_en?: string
  location_zh?: string
  is_public: boolean
}

export default function Home() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [verseData, setVerseData] = useState<DailyBreadData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
  const [eventsLoading, setEventsLoading] = useState(true)

  interface DailyBreadData {
    verse: string;
    verse_zh: string;
    content: string;
    content_zh: string;
    date: string;
    verses: Verse[];
    verses_zh: Verse[];
  }

  interface Verse {
    book_id: string;
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
  }

  const { toast } = useToast()
  const date = DateTime.now().setZone('America/Los_Angeles').toFormat('yyyy-MM-dd');

  useEffect(() => {
    const fetchVerseData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/daily-bread?date=${date}`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch verse data")
        }

        const data = await response.json()
        setVerseData(data)
        
      } catch (error) {
        console.error("Error fetching verse data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVerseData()
  }, [date])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setEventsLoading(true)
        const today = DateTime.now().setZone('America/Los_Angeles').toFormat('yyyy-MM-dd')
        const response = await fetch(`/api/events?start=${today}`)
        if (!response.ok) throw new Error('Failed to fetch events')
        const data = await response.json()
        setEvents(data.slice(0, 4))
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setEventsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "zh" : "en"
    setLanguage(newLanguage)
    
    toast({
      title: newLanguage === "en" ? "Language Changed" : "语言已更改",
      description: newLanguage === "en" ? "Switched to English" : "已切换至中文",
      duration: 2000,
    })
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf8f3]">
      <MainNav 
        language={language} 
        toggleLanguage={toggleLanguage}
      />

      <main className="flex-1">
        {/* Hero section with video background */}
        <section className="relative h-[85vh] flex items-center justify-center">
          <VideoBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-[#272727]/60 via-[#272727]/50 to-[#313437] flex items-center justify-center">
            <div className="text-center text-white px-4">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-bold text-4xl md:text-6xl lg:text-7xl mb-4 tracking-tight"
              >
                {language === "en" ? "SAN JOSE CHRISTIAN ASSEMBLY" : "圣何塞基督教会"}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xs uppercase tracking-[0.3em] text-[#fbf8f3]/80"
              >
                {language === "en" ? "Growing together in faith, hope, and love" : "在信心、盼望和爱中一起成长"}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="https://www.youtube.com/@SanJoseChristianAssembly/streams" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="rounded-none bg-[#fbf8f3] text-[#272727] hover:bg-white px-8">
                    <Play className="h-4 w-4 mr-2" />
                    {language === "en" ? "WATCH LIVE" : "在线观看"}
                  </Button>
                </Link>
                <Link href="/connect">
                  <Button size="lg" variant="outline" className="rounded-none border-2 bg-transparent text-white border-[#fbf8f3]/50 hover:bg-[#fbf8f3]/10 hover:border-[#fbf8f3] hover:text-white px-8">
                    {language === "en" ? "CONNECT WITH US" : "联系我们"}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Daily Verse Section - DARK */}
        <section className="py-16 bg-[#313437]">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[#636363] mb-6">
                {language === "en" ? "Today's Daily Bread" : "今日经文"}
              </p>
              {isLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-8 bg-[#272727] rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-[#272727] rounded w-1/3 mx-auto"></div>
                </div>
              ) : verseData ? (
                <Link href={`/daily-bread?date=${verseData.date}`} className="group block">
                  <blockquote className="text-xl md:text-2xl lg:text-3xl font-light italic leading-relaxed text-[#fbf8f3] group-hover:text-white transition-colors">
                    "{(() => {
                      const content = language === "en" ? verseData.content : verseData.content_zh;
                      if (!content) return "";
                      // Check if there are multiple verses (look for second superscript number)
                      const superscriptPattern = /[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g;
                      const matches = content.match(superscriptPattern);
                      if (matches && matches.length > 1) {
                        // Find where second verse starts and truncate
                        const secondVerseIndex = content.indexOf(matches[1], content.indexOf(matches[0]) + 1);
                        if (secondVerseIndex > 0) {
                          return content.substring(0, secondVerseIndex).trim() + "...";
                        }
                      }
                      return content;
                    })()}"
                  </blockquote>
                  <p className="mt-4 text-lg text-[#fbf8f3]/70">
                    — {language === "en" ? verseData.verse : verseData.verse_zh}
                  </p>
                  <p className="mt-6 text-[#636363] group-hover:text-[#7e7e7e] transition-colors inline-flex items-center gap-2">
                    {language === "en" ? "Read full passage" : "阅读完整经文"}
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </Link>
              ) : (
                <blockquote className="text-xl md:text-2xl italic text-[#fbf8f3]">
                  {language === "en" 
                    ? "\"For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.\" — John 3:16"
                    : "\"神愛世人，甚至將他的獨生子賜給他們，叫一切信他的，不至滅亡，反得永生。\" — 約翰福音 3:16"}
                </blockquote>
              )}
            </motion.div>
          </div>
        </section>

        {/* Welcome Section with Photo - LIGHT */}
        <section className="py-20 bg-[#fbf8f3]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-0 items-stretch">
                {/* Photo */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInVariants}
                  transition={{ duration: 0.6 }}
                  className="relative h-[400px] lg:h-auto"
                >
                  <img
                    src="/DSC_0792.jpg"
                    alt="Church congregation"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Welcome Text */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInVariants}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-[#313437] p-10 lg:p-14 flex flex-col justify-center"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-[#fbf8f3] mb-6 leading-tight">
                    {language === "en" 
                      ? "Welcome to Your New Family in Christ" 
                      : "欢迎加入你在基督里的新家庭"}
                  </h2>
                  <p className="text-lg text-[#fbf8f3]/70 leading-relaxed mb-8">
                    {language === "en"
                      ? "At San Jose Christian Assembly, we believe in growing together through faith, fellowship, and service. Whether you're seeking spiritual guidance or a community to call home, we invite you to join us on this journey."
                      : "在圣何塞基督教会，我们相信通过信仰、团契和服务一起成长。无论您是在寻求灵性指导还是一个可以称为家的社区，我们都邀请您与我们一起踏上这段旅程。"}
                  </p>
                  <Link href="/staff">
                    <Button className="rounded-none bg-[#fbf8f3] text-[#272727] hover:bg-white px-6 w-fit">
                      {language === "en" ? "Meet Our Team" : "认识我们的团队"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Info Section - DARK with Photo */}
        <section className="py-20 bg-[#313437]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-0 items-stretch">
                {/* Service Info */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInVariants}
                  transition={{ duration: 0.6 }}
                  className="bg-[#272727] p-10 lg:p-14 flex flex-col justify-center order-2 lg:order-1"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-[#fbf8f3] mb-8">
                    {language === "en" ? "Join Us For Worship" : "欢迎参加敬拜"}
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#313437] flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-5 w-5 text-[#fbf8f3]" />
                      </div>
                      <div>
                        <p className="text-[#fbf8f3] font-medium text-lg">{language === "en" ? "Every Sunday" : "每周日"}</p>
                        <p className="text-[#636363]">{language === "en" ? "Main Service" : "主日崇拜"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#313437] flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-[#fbf8f3]" />
                      </div>
                      <div>
                        <p className="text-[#fbf8f3] font-medium text-lg">9:30 AM</p>
                        <p className="text-[#636363]">{language === "en" ? "Bilingual Service" : "双语崇拜"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#313437] flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-[#fbf8f3]" />
                      </div>
                      <div>
                        <p className="text-[#fbf8f3] font-medium text-lg">215 Topaz St</p>
                        <p className="text-[#636363]">Milpitas, CA 95035</p>
                      </div>
                    </div>
                  </div>
                  <Link 
                    href="https://maps.google.com/?q=215+Topaz+St,+Milpitas,+CA+95035"
                    target="_blank"
                    className="inline-flex items-center gap-2 mt-8 text-[#636363] hover:text-[#fbf8f3] transition-colors"
                  >
                    {language === "en" ? "Get Directions" : "获取路线"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>

                {/* Photo */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInVariants}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative h-[400px] lg:h-auto order-1 lg:order-2"
                >
                  <img
                    src="/DSC_0737.jpg"
                    alt="Worship service"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section - LIGHT */}
        <section className="py-20 bg-[#fbf8f3]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                className="flex items-end justify-between mb-10"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#636363] mb-2">
                    {language === "en" ? "What's Happening" : "近期活动"}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#272727]">
                    {language === "en" ? "Upcoming Events" : "即将举行的活动"}
                  </h2>
                </div>
              </motion.div>

              {eventsLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="animate-pulse bg-[#313437]/10 p-6 h-40"></div>
                  ))}
                </div>
              ) : events.length > 0 ? (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {events.map((event) => {
                    const eventDate = DateTime.fromISO(event.start_time).setZone('America/Los_Angeles')
                    return (
                      <motion.div
                        key={event.id}
                        variants={fadeInVariants}
                        className="group bg-white p-6 transition-all hover:bg-[#272727] hover:text-[#fbf8f3] shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          <div className="text-center flex-shrink-0">
                            <div className="text-3xl font-bold text-[#272727] group-hover:text-[#fbf8f3]">{eventDate.day}</div>
                            <div className="text-xs uppercase tracking-wider text-[#636363] group-hover:text-[#fbf8f3]/60">
                              {eventDate.toFormat('MMM')}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-[#272727] truncate group-hover:text-[#fbf8f3]">
                              {language === "en" ? event.title_en : event.title_zh || event.title_en}
                            </h3>
                            <p className="text-sm text-[#636363] mt-1 group-hover:text-[#fbf8f3]/60">
                              {eventDate.toFormat('EEEE')} • {eventDate.toFormat('h:mm a')}
                            </p>
                            <p className="text-sm text-[#636363] mt-2 line-clamp-2 group-hover:text-[#fbf8f3]/70">
                              {language === "en" ? event.description_en : event.description_zh || event.description_en}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              ) : (
                <div className="text-center py-12 bg-white shadow-sm">
                  <p className="text-[#636363]">
                    {language === "en" ? "No upcoming events scheduled" : "暂无即将举行的活动"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Pastor Section - DARK - More compact */}
        <section className="py-16 bg-[#313437]">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-3 gap-8 items-center"
              >
                {/* Pastor Photo - Smaller */}
                <div className="md:col-span-1">
                  <img
                    src="/DSC_0576.jpg"
                    alt={language === "en" ? "Pastor Merry Jeng" : "郑牧师"}
                    className="w-full aspect-[3/4] object-cover object-top"
                  />
                </div>

                {/* Pastor Info - Takes more space */}
                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#636363] mb-3">
                    {language === "en" ? "Our Pastor" : "我们的牧师"}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#fbf8f3] mb-1">
                    {language === "en" ? "Pastor Merry Jeng" : "郑牧师"}
                  </h2>
                  <p className="text-[#636363] italic mb-4">
                    {language === "en" ? "Senior Pastor" : "主任牧师"}
                  </p>
                  <p className="text-[#fbf8f3]/70 leading-relaxed mb-4">
                    {language === "en"
                      ? "Pastor Merry has been serving our congregation for over 15 years. Her passion is to help people grow in their relationship with Jesus Christ and find their purpose in God's plan."
                      : "郑牧师服务我们的会众已超过15年。她的热情是帮助人们在与耶稣基督的关系中成长，并在上帝的计划中找到自己的目标。"}
                  </p>
                  <p className="text-[#fbf8f3]/70 leading-relaxed">
                    {language === "en"
                      ? "We invite you to join us this Sunday to experience God's love and the warmth of our community."
                      : "我们邀请您本周日加入我们，体验上帝的爱和我们社区的温暖。"}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Get Involved Section - LIGHT with Photos - No borders */}
        <section className="py-20 bg-[#fbf8f3]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                className="text-center mb-12"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[#636363] mb-2">
                  {language === "en" ? "Community" : "社区"}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#272727]">
                  {language === "en" ? "Get Involved" : "参与我们"}
                </h2>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid md:grid-cols-3 gap-6"
              >
                <motion.div variants={fadeInVariants}>
                  <Link href="/bible-study" className="group block h-full">
                    <div className="h-full overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src="/pexels-lum3n-44775-167699.jpg" 
                          alt="Bible Study"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="h-5 w-5 text-[#272727]" />
                          <h3 className="text-xl font-bold text-[#272727]">
                            {language === "en" ? "Bible Study" : "查经"}
                          </h3>
                        </div>
                        <p className="text-[#636363] text-sm mb-3">
                          {language === "en" 
                            ? "Deepen your understanding of God's Word through our weekly studies."
                            : "通过我们每周的学习加深您对上帝话语的理解。"}
                        </p>
                        <p className="text-[#272727] text-sm font-medium">
                          {language === "en" ? "Fridays at 8:00 PM" : "每周五晚上8:00"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                <motion.div variants={fadeInVariants}>
                  <Link href="/youth" className="group block h-full">
                    <div className="h-full overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src="/pexels-markusspiske-113338.jpg" 
                          alt="Youth Ministry"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="h-5 w-5 text-[#272727]" />
                          <h3 className="text-xl font-bold text-[#272727]">
                            {language === "en" ? "Youth Ministry" : "青年团契"}
                          </h3>
                        </div>
                        <p className="text-[#636363] text-sm mb-3">
                          {language === "en" 
                            ? "A safe space for teens to build friendships and grow in faith."
                            : "一个让青少年建立友谊并在信仰中成长的安全空间。"}
                        </p>
                        <p className="text-[#272727] text-sm font-medium">
                          {language === "en" ? "Ages 12-18" : "12-18岁"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                <motion.div variants={fadeInVariants}>
                  <Link href="/connect" className="group block h-full">
                    <div className="h-full overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src="/!yuelan_cropped.jpg" 
                          alt="Small Groups"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Heart className="h-5 w-5 text-[#272727]" />
                          <h3 className="text-xl font-bold text-[#272727]">
                            {language === "en" ? "Small Groups" : "小组"}
                          </h3>
                        </div>
                        <p className="text-[#636363] text-sm mb-3">
                          {language === "en" 
                            ? "Connect with others in community through small group fellowship."
                            : "通过小组团契与社区中的其他人建立联系。"}
                        </p>
                        <p className="text-[#272727] text-sm font-medium">
                          {language === "en" ? "Various times" : "多种时间"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ delay: 0.4 }}
                className="text-center mt-10"
              >
                <Link href="/give">
                  <Button className="rounded-none bg-[#272727] text-[#fbf8f3] hover:bg-[#313437] px-8">
                    {language === "en" ? "Support Our Mission" : "支持我们的使命"}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Scripture Banner - DARK */}
        <section className="py-20 bg-[#313437]">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <blockquote className="text-2xl md:text-3xl lg:text-4xl italic font-light leading-relaxed text-[#fbf8f3]">
                {language === "en"
                  ? "\"For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.\""
                  : "\"神爱世人，甚至将他的独生子赐给他们，叫一切信他的，不致灭亡，反得永生。\""}
              </blockquote>
              <p className="mt-6 font-medium text-[#636363]">
                {language === "en" ? "— John 3:16" : "— 约翰福音 3:16"}
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <MainFooter language={language} />
    </div>
  )
}
