import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// client

export const supabaseClient = ()=> {
  return createClient(SUPABASE_URL, SUPABASE_KEY);
}

export const supabaseTVClient = ()=> {
  return createClient(SUPABASE_URL, SUPABASE_KEY, { db: { schema: 'tv' } });
};

// server 
export const supabaseServer = (cookies: any)=> {
    return createServerClient(SUPABASE_URL, SUPABASE_KEY, cookies);
}