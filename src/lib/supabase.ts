import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // 环境变量缺失时给出明确提示，避免整页白屏
  console.error('Backend 配置缺失：VITE_PUBLIC_SUPABASE_URL / VITE_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  SUPABASE_URL ?? 'https://placeholder.invalid',
  SUPABASE_ANON_KEY ?? 'placeholder-anon-key',
);