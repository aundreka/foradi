import { supabase } from './client';
import type { AssessmentPolicy } from '@/app/types/planning';

export async function upsertPolicy(payload: { offering_id: number; term_id: number; ww_count: number; pt_count: number; exam_count: number; }): Promise<AssessmentPolicy> {
const { data, error } = await supabase
.from('assessment_policy')
.upsert(payload, { onConflict: 'offering_id,term_id', ignoreDuplicates: false })
.select('*')
.single();
if (error) throw error; return data!;
}