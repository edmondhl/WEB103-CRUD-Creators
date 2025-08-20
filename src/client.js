import { createClient } from '@supabase/supabase-js';

const URL = 'https://etpyokainmeqrmcusapf.supabase.co';
const API_KEY= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0cHlva2Fpbm1lcXJtY3VzYXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyMzA3NzUsImV4cCI6MjA3MDgwNjc3NX0.RQ8BqYhn-IhuKNp1NkeOyOsx6JsrD4c9912Qjn0gWrE';

export const supabase = createClient(URL, API_KEY);