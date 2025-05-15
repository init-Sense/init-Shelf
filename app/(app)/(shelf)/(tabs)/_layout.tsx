import { Redirect, Tabs, useSegments } from "expo-router";
import "@/app/global.css";
import { chartsIcon } from "@/assets/icons/charts-icon";
import { searchPlusIcon } from "@/assets/icons/search-plus-icon";
import { shelfIcon } from "@/assets/icons/shelf-icon";
import { cn } from "@/lib/utils/cn";
import { useSession } from "@/store/AuthSessionProvider";
import { QueryProvider } from "@/store/QueryProvider";
import { type FC, useEffect, useState } from "react";
import { Keyboard, Platform, Text, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";

const AppLayout: FC = () => {
	const { session, isLoading } = useSession();
	const segment = useSegments();
	const page = segment[segment.length - 1];
	const pagesToHideTabBar = [
		"sign-in",
		"sign-up",
		"forgot-password",
		"[id]",
		"details",
		"notes",
	];

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
						borderTopWidth: 0,
						height: isKeyboardVisible ? 0 : 75,
						display: pagesToHideTabBar.includes(page) ? "none" : "flex",
					},
				}}
			>
				<Tabs.Screen
					name="library"
					options={{
						tabBarIcon: ({ focused }) => (
							<SvgXml xml={shelfIcon} width={30} height={30} />
						),
						tabBarLabel: ({ focused }) => (
							<Text
								className={`text-sm font-semibold ${
									focused ? "text-black" : "text-black/50"
								}`}
							>
								library
							</Text>
						),
						tabBarButton: ({ children, onPress }) => {
							if (isKeyboardVisible) {
								return (
									<TouchableOpacity
										onPress={onPress}
										className={cn("flex-1 justify-center items-center my-1")}
									>
										{children}
									</TouchableOpacity>
								);
							}

							return (
								<TouchableOpacity
									onPress={onPress}
									className="flex-1 justify-center items-center my-1"
								>
									{children}
								</TouchableOpacity>
							);
						},
					}}
				/>
				<Tabs.Screen
					name="search"
					options={{
						tabBarIcon: ({ focused }) => (
							<SvgXml xml={searchPlusIcon} width={30} height={30} />
						),
						tabBarLabel: ({ focused }) => (
							<Text className={"text-sm absolute text-transparent"}>
								Search
							</Text>
						),
						tabBarButton: ({ children, onPress }) => {
							if (isKeyboardVisible) {
								return (
									<TouchableOpacity
										onPress={onPress}
										className="flex-1 justify-center items-center bg-black rounded-full my-1"
									>
										{children}
									</TouchableOpacity>
								);
							}

							return (
								<TouchableOpacity
									onPress={onPress}
									className="flex-1 justify-center items-center bg-black rounded-full my-1"
								>
									{children}
								</TouchableOpacity>
							);
						},
					}}
				/>
				<Tabs.Screen
					name="progress"
					options={{
						tabBarIcon: ({ focused }) => (
							<SvgXml xml={chartsIcon} width={30} height={30} />
						),
						tabBarLabel: ({ focused }) => (
							<Text
								className={`text-sm font-semibold ${
									focused ? "text-black" : "text-black/50"
								}`}
							>
								progress
							</Text>
						),
						tabBarButton: ({ children, onPress }) => {
							if (isKeyboardVisible) {
								return (
									<TouchableOpacity
										onPress={onPress}
										className="flex-1 justify-center items-center my-1"
									>
										{children}
									</TouchableOpacity>
								);
							}

							return (
								<TouchableOpacity
									onPress={onPress}
									className="flex-1 justify-center items-center my-1"
								>
									{children}
								</TouchableOpacity>
							);
						},
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
