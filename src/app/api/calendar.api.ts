import { supabase } from './client';
import type { CalendarItem } from '@/app/types/planning';

export async function getCalendar(offering_id: number, start: string, end: string): Promise<CalendarItem[]> {
const { data, error } = await supabase
.from('mv_calendar')
.select('src, offering_id, subject_id, section_id, term_id, start_at_utc, end_at_utc, m_category, m_type, title')
.gte('start_at_utc', start)
.lte('end_at_utc', end)
.eq('offering_id', offering_id)
.order('start_at_utc');
if (error) return [];
return (data ?? []) as CalendarItem[];
}