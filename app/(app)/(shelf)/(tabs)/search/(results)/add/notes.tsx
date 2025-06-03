import { plusIcon } from "@/assets/icons/plus-icon";
import { xIcon } from "@/assets/icons/x-icon";
import { useSession } from "@/store/AuthSessionProvider";
import { useAddToLibraryStore } from "@/store/useAddToLibraryStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	Alert,
	SafeAreaView,
	ScrollView,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Notes = () => {
	const router = useRouter();
	const { userData } = useSession();

	const {
		formState,
		updateFormField,
		addReadingSession,
		removeReadingSession,
		submitBook,
		isSubmitting,
		error,
	} = useAddToLibraryStore();

	const [newSessionStart, setNewSessionStart] = useState("");
	const [newSessionEnd, setNewSessionEnd] = useState("");

	const handleAddSession = () => {
		if (newSessionStart) {
			addReadingSession(newSessionStart, newSessionEnd || null);
			setNewSessionStart("");
			setNewSessionEnd("");
		}
	};

	const handleFinalize = async () => {
		try {
			await submitBook(userData?.id);
			Alert.alert("Success", "Book added to your library!");
			router.replace("/(app)/(shelf)/(tabs)/library");
		} catch (err) {
			Alert.alert(
				"Error",
				err instanceof Error ? err.message : "Failed to add book",
			);
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<ScrollView
				className="flex-1"
				contentContainerStyle={{ paddingBottom: 120 }}
			>
				<View className="flex flex-col gap-2 px-4">
					<Text className="font-bold">collections</Text>
					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<TextInput
							className="text-[16px] w-full"
							value={formState.collections.join(", ")}
							onChangeText={(text) =>
								updateFormField("collections", text.split(", ").filter(Boolean))
							}
							placeholder="favorites, lgbt..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<Text className="font-bold">reading state</Text>
					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">state</Text>
						<TextInput
							className="text-[16px]"
							value={formState.readingState}
							onChangeText={(text) => updateFormField("readingState", text)}
							placeholder="reading..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					{/* Reading sessions */}
					{formState.readingSessions.map((session, index) => (
						<View
							key={index}
							className="flex flex-row items-center justify-between border rounded-xl p-4"
						>
							<Text className="text-[16px]">{`Session ${index + 1}`}</Text>
							<View className="flex flex-row items-center">
								<Text>{`${session.startDate} ${session.endDate ? `- ${session.endDate}` : "(ongoing)"}`}</Text>
								<TouchableOpacity
									className="ml-2"
									onPress={() => removeReadingSession(index)}
								>
									<Text className="text-red-500">✕</Text>
								</TouchableOpacity>
							</View>
						</View>
					))}

					{/* Add session section */}
					<View className="flex flex-col border rounded-xl p-4">
						<Text className="text-[16px] mb-2">Add reading session</Text>
						<View className="flex flex-row items-center justify-between mb-2">
							<Text className="text-[14px] text-gray-500">Start date:</Text>
							<TextInput
								className="text-[16px] border-b border-gray-300 w-40 text-right"
								value={newSessionStart}
								onChangeText={setNewSessionStart}
								placeholder="YYYY-MM-DD"
								placeholderTextColor="#00000080"
								selectionColor="#000000"
								underlineColorAndroid="transparent"
								autoCapitalize="none"
								autoCorrect={false}
							/>
						</View>
						<View className="flex flex-row items-center justify-between mb-2">
							<Text className="text-[14px] text-gray-500">
								End date (optional):
							</Text>
							<TextInput
								className="text-[16px] border-b border-gray-300 w-40 text-right"
								value={newSessionEnd}
								onChangeText={setNewSessionEnd}
								placeholder="YYYY-MM-DD"
								placeholderTextColor="#00000080"
								selectionColor="#000000"
								underlineColorAndroid="transparent"
								autoCapitalize="none"
								autoCorrect={false}
							/>
						</View>
						<TouchableOpacity
							className=" p-2 rounded-lg border items-center mt-2"
							onPress={handleAddSession}
						>
							<Text>Add Session</Text>
						</TouchableOpacity>
					</View>

					<Text className="font-bold">acquisition</Text>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">type</Text>
						<TextInput
							className="text-[16px]"
							value={formState.acquisitionType}
							onChangeText={(text) => updateFormField("acquisitionType", text)}
							placeholder="purchase..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">price</Text>
						<TextInput
							className="text-[16px]"
							value={formState.price}
							onChangeText={(text) => updateFormField("price", text)}
							placeholder="12,90€..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">condition</Text>
						<TextInput
							className="text-[16px]"
							value={formState.condition}
							onChangeText={(text) => updateFormField("condition", text)}
							placeholder="second hand..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">when</Text>
						<TextInput
							className="text-[16px]"
							value={formState.acquisitionDate}
							onChangeText={(text) => updateFormField("acquisitionDate", text)}
							placeholder="YYYY-MM-DD..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">store</Text>
						<TextInput
							className="text-[16px]"
							value={formState.store}
							onChangeText={(text) => updateFormField("store", text)}
							placeholder="libraccio..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">where</Text>
						<TextInput
							className="text-[16px]"
							value={formState.location}
							onChangeText={(text) => updateFormField("location", text)}
							placeholder="milan..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					{/* Notes */}
					<Text className="font-bold">notes</Text>
					<View className="border rounded-xl p-4">
						<TextInput
							className="text-[16px] w-full"
							value={formState.notes}
							onChangeText={(text) => updateFormField("notes", text)}
							placeholder="Add your notes here..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="sentences"
							autoCorrect={true}
							multiline={true}
							numberOfLines={4}
							textAlignVertical="top"
						/>
					</View>
				</View>
			</ScrollView>

			<View className="absolute bottom-0 left-0 right-0 px-6 py-6 flex flex-row gap-4 bg-white border-t">
				<TouchableOpacity
					className="w-16 h-16 flex items-center justify-center bg-white border rounded-xl"
					onPress={() => router.back()}
					disabled={isSubmitting}
				>
					<SvgXml xml={xIcon} height={24} width={24} />
				</TouchableOpacity>

				<TouchableOpacity
					className={`flex-1 h-16 flex flex-row items-center justify-between ${isSubmitting ? "bg-gray-700" : "bg-black"} border px-6 rounded-xl`}
					onPress={handleFinalize}
					disabled={isSubmitting}
				>
					<Text className="text-white text-[20px] font-semibold">
						{isSubmitting ? "Adding..." : "finalize"}
					</Text>
					<SvgXml xml={plusIcon} height={24} width={24} />
				</TouchableOpacity>
			</View>

			{error && (
				<View className="absolute top-4 left-4 right-4 bg-red-100 p-4 rounded-xl">
					<Text className="text-red-500">{error}</Text>
				</View>
			)}
		</SafeAreaView>
	);
};

export default Notes;
