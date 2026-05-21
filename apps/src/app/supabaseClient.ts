import { createClient } from '@supabase/supabase-js';

// These environment variables protect your credentials from leaking in your GitHub repository
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  // A defensive warning during local development to remind you when keys are missing
  console.warn(
    'Supabase environment variables are missing. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your local .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);