import { Redirect } from "expo-router";
import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";
import "@/app/global.css";
import { chartsIcon } from "@/assets/icons/charts-icon";
import { searchIcon } from "@/assets/icons/search-icon";
import { shelfIcon } from "@/assets/icons/shelf-icon";
import { useSession } from "@/store/AuthSessionProvider";
import { QueryProvider } from "@/store/QueryProvider";
import type { FC } from "react";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const AppLayout: FC = () => {
	const { session, isLoading } = useSession();
	if (isLoading) console.log("loading");
	if (!session) return <Redirect href="/sign-in" />;

	return (
		<QueryProvider>
			<Tabs className="flex-1">
				<TabSlot className="flex-1" />

				<TabList className="flex flex-row justify-between items-center px-4 border-t pt-3">
					<TabTrigger
						name="library"
						href={{
							pathname: "/(app)/(shelf)/(tabs)/library",
						}}
					>
						{({ isFocused }) => (
							<View className="bg-[#F2F2F2] rounded-full w-28 h-[60px] justify-center items-center">
								<SvgXml xml={shelfIcon} width={24} height={24} />
								<Text className="text-sm font-medium text-black mt-1">
									library
								</Text>
							</View>
						)}
					</TabTrigger>

					<TabTrigger
						name="search"
						href={{
							pathname: "/search/[media]",
							params: { media: "books" },
						}}
					>
						{({ isFocused }) => (
							<View className="bg-black rounded-full w-[150px] h-[60px] justify-center items-center mb-2.5">
								<SvgXml
									xml={searchIcon}
									width={30}
									height={30}
									color="white"
									fill="white"
									stroke="white"
								/>
							</View>
						)}
					</TabTrigger>

					<TabTrigger name="progress" href="/progress">
						{({ isFocused }) => (
							<View className="justify-center items-center h-[60px] w-28">
								<SvgXml xml={chartsIcon} width={24} height={24} />
								<Text className="text-sm font-medium text-black mt-1">
									progress
								</Text>
							</View>
						)}
					</TabTrigger>
				</TabList>
			</Tabs>
		</QueryProvider>
	);
};

export default AppLayout;
