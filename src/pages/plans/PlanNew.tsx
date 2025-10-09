import PageHeader from '@/app/components/common/PageHeader';
import PlanWizard from '@/app/components/plan/PlanWizard';

export default function PlanNew(){
return (
<div className="p-6 space-y-6">
<PageHeader title="New Lesson Plan" subtitle="Set subject/section/term, dates, schedule, quotas, and upload curriculum." />
<PlanWizard />
</div>
);
}