"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MainNav from "@/app/components/main-nav"
import { motion } from "framer-motion"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [isAdmin, setIsAdmin] = useState(false) // Temporary toggle for demo purposes
  const { toast } = useToast()
  
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "zh" : "en"
    setLanguage(newLanguage)
    
    // Show toast notification
    toast({
      title: newLanguage === "en" ? "Language Changed" : "语言已更改",
      description: newLanguage === "en" ? "Switched to English" : "已切换至中文",
      duration: 2000,
    })
  }

  // Mock user data - in a real app, this would come from your authentication system
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "2024-01-15",
    role: isAdmin ? "Admin" : "Member",
    avatarUrl: "/avatar-placeholder.png"
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav 
        language={language} 
        toggleLanguage={toggleLanguage}
        currentPage="profile"
      />

      <main className="flex-1 pt-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            className="bg-white p-8 rounded-lg border-2 border-black"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-6 mb-8">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userData.avatarUrl} />
                <AvatarFallback>
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{userData.name}</h1>
                <p className="text-muted-foreground">{userData.email}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <label className="font-medium">
                  {language === "en" ? "Role" : "角色"}
                </label>
                <p>{userData.role}</p>
              </div>
              <div>
                <label className="font-medium">
                  {language === "en" ? "Member Since" : "加入日期"}
                </label>
                <p>{new Date(userData.joinDate).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Temporary admin toggle for demo */}
            {isAdmin && (
            <div className="mb-8">
              <Link href="/admin">
              <Button 
                variant="outline" 
                className="w-full"
              >
                
              </Button></Link>
            </div>
            )}

            {isAdmin && (
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4">
                  {language === "en" ? "Admin Controls" : "管理员控制"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/admin/verses">
                    <Button className="w-full" size="lg">
                      {language === "en" ? "Configure Weekly Verses" : "配置每周经文"}
                    </Button>
                  </Link>
                  <Link href="/admin/events">
                    <Button className="w-full" size="lg">
                      {language === "en" ? "Manage Events" : "管理活动"}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
} 