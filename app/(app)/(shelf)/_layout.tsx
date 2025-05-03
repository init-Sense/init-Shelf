import { Redirect, Stack, router, usePathname } from "expo-router";
import "@/app/global.css";
import { chartsIcon } from "@/assets/icons/charts-icon";
import { searchIcon } from "@/assets/icons/search-icon";
import { shelfIcon } from "@/assets/icons/shelf-icon";
import { LibraryDropdown } from "@/components/LibraryDropdown";
import { cn } from "@/lib/utils/cn";
import { useSession } from "@/store/AuthSessionProvider";
import { QueryProvider } from "@/store/QueryProvider";
import { useLibraryStore } from "@/store/useLibraryStore";
import { type FC, useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

interface UserData {
	username: string;
	[key: string]: any;
}

interface SessionData {
	session: any;
	isLoading: boolean;
	signOut: () => void;
	userData?: UserData;
}

const AppLayout: FC = () => {
	const { session, isLoading, signOut, userData } = useSession();
	const pathname = usePathname();

	const { currentLibrary, setCurrentLibrary } = useLibraryStore();

	useEffect(() => {
		console.log(pathname);
		if (pathname.includes("/films")) {
			setCurrentLibrary("films");
		} else if (pathname.includes("/games")) {
			setCurrentLibrary("games");
		} else if (pathname.includes("/books") || pathname === "/") {
			setCurrentLibrary("books");
		}
	}, [pathname, setCurrentLibrary]);

	const goto = (path: string): false | void =>
		pathname !== path && router.push(path);

	const isLibraryActive: boolean =
		pathname === "/" ||
		pathname.startsWith("/books") ||
		pathname.startsWith("/films") ||
		pathname.startsWith("/games");

	if (isLoading) console.log("loading");
	if (!session) return <Redirect href="/sign-in" />;

	return (
		<QueryProvider>
			{!pathname.match(/^\/(books|films|games)\/[^\/]+\/[^\/]+/) && (
				<View className="flex flex-row justify-between items-center w-full px-6 pb-8 border-b">
					<Text className="text-[28px] text-black">
						{userData?.username}.Shelf
					</Text>
					<Text
						onPress={() => {
							signOut();
						}}
					>
						Sign Out
					</Text>
				</View>
			)}

			<Stack screenOptions={{ headerShown: false }} />
			<View className="relative flex flex-row justify-between border-t">
				{!pathname.match(/^\/(books|films|games)\/[^\/]+\/[^\/]+/) && (
					<LibraryDropdown
						currentLibrary={currentLibrary}
						onLibraryChange={setCurrentLibrary}
					/>
				)}
			</View>
			<View className="flex flex-row border-gray-300 bg-gray-200 pb-4">
				<Pressable
					className={cn(
						"flex-1 py-4 items-center justify-center",
						isLibraryActive && "bg-white border-b border-r",
					)}
					onPress={() => goto("/")}
				>
					<SvgXml xml={shelfIcon} />
					<Text className="mt-1 text-sm">library</Text>
				</Pressable>

				<Pressable
					className="flex-1 py-4 items-center justify-center border-t"
					onPress={() => goto(`/${currentLibrary}/search`)}
				>
					<SvgXml xml={searchIcon} />
					<Text className="mt-1 text-sm">search</Text>
				</Pressable>

				<Pressable
					className="flex-1 py-4 items-center justify-center border-t"
					onPress={() => goto(`/${currentLibrary}/progress`)}
				>
					<SvgXml xml={chartsIcon} />
					<Text className="mt-1 text-sm">progress</Text>
				</Pressable>
			</View>
		</QueryProvider>
	);
};

export default AppLayout;
