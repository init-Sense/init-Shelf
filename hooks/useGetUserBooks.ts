import { getUserBookById, getUserBooks } from "@/lib/api/userBooks";
import type { UserBook } from "@/types/userBook";
import { useQuery } from "@tanstack/react-query";

export const useGetUserBooks = () => {
	return useQuery<UserBook[], Error>({
		queryKey: ["userBooks"],
		queryFn: getUserBooks,
		staleTime: 1000 * 60 * 5,
	});
};

export const useGetUserBooksByOption = (option: string) => {
	return useQuery<UserBook[], Error>({
		queryKey: ["userBooks", option],
		queryFn: async () => {
			const books = await getUserBooks();

			switch (option) {
				case "owned":
					return books.filter((book) => !book.wishlist);
				case "wishlist":
					return books.filter((book) => book.wishlist);
				default:
					return books;
			}
		},
		staleTime: 1000 * 60 * 5,
	});
};

export const useGetUserBookById = (id: string) => {
	return useQuery<UserBook | null, Error>({
		queryKey: ["userBook", id],
		queryFn: () => getUserBookById(id),
		staleTime: 1000 * 60 * 5,
		enabled: !!id,
	});
};
