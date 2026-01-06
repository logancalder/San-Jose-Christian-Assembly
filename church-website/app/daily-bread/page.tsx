"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"
import { motion } from "framer-motion"

interface Verse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

interface DailyBreadData {
  verse: string;
  verse_zh: string;
  content: string;
  content_zh: string;
  date: string;
  verses: Verse[];
  verses_zh: Verse[];
}

function DailyBreadContent() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [verseData, setVerseData] = useState<DailyBreadData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasYesterdayEntry, setHasYesterdayEntry] = useState(false)
  const [hasTomorrowEntry, setHasTomorrowEntry] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const date = searchParams.get("date") || new Date().toISOString().split('T')[0]

  // Get yesterday and tomorrow dates
  const getAdjacentDate = (currentDate: string, days: number) => {
    const d = new Date(currentDate)
    d.setDate(d.getDate() + days)
    return d.toISOString().split('T')[0]
  }

  const yesterdayDate = getAdjacentDate(date, -1)
  const tomorrowDate = getAdjacentDate(date, 1)
  const isToday = date === new Date().toISOString().split('T')[0]

  useEffect(() => {
    const fetchVerseData = async () => {
      try {
        setIsLoading(true)
        const queryDate = searchParams.get("date") || new Date().toISOString().split('T')[0]
        const response = await fetch(`/api/daily-bread?date=${queryDate}`)
        
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

    // Check if adjacent dates have entries
    const checkAdjacentEntries = async () => {
      const yday = getAdjacentDate(date, -1)
      const tmo = getAdjacentDate(date, 1)
      
      try {
        const [ydayRes, tmoRes] = await Promise.all([
          fetch(`/api/daily-bread?date=${yday}`),
          fetch(`/api/daily-bread?date=${tmo}`)
        ])
        
        if (ydayRes.ok) {
          const ydayData = await ydayRes.json()
          setHasYesterdayEntry(!!ydayData?.verse)
        } else {
          setHasYesterdayEntry(false)
        }
        
        if (tmoRes.ok) {
          const tmoData = await tmoRes.json()
          setHasTomorrowEntry(!!tmoData?.verse)
        } else {
          setHasTomorrowEntry(false)
        }
      } catch {
        setHasYesterdayEntry(false)
        setHasTomorrowEntry(false)
      }
    }

    fetchVerseData()
    checkAdjacentEntries()
  }, [date, searchParams])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf8f3]">
      <MainNav language={language} toggleLanguage={toggleLanguage} />
      
      <main className="flex-1">
        {/* Hero - DARK */}
        <section className="pt-20 pb-12 bg-[#313437]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link href="/" className="inline-flex items-center text-sm mb-8 text-[#fbf8f3]/70 hover:text-[#fbf8f3] transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === "en" ? "Back to Home" : "返回首页"}
              </Link>
              
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[#636363] mb-4">
                  {language === "en" ? "Daily Bread" : "每日经文"}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-[#fbf8f3] mb-4">
                  {isLoading 
                    ? (language === "en" ? "Loading..." : "加载中...")
                    : verseData 
                      ? (language === "en" ? verseData.verse : verseData.verse_zh)
                      : (language === "en" ? "Verse Not Found" : "未找到经文")}
                </h1>
                <p className="text-[#fbf8f3]/60 mt-2">
                  {new Date(date + 'T00:00:00').toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content - LIGHT */}
        <section className="py-16 bg-[#fbf8f3]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#272727] mx-auto mb-4"></div>
                  <p className="text-lg text-[#636363]">
                    {language === "en" ? "Loading..." : "加载中..."}
                  </p>
                </div>
              ) : verseData ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInVariants}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="bg-white p-8 md:p-12 shadow-sm">
                    {/* Language toggle at the top */}
                    <div className="mb-8 pb-6 border-b border-[#e5e0d8] flex justify-end">
                      <button 
                        onClick={toggleLanguage}
                        className="group flex items-center gap-3 text-[#636363] hover:text-[#272727] transition-colors"
                      >
                        <span className="text-sm uppercase tracking-[0.2em]">
                          {language === "en" ? "阅读中文" : "Read in English"}
                        </span>
                        <span className="w-8 h-px bg-[#636363] group-hover:bg-[#272727] group-hover:w-12 transition-all"></span>
                      </button>
                    </div>

                    <div className="prose prose-lg max-w-none">
                      {/* If we have individual verses, render them */}
                      {(language === "en" ? verseData.verses : verseData.verses_zh)?.length > 0 ? (
                        (language === "en" ? verseData.verses : verseData.verses_zh).map((verse, index) => (
                          <p key={index} className="mb-6 text-[#272727] leading-relaxed">
                            <span className="font-bold text-[#636363] mr-2">{verse.verse}</span>
                            {verse.text.trim()}
                          </p>
                        ))
                      ) : (
                        /* Otherwise, render the content text - split by verse numbers */
                        <div className="space-y-4">
                          {(() => {
                            const content = language === "en" ? verseData.content : verseData.content_zh;
                            if (!content) return null;
                            
                            // Split by superscript verse numbers (keep the delimiter)
                            const superscriptPattern = /([⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g;
                            const parts = content.split(superscriptPattern).filter(Boolean);
                            
                            // Group pairs of [verse number, verse text]
                            const verses: { num: string; text: string }[] = [];
                            for (let i = 0; i < parts.length; i++) {
                              if (/^[⁰¹²³⁴⁵⁶⁷⁸⁹]+$/.test(parts[i])) {
                                verses.push({
                                  num: parts[i],
                                  text: parts[i + 1]?.trim() || ''
                                });
                                i++; // Skip the text part
                              }
                            }
                            
                            return verses.map((verse, index) => (
                              <p key={index} className="text-lg md:text-xl text-[#272727] leading-relaxed">
                                <span className="text-[#636363] font-medium mr-2">{verse.num}</span>
                                {verse.text}
                              </p>
                            ));
                          })()}
                        </div>
                      )}
                    </div>

                    {/* Date navigation at bottom */}
                    <div className="mt-10 pt-8 border-t border-[#e5e0d8] flex items-center justify-between">
                      <button
                        onClick={() => hasYesterdayEntry && router.push(`/daily-bread?date=${yesterdayDate}`)}
                        disabled={!hasYesterdayEntry}
                        className={`flex items-center gap-2 transition-colors ${
                          hasYesterdayEntry
                            ? "text-[#636363] hover:text-[#272727] cursor-pointer"
                            : "text-[#e5e0d8] cursor-not-allowed"
                        }`}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="text-sm uppercase tracking-[0.15em]">{language === "en" ? "Yesterday" : "昨天"}</span>
                      </button>
                      
                      <button
                        onClick={() => hasTomorrowEntry && !isToday && router.push(`/daily-bread?date=${tomorrowDate}`)}
                        disabled={isToday || !hasTomorrowEntry}
                        className={`flex items-center gap-2 transition-colors ${
                          !isToday && hasTomorrowEntry
                            ? "text-[#636363] hover:text-[#272727] cursor-pointer"
                            : "text-[#e5e0d8] cursor-not-allowed"
                        }`}
                      >
                        <span className="text-sm uppercase tracking-[0.15em]">{language === "en" ? "Tomorrow" : "明天"}</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-12 bg-white shadow-sm">
                  <p className="text-lg text-red-500">
                    {language === "en" ? "Verse not found" : "未找到经文"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA - DARK */}
        <section className="py-12 bg-[#313437]">
          <div className="container mx-auto px-4 text-center">
            <p className="text-[#fbf8f3]/70 mb-4">
              {language === "en" 
                ? "Want to receive daily devotionals?" 
                : "想要接收每日灵修？"}
            </p>
            <Link href="/subscribe">
              <Button className="rounded-none bg-[#fbf8f3] text-[#272727] hover:bg-white">
                {language === "en" ? "Subscribe" : "订阅"}
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <MainFooter language={language} />
    </div>
  )
}

export default function DailyBreadPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#fbf8f3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#272727] mx-auto"></div>
          <p className="mt-4 text-[#636363]">Loading...</p>
        </div>
      </div>
    }>
      <DailyBreadContent />
    </Suspense>
  )
}
