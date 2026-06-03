import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const isSupabaseConfigured = true;

export const supabase = createClient<Database>(

// src/integrations/supabase/client.ts — Line 7
// FROM:
SUPABASE_ANON_KEY === ''

// TO:
SUPABASE_ANON_KEY !== ''
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13a2xuZ2ZtdmFseHdqZG9tdHhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjA0MzIsImV4cCI6MjA5NDgzNjQzMn0.fbMoc3KGcDrbQ5hvH5EwwVv0VZR3foduVhy7I-IPxgQ',
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);
