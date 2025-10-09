import { supabase } from './client';

export async function uploadBook(offering_id: number, file: File) {
const path = `${offering_id}/${Date.now()}_${file.name}`;
const { error } = await supabase.storage.from('books').upload(path, file, { upsert: false });
if (error) throw error;
try { await supabase.from('book').insert({ offering_id, path, filename: file.name }); } catch {}
return path;
}