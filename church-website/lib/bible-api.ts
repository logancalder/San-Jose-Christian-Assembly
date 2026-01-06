const API_KEY = process.env.NEXT_PUBLIC_BIBLE_API_KEY
const NKJV_BIBLE_ID = '40072c4a8127185c' // NKJV Bible ID from API.Bible

export interface BibleVerse {
  number: number
  text: string
}

export interface BibleChapter {
  number: number
  verses: BibleVerse[]
}

export interface BibleBook {
  id: string
  name: string
  testament: "old" | "new"
  chapters: number[]
}

// Fetch all books from the NKJV Bible
export async function getBibleBooks(): Promise<BibleBook[]> {
  const response = await fetch(
    `https://api.scripture.api.bible/v1/bibles/${NKJV_BIBLE_ID}/books`,
    {
      headers: {
        'api-key': API_KEY!
      }
    }
  )
  
  const data = await response.json()
  return data.data.map((book: any) => ({
    id: book.id,
    name: book.name,
    testament: book.testament.toLowerCase(),
    chapters: Array.from({ length: book.chapters.length }, (_, i) => i + 1)
  }))
}

// Fetch a specific chapter with its verses
export async function getChapter(bookId: string, chapter: number): Promise<BibleChapter> {
  const response = await fetch(
    `https://api.scripture.api.bible/v1/bibles/${NKJV_BIBLE_ID}/chapters/${bookId}.${chapter}?content-type=text&include-verse-numbers=true`,
    {
      headers: {
        'api-key': API_KEY!
      }
    }
  )
  
  const data = await response.json()
  const verses = data.data.content.split(/\[(\d+)\]/).filter(Boolean)
  
  const parsedVerses: BibleVerse[] = []
  for (let i = 0; i < verses.length; i += 2) {
    parsedVerses.push({
      number: parseInt(verses[i]),
      text: verses[i + 1].trim()
    })
  }
  
  return {
    number: chapter,
    verses: parsedVerses
  }
} 