"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import MainFooter from "../components/main-footer"

export default function WatchLivePage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
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
        {/* Live Stream Section */}
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-bold mb-4">
                {language === "en" ? "WATCH LIVE" : "在线观看"}
              </h1>
              <p className="text-xl text-gray-600">
                {language === "en" 
                  ? "JOIN US FOR OUR LIVE SERVICE EVERY SUNDAY AT 9:30 AM PST"
                  : "每周日上午9:30（太平洋时间）加入我们的在线崇拜"}
              </p>
            </motion.div>

            {/* YouTube Embed */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="aspect-video w-full mb-8"
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/live_stream?channel=UCMEt-YRjmqPIcv3_bXtDH2Q"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </motion.div>

            {/* Additional Information */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInVariants}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {/* Past Services */}
              <div className="bg-white p-8 border-2 border-black">
                <h3 className="text-2xl font-bold mb-4">
                  {language === "en" ? "Past Services" : "往期崇拜"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === "en"
                    ? "Watch our previous services and special events on our YouTube channel."
                    : "在我们的YouTube频道观看往期崇拜和特别活动。"}
                </p>
                <Link href="https://www.youtube.com/@SanJoseChristianAssembly/videos" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full rounded-none">
                    {language === "en" ? "View Archive" : "查看存档"}
                  </Button>
                </Link>
              </div>

              {/* Subscribe */}
              <div className="bg-white p-8 border-2 border-black">
                <h3 className="text-2xl font-bold mb-4">
                  {language === "en" ? "Stay Connected" : "保持联系"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === "en"
                    ? "Subscribe to our YouTube channel to receive notifications for upcoming live streams."
                    : "订阅我们的YouTube频道，获取直播通知。"}
                </p>
                <Link href="https://www.youtube.com/@SanJoseChristianAssembly?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full rounded-none">
                    {language === "en" ? "Subscribe" : "订阅"}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <MainFooter language={language} />
    </div>
  )
}
