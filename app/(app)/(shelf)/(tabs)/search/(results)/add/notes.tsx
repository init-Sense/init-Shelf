import { plusIcon } from "@/assets/icons/plus-icon";
import { xIcon } from "@/assets/icons/x-icon";
import { useRouter } from "expo-router";
import React from "react";
import {
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Notes = () => {
	const router = useRouter();

	return (
		<SafeAreaView className={"flex-1 bg-white"}>
			{" "}
			<ScrollView
				className="flex-1"
				contentContainerStyle={{ paddingBottom: 120 }}
			>
				<View className={"flex flex-col gap-2 px-4"}>
					<Text className={"font-bold"}>collections</Text>
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						<TextInput
							className={"text-[16px]"}
							placeholder={"favorites, lgbt..."}
							placeholderTextColor={"#000000/50"}
							selectionColor={"#000000"}
							underlineColorAndroid={"transparent"}
							autoCapitalize={"none"}
							autoCorrect={false}
							textContentType={"none"}
						/>
					</View>{" "}
					<Text className={"font-bold"}>reading state</Text>
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						<Text className={"text-[16px]"}>state</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"reading..."}
							placeholderTextColor={"#000000/50"}
							selectionColor={"#000000"}
							underlineColorAndroid={"transparent"}
							autoCapitalize={"none"}
							autoCorrect={false}
							textContentType={"none"}
						/>
					</View>{" "}
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						<Text className={"text-[16px]"}>1st session</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"publisher..."}
							placeholderTextColor={"#000000/50"}
							selectionColor={"#000000"}
							underlineColorAndroid={"transparent"}
							autoCapitalize={"none"}
							autoCorrect={false}
							textContentType={"none"}
						/>
					</View>
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						{/*TODO: date picker*/}
						<Text className={"text-[16px]"}>2nd session</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"15/06/1991..."}
							placeholderTextColor={"#000000/50"}
							selectionColor={"#000000"}
							underlineColorAndroid={"transparent"}
							autoCapitalize={"none"}
							autoCorrect={false}
							textContentType={"none"}
						/>
					</View>{" "}
					<View
						className={
							"flex flex-col items-center justify-center border rounded-xl p-4"
						}
					>
						{/*TODO: select between languages*/}
						<Text className={"text-[16px]"}>add session</Text>
					</View>
					<Text className={"font-bold"}>acquisition</Text>
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						<Text className={"text-[16px]"}>type</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"purchase..."}
							placeholderTextColor={"#000000/50"}
							selectionColor={"#000000"}
							underlineColorAndroid={"transparent"}
							autoCapitalize={"none"}
							autoCorrect={false}
							textContentType={"none"}
						/>
					</View>
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						<Text className={"text-[16px]"}>price</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"12,90€..."}
							placeholderTextColor={"#000000/50"}
							selectionColor={"#000000"}
							underlineColorAndroid={"transparent"}
							autoCapitalize={"none"}
							autoCorrect={false}
							textContentType={"none"}
						/>
					</View>
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						<Text className={"text-[16px]"}>condition</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"second hand..."}
							placeholderTextColor={"#000000/50"}
							selectionColor={"#000000"}
							underlineColorAndroid={"transparent"}
							autoCapitalize={"none"}
							autoCorrect={false}
							textContentType={"none"}
						/>
					</View>
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						<Text className={"text-[16px]"}>when</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"07/09/1999..."}
							placeholderTextColor={"#000000/50"}
							selectionColor={"#000000"}
							underlineColorAndroid={"transparent"}
							autoCapitalize={"none"}
							autoCorrect={false}
							textContentType={"none"}
						/>
					</View>{" "}
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						{/*TODO: select between languages*/}
						<Text className={"text-[16px]"}>store</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"libraccio..."}
							placeholderTextColor={"#000000/50"}
							selectionColor={"#000000"}
							underlineColorAndroid={"transparent"}
							autoCapitalize={"none"}
							autoCorrect={false}
							textContentType={"none"}
						/>
					</View>
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						<Text className={"text-[16px]"}>where</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"milan..."}
							placeholderTextColor={"#000000/50"}
							selectionColor={"#000000"}
							underlineColorAndroid={"transparent"}
							autoCapitalize={"none"}
							autoCorrect={false}
							textContentType={"none"}
						/>
					</View>
					<Text className={"font-bold"}>notes</Text>
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						<TextInput
							className={"text-[16px]"}
							placeholder={"finzioni..."}
							placeholderTextColor={"#000000/50"}
							selectionColor={"#000000"}
							underlineColorAndroid={"transparent"}
							autoCapitalize={"none"}
							autoCorrect={false}
							textContentType={"none"}
						/>
					</View>
				</View>
			</ScrollView>
			<View className="absolute bottom-0 left-0 right-0 px-6 py-6 flex flex-row gap-4 bg-white border-t">
				<TouchableOpacity
					className="w-16 h-16 flex items-center justify-center bg-white border rounded-xl"
					onPress={() => router.back()}
				>
					<SvgXml xml={xIcon} height={24} width={24} />
				</TouchableOpacity>

				<TouchableOpacity
					className="flex-1 h-16 flex flex-row items-center justify-between bg-black border px-6 rounded-xl"
					onPress={() => router.navigate({ pathname: "/search/add/notes" })}
				>
					<Text className="text-white text-[20px] font-semibold">finalize</Text>
					<SvgXml xml={plusIcon} height={24} width={24} />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Notes;
