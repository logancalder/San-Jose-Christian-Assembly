"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronUp } from "lucide-react"
import LanguageToggle from "@/components/language-toggle"
import TimelineEvent from "@/components/timeline-event"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/components/main-footer"
import { motion } from "framer-motion"
import ParallaxHero from "@/components/parallax-hero"

export default function HistoryPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const scrollToTopRef = useRef<HTMLDivElement>(null)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const navItems = [
    { en: "About", zh: "关于我们" },
    { en: "Mission", zh: "使命" },
    { en: "Groups", zh: "小组" },
    { en: "Connect", zh: "联系" },
    { en: "History", zh: "历史" },
    { en: "Watch Live", zh: "在线观看" },
    { en: "Bible Study", zh: "查经" },
    { en: "Give", zh: "奉献" },
    { en: "Youth", zh: "青年" },
  ]

  // Timeline events data
  const timelineEvents = [
    {
      year: "1975",
      title: { en: "Church Founded", zh: "教会成立" },
      description: {
        en: "San Jose Christian Assembly was founded by a small group of believers meeting in a living room.",
        zh: "圣何塞基督教会由一小群在客厅聚会的信徒创立。",
      },
      image: "/002_舊貌.jpg?height=400&width=600",
    },
    {
      year: "1982",
      title: { en: "First Building", zh: "第一座教堂" },
      description: {
        en: "The congregation purchased its first building, a former warehouse that was renovated into a sanctuary.",
        zh: "会众购买了第一座建筑，一个改造成圣所的旧仓库。",
      },
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      year: "1995",
      title: { en: "Community Outreach", zh: "社区外展" },
      description: {
        en: "SJCA began its community outreach programs, including food drives and after-school programs.",
        zh: "SJCA开始了社区外展计划，包括食品募捐和课后计划。",
      },
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      year: "2003",
      title: { en: "Chinese Ministry", zh: "中文事工" },
      description: {
        en: "The Chinese Ministry was established to serve the growing Chinese community in San Jose.",
        zh: "中文事工成立，为圣何塞不断增长的华人社区服务。",
      },
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      year: "2010",
      title: { en: "New Campus", zh: "新校区" },
      description: {
        en: "SJCA moved to its current location, a larger campus to accommodate the growing congregation.",
        zh: "SJCA搬到了现在的位置，一个更大的校区，以容纳不断增长的会众。",
      },
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      year: "2015",
      title: { en: "Youth Center", zh: "青年中心" },
      description: {
        en: "The Youth Center was built, providing a dedicated space for youth programs and activities.",
        zh: "青年中心建成，为青年项目和活动提供专用空间。",
      },
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      year: "2020",
      title: { en: "Online Services", zh: "在线服务" },
      description: {
        en: "In response to the global pandemic, SJCA launched its online services, reaching people beyond San Jose.",
        zh: "为应对全球疫情，SJCA推出了在线服务，接触到圣何塞以外的人们。",
      },
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      year: "2025",
      title: { en: "Looking Forward", zh: "展望未来" },
      description: {
        en: "As we celebrate our 50th anniversary, we look forward to continuing our mission of growing together in faith, hope, and love.",
        zh: "在我们庆祝50周年之际，我们期待继续我们在信心、盼望和爱中一起成长的使命。",
      },
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  // Handle scroll events to update timeline progress
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const scrollPosition = window.scrollY
        const windowHeight = window.innerHeight
        const documentHeight = document.body.scrollHeight
        const maxScroll = documentHeight - windowHeight

        // Calculate scroll percentage
        const scrollPercentage = Math.min(scrollPosition / maxScroll, 1)
        setScrollProgress(scrollPercentage * 100)

        // Show/hide scroll to top button
        if (scrollToTopRef.current) {
          if (scrollPosition > windowHeight) {
            scrollToTopRef.current.classList.remove("opacity-0")
            scrollToTopRef.current.classList.add("opacity-100")
          } else {
            scrollToTopRef.current.classList.remove("opacity-100")
            scrollToTopRef.current.classList.add("opacity-0")
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
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
        currentPage="History"
      />

      <main className="flex-1 pt-14">
        {/* Hero Section */}
        <ParallaxHero
          type="image"
          src="/easter_25/DSC_0592.jpg"
          initialOffset={0}
        >
          <h1 className="font-bold text-4xl md:text-6xl mb-4">
            {language === "en" ? "OUR HISTORY" : "我们的历史"}
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            {language === "en" 
              ? "The story of our family in Christ"
              : "我们在基督里的家庭故事"}
          </p>
        </ParallaxHero>

        {/* Timeline section */}
        <section className="py-16 relative" ref={timelineRef}>
          <div className="container mx-auto px-4">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200">
              <div
                className="absolute top-0 left-0 w-full bg-black transition-all duration-300 ease-out"
                style={{ height: `${scrollProgress}%` }}
              ></div>
            </div>

            {/* Timeline events */}
            <div className="relative z-10">
              {timelineEvents.map((event, index) => (
                <TimelineEvent
                  key={index}
                  year={event.year}
                  title={language === "en" ? event.title.en : event.title.zh}
                  description={language === "en" ? event.description.en : event.description.zh}
                  image={event.image}
                  isLeft={index % 2 === 0}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Scroll to top button */}
      <div ref={scrollToTopRef} className="fixed bottom-8 right-8 z-40 opacity-0 transition-opacity duration-300">
        <Button
          variant="outline"
          size="icon"
          className="rounded-none border-2 border-black bg-white"
          onClick={scrollToTop}
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      </div>

      <MainFooter language={language} />
    </div>
  )
}

