import "./global.css";
import { SessionProvider } from "@/store/ctx";
import { Slot } from "expo-router";

export default function RootLayout() {
	return (
		<SessionProvider>
			<Slot />
		</SessionProvider>
	);
}
