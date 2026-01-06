import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

// Check if Supabase is configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SERVICE_KEY;

const isSupabaseConfigured = supabaseUrl && supabaseKey;

const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const supabaseAdmin = isSupabaseConfigured && serviceKey
  ? createClient(supabaseUrl, serviceKey)
  : null;

// Bible book name translations
const bibleBookTranslations: Record<string, string> = {
  "Genesis": "創世記",
  "Exodus": "出埃及記",
  "Leviticus": "利未記",
  "Numbers": "民數記",
  "Deuteronomy": "申命記",
  "Joshua": "約書亞記",
  "Judges": "士師記",
  "Ruth": "路得記",
  "1 Samuel": "撒母耳記上",
  "2 Samuel": "撒母耳記下",
  "1 Kings": "列王紀上",
  "2 Kings": "列王紀下",
  "1 Chronicles": "歷代志上",
  "2 Chronicles": "歷代志下",
  "Ezra": "以斯拉記",
  "Nehemiah": "尼希米記",
  "Esther": "以斯帖記",
  "Job": "約伯記",
  "Psalms": "詩篇",
  "Proverbs": "箴言",
  "Ecclesiastes": "傳道書",
  "Song of Songs": "雅歌",
  "Isaiah": "以賽亞書",
  "Jeremiah": "耶利米書",
  "Lamentations": "耶利米哀歌",
  "Ezekiel": "以西結書",
  "Daniel": "但以理書",
  "Hosea": "何西阿書",
  "Joel": "約珥書",
  "Amos": "阿摩司書",
  "Obadiah": "俄巴底亞書",
  "Jonah": "約拿書",
  "Micah": "彌迦書",
  "Nahum": "那鴻書",
  "Habakkuk": "哈巴谷書",
  "Zephaniah": "西番雅書",
  "Haggai": "哈該書",
  "Zechariah": "撒迦利亞書",
  "Malachi": "瑪拉基書",
  "Matthew": "馬太福音",
  "Mark": "馬可福音",
  "Luke": "路加福音",
  "John": "約翰福音",
  "Acts": "使徒行傳",
  "Romans": "羅馬書",
  "1 Corinthians": "哥林多前書",
  "2 Corinthians": "哥林多後書",
  "Galatians": "加拉太書",
  "Ephesians": "以弗所書",
  "Philippians": "腓立比書",
  "Colossians": "歌羅西書",
  "1 Thessalonians": "帖撒羅尼迦前書",
  "2 Thessalonians": "帖撒羅尼迦後書",
  "1 Timothy": "提摩太前書",
  "2 Timothy": "提摩太後書",
  "Titus": "提多書",
  "Philemon": "腓利門書",
  "Hebrews": "希伯來書",
  "James": "雅各書",
  "1 Peter": "彼得前書",
  "2 Peter": "彼得後書",
  "1 John": "約翰一書",
  "2 John": "約翰二書",
  "3 John": "約翰三書",
  "Jude": "猶大書",
  "Revelation": "啟示錄"
}

// Function to translate reference from English to Chinese
function translateReference(reference: string): string {
  const match = reference.match(/^([\d\s]*[A-Za-z]+)\s+(.+)$/);
  if (!match) return reference;
  
  const bookName = match[1].trim();
  const chapterVerse = match[2];
  const chineseBook = bibleBookTranslations[bookName] || bookName;
  
  return `${chineseBook} ${chapterVerse}`;
}

