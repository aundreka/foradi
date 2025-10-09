import { supabase } from './client';
import type { Term } from '@/app/types/planning';

export async function listTerms(): Promise<Term[]> {
const { data, error } = await supabase.from('term').select('*').order('academic_year', { ascending: false });
if (error) throw error; return data ?? [];
}