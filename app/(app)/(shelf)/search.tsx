import { useBookSearch } from "@/hooks/useBookSearch";
import type { Book } from "@/types/openLibrary";
import { formatAuthors, getBookCoverUrl } from "@/utils/bookUtils";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Image,
	SafeAreaView,
	StatusBar,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function Search() {
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(searchQuery);
		}, 500);

		return () => clearTimeout(timer);
	}, [searchQuery]);

	const { data, isLoading, isError, error } = useBookSearch({
		q: debouncedQuery,
		limit: 20,
	});

	const renderBookItem = ({ item }: { item: Book }) => {
		return (
			<TouchableOpacity
				className="flex-row p-4 border-b border-gray-200"
				onPress={() => {
					const bookId = item.key.replace("/works/", "");
					router.push(`/books/details/${bookId}`);
				}}
			>
				<Image
					source={{ uri: getBookCoverUrl(item.cover_i) }}
					className="w-16 h-24 mr-4 rounded"
					resizeMode="cover"
				/>
				<View className="flex-1 justify-center">
					<Text className="text-lg font-medium text-black" numberOfLines={2}>
						{item.title}
					</Text>
					{item.author_name && (
						<Text className="text-sm text-gray-600 mb-1">
							{formatAuthors(item.author_name)}
						</Text>
					)}
					<View className="flex-row">
						{item.first_publish_year && (
							<Text className="text-xs text-gray-500 mr-2">
								{item.first_publish_year}
							</Text>
						)}
						{item.edition_count && (
							<Text className="text-xs text-gray-500">
								{item.edition_count} edition{item.edition_count > 1 ? "s" : ""}
							</Text>
						)}
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<StatusBar barStyle="dark-content" />
			<View className="p-4">
				<TextInput
					className="h-12 px-4 border bg-gray-50"
					placeholder="Search for books, authors, etc."
					value={searchQuery}
					onChangeText={setSearchQuery}
					autoFocus
					returnKeyType="search"
					clearButtonMode="while-editing"
				/>
			</View>

			{isLoading && (
				<View className="flex-1 justify-center items-center">
					<ActivityIndicator size="large" color="#000" />
				</View>
			)}

			{isError && (
				<View className="flex-1 justify-center items-center p-4">
					<Text className="text-red-500 text-center mb-2">
						Something went wrong when searching
					</Text>
					<Text className="text-gray-500 text-center">
						{error?.toString() || "Please try again later"}
					</Text>
				</View>
			)}

			{data && !isLoading && (
				<>
					{debouncedQuery && (
						<Text className="px-4 pb-2 text-gray-500">
							{data.numFound} results for "{debouncedQuery}"
						</Text>
					)}

					<FlatList
						data={data.docs}
						keyExtractor={(item) => item.key}
						renderItem={renderBookItem}
						ListEmptyComponent={
							<View className="flex-1 justify-center items-center p-8">
								{debouncedQuery ? (
									<Text className="text-gray-500 text-center">
										No results found for "{debouncedQuery}"
									</Text>
								) : (
									<Text className="text-gray-500 text-center">
										Search for books to get started
									</Text>
								)}
							</View>
						}
					/>
				</>
			)}
		</SafeAreaView>
	);
}
