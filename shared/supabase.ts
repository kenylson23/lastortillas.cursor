import { createClient } from '@supabase/supabase-js';

// Supabase configuration
export const supabaseConfig = {
  url: 'https://nuoblhgwtxyrafbyxjkw.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51b2JsaGd3dHh5cmFmYnl4amt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4ODEwMDUsImV4cCI6MjA2NjQ1NzAwNX0.vn95TruJXJRytI30P5xhBMUwc2ECJe4ulJ1xdLw6I6U'
};

// Create Supabase client
export const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

// Database URL configuration for PostgreSQL
export const getDatabaseUrl = () => {
  // Use environment variable if available
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  
  // Supabase pooler connection (most reliable)
  return 'postgresql://postgres.nuoblhgwtxyrafbyxjkw:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres';
};