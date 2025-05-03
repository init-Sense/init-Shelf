import {
	completeReading,
	createReadingSession,
	deleteReadingSession,
	getReadingSessionById,
	getReadingSessions,
	startReading,
	updateReadingSession,
} from "@/lib/api/readingSessions";
import type {
	NewReadingSession,
	ReadingSession,
} from "@/types/readingSessions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useReadingSessions = (userBookId: string) => {
	return useQuery({
		queryKey: ["readingSessions", userBookId],
		queryFn: () => getReadingSessions(userBookId),
		enabled: !!userBookId,
	});
};

export const useReadingSessionById = (id: string) => {
	return useQuery({
		queryKey: ["readingSessions", "single", id],
		queryFn: () => getReadingSessionById(id),
		enabled: !!id,
	});
};

export const useCreateReadingSession = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (session: NewReadingSession) => createReadingSession(session),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["readingSessions", data.user_book_id],
			});
			queryClient.invalidateQueries({ queryKey: ["userBooks"] });
		},
	});
};

export const useUpdateReadingSession = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			session,
		}: { id: string; session: Partial<ReadingSession> }) =>
			updateReadingSession(id, session),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["readingSessions", data.user_book_id],
			});
			queryClient.invalidateQueries({
				queryKey: ["readingSessions", "single", data.id],
			});
		},
	});
};

export const useDeleteReadingSession = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteReadingSession(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["readingSessions"] });
			queryClient.invalidateQueries({ queryKey: ["userBooks"] });
		},
	});
};

export const useStartReading = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (userBookId: string) => startReading(userBookId),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["readingSessions", data.user_book_id],
			});
			queryClient.invalidateQueries({ queryKey: ["userBooks"] });
		},
	});
};

export const useCompleteReading = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ sessionId, notes }: { sessionId: string; notes?: string }) =>
			completeReading(sessionId, notes),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["readingSessions", data.user_book_id],
			});
			queryClient.invalidateQueries({ queryKey: ["userBooks"] });
		},
	});
};
