// Quick test to verify env vars are loaded
// Access this at http://localhost:3000/api/test-env

import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  return NextResponse.json({
    configured: !!(supabaseUrl && supabaseKey),
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey,
    url: supabaseUrl || 'NOT SET',
    keyPrefix: supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'NOT SET'
  });
}
