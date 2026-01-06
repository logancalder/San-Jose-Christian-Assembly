"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"

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
  const searchParams = useSearchParams()
  const date = searchParams.get("date")

  useEffect(() => {
    const fetchVerseData = async () => {
      try {
        setIsLoading(true)
        const date = searchParams.get("date") || new Date().toISOString().split('T')[0]
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

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav language={language} toggleLanguage={toggleLanguage} />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center text-sm mb-8 hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === "en" ? "Back to Home" : "返回首页"}
            </Link>
            
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h1 className="text-3xl font-bold mb-6 text-center">
                {language === "en" ? "Daily Bread" : "每日经文"}
              </h1>
              
              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-lg">{language === "en" ? "Loading..." : "加载中..."}</p>
                </div>
              ) : verseData ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">
                      {language === "en" ? verseData.verse : verseData.verse_zh}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {date ? new Date(date).toLocaleString('en-US', {
                        timeZone: 'Asia/Shanghai',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }) : new Date().toLocaleString('en-US', {
                        timeZone: 'Asia/Shanghai',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  
                  <div className="border-t border-b py-6 my-6">
                    <div className="prose prose-lg max-w-none">
                      {(language === "en" ? verseData.verses : verseData.verses_zh).map((verse, index) => (
                        <p key={index} className="mb-4">
                          <span className="font-bold text-primary mr-2">{verse.verse}</span>
                          {verse.text.trim()}
                        </p>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      onClick={toggleLanguage}
                      variant="outline"
                      className="rounded-full"
                    >
                      {language === "en" ? "查看中文" : "View in English"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-red-500">
                    {language === "en" ? "Verse not found" : "未找到经文"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <MainFooter language={language} />
    </div>
  )
}

export default function DailyBreadPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4">Loading...</p>
          </div>
        </div>
      }>
        <DailyBreadContent />
      </Suspense>
    </div>
  )
} 