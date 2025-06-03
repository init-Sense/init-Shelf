import "./global.css";
import { SessionProvider } from "@/store/AuthSessionProvider";
import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
	return (
		<SessionProvider>
			<PaperProvider>
				<Slot />
			</PaperProvider>
		</SessionProvider>
	);
}
