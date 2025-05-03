import {
	createWork,
	deleteWork,
	getWorkById,
	getWorks,
	searchWorks,
	updateWork,
} from "@/lib/api/works";
import type { NewWork, Work } from "@/types/works";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useWorks = () => {
	return useQuery({
		queryKey: ["works"],
		queryFn: getWorks,
	});
};

export const useWorkById = (id: string) => {
	return useQuery({
		queryKey: ["works", id],
		queryFn: () => getWorkById(id),
		enabled: !!id,
	});
};

export const useSearchWorks = (query: string) => {
	return useQuery({
		queryKey: ["works", "search", query],
		queryFn: () => searchWorks(query),
		enabled: query.length > 2,
	});
};

export const useCreateWork = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (work: NewWork) => createWork(work),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["works"] });
		},
	});
};

export const useUpdateWork = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, work }: { id: string; work: Partial<Work> }) =>
			updateWork(id, work),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["works"] });
			queryClient.invalidateQueries({ queryKey: ["works", variables.id] });
		},
	});
};

export const useDeleteWork = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteWork(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["works"] });
		},
	});
};
