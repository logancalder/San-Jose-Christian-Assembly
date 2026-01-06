"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Instagram, Youtube } from "lucide-react"
import LanguageToggle from "@/components/language-toggle"

interface MainNavProps {
  language: "en" | "zh"
  toggleLanguage: () => void
  currentPage?: string
}

export default function MainNav({ language, toggleLanguage, currentPage }: MainNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mainNavItems = [
    { en: "ABOUT", zh: "关于我们", dropdown: true },
    { en: "WATCH LIVE", zh: "在线观看", isExternal: true, href: "https://www.youtube.com/@SanJoseChristianAssembly" },
    { en: "BIBLE STUDY", zh: "查经" },
    { en: "YOUTH", zh: "青年" },
    { en: "GIVE", zh: "奉献" },
  ]

  const aboutDropdownItems = [
    { en: "VALUES", zh: "使命" },
    { en: "CONNECT", zh: "联系" },
    { en: "STAFF", zh: "牧师" },
    { en: "HISTORY", zh: "历史" },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#272727] shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          <div className="w-1/4">
            <Link href="/" className="font-bold text-xl flex items-center gap-2 text-[#fbf8f3]">
              <img src="/logo.png" alt="SJCA Logo" className="h-[30px] w-auto" />
              <span className="hidden sm:inline">SJCA</span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-center flex-1 space-x-8">
            {mainNavItems.map((item) => (
              <div key={item.en} className="relative group">
                {item.dropdown ? (
                  <div>
                    <button
                      className="text-sm font-medium text-[#fbf8f3] hover:text-white flex items-center gap-1 transition-colors"
                    >
                      {language === "en" ? item.en : item.zh}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <div className="absolute top-full left-0 mt-4 w-48 bg-[#272727] border border-[#313437] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {aboutDropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.en}
                          href={`/${dropdownItem.en.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block px-4 py-2 text-sm text-[#fbf8f3]/80 hover:text-[#fbf8f3] hover:bg-[#313437] transition-colors"
                        >
                          {language === "en" ? dropdownItem.en : dropdownItem.zh}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.isExternal ? item.href! : `/${item.en.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`text-sm font-medium text-[#fbf8f3] hover:text-white transition-colors ${
                      currentPage === item.en ? "border-b-2 border-[#fbf8f3]" : ""
                    }`}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                  >
                    {language === "en" ? item.en : item.zh}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="w-1/4 flex items-center justify-end space-x-3">
            <Link 
              href="https://www.instagram.com/sjcachurch" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:block"
            >
              <Instagram className="h-5 w-5 text-[#fbf8f3]/70 hover:text-[#fbf8f3] transition-colors" />
            </Link>
            <Link 
              href="https://www.youtube.com/@SanJoseChristianAssembly" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:block"
            >
              <Youtube className="h-5 w-5 text-[#fbf8f3]/70 hover:text-[#fbf8f3] transition-colors" />
            </Link>
            <LanguageToggle language={language} toggleLanguage={toggleLanguage} />

            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-[#fbf8f3] hover:bg-[#313437]" 
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#272727] lg:hidden">
          <div className="container mx-auto px-4 py-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="font-bold text-xl flex items-center gap-2 text-[#fbf8f3]">
                <img src="/logo.png" alt="SJCA Logo" className="h-[30px] w-auto" />
                SJCA
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#fbf8f3] hover:bg-[#313437]"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex flex-col space-y-6">
              {mainNavItems.map((item) => (
                <div key={item.en}>
                  {item.dropdown ? (
                    <>
                      <button
                        className="text-lg font-medium w-full text-left flex items-center justify-between text-[#fbf8f3]"
                        onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                      >
                        {language === "en" ? item.en : item.zh}
                        <ChevronDown className={`h-4 w-4 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {aboutDropdownOpen && (
                        <div className="ml-4 mt-3 space-y-3 border-l-2 border-[#313437] pl-4">
                          {aboutDropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.en}
                              href={`/${dropdownItem.en.toLowerCase().replace(/\s+/g, "-")}`}
                              className="block py-1 text-[#fbf8f3]/70 hover:text-[#fbf8f3] transition-colors"
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
                      href={item.isExternal ? item.href! : `/${item.en.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-lg font-medium text-[#fbf8f3]"
                      onClick={() => setMobileMenuOpen(false)}
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                    >
                      {language === "en" ? item.en : item.zh}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile social links */}
            <div className="mt-auto pb-8">
              <div className="flex items-center gap-4 pt-6 border-t border-[#313437]">
                <Link 
                  href="https://www.instagram.com/sjcachurch" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-6 w-6 text-[#fbf8f3]/70 hover:text-[#fbf8f3] transition-colors" />
                </Link>
                <Link 
                  href="https://www.youtube.com/@SanJoseChristianAssembly" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Youtube className="h-6 w-6 text-[#fbf8f3]/70 hover:text-[#fbf8f3] transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
