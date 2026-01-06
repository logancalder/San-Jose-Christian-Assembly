"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

interface LanguageToggleProps {
  language: "en" | "zh"
  toggleLanguage: () => void
}

export default function LanguageToggle({ language, toggleLanguage }: LanguageToggleProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-1.5 rounded-none text-[#fbf8f3]/80 hover:text-[#fbf8f3] hover:bg-[#313437] px-3"
      onClick={toggleLanguage}
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm">{language === "en" ? "中文" : "EN"}</span>
    </Button>
  )
}
