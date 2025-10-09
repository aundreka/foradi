import { supabase } from './client';
import type { LessonPlan } from '@/app/types/planning';

export async function ensureDraftPlan(offering_id: number): Promise<LessonPlan> {
const { data: found } = await supabase.from('lessonplan').select('*').eq('offering_id', offering_id).maybeSingle();
if (found) return found as LessonPlan;
const { data, error } = await supabase
.from('lessonplan')
.insert({ offering_id, status: 'draft', curriculum_uploaded: false })
.select('*')
.single();
if (error) throw error; return data!;
}

export async function saveCurriculumUploaded(lessonplan_id: number, uploaded: boolean) {
const { error } = await supabase.from('lessonplan').update({ curriculum_uploaded: uploaded }).eq('lessonplan_id', lessonplan_id);
if (error) throw error; return true;
}

export async function publishPlan(lessonplan_id: number) {
const { error } = await supabase.from('lessonplan').update({ status: 'published' }).eq('lessonplan_id', lessonplan_id);
if (error) throw error; return true;
}