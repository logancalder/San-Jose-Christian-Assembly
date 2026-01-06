"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronUp } from "lucide-react"
import LanguageToggle from "@/components/language-toggle"
import TimelineEvent from "@/components/timeline-event"
import MainNav from "@/app/components/main-nav"
import { motion } from "framer-motion"
import MainFooter from "@/app/components/main-footer"

export default function GivePage() {
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
      />

      <main className="flex-1 pt-14">
        {/* Hero Banner Section */}
        {/* <section className="relative h-[60vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/giving-banner.jpg"
              alt="Giving Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        </section> */}

        {/* Give Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              // variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl font-bold mb-6">
                {language === "en" ? "GIVE" : "奉献"}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {language === "en" 
                  ? "Support our ministry and make a difference in our community."
                  : "支持我们的事工，为我们的社区带来改变。"}
              </p>
            </motion.div>

            {/* Giving Options */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              // variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-8 mb-20"
            >
              {/* Online Giving */}
              <div className="bg-white p-8 border-2 border-black">
                <h3 className="text-2xl font-bold mb-4">
                  {language === "en" ? "Online Giving" : "在线奉献"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === "en"
                    ? "Make a secure online donation through our platform."
                    : "通过我们的平台进行安全的在线奉献。"}
                </p>
                <Button className="w-full rounded-none">
                  {language === "en" ? "Give Online" : "在线奉献"}
                </Button>
              </div>

              {/* Other Ways to Give */}
              <div className="bg-white p-8 border-2 border-black">
                <h3 className="text-2xl font-bold mb-4">
                  {language === "en" ? "Other Ways to Give" : "其他奉献方式"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === "en"
                    ? "Learn about additional giving options including check and bank transfer."
                    : "了解其他奉献方式，包括支票和银行转账。"}
                </p>
                <Button className="w-full rounded-none">
                  {language === "en" ? "Learn More" : "了解更多"}
                </Button>
              </div>
            </motion.div>

            {/* Bible Verse */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              // variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center max-w-3xl mx-auto"
            >
              <blockquote className="text-xl italic mb-4">
                {language === "en" 
                  ? "\"Give, and it will be given to you: good measure, pressed down, shaken together, and running over will be put into your bosom. For with the same measure that you use, it will be measured back to you.\""
                  : "\"你们要给人，就必有给你们的：用十足的升斗，连摇带按，上尖下流地倒在你们怀里。因为你们用什么量器量给人，也必用什么量器量给你们。\""}
              </blockquote>
              <p className="text-gray-600 font-medium">
                {language === "en" ? "Luke 6:38" : "路加福音 6:38"}
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <MainFooter language={language} />
    </div>
  )
}

