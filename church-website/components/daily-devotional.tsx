"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Book, ArrowRight } from "lucide-react"
import Link from "next/link"

interface DailyDevotionalProps {
  language: "en" | "zh"
}

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

export default function DailyDevotional({ language }: DailyDevotionalProps) {
  const [verseData, setVerseData] = useState<DailyBreadData | null>(null)
  const [upcomingVerses, setUpcomingVerses] = useState<DailyBreadData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [devotion, setDevotion] = useState({
    en: "Take a moment today to reflect on God's incredible love for you. How might this change how you approach your day?",
    zh: "今天花点时间思考上帝对你的无比的爱。这如何改变你对待一天的方式？",
  })

  useEffect(() => {
    const fetchVerseData = async () => {
      try {
        setIsLoading(true)
        const { DateTime } = require('luxon');
        // Get today's date in Pacific Time
        const date = DateTime.now().setZone('America/Los_Angeles').toFormat('yyyy-MM-dd');

        const response = await fetch(`/api/daily-bread?date=${date}`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch verse data")
        }
        
        const data = await response.json()
        setVerseData(data)
        
        // Fetch upcoming verses
        const upcomingVersesData = await Promise.all(
          Array.from({ length: 4 }, async (_, i) => {
            const nextDate = DateTime.now()
              .setZone('America/Los_Angeles')
              .plus({ days: i + 1 })
              .toFormat('yyyy-MM-dd');
            
            const nextResponse = await fetch(`/api/daily-bread?date=${nextDate}`);
            if (!nextResponse.ok) {
              throw new Error(`Failed to fetch verse data for ${nextDate}`);
            }
            return nextResponse.json();
          })
        );
        
        setUpcomingVerses(upcomingVersesData);
      } catch (error) {
        console.error("Error fetching verse data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVerseData()
  }, [])

  // Check if the verse is longer than one verse (for demo purposes, we'll consider it long if it has more than 100 characters)
  const isLongVerse = (text: string) => text.length > 20;

  return (
    <div className="border-2 border-black bg-white h-full p-6">
      <div className="pb-2">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Book className="h-5 w-5" />
          {language === "en" ? "Daily Bread" : "每日灵修"}
        </div>
        <div className="text-muted-foreground text-sm">
          {language === "en" ? "Today's verse and reflection" : "今日经文与反思"}
        </div>
      </div>
      <div className="py-4">
        {isLoading ? (
          <p className="text-muted-foreground italic">
            {language === "en" ? "Loading..." : "加载中..."}
          </p>
        ) : verseData ? (
          <blockquote className="border-l-4 border-black pl-4 italic mb-4">
            <p className="text-gray-700">
              {language === "en" 
                ? (verseData.verses.length > 0 ? verseData.verses[0].text : verseData.verse)
                : (verseData.verses_zh.length > 0 ? verseData.verses_zh[0].text : verseData.verse_zh)}
              {isLongVerse(language === "en" 
                ? (verseData.verses.length > 0 ? verseData.verses[0].text : verseData.verse)
                : (verseData.verses_zh.length > 0 ? verseData.verses_zh[0].text : verseData.verse_zh)) && (
                <Link 
                  href={`/daily-bread?date=${verseData.date}`}
                  className="text-primary hover:underline inline-flex items-center"
                >
                  {language === "en" ? "Read More" : "阅读更多"}
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Link>
              )}
            </p>
            <footer className="text-sm text-gray-500 mt-1">
              {language === "en" ? verseData.verse : verseData.verse_zh}
            </footer>
          </blockquote>
        ) : (
          <p className="text-muted-foreground italic">
            {language === "en" ? "Verse not found" : "未找到经文"}
          </p>
        )}
        <p className="text-muted-foreground">{language === "en" ? devotion.en : devotion.zh}</p>
      </div>
      <div className="pt-2">
        <h3 className="font-medium mb-2">
          <b>{language === "en" ? "Upcoming Readings" : "即将到来的阅读"}</b>
        </h3>
        <ul className="space-y-2">
          {upcomingVerses.map((verse, index) => {
            const { DateTime } = require('luxon');
            const verseDate = DateTime.fromISO(verse.date)
              .setZone('America/Los_Angeles')
              .toFormat('EEEE, MMM d');
            
            return (
              <li key={verse.date} className="text-sm">
                <Link 
                  href={`/daily-bread?date=${verse.date}`}
                  className="hover:underline flex items-center justify-between"
                >
                  <span>
                    <b>{verseDate}</b> - {language === "en" ? verse.verse : verse.verse_zh}
                  </span>
                  <ArrowRight className="h-3 w-3 ml-1 flex-shrink-0" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  )
}

