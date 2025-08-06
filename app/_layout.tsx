import "./global.css";
import "@/app/global.css";
import { Navbar } from "@/components/custom/navbar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { VStack } from "@/components/ui/vstack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";

export default function RootLayout() {
	const queryClient = new QueryClient();

	return (
		<GluestackUIProvider mode="light">
			<QueryClientProvider client={queryClient}>
				<VStack className="h-screen pt-[4vh]">
					<Slot />
					<Navbar />
				</VStack>
			</QueryClientProvider>
		</GluestackUIProvider>
	);
}
