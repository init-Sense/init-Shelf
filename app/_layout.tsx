import "./global.css";
import { SessionProvider } from "@/store/AuthSessionProvider";
import { Slot } from "expo-router";

export default function RootLayout() {
	return (
		<SessionProvider>
			<Slot />
		</SessionProvider>
	);
}
