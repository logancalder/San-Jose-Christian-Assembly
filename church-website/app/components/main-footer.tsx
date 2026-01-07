"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface MainFooterProps {
  language: "en" | "zh"
}

export default function MainFooter({ language }: MainFooterProps) {
  return (
    <footer className="bg-[#272727] text-[#fbf8f3] py-10 sm:py-16 border-t border-[#313437]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-[#fbf8f3]">
                {language === "en" ? "San Jose Christian Assembly" : "圣何塞基督教会"}
              </h3>
              <p className="text-[#636363] text-xs sm:text-sm leading-relaxed">
                215 Topaz St<br />
                Milpitas, CA 95035
              </p>
              <Link 
                href="https://maps.google.com/?q=215+Topaz+St,+Milpitas,+CA+95035"
                target="_blank"
                className="inline-block mt-2 sm:mt-3 text-xs sm:text-sm text-[#636363] hover:text-[#fbf8f3] transition-colors"
              >
                {language === "en" ? "Get Directions →" : "获取路线 →"}
              </Link>
            </div>

            <div className="text-center md:text-left">
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-[#fbf8f3]">
                {language === "en" ? "Service Times" : "礼拜时间"}
              </h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between max-w-[200px] mx-auto md:mx-0 text-[#636363]">
                  <span>{language === "en" ? "Sunday Worship" : "周日崇拜"}</span>
                  <span className="text-[#fbf8f3]/80">9:30 AM</span>
                </div>
                <div className="flex justify-between max-w-[200px] mx-auto md:mx-0 text-[#636363]">
                  <span>{language === "en" ? "Friday Bible Study" : "周五查经"}</span>
                  <span className="text-[#fbf8f3]/80">8:00 PM</span>
                </div>
                <div className="flex justify-between max-w-[200px] mx-auto md:mx-0 text-[#636363]">
                  <span>{language === "en" ? "Saturday Prayer" : "周六祷告会"}</span>
                  <span className="text-[#fbf8f3]/80">10:15 AM</span>
                </div>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 text-[#fbf8f3]">
                {language === "en" ? "Connect" : "联系"}
              </h3>
              <div className="flex gap-3 justify-center md:justify-start">
                <Link href="https://www.youtube.com/@SanJoseChristianAssembly" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-none border border-[#313437] bg-transparent hover:bg-[#313437] hover:border-[#636363]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-[#636363]"
                    >
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <path d="m10 15 5-3-5-3z" />
                    </svg>
                  </Button>
                </Link>
                <Link href="https://www.instagram.com/sjcachurch" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-none border border-[#313437] bg-transparent hover:bg-[#313437] hover:border-[#636363]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 sm:h-5 sm:w-5 text-[#636363]"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </Button>
                </Link>
              </div>
              <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#636363]">
                {language === "en" 
                  ? "Follow us for updates and encouragement"
                  : "关注我们获取更新和鼓励"}
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#313437] text-center">
            <p className="text-[#636363] text-xs sm:text-sm">
              &copy; {new Date().getFullYear()}{" "}
              {language === "en" ? "San Jose Christian Assembly. All rights reserved." : "圣何塞基督教会。版权所有。"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
