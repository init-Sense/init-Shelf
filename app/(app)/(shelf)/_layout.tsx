import { Redirect, Stack, router, usePathname } from "expo-router";
import "@/app/global.css";
import { chartsIcon } from "@/assets/icons/charts-icon";
import { plusIcon } from "@/assets/icons/plus-icon";
import { searchIcon } from "@/assets/icons/search-icon";
import { shelfIcon } from "@/assets/icons/shelf-icon";
import { cn } from "@/lib/utils/cn";
import { useSession } from "@/store/AuthSessionProvider";
import { QueryProvider } from "@/store/QueryProvider";
import { useLibraryStore } from "@/store/useLibraryStore";
import { type FC, useEffect, useState } from "react";
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
	const { session, isLoading, signOut, userData }: SessionData = useSession();
	const pathname = usePathname();

	const { currentLibrary, setCurrentLibrary } = useLibraryStore();

	const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

	useEffect(() => {
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

	const selectShelf = (shelf: string): void => {
		setCurrentLibrary(shelf);
		setDropdownOpen(false);
	};

	const isLibraryActive: boolean =
		pathname === "/" ||
		pathname.startsWith("/(shelf)") ||
		pathname.startsWith("/(app)/(shelf)") ||
		pathname.startsWith("/books") ||
		pathname.startsWith("/films") ||
		pathname.startsWith("/games");

	if (isLoading) console.log("loading");
	if (!session) return <Redirect href="/sign-in" />;

	return (
		<QueryProvider>
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

			<Stack screenOptions={{ headerShown: false }} />

			<View className="relative flex flex-row justify-between border-t">
				<Pressable
					className="flex flex-row items-center p-4"
					onPress={() => setDropdownOpen(!dropdownOpen)}
				>
					<Text className="font-bold text-3xl mr-2">{currentLibrary}</Text>
					<SvgXml
						xml={`
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    `}
					/>
				</Pressable>

				<Pressable
					className="py-4 items-center justify-center bg-black w-24 h-24"
					onPress={() => router.push(`/${currentLibrary}/search`)}
				>
					<SvgXml xml={plusIcon} />
				</Pressable>

				{dropdownOpen && (
					<View className="absolute bottom-20 left-4 bg-white border z-10 w-1/2">
						{["books", "films", "games"].map((shelf) => (
							<Pressable
								key={shelf}
								className={cn(
									"px-4 py-3 border-b",
									currentLibrary === shelf && "bg-gray-100",
								)}
								onPress={() => selectShelf(shelf)}
							>
								<Text
									className={cn(
										"text-lg",
										currentLibrary === shelf && "font-bold",
									)}
								>
									{shelf}
								</Text>
							</Pressable>
						))}
					</View>
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
