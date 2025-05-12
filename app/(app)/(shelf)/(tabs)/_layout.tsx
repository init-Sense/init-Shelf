import { Redirect, Tabs } from "expo-router";
import "@/app/global.css";
import { chartsIcon } from "@/assets/icons/charts-icon";
import { searchIcon } from "@/assets/icons/search-icon";
import { shelfIcon } from "@/assets/icons/shelf-icon";
import { useSession } from "@/store/AuthSessionProvider";
import { QueryProvider } from "@/store/QueryProvider";
import { type FC, useEffect, useState } from "react";
import { Keyboard, Platform, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const AppLayout: FC = () => {
	const { session, isLoading } = useSession();
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
			() => {
				setKeyboardVisible(true);
			},
		);
		const keyboardDidHideListener = Keyboard.addListener(
			Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
			() => {
				setKeyboardVisible(false);
			},
		);

		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);

	if (isLoading) console.log("loading");
	if (!session) return <Redirect href="/sign-in" />;

	return (
		<QueryProvider>
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						display: isKeyboardVisible ? "none" : "flex",
						height: 85,
						paddingTop: 10,
						paddingHorizontal: 16,
						borderTopWidth: 1,
						borderTopColor: "#E5E5E5",
						backgroundColor: "#FFFFFF",
					},
					tabBarShowLabel: false,
				}}
			>
				<Tabs.Screen
					name="library"
					options={{
						tabBarIcon: ({ focused }) => (
							<View className="bg-[#F2F2F2] rounded-full w-28 h-[60px] justify-center items-center">
								<SvgXml xml={shelfIcon} width={24} height={24} />
								<Text className="text-sm font-medium text-black mt-1">
									library
								</Text>
							</View>
						),
					}}
				/>
				<Tabs.Screen
					name="search"
					options={{
						tabBarIcon: ({ focused }) => (
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
						),
						href: {
							pathname: "/search/[media]",
							params: { media: "books" },
						},
					}}
				/>
				<Tabs.Screen
					name="progress"
					options={{
						tabBarIcon: ({ focused }) => (
							<View className="justify-center items-center h-[60px] w-28">
								<SvgXml xml={chartsIcon} width={24} height={24} />
								<Text className="text-sm font-medium text-black mt-1">
									progress
								</Text>
							</View>
						),
					}}
				/>
				<Tabs.Screen
					name="index"
					options={{
						href: null,
					}}
				/>
			</Tabs>
		</QueryProvider>
	);
};

export default AppLayout;
