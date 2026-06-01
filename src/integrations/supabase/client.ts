import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured = SUPABASE_URL !== '' && SUPABASE_ANON_KEY !== '';

const DUMMY_URL = 'https://placeholder.supabase.co';
const DUMMY_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYzNjE4MjIsImV4cCI6MTk2MTkzNzgyMn0.placeholder';

export const supabase = createClient<Database>(
  isSupabaseConfigured ? SUPABASE_URL : DUMMY_URL,
  isSupabaseConfigured ? SUPABASE_ANON_KEY : DUMMY_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);
