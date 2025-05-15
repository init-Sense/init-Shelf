import { caretRightIcon } from "@/assets/icons/caret-right-icon";
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

const Details = () => {
	const router = useRouter();

	return (
		<SafeAreaView className={"flex-1 bg-white"}>
			{" "}
			<ScrollView
				className="flex-1"
				contentContainerStyle={{ paddingBottom: 120 }}
			>
				<View className={"flex flex-col gap-2 px-4"}>
					{/*TODO: image picker*/}
					<Text className={"font-bold"}>cover</Text>
					<View className={"flex flex-row items-center justify-start"}>
						<View
							className={
								"flex flex-col items-center justify-center border h-48 w-32"
							}
						>
							<Text>+</Text>
						</View>
					</View>{" "}
					<Text className={"font-bold"}>edition info</Text>
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						<Text className={"text-[16px]"}>title</Text>
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
					</View>{" "}
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						<Text className={"text-[16px]"}>author/s</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"authors..."}
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
						<Text className={"text-[16px]"}>publisher</Text>
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
						<Text className={"text-[16px]"}>published in</Text>
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
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						{/*TODO: select between languages*/}
						<Text className={"text-[16px]"}>language</Text>
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
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						<Text className={"text-[16px]"}>translator</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"translator..."}
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
						<Text className={"text-[16px]"}>editor</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"editor..."}
							placeholderTextColor={"#000000/50"}
							selectionColor={"#000000"}
							underlineColorAndroid={"transparent"}
							autoCapitalize={"none"}
							autoCorrect={false}
							textContentType={"none"}
						/>
					</View>
					<Text className={"font-bold"}>work info</Text>
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						<Text className={"text-[16px]"}>original title</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"original title..."}
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
						<Text className={"text-[16px]"}>first published in</Text>
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
						<Text className={"text-[16px]"}>original language</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"sicilian..."}
							placeholderTextColor={"#000000/50"}
							selectionColor={"#000000"}
							underlineColorAndroid={"transparent"}
							autoCapitalize={"none"}
							autoCorrect={false}
							textContentType={"none"}
						/>
					</View>
					<Text className={"font-bold"}>catalogation</Text>
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						{/*TODO: select between user created categories*/}
						<Text className={"text-[16px]"}>category</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"fiction..."}
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
						<Text className={"text-[16px]"}>sub-category</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"short stories..."}
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
						<Text className={"text-[16px]"}>genres</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"philosphy, literature..."}
							placeholderTextColor={"#000000/50"}
							selectionColor={"#000000"}
							underlineColorAndroid={"transparent"}
							autoCapitalize={"none"}
							autoCorrect={false}
							textContentType={"none"}
						/>
					</View>
					<Text className={"font-bold"}>description</Text>
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
					<Text className={"font-bold"}>ID</Text>
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						<Text className={"text-[16px]"}>isbn 13</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"itg0d0pap3l1k0..."}
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
						<Text className={"text-[16px]"}>isbn 10</Text>
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
					<Text className={"font-bold"}>object</Text>
					<View
						className={
							"flex flex-row items-center justify-between border rounded-xl p-4"
						}
					>
						{/*TODO: select between different formats*/}
						<Text className={"text-[16px]"}>format</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"paperback..."}
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
						<Text className={"text-[16px]"}>pages</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"394..."}
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
						<Text className={"text-[16px]"}>size</Text>
						<TextInput
							className={"text-[16px]"}
							placeholder={"15x4x3..."}
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
					<Text className="text-white text-[20px] font-semibold">continue</Text>
					<SvgXml xml={caretRightIcon} height={24} width={24} />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Details;
