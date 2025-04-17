import { Stack, useNavigation } from "expo-router";
import "../global.css";
import { chartsIcon } from "@/assets/icons/charts-icon";
import { plusIcon } from "@/assets/icons/plus-icon";
import { searchIcon } from "@/assets/icons/search-icon";
import { shelfIcon } from "@/assets/icons/shelf-icon";
import { useEffect } from "react";
import { Pressable, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function RootLayout() {
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
