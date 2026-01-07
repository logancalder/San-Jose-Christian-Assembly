"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"
import { Button } from "@/components/ui/button"

export default function GivePage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#272727]">
      <MainNav 
        language={language} 
        toggleLanguage={toggleLanguage}
      />

      <main className="flex-1">
        {/* Full height hero with giving info */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Background image with overlay */}
          <div className="absolute inset-0">
            <img
              src="/pexels-eberhardgross-691668.jpg"
              alt="Give"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#272727] via-[#272727]/95 to-[#313437]"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 py-16 sm:py-32">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
                {/* Left side - Text */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center lg:text-left"
                >
                  <p className="text-[#636363] text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.3em] mb-4 sm:mb-6">
                    {language === "en" ? "Support Our Ministry" : "支持我们的事工"}
                  </p>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#fbf8f3] mb-6 sm:mb-8 leading-[1.1]">
                    {language === "en" ? "Give" : "奉献"}
                  </h1>
                  <p className="text-base sm:text-xl text-[#fbf8f3]/60 leading-relaxed mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0">
                    {language === "en"
                      ? "Your generosity helps us serve our community and share God's love."
                      : "您的慷慨帮助我们服务社区并分享上帝的爱。"}
                  </p>
                  
                  {/* Scripture inline */}
                  <div className="border-l-2 border-[#636363]/30 pl-4 sm:pl-6 text-left max-w-md mx-auto lg:mx-0">
                    <p className="text-[#fbf8f3]/40 italic text-xs sm:text-sm leading-relaxed">
                      {language === "en" 
                        ? "\"God loves a cheerful giver.\""
                        : "\"捐得乐意的人是神所喜爱的。\""}
                    </p>
                    <p className="text-[#636363] text-[10px] sm:text-xs mt-2">
                      {language === "en" ? "2 Corinthians 9:7" : "哥林多后书 9:7"}
                    </p>
                  </div>
                </motion.div>

                {/* Right side - Venmo Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="bg-[#fbf8f3] p-6 sm:p-10 md:p-12">
                    <p className="text-[#636363] text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2">
                      {language === "en" ? "Give via" : "通过以下方式奉献"}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#272727] mb-4 sm:mb-6">
                      Venmo
                    </h2>
                    
                    <div className="bg-[#272727] p-4 sm:p-6 mb-6 sm:mb-8">
                      <p className="text-[#fbf8f3] text-xl sm:text-2xl md:text-3xl font-mono tracking-wide text-center">
                        @SJCA-Church
                      </p>
                    </div>
                    
                    <a 
                      href="https://venmo.com/SJCA-Church" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="w-full rounded-none bg-[#272727] text-[#fbf8f3] hover:bg-[#313437] py-4 sm:py-6 text-sm sm:text-base font-medium tracking-wide">
                        {language === "en" ? "Open Venmo →" : "打开 Venmo →"}
                      </Button>
                    </a>
                    
                    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-[#272727]/10">
                      <p className="text-[#636363] text-xs sm:text-sm text-center lg:text-left">
                        {language === "en"
                          ? "You may also give by check or in person during Sunday services."
                          : "您也可以通过支票或在主日崇拜时亲自奉献。"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MainFooter language={language} />
    </div>
  )
}
