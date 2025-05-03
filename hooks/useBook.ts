import { type GoogleBook, getBookById } from "@/lib/api/googleBooks";
import { useQuery } from "@tanstack/react-query";

export const useBook = (id: string | undefined) => {
	return useQuery<GoogleBook | null, Error>({
		queryKey: ["books", "detail", id],
		queryFn: () => getBookById(id!),
		enabled: !!id,
		staleTime: 1000 * 60 * 60,
	});
};
