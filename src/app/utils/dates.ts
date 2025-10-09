export function weeksBetween(startISO: string, endISO: string) {
const ms = new Date(endISO).getTime() - new Date(startISO).getTime();
return Math.floor(ms / (7 * 24 * 3600 * 1000));
}

export function isoDate(d: Date) { return d.toISOString().slice(0,10); }

export const DOW: Array<{ key: 'Mon'|'Tue'|'Wed'|'Thu'|'Fri'|'Sat'|'Sun'; label: string }> = [
{ key: 'Mon', label: 'Mon' },{ key: 'Tue', label: 'Tue' },{ key: 'Wed', label: 'Wed' },{ key: 'Thu', label: 'Thu' },{ key: 'Fri', label: 'Fri' },{ key: 'Sat', label: 'Sat' },{ key: 'Sun', label: 'Sun' },
];

export const HOLIDAYS: string[] = [ /* '2025-11-01', '2025-12-25', ... */ ];