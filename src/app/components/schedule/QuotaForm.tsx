import { usePlanStore } from '@/app/store/plan.store';

export default function QuotaForm() {
const { quotas, setQuotas } = usePlanStore();
const onNum = (key: keyof typeof quotas, val: string) => setQuotas({ ...quotas, [key]: Math.max(0, Number(val || 0)) });
return (
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<Field label="Lessons" value={quotas.lessons} onChange={v=>onNum('lessons', v)} />
<Field label="Written Works" value={quotas.ww} onChange={v=>onNum('ww', v)} />
<Field label="Performance Tasks" value={quotas.pt} onChange={v=>onNum('pt', v)} />
<Field label="Exams" value={quotas.exam} onChange={v=>onNum('exam', v)} />
</div>
);
}
function Field({ label, value, onChange }: { label: string; value: number; onChange: (v: string) => void; }) {
return (
<label className="flex flex-col gap-2">
<span className="text-sm font-medium">{label}</span>
<input type="number" className="input input-bordered" value={value} onChange={(e)=>onChange(e.target.value)} />
</label>
);
}