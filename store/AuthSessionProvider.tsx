import { supabase } from "@/lib/supabase";
import type { Session, User } from "@supabase/supabase-js";
import {
	type PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

type CustomUserData = {
	id: string;
	username: string;
	email: string;
};

type AuthContextProps = {
	signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
	signUp: (
		username: string,
		email: string,
		password: string,
	) => Promise<{ error: Error | null }>;
	signOut: () => Promise<void>;
	session: Session | null;
	userData: CustomUserData | null;
	isLoading: boolean;
};

const AuthSessionProvider = createContext<AuthContextProps>({
	signIn: async () => ({ error: null }),
	signUp: async () => ({ error: null }),
	signOut: async () => {},
	session: null,
	userData: null,
	isLoading: true,
});

export function useSession() {
	const value = useContext(AuthSessionProvider);
	if (process.env.NODE_ENV !== "production") {
		if (!value) {
			throw new Error(
				"useSession must be wrapped in a <AuthSessionProvider />",
			);
		}
	}
	return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
	const [session, setSession] = useState<Session | null>(null);
	const [userData, setUserData] = useState<CustomUserData | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const fetchUserData = async (user: User) => {
		try {
			const { data, error } = await supabase
				.from("users")
				.select("id, username, email")
				.eq("id", user.id)
				.single();

			if (error) {
				console.error("Error fetching user data:", error);
				return null;
			}

			return data as CustomUserData;
		} catch (err) {
			console.error("Unexpected error fetching user data:", err);
			return null;
		}
	};

	const createUserInCustomTable = async (
		user: User,
		username: string,
		email: string,
	) => {
		try {
			const { error } = await supabase.from("users").insert({
				id: user.id,
				username,
				email: email || user.email,
			});

			if (error) {
				console.error("Error creating user in custom table:", error);
				return null;
			}

			return {
				id: user.id,
				username,
				email: email || user.email || "",
			} as CustomUserData;
		} catch (err) {
			console.error("Unexpected error creating user:", err);
			return null;
		}
	};

	const handleSessionChange = async (newSession: Session | null) => {
		setSession(newSession);

		if (newSession?.user) {
			const customUser = await fetchUserData(newSession.user);

			if (customUser) {
				setUserData(customUser);
			} else {
				const newCustomUser = await createUserInCustomTable(
					newSession.user,
					newSession.user.user_metadata?.username || "user",
					newSession.user.email || "",
				);
				setUserData(newCustomUser);
			}
		} else {
			setUserData(null);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			handleSessionChange(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			handleSessionChange(session);
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const signIn = async (email: string, password: string) => {
		setIsLoading(true);

		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				console.error("Auth error:", error.message);
				return { error: new Error(error.message) };
			}

			return { error: null };
		} catch (error) {
			return { error: error as Error };
		} finally {
			setIsLoading(false);
		}
	};

	const signUp = async (username: string, email: string, password: string) => {
		setIsLoading(true);

		try {
			const { data: existingUser, error: checkUsernameError } = await supabase
				.from("users")
				.select("username")
				.eq("username", username)
				.single();

			if (existingUser) {
				return { error: new Error("Username already taken") };
			}

			const { data: existingEmail, error: checkEmailError } = await supabase
				.from("users")
				.select("email")
				.eq("email", email)
				.single();

			if (existingEmail) {
				return { error: new Error("Email address already in use") };
			}

			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						username,
					},
				},
			});

			if (error) {
				console.error("Registration error:", error.message);
				return { error: new Error(error.message) };
			}

			if (data.user) {
				await createUserInCustomTable(data.user, username, email);
			}

			return { error: null };
		} catch (error) {
			return { error: error as Error };
		} finally {
			setIsLoading(false);
		}
	};

	const signOut = async () => {
		setIsLoading(true);
		try {
			await supabase.auth.signOut();
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthSessionProvider.Provider
			value={{
				signIn,
				signUp,
				signOut,
				session,
				userData,
				isLoading,
			}}
		>
			{children}
		</AuthSessionProvider.Provider>
	);
}
