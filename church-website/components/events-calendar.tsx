"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { DateTime } from "luxon"

interface EventsCalendarProps {
  language: "en" | "zh"
}

interface Event {
  id: string
  timestamp: string
  name: string
  description: string
  name_cn: string
  description_cn: string
}

export default function EventsCalendar({ language }: EventsCalendarProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch upcoming events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true)
        
        // Get today's date
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        // Fetch events starting from today
        const response = await fetch(`/api/events?start=${today.toISOString().split('T')[0]}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        
        const data = await response.json()
        
        // Sort events by timestamp and take the next 5
        const sortedEvents = data
          .sort((a: Event, b: Event) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
          .slice(0, 3)
        
        setEvents(sortedEvents)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchEvents()
  }, [])

  // Format date from timestamp
  const formatDate = (timestamp: string) => {
    return DateTime.fromISO(timestamp)
      .setZone('America/Los_Angeles')
      .toFormat('EEEE, MMM d')
  }

  // Format time from timestamp
  const formatTime = (timestamp: string) => {
    return DateTime.fromISO(timestamp)
      .setZone('America/Los_Angeles')
      .toFormat('h:mm a')
  }

  return (
    <div className="border-2 border-black bg-white h-full p-6">
      <div className="pb-2">
        <div className="flex items-center gap-2 font-bold text-xl">
          <CalendarIcon className="h-5 w-5" />
          {language === "en" ? "Upcoming Events" : "即将举行的活动"}
        </div>
        <div className="text-muted-foreground text-sm">
          {language === "en" ? "Make sure to check put these on your calendar!" : "请确保将这些活动添加到您的日历中！"}
        </div>
      </div>
      <div className="py-4">
        {isLoading ? (
          <div className="text-center text-muted-foreground">
            {language === "en" ? "Loading events..." : "加载活动中..."}
          </div>
        ) : events.length > 0 ? (
          <ul className="space-y-3">
            {events.map((event) => (
              <li key={event.id} className="border border-black p-3">
                <div className="font-medium">
                  {language === "en" ? event.name : event.name_cn}
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  {formatDate(event.timestamp)}
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTime(event.timestamp)}
                </div>
                <div className="text-xs mt-2 line-clamp-2">
                  {language === "en" ? event.description : event.description_cn}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-muted-foreground">
            {language === "en" ? "No upcoming events scheduled" : "没有安排即将举行的活动"}
          </div>
        )}
      </div>
      <div className="pt-4">
        <Link href="/events">
          {/* <Button variant="outline" className="w-full rounded-none border-2">
            {language === "en" ? "View All Events" : "查看所有活动"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button> */}
        </Link>
      </div>
    </div>
  )
}

