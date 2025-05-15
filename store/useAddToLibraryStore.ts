import type { GoogleBook } from "@/lib/api/googleBooks";
import { create } from "zustand";

type StepperStore = {
	step: number;
	setStep: (step: number) => void;
	currentItem: GoogleBook;
	setCurrentItem: (item: GoogleBook) => void;
};

export const useStepperStore = create<StepperStore>((set) => ({
	step: 0,
	setStep: (step: number) => set({ step }),
	currentItem: {} as GoogleBook,
	setCurrentItem: (item: GoogleBook) => set({ currentItem: item }),
}));
