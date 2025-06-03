import "./global.css";
import "@/app/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { SessionProvider } from "@/store/AuthSessionProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";

export default function RootLayout() {
	const queryClient = new QueryClient();

	return (
		<GluestackUIProvider mode="light">
			<SessionProvider>
				<QueryClientProvider client={queryClient}>
					<Slot />
				</QueryClientProvider>
			</SessionProvider>
		</GluestackUIProvider>
	);
}
