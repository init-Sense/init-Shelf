import {
	createUserBook,
	deleteUserBook,
	updateUserBook,
} from "@/lib/api/userBooks";
import type { CreateUserBook, UserBook } from "@/types/userBook";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateUserBook = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (book: CreateUserBook) => createUserBook(book),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userBooks"] });
		},
	});
};

export const useUpdateUserBook = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, book }: { id: string; book: Partial<UserBook> }) =>
			updateUserBook(id, book),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userBooks"] });
		},
	});
};

export const useDeleteUserBook = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteUserBook(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userBooks"] });
		},
	});
};
