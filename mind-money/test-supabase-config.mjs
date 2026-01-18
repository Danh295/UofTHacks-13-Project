// Test script to verify Supabase configuration
// Run with: node --loader ts-node/esm test-supabase-config.mjs

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://czdisykcmzsycudwtstf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6ZGlzeWtjbXpzeWN1ZHd0c3RmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2MTk5NzIsImV4cCI6MjA4NDE5NTk3Mn0.4j25szbtQ2hEKY5b69rIjucSAesRxiq7o9U4pSjbEaU';

console.log('Testing Supabase Configuration...\n');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey.substring(0, 20) + '...');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('\n✅ Supabase client created successfully!');
console.log('\nNow restart your Next.js server to apply the .env.local changes:');
console.log('1. Stop the dev server (Ctrl+C)');
console.log('2. Run: npm run dev');
console.log('3. Try creating an account again');
