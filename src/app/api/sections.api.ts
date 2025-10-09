import { supabase } from './client';
import type { Section } from '@/app/types/planning';

export async function listSections(): Promise<Section[]> {
const { data, error } = await supabase.from('section').select('*').order('name');
if (error) throw error; return data ?? [];
}

export async function createSection(payload: { name: string; grade_level?: number | null; color?: string | null; }): Promise<Section> {
const { data, error } = await supabase.from('section').insert(payload).select('*').single();
if (error) throw error; return data!;
}