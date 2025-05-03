import { supabase } from "@/lib/supabase";
import type { NewWork, Work } from "@/types/works";

export const getWorks = async (): Promise<Work[]> => {
	const { data, error } = await supabase.from("works").select("*");

	if (error) throw error;
	return data || [];
};

export const getWorkById = async (id: string): Promise<Work | null> => {
	const { data, error } = await supabase
		.from("works")
		.select("*")
		.eq("id", id)
		.single();

	if (error) throw error;
	return data;
};

export const searchWorks = async (query: string): Promise<Work[]> => {
	const { data, error } = await supabase
		.from("works")
		.select("*")
		.or(`original_title.ilike.%${query}%, authors.ilike.%${query}%`)
		.limit(20);

	if (error) throw error;
	return data || [];
};

export const createWork = async (work: NewWork): Promise<Work> => {
	const { data, error } = await supabase
		.from("works")
		.insert(work)
		.select()
		.single();

	if (error) throw error;
	return data;
};

export const updateWork = async (
	id: string,
	work: Partial<Work>,
): Promise<Work> => {
	const { data, error } = await supabase
		.from("works")
		.update(work)
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;
	return data;
};

export const deleteWork = async (id: string): Promise<void> => {
	const { error } = await supabase.from("works").delete().eq("id", id);

	if (error) throw error;
};
