"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, MapPin } from "lucide-react"
import ParallaxHero from "@/components/parallax-hero"

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
        console.log('Fetching bible study data...');
        const response = await fetch('/api/bible-studies');
        const data = await response.json();
        
        if (!response.ok) {
          console.error('API Error:', data);
          throw new Error(data.error || 'Failed to fetch bible study data');
        }
        
        console.log('API Response:', data);
        
        if (data && data.length > 0) {
          setBibleStudy(data[0]);
        } else {
          console.log('No bible study data available for current week');
        }
      } catch (err) {
        console.error('Fetch Error:', err);
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
    <div className="flex min-h-screen flex-col">
      <MainNav 
        language={language} 
        toggleLanguage={toggleLanguage}
      />

      <main className="flex-1 pt-14">
        {/* Hero Section */}
        <ParallaxHero
          type="image"
          src="/bible-study-banner.jpg"
          initialOffset={0}
        >
          <h1 className="font-bold text-4xl md:text-6xl mb-4">
            {language === "en" ? "BIBLE STUDY" : "查经"}
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            {language === "en" 
              ? "Dive deeper into God's Word together"
              : "一起深入研读神的话语"}
          </p>
        </ParallaxHero>

        {/* Current Study Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8"
            >
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                  <p className="text-lg text-gray-600">Loading bible study...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500 text-lg">{error}</p>
                </div>
              ) : bibleStudy ? (
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {language === "en" ? "Current Study" : "当前学习"}
                    </h2>
                    <p className="text-xl text-gray-700 leading-relaxed">
                      {language === "en"
                        ? bibleStudy.description
                        : bibleStudy.description_cn}
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-gray-700">
                        <Clock className="h-5 w-5 text-primary" />
                        <span>{language === "en" ? "Friday at 8:00 PM" : "每周五晚上7:30"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>215 Topaz St, Milpitas, CA 95035</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <span className="font-medium">{bibleStudy.verse}</span>
                      </div>
                    </div>
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden shadow-md">
                    <img
                      src="https://svnfvvimrctyszdksuak.supabase.co/storage/v1/object/public/biblestudies//judges.png"
                      alt="Current Bible Study"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    {language === "en" 
                      ? "No current bible study available" 
                      : "暂无查经信息"}
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Study Format */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold mb-12">
                {language === "en" ? "What to Expect" : "学习方式"}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 border-2 border-black bg-white">
                  <h3 className="text-xl font-bold mb-4">
                    {language === "en" ? "Group Discussion" : "小组讨论"}
                  </h3>
                  <p>
                    {language === "en"
                      ? "Interactive discussion in small groups to share insights and questions."
                      : "小组互动讨论，分享见解和问题。"}
                  </p>
                </div>
                <div className="p-6 border-2 border-black bg-white">
                  <h3 className="text-xl font-bold mb-4">
                    {language === "en" ? "Biblical Teaching" : "圣经教导"}
                  </h3>
                  <p>
                    {language === "en"
                      ? "In-depth teaching from experienced leaders and pastors."
                      : "经验丰富的领袖和牧师的深入教导。"}
                  </p>
                </div>
                <div className="p-6 border-2 border-black bg-white">
                  <h3 className="text-xl font-bold mb-4">
                    {language === "en" ? "Prayer Time" : "祷告时间"}
                  </h3>
                  <p>
                    {language === "en"
                      ? "Dedicated time for group prayer and spiritual growth."
                      : "专注于小组祷告和属灵成长的时间。"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <MainFooter language={language} />
    </div>
  )
}
