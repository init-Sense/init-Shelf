import {
	addTagToBook,
	createUserBook,
	deleteUserBook,
	getCurrentlyReadingBooks,
	getUserBookById,
	getUserBooks,
	getUserBooksByTag,
	removeTagFromBook,
	updateUserBook,
} from "@/lib/api/userBooks";
import { useSession } from "@/store/AuthSessionProvider";
import type { NewUserBook, UserBook } from "@/types/userBooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUserBooks = () => {
	const { userData } = useSession();

	return useQuery({
		queryKey: ["userDataBooks", userData?.id],
		queryFn: () => getUserBooks(userData?.id || ""),
		enabled: !!userData?.id,
	});
};

export const useUserBookById = (id: string) => {
	return useQuery({
		queryKey: ["userDataBooks", id],
		queryFn: () => getUserBookById(id),
		enabled: !!id,
	});
};

export const useUserBooksByTag = (tag: string) => {
	const { userData } = useSession();

	return useQuery({
		queryKey: ["userDataBooks", "tag", tag, userData?.id],
		queryFn: () => getUserBooksByTag(userData?.id || "", tag),
		enabled: !!userData?.id && !!tag,
	});
};

export const useCurrentlyReadingBooks = () => {
	const { userData } = useSession();

	return useQuery({
		queryKey: ["userDataBooks", "currentlyReading", userData?.id],
		queryFn: () => getCurrentlyReadingBooks(userData?.id || ""),
		enabled: !!userData?.id,
	});
};

export const useCreateUserBook = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (userDataBook: NewUserBook) => createUserBook(userDataBook),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["userDataBooks"] });
			queryClient.setQueryData(["userDataBooks", data.id], data);
		},
	});
};

export const useUpdateUserBook = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			userDataBook,
		}: { id: string; userDataBook: Partial<UserBook> }) =>
			updateUserBook(id, userDataBook),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["userDataBooks"] });
			queryClient.invalidateQueries({
				queryKey: ["userDataBooks", variables.id],
			});
		},
	});
};

export const useDeleteUserBook = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteUserBook(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userDataBooks"] });
		},
	});
};

export const useAddTagToBook = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ bookId, tag }: { bookId: string; tag: string }) =>
			addTagToBook(bookId, tag),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["userDataBooks"] });
			queryClient.setQueryData(["userDataBooks", data.id], data);
		},
	});
};

export const useRemoveTagFromBook = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ bookId, tag }: { bookId: string; tag: string }) =>
			removeTagFromBook(bookId, tag),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["userDataBooks"] });
			queryClient.setQueryData(["userDataBooks", data.id], data);
		},
	});
};
