import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Cache the Bible data in memory after first load
let nkjvBible: Record<string, Record<string, Record<string, string>>> | null = null;
let cuvBible: Record<string, Record<string, Record<string, string>>> | null = null;
let bookNames: Record<string, string> | null = null;

async function loadBibleData() {
  if (!nkjvBible || !cuvBible || !bookNames) {
    const publicDir = path.join(process.cwd(), 'public', 'bible_translations');
    
    const [nkjvData, cuvData, namesData] = await Promise.all([
      fs.readFile(path.join(publicDir, 'NKJV_bible.json'), 'utf-8'),
      fs.readFile(path.join(publicDir, 'CUV_bible.json'), 'utf-8'),
      fs.readFile(path.join(publicDir, 'book_names.json'), 'utf-8')
    ]);
    
    nkjvBible = JSON.parse(nkjvData);
    cuvBible = JSON.parse(cuvData);
    bookNames = JSON.parse(namesData);
  }
  
  return { nkjv: nkjvBible!, cuv: cuvBible!, names: bookNames! };
}

interface ParsedReference {
  book: string;
  chapter: string;
  startVerse: number | null;  // null means entire chapter
  endVerse: number | null;
}

// Parse verse reference like "John 3:16", "Genesis 1:1-3", "John 3" (entire chapter)
function parseReference(reference: string): ParsedReference | null {
  const normalized = reference.trim();
  
  // Pattern 1: Book Chapter:Verse or Book Chapter:StartVerse-EndVerse
  // Examples: "John 3:16", "Genesis 1:1-3", "1 John 3:16", "Psalm 23:1-6"
  const verseMatch = normalized.match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/);
  
  if (verseMatch) {
    const [, book, chapter, startVerse, endVerse] = verseMatch;
    return {
      book: book.trim(),
      chapter: chapter,
      startVerse: parseInt(startVerse),
      endVerse: endVerse ? parseInt(endVerse) : parseInt(startVerse)
    };
  }
  
  // Pattern 2: Book Chapter (entire chapter)
  // Examples: "John 3", "Genesis 1", "1 John 3"
  const chapterMatch = normalized.match(/^(.+?)\s+(\d+)$/);
  
  if (chapterMatch) {
    const [, book, chapter] = chapterMatch;
    return {
      book: book.trim(),
      chapter: chapter,
      startVerse: null,  // Will fetch entire chapter
      endVerse: null
    };
  }
  
  return null;
}

// Normalize book name to match JSON keys
function normalizeBookName(book: string): string {
  const normalizations: Record<string, string> = {
    'psalms': 'Psalm',
    'psalm': 'Psalm',
    'song of solomon': 'Song Of Solomon',
    'songs of solomon': 'Song Of Solomon',
    'song of songs': 'Song Of Solomon',
    '1samuel': '1 Samuel',
    '2samuel': '2 Samuel',
    '1kings': '1 Kings',
    '2kings': '2 Kings',
    '1chronicles': '1 Chronicles',
    '2chronicles': '2 Chronicles',
    '1corinthians': '1 Corinthians',
    '2corinthians': '2 Corinthians',
    '1thessalonians': '1 Thessalonians',
    '2thessalonians': '2 Thessalonians',
    '1timothy': '1 Timothy',
    '2timothy': '2 Timothy',
    '1peter': '1 Peter',
    '2peter': '2 Peter',
    '1john': '1 John',
    '2john': '2 John',
    '3john': '3 John',
  };
  
  const lower = book.toLowerCase();
  if (normalizations[lower]) {
    return normalizations[lower];
  }
  
  // Capitalize first letter of each word
  return book.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Find book key in bible object (case-insensitive)
function findBookKey(bible: Record<string, Record<string, Record<string, string>>>, book: string): string | null {
  const normalizedBook = normalizeBookName(book);
  
  if (bible[normalizedBook]) {
    return normalizedBook;
  }
  
  // Try case-insensitive match
  const bookKey = Object.keys(bible).find(k => k.toLowerCase() === normalizedBook.toLowerCase());
  return bookKey || null;
}

// Convert number to superscript
function toSuperscript(num: number): string {
  const superscripts: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  };
  return num.toString().split('').map(d => superscripts[d]).join('');
}

