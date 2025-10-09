import { useEffect, useMemo, useRef } from 'react';
import toast from 'react-hot-toast';
import { upsertOffering } from '@/app/api/offerings.api';
import { ensureDraftPlan, publishPlan } from '@/app/api/lessonplans.api';
import { upsertPolicy } from '@/app/api/policies.api';
import { setWeeklySchedule } from '@/app/api/schedules.api';
import TermDatesForm from '@/app/components/schedule/TermDatesForm';
import WeekGridBuilder from '@/app/components/schedule/WeekGridBuilder';
import NLScheduleInput from '@/app/components/schedule/NLScheduleInput';
import QuotaForm from '@/app/components/schedule/QuotaForm';
import SubjectSectionTermPicker from '@/app/components/plan/SubjectSectionTermPicker';
import CurriculumUpload from '@/app/components/schedule/CurriculumUpload';
import ProgressBar from '@/app/components/schedule/ProgressBar';
import { usePlanStore } from '@/app/store/plan.store';

export default function PlanWizard() {
const { subject_id, section_id, term_id, start_date, end_date, slots, quotas, curriculum_uploaded, setField, reset, lessonplan_id } = usePlanStore();

const readyToPublish = useMemo(() => !!(lessonplan_id && start_date && end_date && slots.length && curriculum_uploaded && quotas.lessons >= 0 && quotas.ww >= 0 && quotas.pt >=0 && quotas.exam >= 0), [lessonplan_id, start_date, end_date, slots, quotas, curriculum_uploaded]);

// Autosave (debounced)
const timer = useRef<number | null>(null);
useEffect(()=>{
if (!subject_id || !section_id || !term_id || !start_date) return;
if (timer.current) window.clearTimeout(timer.current);
timer.current = window.setTimeout(async () => {
try {
const offering = await upsertOffering({ subject_id, section_id, term_id });
const plan = await ensureDraftPlan(offering.offering_id);
setField('lessonplan_id', plan.lessonplan_id);
await upsertPolicy({ offering_id: offering.offering_id, term_id, ww_count: quotas.ww, pt_count: quotas.pt, exam_count: quotas.exam });
if (slots.length) await setWeeklySchedule(offering.offering_id, slots, start_date);
toast.dismiss(); toast.success('Draft autosaved');
} catch (e:any) { toast.error(e.message || 'Autosave failed'); }
}, 600);
return () => { if (timer.current) window.clearTimeout(timer.current); };
}, [subject_id, section_id, term_id, start_date, end_date, JSON.stringify(slots), JSON.stringify(quotas)]);

async function onPublish() {
try {
if (!lessonplan_id) return;
await publishPlan(lessonplan_id);
toast.success('Plan published');
} catch (e:any) { toast.error(e.message || 'Publish failed'); }
}

useEffect(()=>() => { reset(); }, [reset]);

return (
<div className="space-y-8">
<section className="space-y-4">
<h2 className="text-lg font-semibold">1) Create a New Plan</h2>
<SubjectSectionTermPicker />
</section>

<section className="space-y-4">
<h2 className="text-lg font-semibold">2) Term Duration</h2>
<TermDatesForm />
</section>

<section className="space-y-4">
<h2 className="text-lg font-semibold">3) Schedule Pattern</h2>
}