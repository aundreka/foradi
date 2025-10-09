import { useQuery } from '@tanstack/react-query';
const { subject_id, section_id, term_id, setField } = usePlanStore();
const { data: subjects = [], refetch: refetchSubjects } = useQuery({ queryKey:['subjects'], queryFn: listSubjects });
const { data: sections = [], refetch: refetchSections } = useQuery({ queryKey:['sections'], queryFn: listSections });
const { data: terms = [] } = useQuery({ queryKey:['terms'], queryFn: listTerms });
const [showNewSubj, setShowNewSubj] = useState(false);
const [showNewSec, setShowNewSec] = useState(false);

async function addSubject(e: React.FormEvent){
e.preventDefault();
const fd = new FormData(e.currentTarget as HTMLFormElement);
const name = String(fd.get('name')||'').trim();
const code = String(fd.get('code')||'').trim();
if (!name) return;
await createSubject({ name, code });
await refetchSubjects(); setShowNewSubj(false);
}
async function addSection(e: React.FormEvent){
e.preventDefault();
const fd = new FormData(e.currentTarget as HTMLFormElement);
const name = String(fd.get('name')||'').trim();
if (!name) return;
await createSection({ name });
await refetchSections(); setShowNewSec(false);
}

return (
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div>
<label className="text-sm font-medium">Subject</label>
<div className="flex gap-2 mt-1">
<select className="select select-bordered flex-1" value={subject_id ?? ''} onChange={(e)=>setField('subject_id', Number(e.target.value))}>
<option value="" disabled>Choose…</option>
{subjects.map(s=> <option key={s.subject_id} value={s.subject_id}>{s.name}</option>)}
</select>
<button className="btn" onClick={()=>setShowNewSubj(true)}>New</button>
</div>
{showNewSubj && (
<form onSubmit={addSubject} className="mt-2 flex gap-2">
<input name="code" placeholder="Code (e.g., MATH 10)" className="input input-bordered"/>
<input name="name" placeholder="Name" className="input input-bordered"/>
<button className="btn btn-primary" type="submit">Add</button>
<button className="btn" type="button" onClick={()=>setShowNewSubj(false)}>Cancel</button>
</form>
)}
</div>

<div>
<label className="text-sm font-medium">Section</label>
<div className="flex gap-2 mt-1">
<select className="select select-bordered flex-1" value={section_id ?? ''} onChange={(e)=>setField('section_id', Number(e.target.value))}>
<option value="" disabled>Choose…</option>
{sections.map(s=> <option key={s.section_id} value={s.section_id}>{s.name}</option>)}
</select>
<button className="btn" onClick={()=>setShowNewSec(true)}>New</button>
</div>
{showNewSec && (
<form onSubmit={addSection} className="mt-2 flex gap-2">
<input name="name" placeholder="Section name (e.g., 10-Amethyst)" className="input input-bordered"/>
<button className="btn btn-primary" type="submit">Add</button>
<button className="btn" type="button" onClick={()=>setShowNewSec(false)}>Cancel</button>
</form>
)}
</div>

<div>
<label className="text-sm font-medium">Academic Term</label>
<select className="select select-bordered mt-1 w-full" value={term_id ?? ''} onChange={(e)=>setField('term_id', Number(e.target.value))}>
<option value="" disabled>Choose…</option>
{terms.map(t=> <option key={t.term_id} value={t.term_id}>{`${t.academic_year} • ${t.kind} #${t.idx}`}</option>)}
</select>
<p className="text-xs opacity-70 mt-1">(Create new terms in Admin for now.)</p>
</div>
</div>
);
}