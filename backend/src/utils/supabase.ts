import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL environment variable is not set');
}

if (!supabaseKey) {
  throw new Error('SUPABASE_KEY environment variable is not set');
}

if (!supabaseServiceKey) {
  throw new Error('SUPABASE_SERVICE_KEY environment variable is not set');
}

const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export { supabase, supabaseAdmin };