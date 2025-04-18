import { Redirect, Stack } from "expo-router";
import "../../global.css";
import { chartsIcon } from "@/assets/icons/charts-icon";
import { plusIcon } from "@/assets/icons/plus-icon";
import { searchIcon } from "@/assets/icons/search-icon";
import { shelfIcon } from "@/assets/icons/shelf-icon";
import { useSession } from "@/store/ctx";
import { Pressable, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function AppLayout() {
	const { session, isLoading } = useSession();

	// You can keep the splash screen open, or render a loading screen like we do here.
	if (isLoading) {
		console.log("loading");
	}

	// Only require authentication within the (app) group's layout as users
	// need to be able to access the (auth) group and sign in again.
	if (!session) {
		// On web, static rendering will stop here as the user is not authenticated
		// in the headless Node process that the pages are rendered in.
		return <Redirect href="/sign-in" />;
	}

	return (
		<>
			<Stack screenOptions={{ headerShown: false }} />
			<View
				className={
					"flex flex-row w-full justify-between py-[16px] px-8 items-center"
				}
			>
				<Pressable
					className={"w-[81px+] h-[64px] flex items-center justify-center "}
					onPress={() => console.log("Ciao")}
				>
					<SvgXml xml={shelfIcon} />
				</Pressable>
				<Pressable
					className={"w-[81px+] h-[64px] flex items-center justify-center "}
				>
					<SvgXml xml={chartsIcon} />
				</Pressable>
				<Pressable
					className={"w-[81px+] h-[64px] flex items-center justify-center "}
				>
					<SvgXml xml={searchIcon} />
				</Pressable>
				<Pressable
					className={
						"bg-black w-[81px+] h-[64px] flex items-center justify-center "
					}
				>
					<SvgXml xml={plusIcon} />
				</Pressable>
			</View>
		</>
	);
}
