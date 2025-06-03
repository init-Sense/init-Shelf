import { barCodeIcon } from "@/assets/icons/bar-code-icon";
import { searchIcon } from "@/assets/icons/search-icon";
import { shelfIcon } from "@/assets/icons/shelf-icon";
import { useGetGoogleBooks } from "@/hooks/useGetGoogleBooks";
import { useGetUserBooks } from "@/hooks/useGetUserBooks";
import type { GoogleBook } from "@/lib/api/googleBooks";
import { cn } from "@/lib/utils/cn";
import type { UserBook } from "@/types/userBook";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
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
	const router = useRouter();
	const [keyboardVisible, setKeyboardVisible] = useState(false);
	const screenWidth = Dimensions.get("window").width;
	const [filter, setFilter] = useState<"all" | "owned" | "wishlist">("all");

	const {
		data: googleBooks,
		isLoading: isLoadingGoogle,
		error: googleError,
	} = useGetGoogleBooks(searchQuery);

	const { data: allUserBooks, isLoading: isLoadingUserBooks } =
		useGetUserBooks();

	const filteredUserBooks = useMemo(() => {
		if (!allUserBooks || !searchQuery) return [];

		const lowercaseQuery = searchQuery.toLowerCase();
		return allUserBooks.filter((book) => {
			const titleMatch = book.title.toLowerCase().includes(lowercaseQuery);
			const authorMatch =
				Array.isArray(book.authors) &&
				book.authors.some((author) =>
					author.toLowerCase().includes(lowercaseQuery),
				);
			return titleMatch || authorMatch;
		});
	}, [allUserBooks, searchQuery]);

	const ownedBooks = useMemo(
		() => filteredUserBooks.filter((book) => !book.wishlist),
		[filteredUserBooks],
	);

	const wishlistBooks = useMemo(
		() => filteredUserBooks.filter((book) => book.wishlist),
		[filteredUserBooks],
	);

	const displayedBooks = useMemo(() => {
		switch (filter) {
			case "owned":
				return ownedBooks;
			case "wishlist":
				return wishlistBooks;
			default:
				return filteredUserBooks;
		}
	}, [filter, ownedBooks, wishlistBooks]);

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

	const handleBookPress = (
		book: UserBook | GoogleBook,
		isUserBook: boolean,
	) => {
		if (isUserBook) {
			router.push({
				pathname: "/(app)/(shelf)/(tabs)/library/(details)/[id]",
				params: { id: book.id },
			});
		} else {
			router.push({
				pathname: "/search/(results)/[id]",
				params: { id: (book as GoogleBook).id },
			});
		}
	};

	const renderUserBookItem = ({ item }: { item: UserBook }) => (
		<TouchableOpacity
			className="border border-gray-300 mx-4 my-2 flex flex-row items-center bg-white rounded-md overflow-hidden"
			onPress={() => handleBookPress(item, true)}
		>
			<View className="w-16 h-24 m-2 bg-gray-100">
				<Image
					className="h-full w-full"
					source={{
						uri:
							item.cover || "https://via.placeholder.com/128x192?text=No+Cover",
					}}
					resizeMode="cover"
				/>
			</View>
			<View className="flex-1 p-4 pr-2" style={{ maxWidth: screenWidth - 100 }}>
				{item.authors && (
					<Text className="text-gray-600 text-[16px]" numberOfLines={1}>
						{Array.isArray(item.authors)
							? item.authors.join(", ")
							: item.authors}
					</Text>
				)}
				<Text className="font-semibold text-[20px]" numberOfLines={2}>
					{item.title}
				</Text>

				<View className="flex flex-row items-center gap-1 mt-4">
					<Text className="text-gray-500 text-[14px]">
						{item.publisher || "unknown"} •
						{item?.published_date?.substring(0, 4) || "unknown"}
					</Text>
					{item.wishlist ? (
						<Text className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">
							Wishlist
						</Text>
					) : (
						<Text className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
							Owned
						</Text>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);

	const renderGoogleBookItem = ({ item }: { item: GoogleBook }) => (
		<TouchableOpacity
			className="border border-gray-300 mx-4 my-2 flex flex-row items-center bg-white rounded-md overflow-hidden"
			onPress={() => handleBookPress(item, false)}
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

				<View className="flex flex-row items-center gap-1 mt-4">
					<Text className="text-gray-500 text-[14px]">
						{item.volumeInfo.publisher || "unknown"} •
						{item?.volumeInfo?.publishedDate?.substring(0, 4) || "unknown"}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);

	const renderSectionHeader = (title: string) => (
		<View className="bg-gray-100 py-2 px-4 mt-2">
			<Text className="font-semibold text-[18px]">{title}</Text>
		</View>
	);

	const isLoading = isLoadingGoogle || isLoadingUserBooks;
	const hasResults =
		(filter === "all" &&
			(displayedBooks.length > 0 || (googleBooks && googleBooks.length > 0))) ||
		(filter !== "all" && displayedBooks.length > 0);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			className="flex-1"
		>
			{searchQuery && (
				<View className="flex flex-row px-2 py-3 bg-white items-center">
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
					) : googleError ? (
						<View className="flex-1 justify-center items-center p-4">
							<Text>Error: {googleError.message}</Text>
						</View>
					) : hasResults ? (
						<FlatList
							className="py-2"
							ListHeaderComponent={
								filter === "all" && displayedBooks.length > 0
									? renderSectionHeader("Your Books")
									: null
							}
							data={displayedBooks}
							renderItem={renderUserBookItem}
							keyExtractor={(item) => `user-${item.id}`}
							ListFooterComponent={() =>
								filter === "all" && googleBooks && googleBooks.length > 0 ? (
									<>
										{renderSectionHeader("Results")}
										<FlatList
											data={googleBooks}
											renderItem={renderGoogleBookItem}
											keyExtractor={(item) => `google-${item.id}`}
											scrollEnabled={false}
										/>
									</>
								) : null
							}
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

				{searchQuery.length > 0 && (
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
								all •{" "}
								{displayedBooks.length +
									(filter === "all" && googleBooks ? googleBooks.length : 0)}
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
								owned • {ownedBooks.length}
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
								wishlist • {wishlistBooks.length}
							</Text>
						</TouchableOpacity>
					</View>
				)}

				{!searchQuery && (
					<View className="bg-black py-5 px-4">
						<View className="flex flex-row items-center">
							<View className="flex-1">
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
