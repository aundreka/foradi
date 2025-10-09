export default function PageHeader({ title, subtitle }: { title: string; subtitle?: string; }){
return (
<div>
<h1 className="text-2xl font-bold">{title}</h1>
{subtitle && <p className="opacity-70">{subtitle}</p>}
</div>
);
}