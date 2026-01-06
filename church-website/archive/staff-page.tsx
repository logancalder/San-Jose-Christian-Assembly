"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/components/main-footer"
import ParallaxHero from "@/components/parallax-hero"
import Image from "next/image"

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
    <div className="flex min-h-screen flex-col">
      <MainNav 
        language={language} 
        toggleLanguage={toggleLanguage}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <ParallaxHero
          type="image"
          src="/easter_25/DSC_0471.jpg"
          initialOffset={0}
          height="h-[60vh]"
        >
          <h1 className="font-bold text-4xl md:text-6xl mb-4">
            {language === "en" ? "OUR STAFF" : "我们的同工"}
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            {language === "en" 
              ? "MEET THE PEOPLE WHO SERVE OUR CHURCH"
              : "认识服事我们教会的同工"}
          </p>
        </ParallaxHero>

        {/* Staff Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {staffMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  // variants={fadeInVariants}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative w-64 h-64 mb-6 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
                  <h3 className="text-lg text-gray-600 mb-4">
                    {language === "en" ? member.role.en : member.role.zh}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {language === "en" ? member.description.en : member.description.zh}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <MainFooter language={language} />
    </div>
  )
} 