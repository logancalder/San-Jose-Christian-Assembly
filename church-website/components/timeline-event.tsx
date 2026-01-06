"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"

interface TimelineEventProps {
  year: string
  title: string
  description: string
  image: string
  isLeft: boolean
  index: number
}

export default function TimelineEvent({ year, title, description, image, isLeft, index }: TimelineEventProps) {
  const [isVisible, setIsVisible] = useState(false)
  const eventRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is 20% visible, trigger the animation
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      },
    )

    if (eventRef.current) {
      observer.observe(eventRef.current)
    }

    return () => {
      if (eventRef.current) {
        observer.unobserve(eventRef.current)
      }
    }
  }, [])

  // Calculate delay based on index for staggered animation
  const animationDelay = `${index * 0.1}s`

  return (
    <div
      ref={eventRef}
      className={`mb-24 flex flex-col ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(50px)",
        transition: `opacity 0.6s ease-out ${animationDelay}, transform 0.6s ease-out ${animationDelay}`,
      }}
    >
      {/* Year marker */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center z-20">
        {year}
      </div>

      {/* Content */}
      <div className={`w-full md:w-1/2 p-6 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* Image */}
      <div
        className={`w-full md:w-1/2 mt-4 md:mt-0 border-2 border-black overflow-hidden ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transition: `opacity 0.8s ease-out ${Number(animationDelay.replace("s", "")) + 0.3}s`,
        }}
      >
        <div className="relative h-64 md:h-80">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}

