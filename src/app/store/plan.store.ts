import { create } from 'zustand';
import type { ClassSlot } from '@/app/types/planning';

type PlanState = {
subject_id?: number;
section_id?: number;
term_id?: number;
start_date?: string; end_date?: string;
slots: ClassSlot[];
quotas: { lessons: number; ww: number; pt: number; exam: number };
curriculum_uploaded: boolean;
lessonplan_id?: number;
setField: <K extends keyof PlanState>(k: K, v: PlanState[K]) => void;
setSlots: (slots: ClassSlot[]) => void;
setQuotas: (q: PlanState['quotas']) => void;
reset: () => void;
};

export const usePlanStore = create<PlanState>((set) => ({
slots: [],
quotas: { lessons: 24, ww: 6, pt: 4, exam: 2 },
curriculum_uploaded: false,
setField: (k, v) => set({ [k]: v } as any),
setSlots: (slots) => set({ slots }),
setQuotas: (quotas) => set({ quotas }),
reset: () => set({ subject_id: undefined, section_id: undefined, term_id: undefined, start_date: undefined, end_date: undefined, slots: [], quotas: { lessons: 24, ww: 6, pt: 4, exam: 2 }, curriculum_uploaded: false, lessonplan_id: undefined }),
}));