"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  CalendarDays, 
  Book, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  AlertCircle,
  Check,
  Pencil,
  Trash2,
  Clock,
  MapPin,
  LogOut,
  Loader2
} from "lucide-react"
import { DateTime } from "luxon"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Types - Updated for new schema
interface DailyBread {
  date: string
  verse_reference_en: string
  verse_reference_zh?: string
  verse_text_en?: string
  verse_text_zh?: string
  created_by?: string
}

interface Event {
  id?: string
  title_en: string
  title_zh?: string
  description_en?: string
  description_zh?: string
  location_en?: string
  location_zh?: string
  start_time: string
  end_time?: string
  is_public: boolean
  created_by?: string
}

interface User {
  id: string
  email: string
  role?: string
}

// Missing field indicator component
function MissingFieldBadge({ show, language }: { show: boolean; language: "en" | "zh" }) {
  if (!show) return null
  return (
    <Badge variant="destructive" className="ml-2 text-xs bg-red-500">
      <AlertCircle className="h-3 w-3 mr-1" />
      {language === "en" ? "Missing" : "缺失"}
    </Badge>
  )
}

// Field completion indicator
function FieldStatus({ hasEnglish, hasChinese }: { hasEnglish: boolean; hasChinese: boolean }) {
  return (
    <div className="flex gap-1">
      <span className={`text-xs px-1.5 py-0.5 rounded ${hasEnglish ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
        EN {hasEnglish ? <Check className="inline h-3 w-3" /> : <AlertCircle className="inline h-3 w-3" />}
      </span>
      <span className={`text-xs px-1.5 py-0.5 rounded ${hasChinese ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
        中 {hasChinese ? <Check className="inline h-3 w-3" /> : <AlertCircle className="inline h-3 w-3" />}
      </span>
    </div>
  )
}

// Login Component
function LoginForm({ onLogin, language }: { onLogin: (user: User, token: string) => void; language: "en" | "zh" }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Check if email ends with @sjca.org
      if (!email.endsWith('@sjca.org')) {
        setError(language === "en" 
          ? "Access denied. Only @sjca.org emails allowed." 
          : "访问被拒绝。只允许 @sjca.org 邮箱。")
        setLoading(false)
        return
      }

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) {
        setError(signInError.message)
        setLoading(false)
      return
    }

      if (data.session) {
        onLogin(
          { id: data.user.id, email: data.user.email! },
          data.session.access_token
        )
      }
    } catch (err) {
      setError(language === "en" ? "An error occurred" : "发生错误")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#272727] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#272727] mb-2">
              {language === "en" ? "Admin Portal" : "管理门户"}
              </h1>
            <p className="text-[#636363] text-sm">
              {language === "en" ? "San Jose Christian Assembly" : "圣何塞基督教会"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-[#272727]">{language === "en" ? "Email" : "电子邮件"}</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@sjca.org"
                className="mt-1 border-[#e5e0d8] focus:border-[#272727]"
                required
              />
              <p className="text-xs text-[#636363] mt-1">
                {language === "en" ? "Only @sjca.org emails allowed" : "仅允许 @sjca.org 邮箱"}
              </p>
            </div>

            <div>
              <Label className="text-[#272727]">{language === "en" ? "Password" : "密码"}</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 border-[#e5e0d8] focus:border-[#272727]"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 text-sm rounded">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#272727] hover:bg-[#313437] text-[#fbf8f3]"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {language === "en" ? "Sign In" : "登录"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {/* Toggle language would go here */}}
              className="text-[#636363] hover:text-[#272727]"
            >
              {language === "en" ? "中文" : "English"}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function AdminPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [currentMonth, setCurrentMonth] = useState(DateTime.now().setZone('America/Los_Angeles'))
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  
  // Daily Bread state
  const [dailyBreads, setDailyBreads] = useState<Record<string, DailyBread>>({})
  const [breadDialogOpen, setBreadDialogOpen] = useState(false)
  const [breadForm, setBreadForm] = useState<DailyBread>({ 
    date: "", 
    verse_reference_en: "", 
    verse_reference_zh: "",
    verse_text_en: "",
    verse_text_zh: ""
  })
  const [verseLookupLoading, setVerseLookupLoading] = useState(false)
  const [verseLookupError, setVerseLookupError] = useState<string | null>(null)
  const verseLookupTimeout = useRef<NodeJS.Timeout | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // All Bible book names for autocomplete
  const bibleBooks = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
    "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
    "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
    "Ezra", "Nehemiah", "Esther", "Job", "Psalm", "Proverbs",
    "Ecclesiastes", "Song Of Solomon", "Isaiah", "Jeremiah",
    "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel",
    "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
    "Zephaniah", "Haggai", "Zechariah", "Malachi",
    "Matthew", "Mark", "Luke", "John", "Acts", "Romans",
    "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
    "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
    "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews",
    "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
    "Jude", "Revelation"
  ]

  // Auto-lookup verse when reference changes
  const lookupVerse = useCallback(async (reference: string) => {
    if (!reference || reference.length < 5) {
      setVerseLookupError(null)
      return
    }

    setVerseLookupLoading(true)
    setVerseLookupError(null)

    try {
      const response = await fetch(`/api/bible/lookup?ref=${encodeURIComponent(reference)}`)
      const data = await response.json()

      if (!response.ok) {
        setVerseLookupError(data.error || 'Failed to lookup verse')
        return
      }

      // Auto-populate the fields
      setBreadForm(prev => ({
        ...prev,
        verse_reference_zh: data.reference_zh || prev.verse_reference_zh,
        verse_text_en: data.text_en || prev.verse_text_en,
        verse_text_zh: data.text_zh || prev.verse_text_zh
      }))
    } catch (error) {
      console.error('Error looking up verse:', error)
      setVerseLookupError('Failed to lookup verse')
    } finally {
      setVerseLookupLoading(false)
    }
  }, [])

  // Filter book suggestions based on input
  const filterSuggestions = useCallback((value: string) => {
    // Only show suggestions if typing a book name (no chapter/verse yet)
    const hasChapterVerse = /\d+[:\d-]*$/.test(value.trim())
    
    if (hasChapterVerse || !value.trim()) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }
    
    const input = value.trim().toLowerCase()
    const filtered = bibleBooks.filter(book => 
      book.toLowerCase().startsWith(input) || 
      book.toLowerCase().includes(input)
    ).slice(0, 8) // Limit to 8 suggestions
    
    setSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
  }, [bibleBooks])

  // Handle selecting a suggestion
  const selectSuggestion = useCallback((book: string) => {
    setBreadForm(prev => ({ ...prev, verse_reference_en: book + " " }))
    setShowSuggestions(false)
    setSuggestions([])
    // Focus back on input
    inputRef.current?.focus()
  }, [])

  // Debounced verse lookup
  const handleVerseReferenceChange = useCallback((value: string) => {
    setBreadForm(prev => ({ ...prev, verse_reference_en: value }))
    
    // Filter suggestions
    filterSuggestions(value)
    
    // Clear previous timeout
    if (verseLookupTimeout.current) {
      clearTimeout(verseLookupTimeout.current)
    }

    // Set new timeout for debounced lookup
    verseLookupTimeout.current = setTimeout(() => {
      lookupVerse(value)
    }, 500)
  }, [lookupVerse, filterSuggestions])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (verseLookupTimeout.current) {
        clearTimeout(verseLookupTimeout.current)
      }
    }
  }, [])
  
  // Events state
  const [events, setEvents] = useState<Event[]>([])
  const [eventDialogOpen, setEventDialogOpen] = useState(false)
  const [eventForm, setEventForm] = useState<Event>({
    title_en: "",
    title_zh: "",
    description_en: "",
    description_zh: "",
    location_en: "",
    location_zh: "",
    start_time: "",
    end_time: "",
    is_public: true
  })
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user?.email?.endsWith('@sjca.org')) {
        setUser({ id: session.user.id, email: session.user.email })
        setAccessToken(session.access_token)
      }
      setAuthLoading(false)
    }
    
    checkSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user?.email?.endsWith('@sjca.org')) {
        setUser({ id: session.user.id, email: session.user.email })
        setAccessToken(session.access_token)
      } else {
        setUser(null)
        setAccessToken(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = (loggedInUser: User, token: string) => {
    setUser(loggedInUser)
    setAccessToken(token)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setAccessToken(null)
  }

  // Generate calendar days for the month
  const generateCalendarDays = useCallback(() => {
    const startOfMonth = currentMonth.startOf('month')
    const endOfMonth = currentMonth.endOf('month')
    const startDay = startOfMonth.weekday % 7
    
    const days: (DateTime | null)[] = []
    
    for (let i = 0; i < startDay; i++) {
      days.push(null)
    }
    
    for (let day = 1; day <= endOfMonth.day; day++) {
      days.push(currentMonth.set({ day }))
    }
    
    return days
  }, [currentMonth])

  // Fetch daily breads for the month
  const fetchDailyBreads = useCallback(async () => {
    if (!accessToken) return
    
    const startOfMonth = currentMonth.startOf('month').toFormat('yyyy-MM-dd')
    const endOfMonth = currentMonth.endOf('month').toFormat('yyyy-MM-dd')
    
    try {
      const { data, error } = await supabase
        .from('daily_bread')
        .select('*')
        .gte('date', startOfMonth)
        .lte('date', endOfMonth)
      
      if (error) throw error
      
      const breadMap: Record<string, DailyBread> = {}
      data?.forEach(bread => {
        breadMap[bread.date] = bread
      })
      setDailyBreads(breadMap)
    } catch (error) {
      console.error('Error fetching daily breads:', error)
    }
  }, [currentMonth, accessToken])

  // Fetch events for the month
  const fetchEvents = useCallback(async () => {
    if (!accessToken) return
    
    const startOfMonth = currentMonth.startOf('month').toISO()
    const endOfMonth = currentMonth.endOf('month').toISO()
    
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('start_time', startOfMonth)
        .lte('start_time', endOfMonth)
        .order('start_time', { ascending: true })
      
      if (error) throw error
      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }, [currentMonth, accessToken])

  useEffect(() => {
    if (user && accessToken) {
      fetchDailyBreads()
      fetchEvents()
    }
  }, [fetchDailyBreads, fetchEvents, user, accessToken])

  // Handle Daily Bread operations
  const handleDayClick = (date: DateTime | null, tab: string) => {
    if (!date) return
    const dateStr = date.toFormat('yyyy-MM-dd')
    
    if (tab === 'daily-bread') {
      const existingBread = dailyBreads[dateStr]
      setBreadForm(existingBread || { 
        date: dateStr, 
        verse_reference_en: "", 
        verse_reference_zh: "",
        verse_text_en: "",
        verse_text_zh: ""
      })
      setVerseLookupError(null)
      setVerseLookupLoading(false)
      setSuggestions([])
      setShowSuggestions(false)
      setBreadDialogOpen(true)
    } else if (tab === 'events') {
      setEventForm({
        title_en: "",
        title_zh: "",
        description_en: "",
        description_zh: "",
        location_en: "",
        location_zh: "",
        start_time: date.toFormat("yyyy-MM-dd'T'HH:mm"),
        end_time: "",
        is_public: true
      })
      setEditingEvent(null)
      setEventDialogOpen(true)
    }
  }

  const saveDailyBread = async () => {
    if (!accessToken) return
    
    try {
      const response = await fetch('/api/daily-bread', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(breadForm)
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }
      
      setBreadDialogOpen(false)
      fetchDailyBreads()
    } catch (error) {
      console.error('Error saving daily bread:', error)
    }
  }

  const deleteDailyBread = async () => {
    if (!accessToken || !breadForm.date) return
    
    try {
      const response = await fetch(`/api/daily-bread?date=${breadForm.date}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      
      if (!response.ok) throw new Error('Failed to delete')
      
      setBreadDialogOpen(false)
      fetchDailyBreads()
    } catch (error) {
      console.error('Error deleting daily bread:', error)
    }
  }

  // Handle Event operations
  const saveEvent = async () => {
    if (!accessToken) return
    
    try {
      const method = editingEvent?.id ? 'PUT' : 'POST'
      
      // Convert datetime-local values to Los Angeles timezone ISO strings
      const startTimeLA = DateTime.fromFormat(eventForm.start_time, "yyyy-MM-dd'T'HH:mm", { zone: 'America/Los_Angeles' })
      const endTimeLA = eventForm.end_time 
        ? DateTime.fromFormat(eventForm.end_time, "yyyy-MM-dd'T'HH:mm", { zone: 'America/Los_Angeles' })
        : null
      
      const eventData = {
        ...eventForm,
        start_time: startTimeLA.toISO(),
        end_time: endTimeLA ? endTimeLA.toISO() : null,
      }
      
      const body = editingEvent?.id 
        ? { ...eventData, id: editingEvent.id }
        : eventData
      
      const response = await fetch('/api/events', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }
      
      setEventDialogOpen(false)
      setEditingEvent(null)
      fetchEvents()
    } catch (error) {
      console.error('Error saving event:', error)
    }
  }

  const deleteEvent = async (id: string) => {
    if (!accessToken) return
    
    try {
      const response = await fetch(`/api/events?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      
      if (!response.ok) throw new Error('Failed to delete')
      fetchEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  const editEvent = (event: Event) => {
    setEventForm({
      ...event,
      start_time: DateTime.fromISO(event.start_time).toFormat("yyyy-MM-dd'T'HH:mm"),
      end_time: event.end_time ? DateTime.fromISO(event.end_time).toFormat("yyyy-MM-dd'T'HH:mm") : ""
    })
    setEditingEvent(event)
    setEventDialogOpen(true)
  }

  // Get events for a specific date
  const getEventsForDate = (date: DateTime) => {
    const dateStr = date.toFormat('yyyy-MM-dd')
    return events.filter(event => {
      const eventDate = DateTime.fromISO(event.start_time).toFormat('yyyy-MM-dd')
      return eventDate === dateStr
    })
  }

  const calendarDays = generateCalendarDays()
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#272727] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#fbf8f3]" />
      </div>
    )
  }

  // Show login if not authenticated
  if (!user) {
    return <LoginForm onLogin={handleLogin} language={language} />
  }

  return (
    <div className="min-h-screen bg-[#fbf8f3]">
      {/* Header */}
      <header className="bg-[#272727] text-[#fbf8f3] py-4 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="SJCA Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto hover:opacity-80 transition-opacity"
                />
              </Link>
              <div>
                <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  SJCA
                  <span className="text-[#636363] font-normal">|</span>
                  <span className="font-normal text-[#fbf8f3]/80">
                    {language === "en" ? "Admin" : "管理"}
                  </span>
                </h1>
                <p className="text-[#636363] text-xs mt-0.5">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "zh" : "en")}
                className="bg-transparent border-[#636363] text-[#fbf8f3] hover:bg-[#313437] hover:text-[#fbf8f3]"
              >
                {language === "en" ? "中文" : "English"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="bg-transparent border-[#636363] text-[#fbf8f3] hover:bg-[#313437] hover:text-[#fbf8f3]"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {language === "en" ? "Sign Out" : "登出"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Tabs defaultValue="daily-bread" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 bg-[#313437]">
              <TabsTrigger value="daily-bread" className="flex items-center gap-2 text-[#fbf8f3]/50 data-[state=active]:bg-[#272727] data-[state=active]:text-[#fbf8f3]">
                <Book className="h-4 w-4" />
                  {language === "en" ? "Daily Bread" : "每日灵粮"}
                </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2 text-[#fbf8f3]/50 data-[state=active]:bg-[#272727] data-[state=active]:text-[#fbf8f3]">
                <CalendarDays className="h-4 w-4" />
                  {language === "en" ? "Events" : "活动"}
                </TabsTrigger>
              </TabsList>

            {/* Daily Bread Tab */}
            <TabsContent value="daily-bread">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
                {/* Calendar Section */}
                <div className="bg-white border-2 border-[#272727] p-5">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentMonth(currentMonth.minus({ months: 1 }))}
                      className="hover:bg-[#fbf8f3] h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-lg font-semibold text-[#272727]">
                      {currentMonth.toFormat('MMMM yyyy')}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentMonth(currentMonth.plus({ months: 1 }))}
                      className="hover:bg-[#fbf8f3] h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Legend */}
                  <div className="flex gap-4 mb-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                      <span className="text-[#636363]">{language === "en" ? "Complete" : "完整"}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-amber-400 rounded-full"></div>
                      <span className="text-[#636363]">{language === "en" ? "Missing translation" : "缺少翻译"}</span>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {weekDays.map(day => (
                      <div key={day} className="text-center text-xs font-medium text-[#636363] py-1">
                        {day}
                      </div>
                    ))}
                    
                    {calendarDays.map((day, index) => {
                      if (!day) {
                        return <div key={`empty-${index}`} className="h-9"></div>
                      }
                      
                      const dateStr = day.toFormat('yyyy-MM-dd')
                      const bread = dailyBreads[dateStr]
                      const isToday = day.toFormat('yyyy-MM-dd') === DateTime.now().setZone('America/Los_Angeles').toFormat('yyyy-MM-dd')
                      const hasVerse = bread?.verse_reference_en
                      const hasTranslation = bread?.verse_reference_zh
                      
                      let statusColor = 'bg-[#fbf8f3] hover:bg-[#f0ebe3] border-[#e5e0d8]'
                      let dotColor = ''
                      
                      if (hasVerse && hasTranslation) {
                        statusColor = 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200'
                        dotColor = 'bg-emerald-500'
                      } else if (hasVerse && !hasTranslation) {
                        statusColor = 'bg-amber-50 hover:bg-amber-100 border-amber-200'
                        dotColor = 'bg-amber-400'
                      }
                      
                      return (
                        <button
                          key={dateStr}
                          onClick={() => handleDayClick(day, 'daily-bread')}
                          className={`h-9 border transition-colors ${statusColor} ${isToday ? 'ring-2 ring-[#272727]' : ''}`}
                        >
                          <div className="flex flex-col items-center justify-center h-full">
                            <span className={`text-xs text-[#272727] ${isToday ? 'font-bold' : ''}`}>
                              {day.day}
                            </span>
                            {dotColor && (
                              <div className={`w-1 h-1 rounded-full mt-0.5 ${dotColor}`}></div>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* This Month's Verses List */}
                <div className="bg-white border-2 border-[#272727] p-5">
                  <h3 className="font-semibold mb-3 text-[#272727] text-sm">
                    {language === "en" ? "This Month's Verses" : "本月经文"}
                  </h3>
                  <div className="space-y-2 max-h-[340px] overflow-y-auto">
                    {Object.entries(dailyBreads)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([date, bread]) => (
                        <div 
                          key={date}
                          className="flex items-center justify-between p-2.5 bg-[#fbf8f3] border border-[#e5e0d8] cursor-pointer hover:border-[#272727]"
                          onClick={() => {
                            setBreadForm(bread)
                            setBreadDialogOpen(true)
                          }}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-[#272727] text-sm">{DateTime.fromISO(date).toFormat('MMM d')}</span>
                              <FieldStatus hasEnglish={!!bread.verse_reference_en} hasChinese={!!bread.verse_reference_zh} />
                            </div>
                            <p className="text-xs text-[#636363] truncate mt-0.5">{bread.verse_reference_en}</p>
                          </div>
                          <Pencil className="h-3.5 w-3.5 text-[#636363] flex-shrink-0 ml-2" />
                        </div>
                      ))}
                    {Object.keys(dailyBreads).length === 0 && (
                      <p className="text-[#636363] text-center py-4 text-sm">
                        {language === "en" ? "No verses set for this month" : "本月未设置经文"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              </TabsContent>

            {/* Events Tab */}
              <TabsContent value="events">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-6">
                {/* Calendar Section */}
                <div className="bg-white border-2 border-[#272727] p-5">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentMonth(currentMonth.minus({ months: 1 }))}
                      className="hover:bg-[#fbf8f3] h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-lg font-semibold text-[#272727]">
                      {currentMonth.toFormat('MMMM yyyy')}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentMonth(currentMonth.plus({ months: 1 }))}
                      className="hover:bg-[#fbf8f3] h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Add Event Button */}
                  <div className="mb-3">
                    <Button
                      onClick={() => {
                        setEventForm({
                          title_en: "",
                          title_zh: "",
                          description_en: "",
                          description_zh: "",
                          location_en: "",
                          location_zh: "",
                          start_time: DateTime.now().setZone('America/Los_Angeles').toFormat("yyyy-MM-dd'T'HH:mm"),
                          end_time: "",
                          is_public: true
                        })
                        setEditingEvent(null)
                        setEventDialogOpen(true)
                      }}
                      size="sm"
                      className="bg-[#272727] hover:bg-[#313437] text-[#fbf8f3]"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1.5" />
                      {language === "en" ? "Add Event" : "添加活动"}
                    </Button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {weekDays.map(day => (
                      <div key={day} className="text-center text-xs font-medium text-[#636363] py-1">
                        {day}
                      </div>
                    ))}
                    
                    {calendarDays.map((day, index) => {
                      if (!day) {
                        return <div key={`empty-${index}`} className="h-9"></div>
                      }
                      
                      const dateStr = day.toFormat('yyyy-MM-dd')
                      const dayEvents = getEventsForDate(day)
                      const isToday = day.toFormat('yyyy-MM-dd') === DateTime.now().setZone('America/Los_Angeles').toFormat('yyyy-MM-dd')
                      const hasEvents = dayEvents.length > 0
                      
                      return (
                        <button
                          key={dateStr}
                          onClick={() => handleDayClick(day, 'events')}
                          className={`h-9 border transition-colors ${
                            hasEvents ? 'bg-blue-50 hover:bg-blue-100 border-blue-200' : 'bg-[#fbf8f3] hover:bg-[#f0ebe3] border-[#e5e0d8]'
                          } ${isToday ? 'ring-2 ring-[#272727]' : ''}`}
                        >
                          <div className="flex flex-col items-center justify-center h-full">
                            <span className={`text-xs text-[#272727] ${isToday ? 'font-bold' : ''}`}>
                              {day.day}
                            </span>
                            {hasEvents && (
                              <div className="flex gap-0.5 mt-0.5">
                                {dayEvents.slice(0, 3).map((_, i) => (
                                  <div key={i} className="w-1 h-1 rounded-full bg-blue-500"></div>
                                ))}
                              </div>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Events List */}
                <div className="bg-white border-2 border-[#272727] p-5">
                  <h3 className="font-semibold mb-3 text-[#272727] text-sm">
                    {language === "en" ? "This Month's Events" : "本月活动"}
                  </h3>
                  <div className="space-y-2 max-h-[340px] overflow-y-auto">
                    {events.map(event => {
                      const eventDate = DateTime.fromISO(event.start_time)
                      return (
                        <div 
                          key={event.id}
                          className="p-3 bg-[#fbf8f3] border border-[#e5e0d8] hover:border-[#272727] cursor-pointer"
                          onClick={() => editEvent(event)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-[#272727] text-sm truncate">
                                  {language === "en" ? event.title_en : event.title_zh || event.title_en}
                                </span>
                                {!event.is_public && (
                                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                    {language === "en" ? "Private" : "私密"}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-[#636363]">
                                <span className="flex items-center gap-1">
                                  <CalendarDays className="h-3 w-3" />
                                  {eventDate.toFormat('MMM d')}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {eventDate.toFormat('h:mm a')}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-0.5 flex-shrink-0">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => { e.stopPropagation(); editEvent(event); }}
                                className="h-7 w-7 hover:bg-[#e5e0d8]"
                              >
                                <Pencil className="h-3.5 w-3.5 text-[#636363]" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => { e.stopPropagation(); event.id && deleteEvent(event.id); }}
                                className="h-7 w-7 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    {events.length === 0 && (
                      <p className="text-[#636363] text-center py-4 text-sm">
                        {language === "en" ? "No events this month" : "本月无活动"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              </TabsContent>
            </Tabs>
          </motion.div>
      </main>

      {/* Daily Bread Dialog */}
      <Dialog open={breadDialogOpen} onOpenChange={setBreadDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#272727]">
              <Book className="h-5 w-5" />
              {language === "en" ? "Daily Bread" : "每日灵粮"} - {breadForm.date && DateTime.fromISO(breadForm.date).toFormat('MMMM d, yyyy')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* English Verse Reference - THE ONLY FIELD TO TYPE IN */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-[#272727]">
                <span className="bg-[#272727] text-[#fbf8f3] px-2 py-0.5 text-xs font-medium">EN</span>
                {language === "en" ? "Bible Verse Reference" : "圣经经文引用"}
                <MissingFieldBadge show={!breadForm.verse_reference_en} language={language} />
                {verseLookupLoading && (
                  <Loader2 className="h-3 w-3 animate-spin text-[#636363]" />
                )}
              </Label>
              <div className="relative">
                <Input
                  ref={inputRef}
                  placeholder="e.g., John 3:16 or Psalm 23:1-6"
                  value={breadForm.verse_reference_en}
                  onChange={(e) => handleVerseReferenceChange(e.target.value)}
                  onFocus={() => filterSuggestions(breadForm.verse_reference_en)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  onKeyDown={(e) => {
                    if (e.key === 'Tab' && showSuggestions && suggestions.length > 0) {
                      e.preventDefault()
                      selectSuggestion(suggestions[0])
                    }
                  }}
                  className="border-[#272727] focus:border-[#272727] font-medium"
                  autoComplete="off"
                />
                {/* Autocomplete suggestions dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[#272727] shadow-lg max-h-48 overflow-y-auto">
                    {suggestions.map((book, index) => (
                      <button
                        key={book}
                        type="button"
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-[#fbf8f3] ${
                          index === 0 ? 'bg-[#fbf8f3]' : ''
                        }`}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          selectSuggestion(book)
                        }}
                      >
                        <span className="font-medium text-[#272727]">{book}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {verseLookupError && (
                <p className="text-xs text-red-500">{verseLookupError}</p>
              )}
              <p className="text-xs text-[#636363]">
                {language === "en" 
                  ? "Start typing a book name for suggestions, then add chapter:verse"
                  : "开始输入书名获取建议，然后添加章节:节"}
              </p>
            </div>

            {/* Auto-populated fields */}
            <div className="bg-[#fbf8f3] p-4 space-y-4 border border-[#e5e0d8]">
              <p className="text-xs uppercase tracking-wider text-[#636363] font-medium">
                {language === "en" ? "Auto-Generated Preview" : "自动生成预览"}
              </p>

              {/* Chinese Verse Reference - Auto-populated */}
              <div className="space-y-1">
                <Label className="flex items-center gap-2 text-[#636363] text-xs">
                  <span className="bg-[#e5e0d8] px-1.5 py-0.5 text-[10px] font-medium">中</span>
                  {language === "en" ? "Chinese Reference" : "中文引用"}
                </Label>
                <div className="text-sm text-[#272727] bg-white px-3 py-2 border border-[#e5e0d8] min-h-[38px]">
                  {breadForm.verse_reference_zh || (
                    <span className="text-[#636363] italic">
                      {language === "en" ? "Will auto-populate..." : "将自动填充..."}
                    </span>
                  )}
                </div>
              </div>

              {/* Verse Text - English - Auto-populated */}
              <div className="space-y-1">
                <Label className="flex items-center gap-2 text-[#636363] text-xs">
                  <span className="bg-[#e5e0d8] px-1.5 py-0.5 text-[10px] font-medium">EN</span>
                  {language === "en" ? "English Content (NKJV)" : "英文内容 (NKJV)"}
                </Label>
                <div className="text-sm text-[#272727] bg-white px-3 py-2 border border-[#e5e0d8] min-h-[60px] max-h-[120px] overflow-y-auto">
                  {breadForm.verse_text_en || (
                    <span className="text-[#636363] italic">
                      {language === "en" ? "Will auto-populate..." : "将自动填充..."}
                    </span>
                  )}
                </div>
              </div>

              {/* Verse Text - Chinese - Auto-populated */}
              <div className="space-y-1">
                <Label className="flex items-center gap-2 text-[#636363] text-xs">
                  <span className="bg-[#e5e0d8] px-1.5 py-0.5 text-[10px] font-medium">中</span>
                  {language === "en" ? "Chinese Content (CUV)" : "中文内容 (和合本)"}
                </Label>
                <div className="text-sm text-[#272727] bg-white px-3 py-2 border border-[#e5e0d8] min-h-[60px] max-h-[120px] overflow-y-auto">
                  {breadForm.verse_text_zh || (
                    <span className="text-[#636363] italic">
                      {language === "en" ? "Will auto-populate..." : "将自动填充..."}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-between">
            <div>
              {dailyBreads[breadForm.date] && (
                <Button
                  variant="destructive"
                  onClick={deleteDailyBread}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {language === "en" ? "Delete" : "删除"}
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setBreadDialogOpen(false)} className="border-[#e5e0d8]">
                {language === "en" ? "Cancel" : "取消"}
              </Button>
              <Button onClick={saveDailyBread} disabled={!breadForm.verse_reference_en} className="bg-[#272727] hover:bg-[#313437] text-[#fbf8f3]">
                {language === "en" ? "Save" : "保存"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event Dialog */}
      <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
        <DialogContent className="max-w-2xl bg-white flex flex-col max-h-[90vh]" onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2 text-[#272727]">
              <CalendarDays className="h-5 w-5" />
              {editingEvent 
                ? (language === "en" ? "Edit Event" : "编辑活动")
                : (language === "en" ? "Add New Event" : "添加新活动")}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto space-y-6 py-4 pr-2">
            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#272727]">
                  {language === "en" ? "Start Time" : "开始时间"}
                </Label>
                <Input
                  type="datetime-local"
                  value={eventForm.start_time}
                  onChange={(e) => setEventForm({ ...eventForm, start_time: e.target.value })}
                  className="border-[#e5e0d8] focus:border-[#272727]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#272727]">
                  {language === "en" ? "End Time (Optional)" : "结束时间（可选）"}
                </Label>
                <Input
                  type="datetime-local"
                  value={eventForm.end_time || ""}
                  onChange={(e) => setEventForm({ ...eventForm, end_time: e.target.value })}
                  className="border-[#e5e0d8] focus:border-[#272727]"
                />
              </div>
            </div>

            {/* Public/Private Toggle */}
            <div className="flex items-center justify-between p-3 bg-[#fbf8f3] border border-[#e5e0d8]">
              <div>
                <Label className="text-[#272727]">
                  {language === "en" ? "Public Event" : "公开活动"}
                </Label>
                <p className="text-xs text-[#636363]">
                  {language === "en" ? "Visible to website visitors" : "对网站访问者可见"}
                </p>
              </div>
              <Switch
                checked={eventForm.is_public}
                onCheckedChange={(checked) => setEventForm({ ...eventForm, is_public: checked })}
              />
            </div>

            {/* Event Name - English & Chinese side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-[#272727]">
                  <span className="bg-[#fbf8f3] px-2 py-0.5 text-xs font-medium border border-[#e5e0d8]">EN</span>
                  {language === "en" ? "Event Title" : "活动标题"}
                  <MissingFieldBadge show={!eventForm.title_en} language={language} />
                </Label>
                <Input
                  placeholder="Event title in English"
                  value={eventForm.title_en}
                  onChange={(e) => setEventForm({ ...eventForm, title_en: e.target.value })}
                  className="border-[#e5e0d8] focus:border-[#272727]"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-[#272727]">
                  <span className="bg-[#fbf8f3] px-2 py-0.5 text-xs font-medium border border-[#e5e0d8]">中</span>
                  {language === "en" ? "Event Title (Chinese)" : "活动标题（中文）"}
                </Label>
                <Input
                  placeholder="活动标题（中文）"
                  value={eventForm.title_zh || ""}
                  onChange={(e) => setEventForm({ ...eventForm, title_zh: e.target.value })}
                  className="border-[#e5e0d8] focus:border-[#272727]"
                />
              </div>
            </div>

            {/* Description - English & Chinese */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-[#272727]">
                  <span className="bg-[#fbf8f3] px-2 py-0.5 text-xs font-medium border border-[#e5e0d8]">EN</span>
                  {language === "en" ? "Description" : "描述"}
                </Label>
                <Textarea
                  placeholder="Event description in English"
                  value={eventForm.description_en || ""}
                  onChange={(e) => setEventForm({ ...eventForm, description_en: e.target.value })}
                  rows={3}
                  className="border-[#e5e0d8] focus:border-[#272727]"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-[#272727]">
                  <span className="bg-[#fbf8f3] px-2 py-0.5 text-xs font-medium border border-[#e5e0d8]">中</span>
                  {language === "en" ? "Description (Chinese)" : "描述（中文）"}
                </Label>
                <Textarea
                  placeholder="活动描述（中文）"
                  value={eventForm.description_zh || ""}
                  onChange={(e) => setEventForm({ ...eventForm, description_zh: e.target.value })}
                  rows={3}
                  className="border-[#e5e0d8] focus:border-[#272727]"
                />
              </div>
            </div>

            {/* Location - English & Chinese */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-[#272727]">
                  <span className="bg-[#fbf8f3] px-2 py-0.5 text-xs font-medium border border-[#e5e0d8]">EN</span>
                  {language === "en" ? "Location (Optional)" : "地点（可选）"}
                </Label>
                <Input
                  placeholder="Event location"
                  value={eventForm.location_en || ""}
                  onChange={(e) => setEventForm({ ...eventForm, location_en: e.target.value })}
                  className="border-[#e5e0d8] focus:border-[#272727]"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-[#272727]">
                  <span className="bg-[#fbf8f3] px-2 py-0.5 text-xs font-medium border border-[#e5e0d8]">中</span>
                  {language === "en" ? "Location (Chinese)" : "地点（中文）"}
                </Label>
                <Input
                  placeholder="活动地点（中文）"
                  value={eventForm.location_zh || ""}
                  onChange={(e) => setEventForm({ ...eventForm, location_zh: e.target.value })}
                  className="border-[#e5e0d8] focus:border-[#272727]"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="flex-shrink-0 pt-4 border-t border-[#e5e0d8]">
            <Button variant="outline" onClick={() => setEventDialogOpen(false)} className="border-[#e5e0d8]">
              {language === "en" ? "Cancel" : "取消"}
            </Button>
            <Button onClick={saveEvent} disabled={!eventForm.title_en || !eventForm.start_time} className="bg-[#272727] hover:bg-[#313437] text-[#fbf8f3]">
              {language === "en" ? "Save Event" : "保存活动"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
