import { barCodeIcon } from "@/assets/icons/bar-code-icon";
import { shelfIcon } from "@/assets/icons/shelf-icon";
import { useBooks } from "@/hooks/useBooks";
import type { GoogleBook } from "@/lib/api/googleBooks";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SvgXml } from "react-native-svg";

export default function SearchScreen() {
	const { media } = useLocalSearchParams();
	const [query, setQuery] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const { data: books, isLoading, error } = useBooks(searchQuery);
	const router = useRouter();
	const [keyboardVisible, setKeyboardVisible] = useState(false);
	const screenWidth = Dimensions.get("window").width;

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				setKeyboardVisible(true);
			},
		);
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setKeyboardVisible(false);
			},
		);

		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);

	const handleSearch = () => {
		setSearchQuery(query);
	};

	const handleBookPress = (book: GoogleBook) => {
		router.push(`/search/${book.id}`);
	};

	const renderBookItem = ({ item }: { item: GoogleBook }) => (
		<TouchableOpacity
			className="border border-gray-300 mx-4 my-2  flex flex-row items-center bg-white rounded-md overflow-hidden"
			onPress={() => handleBookPress(item)}
		>
			<View className="w-16 h-24 m-2 bg-gray-100">
				<Image
					className="h-full w-full"
					source={{
						uri:
							item.volumeInfo.imageLinks?.thumbnail ||
							"https://via.placeholder.com/128x192?text=No+Cover",
					}}
					resizeMode="cover"
				/>
			</View>
			<View className="flex-1 p-4 pr-2" style={{ maxWidth: screenWidth - 100 }}>
				{item.volumeInfo.authors && (
					<Text className="text-gray-600 text-sm" numberOfLines={1}>
						{item.volumeInfo.authors.join(", ")}
					</Text>
				)}
				<Text className="font-semibold text-lg" numberOfLines={2}>
					{item.volumeInfo.title}
				</Text>

				{item.volumeInfo.publishedDate && (
					<Text className="text-gray-500 text-sm mt-1">
						{item.volumeInfo.publishedDate.substring(0, 4)}
					</Text>
				)}
			</View>
		</TouchableOpacity>
	);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-1"
		>
			{searchQuery && (
				<View className={"flex flex-row px-2 py-3 bg-white items-center"}>
					<SvgXml xml={shelfIcon} width={24} height={24} />
					<Text className="text-gray-500 text-lg ml-2">
						Search results for "{searchQuery}"
					</Text>

					<TouchableOpacity
						className="ml-auto"
						onPress={() => {
							setSearchQuery("");
							setQuery("");
							Keyboard.dismiss();
						}}
					>
						<Text>cancel</Text>
					</TouchableOpacity>
				</View>
			)}

			<View className="flex-1 bg-white">
				<View className="flex-1">
					{isLoading ? (
						<View className="flex-1 justify-center items-center">
							<ActivityIndicator size="large" color="#0000ff" />
						</View>
					) : error ? (
						<View className="flex-1 justify-center items-center p-4">
							<Text>Error: {error.message}</Text>
						</View>
					) : books && books.length > 0 ? (
						<FlatList
							className="py-2"
							data={books}
							renderItem={renderBookItem}
							keyExtractor={(item) => item.id}
						/>
					) : searchQuery.length > 0 ? (
						<View className="flex-1 justify-center items-center p-4">
							<Text>No books found for "{searchQuery}"</Text>
						</View>
					) : (
						<View className="flex-1 justify-center items-center p-4">
							<Text className="text-gray-400 text-lg">
								Search for books to get started
							</Text>
						</View>
					)}
				</View>

				{!searchQuery && (
					<View className="bg-black py-5 px-4">
						<View className="flex flex-row items-center">
							<View className="flex-1 mr-4">
								<View className="flex flex-row items-center bg-white rounded-2xl px-4 py-3">
									<TextInput
										value={query}
										onChangeText={setQuery}
										placeholder="finzioni"
										returnKeyType="search"
										onSubmitEditing={handleSearch}
										className="flex-1 text-base"
										autoFocus
									/>
									<View className="flex flex-row">
										<TouchableOpacity className="px-1">
											<View className="flex flex-row">
												<View className="h-5 w-5 border-t border-b border-black rounded-full"></View>
												<View className="h-5 w-5 -ml-2.5 border-t border-b border-black rounded-full"></View>
											</View>
										</TouchableOpacity>
									</View>
								</View>
							</View>

							<TouchableOpacity className="p-3 justify-center items-center">
								<SvgXml xml={barCodeIcon} width={24} height={24} />
							</TouchableOpacity>
						</View>
					</View>
				)}
			</View>
		</KeyboardAvoidingView>
	);
}
