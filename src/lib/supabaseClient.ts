// Este archivo debe ser renombrado manualmente a supabaseClient.ts para corregir el error de mayúsculas/minúsculas.
// Archivo renombrado a supabaseClient.ts para corregir el error de mayúsculas/minúsculas
declare global {
  interface ImportMetaEnv {
    readonly VITE_SUPABASE_KEY: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl: string = 'https://dtnxfgjbwjgtyqievaob.supabase.co';
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);
