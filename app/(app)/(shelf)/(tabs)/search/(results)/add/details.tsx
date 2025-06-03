import { caretRightIcon } from "@/assets/icons/caret-right-icon";
import { xIcon } from "@/assets/icons/x-icon";
import { useGetGoogleBook } from "@/hooks/useGetGoogleBook";
import { useAddToLibraryStore } from "@/store/useAddToLibraryStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
	ActivityIndicator,
	Image,
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
	const { selection } = useLocalSearchParams<{ selection: string }>();
	const { data: googleBook, isLoading } = useGetGoogleBook(selection);

	const { formState, setGoogleBook, updateFormField } = useAddToLibraryStore();

	useEffect(() => {
		if (googleBook) {
			setGoogleBook(googleBook);
		}
	}, [googleBook, setGoogleBook]);

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<ScrollView
				className="flex-1"
				contentContainerStyle={{ paddingBottom: 120 }}
			>
				<View className="flex flex-col gap-2 px-4">
					<Text className="font-bold">cover</Text>
					<View className="flex flex-row items-center justify-start">
						{formState.cover ? (
							<Image
								source={{ uri: formState.cover }}
								className="h-48 w-32 rounded"
							/>
						) : (
							<View className="flex flex-col items-center justify-center border h-48 w-32">
								<Text>+</Text>
							</View>
						)}
					</View>

					<Text className="font-bold">edition info</Text>
					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">title</Text>
						<TextInput
							className="text-[16px]"
							value={formState.title}
							onChangeText={(text) => updateFormField("title", text)}
							placeholder="title..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">author/s</Text>
						<TextInput
							className="text-[16px]"
							value={formState.authors.join(", ")}
							onChangeText={(text) =>
								updateFormField("authors", text.split(", "))
							}
							placeholder="authors..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">publisher</Text>
						<TextInput
							className="text-[16px]"
							value={formState.publisher}
							onChangeText={(text) => updateFormField("publisher", text)}
							placeholder="publisher..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">published in</Text>
						<TextInput
							className="text-[16px]"
							value={formState.publishedDate}
							onChangeText={(text) => updateFormField("publishedDate", text)}
							placeholder="YYYY-MM-DD..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">language</Text>
						<TextInput
							className="text-[16px]"
							value={formState.language}
							onChangeText={(text) => updateFormField("language", text)}
							placeholder="language..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">translator</Text>
						<TextInput
							className="text-[16px]"
							value={formState.translator}
							onChangeText={(text) => updateFormField("translator", text)}
							placeholder="translator..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">editor</Text>
						<TextInput
							className="text-[16px]"
							value={formState.editor}
							onChangeText={(text) => updateFormField("editor", text)}
							placeholder="editor..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					{/* Work info */}
					<Text className="font-bold">work info</Text>
					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">original title</Text>
						<TextInput
							className="text-[16px]"
							value={formState.originalTitle}
							onChangeText={(text) => updateFormField("originalTitle", text)}
							placeholder="original title..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">first published in</Text>
						<TextInput
							className="text-[16px]"
							value={formState.firstPublishedDate}
							onChangeText={(text) =>
								updateFormField("firstPublishedDate", text)
							}
							placeholder="YYYY-MM-DD..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">original language</Text>
						<TextInput
							className="text-[16px]"
							value={formState.originalLanguage}
							onChangeText={(text) => updateFormField("originalLanguage", text)}
							placeholder="original language..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<Text className="font-bold">catalogation</Text>
					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">category</Text>
						<TextInput
							className="text-[16px]"
							// We'll need to handle category selection differently in a real app
							// This is a simplification
							placeholder="fiction..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">sub-category</Text>
						<TextInput
							className="text-[16px]"
							// We'll need to handle sub-category selection differently in a real app
							placeholder="short stories..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">genres</Text>
						<TextInput
							className="text-[16px]"
							value={formState.genres.join(", ")}
							onChangeText={(text) =>
								updateFormField("genres", text.split(", "))
							}
							placeholder="philosophy, literature..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					{/* Description */}
					<Text className="font-bold">description</Text>
					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<TextInput
							className="text-[16px] w-full"
							value={formState.description}
							onChangeText={(text) => updateFormField("description", text)}
							placeholder="description..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
							multiline={true}
							numberOfLines={4}
						/>
					</View>

					{/* ID */}
					<Text className="font-bold">ID</Text>
					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">isbn 13</Text>
						<TextInput
							className="text-[16px]"
							value={formState.isbn13}
							onChangeText={(text) => updateFormField("isbn13", text)}
							placeholder="isbn 13..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">isbn 10</Text>
						<TextInput
							className="text-[16px]"
							value={formState.isbn10}
							onChangeText={(text) => updateFormField("isbn10", text)}
							placeholder="isbn 10..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					{/* Object */}
					<Text className="font-bold">object</Text>
					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">format</Text>
						<TextInput
							className="text-[16px]"
							value={formState.format}
							onChangeText={(text) => updateFormField("format", text)}
							placeholder="paperback..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">pages</Text>
						<TextInput
							className="text-[16px]"
							value={formState.pages ? String(formState.pages) : ""}
							onChangeText={(text) =>
								updateFormField("pages", text ? Number.parseInt(text) : null)
							}
							placeholder="394..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
							keyboardType="number-pad"
						/>
					</View>

					<View className="flex flex-row items-center justify-between border rounded-xl p-4">
						<Text className="text-[16px]">size</Text>
						<TextInput
							className="text-[16px]"
							value={formState.size}
							onChangeText={(text) => updateFormField("size", text)}
							placeholder="15x4x3..."
							placeholderTextColor="#00000080"
							selectionColor="#000000"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							autoCorrect={false}
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
