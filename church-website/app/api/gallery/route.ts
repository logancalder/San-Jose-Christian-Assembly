import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Define the directory where photos are stored
const PHOTOS_DIR = path.join(process.cwd(), "public", "easter_25")

// Function to recursively get all files in a directory
function getAllFiles(dirPath: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dirPath)
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file)
    const stat = fs.statSync(filePath)
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList)
    } else {
      fileList.push(filePath)
    }
  })
  
  return fileList
}

export async function GET() {
  try {
    // Check if the directory exists
    if (!fs.existsSync(PHOTOS_DIR)) {
      // Create the directory if it doesn't exist
      fs.mkdirSync(PHOTOS_DIR, { recursive: true })
      return NextResponse.json([])
    }

    // Get all files recursively
    const allFiles = getAllFiles(PHOTOS_DIR)
    
    // Filter for image files and create photo objects
    const photos = allFiles
      .filter(filePath => {
        const ext = path.extname(filePath).toLowerCase()
        return [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext)
      })
      .map(filePath => {
        // Get the relative path from the PHOTOS_DIR
        const relativePath = path.relative(PHOTOS_DIR, filePath)
        const parts = relativePath.split(path.sep)
        
        // Extract category from subdirectory or use "Uncategorized"
        let category = "Uncategorized"
        let fileName = parts[parts.length - 1]
        
        // If the file is in a subdirectory, use the subdirectory name as the category
        if (parts.length > 1) {
          category = parts[0]
        }
        
        // Generate a simple ID from the filename
        const id = fileName.replace(/\.[^/.]+$/, "")
        
        // Create a URL-friendly path
        const src = `/easter_25/${relativePath.replace(/\\/g, "/")}`
        
        // Use the filename (without extension) as the alt text
        const alt = fileName.replace(/\.[^/.]+$/, "").replace(/-/g, " ")
        
        return {
          id,
          src,
          alt,
          category
        }
      })
    
    return NextResponse.json(photos)
  } catch (error) {
    console.error("Error reading gallery directory:", error)
    return NextResponse.json(
      { error: "Failed to fetch gallery photos" },
      { status: 500 }
    )
  }
} 