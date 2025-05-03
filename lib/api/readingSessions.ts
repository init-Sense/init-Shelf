import { supabase } from "@/lib/supabase";
import type {
	NewReadingSession,
	ReadingSession,
} from "@/types/readingSessions";

export const getReadingSessions = async (
	userBookId: string,
): Promise<ReadingSession[]> => {
	const { data, error } = await supabase
		.from("reading_sessions")
		.select("*")
		.eq("user_book_id", userBookId)
		.order("start_date", { ascending: false });

	if (error) throw error;
	return data || [];
};

export const getReadingSessionById = async (
	id: string,
): Promise<ReadingSession | null> => {
	const { data, error } = await supabase
		.from("reading_sessions")
		.select("*")
		.eq("id", id)
		.single();

	if (error) throw error;
	return data;
};

export const createReadingSession = async (
	session: NewReadingSession,
): Promise<ReadingSession> => {
	const { data, error } = await supabase
		.from("reading_sessions")
		.insert(session)
		.select()
		.single();

	if (error) throw error;
	return data;
};

export const updateReadingSession = async (
	id: string,
	session: Partial<ReadingSession>,
): Promise<ReadingSession> => {
	const { data, error } = await supabase
		.from("reading_sessions")
		.update(session)
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;
	return data;
};

export const deleteReadingSession = async (id: string): Promise<void> => {
	const { error } = await supabase
		.from("reading_sessions")
		.delete()
		.eq("id", id);

	if (error) throw error;
};

// Start a new reading session
export const startReading = async (
	userBookId: string,
): Promise<ReadingSession> => {
	// Mark the book as currently reading
	const { error: updateError } = await supabase
		.from("user_books")
		.update({ currently_reading: true })
		.eq("id", userBookId);

	if (updateError) throw updateError;

	// Create a new reading session with start date
	const newSession: NewReadingSession = {
		user_book_id: userBookId,
		start_date: new Date().toISOString(),
		end_date: null,
		notes: null,
	};

	return createReadingSession(newSession);
};

// Complete a reading session
export const completeReading = async (
	sessionId: string,
	notes?: string,
): Promise<ReadingSession> => {
	// Get the session
	const { data: session, error: fetchError } = await supabase
		.from("reading_sessions")
		.select("user_book_id")
		.eq("id", sessionId)
		.single();

	if (fetchError) throw fetchError;

	// Mark the book as read and not currently reading
	const { error: updateBookError } = await supabase
		.from("user_books")
		.update({
			is_read: true,
			currently_reading: false,
		})
		.eq("id", session.user_book_id);

	if (updateBookError) throw updateBookError;

	// Update the session with end date
	return updateReadingSession(sessionId, {
		end_date: new Date().toISOString(),
		notes: notes || null,
	});
};
