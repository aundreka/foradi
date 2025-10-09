import { useState } from 'react';
import { uploadBook } from '@/app/api/books.api';
import { usePlanStore } from '@/app/store/plan.store';
import { upsertOffering } from '@/app/api/offerings.api';
import { ensureDraftPlan, saveCurriculumUploaded } from '@/app/api/lessonplans.api';

export default function CurriculumUpload(){
const { subject_id, section_id, term_id, setField, curriculum_uploaded } = usePlanStore();
const [busy, setBusy] = useState(false);

async function onUpload(e: React.ChangeEvent<HTMLInputElement>){
const file = e.target.files?.[0]; if (!file) return;
if (!subject_id || !section_id || !term_id) { alert('Select Subject, Section, Term first.'); return; }
setBusy(true);
try {
const offering = await upsertOffering({ subject_id, section_id, term_id });
const plan = await ensureDraftPlan(offering.offering_id);
await uploadBook(offering.offering_id, file);
await saveCurriculumUploaded(plan.lessonplan_id, true);
setField('lessonplan_id', plan.lessonplan_id);
setField('curriculum_uploaded', true);
} finally { setBusy(false); }
}

return (
<div className="space-y-2">
<label className="text-sm font-medium">Upload Curriculum / Table of Contents (PDF, DOCX, Image)</label>
<input type="file" accept=".pdf,.doc,.docx,image/*" onChange={onUpload} className="file-input file-input-bordered w-full" />
{busy && <p className="text-xs">Uploading…</p>}
{curriculum_uploaded && <p className="text-xs text-emerald-700">Uploaded ✓</p>}
</div>
);
}