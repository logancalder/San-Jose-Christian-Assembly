"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X, ChevronLeft, ChevronRight, Search, Bookmark, Share2, ArrowLeft, ArrowRight } from "lucide-react"
import LanguageToggle from "@/components/language-toggle"
import BibleNavigation from "@/components/bible-navigation"
import { bibleData, type BibleBook } from "@/lib/bible-data"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"

export default function BibleStudyPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(bibleData[0])
  const [selectedChapter, setSelectedChapter] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [fontSize, setFontSize] = useState(16)

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

  const handleBookSelect = (book: BibleBook) => {
    setSelectedBook(book)
    setSelectedChapter(1)
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  const handleChapterSelect = (chapter: number) => {
    setSelectedChapter(chapter)
  }

  const nextChapter = () => {
    if (!selectedBook) return

    if (selectedChapter < selectedBook.chapters.length) {
      setSelectedChapter(selectedChapter + 1)
    } else {
      // Move to next book
      const currentBookIndex = bibleData.findIndex((book) => book.id === selectedBook.id)
      if (currentBookIndex < bibleData.length - 1) {
        setSelectedBook(bibleData[currentBookIndex + 1])
        setSelectedChapter(1)
      }
    }
  }

  const previousChapter = () => {
    if (!selectedBook) return

    if (selectedChapter > 1) {
      setSelectedChapter(selectedChapter - 1)
    } else {
      // Move to previous book
      const currentBookIndex = bibleData.findIndex((book) => book.id === selectedBook.id)
      if (currentBookIndex > 0) {
        const prevBook = bibleData[currentBookIndex - 1]
        setSelectedBook(prevBook)
        setSelectedChapter(prevBook.chapters.length)
      }
    }
  }

  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 2)
    }
  }

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav 
        language={language} 
        toggleLanguage={toggleLanguage}
        currentPage="Bible Study"
      />

      <main className="flex-1 pt-14">
        {/* Bible navigation sidebar */}
        <div
          className={`fixed top-20 bottom-0 bg-white border-r border-black z-40 transition-all duration-300 ${
            sidebarOpen ? "left-0" : "-left-30"
          } w-80 md:relative md:top-0 md:left-0 md:z-0`}
        >
          <div className="p-4 border-b border-black">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder={language === "en" ? "Search Bible" : "搜索圣经"}
                className="pl-10 rounded-none border-2 border-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <BibleNavigation
            books={bibleData}
            selectedBook={selectedBook}
            selectedChapter={selectedChapter}
            onBookSelect={handleBookSelect}
            onChapterSelect={handleChapterSelect}
            language={language}
            searchQuery={searchQuery}
          />
        </div>

        {/* Toggle sidebar button (mobile only) */}
        <button
          className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 z-30 md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </button>

        {/* Bible content */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-40" : "ml-0"}`}>
          {selectedBook && (
            <div className="p-4 md:p-8">
              {/* Bible reading controls */}
              <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none border-2 border-black"
                    onClick={previousChapter}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-xl font-bold">
                    {selectedBook.name} {selectedChapter}
                  </h2>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none border-2 border-black"
                    onClick={nextChapter}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none border-2 border-black"
                    onClick={decreaseFontSize}
                  >
                    <span className="text-sm">A-</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none border-2 border-black"
                    onClick={increaseFontSize}
                  >
                    <span className="text-sm">A+</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-none border-2 border-black">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-none border-2 border-black">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Bible text */}
              <div className="max-w-3xl mx-auto" style={{ fontSize: `${fontSize}px` }}>
                {selectedBook.chapters[selectedChapter - 1].verses.map((verse) => (
                  <div key={verse.number} className="mb-4">
                    <span className="font-bold text-sm align-super mr-2">{verse.number}</span>
                    <span>{verse.text}</span>
                  </div>
                ))}
              </div>

              {/* Chapter navigation */}
              <div className="flex justify-between items-center mt-12 max-w-3xl mx-auto">
                <Button variant="outline" className="rounded-none border-2 border-black" onClick={previousChapter}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  {language === "en" ? "Previous Chapter" : "上一章"}
                </Button>
                <Button variant="outline" className="rounded-none border-2 border-black" onClick={nextChapter}>
                  {language === "en" ? "Next Chapter" : "下一章"}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <MainFooter language={language} />
    </div>
  )
}

