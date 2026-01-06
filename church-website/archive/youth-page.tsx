"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ParallaxHero from "@/components/parallax-hero"

export default function YouthPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav 
        language={language} 
        toggleLanguage={toggleLanguage}
      />

      <main className="flex-1 pt-14">
        {/* Hero Section */}
        <ParallaxHero
          type="image"
          src="/easter_25/DSC_0792.jpg"
          initialOffset={-30}
        >
          <h1 className="font-bold text-4xl md:text-6xl mb-4">
                  {language === "en" ? "YOUTH MINISTRY" : "青年事工"}
                </h1>
                <p className="text-xl max-w-2xl mx-auto">
                  {language === "en" 
                    ? "Growing together in faith and fellowship"
                    : "在信仰和团契中一起成长"}
                </p>
        </ParallaxHero>

        {/* KFC - Kids for Christ (Right Image) */}
        <section className="py-16">
          <div className="container mx-auto px-4 pt-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              // variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  {language === "en" ? "Kids for Christ (K-2)" : "儿童事工 (K-5)"}
                </h2>
                <p className="text-lg mb-6">
                  {language === "en"
                    ? "A fun and engaging environment where children learn about God's love through Bible stories, crafts, and activities."
                    : "通过圣经故事、手工艺和活动，让儿童在有趣的环境中学习上帝的爱。"}
                </p>
                <Button className="rounded-none">
                  {language === "en" ? "Learn More" : "了解更多"}
                </Button>
              </div>
              <div className="aspect-4/3">
                <img
                  src="/easter_25/!bubbles.jpg"
                  alt="Kids for Christ"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mustard Seed (Left Image) */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="md:order-2">
                <h2 className="text-3xl font-bold mb-6">
                  {language === "en" ? "Mustard Seed (3-8)" : "芥菜种 (6-8)"}
                </h2>
                <p className="text-lg mb-6">
                  {language === "en"
                    ? "Middle school ministry focused on building strong foundations in faith during these crucial years of growth."
                    : "专注于在这个关键成长期建立坚实信仰基础的初中事工。"}
                </p>
                <Button className="rounded-none">
                  {language === "en" ? "Learn More" : "了解更多"}
                </Button>
              </div>
              <div className="aspect-4/3 md:order-1">
                <img
                  src="/mustard-seed.jpg"
                  alt="Mustard Seed"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SALT (Right Image) */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  {language === "en" ? "SALT (9-12)" : "盐 (9-12)"}
                </h2>
                <p className="text-lg mb-6">
                  {language === "en"
                    ? "High school ministry empowering teens to be the salt of the earth through discipleship and leadership development."
                    : "通过门徒训练和领导力发展，使青少年成为世上的盐的高中事工。"}
                </p>
                <Button className="rounded-none">
                  {language === "en" ? "Learn More" : "了解更多"}
                </Button>
              </div>
              <div className="aspect-4/3">
                <img
                  src=""
                  alt="SALT Ministry"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* College/Young Adult (Left Image) */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="md:order-2">
                <h2 className="text-3xl font-bold mb-6">
                  {language === "en" ? "College & Young Adult" : "大学生和青年"}
                </h2>
                <p className="text-lg mb-6">
                  {language === "en"
                    ? "A vibrant community for college students and young professionals to grow in their faith and build lasting relationships."
                    : "为大学生和年轻专业人士提供充满活力的社区，在信仰中成长并建立持久的关系。"}
                </p>
                <Button className="rounded-none">
                  {language === "en" ? "Learn More" : "了解更多"}
                </Button>
              </div>
              <div className="aspect-4/3 md:order-1">
                <img
                  src="/!cottoncandygroup.jpg"
                  alt="College Ministry"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Get Involved CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6">
                {language === "en" ? "Get Involved" : "参与其中"}
              </h2>
              <p className="text-lg mb-8">
                {language === "en"
                  ? "Join us this week and be part of our youth community!"
                  : "本周加入我们，成为我们青年社区的一部分！"}
              </p>
              <Link href="/connect">
                <Button size="lg" className="rounded-none">
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