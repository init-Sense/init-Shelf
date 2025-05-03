import { useBooks } from "@/hooks/useBooks";
import type { GoogleBook } from "@/lib/api/googleBooks";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function SearchScreen() {
	const [query, setQuery] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const { data: books, isLoading, error } = useBooks(searchQuery);
	const router = useRouter();

	const handleSearch = () => {
		setSearchQuery(query);
	};

	const handleBookPress = (book: GoogleBook) => {
		router.push(`/books/search/${book.id}`);
	};

	const renderBookItem = ({ item }: { item: GoogleBook }) => (
		<TouchableOpacity
			className={
				"border border-gray-300 m-4 flex flex-row items-center justify-between bg-white pl-4"
			}
			onPress={() => handleBookPress(item)}
		>
			<View>
				{item.volumeInfo.authors && (
					<Text className={"text-gray-600 truncate"} numberOfLines={1}>
						{item.volumeInfo.authors.join(", ")}
					</Text>
				)}
				<Text className={"font-semibold text-lg truncate"} numberOfLines={2}>
					{item.volumeInfo.title}
				</Text>

				{item.volumeInfo.publishedDate && (
					<Text className={"text-gray-500"}>
						{item.volumeInfo.publishedDate.substring(0, 4)}
					</Text>
				)}
			</View>
			<Image
				className={"h-24 w-16"}
				source={{
					uri:
						item.volumeInfo.imageLinks?.thumbnail ||
						"https://via.placeholder.com/128x192?text=No+Cover",
				}}
				resizeMode="cover"
			/>
		</TouchableOpacity>
	);

	return (
		<View>
			<View
				className={
					"border border-gray-300 flex flex-row items-center justify-between pl-1 bg-white m-4"
				}
			>
				<TextInput
					value={query}
					onChangeText={setQuery}
					placeholder="search for books..."
					returnKeyType="search"
					onSubmitEditing={handleSearch}
				/>
				<TouchableOpacity className={"bg-black p-4"} onPress={handleSearch}>
					<Text className={"text-white font-semibold"}>search</Text>
				</TouchableOpacity>
			</View>

			{isLoading ? (
				<View>
					<ActivityIndicator size="large" color="#0000ff" />
				</View>
			) : error ? (
				<View>
					<Text>Error: {error.message}</Text>
				</View>
			) : books && books.length > 0 ? (
				<FlatList
					className={"border-t"}
					data={books}
					renderItem={renderBookItem}
					keyExtractor={(item) => item.id}
				/>
			) : searchQuery.length > 0 ? (
				<View>
					<Text>No books found for "{searchQuery}"</Text>
				</View>
			) : null}
		</View>
	);
}
