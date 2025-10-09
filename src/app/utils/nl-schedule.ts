import type { NLScheduleParse } from '@/app/types/planning';

export function parseNLSchedule(input: string): NLScheduleParse | null {
const txt = input.trim().replace(/\u2013|\u2014|–|—/g, '-');
const m = /Every\s+([A-Za-z\/]+)\s+(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*-\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)(?:\s+until\s+(.+))?/i.exec(txt);
if (!m) return null;
const days = m[1].split('/').map(s => s.slice(0,3)).map(s => ({Mon:'Mon',Tue:'Tue',Wed:'Wed',Thu:'Thu',Fri:'Fri',Sat:'Sat',Sun:'Sun'} as any)[s]);
const sh = to24(+m[2], m[4] as 'AM'|'PM'); const sm = +(m[3] ?? '0');
const eh = to24(+m[5], m[7] as 'AM'|'PM'); const em = +(m[6] ?? '0');
const until = m[8] ? new Date(m[8]).toISOString().slice(0,10) : undefined;
return { byday: days, start_time: hhmm(sh, sm), end_time: hhmm(eh, em), until };
}
function to24(h: number, ap: 'AM'|'PM') { return (ap === 'PM' ? (h % 12) + 12 : (h % 12)); }
function hhmm(h: number, m: number) { return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`; }