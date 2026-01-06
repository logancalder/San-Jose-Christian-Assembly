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

// Verify admin access
export async function GET(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ 
      error: 'Supabase not configured', 
      authenticated: false 
    }, { status: 503 });
  }

  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized', authenticated: false }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized', authenticated: false }, { status: 401 });
    }

    // Check if email ends with @sjca.org
    if (!user.email?.endsWith('@sjca.org')) {
      return NextResponse.json({ 
        error: 'Access denied. Only @sjca.org emails allowed.',
        authenticated: false 
      }, { status: 403 });
    }

    // Check if user exists in admins table, if not create entry
    if (supabaseAdmin) {
      const { data: adminData, error: adminError } = await supabaseAdmin
        .from('admins')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (!adminData && !adminError) {
        // Create admin entry
        await supabaseAdmin
          .from('admins')
          .insert([{
            id: user.id,
            email: user.email,
            role: 'admin'
          }]);
      }

      return NextResponse.json({
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          role: adminData?.role || 'admin'
        }
      });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('Error verifying admin:', error);
    return NextResponse.json({ error: 'Internal server error', authenticated: false }, { status: 500 });
  }
}

// Sign in with email/password
export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase not configured' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Check if email ends with @sjca.org before even trying to sign in
    if (!email.endsWith('@sjca.org')) {
      return NextResponse.json({ 
        error: 'Access denied. Only @sjca.org emails allowed.' 
      }, { status: 403 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    // Ensure admin entry exists
    if (supabaseAdmin) {
      const { data: adminData } = await supabaseAdmin
        .from('admins')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();

      if (!adminData) {
        await supabaseAdmin
          .from('admins')
          .insert([{
            id: data.user.id,
            email: data.user.email,
            role: 'admin'
          }]);
      }
    }

    return NextResponse.json({
      success: true,
      session: data.session,
      user: {
        id: data.user.id,
        email: data.user.email
      }
    });
  } catch (error) {
    console.error('Error signing in:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
