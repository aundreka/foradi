import { useParams } from 'react-router-dom';
import CalendarBoard from '@/app/components/calendar/CalendarBoard';

export default function PlanCalendar(){
const { offeringId } = useParams();
const id = Number(offeringId);
return (
<div className="p-6 space-y-6">
<h1 className="text-xl font-semibold">Plan Calendar</h1>
{Number.isFinite(id) ? <CalendarBoard offeringId={id} /> : <p>Invalid offering id</p>}
</div>
);
}