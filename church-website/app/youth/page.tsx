"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function YouthPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const youthPrograms = [
    {
      name: { en: "Kids for Christ (K-2)", zh: "儿童事工 (K-2)" },
      description: {
        en: "A fun and engaging environment where children learn about God's love through Bible stories, crafts, and activities.",
        zh: "通过圣经故事、手工艺和活动，让儿童在有趣的环境中学习上帝的爱。"
      },
      image: "/easter_25/!bubbles.jpg"
    },
    {
      name: { en: "Mustard Seed (3-8)", zh: "芥菜种 (3-8)" },
      description: {
        en: "Middle school ministry focused on building strong foundations in faith during these crucial years of growth.",
        zh: "专注于在这个关键成长期建立坚实信仰基础的初中事工。"
      },
      image: "/pexels-markusspiske-113338.jpg"
    },
    {
      name: { en: "SALT (9-12)", zh: "盐 (9-12)" },
      description: {
        en: "High school ministry empowering teens to be the salt of the earth through discipleship and leadership development.",
        zh: "通过门徒训练和领导力发展，使青少年成为世上的盐的高中事工。"
      },
      image: "/easter_25/DSC_0792.jpg"
    },
    {
      name: { en: "College & Young Adult", zh: "大学生和青年" },
      description: {
        en: "A vibrant community for college students and young professionals to grow in their faith and build lasting relationships.",
        zh: "为大学生和年轻专业人士提供充满活力的社区，在信仰中成长并建立持久的关系。"
      },
      image: "/!cottoncandygroup.jpg"
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
              src="/easter_25/DSC_0792.jpg"
              alt="Youth Ministry"
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
              {language === "en" ? "YOUTH MINISTRY" : "青年事工"}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.3em] text-[#fbf8f3]/50"
            >
              {language === "en" 
                ? "Growing together in faith and fellowship"
                : "在信仰和团契中一起成长"}
            </motion.p>
          </div>
        </section>

        {/* Youth Programs - Alternating Sections */}
        {youthPrograms.map((program, index) => (
          <section 
            key={index}
            className={`py-10 sm:py-20 ${index % 2 === 0 ? 'bg-[#fbf8f3]' : 'bg-[#313437]'}`}
          >
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInVariants}
                  transition={{ duration: 0.6 }}
                  className="grid lg:grid-cols-2 gap-0 items-stretch"
                >
                  {/* Image */}
                  <div className={`h-[250px] sm:h-[350px] lg:h-auto ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <img
                      src={program.image}
                      alt={language === "en" ? program.name.en : program.name.zh}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className={`p-6 sm:p-10 lg:p-14 flex flex-col justify-center text-center lg:text-left ${
                    index % 2 === 0 
                      ? 'bg-[#313437]' 
                      : 'bg-[#272727]'
                  } ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#fbf8f3] mb-3 sm:mb-4">
                      {language === "en" ? program.name.en : program.name.zh}
                    </h2>
                    <p className="text-base sm:text-lg text-[#fbf8f3]/70 leading-relaxed mb-4 sm:mb-6">
                      {language === "en" ? program.description.en : program.description.zh}
                    </p>
                    <div className="mx-auto lg:mx-0">
                      <Button className="rounded-none bg-[#fbf8f3] text-[#272727] hover:bg-white">
                        {language === "en" ? "Learn More" : "了解更多"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA - DARK */}
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
                {language === "en" ? "Get Involved" : "参与其中"}
              </h2>
              <p className="text-[#fbf8f3]/70 mb-6 sm:mb-8 text-sm sm:text-base px-2">
                {language === "en"
                  ? "Join us this week and be part of our youth community!"
                  : "本周加入我们，成为我们青年社区的一部分！"}
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
