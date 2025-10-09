import { usePlanStore } from '@/app/store/plan.store';
import { weeksBetween } from '@/app/utils/dates';

export default function ProgressBar(){
const { quotas, start_date, end_date, slots } = usePlanStore();
if (!start_date || !end_date) return null;
const weeks = Math.max(1, weeksBetween(start_date, end_date));
const sessionsPerWeek = slots.length; // 1 slot per selected day for MVP
const totalSessions = weeks * sessionsPerWeek;
const required = quotas.lessons + quotas.ww + quotas.pt + quotas.exam;
const pct = Math.round((required / Math.max(1,totalSessions)) * 100);

return (
<div className="space-y-1">
<div className="flex justify-between text-xs">
<span>Weekly load: {sessionsPerWeek}/wk • {weeks} wks • Capacity: {totalSessions}</span>
<span>Needed: {required}</span>
</div>
<div className="h-2 rounded bg-gray-200 overflow-hidden">
<div className={`h-full ${pct>100?'bg-red-500':'bg-emerald-600'}`} style={{ width: `${Math.min(pct,100)}%` }} />
</div>
{required > totalSessions && (
<p className="text-xs text-red-600">Quotas exceed available sessions. Increase weeks, add days, or reduce quotas.</p>
)}
</div>
);
}