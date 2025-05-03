// TODO: Zod schema
const GOOGLE_BOOKS_API_BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const FIELDS =
	"items(id,volumeInfo(title,authors,publisher,publishedDate,description,dimensions,industryIdentifiers,pageCount,printType,categories,imageLinks,language),searchInfo)";

export interface GoogleBook {
	id: string;
	volumeInfo: {
		title: string;
		authors?: string[];
		publisher?: string;
		publishedDate?: string;
		description?: string;
		dimensions?: {
			height?: string;
			width?: string;
			thickness?: string;
		};
		industryIdentifiers?: Array<{
			type: string;
			identifier: string;
		}>;
		pageCount?: number;
		printType?: string;
		language?: string;
		categories?: string[];
		imageLinks?: {
			smallThumbnail?: string;
			thumbnail?: string;
		};
	};
	searchInfo?: {
		textSnippet?: string;
	};
}

export interface GoogleBooksResponse {
	items?: GoogleBook[];
}

export const searchBooks = async (query: string): Promise<GoogleBook[]> => {
	try {
		const encodedQuery = encodeURIComponent(query);

		const response = await fetch(
			`${GOOGLE_BOOKS_API_BASE_URL}?q=${encodedQuery}&fields=${FIELDS}`,
		);

		if (!response.ok) {
			throw new Error(`API call failed with status: ${response.status}`);
		}

		const data: GoogleBooksResponse = await response.json();
		return data.items || [];
	} catch (error) {
		console.error("Error searching books:", error);
		throw error;
	}
};

export const getBookById = async (id: string): Promise<GoogleBook | null> => {
	try {
		const response = await fetch(`${GOOGLE_BOOKS_API_BASE_URL}/${id}`);

		if (!response.ok) {
			throw new Error(`API call failed with status: ${response.status}`);
		}

		const data: GoogleBook = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching book:", error);
		throw error;
	}
};
