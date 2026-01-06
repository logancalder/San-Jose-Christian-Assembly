"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import MainNav from "@/app/components/main-nav"
import MainFooter from "@/app/components/main-footer"

export default function ValuesPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const coreValues = [
    {
      title: { en: "Faith", zh: "信心" },
      description: {
        en: "We believe in the transformative power of faith in Jesus Christ and the authority of God's Word.",
        zh: "我们相信耶稣基督的信心和上帝话语的权威具有转化力量。"
      },
      details: {
        en: "Our faith in Jesus Christ is the foundation of everything we do. We believe in the power of prayer, the guidance of the Holy Spirit, and the transformative work of God in our lives. Through faith, we find strength, hope, and purpose.",
        zh: "我们对耶稣基督的信心是我们一切事工的基础。我们相信祷告的力量，圣灵的引导，以及上帝在我们生命中的转化工作。通过信心，我们找到力量、盼望和目标。"
      }
    },
    {
      title: { en: "Community", zh: "社区" },
      description: {
        en: "We value authentic relationships and support one another in our spiritual journey.",
        zh: "我们重视真实的关系，并在属灵旅程中相互支持。"
      },
      details: {
        en: "We are a family of believers who care for one another deeply. Through small groups, fellowship events, and regular gatherings, we build meaningful relationships that encourage spiritual growth and provide support in times of need.",
        zh: "我们是一个彼此深切关怀的信徒家庭。通过小组、团契活动和定期聚会，我们建立有意义的关系，促进属灵成长，并在需要时提供支持。"
      }
    },
    {
      title: { en: "Service", zh: "服务" },
      description: {
        en: "We are committed to serving others with humility and love, following Christ's example.",
        zh: "我们致力于以谦卑和爱心服务他人，效法基督的榜样。"
      },
      details: {
        en: "Following Jesus's example of servant leadership, we actively seek opportunities to serve our church family and the broader community. Through various ministries and outreach programs, we demonstrate God's love through practical actions.",
        zh: "效法耶稣仆人式领导的榜样，我们积极寻找机会服务我们的教会家庭和更广泛的社区。通过各种事工和外展计划，我们通过实际行动彰显上帝的爱。"
      }
    },
    {
      title: { en: "Growth", zh: "成长" },
      description: {
        en: "We encourage continuous spiritual growth through study, prayer, and fellowship.",
        zh: "我们鼓励通过学习、祷告和团契不断在属灵上成长。"
      },
      details: {
        en: "We believe that spiritual growth is a lifelong journey. Through Bible studies, discipleship programs, and mentoring relationships, we equip believers to grow deeper in their faith and develop their God-given gifts.",
        zh: "我们相信属灵成长是一生的旅程。通过查经、门徒训练计划和导师关系，我们装备信徒在信仰上更深地成长，并发展上帝所赐的恩赐。"
      }
    },
    {
      title: { en: "Outreach", zh: "外展" },
      description: {
        en: "We reach out to our local community with God's love through various programs and initiatives.",
        zh: "我们通过各种计划和倡议，以上帝的爱接触我们的本地社区。"
      },
      details: {
        en: "Our outreach efforts extend beyond our church walls into the community. We partner with local organizations, provide resources for those in need, and create opportunities for meaningful engagement with our neighbors.",
        zh: "我们的外展工作延伸到教会之外进入社区。我们与本地组织合作，为有需要的人提供资源，并为与邻居有意义的互动创造机会。"
      }
    },
    {
      title: { en: "Biblical Teaching", zh: "圣经教导" },
      description: {
        en: "We are committed to sound biblical teaching that equips believers for life and ministry.",
        zh: "我们致力于健全的圣经教导，装备信徒过生活和事奉。"
      },
      details: {
        en: "We believe in teaching God's Word with accuracy, relevance, and practical application. Our teaching ministry includes Sunday sermons, Bible studies, and educational programs designed to help believers understand and apply biblical truth.",
        zh: "我们相信以准确、相关和实际应用来教导上帝的话语。我们的教导事工包括主日讲道、查经和教育计划，旨在帮助信徒理解并应用圣经真理。"
      }
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
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/easter_25/DSC_0471.jpg"
              alt="Values"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#272727]/70 via-[#272727]/60 to-[#313437]"></div>
          </div>
          <div className="relative z-10 text-center text-[#fbf8f3] px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-bold text-4xl md:text-6xl mb-4"
            >
              {language === "en" ? "OUR VALUES" : "我们的价值观"}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs uppercase tracking-[0.3em] text-[#fbf8f3]/50"
            >
              {language === "en" 
                ? "The foundational principles that guide everything we do"
                : "指导我们所做一切的基础原则"}
            </motion.p>
          </div>
        </section>

        {/* Core Values - Vertical List */}
        <section className="py-20 bg-[#fbf8f3]">
          <div className="container mx-auto px-4">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInVariants}
                transition={{ duration: 0.6 }}
                className={`max-w-4xl mx-auto mb-16 ${index !== coreValues.length - 1 ? 'border-b border-[#272727]/10 pb-16' : ''}`}
              >
                <h2 className="text-3xl font-bold mb-6 text-center text-[#272727]">
                  {language === "en" ? value.title.en : value.title.zh}
                </h2>
                <div className="space-y-6">
                  <p className="text-xl text-[#636363] text-center leading-relaxed">
                    {language === "en" ? value.description.en : value.description.zh}
                  </p>
                  <p className="text-[#636363]/80 text-center leading-relaxed">
                    {language === "en" ? value.details.en : value.details.zh}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Mission Statement - DARK */}
        <section className="py-20 bg-[#313437]">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[#636363] mb-4">
                {language === "en" ? "Our Mission" : "我们的使命"}
              </p>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl italic font-light leading-relaxed text-[#fbf8f3]">
                {language === "en"
                  ? "\"Growing together in faith, hope, and love.\""
                  : "\"在信心、盼望和爱中一起成长。\""}
              </blockquote>
            </motion.div>
          </div>
        </section>
      </main>

      <MainFooter language={language} />
    </div>
  )
}
