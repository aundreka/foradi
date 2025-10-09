import { supabase } from './client';
import type { Subject } from '@/app/types/planning';

export async function listSubjects(): Promise<Subject[]> {
const { data, error } = await supabase.from('subject').select('*').order('name');
if (error) throw error; return data ?? [];
}

export async function createSubject(payload: { code: string; name: string; color?: string | null; icon?: string | null; }): Promise<Subject> {
const { data, error } = await supabase.from('subject').insert(payload).select('*').single();
if (error) throw error; return data!;
}