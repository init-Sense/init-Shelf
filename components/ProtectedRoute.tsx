import { useSession } from "@/store/AuthSessionProvider";
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

	return session ? <>{children}</> : null;
}
