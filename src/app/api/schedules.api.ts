import { supabase } from './client';
import type { ClassSlot } from '@/app/types/planning';

export async function setWeeklySchedule(offering_id: number, slots: ClassSlot[], start_date: string) {
const { error: delErr } = await supabase.from('subjectschedule').delete().eq('offering_id', offering_id);
if (delErr) throw delErr;
const rows = slots.map(s => ({ offering_id, day: s.day, start_time: s.start_time, end_time: s.end_time, start_date }));
const { error } = await supabase.from('subjectschedule').insert(rows);
if (error) throw error; return true;
}