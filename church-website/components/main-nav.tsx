"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, User } from "lucide-react"
import LanguageToggle from "@/components/language-toggle"

interface MainNavProps {
  language: "en" | "zh"
  toggleLanguage: () => void
  currentPage?: string
}

export default function MainNav({ language, toggleLanguage, currentPage }: MainNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)

  const mainNavItems = [
    { en: "ABOUT", zh: "关于我们", dropdown: true },
    { en: "WATCH LIVE", zh: "在线观看" },
    { en: "BIBLE STUDY", zh: "查经" },
    { en: "GIVE", zh: "奉献" },
    { en: "YOUTH", zh: "青年" },
  ]

  const aboutDropdownItems = [
    { en: "VALUES", zh: "价值观" },
    { en: "CONNECT", zh: "联系" },
    { en: "HISTORY", zh: "历史" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          <div className="w-1/4">
            <Link href="/" className="font-bold text-2xl">
              SJCA
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-center flex-1 space-x-8">
            {mainNavItems.map((item) => (
              <div key={item.en} className="relative group">
                {item.dropdown ? (
                  <div>
                    <button
                      className="text-sm font-medium hover:underline underline-offset-8 decoration-2 flex items-center gap-1"
                    >
                      {language === "en" ? item.en : item.zh}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {aboutDropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.en}
                          href={`/${dropdownItem.en.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {language === "en" ? dropdownItem.en : dropdownItem.zh}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={`/${item.en.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`text-sm font-medium hover:underline underline-offset-8 decoration-2 ${
                      currentPage === item.en ? "underline" : ""
                    }`}
                  >
                    {language === "en" ? item.en : item.zh}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="w-1/4 flex items-center justify-end space-x-4">
            <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
            <Link href="/profile">
              <Button variant="outline" size="icon" className="rounded-none border-2">
                <User className="h-4 w-4" />
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="container mx-auto px-4 py-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="font-bold text-2xl">
                SJCA
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex flex-col space-y-6">
              {mainNavItems.map((item) => (
                <div key={item.en}>
                  {item.dropdown ? (
                    <>
                      <button
                        className="text-lg font-medium w-full text-left flex items-center justify-between"
                        onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                      >
                        {language === "en" ? item.en : item.zh}
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      {aboutDropdownOpen && (
                        <div className="ml-4 mt-2 space-y-2">
                          {aboutDropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.en}
                              href={`/${dropdownItem.en.toLowerCase().replace(/\s+/g, "-")}`}
                              className="block py-2 text-lg"
                              onClick={() => {
                                setAboutDropdownOpen(false)
                                setMobileMenuOpen(false)
                              }}
                            >
                              {language === "en" ? dropdownItem.en : dropdownItem.zh}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={`/${item.en.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-lg font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {language === "en" ? item.en : item.zh}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 