// Function to fetch verse content from Bible API
async function fetchVerseContent(reference: string, isChinese: boolean = false) {
  try {
    const formattedReference = reference.replace(/\s+/g, '-');
    const url = isChinese 
      ? `https://bible-api.com/${formattedReference}?translation=cuv`
      : `https://bible-api.com/${formattedReference}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch verse: ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      text: data.text,
      verses: data.verses,
      reference: data.reference
    };
  } catch (error) {
    console.error("Error fetching verse:", error);
    return null;
  }
}

// Default verse for when database is not configured
function getDefaultVerse(date: string) {
  return {
    verse: "John 3:16",
    verse_zh: "約翰福音 3:16",
    content: "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.",
    content_zh: "神愛世人，甚至將他的獨生子賜給他們，叫一切信他的，不至滅亡，反得永生。",
    date: date,
    verses: [],
    verses_zh: []
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 })
    }

    // Return default verse if Supabase not configured
    if (!supabase) {
      console.warn('Supabase not configured - returning default verse');
      return NextResponse.json(getDefaultVerse(date));
    }

    const { data, error } = await supabase
      .from('daily_bread')
      .select('*')
      .eq('date', date)
      .maybeSingle()

    if (error) {
      console.error('Error fetching daily bread:', error)
      // Return default verse on database error
      return NextResponse.json(getDefaultVerse(date));
    }
    
    if (!data) {
      // Return default verse if no entry exists
      return NextResponse.json(getDefaultVerse(date));
    }

    // Map new schema fields to expected response format
    const verseRef = data.verse_reference_en;
    let content = data.verse_text_en;
    let contentZh = data.verse_text_zh;
    
    // If verse text is not stored, fetch from API
    if (!content && verseRef) {
      const fetched = await fetchVerseContent(verseRef);
      content = fetched?.text || '';
    }
    
    if (!contentZh && verseRef) {
      const fetchedZh = await fetchVerseContent(verseRef, true);
      contentZh = fetchedZh?.text || '';
    }

    return NextResponse.json({
      verse: data.verse_reference_en,
      verse_zh: data.verse_reference_zh || translateReference(data.verse_reference_en || ''),
      content: content,
      content_zh: contentZh,
      date: data.date,
      verses: [],
      verses_zh: []
    });
  } catch (error) {
    console.error('Error in daily bread route:', error)
    // Return default verse on any error
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0]
    return NextResponse.json(getDefaultVerse(date));
  }
}

export async function POST(request: NextRequest) {
  if (!supabase || !supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  try {
    // Get auth token from header
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!user.email?.endsWith('@sjca.org')) {
      return NextResponse.json({ error: 'Access denied. Only @sjca.org emails allowed.' }, { status: 403 });
    }

    const body = await request.json();
    const { date, verse_reference_en, verse_reference_zh, verse_text_en, verse_text_zh } = body;
    
    if (!date || !verse_reference_en) {
      return NextResponse.json({ error: 'date and verse_reference_en are required' }, { status: 400 });
    }

    // Check if entry already exists for this date
    const { data: existing } = await supabase
      .from('daily_bread')
      .select('date')
      .eq('date', date)
      .maybeSingle();

    if (existing) {
      // Update existing entry
      const { data, error } = await supabaseAdmin
        .from('daily_bread')
        .update({
          verse_reference_en,
          verse_reference_zh: verse_reference_zh || null,
          verse_text_en: verse_text_en || null,
          verse_text_zh: verse_text_zh || null
        })
        .eq('date', date)
        .select()
        .single();

      if (error) {
        console.error('Error updating daily bread:', error);
        return NextResponse.json({ error: 'Failed to update daily bread' }, { status: 500 });
      }

      return NextResponse.json(data);
    }

    // Insert new entry
    const { data, error } = await supabaseAdmin
      .from('daily_bread')
      .insert([{
        date,
        verse_reference_en,
        verse_reference_zh: verse_reference_zh || null,
        verse_text_en: verse_text_en || null,
        verse_text_zh: verse_text_zh || null,
        created_by: user.id
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating daily bread:', error);
      return NextResponse.json({ error: 'Failed to create daily bread' }, { status: 500 });
    }
    
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!supabase || !supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  try {
    // Get auth token from header
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!user.email?.endsWith('@sjca.org')) {
      return NextResponse.json({ error: 'Access denied. Only @sjca.org emails allowed.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    
    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }
    
    const { error } = await supabaseAdmin
      .from('daily_bread')
      .delete()
      .eq('date', date);
    
    if (error) {
      console.error('Error deleting daily bread:', error);
      return NextResponse.json({ error: 'Failed to delete daily bread' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
