import { useRoutes, Navigate } from 'react-router-dom';
import PlanNew from '@/pages/plans/PlanNew';
import PlanCalendar from '@/pages/plans/PlanCalendar';

export default function AppRoutes() {
return useRoutes([
{ path: '/', element: <Navigate to="/plans/new" replace /> },
{ path: '/plans/new', element: <PlanNew /> },
{ path: '/plans/:offeringId/calendar', element: <PlanCalendar /> },
]);
}