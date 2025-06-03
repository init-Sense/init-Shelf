import { supabase } from "@/lib/supabase";
import type { CreateUserBook, UserBook } from "@/types/userBook";

export const getUserBooks = async (): Promise<UserBook[]> => {
	const { data, error } = await supabase
		.from("user_books")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		throw new Error(error.message);
	}

	return data as UserBook[];
};

export const getUserBookById = async (id: string): Promise<UserBook | null> => {
	const { data, error } = await supabase
		.from("user_books")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		if (error.code === "PGRST116") {
			return null;
		}
		throw new Error(error.message);
	}

	return data as UserBook;
};

export const createUserBook = async (
	book: CreateUserBook,
): Promise<UserBook> => {
	const { data, error } = await supabase
		.from("user_books")
		.insert(book)
		.select()
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return data as UserBook;
};

export const updateUserBook = async (
	id: string,
	book: Partial<UserBook>,
): Promise<UserBook> => {
	const { data, error } = await supabase
		.from("user_books")
		.update(book)
		.eq("id", id)
		.select()
		.single();

	if (error) {
		throw new Error(error.message);
	}

	return data as UserBook;
};

export const deleteUserBook = async (id: string): Promise<void> => {
	const { error } = await supabase.from("user_books").delete().eq("id", id);

	if (error) {
		throw new Error(error.message);
	}
};
