import { useEffect, useMemo, useState } from 'react';
import { getCalendar } from '@/app/api/calendar.api';

const COLORS: Record<string, string> = {
Lesson: 'bg-green-100 border-green-400',
WW: 'bg-blue-100 border-blue-400',
PT: 'bg-orange-100 border-orange-400',
Exam: 'bg-red-100 border-red-400',
};

export default function CalendarBoard({ offeringId }: { offeringId: number }){
const [range, setRange] = useState(() => ({ start: new Date(), end: new Date(Date.now()+28*24*3600*1000) }));
const [items, setItems] = useState<any[]>([]);

useEffect(() => { (async () => {
const start = range.start.toISOString();
const end = range.end.toISOString();
const data = await getCalendar(offeringId, start, end);
setItems(data);
})();
}, [offeringId, range.start, range.end]);

const days = useMemo(()=>{ const out: Date[] = []; const d0 = new Date(range.start);
for (let i=0;i<28;i++){ const d = new Date(d0); d.setDate(d.getDate()+i); out.push(d); }
return out; }, [range.start]);

return (
<div className="space-y-3">
<div className="flex gap-2 text-xs">
<span className="px-2 py-1 rounded border bg-green-100 border-green-400">Lesson</span>
<span className="px-2 py-1 rounded border bg-blue-100 border-blue-400">WW</span>
<span className="px-2 py-1 rounded border bg-orange-100 border-orange-400">PT</span>
<span className="px-2 py-1 rounded border bg-red-100 border-red-400">Exam</span>
</div>
<div className="grid grid-cols-7 gap-3">
{days.map(d => (
<div key={d.toDateString()} className="border rounded p-2 min-h-[120px]">
<div className="text-xs opacity-70">{d.toDateString().slice(0,10)}</div>
<div className="mt-2 space-y-2">
{items.filter(i=> new Date(i.start_at_utc).toDateString() === d.toDateString()).map((i, idx)=>{
const cat = i.m_category ? (i.m_category === 'written_work' ? 'WW' : i.m_category === 'performance_task' ? 'PT' : i.m_category === 'exam' ? 'Exam' : 'Lesson') : 'Lesson';
return (
<div key={idx} className={`border rounded px-2 py-1 text-xs ${COLORS[cat] ?? 'bg-gray-100 border-gray-300'}`}>
<div className="font-medium">{i.title ?? cat}</div>
<div>{new Date(i.start_at_utc).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
</div>
);
})}
</div>
</div>
))}
</div>
</div>
);
}