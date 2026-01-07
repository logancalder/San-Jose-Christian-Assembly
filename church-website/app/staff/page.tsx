"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StaffPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const staffMembers = [
    {
      name: "Merry Jeng",
      role: { en: "Senior Pastor", zh: "主任牧师" },
      description: {
        en: "Merry Jeng serves as our Senior Pastor, bringing years of experience in ministry and leadership. She is passionate about teaching God's Word and equipping believers for service.",
        zh: "郑美莉担任我们的主任牧师，拥有多年的服事和领导经验。她热衷于教导上帝的话语，装备信徒服事。"
      },
      image: "/staff/merry.jpg"
    },
    {
      name: "Barnabas Choi",
      role: { en: "Associate Pastor", zh: "副牧师" },
      description: {
        en: "Barnabas Choi serves as our Associate Pastor, focusing on youth ministry and community outreach. He brings energy and creativity to our church's mission.",
        zh: "蔡巴拿巴担任我们的副牧师，专注于青年事工和社区外展。他为教会的使命带来活力和创意。"
      },
      image: "/staff/barnabas-choi.jpg"
    },
    {
      name: "John Lim",
      role: { en: "Worship Director", zh: "敬拜主任" },
      description: {
        en: "John Lim leads our worship ministry, bringing musical excellence and spiritual depth to our services. He is dedicated to creating an atmosphere of authentic worship.",
        zh: "林约翰领导我们的敬拜事工，为我们的聚会带来音乐卓越和属灵深度。他致力于创造真实的敬拜氛围。"
      },
      image: "/staff/john-lim.jpg"
    },
    {
      name: "Jengyi Yu",
      role: { en: "Children's Ministry Director", zh: "儿童事工主任" },
      description: {
        en: "Jengyi Yu oversees our children's ministry, creating engaging programs that help children grow in their faith. She has a heart for nurturing young believers.",
        zh: "余正怡负责我们的儿童事工，创建引人入胜的项目，帮助儿童在信仰中成长。她有一颗培育年轻信徒的心。"
      },
      image: "/staff/jengyi-yu.jpg"
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#fbf8f3]">
      <MainNav 
        language={language} 
        toggleLanguage={toggleLanguage}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[40vh] sm:h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/easter_25/DSC_0471.jpg"
              alt="Staff"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#272727]/70 via-[#272727]/60 to-[#313437]"></div>
          </div>
          <div className="relative z-10 text-center text-[#fbf8f3] px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-bold text-3xl sm:text-4xl md:text-6xl mb-3 sm:mb-4"
            >
              {language === "en" ? "OUR STAFF" : "我们的同工"}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.3em] text-[#fbf8f3]/50"
            >
              {language === "en" 
                ? "Meet the people who serve our church"
                : "认识服事我们教会的同工"}
            </motion.p>
          </div>
        </section>

        {/* Staff Grid - Alternating */}
        <div className="bg-[#fbf8f3]">
          {staffMembers.map((member, index) => (
            <section 
              key={index} 
              className={`py-10 sm:py-16 ${index % 2 === 0 ? 'bg-[#fbf8f3]' : 'bg-[#313437]'}`}
            >
              <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInVariants}
                    transition={{ duration: 0.6 }}
                    className={`grid md:grid-cols-3 gap-6 sm:gap-8 items-center ${index % 2 !== 0 ? 'md:grid-flow-dense' : ''}`}
                  >
                    {/* Photo */}
                    <div className={`md:col-span-1 ${index % 2 !== 0 ? 'md:col-start-3' : ''}`}>
                      <div className="aspect-[3/4] relative overflow-hidden max-w-[280px] mx-auto md:max-w-none">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className={`md:col-span-2 text-center md:text-left ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                      <p className={`text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.3em] mb-2 ${index % 2 === 0 ? 'text-[#636363]' : 'text-[#636363]'}`}>
                        {language === "en" ? member.role.en : member.role.zh}
                      </p>
                      <h2 className={`text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 ${index % 2 === 0 ? 'text-[#272727]' : 'text-[#fbf8f3]'}`}>
                        {member.name}
                      </h2>
                      <p className={`text-sm sm:text-lg leading-relaxed ${index % 2 === 0 ? 'text-[#636363]' : 'text-[#fbf8f3]/70'}`}>
                        {language === "en" ? member.description.en : member.description.zh}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <section className="py-10 sm:py-16 bg-[#313437]">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#fbf8f3] mb-3 sm:mb-4">
                {language === "en" ? "Want to Connect?" : "想要联系？"}
              </h2>
              <p className="text-[#fbf8f3]/70 mb-6 sm:mb-8 text-sm sm:text-base px-2">
                {language === "en"
                  ? "We'd love to hear from you and help you get connected to our community."
                  : "我们很乐意听到您的声音，帮助您融入我们的社区。"}
              </p>
              <Link href="/connect">
                <Button className="rounded-none bg-[#fbf8f3] text-[#272727] hover:bg-white px-6 sm:px-8">
                  {language === "en" ? "Contact Us" : "联系我们"}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <MainFooter language={language} />
    </div>
  )
}
