import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

export async function GET(request: NextRequest) {
  // Return empty array if Supabase not configured
  if (!supabase) {
    console.warn('Supabase not configured - returning empty events');
    return NextResponse.json([]);
  }

  const day = request.nextUrl.searchParams.get('day');
  const start = request.nextUrl.searchParams.get('start');
  const end = request.nextUrl.searchParams.get('end');
  
  try {
    // Base query - only fetch public events for public access
    let query = supabase
      .from('events')
      .select('id, title_en, title_zh, description_en, description_zh, location_en, location_zh, start_time, end_time, is_public, created_at')
      .eq('is_public', true);

    // If start and end dates are provided, fetch events for the date range
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      endDate.setHours(23, 59, 59, 999);
      
      query = query
        .gte('start_time', startDate.toISOString())
        .lte('start_time', endDate.toISOString())
        .order('start_time', { ascending: true });
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json([]);
      }
      
      return NextResponse.json(data || []);
    }
    
    // If only start date is provided, fetch events from that date forward
    if (start) {
      const startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0);
      
      query = query
        .gte('start_time', startDate.toISOString())
        .order('start_time', { ascending: true });
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json([]);
      }
      
      return NextResponse.json(data || []);
    }
    
    // If a specific day is provided, fetch events for that day
    if (day) {
      const dateObj = new Date(day);
      const startOfDay = new Date(dateObj);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(dateObj);
      endOfDay.setHours(23, 59, 59, 999);
      
      query = query
        .gte('start_time', startOfDay.toISOString())
        .lte('start_time', endOfDay.toISOString())
        .order('start_time', { ascending: true });
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json([]);
      }
      
      return NextResponse.json(data || []);
    }
    
    // Default: fetch all future public events
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    query = query
      .gte('start_time', today.toISOString())
      .order('start_time', { ascending: true });
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching events:', error);
      return NextResponse.json([]);
    }
    
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json([]);
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

    // Check if user email ends with @sjca.org
    if (!user.email?.endsWith('@sjca.org')) {
      return NextResponse.json({ error: 'Access denied. Only @sjca.org emails allowed.' }, { status: 403 });
    }

    const body = await request.json();
    const { title_en, title_zh, description_en, description_zh, location_en, location_zh, start_time, end_time, is_public } = body;
    
    if (!start_time || !title_en) {
      return NextResponse.json({ error: 'start_time and title_en are required' }, { status: 400 });
    }
    
    const { data, error } = await supabaseAdmin
      .from('events')
      .insert([{
        title_en,
        title_zh: title_zh || null,
        description_en: description_en || null,
        description_zh: description_zh || null,
        location_en: location_en || null,
        location_zh: location_zh || null,
        start_time,
        end_time: end_time || null,
        is_public: is_public !== undefined ? is_public : true,
        created_by: user.id
      }])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating event:', error);
      return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
    }
    
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
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
    const { id, title_en, title_zh, description_en, description_zh, location_en, location_zh, start_time, end_time, is_public } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }
    
    const updateData: Record<string, unknown> = {};
    if (title_en !== undefined) updateData.title_en = title_en;
    if (title_zh !== undefined) updateData.title_zh = title_zh;
    if (description_en !== undefined) updateData.description_en = description_en;
    if (description_zh !== undefined) updateData.description_zh = description_zh;
    if (location_en !== undefined) updateData.location_en = location_en;
    if (location_zh !== undefined) updateData.location_zh = location_zh;
    if (start_time !== undefined) updateData.start_time = start_time;
    if (end_time !== undefined) updateData.end_time = end_time;
    if (is_public !== undefined) updateData.is_public = is_public;
    
    const { data, error } = await supabaseAdmin
      .from('events')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating event:', error);
      return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
    }
    
    return NextResponse.json(data);
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
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }
    
    const { error } = await supabaseAdmin
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting event:', error);
      return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
