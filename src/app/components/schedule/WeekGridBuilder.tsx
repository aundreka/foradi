import { useMemo } from 'react';
import { usePlanStore } from '@/app/store/plan.store';
import { DOW } from '@/app/utils/dates';

export default function WeekGridBuilder() {
const { slots, setSlots } = usePlanStore();

function toggle(day: (typeof DOW)[number]['key']) {
const exist = slots.find(s => s.day === day);
if (exist) setSlots(slots.filter(s => s.day !== day));
else setSlots([...slots, { day, start_time: '09:00', end_time: '10:00' }]);
}

const selected = useMemo(() => new Set(slots.map(s=>s.day)), [slots]);

return (
<div className="space-y-3">
<div className="flex gap-2">
{DOW.map(d => (
<button key={d.key} onClick={()=>toggle(d.key)}
className={`px-3 py-2 rounded border ${selected.has(d.key) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'}`}>{d.label}</button>
))}
</div>
<div className="space-y-2">
{slots.map((s, i) => (
<div key={i} className="grid grid-cols-3 md:grid-cols-4 gap-2 items-center">
<div className="text-sm opacity-70">{s.day}</div>
<input type="time" className="input input-bordered" value={s.start_time}
onChange={(e)=>{ const copy = [...slots]; copy[i] = { ...copy[i], start_time: e.target.value }; setSlots(copy); }} />
<input type="time" className="input input-bordered" value={s.end_time}
onChange={(e)=>{ const copy = [...slots]; copy[i] = { ...copy[i], end_time: e.target.value }; setSlots(copy); }} />
<button className="text-red-600 text-sm" onClick={()=>setSlots(slots.filter((_,ix)=>ix!==i))}>Remove</button>
</div>
))}
</div>
</div>
);
}