function getVerseText(
  bible: Record<string, Record<string, Record<string, string>>>,
  book: string,
  chapter: string,
  startVerse: number | null,
  endVerse: number | null
): { text: string; actualStart: number; actualEnd: number } | null {
  const bookKey = findBookKey(bible, book);
  if (!bookKey || !bible[bookKey][chapter]) return null;
  
  const chapterData = bible[bookKey][chapter];
  const verseNumbers = Object.keys(chapterData).map(Number).sort((a, b) => a - b);
  
  if (verseNumbers.length === 0) return null;
  
  // If no specific verses, get entire chapter
  const start = startVerse ?? verseNumbers[0];
  const end = endVerse ?? verseNumbers[verseNumbers.length - 1];
  
  const verses: string[] = [];
  let actualStart = start;
  let actualEnd = end;
  
  for (let v = start; v <= end; v++) {
    const verseText = chapterData[v.toString()];
    if (verseText) {
      // Add verse number as superscript
      verses.push(`${toSuperscript(v)} ${verseText.trim()}`);
      if (verses.length === 1) actualStart = v;
      actualEnd = v;
    }
  }
  
  return verses.length > 0 
    ? { text: verses.join(' '), actualStart, actualEnd }
    : null;
}

function getChineseReference(
  names: Record<string, string>,
  book: string,
  chapter: string,
  startVerse: number | null,
  endVerse: number | null
): string {
  const normalizedBook = normalizeBookName(book);
  const chineseBook = names[normalizedBook] || book;
  
  // Entire chapter
  if (startVerse === null) {
    return `${chineseBook} ${chapter}`;
  }
  
  // Single verse
  if (startVerse === endVerse) {
    return `${chineseBook} ${chapter}:${startVerse}`;
  }
  
  // Verse range
  return `${chineseBook} ${chapter}:${startVerse}-${endVerse}`;
}

function formatEnglishReference(
  book: string,
  chapter: string,
  startVerse: number | null,
  endVerse: number | null
): string {
  const normalizedBook = normalizeBookName(book);
  
  // Entire chapter
  if (startVerse === null) {
    return `${normalizedBook} ${chapter}`;
  }
  
  // Single verse
  if (startVerse === endVerse) {
    return `${normalizedBook} ${chapter}:${startVerse}`;
  }
  
  // Verse range
  return `${normalizedBook} ${chapter}:${startVerse}-${endVerse}`;
}

export async function GET(request: NextRequest) {
  try {
    const reference = request.nextUrl.searchParams.get('ref');
    
    if (!reference) {
      return NextResponse.json({ error: 'Reference parameter is required' }, { status: 400 });
    }
    
    const parsed = parseReference(reference);
    
    if (!parsed) {
      return NextResponse.json({ 
        error: 'Invalid reference format. Use format like "John 3:16", "Genesis 1:1-3", or "John 3" for entire chapter' 
      }, { status: 400 });
    }
    
    const { nkjv, cuv, names } = await loadBibleData();
    
    const englishResult = getVerseText(nkjv, parsed.book, parsed.chapter, parsed.startVerse, parsed.endVerse);
    const chineseResult = getVerseText(cuv, parsed.book, parsed.chapter, parsed.startVerse, parsed.endVerse);
    
    // Use actual verse range from results for more accurate reference
    const actualStart = englishResult?.actualStart ?? parsed.startVerse;
    const actualEnd = englishResult?.actualEnd ?? parsed.endVerse;
    
    const formattedReference = formatEnglishReference(parsed.book, parsed.chapter, actualStart, actualEnd);
    const chineseReference = getChineseReference(names, parsed.book, parsed.chapter, actualStart, actualEnd);
    
    return NextResponse.json({
      reference: formattedReference,
      reference_zh: chineseReference,
      text_en: englishResult?.text || null,
      text_zh: chineseResult?.text || null,
      parsed: {
        book: parsed.book,
        chapter: parsed.chapter,
        startVerse: actualStart,
        endVerse: actualEnd,
        isFullChapter: parsed.startVerse === null
      }
    });
  } catch (error) {
    console.error('Error looking up verse:', error);
    return NextResponse.json({ error: 'Failed to lookup verse' }, { status: 500 });
  }
}
