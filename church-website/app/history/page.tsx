"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"

export default function HistoryPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [scrollProgress, setScrollProgress] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const scrollToTopRef = useRef<HTMLDivElement>(null)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const timelineEvents = [
    {
      year: "1975",
      title: { en: "Church Founded", zh: "教会成立" },
      description: {
        en: "San Jose Christian Assembly was founded by a small group of believers meeting in a living room.",
        zh: "圣何塞基督教会由一小群在客厅聚会的信徒创立。",
      },
      image: "/002_舊貌.jpg",
    },
    {
      year: "1982",
      title: { en: "First Building", zh: "第一座教堂" },
      description: {
        en: "The congregation purchased its first building, a former warehouse that was renovated into a sanctuary.",
        zh: "会众购买了第一座建筑，一个改造成圣所的旧仓库。",
      },
      image: "/DSC_0737.jpg",
    },
    {
      year: "1995",
      title: { en: "Community Outreach", zh: "社区外展" },
      description: {
        en: "SJCA began its community outreach programs, including food drives and after-school programs.",
        zh: "SJCA开始了社区外展计划，包括食品募捐和课后计划。",
      },
      image: "/DSC_0792.jpg",
    },
    {
      year: "2003",
      title: { en: "Chinese Ministry", zh: "中文事工" },
      description: {
        en: "The Chinese Ministry was established to serve the growing Chinese community in San Jose.",
        zh: "中文事工成立，为圣何塞不断增长的华人社区服务。",
      },
      image: "/easter_25/DSC_0471.jpg",
    },
    {
      year: "2010",
      title: { en: "New Campus", zh: "新校区" },
      description: {
        en: "SJCA moved to its current location, a larger campus to accommodate the growing congregation.",
        zh: "SJCA搬到了现在的位置，一个更大的校区，以容纳不断增长的会众。",
      },
      image: "/easter_25/DSC_0592.jpg",
    },
    {
      year: "2020",
      title: { en: "Online Services", zh: "在线服务" },
      description: {
        en: "In response to the global pandemic, SJCA launched its online services, reaching people beyond San Jose.",
        zh: "为应对全球疫情，SJCA推出了在线服务，接触到圣何塞以外的人们。",
      },
      image: "/!cottoncandygroup.jpg",
    },
    {
      year: "2025",
      title: { en: "Looking Forward", zh: "展望未来" },
      description: {
        en: "As we celebrate our 50th anniversary, we look forward to continuing our mission of growing together in faith, hope, and love.",
        zh: "在我们庆祝50周年之际，我们期待继续我们在信心、盼望和爱中一起成长的使命。",
      },
      image: "/DSC_0576.jpg",
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const scrollPosition = window.scrollY
        const windowHeight = window.innerHeight
        const documentHeight = document.body.scrollHeight
        const maxScroll = documentHeight - windowHeight
        const scrollPercentage = Math.min(scrollPosition / maxScroll, 1)
        setScrollProgress(scrollPercentage * 100)

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
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf8f3]">
      <MainNav 
        language={language} 
        toggleLanguage={toggleLanguage}
        currentPage="History"
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[40vh] sm:h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/easter_25/DSC_0592.jpg"
              alt="History"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#272727]/70 via-[#272727]/60 to-[#313437]"></div>
          </div>
          <div className="relative z-10 text-center text-[#fbf8f3] px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-bold text-3xl sm:text-4xl md:text-6xl mb-3 sm:mb-4"
            >
              {language === "en" ? "OUR HISTORY" : "我们的历史"}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.3em] text-[#fbf8f3]/50"
            >
              {language === "en" 
                ? "The story of our family in Christ"
                : "我们在基督里的家庭故事"}
            </motion.p>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-12 sm:py-20 bg-[#fbf8f3]" ref={timelineRef}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-[#e5e0d8]">
                <div
                  className="absolute top-0 left-0 w-full bg-[#272727] transition-all duration-300"
                  style={{ height: `${scrollProgress}%` }}
                ></div>
              </div>

              {/* Events */}
              <div className="space-y-10 sm:space-y-16">
                {timelineEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInVariants}
                    transition={{ duration: 0.6 }}
                    className={`relative pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-[55%]' : 'md:pl-[55%]'}`}
                  >
                    {/* Year dot */}
                    <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-[#272727] flex items-center justify-center`}>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#fbf8f3]"></div>
                    </div>

                    {/* Content card */}
                    <div className="bg-white shadow-sm overflow-hidden">
                      <div className="h-36 sm:h-48 overflow-hidden">
                        <img
                          src={event.image}
                          alt={language === "en" ? event.title.en : event.title.zh}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="text-[#636363] text-xs sm:text-sm font-medium mb-1 sm:mb-2">{event.year}</div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#272727] mb-2">
                          {language === "en" ? event.title.en : event.title.zh}
                        </h3>
                        <p className="text-[#636363] text-sm sm:text-base">
                          {language === "en" ? event.description.en : event.description.zh}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
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
                {language === "en" ? "Be Part of Our Story" : "成为我们故事的一部分"}
              </h2>
              <p className="text-[#fbf8f3]/70 text-sm sm:text-base px-2">
                {language === "en"
                  ? "Join us as we continue to write the next chapter together."
                  : "加入我们，一起书写下一章。"}
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Scroll to top */}
      <div ref={scrollToTopRef} className="fixed bottom-8 right-8 z-40 opacity-0 transition-opacity duration-300">
        <Button
          variant="outline"
          size="icon"
          className="rounded-none border-2 border-[#272727] bg-white hover:bg-[#fbf8f3]"
          onClick={scrollToTop}
        >
          <ChevronUp className="h-6 w-6 text-[#272727]" />
        </Button>
      </div>

      <MainFooter language={language} />
    </div>
  )
}
