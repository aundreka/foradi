import { usePlanStore } from '@/app/store/plan.store';
import { weeksBetween } from '@/app/utils/dates';
import toast from 'react-hot-toast';

export default function TermDatesForm() {
const { start_date, end_date, setField } = usePlanStore();

function validate(startISO?: string, endISO?: string) {
if (!startISO || !endISO) return;
const w = weeksBetween(startISO, endISO);
if (w < 8 || w > 20) toast.error(`Term duration must be 8–20 weeks. Current: ${w} weeks.`);
}

return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<label className="flex flex-col gap-2">
<span className="text-sm font-medium">Start Date</span>
<input type="date" className="input input-bordered" value={start_date ?? ''}
onChange={(e) => { setField('start_date', e.target.value); validate(e.target.value, end_date); }} />
</label>
<label className="flex flex-col gap-2">
<span className="text-sm font-medium">End Date</span>
<input type="date" className="input input-bordered" value={end_date ?? ''}
onChange={(e) => { setField('end_date', e.target.value); validate(start_date, e.target.value); }} />
</label>
{start_date && end_date && (
<p className="col-span-full text-sm opacity-70">Duration: {weeksBetween(start_date, end_date)} weeks</p>
)}
</div>
);
}