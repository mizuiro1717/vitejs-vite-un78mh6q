import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://blugubgmoxeppyzpmmvp.supabase.co';
const supabaseKey = 'sb_publishable_fBPSjaSQ2qEgjfHmRaiRGA_E3GPVD5x';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Card = {
  id: string;
  name: string;
  set_name: string;
  card_number: string;
  raw_price: number;
  psa10_price: number;
  psa10_population: number;
  image_url: string | null;
  created_at: string;
};

export type CardInsert = Omit<Card, 'id' | 'created_at'>;
