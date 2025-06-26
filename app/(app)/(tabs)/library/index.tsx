import {useGetUserBooksByOption} from "@/hooks/useGetUserBooks";
import {useRouter} from "expo-router";
import React, {useState} from "react";
import {ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View,} from "react-native";

type FilterType = "title" | "author" | "year" | "category";

const BookListScreen = () => {
	const router = useRouter();
	const [activeFilter, setActiveFilter] = useState<FilterType>("title");
	const [viewMode, setViewMode] = useState<"owned" | "wishlist">("owned");

	const { data: books, isLoading, error } = useGetUserBooksByOption(viewMode);

	const filterOptions: FilterType[] = ["title", "author", "year", "category"];

	const renderBookItem = ({ item }) => (
		<TouchableOpacity
			className="bg-gray-100 p-4 mb-4 rounded-lg"
			onPress={() =>
				router.push({
					pathname: "/(app)/(shelf)/(tabs)/library/(details)/[id]",
					params: { id: item.id },
				})
			}
		>
			<Text className="text-lg font-medium">{item.title}</Text>
			<Text className="text-gray-600">
				{item.authors?.join(", ") || "Unknown Author"}
			</Text>
			{item.published_date && (
				<Text className="text-gray-500 text-sm mt-1">
					{item.published_date.substring(0, 4)}
				</Text>
			)}
		</TouchableOpacity>
	);

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="p-4">
				<View className="flex-row justify-between mb-4">
					{filterOptions.map((filter) => (
						<TouchableOpacity
							key={filter}
							className={`px-4 py-2 rounded-full ${activeFilter === filter ? "bg-gray-200" : "bg-gray-100"}`}
							onPress={() => setActiveFilter(filter)}
						>
							<Text
								className={`${activeFilter === filter ? "font-medium" : ""}`}
							>
								{filter}
							</Text>
						</TouchableOpacity>
					))}
				</View>

				{isLoading ? (
					<View className="flex-1 items-center justify-center">
						<ActivityIndicator size="large" color="#000000" />
					</View>
				) : error ? (
					<View className="flex-1 items-center justify-center p-4">
						<Text className="text-red-500 mb-4">Failed to load books</Text>
						<Text className="text-sm text-gray-600">{error.message}</Text>
					</View>
				) : !books || books.length === 0 ? (
					<View className="flex-1 items-center justify-center p-4">
						<Text className="text-lg text-gray-800">
							No {viewMode} books found
						</Text>
						<TouchableOpacity
							className="mt-4 bg-black px-6 py-3 rounded-xl"
							onPress={() => router.push("/search")}
						>
							<Text className="text-white">Add a Book</Text>
						</TouchableOpacity>
					</View>
				) : (
					<FlatList
						data={books}
						keyExtractor={(item) => item.id}
						renderItem={renderBookItem}
						contentContainerStyle={{ paddingBottom: 100 }}
					/>
				)}
			</View>

			<View className="absolute bottom-0 left-0 right-0 flex-row gap-2 items-center justify-between p-4 bg-white border-t border-gray-200">
				<TouchableOpacity
					className={`px-6 py-3 flex flex-col items-center rounded-full w-1/2 ${viewMode === "owned" ? "bg-black" : "bg-gray-100"}`}
					onPress={() => setViewMode("owned")}
				>
					<Text className={viewMode === "owned" ? "text-white" : "text-black"}>
						owned
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className={`px-6 py-3 flex flex-col items-center rounded-full w-1/2 ${viewMode === "wishlist" ? "bg-black" : "bg-gray-100"}`}
					onPress={() => setViewMode("wishlist")}
				>
					<Text
						className={viewMode === "wishlist" ? "text-white" : "text-black"}
					>
						wishlist
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default BookListScreen;
