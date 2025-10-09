import { TermKind, PlanStatus } from './enums';

export interface Subject { subject_id: number; code: string; name: string; color?: string | null; icon?: string | null; }
export interface Section { section_id: number; name: string; grade_level?: number | null; color?: string | null; }
export interface Term { term_id: number; academic_year: string; kind: TermKind; idx: number; start_date: string; end_date: string; }
export interface SubjectOffering { offering_id: number; subject_id: number; section_id: number; term_id: number; alias?: string | null; }

export interface LessonPlan { lessonplan_id: number; offering_id: number; total_meetings?: number | null; total_lessons?: number | null; total_ww?: number | null; total_pt?: number | null; total_exam?: number | null; status: PlanStatus; curriculum_uploaded?: boolean | null; }

export interface AssessmentPolicy { policy_id: number; offering_id: number; term_id: number; ww_count: number; pt_count: number; exam_count: number; weights_json?: any; }

export type Dow = 'Mon'|'Tue'|'Wed'|'Thu'|'Fri'|'Sat'|'Sun';
export interface ClassSlot { day: Dow; start_time: string; end_time: string; }

export interface NLScheduleParse { byday: Dow[]; start_time: string; end_time: string; until?: string; }

export interface CalendarItem { src: 'planned' | 'actual'; offering_id: number; subject_id: number; section_id: number; term_id: number; start_at_utc: string; end_at_utc: string; m_category?: string | null; m_type?: string | null; title?: string | null; }