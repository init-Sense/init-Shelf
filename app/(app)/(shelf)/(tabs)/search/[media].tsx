import { barCodeIcon } from "@/assets/icons/bar-code-icon";
import { searchIcon } from "@/assets/icons/search-icon";
import { shelfIcon } from "@/assets/icons/shelf-icon";
import { useBooks } from "@/hooks/useBooks";
import type { GoogleBook } from "@/lib/api/googleBooks";
import { cn } from "@/lib/utils/cn";
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
	const [filter, setFilter] = useState<"all" | "owned" | "wishlist">("all");

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
		router.push({
			pathname: "/search/(results)/[id]",
			params: { id: book.id },
		});
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
					<Text className="text-gray-600 text-[16px]" numberOfLines={1}>
						{item.volumeInfo.authors.join(", ")}
					</Text>
				)}
				<Text className="font-semibold text-[20px]" numberOfLines={2}>
					{item.volumeInfo.title}
				</Text>

				<View className={"flex flex-row items-center gap-1 mt-4"}>
					<Text className="text-gray-500 text-[14px]">
						{item.volumeInfo.publisher || "unknown"} •
						{item?.volumeInfo?.publishedDate?.substring(0, 4) || "unknown"}
					</Text>
				</View>
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

			<View className="flex-1 bg-transparent">
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
							<SvgXml xml={searchIcon} height={200} width={200} />
						</View>
					)}
				</View>

				{books && books.length > 0 && (
					<View className="bg-black py-5 flex flex-row justify-between items-center">
						<TouchableOpacity
							className={cn(
								filter === "all" ? "bg-white rounded-full" : "bg-black",
								"w-1/3 h-10 flex items-center justify-center",
							)}
							onPress={() => setFilter("all")}
						>
							<Text
								className={cn(
									filter === "all" ? "text-black" : "text-white",
									"text-[16px] text-center",
								)}
							>
								all • {books?.length}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className={cn(
								filter === "owned" ? "bg-white rounded-full" : "bg-black",
								"w-1/3 h-10 flex items-center justify-center",
							)}
							onPress={() => setFilter("owned")}
						>
							<Text
								className={cn(
									filter === "owned" ? "text-black" : "text-white",
									"text-[16px] text-center",
								)}
							>
								owned • 2
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className={cn(
								filter === "wishlist" ? "bg-white rounded-full" : "bg-black",
								"w-1/3 h-10 flex items-center justify-center",
							)}
							onPress={() => setFilter("wishlist")}
						>
							<Text
								className={cn(
									filter === "wishlist" ? "text-black" : "text-white",
									"text-[16px] text-center",
								)}
							>
								wishlist • 1
							</Text>
						</TouchableOpacity>
					</View>
				)}
				{!searchQuery && (
					<View className="bg-black py-5 px-4">
						<View className="flex flex-row items-center">
							<View className="flex-1 ">
								<View className="flex flex-row items-center bg-white rounded-full px-4 py-3">
									<TextInput
										value={query}
										onChangeText={setQuery}
										placeholder="search..."
										returnKeyType="search"
										onSubmitEditing={handleSearch}
										className="flex-1 text-black"
										autoFocus
									/>
									<TouchableOpacity className="justify-center items-center">
										<SvgXml xml={barCodeIcon} width={24} height={24} />
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
				)}
			</View>
		</KeyboardAvoidingView>
	);
}
