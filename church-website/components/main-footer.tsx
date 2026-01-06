"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface MainFooterProps {
  language: "en" | "zh"
}

export default function MainFooter({ language }: MainFooterProps) {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">
              {language === "en" ? "San Jose Christian Assembly" : "圣何塞基督教会"}
            </h3>
            <p className="text-gray-400">
              {language === "en"
                ? "215 Topaz St, Milpitas, CA 95035"
                : "加利福尼亚州圣何塞教堂街123号，邮编95123"}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4">{language === "en" ? "Service Times" : "礼拜时间"}</h3>
            <p className="text-gray-400">
              {language === "en" ? "Sunday Worship: 9:30 AM" : "周日：上午9:30"}
            </p>
            <p className="text-gray-400">
              {language === "en" ? "Friday Bible Study: 7:30 PM" : "周三查经：晚上7:30"}
            </p>
            <p className="text-gray-400">
              {language === "en" ? "Saturday Prayer Meeting: 10:15 AM" : "周三查经：晚上10:15"}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4">{language === "en" ? "Follow Us" : "关注我们"}</h3>
            <div className="flex space-x-4">
              <Link href="https://www.youtube.com/@SanJoseChristianAssembly" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-none border-2 bg-transparent">
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
                    className="h-5 w-5 text-white"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                </Button>
              </Link>
              <Link href="https://www.instagram.com/sjcachurch" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="rounded-none border-2 bg-transparent">
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
                    className="h-5 w-5 text-white"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()}{" "}
            {language === "en" ? "San Jose Christian Assembly. All rights reserved." : "圣何塞基督教会。版权所有。"}
          </p>
        </div>
      </div>
    </footer>
  )
} 