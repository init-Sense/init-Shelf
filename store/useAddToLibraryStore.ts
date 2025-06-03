import type { GoogleBook } from "@/lib/api/googleBooks";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/store/AuthSessionProvider";
import type { CreateUserBook, UserBook } from "@/types/userBook";
import type { CreateUserReadingSession } from "@/types/userReadingSession";
import { create } from "zustand";

type BookFormState = {
	googleBook: GoogleBook | null;

	cover: string | null;
	title: string;
	authors: string[];
	publisher: string;
	publishedDate: string;
	language: string;
	translator: string;
	editor: string;
	description: string;

	originalTitle: string;
	firstPublishedDate: string;
	originalLanguage: string;

	categoryId: string | null;
	subcategoryId: string | null;
	genres: string[];
	collections: string[];

	isbn13: string;
	isbn10: string;

	format: string;
	pages: number | null;
	size: string;

	readingState: string;
	readingSessions: Array<{
		startDate: string;
		endDate: string | null;
	}>;

	wishlist: boolean;
	acquisitionType: string;
	price: string;
	condition: string;
	acquisitionDate: string;
	store: string;
	location: string;

	notes: string;
};

type AddToLibraryStore = {
	formState: BookFormState;
	isSubmitting: boolean;
	error: string | null;

	setGoogleBook: (book: GoogleBook) => void;
	updateFormField: <K extends keyof BookFormState>(
		field: K,
		value: BookFormState[K],
	) => void;
	addReadingSession: (startDate: string, endDate: string | null) => void;
	removeReadingSession: (index: number) => void;

	submitBook: (userId: string | undefined) => Promise<UserBook>;
	reset: () => void;
};

const initialState: BookFormState = {
	googleBook: null,
	cover: null,
	title: "",
	authors: [],
	publisher: "",
	publishedDate: "",
	language: "",
	translator: "",
	editor: "",
	description: "",
	originalTitle: "",
	firstPublishedDate: "",
	originalLanguage: "",
	categoryId: null,
	subcategoryId: null,
	genres: [],
	collections: [],
	isbn13: "",
	isbn10: "",
	format: "",
	pages: null,
	size: "",
	readingState: "",
	readingSessions: [],
	wishlist: false,
	acquisitionType: "",
	price: "",
	condition: "",
	acquisitionDate: "",
	store: "",
	location: "",
	notes: "",
};

export const useAddToLibraryStore = create<AddToLibraryStore>((set, get) => ({
	formState: { ...initialState },
	isSubmitting: false,
	error: null,

	setGoogleBook: (book: GoogleBook) => {
		set((state) => ({
			formState: {
				...state.formState,
				googleBook: book,
				title: book.volumeInfo.title || "",
				authors: book.volumeInfo.authors || [],
				publisher: book.volumeInfo.publisher || "",
				publishedDate: book.volumeInfo.publishedDate || "",
				language: book.volumeInfo.language || "",
				description: book.volumeInfo.description || "",
				cover: book.volumeInfo.imageLinks?.thumbnail || null,
				pages: book.volumeInfo.pageCount || null,
				isbn13:
					book.volumeInfo.industryIdentifiers?.find(
						(id: { type: string }) => id.type === "ISBN_13",
					)?.identifier || "",
				isbn10:
					book.volumeInfo.industryIdentifiers?.find(
						(id: { type: string }) => id.type === "ISBN_10",
					)?.identifier || "",
			},
		}));
	},

	updateFormField: (field, value) => {
		set((state) => ({
			formState: {
				...state.formState,
				[field]: value,
			},
		}));
	},

	addReadingSession: (startDate, endDate) => {
		set((state) => ({
			formState: {
				...state.formState,
				readingSessions: [
					...state.formState.readingSessions,
					{ startDate, endDate },
				],
			},
		}));
	},

	removeReadingSession: (index) => {
		set((state) => {
			const newSessions = [...state.formState.readingSessions];
			newSessions.splice(index, 1);
			return {
				formState: {
					...state.formState,
					readingSessions: newSessions,
				},
			};
		});
	},

	submitBook: async (userId: string | undefined) => {
		set({ isSubmitting: true, error: null });
		try {
			const { formState } = get();

			const bookData: CreateUserBook = {
				user_id: userId, // Use the passed userId
				google_book_id: formState.googleBook?.id,
				cover: formState.cover || undefined,
				title: formState.title,
				authors: formState.authors,
				publisher: formState.publisher || undefined,
				published_date: formState.publishedDate || undefined,
				language: formState.language || undefined,
				translator: formState.translator || undefined,
				editor: formState.editor || undefined,
				description: formState.description || undefined,
				original_title: formState.originalTitle || undefined,
				first_published_date: formState.firstPublishedDate || undefined,
				original_language: formState.originalLanguage || undefined,
				category_id: formState.categoryId || undefined,
				subcategory_id: formState.subcategoryId || undefined,
				genres: formState.genres.length ? formState.genres : undefined,
				collections: formState.collections.length
					? formState.collections
					: undefined,
				isbn_13: formState.isbn13 || undefined,
				isbn_10: formState.isbn10 || undefined,
				format: formState.format || undefined,
				pages: formState.pages || undefined,
				size: formState.size || undefined,
				reading_state: formState.readingState || undefined,
				wishlist: formState.wishlist,
				price: formState.price || undefined,
				condition: formState.condition || undefined,
				acquisition_date: formState.acquisitionDate || undefined,
				store: formState.store || undefined,
				location: formState.location || undefined,
				notes: formState.notes || undefined,
			};

			// Create book in database
			const { data: bookResult, error: bookError } = await supabase
				.from("user_books")
				.insert(bookData)
				.select()
				.single();

			if (bookError) {
				throw new Error(bookError.message);
			}

			// Add reading sessions if any
			if (formState.readingSessions.length > 0) {
				const readingSessionsData: CreateUserReadingSession[] =
					formState.readingSessions.map((session) => ({
						user_book_id: bookResult.id,
						start_date: session.startDate,
						end_date: session.endDate || undefined,
					}));

				const { error: sessionsError } = await supabase
					.from("user_reading_sessions")
					.insert(readingSessionsData);

				if (sessionsError) {
					throw new Error(sessionsError.message);
				}
			}

			set({ isSubmitting: false });
			return bookResult as UserBook;
		} catch (error) {
			set({
				isSubmitting: false,
				error: error instanceof Error ? error.message : "Unknown error",
			});
			throw error;
		}
	},

	reset: () => {
		set({ formState: { ...initialState }, error: null });
	},
}));
