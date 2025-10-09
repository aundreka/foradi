import { parseNLSchedule } from '@/app/utils/nl-schedule';
import { usePlanStore } from '@/app/store/plan.store';
import toast from 'react-hot-toast';

export default function NLScheduleInput() {
const { setSlots } = usePlanStore();
function onParse(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();
const input = new FormData(e.currentTarget).get('nl') as string;
const res = parseNLSchedule(input || '');
if (!res) { toast.error('Could not parse. Try: "Every Mon/Wed 9–10 AM until Dec 15"'); return; }
setSlots(res.byday.map(d => ({ day: d, start_time: res.start_time, end_time: res.end_time })));
toast.success('Schedule parsed!');
}
return (
<form onSubmit={onParse} className="flex gap-2">
<input name="nl" className="input input-bordered flex-1" placeholder="Every Mon/Wed 9–10 AM until December 15" />
<button className="btn btn-primary" type="submit">Parse</button>
</form>
);
}