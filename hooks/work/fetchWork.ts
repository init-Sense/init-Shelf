import { type Work, WorkSchema } from "@/types/work";

export const fetchWorkById = async (workId: string): Promise<Work> => {
	const cleanId = workId.startsWith("/works/") ? workId : `/works/${workId}`;

	const response = await fetch(`https://openlibrary.org${cleanId}.json`);

	if (!response.ok) {
		throw new Error(`Failed to fetch work details: ${response.status}`);
	}

	const data = await response.json();

	console.log("Raw work data:", JSON.stringify(data, null, 2));

	try {
		return WorkSchema.parse(data);
	} catch (error) {
		console.error("Schema validation error:", error);
		throw new Error("Invalid work data format from API");
	}
};
