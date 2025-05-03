import type { NewUserBook, UserBook } from "@/types/userBooks";
import { supabase } from "../supabase";

export const getUserBooks = async (userId: string): Promise<UserBook[]> => {
	const { data, error } = await supabase
		.from("user_books")
		.select("*, editions(*), editions.works(*)")
		.eq("user_id", userId);

	if (error) throw error;
	return data || [];
};

export const getUserBookById = async (id: string): Promise<UserBook | null> => {
	const { data, error } = await supabase
		.from("user_books")
		.select("*, editions(*), editions.works(*)")
		.eq("id", id)
		.single();

	if (error) throw error;
	return data;
};

export const getUserBooksByTag = async (
	userId: string,
	tag: string,
): Promise<UserBook[]> => {
	const { data, error } = await supabase
		.from("user_books")
		.select("*, editions(*), editions.works(*)")
		.eq("user_id", userId)
		.contains("collection_tags", [tag]);

	if (error) throw error;
	return data || [];
};

export const getCurrentlyReadingBooks = async (
	userId: string,
): Promise<UserBook[]> => {
	const { data, error } = await supabase
		.from("user_books")
		.select("*, editions(*), editions.works(*)")
		.eq("user_id", userId)
		.eq("currently_reading", true);

	if (error) throw error;
	return data || [];
};

export const createUserBook = async (
	userBook: NewUserBook,
): Promise<UserBook> => {
	const { data, error } = await supabase
		.from("user_books")
		.insert(userBook)
		.select()
		.single();

	if (error) throw error;
	return data;
};

export const updateUserBook = async (
	id: string,
	userBook: Partial<UserBook>,
): Promise<UserBook> => {
	const { data, error } = await supabase
		.from("user_books")
		.update(userBook)
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;
	return data;
};

export const deleteUserBook = async (id: string): Promise<void> => {
	const { error } = await supabase.from("user_books").delete().eq("id", id);

	if (error) throw error;
};

// Add/remove a tag from a book
export const addTagToBook = async (
	bookId: string,
	tag: string,
): Promise<UserBook> => {
	// First get the current tags
	const { data: book, error: fetchError } = await supabase
		.from("user_books")
		.select("collection_tags")
		.eq("id", bookId)
		.single();

	if (fetchError) throw fetchError;

	// Add the tag if it doesn't exist
	const updatedTags = [...(book?.collection_tags || [])];
	if (!updatedTags.includes(tag)) {
		updatedTags.push(tag);
	}

	// Update the book
	const { data, error } = await supabase
		.from("user_books")
		.update({ collection_tags: updatedTags })
		.eq("id", bookId)
		.select()
		.single();

	if (error) throw error;
	return data;
};

export const removeTagFromBook = async (
	bookId: string,
	tag: string,
): Promise<UserBook> => {
	const { data: book, error: fetchError } = await supabase
		.from("user_books")
		.select("collection_tags")
		.eq("id", bookId)
		.single();

	if (fetchError) throw fetchError;

	const updatedTags = (book?.collection_tags || []).filter((t) => t !== tag);

	const { data, error } = await supabase
		.from("user_books")
		.update({ collection_tags: updatedTags })
		.eq("id", bookId)
		.select()
		.single();

	if (error) throw error;
	return data;
};
