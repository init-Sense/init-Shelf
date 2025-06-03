// TODO: Zod schema
export type GoogleBook = {
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
};
