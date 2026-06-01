import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const isSupabaseConfigured = true;

export const supabase = createClient<Database>(
  'https://mwklngfmvalxwjdomtxa.supabase.co',
  'YOUR_ACTUAL_ANON_KEY_HERE',
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);
