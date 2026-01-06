'use server'

import { getCachedVerse, setCachedVerse } from '../utils/verse-cache';

export async function fetchVerseData(date: string) {
  try {
    // Check cache first
    const cachedData = getCachedVerse(date);
    if (cachedData) {
      return cachedData;
    }

    // If not in cache, fetch from database
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/daily-bread?date=${date}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch verse data');
    }

    const data = await response.json();
    
    // Cache the result
    if (data) {
      setCachedVerse(date, data);
    }

    return data;
  } catch (error) {
    console.error('Error fetching verse data:', error);
    return null;
  }
} 