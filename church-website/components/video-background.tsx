"use client"

import { useEffect, useRef, useState } from "react"

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.playbackRate = 0.5

      const handleTimeUpdate = () => {
        // Start fade out 0.5 seconds before video ends
        if (video.duration - video.currentTime < 0.5) {
          setIsFading(true)
        }
      }

      const handleEnded = () => {
        // Reset fade and restart video
        video.currentTime = 0
        video.play()
        setTimeout(() => setIsFading(false), 500)
      }

      video.addEventListener('timeupdate', handleTimeUpdate)
      video.addEventListener('ended', handleEnded)

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate)
        video.removeEventListener('ended', handleEnded)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className={`absolute min-w-full min-h-full object-cover transition-opacity duration-500 ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
        // style={{ filter: "grayscale(100%)" }}
      >
        <source
          src="/banner.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

// STAFF PAGE

