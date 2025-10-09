import { supabase } from './client';
import type { SubjectOffering } from '@/app/types/planning';

export async function upsertOffering(payload: { subject_id: number; section_id: number; term_id: number; alias?: string | null; }): Promise<SubjectOffering> {
const { data, error } = await supabase
.from('subject_offering')
.upsert(payload, { onConflict: 'subject_id,section_id,term_id', ignoreDuplicates: false })
.select('*')
.single();
if (error) throw error; return data!;
}