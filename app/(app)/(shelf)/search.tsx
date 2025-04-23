import { useAuthorsDetails } from "@/hooks/author/useAuthorsDetails";
import { useEditionSearch } from "@/hooks/edition/useEditionSearch";
import type { Edition } from "@/types/edition";
import { getBookCoverUrl } from "@/utils/works";
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

export default function EditionSearch() {
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(searchQuery);
		}, 500);

		return () => clearTimeout(timer);
	}, [searchQuery]);

	const {
		editions,
		authorKeys,
		originalResults,
		isLoading: isLoadingEditions,
		isError: isEditionError,
		error: editionError,
		numMatchingEditions,
	} = useEditionSearch({
		q: debouncedQuery,
		limit: 20,
	});

	const {
		data: authors,
		isLoading: isLoadingAuthors,
		isError: isAuthorError,
	} = useAuthorsDetails(authorKeys);

	const isLoading = isLoadingEditions || isLoadingAuthors;
	const isError = isEditionError || isAuthorError;
	const error = editionError;

	const formatAuthorName = (authorKey: string) => {
		const author = authors?.find((a) => a.key === authorKey);

		if (!author) return "Unknown Author";

		if (author.personal_name) return author.personal_name;

		if (author.name) return author.name;

		return "Unknown Author";
	};

	const getLanguageName = (langCode: string) => {
		const langMap: Record<string, string> = {
			eng: "English",
			spa: "Spanish",
			fre: "French",
			ita: "Italian",
			ger: "German",
			por: "Portuguese",
			rus: "Russian",
		};

		return langMap[langCode] || langCode;
	};

	const renderEditionItem = ({ item }: { item: Edition }) => {
		const languageCode = item.languages?.[0]?.key.split("/").pop();
		const language = languageCode ? getLanguageName(languageCode) : null;

		const authorNames =
			item.authors?.map((author) => formatAuthorName(author.key)) || [];

		return (
			<TouchableOpacity
				className="flex-row p-4 border-b border-gray-200"
				onPress={() => {
					const editionId = item.key.replace("/books/", "");
					router.push(`/books/edition/${editionId}`);
				}}
			>
				<Image
					source={{ uri: getBookCoverUrl(item.covers?.[0]) }}
					className="w-16 h-24 mr-4 rounded"
					resizeMode="cover"
				/>
				<View className="flex-1 justify-center">
					<Text className="text-lg font-medium text-black" numberOfLines={2}>
						{item.title}
					</Text>

					{authorNames.length > 0 && (
						<Text className="text-sm text-gray-600 mb-1">
							{authorNames.join(", ")}
						</Text>
					)}

					{item.publishers && item.publishers.length > 0 && (
						<Text className="text-sm text-gray-500">{item.publishers[0]}</Text>
					)}

					<View className="flex-row mt-1">
						{item.publish_date && (
							<Text className="text-xs text-gray-500 mr-2">
								{item.publish_date}
							</Text>
						)}

						{language && (
							<Text className="text-xs text-gray-500">{language}</Text>
						)}
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	const renderFallbackResults = () => {
		if (!originalResults?.docs || originalResults.docs.length === 0) {
			return (
				<View className="flex-1 justify-center items-center p-8">
					<Text className="text-gray-500 text-center">
						No results found for "{debouncedQuery}"
					</Text>
				</View>
			);
		}

		return (
			<View className="p-4">
				<Text className="text-gray-700 mb-4">
					No exact editions match "{debouncedQuery}", but we found{" "}
					{originalResults.numFound} related works:
				</Text>

				<FlatList
					data={originalResults.docs.slice(0, 5)}
					keyExtractor={(item) => item.key}
					renderItem={({ item }) => (
						<TouchableOpacity
							className="flex-row p-4 border-b border-gray-200"
							onPress={() => {
								const workId = item.key.replace("/works/", "");
								router.push(`/books/work/${workId}`);
							}}
						>
							<Image
								source={{ uri: getBookCoverUrl(item.cover_i) }}
								className="w-16 h-24 mr-4 rounded"
								resizeMode="cover"
							/>
							<View className="flex-1 justify-center">
								<Text
									className="text-lg font-medium text-black"
									numberOfLines={2}
								>
									{item.title}
								</Text>
								{item.author_name && (
									<Text className="text-sm text-gray-600 mb-1">
										{item.author_name.join(", ")}
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
											{item.edition_count} edition
											{item.edition_count > 1 ? "s" : ""}
										</Text>
									)}
								</View>
							</View>
						</TouchableOpacity>
					)}
				/>
			</View>
		);
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<StatusBar barStyle="dark-content" />
			<View className="p-4">
				<TextInput
					className="h-12 px-4 border bg-gray-50 rounded"
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

			{!isLoading && debouncedQuery && (
				<View>
					{numMatchingEditions > 0 ? (
						<>
							<Text className="px-4 pb-2 text-gray-500">
								Found {numMatchingEditions} edition
								{numMatchingEditions !== 1 ? "s" : ""} matching "
								{debouncedQuery}"
							</Text>
							<FlatList
								data={editions}
								keyExtractor={(item) => item.key}
								renderItem={renderEditionItem}
							/>
						</>
					) : (
						renderFallbackResults()
					)}
				</View>
			)}

			{!isLoading && !debouncedQuery && (
				<View className="flex-1 justify-center items-center p-8">
					<Text className="text-gray-500 text-center">
						Search for books to get started
					</Text>
				</View>
			)}
		</SafeAreaView>
	);
}
