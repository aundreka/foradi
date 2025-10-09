import { usePlanStore } from "../store/plan.store";
import { enumerateDatesByDOW } from "../utils/dates";
import { supabase } from "../api/client";

type DraftResult = { meetingIds: number[]; };

export function useQuotaPacing() {
  const plan = usePlanStore();

  async function ensureOffering(): Promise<number> {
    // For POC: assume you've created Subject, Section, Term in DB UI;
    // pick/insert an Offering (subject_offering) for those IDs.
    const { data, error } = await supabase
      .from("subject_offering")
      .select("offering_id")
      .eq("subject_id", plan.subjectId)
      .eq("section_id", plan.sectionId)
      .eq("term_id", plan.termId)
      .maybeSingle();

    if (error) throw error;
    if (data) return data.offering_id;

    const ins = await supabase.from("subject_offering").insert({
      subject_id: plan.subjectId, section_id: plan.sectionId, term_id: plan.termId
    }).select("offering_id").single();
    if (ins.error) throw ins.error;
    return ins.data.offering_id;
  }

  function isoSlots(dows: number[]) {
    return dows.sort((a,b)=>a-b);
  }

  function pickSlotsOverTerm(start: string, end: string, dows: number[]) {
    const dates = enumerateDatesByDOW(start, end, dows);
    return dates;
  }

  async function writeLessonPlan(offeringId: number) {
    const { data, error } = await supabase.from("lessonplan")
      .upsert({ offering_id: offeringId, total_ww: plan.quotas.ww, total_pt: plan.quotas.pt, total_exam: plan.quotas.exam, status: "draft" }, { onConflict: "offering_id" })
      .select("lessonplan_id").single();
    if (error) throw error;
    return data.lessonplan_id as number;
  }

  async function writeMeetings(offeringId: number, lessonplanId: number, scheduleDates: string[]): Promise<number[]> {
    const ids: number[] = [];
    const { lessons, ww, pt, exam } = plan.quotas;

    // 1) Fill Lessons on each session date first
    const entries: any[] = scheduleDates.slice(0, lessons).map((dateISO, i) => ({
      offering_id: offeringId,
      lessonplan_id: lessonplanId,
      title: `Lesson ${i+1}`,
      session: "lecture",
      m_category: null,
      m_type: null,
      date_time: `${dateISO}T${plan.weekSlots[0].start}:00+08:00`,
      duration_mins: 60
    }));

    // 2) Evenly distribute WW/PT/Exam across remaining/whole term dates
    function sprinkle(kind: "written_work"|"performance_task"|"exam", count: number, label: string) {
      if (count <= 0) return;
      const spacing = Math.max(1, Math.floor(scheduleDates.length / (count+1)));
      for (let i=1, k=1; k<=count; i+=spacing, k++) {
        const idx = Math.min(i, scheduleDates.length-1);
        entries.push({
          offering_id: offeringId,
          lessonplan_id: lessonplanId,
          title: `${label} ${k}`,
          session: "assessment",
          m_category: kind,
          m_type: kind === "written_work" ? "quiz" : (kind === "performance_task" ? "project" : "exam"),
          date_time: `${scheduleDates[idx]}T${plan.weekSlots[0].start}:00+08:00`,
          duration_mins: 60
        });
      }
    }
    sprinkle("written_work", ww, "WW");
    sprinkle("performance_task", pt, "PT");
    sprinkle("exam", exam, "Exam");

    // Sort by date_time and insert
    entries.sort((a,b)=>a.date_time.localeCompare(b.date_time));

    const { data, error } = await supabase.from("meeting")
      .insert(entries).select("meeting_id");
    if (error) throw error;
    ids.push(...data.map((d:any)=>d.meeting_id));
    return ids;
  }

  async function generateDraft(): Promise<DraftResult> {
    if (!plan.startDate || !plan.endDate || plan.weekSlots.length === 0)
      throw new Error("Please set term dates and at least one weekly slot.");

    const dows = isoSlots(plan.weekSlots.map(s=>s.day));
    const allDays = pickSlotsOverTerm(plan.startDate, plan.endDate, dows);

    const offeringId = await ensureOffering();
    const lessonplanId = await writeLessonPlan(offeringId);
    const meetingIds = await writeMeetings(offeringId, lessonplanId, allDays);

    return { meetingIds };
  }

  return { generateDraft };
}
