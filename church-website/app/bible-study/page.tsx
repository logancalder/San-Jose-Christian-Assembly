"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"
import { Button } from "@/components/ui/button"
import { Clock, MapPin } from "lucide-react"
import Link from "next/link"

interface BibleStudy {
  date: string;
  verse: string;
  description: string;
  description_cn: string;
}

export default function BibleStudyPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [bibleStudy, setBibleStudy] = useState<BibleStudy | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBibleStudy = async () => {
      try {
        const response = await fetch('/api/bible-studies');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch bible study data');
        }
        
        if (data && data.length > 0) {
          setBibleStudy(data[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBibleStudy();
  }, []);

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
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/pexels-lum3n-44775-167699.jpg"
              alt="Bible Study"
              className="w-full h-full object-cover"
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
        </section>

        {/* Current Study Section - DARK */}
        <section className="py-20 bg-[#313437]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fbf8f3] mx-auto mb-4"></div>
                  <p className="text-lg text-[#fbf8f3]/70">
                    {language === "en" ? "Loading..." : "加载中..."}
                  </p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-400 text-lg">{error}</p>
                </div>
              ) : bibleStudy ? (
                <div className="grid lg:grid-cols-2 gap-0 items-stretch">
                  {/* Study Info */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInVariants}
                    transition={{ duration: 0.6 }}
                    className="bg-[#272727] p-10 lg:p-14"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-[#636363] mb-4">
                      {language === "en" ? "Current Study" : "当前学习"}
                    </p>
                    <h2 className="text-3xl font-bold text-[#fbf8f3] mb-6">
                      {bibleStudy.verse}
                    </h2>
                    <p className="text-lg text-[#fbf8f3]/70 leading-relaxed mb-8">
                      {language === "en"
                        ? bibleStudy.description
                        : bibleStudy.description_cn}
                    </p>
                    <div className="space-y-3 text-[#fbf8f3]/80">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-[#636363]" />
                        <span>{language === "en" ? "Friday at 8:00 PM" : "每周五晚上8:00"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-[#636363]" />
                        <span>215 Topaz St, Milpitas, CA 95035</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Study Image */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInVariants}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="h-[400px] lg:h-auto"
                  >
                    <img
                      src="https://svnfvvimrctyszdksuak.supabase.co/storage/v1/object/public/biblestudies//judges.png"
                      alt="Current Bible Study"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              ) : (
                <div className="text-center py-12 bg-[#272727] border border-[#313437]">
                  <p className="text-[#fbf8f3]/70 text-lg">
                    {language === "en" 
                      ? "No current bible study available" 
                      : "暂无查经信息"}
                  </p>
                </div>
              )}
            </div>
          </div>
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
                      alt="Group Discussion"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#272727] mb-2">
                    {language === "en" ? "Group Discussion" : "小组讨论"}
                  </h3>
                  <p className="text-[#636363]">
                    {language === "en"
                      ? "Interactive discussion in small groups to share insights and questions."
                      : "小组互动讨论，分享见解和问题。"}
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
                      alt="Biblical Teaching"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#272727] mb-2">
                    {language === "en" ? "Biblical Teaching" : "圣经教导"}
                  </h3>
                  <p className="text-[#636363]">
                    {language === "en"
                      ? "In-depth teaching from experienced leaders and pastors."
                      : "经验丰富的领袖和牧师的深入教导。"}
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
                      alt="Prayer Time"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#272727] mb-2">
                    {language === "en" ? "Prayer Time" : "祷告时间"}
                  </h3>
                  <p className="text-[#636363]">
                    {language === "en"
                      ? "Dedicated time for group prayer and spiritual growth."
                      : "专注于小组祷告和属灵成长的时间。"}
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
