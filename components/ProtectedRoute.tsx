// components/ProtectedRoute.tsx
import { useSession } from "@/store/AuthContext";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { session, isLoading } = useSession();

	useEffect(() => {
		if (!isLoading && !session) {
			// Redirect to sign-in if not authenticated
			router.replace("/sign-in");
		}
	}, [session, isLoading]);

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" color="#2196F3" />
			</View>
		);
	}

	// Only render children if authenticated
	return session ? <>{children}</> : null;
}
