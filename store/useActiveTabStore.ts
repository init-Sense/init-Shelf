type ActiveTabState = {
	activeTab: "library" | "search" | "progress";
	setActiveTab: (tab: "library" | "search" | "progress") => void;
};

import { create } from "zustand";

const useActiveTabStore = create<ActiveTabState>((set) => ({
	activeTab: "library",
	setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useActiveTabStore;
