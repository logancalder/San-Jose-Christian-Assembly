"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronRight } from "lucide-react"
import type { BibleBook } from "@/lib/bible-data"

interface BibleNavigationProps {
  books: BibleBook[]
  selectedBook: BibleBook | null
  selectedChapter: number
  onBookSelect: (book: BibleBook) => void
  onChapterSelect: (chapter: number) => void
  language: "en" | "zh"
  searchQuery: string
}

export default function BibleNavigation({
  books,
  selectedBook,
  selectedChapter,
  onBookSelect,
  onChapterSelect,
  language,
  searchQuery,
}: BibleNavigationProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("ot")

  const oldTestament = books.filter((book) => book.testament === "old")
  const newTestament = books.filter((book) => book.testament === "new")

  const filteredOldTestament = searchQuery
    ? oldTestament.filter((book) => book.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : oldTestament

  const filteredNewTestament = searchQuery
    ? newTestament.filter((book) => book.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : newTestament

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Old Testament */}
      <Collapsible
        open={expandedSection === "ot"}
        onOpenChange={() => toggleSection("ot")}
        className="border-b border-black"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left font-bold">
          <span>{language === "en" ? "Old Testament" : "旧约"}</span>
          <ChevronRight
            className={`h-5 w-5 transition-transform ${expandedSection === "ot" ? "transform rotate-90" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-2">
            {filteredOldTestament.map((book) => (
              <div key={book.id} className="mb-2">
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-left rounded-none hover:bg-gray-100 ${
                    selectedBook?.id === book.id ? "bg-gray-100 font-bold" : ""
                  }`}
                  onClick={() => onBookSelect(book)}
                >
                  {book.name}
                </Button>

                {selectedBook?.id === book.id && (
                  <div className="grid grid-cols-5 gap-2 mt-2 pl-4">
                    {Array.from({ length: book.chapters.length }, (_, i) => i + 1).map((chapter) => (
                      <Button
                        key={chapter}
                        variant="ghost"
                        size="sm"
                        className={`rounded-none hover:bg-gray-100 ${
                          selectedChapter === chapter ? "bg-black text-white" : ""
                        }`}
                        onClick={() => onChapterSelect(chapter)}
                      >
                        {chapter}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* New Testament */}
      <Collapsible open={expandedSection === "nt"} onOpenChange={() => toggleSection("nt")}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left font-bold">
          <span>{language === "en" ? "New Testament" : "新约"}</span>
          <ChevronRight
            className={`h-5 w-5 transition-transform ${expandedSection === "nt" ? "transform rotate-90" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-2">
            {filteredNewTestament.map((book) => (
              <div key={book.id} className="mb-2">
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-left rounded-none hover:bg-gray-100 ${
                    selectedBook?.id === book.id ? "bg-gray-100 font-bold" : ""
                  }`}
                  onClick={() => onBookSelect(book)}
                >
                  {book.name}
                </Button>

                {selectedBook?.id === book.id && (
                  <div className="grid grid-cols-5 gap-2 mt-2 pl-4">
                    {Array.from({ length: book.chapters.length }, (_, i) => i + 1).map((chapter) => (
                      <Button
                        key={chapter}
                        variant="ghost"
                        size="sm"
                        className={`rounded-none hover:bg-gray-100 ${
                          selectedChapter === chapter ? "bg-black text-white" : ""
                        }`}
                        onClick={() => onChapterSelect(chapter)}
                      >
                        {chapter}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

