import { supabase } from "@/lib/supabase";
import type { Edition, NewEdition } from "@/types/editions";

export const getEditions = async (): Promise<Edition[]> => {
	const { data, error } = await supabase.from("editions").select("*");

	if (error) throw error;
	return data || [];
};

export const getEditionsByWorkId = async (
	workId: string,
): Promise<Edition[]> => {
	const { data, error } = await supabase
		.from("editions")
		.select("*")
		.eq("work_id", workId);

	if (error) throw error;
	return data || [];
};

export const getEditionById = async (id: string): Promise<Edition | null> => {
	const { data, error } = await supabase
		.from("editions")
		.select("*")
		.eq("id", id)
		.single();

	if (error) throw error;
	return data;
};

export const searchEditionsByIsbn = async (
	isbn: string,
): Promise<Edition[]> => {
	const { data, error } = await supabase
		.from("editions")
		.select("*")
		.or(`isbn_13.eq.${isbn},isbn_10.eq.${isbn}`)
		.limit(1);

	if (error) throw error;
	return data || [];
};

export const createEdition = async (edition: NewEdition): Promise<Edition> => {
	const { data, error } = await supabase
		.from("editions")
		.insert(edition)
		.select()
		.single();

	if (error) throw error;
	return data;
};

export const updateEdition = async (
	id: string,
	edition: Partial<Edition>,
): Promise<Edition> => {
	const { data, error } = await supabase
		.from("editions")
		.update(edition)
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;
	return data;
};

export const deleteEdition = async (id: string): Promise<void> => {
	const { error } = await supabase.from("editions").delete().eq("id", id);

	if (error) throw error;
};
