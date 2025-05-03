import { create } from "zustand";

interface Category {
	id: string;
	label: string;
	count: number;
}

interface LibraryConfig {
	categories: Category[];
	title: string;
}

interface LibraryData {
	[key: string]: LibraryConfig;
}

interface ShelfState {
	currentLibrary: string;
	shelves: LibraryData;
	setCurrentLibrary: (shelf: string) => void;
	getCurrentLibraryCategories: () => Category[];
	getCurrentLibraryInfo: () => LibraryConfig;
	getLibraryTotalCount: (shelf: string) => number;
}

const shelfConfig: LibraryData = {
	books: {
		categories: [
			{ id: "owned", label: "owned", count: 400 },
			{ id: "wishlist", label: "wishlist", count: 32 },
		],
		title: "books",
	},
	films: {
		categories: [
			{ id: "watched", label: "watched", count: 128 },
			{ id: "watchlist", label: "watchlist", count: 45 },
		],
		title: "films",
	},
	games: {
		categories: [
			{ id: "owned", label: "owned", count: 87 },
			{ id: "wishlist", label: "wishlist", count: 21 },
		],
		title: "games",
	},
};

export const useLibraryStore = create<ShelfState>((set, get) => ({
	currentLibrary: "books",
	shelves: shelfConfig,
	setCurrentLibrary: (shelf: string) => {
		if (shelfConfig[shelf]) {
			set({ currentLibrary: shelf });
		}
	},
	getCurrentLibraryCategories: () => {
		const { currentLibrary, shelves } = get();
		return shelves[currentLibrary]?.categories || [];
	},
	getCurrentLibraryInfo: () => {
		const { currentLibrary, shelves } = get();
		return shelves[currentLibrary] || shelves.books;
	},
	getLibraryTotalCount: (shelf: string) => {
		const { shelves } = get();
		const categories = shelves[shelf]?.categories || [];
		return categories.reduce((total, category) => total + category.count, 0);
	},
}));
