"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxHeroProps {
  type: "image" | "video"
  src: string
  height?: string
  children: React.ReactNode
  overlayOpacity?: number
  initialOffset?: number
}

export default function ParallaxHero({
  type,
  src,
  height = "h-[55vh]",
  children,
  overlayOpacity = 50,
  initialOffset = 0
}: ParallaxHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [`${initialOffset}%`, `${initialOffset + 30}%`])

  return (
    <section ref={heroRef} className={`relative ${height} bg-black text-white overflow-hidden`}>
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        {type === "image" ? (
          <img
            src={src}
            alt="Hero background"
            className={`w-full h-[${initialOffset + 100}%] object-cover object-center`}
          />
        ) : (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[130%] object-cover object-center"
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
        <div className={`absolute inset-0 h-[130%] bg-black/${overlayOpacity}`}></div>
      </motion.div>
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </section>
  )
} 