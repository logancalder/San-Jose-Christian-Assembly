"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import MainNav from "@/components/main-nav"
import MainFooter from "@/components/main-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react"

interface Photo {
  id: string
  src: string
  alt: string
  category: string
}

export default function GalleryPage() {
  const [language, setLanguage] = useState<"en" | "zh">("en")
  const [photos, setPhotos] = useState<Photo[]>([])
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>([])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!selectedPhoto) return
    
    const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedPhoto.id)
    
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      if (currentIndex < filteredPhotos.length - 1) {
        setSelectedPhoto(filteredPhotos[currentIndex + 1])
      }
    }
    
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      if (currentIndex > 0) {
        setSelectedPhoto(filteredPhotos[currentIndex - 1])
      }
    }
    
    if (e.key === "Escape") {
      setSelectedPhoto(null)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedPhoto, filteredPhotos])

  useEffect(() => {
    // Fetch photos from the API
    const fetchPhotos = async () => {
      try {
        const response = await fetch("/api/gallery")
        const data = await response.json()
        setPhotos(data)
        setFilteredPhotos(data)
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map((photo: Photo) => photo.category))
        ) as string[]
        setCategories(uniqueCategories)
      } catch (error) {
        console.error("Error fetching photos:", error)
      }
    }

    fetchPhotos()
  }, [])

  useEffect(() => {
    // Filter photos based on search term and category
    let filtered = photos

    if (searchTerm) {
      filtered = filtered.filter(
        (photo) =>
          photo.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          photo.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((photo) => photo.category === selectedCategory)
    }

    setFilteredPhotos(filtered)
  }, [searchTerm, selectedCategory, photos])

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav language={language} toggleLanguage={toggleLanguage} currentPage="Gallery" />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {language === "en" ? "Photo Gallery" : "照片库"}
            </h1>
            <p className="text-gray-600">
              {language === "en" 
                ? "Browse through our collection of church photos"
                : "浏览我们的教会照片集"}
            </p>
          </div>

          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={language === "en" ? "Search photos..." : "搜索照片..."}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                >
                  {language === "en" ? "All" : "全部"}
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {filteredPhotos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {language === "en" 
                  ? "No photos found matching your criteria."
                  : "没有找到符合您条件的照片。"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-end">
                    <div className="p-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <p className="font-medium">{photo.alt}</p>
                      <p className="text-sm">{photo.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="flex items-center justify-center w-full gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-300 z-10 h-12 w-12"
              onClick={(e) => {
                e.stopPropagation()
                const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedPhoto.id)
                if (currentIndex > 0) {
                  setSelectedPhoto(filteredPhotos[currentIndex - 1])
                }
              }}
              disabled={filteredPhotos.findIndex(photo => photo.id === selectedPhoto.id) === 0}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="relative max-w-7xl w-auto h-auto max-h-[90vh] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-gray-300 z-10 h-12 w-12"
              onClick={(e) => {
                e.stopPropagation()
                const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedPhoto.id)
                if (currentIndex < filteredPhotos.length - 1) {
                  setSelectedPhoto(filteredPhotos[currentIndex + 1])
                }
              }}
              disabled={filteredPhotos.findIndex(photo => photo.id === selectedPhoto.id) === filteredPhotos.length - 1}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={() => setSelectedPhoto(null)}
          >
            <X className="h-8 w-8" />
          </Button>
        </div>
      )}

      <MainFooter language={language} />
    </div>
  )
} 