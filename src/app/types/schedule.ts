export interface SubjectSchedule {
  subjectschedule_id: number;
  offering_id: number;
  day: string;               // "Mon".."Sun"
  start_time: string;        // "09:00"
  end_time: string;          // "10:00"
  rrule?: string | null;     // nullable
  start_date?: string | null;
}

export type WeekSlot = { day: number; start: string; end: string }; // 1..7 ISO
